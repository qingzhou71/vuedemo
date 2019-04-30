<template>
  <div class="process">
    <a-card class="processcard">
      <h1 class="title">流程管理:</h1>
      <div class="listboard">
        <!-- <a-list itemLayout="horizontal" :dataSource="campusdata">
          <a-list-item slot="renderItem" slot-scope="item, index">
              {{item.campusname}}{{index}}
          </a-list-item>
        </a-list>-->
        <div v-for="(item,index) in campusdata" :key="index" class="pocesslist">
          <h2>{{item.campusname}}</h2>
          <span class="edit">
            <a-icon type="edit" @click="()=>editprocess(item.process,index)"/>
          </span>
          <div v-if='!item.process.length' class='note'>暂时没有流程，去设置流程吧</div>
          <div v-else class='processnote'>流程示意：</div>
          <a-steps progressDot class='steps'  :current='item.process.length-1' labelPlacement='vertical'>
            <a-step v-for='(items,index) in item.process' :key='index' :title="items.name" />
            
          </a-steps>
        </div>
      </div>

      <div v-show="edit" class="cover"></div>
      <div v-show="edit" class="editprocess">
        <a-form :form="form" @submit="handleSubmit">
          <a-form-item
            v-for="(k, index) in steps"
            :key="index"
            v-bind="formItemLayoutWithOutLabel"
            class="stepinput"
            :required="false"
          >
            step{{index+1}}
            <a-input
              v-decorator="[
          `names[${index}]`,
          {
            validateTrigger: ['change', 'blur'],
            initialValue:k.name,
            rules: [{
              required: true,
              whitespace: true,
              message: '内容不能为空，如不需要请删除此项',
            }],
          }
        ]"
              placeholder="填写地点"
              style="width: 60%; margin-right: 8px"
            />
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
          </a-form-item>
        </a-form>
      </div>
    </a-card>
  </div>
</template>

<script>
let id = 3;
const campusdata = [
  {
    campusid: "10",
    campusname: "通信与信息工程学院",
    process: [
      { sep: 1, name: "111", key: 0 },
      { sep: 2, name: "222", key: 1 },
      { sep: 3, name: "333", key: 2 }
    ]
  },
  {
    campusid: "11",
    campusname: "电子工程学院",
    process: [
      { sep: 1, name: "444", key: 0 },
      { sep: 2, name: "555", key: 1 },
      { sep: 3, name: "666", key: 2 }
    ]
  },
  {
    campusid: "12",
    campusname: "自动化学院",
    process: [
      { sep: 1, name: "77777777777777", key: 0 },
      { sep: 2, name: "888", key: 1 },
      { sep: 3, name: "999", key: 2 }
    ]
  },
  {
    campusid: "13",
    campusname: "人文社科学院",
    process: [
      { sep: 1, name: "000", key: 0 },
      { sep: 2, name: "123", key: 1 },
      { sep: 3, name: "234", key: 2 }
    ]
  },
  {
    campusid: "14",
    campusname: "计算机学院",
    process: [
      
    ]
  }
];
export default {
  data() {
    return {
      campusdata: campusdata,
      currentindex:0,
      steps: [
        { sep: 1, name: "as", key: 0 },
        { sep: 2, name: "qw", key: 1 },
        { sep: 3, name: "zx", key: 2 }
      ],
      edit: false,
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 }
        }
      }
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    remove(k) {
      const { form } = this;

      if (this.steps.length === 1) {
        return;
      }

      console.log(k);
      this.steps.splice(k, 1);
      console.log(this.steps);
    },

    add() {
      const { form } = this;
      const len = this.steps.length;
      console.log(len);
      this.steps.push({ sep: len + 1, name: "", key: len });
    },

    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          console.log(values.names[1]);

          this.steps.map((item, index) => {
            item.sep = index + 1;
            item.name = values.names[index];
            item.key = index + 1;
          });
        }
        console.log(this.steps[0].name);
        // console.log(this.steps[3].name);
        console.log(this.currentindex)
        this.campusdata.process=this.steps;
      });
      this.edit = false;
    },
    editprocess(step,index) {
        this.currentindex=index
        this.steps=step;
        console.log(this.steps);
        this.edit=true;
    }
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
  height: 100%;
  position: relative;
  z-index: 1;
  overflow: auto;
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
  top: 150px;
  right: 20%;
  /* margin: 150px auto; */
  border: 1px solid silver;
  padding: 20px 0;
  border-radius: 10px;
  max-width: 500px;
  z-index: 13;
  background: white;
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
.pocesslist{
    width: 90%;
  border-bottom: 1px solid silver;
  position: relative;
  margin: 40px 30px;
}
.steps{
    padding: 10px;
    width:70%;
    text-align: left;
    /* margin-left: -20px; */
}
.note{
    font-size: 18px;
    padding: 10px;
}
.processnote{
    /* position: absolute; */
    font-size: 16px;
    top:20px;
}
</style>