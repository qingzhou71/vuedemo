<template>
  <Table :columns="columns1" :data="data1"></Table>
</template>

<script>
import axios from "axios";
import { table } from "iview";
export default {
  data() {
    return {
      columns1: [
        {
          title: "学号",
          key: "username"
        },
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "一卡通余额",
          key: "balance"
        },
        {
          title: "是否提交清空余额申请",
          key: "cancel"
        },
        {
          title: "操作",
          key: "action",
          width: 130,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "清除"
              ),
              // h(
              //   "Button",
              //   {
              //     props: {
              //       type: "primary",
              //       size: "small"
              //     },
              //     on: {
              //       click: () => {
              //         this.add(params.index);
              //       }
              //     }
              //   },
              //   "添加"
              // )
            ]);
          }
        }
      ],
      data1: []
    };
  },
  beforeCreate() {
    axios.get("api/admin/stu/card").then((response, data, content) => {
      this.data1 = response.data.content;
      response.data.content.map(item => {
        console.log(item.cancel);
        item.cancel = item.cancel == true ? "是" : "否";
      });
    });
  },
  components: { table },
  methods: {
    remove(index) {
      console.log(this.data1[index].cancel);

      if (this.data1[index].cancel == "否") {
        alert("该生未申请离校，不可清除数据。");
      } else if (this.data1[index].cancel == "是") {
        let dataput = {
          balance: 0,
          id: this.data1[index].id,
          username: this.data1[index].username,
          enable: true
        };
        console.log(dataput);
        axios
          .put(`/api/stu/card`, dataput)
          .then(res => {
            console.log("res=>", res);
            this.data1[index].balance = dataput.balance;
            alert("清除成功！");
          })
          .catch(error => {
            alert("清除失败！");
          });
      }
    }
    // add(index) {
    //   console.log(this.data1[index].cancel);

    //   let dataput = {
    //     balance: 0,
    //     id: this.data1[index].id,
    //     username: this.data1[index].username,
    //     enable: true
    //   };
    //   console.log(dataput);
    //   axios
    //     .put(`/api/stu/card`, dataput)
    //     .then(res => {
    //       console.log("res=>", res);
    //       this.data1[index].balance = dataput.balance;
    //       alert("清除成功！");
    //     })
    //     .catch(error => {
    //       alert("清除失败！");
    //     });
    // }
  }
};
</script>

<style>
</style>
