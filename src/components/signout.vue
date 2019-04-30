<template>
    <div class='signout' @click="off">
        <a-icon type="poweroff" />
        <span>退出登录</span>
    </div>
</template>

<script>
export default {
    name:'signout',
    methods:{
        off(){
            // 退出登录的操作，fetch接口。清除roleid。路由跳转
            this.$router.push({ path: "/login" });
        }
    }
}
</script>

<style>
.signout{
    width: 100px;
    color: black;
    cursor: pointer;
    font-size: 14px;
}
.signout:hover{
    color: rgb(28, 28, 221);
}
</style>
