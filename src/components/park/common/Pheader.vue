<template>
    <div class="wrap">
        <span>{{Title}}</span>
    </div>
</template>
<script>
export default {
   props:{
       Title:{default:""}
   }
}
</script>
<style scoped>
.wrap{
    display: flex;
    position: fixed;
    z-index:999;
    align-items:center;
    justify-content: center;
    width:100%;
    height: 55px;
    font-size:20px;
    background-color:rgb(126,206,244);
}



</style>


