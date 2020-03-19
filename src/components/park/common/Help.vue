<template>
<div>
        <van-nav-bar
    title="帮助与反馈"
    left-text="返回"
    left-arrow
    @click-left="cancel"
  />
    <div>
        <van-notice-bar
  class="text_t" text="亲爱的，我们还有什么做得不好的地方，请您反馈给我们，我们将迅速处理！！！"
  left-icon="volume-o"
/>
        <div class="texta" align="center">
          <textarea placeholder="请输入您宝贵的意见和建议..." v-model="suggest" class="txt_p" contenteditable="true" onfocus="if(value=='请输入您宝贵的意见和建议'){value=''}" onblur="if(value ==''){value='请输入您宝贵的意见和建议'}" id="text"></textarea>  
        </div>
        
        <div class="sub" align="center">
            <button @click="Submit">提交</button> 
        </div>
       
    </div>
    
    
    </div>    
</template>
<script>
export default{
    data(){
        return{
            suggest:""
        }
    },
    
    methods:{
        Submit(){
             var u_name=localStorage.getItem("u_name");
           this.u_name=u_name;
        //    console.log(u_name);
           if(u_name==""){
               this.$messagebox.confirm("对不起，您还未登录请先登录！").then(action=>{
                   this.$router.push("/Login4")
               })
           }else{
            // var txt=this.suggest;
            // var obj={suggest:txt}
            // var url="users/setMsg";
            // this.axios.get(url,{params:obj}).then(res=>{
            //     var state=res.data.state;
            //     console.log(state);
            //     if(state!=2000){
            //         this.$messagebox("提交失败！请重新提交");
            //     }else{
            //         this.$toast("提交成功！");
            //         this.$router.push("/");

            //     }
            // })
           var inputObj = document.getElementById('text');
             if(inputObj.value== ''){
                  this.$toast("不能为空！")
            }else{
                 this.$toast("提交成功！")
            	function ClearTextArea()
		         {
		            document.getElementById("text").value="";
                } 
               ClearTextArea();
		                    
                }
          }
            
    },
        cancel(){
            this.$router.push("/")
            localStorage.setItem("changestate","geren")
        }
    }
}
</script>
<style scoped>
.van-nav-bar {
    position: fixed;
    width:100%;
    height: 55px;
    line-height: 55px;
    text-align: center;
    background-color: #fff;
    -webkit-user-select: none;
    user-select: none;
  }
.txt_p{
    width:335px;
    height:270px;
    margin-top:10px;
    color:#666;
    padding:10px;
    text-indent: 20px;
    border:1px solid #ddd;

}
.text_t{
    position: relative;
    top:55px;
    font-size: 16px;
    padding-left: 20px;
}
.texta{
    position: relative;
    top:55px;
}
.sub{
    position: relative;
    top: 60px;
}
.sub button{
    width:300px;
    height:40px;
    background:rgb(126,206,244);
    border:0;
    outline:0;
    border-radius: 8px;
    font-size: 16px;
}
</style>
