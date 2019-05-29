<template>
    <a-table :columns="columns" :dataSource="dataSource" class="components-table-demo-nested">
    </a-table>
</template>

<script>
const columns=[
    {
        title:'学号',
        dataIndex:'username',
        key:'username'
    }, {
        title:'学生姓名',
        dataIndex:'name',
        key:'name'
    }, {
        title:'毕业去向',
        dataIndex:'placement',
        key:'placement'
    }
]
export default {
    data(){
        return{
            columns,
            dataSource:[],
        }
    },
    beforeCreate(){
        this.$ajax.get("/api/admin/stu/place")
        .then((response,data,content) =>{
            this.dataSource = response.data.content;
            console.log(response.data.content);
        })
    }
}
</script>

<style>

</style>
