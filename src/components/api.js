import { parseComponent } from "vue-template-compiler";


<<<<<<< HEAD
export function getcampus(that) {
=======

export function getcampus(that){
>>>>>>> fbf915561714e49279c4b80570992e4257e00e6c
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

  fetch(`/api/admin/role`, {
    method: "GET"
  })
    .then(res => {
      return res.json();
    })
    .then(res => {
      that.rolelist = res;
    });

}

export function delcampus(e, name, that) {
  fetch(`/api/admin/education/campus/${e}`, {
      method: 'DELETE',
    }).then(res => {
        if (res.status === 200) {
         getcampus(that);
    }
    return;
  });
    
  console.log(that.rolelist);
  const selectid=that.rolelist.filter(item=>item.name===name)[0];
  console.log(that.rolelist.filter(item => item.name === name));
  console.log(selectid);
  fetch(`/api/admin/role/${selectid.id}`, {
    method: 'DELETE'
  }).then(res => {
    if (res.status === 200) {
      return;
    }
    return;
  });
}

export function addcampus(refs, that) {
  const form = refs.collectionForm.form;  // 创建form
  form.validateFields((err, values) => {
    if (err) {
      return;
    }
    console.log('Received values of form: ', values);
    // dataSource.push(values);  // 应该是fetch到的新数据 先以values为参数post请求，在请求成功后get新的数据
    fetch(`/api/admin/education/campus?name=${values.name}`, {
      method: 'POST',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "content-type": "application/json"
      },
      credentials: "include",

    }).then(res => {
      return res.json();
    }).then(data => {
      getcampus(that);
    });

    fetch(`/api/admin/role`, {
      method: 'POST',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "content-type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        name: values.name,
      })
    }).then(res => {
      return res.json()
    })

    form.resetFields();
    that.visible = false; //   控制对话框的状态
  });
}


export function editcampus(refs,names, that) {

  const form = refs.editForm.form;
  form.validateFields((err, values) => {
    if (err) {
      return;
    }
    console.log('Received values of form: ', values);
    console.log(that);
    fetch(`/api/admin/education/campus`, {
      method: 'PUT',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "content-type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        name: values.name,
        id: that.currentids
      })
    }).then(res => {
      if (res.status === 200) {
        return res.json()
      } else {
        return
      }
    }).then(res => {
      console.log(res);
      getcampus(that);
    });
    
    console.log(names);
    console.log(that.rolelist);
    const selectid=that.rolelist.filter(item=>item.name===names)[0];
    // console.log(that.rolelist.filter(item=>item.name===name)[0])
    console.log(selectid);
    fetch(`/api/admin/role`, {
      method: 'PUT',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "content-type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        name: values.name,
        id: selectid.id
      })
    }).then(res => {
      if (res.status === 200) {
        return res.json()
      } else {
        return
      }
    }).then(res => {
      console.log(res)
    });


    that.editvisible = false;
    form.resetFields();
  });
}



export function getmajor(that) {
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


export function addmajor(refs, that) {
  const form = refs.collectionForm.form;  // 创建form
  form.validateFields((err, values) => {
    if (err) {
      return;
    }
    console.log('Received values of form: ', values);
    //  dataSource.push(values);  // 应该是fetch到的新数据
    fetch(`/api/admin/education/major`, {
      method: 'POST',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "content-type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        name: values.name,
        campus: {
          id: values.campus,
          name: 'any'
        }
      })

    }).then(res => {
      return res.json()
    }).then(res => {
      getmajor(that);
    })
    form.resetFields();
    that.visible = false; //   控制对话框的状态
  });
}

export function delmajor(e, that) {
  fetch(`/api/admin/education/major/${e}`, {
    method: 'DELETE'
  }).then(res => {
    if (res.status === 200) {
      getmajor(that);
    }
    return
  })
}


<<<<<<< HEAD

export function editmajor(refs, that) {
  const form = refs.editForm.form;
  form.validateFields((err, values) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Received values of form: ', values);
    fetch(`/api/admin/education/major`, {
      method: 'PUT',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "content-type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        name: values.name,
        id: that.currentids,
        campus: {
          id: values.campus,
          name: 'any'
        }
      })

    }).then(res => {
      return res.json()
    }).then(res => {
      getmajor(that);
    })
    form.resetFields();
    that.editvisible = false;
  });
}


export function getdorm(that) {
  fetch(`/api/dorm`, {
    method: 'GET'
  }).then(res => {
    return res.json()
  }).then(res => {

    that.dataSource = res.content;
    // console.log(that.dataSource);
  });
  fetch(`/api/admin/role`, {
=======
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
>>>>>>> fbf915561714e49279c4b80570992e4257e00e6c
    method: "GET"
  })
    .then(res => {
      return res.json();
    })
    .then(res => {
      that.rolelist = res;
    });
}

