<template>
    <div id="Div2">
        <van-nav-bar
    title="我的订单"
    left-text="返回"
    left-arrow
    @click-left="cancel"
  />
    <div class="Allinall">
       <!--  <div class="mytxt">我的订单</div>-->
        <div class="dingdan">
           <mt-navbar v-model="selected" class="dan">
  <mt-tab-item id="d1">
      <p class="tab" @click="getAll">全部订单</p>
      </mt-tab-item>
  <mt-tab-item id="d2">
      <p class="tab" @click="getOver">已完成</p>
      </mt-tab-item>
      <mt-tab-item id="d3">
      <p class="tab" @click="geting">停泊中</p>
      
      </mt-tab-item>
  <mt-tab-item id="d4">
      <p class="tab" @click="getNo">已预订</p>
      
      </mt-tab-item>
</mt-navbar>

<!-- tab-container -->
<mt-tab-container v-model="selected">
  <mt-tab-container-item id="d1" >
      <div v-if="list.length>0">
        <div class="orderList"  v-for="(item,i) of list" :key="i">
          <div class="p1">
            <p>车位号：{{item.spaceId}}</p>
            <div v-if="item.state==1">
                 <p>预定成功</p>
            </div>
            <div v-if="item.state==2">
                <p>订单正在进行中</p>
            </div>
            <div v-if="item.state==3">
             <p >订单已完成</p>
            </div> 
        </div>
        <div class="p2">
            <p>{{item.name}}</p>
            <!-- <p>{{item.price}}</p>   -->
            <p v-if="item.state==1||item.state==2">￥{{item.price/100}}</p>
            <p v-if="item.state==3">￥{{item.price}}</p>
        </div>
        <div class="BtnAll">
        <button class="delM1" :data-oid="item.oid" @click="Delding" v-if="item.state==3">删除</button>  
        </div>              
      </div> 
     </div>
   
  </mt-tab-container-item>
  <mt-tab-container-item id="d2">
      <div v-if="list1.length>0">
          <div class="orderList" v-for="(over,i) of list1" :key="i">
        <div class="p1">
            <p>车位号：{{over.spaceId}}</p>
           <div v-if="over.state==1">
                 <p>预定成功</p>
            </div>
            <div v-if="over.state==2">
                <p>订单正在进行中</p>
            </div>
            <div v-if="over.state==3">
             <p >订单已完成</p>
            </div>
        </div>
        <div class="p2">
            <p>{{over.name}}</p>
            <p>￥{{over.price}}</p>
        </div>
        <div class="BtnAll">
        <button class="delM" :data-oid="over.oid" @click="Delding1">删除</button>  
        <button class="btn_d" @click="zaici(over.location,over.lotId,over.lotPhone,over.name,over.price)" >再次预定</button>
        <!-- :data-location="over.location" :data-lotId="over.lotId" :data-lotPhone="over.lotPhone" :data-name="over.name" :data-price="over.price" -->
        </div>        
    </div>
      </div>
    
  </mt-tab-container-item>
  <mt-tab-container-item id="d3">
      <div v-if="list3.length>=1">
         <div class="orderList" v-for="(ingitem,i) of list3" :key="i">
        <div class="p1">
            <p class="u_name">车位号：{{ingitem.spaceId}}</p>
            <div v-if="ingitem.state==1">
                <p>预定成功</p>
            </div>
            <div v-if="ingitem.state==2">
                <p>订单正在进行中</p>
            </div>
            <div v-if="ingitem.state==3">
             <p >订单已完成</p>
            </div>
        </div>
        <div class="p2">
            <p class="name">{{ingitem.name}}</p>
            <p class="price">￥{{ingitem.price/100}}</p>
        </div>
        <div class="BtnAll">
        <button class="btn_d1" @click="money">查询订单</button>
        </div>       
    </div>  
      </div>  
  </mt-tab-container-item>
  <mt-tab-container-item id="d4">
      <div v-if="list2.length>=1">
         <div class="orderList" v-for="(noitem,i) of list2" :key="i">
        <div class="p1">
            <p class="u_name">车位号：{{noitem.spaceId}}</p>
            <div v-if="noitem.state==1">
                 <p>预定成功</p>
            </div>
            <div v-if="noitem.state==2">
                <p>订单正在进行中</p>
            </div>
            <div v-if="noitem.state==3">
             <p >订单已完成</p>
            </div>
        </div>
        <div class="p2">
            <p class="name">{{noitem.name}}</p>
            <p class="price">￥{{noitem.price/100}}</p>
        </div>
        <div class="BtnAll">
        <button class="delM" :data-oid="noitem.oid" @click="Delding2">取消订单</button>
        <button class="btn_d" @click="cutdown">查询订单</button>
        </div>       
    </div>  
      </div>
  </mt-tab-container-item>
</mt-tab-container>
        </div>  
    </div>   
    </div>
