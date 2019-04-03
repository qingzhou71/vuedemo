<template>
    <div class='process'>
        {{msgs}}
    </div>
</template>

<script>
export default {
    name:'process',
    props:['msg'],
    data(){
        return {
            msgs:this.msg
        }
    }
}
</script>