export function adddorm(refs, that) {
  const form = refs.collectionForm.form;  // 创建form
  form.validateFields((err, values) => {
    if (err) {
      return;
    }
    console.log('Received values of form: ', values);
    fetch(`/api/admin/facility/dormitory`, {
      method: 'POST',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "content-type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        name: values.name,
        latitude:values.lat,
        longitude:values.lon,
      })

    }).then(res => {
      return res.json();
    }).then(data => {
      getdorm(that);
    }),

    fetch(`/api/admin/role`, {
      method: 'POST',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "content-type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        name: values.name,
      })
    }).then(res => {
      return res.json()
    })
      form.resetFields();
    that.visible = false; //   控制对话框的状态
  });
}

export function deldorm(e, name,that) {
  fetch(`/api/admin/facility/dormitory/${e}`, {
    method: 'DELETE'
  }).then(res => {
    if (res.status === 200) {
      getdorm(that);
    }
    return
  });
  console.log(name)
  const selectid=that.rolelist.filter(item=>item.name===name)[0];
  fetch(`/api/admin/role/${selectid.id}`, {
    method: 'DELETE'
  }).then(res => {
    if (res.status === 200) {
      return;
    }
    return;
  });
}


export function editdorm(refs, that) {
  const form = refs.editForm.form;
  form.validateFields((err, values) => {
    if (err) {
      return;
    }
    console.log('Received values of form: ', values);
    fetch(`/api//admin/facility/dormitory`, {
      method: 'PUT',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "content-type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        name: values.name,
        id: that.currentids
      })
    }).then(res => {
      if (res.status === 200) {
        return res.json()
      } else {
        return
      }
    }).then(res => {
      console.log(res);
      getdorm(that);
    });
    const selectid=that.rolelist.filter(item=>item.name===that.currentitem.name)[0];
    fetch(`/api/admin/role`, {
      method: 'PUT',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "content-type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        name: values.name,
        id: selectid.id
      })
    }).then(res => {
      if (res.status === 200) {
        return res.json()
      } else {
        return
      }
    }).then(res => {
      console.log(res)
    });

    that.editvisible = false;
    form.resetFields();
  });
}

export function getlocation(that) {
  fetch(`/api/location?size=50`, {
    method: 'GET'
  }).then(res => {
    return res.json()
  }).then(res => {

    that.datas = res.content;
    res.content.map((item, index) => {
      that.datas[index].key = item.id;
    })
    console.log(res);
    console.log(that.datas);
  })
}

export function addlocation(refs, that) {
  const form = refs.collectionForm.form;  // 创建form
  form.validateFields((err, values) => {
    if (err) {
      return;
    }
    console.log('Received values of form: ', values);
    fetch(`/api/admin/facility/location`, {
      method: 'POST',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "content-type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        name: values.name,
        longitude: values.lon,
        latitude: values.lat
      })

    }).then(res => {
      return res.json();
    }).then(data => {
      console.log(data);
      getlocation(that);
    }),
      form.resetFields();
    that.visible = false; //   控制对话框的状态
  });
}

export function dellocation(e, that) {
  fetch(`/api/admin/facility/location/${e}`, {
    method: 'DELETE'
  }).then(res => {
    if (res.status === 200) {
      getlocation(that);
    }
    return
  })
}

export function editlocation(refs, that) {
  const form = refs.editForm.form;  // 创建form
  form.validateFields((err, values) => {
    if (err) {
      return;
    }
    console.log('Received values of form: ', values);
    fetch(`/api/admin/facility/location`, {
      method: 'PUT',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "content-type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        id: that.currentitem.id,
        name: values.name,
        longitude: values.lon,
        latitude: values.lat
      })

    }).then(res => {
      return res.json();
    }).then(data => {
      console.log(data);
      getlocation(that);
    }),
      form.resetFields();
    that.editvisible = false; //   控制对话框的状态
  });
}

export function getcamman(that) {
  fetch(`/api/admin`, {
    method: "GET"
  })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        return;
      }
    })
    .then(res => {
      const data = [];
      res.content.sort((a, b) => {
        return a.id - b.id;
      });
      res.content.map((item, index) => {
        data[index] = item;
        fetch(`/api/admin/role/${item.roleIds[0]}`, {
          method: 'GET'
        }).then(res => {
          return res.json()
        }).then(res => {
          console.log(res);
          data[index].depart = res.name;
          data.sort((a, b) => {
            return a.id - b.id;
          });
          console.log(data);
          that.dataSource=data.filter(item=>item.depart.substr(item.depart.length-2,2)==='学院')
        })
      })
    });
}


