<template>
  <div class="process">
    <a-card class="processcard">
      <signout class="manager-singnout"></signout>
      <h1 class="title">流程管理:</h1>
      <div class="listboard">
      
        <div v-for="(item,index) in campusdata" :key="index" class="pocesslist">
          <h2>{{item.campus.name}}</h2>
          <span class="edit">
            <a-icon
              type="edit"
              @click="()=>editprocess(item.process,index,item.campus.name,item.campus.id)"
            />
          </span>
          <div v-if="!item.process.length" class="note">暂时没有流程，去设置流程吧</div>
          <div v-else class="processnote">流程示意：</div>

          <a-steps
            progressDot
            class="steps"
            :current="item.process.length-1"
            labelPlacement="vertical"
          >
            <a-step
              v-for="(items,index) in item.process"
              :key="index"
              :title="items.location.name||'无'"
            />
          </a-steps>
        </div>
      </div>

      <div v-show="edit" class="cover"></div>
      <div v-show="edit" class="editprocess">
        <a-form :form="form" @submit="handleSubmit">
          <a-form-item class="campusname">{{currentcampusname}}:</a-form-item>
          <a-form-item
            v-for="(k, index) in steps"
            :key="index"
            v-bind="formItemLayoutWithOutLabel"
            class="stepinput"
            :required="true"
          >
            <!-- step{{index+1}} -->
            <div>step{{index+1}}:</div>选择地点：
            <a-select
              v-decorator="[
            `names[${index}]`,
            {
              initialValue:k.location.name,
              rules:[{
                required:true,
                
                message:'内容不能为空，如不需要请删除此项'
              }]
            }
            ]"
            >
              <a-select-option v-for="(item) in locations" :key="item.name">{{item.name}}</a-select-option>
            </a-select>
            <br>选择部门：
            <a-select
              v-decorator="[
            `tags[${index}]`,
            {
              initialValue:k.tag||'',
              rules:[{
                required:true,
                whitespace: true,
                message:'内容不能为空，如不需要请删除此项'
              }]
            }
            ]"
            >
              <a-select-option v-for="(item) in departments" :key="item">{{item}}</a-select-option>
            </a-select>
           
            <a-icon
              v-if="index> 0"
              class="dynamic-delete-button"
              type="minus-circle-o"
              @click="() => remove(index)"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayoutWithOutLabel">
            <a-button type="dashed" style="width: 60%" @click="add">
              <a-icon type="plus"/>添加下一步
            </a-button>
          </a-form-item>
          <a-form-item class="submitbutton">
            <a-button type="primary" html-type="submit">确定</a-button>
            <a-button @click="cancel">取消</a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-card>
    <bottom class='processbottom'></bottom>
  </div>
</template>

