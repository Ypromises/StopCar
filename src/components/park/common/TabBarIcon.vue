<template>
    <div>
        <img :src="Image" alt="">
    </div>
</template>
<script>
export default {
   props:{
       Image:{default:""}
   }

}
</script>