<<<<<<< HEAD
export function addcamman(refs,that){
  const form = refs.collectionForm.form;
=======
export function addmajor(refs,that){
    const form = refs.collectionForm.form;  // 创建form

>>>>>>> fbf915561714e49279c4b80570992e4257e00e6c
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
<<<<<<< HEAD
        console.log("Received values of form: ", values);
        // console.log(values.department.join(','));
       fetch(`/api/admin`,{
=======
        console.log('Received values of form: ', values);
      //  dataSource.push(values);  // 应该是fetch到的新数据

       fetch(`/api/admin/education/major`,{
>>>>>>> fbf915561714e49279c4b80570992e4257e00e6c
         method:'POST',
         headers: {
            "Access-Control-Allow-Origin": "*",
            "content-type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({
            username: values.username,
            password:values.password,
            roleIds:[values.campus]
          })
       }).then(res=>{
         return res.json()
       }).then(res=>{
        //  this.getmanagers();
        getcamman(that);
       })
        form.resetFields();
        that.visible = false;
      });
}

export function editcamman(refs,that){
  const form = refs.editForm.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log("Received values of form: ", values);
        // console.log(values.department.join(','));
       fetch(`/api/admin`,{
         method:'PUT',
         headers: {
            "Access-Control-Allow-Origin": "*",
            "content-type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({
            username: values.username,
            id:that.currentitem.id,
            roleIds:[values.campus]
          })
       }).then(res=>{
         return res.json()
       }).then(res=>{
        //  this.getmanagers();
        getcamman(that);
       })

        form.resetFields();
        that.editvisible = false;
      });
}

<<<<<<< HEAD
export function delcamman(e,that){
  fetch(`/api/admin/${e}`,{
=======

export function delmajor(e,that){
  fetch(`/api/admin/education/major/${e}`,{
>>>>>>> fbf915561714e49279c4b80570992e4257e00e6c
    method:'DELETE'
  }).then(res=>{
    if(res.status===200){
      getcamman(that);
    }
    return
  })
}

export function getdorman(that) {
  fetch(`/api/admin`, {
    method: "GET"
  })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        return;
      }
    })
    .then(res => {
      const data = [];
      res.content.sort((a, b) => {
        return a.id - b.id;
      });
      res.content.map((item, index) => {
        data[index] = item;
        fetch(`/api/admin/role/${item.roleIds[0]}`, {
          method: 'GET'
        }).then(res => {
          return res.json()
        }).then(res => {
          console.log(res);
          data[index].depart = res.name;
          data.sort((a, b) => {
            return a.id - b.id;
          });
          console.log(data);
          that.dataSource=data.filter(item=>item.depart.substr(2,2)==='公寓')
          console.log(that.dataSource);
        })
      })
    });
}


<<<<<<< HEAD
export function adddorman(refs,that){
  const form = refs.collectionForm.form;
      form.validateFields((err, values) => {
=======
export function editcampus(refs,dataSource,e,that){
    
    const form = refs.editForm[e].form;
    form.validateFields((err, values) => {
>>>>>>> fbf915561714e49279c4b80570992e4257e00e6c
        if (err) {
          return;
        }
        console.log("Received values of form: ", values);
        // console.log(values.department.join(','));
       fetch(`/api/admin`,{
         method:'POST',
         headers: {
            "Access-Control-Allow-Origin": "*",
            "content-type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({
            username: values.username,
            password:values.password,
            roleIds:[values.dorm]
          })
       }).then(res=>{
         return res.json()
       }).then(res=>{
        //  this.getmanagers();
        getdorman(that);
       })
        form.resetFields();
        that.visible = false;
      });
}

export function editdorman(refs,that){
  const form = refs.editForm.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log("Received values of form: ", values);
        // console.log(values.department.join(','));
       fetch(`/api/admin`,{
         method:'PUT',
         headers: {
            "Access-Control-Allow-Origin": "*",
            "content-type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({
            username: values.username,
            id:that.currentitem.id,
            roleIds:[values.dorm]
          })
<<<<<<< HEAD
       }).then(res=>{
         return res.json()
       }).then(res=>{
        //  this.getmanagers();
        getdorman(that);
       })
        form.resetFields();
        that.editvisible = false;
      });
=======
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
>>>>>>> fbf915561714e49279c4b80570992e4257e00e6c
}


export function deldorman(e,that){
  fetch(`/api/admin/${e}`,{
    method:'DELETE'
  }).then(res=>{
    if(res.status===200){
      getdorman(that);
    }
    return
  })

}