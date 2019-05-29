<template>
  <div>
    <Table border :columns="columns" :data="data"></Table>
    <a-modal title="编辑/删除学生缴费信息" v-model="visible" @ok="handleOk" okText="确认" cancelText="取消">
      <br>
      <br>
      <p>第一学年缴费金额：</p>
      <input :value="amount1" :disabled="onedisabled" ref="getoneValue">
      <a-button type="dashed" @click="edit1" v-if="is11">编辑</a-button>
      <a-button type="dashed" @click="delete1" v-if="is12">提交</a-button>
      <br>
      <br>
      <p>第二学年缴费金额：</p>
      <input :value="amount2" :disabled="twodisabled" ref="gettwoValue">
      <a-button type="dashed" @click="edit2" v-if="is21">编辑</a-button>
      <a-button type="dashed" @click="delete2" v-if="is22">提交</a-button>
      <br>
      <br>
      <p>第三学年缴费金额：</p>
      <input :value="amount3" :disabled="threedisabled" ref="getthreeValue">
      <a-button type="dashed" @click="edit3" v-if="is31">编辑</a-button>
      <a-button type="dashed" @click="delete3" v-if="is32">提交</a-button>
      <br>
      <br>
      <p>第四学年缴费金额：</p>
      <input :value="amount4" :disabled="fourdisabled" ref="getfourValue">
      <a-button type="dashed" @click="edit4" v-if="is41">编辑</a-button>
      <a-button type="dashed" @click="delete4" v-if="is42">提交</a-button>
      <br>
      <br>
    </a-modal>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      onedisabled: true,
      twodisabled: true,
      threedisabled: true,
      fourdisabled: true,
      amount1: "",
      amount2: "",
      amount3: "",
      amount4: "",
      id1: "",
      id2: "",
      id3: "",
      id4: "",
      is11: true,
      is21: true,
      is31: true,
      is41: true,
      is12: false,
      is22: false,
      is32: false,
      is42: false,
      username: "",
      columns: [
        {
          title: "学号",
          key: "username",
          align: "center"
        },
        {
          title: "姓名",
          key: "name",
          align: "center"
        },
        {
          title: "院系",
          key: "campus",
          align: "center"
        },
        {
          title: "专业",
          key: "major",
          align: "center"
        },
        {
          title: "学年缴费记录",
          align: "center",
          children: [
            {
              title: "第一学年缴费金额",
              key: "firstamount",
              align: "center"
            },
            {
              title: "第二学年缴费金额",
              key: "secondamount",
              align: "center"
            },
            {
              title: "第三学年缴费金额",
              key: "thirdamount",
              align: "center"
            },
            {
              title: "第四学年缴费金额",
              key: "forthamount",
              align: "center"
            }
          ]
        },
        {
          title: "Action",
          key: "action",
          width: 100,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "操作"
              )
            ]);
          }
        }
      ],
      data: [],
      visible: false
    };
  },
  beforeCreate() {
    axios.get("/api/admin/stu/finance").then((response, data) => {
      // this.dataSource = response.data;
      response.data.map((item, index) => {
        item.financeRecords.map((items, index) => {
          console.log(items);
          switch (index) {
            case 0:
              {
                item.firstamount = items ? items.amount : "暂无"; //三元运算符，判断？前的值，若为true，执行问号后的值，若为false，执行：后的值
                item.firstid = items ? items.id : "暂无";
              }
              break;
            case 1:
              {
                item.secondamount = items ? items.amount : "暂无";
                item.secondid = items ? items.id : "暂无";
              }
              break;
            case 2:
              {
                item.thirdamount = items ? items.amount : "暂无";
                item.thirdid = items ? items.id : "暂无";
              }
              break;
            case 3:
              {
                item.fouthamount = items ? items.amount : "暂无";
                item.fouthid = items ? items.id : "暂无";
              }
              break;
          }
        });
      });
      console.log(response.data);
      this.data = response.data;
      console.log(this.data);
    });
  },
  methods: {
    remove(index) {
      console.log(this.data[index].firstamount);
      this.amount1 = this.data[index].firstamount;
      this.amount2 = this.data[index].secondamount;
      this.amount3 = this.data[index].thirdamount;
      this.amount4 = this.data[index].forthamount;
      this.id1 = this.data[index].firstid;
      this.id2 = this.data[index].secondid;
      this.id3 = this.data[index].thirdid;
      this.id4 = this.data[index].forthid;
      this.username = this.data[index].username;
      this.visible = true;
    },
    edit1() {
      this.onedisabled = false;
      this.is11 = false;
      this.is12 = true;
    },
    edit2() {
      this.twodisabled = false;
      this.is21 = false;
      this.is22 = true;
    },
    edit3() {
      this.threedisabled = false;
      this.is31 = false;
      this.is32 = true;
    },
    edit4() {
      this.fourdisabled = false;
      this.is41 = false;
      this.is42 = true;
    },
    delete1() {
      if (this.id1 === "" || this.id1 === undefined) {
        let datapost = {
          amount: this.$refs.getoneValue.value,
          username: this.username
        };
        console.log(datapost);
        axios
          .post(`/api/admin/stu/finance`, datapost)
          .then(res => {
            alert("成功！");
            console.log("res=>", res);
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        let dataput = {
          amount: this.$refs.getoneValue.value,
          id: this.id1,
          username: this.username
        };
        console.log(dataput);
        axios
          .put(`/api/admin/stu/finance`, dataput)
          .then(res => {
            console.log("res=>", res);
            alert("成功！");
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    delete2() {
      if (this.id2 === "" || this.id2 === undefined) {
        let datapost = {
          amount: this.$refs.gettwoValue.value,
          username: this.username
        };
        console.log(datapost);
        axios
          .post(`/api/admin/stu/finance`, datapost)
          .then(res => {
            alert("成功！");
            console.log("res=>", res);
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        let dataput = {
          amount: this.$refs.gettwoValue.value,
          id: this.id2,
          username: this.username
        };
        console.log(dataput);
        axios
          .put(`/api/admin/stu/finance`, dataput)
          .then(res => {
            console.log("res=>", res);
            alert("成功！");
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    delete3() {
      if (this.id3 === "" || this.id3 === undefined) {
        let datapost = {
          amount: this.$refs.getthreeValue.value,
          username: this.username
        };
        console.log(datapost);
        axios
          .post(`/api/admin/stu/finance`, datapost)
          .then(res => {
            alert("成功！");
            console.log("res=>", res);
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        let dataput = {
          amount: this.$refs.getthreeValue.value,
          id: this.id3,
          username: this.username
        };
        console.log(dataput);
        axios
          .put(`/api/admin/stu/finance`, dataput)
          .then(res => {
            console.log("res=>", res);
            alert("成功！");
          })
          .catch(error => {
            console.log(error);
          });
      }
    },

    delete4() {
      if (this.id4 === "" || this.id4 === undefined) {
        let datapost = {
          amount: this.$refs.getfourValue.value,
          username: this.username
        };
        console.log(datapost);
        axios
          .post(`/api/admin/stu/finance`, datapost)
          .then(res => {
            alert("成功！");
            console.log("res=>", res);
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        let dataput = {
          amount: this.$refs.getfourValue.value,
          id: this.id4,
          username: this.username
        };
        console.log(dataput);
        axios
          .put(`/api/admin/stu/finance`, dataput)
          .then(res => {
            console.log("res=>", res);
            alert("成功！");
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    }
  }
};
</script>

<style>
.ant-input-disabled {
  width: 160px;
  bottom: 40px;
  left: 140px;
}

.ant-input {
  width: 160px;
  bottom: 40px;
  left: 140px;
}

/* .ant-btn-dashed {
  left: 160px;
  bottom: 40px;
} */
</style>
