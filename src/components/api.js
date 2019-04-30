import { parseComponent } from "vue-template-compiler";

export function addcampus(refs,dataSource,that){
    const form = refs.collectionForm.form;  // 创建form
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log('Received values of form: ', values);
        dataSource.push(values);  // 应该是fetch到的新数据 先以values为参数post请求，在请求成功后get新的数据
        form.resetFields();
        that.visible = false; //   控制对话框的状态
      });
}

export function addmajor(refs,that){
    const form = refs.collectionForm.form;  // 创建form
    console.log(form,123456);
    const params = {};
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log('Received values of form: ', values);
      //  dataSource.push(values);  // 应该是fetch到的新数据
      params.name = values.name;
        // params.createdTime=values.createdTime;
        params.campus = values.campus;
        params.key = values.name;
        console.log(params);
        that.datas.push(params);
        form.resetFields();
        that.visible = false; //   控制对话框的状态
      });
}
export function editcampus(refs,dataSource,e,that){
    
    const form = refs.editForm[e].form;
    form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log('Received values of form: ', values);
        dataSource.map((item,index)=>{
            if(index===e){
                console.log(item);
                item.name=values.name;
            }
        })     //fetch put .then(get)
        that.editvisible=false;
        console.log(dataSource);
        });
}
 
export function editmajor(refs,e,that){
    const form = refs.editForm.form;
    console.log(form);
    const params={};
    console.log(params);
    form.validateFields((err, values) => {
        if (err) {
            console.log(err);
          return;
        }
        console.log('Received values of form: ', values);
        params.name=values.name;
        params.campus=values.campus;
        console.log(params);
        // console.log(that.datas);
          //fetch put .then(get)
          that.datas.map(item=>{
              if(item.key===e){
                  console.log(item);
                  item.name=params.name;
                  item.campus=params.campus;
              }
          })
        that.editvisible=false;
        console.log(that.datas);
        });
}