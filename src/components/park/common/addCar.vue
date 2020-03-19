<template>
  <div class="main">
    <van-nav-bar
    title="添加车牌"
    left-text="返回"
    left-arrow
    @click-left="cancel"
  />
  <div class="carNumber"@click="onTypewriting">
      <input type="text" v-model="u_car_num" maxlength="8" readonly> <!-- ①一个输入框 -->
  </div>
  <div class="moren1">
      <input type="checkbox" v-model="cb" id="swmr">
      <label for="swmr">设为默认车牌号</label>
  </div>
  <div class="ok">
    <button @click="saveAdd" class="cherkBtn">保存</button> <!-- ②确定按钮 -->
  </div>
  <div class="tishi">
    <p>绑定须知：</p>
    <ul>
        <li>1.绑定本人名下真实车辆,确保真实，有效、可查</li>
        <li>2.车牌列表第一个为默认值</li>
        <li>3.有问题请向客服提问</li>
    </ul>
  </div>
  <div class="typer" v-show="showTyper!=0"> <!-- ③输入键盘 -->
    <ul v-show="showTyper==1"> <!-- ④省的输入 -->
      <li class="typer-pro" v-for="item in provinces" :class="{'is-closeType':item=='关闭'}"@click="input(item)">{{item}}</li>
    </ul>
    <ul v-show="showTyper==2"> <!-- ⑤字母数字的输入 -->
      <li class="typer-num" v-for="item in keyNums" :class="{'is-A': item=='A','is-L': item=='L','is-OK':item=='OK','is-Del':item=='Del'}"@click="input(item)">{{item}}</li>
    </ul>
  </div>