</template>
<script>
export default {
    inject:['reload'],
    data(){
        return{
            selected:"d1",
            list:[],
            list1:[],
            list2:[],
            list3:[]
        }
    },
    methods:{
      
        money(){
            this.$router.push("/Money")
        },
        cutdown(){
            this.$router.push("/Cutdown")
        },
        zaici(location,lotId,lotPhone,name,price){
            // var location=e.target.dataset.location;
            // var lotId=e.target.dataset.lotId;
            // var lotPhone=e.target.dataset.lotPhone;
            // var name=e.target.dataset.name;
            // var price=e.target.dataset.price;
           this.$router.push(
          {
          path:"/Order",
          query: {lotId,name,location,price,lotPhone}
          });
        },
         cancel(){
                this.$router.push("/")
                localStorage.setItem("changestate","geren")
       },
        getAll(){
            var name = localStorage.getItem("u_name")
           // console.log(name)
            if(name!=""){
            var url="orders/getModifiedTime";
            this.axios.get(url).then(res=>{
               //console.log(res);
                var state=res.data.state;
                if(state!=2000){
                    this.$messagebox("","亲，您还没有订单");
                }else{
                    //4.获取数据成功
                    var list=res.data.data;
                    console.log(list);
                    this.list=list;
                   
            }
        })
        }else{
            this.$messagebox("登录信息已过期，请退出重新登录！")
        }
        },
        //   detail(){           
        //        var url="orders/getModifiedTime";
        //        this.axios.get(url).then(res=>{
        //        // console.log(res);
        //         var state=res.data.state;
        //             //4.获取数据成功
        //             var list=res.data.data;
        //             console.log(list);
        //             this.list=list;  
        //                for(var  item of list ) {
        //                   // console.log(item)
        //                      if(item.state === 1){
        //                      this.$router.push("/Cutdown")
        //                                       }        
        //                      }       
            
        //    })
           
          
        // },
        getOver(){
            var url="orders/findCompletedOrder";
            this.axios.get(url).then(res=>{
                //console.log(res);
                var state=res.data.state;
                if(state!=2000){
                     this.$messagebox("","亲，还没有已完成的订单");
                     ///.then(res=>{
                // this.$router.push("/Login4");
                // return;
            // });
                }else{
                    //4.获取数据成功
                    var list1=res.data.data;
                   // console.log(list1);
                    this.list1=list1;
            }
        })
        },
        geting(){
             var url="orders/findEffectiveOrder";
            this.axios.get(url).then(res=>{
                var state=res.data.state;
               // console.log(res);
                if(state!=2000){
                     this.$messagebox("","亲，还没有您正在进行的订单")
                }else{              
                    //4.获取数据成功
                    var list3=res.data.data;
                    //console.log(list3);
                    this.list3=list3;                
            }
        })
        },
        getNo(){
            var url="orders/findNoCompleteOrder";
            this.axios.get(url).then(res=>{
                var state=res.data.state;
                //console.log(res);
                if(state!=2000){
                     this.$messagebox("","亲，还没有未完成的订单")
                }else{              
                    //4.获取数据成功
                    var list2=res.data.data;
                    //console.log(list2);
                    this.list2=list2;                  
            }
        })
        },
        Delding(e){
            // console.log(111);
            var oid=e.target.dataset.oid;
            // console.log(oid);
            this.$messagebox.confirm("请确认是否删除")
            .then(res=>{
                var obj={oid:oid};
                var url="orders/deleteOrder";
                this.axios.get(url,{params:obj}).then(res=>{
                    //console.log(res);
                    var state=res.data.state;
                    // console.log(state);
                    if(state!=2000){
                        this.$toast("删除失败！")
                    }else{
                        this.$toast("删除成功！")
                        this.loadMore();
                        this.reload();
                    }
                })
            }).catch(err=>{
                return;
            })
        },
        loadMore(){
           var u_name=localStorage.getItem("u_name");
           this.u_name=u_name;
          // console.log(u_name);
           if(u_name==""||u_name==null){
                   this.$messagebox.confirm("对不起，您还未登录请先登录！").then(action=>{
                       this.$router.push("/Login4")
               })
           }else{
                var url="orders/getModifiedTime";
                this.axios.get(url).then(res=>{
              //  console.log(res);
                var state=res.data.state;
                if(state!=2000){
                    this.$messagebox("","亲，您还没有订单");
                    //.then(res=>{
                //this.$router.push("/Login4");
                //return;
           // });
                }else{
                    //4.获取数据成功
                    var list=res.data.data;
                  //  console.log(list);
                    this.list=list;
                   
            }
        })
           }
           

        },
         Delding1(e){
            // console.log(111);
            var oid=e.target.dataset.oid;
            // console.log(oid);
            this.$messagebox("是否删除")
            .then(res=>{
                var obj={oid:oid};
                var url="orders/deleteOrder";
                this.axios.get(url,{params:obj}).then(res=>{
                    console.log(res);
                    var state=res.data.state;
                    // console.log(state);
                    if(state!=2000){
                        this.$toast("删除失败！")
                    }else{
                        this.$toast("删除成功！")
                        this.loadMore1(); 
                         this.reload();
                    }
                })
            }).catch(err=>{
                return;
            })
        },
        loadMore1(){
            var url="orders/findCompletedOrder";
            this.axios.get(url).then(res=>{
                console.log(res);
                var state=res.data.state;
                if(state!=2000){
                     this.$messagebox("","亲，还没有已完成的订单");
                     ///.then(res=>{
                // this.$router.push("/Login4");
                // return;
            // });
                }else{
                    //4.获取数据成功
                    var list1=res.data.data;
                    //console.log(list1);
                    this.list1=list1;
                   
            }
        })
        },
        Delding2(e){
            // console.log(111);
            var oid=e.target.dataset.oid;
            // console.log(oid);
            this.$messagebox.confirm("请确认是否取消订单")
            .then(res=>{
                var obj={oid:oid};
                var url="orders/endOfOrderByOid";
                this.axios.get(url,{params:obj}).then(res=>{
                   // console.log(res);
                    var state=res.data.state;
                    // console.log(state);
                    if(state!=2000){
                        this.$toast("取消失败！")
                    }else{    
                        this.loadMore2();  
                        this.reload();                  
                    }
                })
            }).catch(err=>{
                return;
            })
        },
        loadMore2(){
            var url="orders/findNoCompleteOrder";
            this.axios.get(url).then(res=>{
                var state=res.data.state;
                //console.log(res);
                if(state!=2000){
                     this.$messagebox("","亲，还没有未完成的订单")
                     //.then(res=>{
                // this.$router.push("/Login4");
                // return;
            // });
                }else{              
                    //4.获取数据成功
                    var list2=res.data.data;
                   // console.log(list2);
                    this.list2=list2;
                   
            }
        })
        },
        Delding3(e){
            var oid=e.target.dataset.oid;
            // console.log(oid);
            this.$messagebox("是否删除")
            .then(res=>{
                var obj={oid:oid};
                var url="orders/deleteOrder";
                this.axios.get(url,{params:obj}).then(res=>{
                    console.log(res);
                    var state=res.data.state;
                    // console.log(state);
                    if(state!=2000){
                        this.$toast("删除失败！")
                    }else{
                        this.$toast("删除成功！")
                        this.loadMore3();   
                        this.reload();
                    }
                })
            }).catch(err=>{
                return;
            })
        },
        loadMore3(){
             var url="orders/findEffectiveOrder";
            this.axios.get(url).then(res=>{
                var state=res.data.state;
                console.log(res);
                if(state!=2000){
                     this.$messagebox("","亲，还没有您正在进行的订单")
                }else{              
                    //4.获取数据成功
                    var list3=res.data.data;
                    console.log(list3);
                    this.list3=list3;
                   
            }
        })
        }
    },
    created(){
        this.loadMore();
        
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
.Allinall{
    position: absolute;
    top:55px;
    width: 100%;
}
.dingdan{
   position: relative;

}
.tab{
    font-size:14px;
    padding: 0px;
    margin: 0px;
}
.p1{
    position: relative;
    top:15px;
    display: flex;
    justify-content: space-around;
}
.p2{
    position: relative;
    top: 10px;
    left: -15px;
    display: flex;
    justify-content: space-around;
}
.BtnAll{
    display: flex;
    margin-left:140px;
    padding:10px;
}
.btn_d{
    background-color: rgb(126,206,244);
    outline: 0px;
    border:0px;
    width:80px;
    height:40px;
    margin-left:10px;
    /* margin-bottom:10px; */
    border-radius: 5px;
}
.btn_d1{
    background-color: rgb(126,206,244);
    outline: 0px;
    border:0px;
    width:80px;
    height:40px;
    margin-left:80px;
    /* margin-bottom:10px; */
    border-radius: 5px;
}
.delM{
   background-color: rgb(126,206,244);
    outline: 0px;
    border:0px;
    width:80px;
    height:40px;
    /* margin-left:160px;
    margin-bottom:10px; */
    border-radius: 5px;
 
}
.delM1{
   background-color: rgb(126,206,244);
    outline: 0px;
    border:0px;
    width:80px;
    height:40px;
    margin-left: 75px;
    border-radius: 5px;
 
}
.orderList{
    background: rgb(162, 226, 255);
    border-radius: 5px;
    font-size:14px;
    margin:10px;
}
.mint-navbar .mint-tab-item.is-selected {
    border-bottom: 3px solid #26a2ff;
    color: #26a2ff;
    margin-bottom: -3px;
}

  @media screen and (min-width: 414px) {
       .BtnAll{
        margin-left: 175px !important;
    }
    .delM1{
        margin-left: 75px !important;
    }
    .btn_d1{
        margin-left: 85px !important;
    }
  }
  
  
</style>