<script>
import signout from "@/components/signout";
import bottom from '@/components/bottom'
let id = 3;
const campusdata = [
  {
    campus: {
      id: 10,
      name: "123456"
    },
    process: [
      // { sep: 1, name: "学院办事处", key: 0,tags:'通信与信息管理学院' },
      // { sep: 2, name: "财务办", key: 1,tags:'财务部' },
      // { sep: 3, name: "宿舍管理处", key: 2,tags:'后勤管理处' }
    ]
  }
];
export default {
  data() {
    return {
      campusdata: campusdata,
      currentcampusname: "",
      currrentid: 0,
      currentindex: 0,
      currentstep: [],
      count: 0,
      steps: [
        // { sep: 1, name: "as", key: 0 },
        // { sep: 2, name: "qw", key: 1 },
        // { sep: 3, name: "zx", key: 2 }
      ],
      edit: false,
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 }
        }
      },
      locations: [],
      departments: ["学院管理处", "宿舍管理处", "财务处", "组织关系管理处","卡务中心"]
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
    if(localStorage.getItem('identity')!=='流程管理'){
      this.$router.push({path:'/'})
    }
    fetch(`/api/admin/education/report`, {
      method: "GET"
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.campusdata = res;
      });

    fetch(`/api/location`, {
      method: "GET"
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res);
        this.locations = res.content;
      });
  },
  components: { signout,bottom },
  methods: {
    cancel() {
      this.edit = false;
      this.form.resetFields();
      this.steps = [];
    },
    remove(k) {
      const { form } = this;

      if (this.steps.length === 1) {
        return;
      }

      this.steps.splice(k, 1);
      this.count++;
    },

    add() {
      const { form } = this;
      const len = this.steps.length;
      console.log(len);
      this.steps.push({
        sep: len + 1,
        key: len,
        tag: "",
        location: { name: "" }
      });
    },

    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (err) {
          return;
        }

        console.log("Received values of form: ", values);
        if (this.count > 0) {
          console.log("delete");
          console.log(this.currentstep);
          this.currentstep.map(item => {
            console.log(item.id);
            // 删除所有的数据
            fetch(`/api/admin/education/report/${item.id}`, {
              method: "DELETE"
            }).then(res => {
              
              return;
            });
            values.names.map((item, index) => {
              const currentlocation = this.locations.filter(
                items => items.name === item
              )[0];
              fetch(`/api/admin/education/report`, {
                method: "POST",
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "content-type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                  campus: {
                    id: this.currrentid,
                    name: "any"
                  },
                  location: currentlocation,
                  seq: index + 1,
                  tag: values.tags[index]
                })
              })
                .then(res => {
                  return res.json();
                })
                .then(res => {
                  console.log(res);
                  fetch(`/api/admin/education/report`, {
                    method: "GET"
                  })
                    .then(res => {
                      return res.json();
                    })
                    .then(res => {
                      this.campusdata = res;
                    });
                });
            });
          });
        } else {
          console.log("post+put");
          values.names.map((item, index) => {
            const currentlocation = this.locations.filter(
              items => items.name === item
            )[0];
            if (this.currentstep.length > index) {
              console.log("put");
              fetch(
                `/api/admin/education/report`,
                {
                  method: "PUT",
                  headers: {
                  "Access-Control-Allow-Origin": "*",
                  "content-type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                  campus: {
                    id: this.currrentid,
                    name: "any"
                  },
                  location: currentlocation,
                  id:this.currentstep[index].id,
                  seq: index + 1,
                  tag: values.tags[index]
                })
                }
              )
                .then(res => {
                  return res.json();
                })
                .then(res => {
                  fetch(`/api/admin/education/report`, {
                    method: "GET"
                  })
                    .then(res => {
                      return res.json();
                    })
                    .then(res => {
                      this.campusdata = res;
                    });
                });
            } else {
              console.log("post");
              fetch(`/api/admin/education/report`, {
                method: "POST",
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "content-type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                  campus: {
                    id: this.currrentid,
                    name: "any"
                  },
                  location: currentlocation,
                  seq: index + 1,
                  tag: values.tags[index]
                })
              })
                .then(res => {
                  return res.json();
                })
                .then(res => {
                  console.log(res);
                  fetch(`/api/admin/education/report`, {
                    method: "GET"
                  })
                    .then(res => {
                      return res.json();
                    })
                    .then(res => {
                      this.campusdata = res;
                    });
                });
            }
          });
        }

        this.edit = false;
        this.steps = [];
        this.form.resetFields();
        this.count = 0;
      });
    },
    editprocess(step, index, campusname, campusid) {
      this.currentindex = index;
      this.currentcampusname = campusname;
      this.currrentid = campusid;
      this.steps = this.steps.concat(step);
      this.currentstep = step;
      // console.log(this.currentstep.length);
      // console.log(step);
      // console.log(this.steps);
      // console.log(this.campusdata);

      // console.log(this.steps[0].location)
      this.edit = true;
    }
  },
  watch: {
    // campusdata(){
    //   this.campusdata=this.campusdata;
    // //    fetch(`/api/admin/education/report`,{
    // //   method:'GET'
    // // }).then(res=>{
    // //   return res.json()
    // // }).then(res=>{
    // //   // console.log(res);
    // //   this.campusdata=res;
    // //   // this.steps=res.process;
    // //   // console.log(this.campusdata)
    // // })
    // }
  }
};
</script>
<style>
.process {
  width: 100%;
  height: 100%;
  /* position: relative; */
}
.processcard {
  width: 98%;
  margin: 0 auto;
  max-width: unset;
  height: 90%;
  position: relative;
  z-index: 1;
  overflow: auto;
  padding: 10px 20px;
}
.processcard .ant-card-body {
  height: 100%;
}
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
.stepinput {
  margin-left: -13% !important;
}
.editprocess {
  width: 60%;
  height: auto;
  position: absolute;
  top: 120px;
  right: 27%;
  /* margin: 150px auto; */
  border: 1px solid silver;
  padding: 20px 0;
  border-radius: 10px;
  max-width: 500px;
  z-index: 13;
  background: white;
  max-height: 70%;
  overflow-y: scroll;
}
.submitbutton {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
.cover {
  width: 100%;
  height: 100%;
  background: rgba(228, 227, 227, 0.404);
  z-index: 2;
  position: absolute;
  top: 0px;
  right: 0;
}
.title {
  /* font-size: 25px; */
  margin: 20px;
}
.pocesslist {
  width: 90%;
  border-bottom: 1px solid silver;
  position: relative;
  margin: 40px 30px;
}
.steps {
  padding: 10px;
  width: 70%;
  text-align: left;
  /* margin-left: -20px; */
}
.note {
  font-size: 18px;
  padding: 10px;
}
.processnote {
  /* position: absolute; */
  font-size: 16px;
  top: 20px;
}
.edit {
  position: absolute;
  top: 10px;
  right: 50px;
  font-size: 18px;
  cursor: pointer;
}
.edit:hover {
  color: blue;
}
.campusname {
  font-size: 16px;
  margin-left: 20px;
}
.manager-singnout {
  position: absolute;
  top: 20px;
  right: 5px;
}
.editprocess form .ant-select,
form .ant-cascader-picker {
  width: 55%;
  margin-right: 30px;
}
.editprocess .ant-form-item {
  margin-bottom: 4px !important;
}
.listboard {
  height: 85%;
  overflow-y: scroll;
  border: 1px solid silver;
}
.processbottom{
  height: 5%;
  margin-top: 20px;
}
</style>