</div>
</template>
<script>
export default {
  data(){
    return {
      cb:"",
      showTyper: 0,    //输入法的值，0表示不显示，1表示显示省输入键盘，2表示显示数字字母输入键盘
      provinces:[
        "京","沪","浙","苏","粤","鲁","晋","冀","豫","川",
        "渝","辽","吉","黑","皖","鄂","津","贵","云","桂",
        "琼","青","新","藏","蒙","宁","甘","陕","闽","赣","湘","港","澳","关闭"
        ],
      keyNums:["1","2","3","4","5","6","7","8","9", "0",    //数字字母
        "Q","W","E","R","T","Y","U","I","O","P",
        "A","S","D","F","G","H","J","K","L",
        "OK","Z","X","C","V","B","N","M","Del"],
      u_car_num:'',    //输入的
    }
  },
  methods: {
    cancel(){
      this.$router.push("/myCar");
    },
    saveAdd() {   //对最终结果进行判断
      var cb=this.cb;
      console.log(cb);
      var u_car_num=this.u_car_num;
      if(cb===true){
        if(u_car_num.length==8){
          var carNumberReg = /^[京津沪渝蒙新藏宁桂港澳黑吉辽晋冀青鲁豫苏皖浙闽赣湘鄂粤琼甘陕贵云川]{1}[A-Z]{1}[DF]{1}[A-Z0-9]{5}||[京津沪渝蒙新藏宁桂港澳黑吉辽晋冀青鲁豫苏皖浙闽赣湘鄂粤琼甘陕贵云川]{1}[A-Z]{1}[A-Z0-9]{5}[DF]{1}$/;
          if(!carNumberReg.test(u_car_num)){
            this.$toast("请输入正确的车牌号码");
          }else{
            this.$messagebox.confirm("请确认您号码的真实性！").then(action=>{
                       var url="users/saveCar";
            var obj={u_car_num:u_car_num};
            this.axios.get(url,{params:obj}).then(res=>{
                console.log(res);
                var state=res.data.state;
                console.log(state);
                if(state===4000){
                  this.$toast("车牌号码已存在！")
                }else if(state!=2000 && state!=4000){
                  this.$toast("保存失败！")
                }else{
                  var url="cars/findByUid";
                  this.axios.get(url).then(res=>{
                    console.log(res);
                    var list=res.data.data;
                    console.log(list);
                    for(var item of list){
                      if(item.u_car_num===u_car_num){
                        console.log(item.c_id);
                        var cid=item.c_id;
                        var url="users/setC_id"
                        var obj={c_id:cid}
                        this.axios.get(url,{params:obj}).then(res=>{
                          console.log(state);
                          var state=res.data.state;
                          console.log(state);
                          if(state!=2000){
                            this.$toast("设为默认车牌失败！")
                          }else{
                              this.$toast("保存成功，且已设为默认车牌！")
                              this.$router.push("/myCar")
                          }
                        })
                      }
                    }
                  })
                }
                
              }) 
            }).catch(err=>{
              console.log("no")
            })
   
            }
          }else{
            console.log(u_car_num);
            var carNumberReg1 = /^[京津沪渝蒙新藏宁桂港澳黑吉辽晋冀青鲁豫苏皖浙闽赣湘鄂粤琼甘陕贵云川]{1}[A-Z]{1}[A-Z0-9]{5}$/;
            if(!carNumberReg1.test(u_car_num)){
              this.$toast("车牌号码格式不正确")
            }else{
              this.$messagebox.confirm("请您确认车牌号码的真实性！").then(action=>{
                     var url="users/saveCar";
              var obj={u_car_num:u_car_num};
              this.axios.get(url,{params:obj}).then(res=>{
                console.log(res);
                var state=res.data.state;
                console.log(state);
                if(state===4000){
                  this.$toast("车牌号码已存在！")
                }else if(state!=2000 && state!=4000){
                  this.$toast("保存失败！")
                }else{
                  var url="cars/findByUid";
                  this.axios.get(url).then(res=>{
                    console.log(res);
                    var list=res.data.data;
                    console.log(list);
                    for(var item of list){
                      if(item.u_car_num===u_car_num){
                        console.log(item.c_id);
                        var cid=item.c_id;
                        var url="users/setC_id"
                        var obj={c_id:cid}
                        this.axios.get(url,{params:obj}).then(res=>{
                          var state=res.data.state;
                          if(state!=2000){
                            this.$toast("设为默认车牌失败！")
                          }else{
                              this.$toast("保存成功，且已设为默认车牌！")
                              this.$router.push("/myCar")
                              this.reload();
                          }
                        })
                      }
                    }
                  })
                }
              }) 
              })  
              .catch(err=>{
                              console.log("no");
                            })
            }
         }
      }else{
        if(u_car_num.length==8){
          var carNumberReg = /^[京津沪渝蒙新藏宁桂港澳黑吉辽晋冀青鲁豫苏皖浙闽赣湘鄂粤琼甘陕贵云川]{1}[A-Z]{1}[DF]{1}[A-Z0-9]{5}||[京津沪渝蒙新藏宁桂港澳黑吉辽晋冀青鲁豫苏皖浙闽赣湘鄂粤琼甘陕贵云川]{1}[A-Z]{1}[A-Z0-9]{5}[DF]{1}$/;
          if(!carNumberReg.test(u_car_num)){
            this.$toast("车牌号码格式不正确")
          }else{
            this.$messagebox.confirm("请您确认车牌号码的真实性！").then(action=>{
                         var url="users/saveCar";
            var obj={u_car_num:u_car_num}
            this.axios.get(url,{params:obj}).then(res=>{
              console.log(res);
              var state=res.data.state;
              console.log(state);
               if(state===4000){
                  this.$toast("车牌号码已存在！")
              }else if(state!=2000 && state!=4000){
                  this.$toast("保存失败！")
              }else{
                  this.$toast("保存成功！")
                  this.$router.push("/myCar")
              }
            })
            })
            .catch(err=>{
                  console.log("no");
                })
 
          }
        }else{
          console.log(u_car_num);
          var carNumberReg1 = /^[京津沪渝蒙新藏宁桂港澳黑吉辽晋冀青鲁豫苏皖浙闽赣湘鄂粤琼甘陕贵云川]{1}[A-Z]{1}[A-Z0-9]{5}$/;
          if(!carNumberReg1.test(u_car_num)){
            this.$toast("车牌号码格式不正确")
          }else{
            this.$messagebox.confirm("请您确认车牌号码的真实性！").then(action=>{
            var url="users/saveCar";
            var obj={u_car_num:u_car_num}
            this.axios.get(url,{params:obj}).then(res=>{
              console.log(res);
              var state=res.data.state;
              console.log(state);
              if(state===4000){
                this.$toast("车牌号码已存在！")
              }else if(state!=2000 && state!=4000){
                this.$toast("保存失败！")
              }else{
                  this.$toast("保存成功！")
                  this.$router.push("/myCar") 
              }
            })
            })
            .catch(err=>{
                  console.log("no");
                })
          }
        }
      }
    },
    onTypewriting:function () {    //点击输入框时，弹出键盘
        this.showTyper = 1;
        this.changeTyper();
    },
    changeTyper:function () {    //判断输入的车牌号处于什么状态，为空？已输入第一个值（即省）？输入省之后的值？
        if(this.u_car_num.length>=1){
            this.showTyper = 2;
        }
        if(this.u_car_num.length==0){
            this.showTyper = 1;
        }
    },
    input:function (item) {    //键盘点击事件，传入键盘本身的值
        if(item=='OK'||item=='关闭'){    //判断是否点击了关闭按钮
            this.showTyper = 0;
            return;
        }
        if (item=='Del'){    //判断是否点击了删除按钮
            this.u_car_num = this.u_car_num.slice(0,-1);
            this.changeTyper();
            return;
        }
        if(this.u_car_num.length<8){    //判断当前的车牌号的数目是否合法，还未超出7位则可继续输入
            this.u_car_num=this.u_car_num+item;
            this.changeTyper();
        }else {
            console.log('车牌号码超出正常范围');
        }
    }
  }
}
</script>
<style>
  .main{
    position:absolute;
    /*overflow:hidden;溢出隐藏*/
    width:100%;
  }
  .van-nav-bar {
    position: fixed;
    height: 55px;
    width: 100%;
    line-height: 55px;
    text-align: center;
    background-color: #fff;
    -webkit-user-select: none;
    user-select: none;
  }
  .carNumber{
    position: relative;
    top: 55px;
    width: 100%;
    height: 50px;
    text-align: center;
  }
  .carNumber input{
    position: relative;
    width:90%;
    height:50px;
    text-align: center;
    border-radius: 10px;
  }
  .moren1{
    position: relative;
    top:75px;
    padding-left:20px;
  }
  .moren1 input{
    position: relative;
    width:16px;
    height:16px;
  }
  .moren1 label{
    position: relative;
    font-size:16px;
  }
  .ok{
    position: relative;
    text-align: center;
    top:85px;
  }
  .cherkBtn{
    position: relative;
    width: 50%;
    height: 35px;
    border: none;
    border-radius: 10px;
  }
  .tishi{
    position: relative;
    top:150px;
    font-size:16px;
    padding-left:20px;
  }
  .typer{
    position: fixed;
    bottom: 0;
    background-color: #ddd;
    padding:6px;
  }
  .typer li{
    float: left;
    height: 3rem;
    margin: .1rem .05rem 0;
    color: #333;
    text-align: center;
    font-size: 14px;
    line-height: 3rem;
    background-color: #ccc;
    -webkit-border-radius: .1rem;
    -moz-border-radius: .1rem;
    border-radius: 5px;
  }
  .typer li.typer-pro {
    width: 3rem;
    margin:10px 2px 2px;
  }
 
  .typer li.typer-pro.is-closeType {
    width: 6rem;
    float: right;
  }
  
  .typer li.typer-num {
    width: 3rem;
    margin:10px 2px 2px;
  }
  
  .typer li.typer-num.is-A {
    margin-left:2rem;
  }
  .typer li.typer-num.is-L {
    margin-right:1rem;
  }
  
  .typer li.typer-num.is-OK {
    width: 4.7rem;
    float:left;
  }
  
  .typer li.typer-num.is-Del {
    width: 4.7rem;
    float: right;
  }
  @media (min-width: 360px) and (max-height:641px)  {
    .typer{
      padding:4px;
    }
    .typer li.typer-pro {
      width: 2.6rem;
    }
    .typer li.typer-num {
      width: 2.6rem;
    }
    .typer li.typer-num.is-OK {
      width: 4rem;
      float:left;
    }
    .typer li.typer-num.is-Del {
      width: 4rem;
      float: right;
    }
  }
  @media (min-width: 411px) and (max-height:732px) {
    .typer{
      padding:5px;
    }
    .typer li.typer-pro {
      width: 3rem;
    }
    .typer li.typer-num {
      width: 3rem;
    }
    .typer li.typer-num.is-OK {
      width: 4rem;
      float:left;
    }
    .typer li.typer-num.is-Del {
      width: 4rem;
      float: right;
    }
  }
  @media (min-width: 320px) and (max-height:569px)  {
    .typer{
      padding:7px;
    }
    .typer li.typer-pro {
      width: 2.2rem;
    }
    .typer li.typer-num {
      width: 2.2rem;
    }
    .typer li.typer-num.is-OK {
      width: 3.5rem;
      float:left;
    }
    .typer li.typer-num.is-Del {
      width: 3.5rem;
      float: right;
    }
  }
  @media (min-width: 375px) and (max-height:668px) {
    .typer{
      padding:11px;
    }
    .typer li.typer-pro {
      width: 2.6rem;
    }
    .typer li.typer-num {
      width: 2.6rem;
    }
    .typer li.typer-num.is-OK {
      width: 4rem;
      float:left;
    }
    .typer li.typer-num.is-Del {
      width: 4rem;
      float: right;
    }
  }
  @media (min-width: 375px) and (min-height:812px) {
    .typer{
      padding:11px;
    }
    .typer li.typer-pro {
      width: 2.6rem;
    }
    .typer li.typer-num {
      width: 2.6rem;
    }
    .typer li.typer-num.is-OK {
      width: 4rem;
      float:left;
    }
    .typer li.typer-num.is-Del {
      width: 4rem;
      float: right;
    }
  }
   @media (min-width: 416px) and (max-height: 1023px) {
    .typer{
      padding:4px;
    }
    .typer li.typer-pro {
      width: 2.6rem;
    }
    .typer li.typer-num {
      width: 2.6rem;
    }
    .typer li.typer-num.is-OK {
      width: 4rem;
      float:left;
    }
    .typer li.typer-num.is-Del {
      width: 4rem;
      float: right;
    }
  }
  @media (min-width: 768px) and (max-height:1025px) {
    .typer{
      padding:3px;
    }
    .typer li{
      height: 4rem;
      font-size:20px;
      line-height: 4rem;
    }
    .typer li.typer-pro {
      width: 6rem;
    }
    .typer li.typer-pro.is-closeType {
      width: 10rem;
      float: right;
    }
    .typer li.typer-num {
      width: 6rem;
    }
    .typer li.typer-num.is-OK {
      width: 9rem;
      float:left;
    }
    .typer li.typer-num.is-Del {
      width: 9rem;
      float: right;
    }
  }
  @media (min-width: 1024px) and (max-height: 1980px) {
    .typer{
      padding:11px;
    }
    .typer li{
      height: 5rem;
      font-size:22px;
      line-height: 5rem;
    }
    .typer li.typer-pro {
      width: 8rem;
    }
    .typer li.typer-pro.is-closeType {
      width: 10rem;
      float: right;
    }
    .typer li.typer-num {
      width: 8rem;
    }
    .typer li.typer-num.is-OK {
      width: 12rem;
      float:left;
    }
    .typer li.typer-num.is-Del {
      width: 12rem;
      float: right;
    }
  }
  @media (min-width: 361px) and (max-height: 755px) {
    .typer{
      padding:10px;
    }
    .typer li.typer-pro {
      width: 2.5rem;
    }
    .typer li.typer-num {
      width: 2.5rem;
    }
    .typer li.typer-num.is-OK {
      width: 3.5rem;
      float:left;
    }
    .typer li.typer-num.is-Del {
      width: 3.5rem;
      float:right;
    }
  }
</style>