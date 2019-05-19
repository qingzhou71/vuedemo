import { parseComponent } from "vue-template-compiler";



export function getcampus(that){
  fetch(`/api/campus`, {
    method: "GET"
  })
    .then(res => {
      return res.json();
    })
    .then(res => {
      console.log(res.content);
      that.dataSource = res.content;
    });
}

export function delcampus(e,that){
  fetch(`/api/admin/education/campus/${e}`,{
    method:'DELETE'
  }).then(res=>{
    if(res.status===200){
      getcampus(that);
    }
    return
  })
}


export function addcampus(refs,dataSource,that){
    const form = refs.collectionForm.form;  // 创建form
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log('Received values of form: ', values);

        // dataSource.push(values);  // 应该是fetch到的新数据 先以values为参数post请求，在请求成功后get新的数据
        fetch(`/api/admin/education/campus?name=${values.name}`,{
            method:'POST',
            headers: {
              "Access-Control-Allow-Origin": "*",
              "content-type": "application/json"
            },
            credentials: "include",
            
        }).then(res=>{
            return res.json();
        }).then(data=>{
          getcampus(that);

    }),
        form.resetFields();
        that.visible = false; //   控制对话框的状态
      });
}



export function getmajor(that){
  fetch(`/api/major`, {
    method: "GET"
  })
    .then(res => {
      return res.json();
    })
    .then(res => {
      console.log(res.content);
      that.dataSource = res.content;
    });
}


export function addmajor(refs,that){
    const form = refs.collectionForm.form;  // 创建form

      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log('Received values of form: ', values);
      //  dataSource.push(values);  // 应该是fetch到的新数据

       fetch(`/api/admin/education/major`,{
         method:'POST',
         headers: {
          "Access-Control-Allow-Origin": "*",
          "content-type": "application/json"
        },
        credentials: "include",
        body:JSON.stringify({
          name:values.name,
          campus:{
            id:values.campus,
            name:'any'
          }
        })

       }).then(res=>{
         return res.json()
       }).then(res=>{
         getmajor(that);
       })

        form.resetFields();
        that.visible = false; //   控制对话框的状态
      });
}


export function delmajor(e,that){
  fetch(`/api/admin/education/major/${e}`,{
    method:'DELETE'
  }).then(res=>{
    if(res.status===200){
      getmajor(that);
    }
    return
  })
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


export function getdorm(that){
  fetch(`/api/dorm`,{
    method:'GET'
  }).then(res=>{
    return res.json()
  }).then(res=>{
    
    that.dataSource=res.content;
    console.log(that.dataSource);
  })
}

export function adddorm(refs,that){
  const form = refs.collectionForm.form;  // 创建form
  form.validateFields((err, values) => {
    if (err) {
      return;
    }
    console.log('Received values of form: ', values);
    fetch(`/api/admin/facility/dormitory`,{
        method:'POST',
        headers: {
          "Access-Control-Allow-Origin": "*",
          "content-type": "application/json"
        },
        credentials: "include",
        body:JSON.stringify({
          name:values.name,
          
        })
        
    }).then(res=>{
        return res.json();
    }).then(data=>{
      getdorm(that);
}),
    form.resetFields();
    that.visible = false; //   控制对话框的状态
  });
}

export function deldorm(e,that){
  fetch(`/api/admin/facility/dormitory/${e}`,{
    method:'DELETE'
  }).then(res=>{
    if(res.status===200){
      getdorm(that);
    }
    return
  })

}