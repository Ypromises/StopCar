<template>
  <div class="BMap">
    <router-link target="_self" class="link" to='Bmap'>百度地图</router-link>
    <div class="city-panel"></div>
    <div class="m-filter">
      <div class="mui-input-row mui-search mui-active">
        <input type="search" id="address-detail" class="address-detail mui-input-clear" name="address-detail" placeholder="选择停车场附近街道/商场" >
      </div>
      <span class="sl-switch">
                <span class="curcity">{{curcity}}</span>
      <span class="icon icon-ctrl pos"></span>
      </span>
      <span class="cancel" @click="initmap1" v-show="showname">取消</span>
    </div>
    <div class="pos-icon" v-if='mapShow'>
      <div class="obj">
        <img src="./img/cur1.png">
      </div>
    </div>
    <div id="mapPanel">
      <div style="text-align:center;padding-top:200px;color:#fff;">地图加载中...</div>
    </div>
    <div id="m-result">
      <span class="curResult">
                <img src="./img/jianzhu.png" style="width:35px;height:35px;">
                <span class="curTit">
                  {{curTit}}
                </span>
      <span class="curAddress">
                  {{curAddress}}
                 </span>
      </span>
      <!-- <button class="confirm" @click='submitAdd'>确定</button> -->
    </div>
    <span class="pos-panel">
            <div class="pos-tool" @click='getPos'>
              <div class='overlay-loader'>
                    <div class="loader">
                        <img src="./img/local.png" >
                    </div>
              </div>           
                <!-- <img src="../img/pointer.png" alt=""> -->
            </div>
    </span>
    <div class="cityList" id="cityPanel"></div>
    <div class="poiList" id="poiPanel" v-if='poiShow'>
      <div class="content">
        <ul>
          <li v-for="poi in poiList.data" @click="getPoi(poi)">
            <img src="./img/building.png" alt="">
            <span class="poi-name">{{poi.name}}</span>
            <span class="poi-address">{{poi.address}}</span>
          </li>
        </ul>
        <div class="empty" v-if='poiList.data.length==0'>
         没有找到您要搜索的内容，请重新输入试试？
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {loadingMap} from './utils/load'
localStorage.setItem("changestate","shouye");
// console.log(localStorage.getItem("changestate"));
export default {
  name: 'HelloWorld',
  data() {
    return {
      poiList: { data: [] },
      map: null,
      geoLocation: null,
      ac: null,
      cur_city: '',
      mapShow: false,
      r_address: '',
      cityName: '',
      r_city: '',
      r_name: '',
      r_lng: '',
      r_lat: '',
      poiShow: false,
      curTit: '',
      curAddress: '',
      curcity: '定位中',
      local: null,
      showname:false
    
    }
  },
  created() {
    this.loadScript();
  },
  methods: {
    
    // submitAdd() {
    //   console.log(this.curTit + this.curAddress)
    //   console.log(this.r_lng + ',' + this.r_lat)
    // },
   
    loadScript() {
      loadingMap('baidu','pp80VAShAECfOms9SkWCHqvCXazME1tE').then(() => {
        this.initMap()
      });
      // let script = document.createElement("script");
      // script.src = "";
      // document.body.appendChild(script);
      // script.onload=()=>{
      //   alert("fcku")
      //   this.initMap();
      // }
      // setTimeout(()=>{
      //   this.initMap()
      // },3000)
    },
     initmap1(){
       this.$router.push("/");
       this.poiShow=false;
       this.showname=false;
       var inputObj = document.getElementById('address-detail');
         if(inputObj.value !== ''){
           inputObj.value = '';
         }
   },
    openPoi() {
      this.poiShow = true;
    },
    hidePoi() {
      this.poiShow = false;
    },
   
    
    //init Map
    initMap() {
      this.map = new window.BMap.Map("mapPanel");
      //初始城市昆明
      this.map.centerAndZoom(new BMap.Point(102.714731,25.040537), 18);
      this.map.addEventListener("dragend", () => { 
        this.showPoi();
      });
      //定位
      this.geoLocation = new window.BMap.Geolocation();
      this.getPos();
      this.mapShow = true;
    },
    getPos() {
      let geoL = this.geoLocation;
      geoL.getCurrentPosition((r) => {
        if (geoL.getStatus() == BMAP_STATUS_SUCCESS) {
          this.cur_city = r.address.city;
          this.resetAutocomplete(this.cur_city);
          var c_lat = r.point.lat;
          var c_lng = r.point.lng;
          this.curcity = this.cur_city.split("市")[0];
          // _obj.map.addOverlay(lmarker);
          this.map.centerAndZoom(new BMap.Point(c_lng, c_lat), 16);
          this.showPoi();
        } else {}
      });
    },
    showPoi() {
      var center = this.map.getCenter();
      var sc_pt = new BMap.Point(center.lng, center.lat);
      var geoc = new BMap.Geocoder();
      var mOption = {
        poiRadius: 2000, //半径为1000米内的POI,默认100米
        numPois: 1 //列举出50个POI,默认10个
      }
      geoc.getLocation(sc_pt, (rs) => {
        var results = rs.surroundingPois;
        var Rlist = [];
        if (results.length > 0) {
          for (var i = 0; i < results.length; ++i) {
            Rlist.push({
              "title": results[i].title,
              "address": results[i].address,
              "city": results[i].city,
              "lng": results[i].point.lng,
              "lat": results[i].point.lat
            });
          }
          this.showList(Rlist);
        } else {
        }
      }, mOption);
    },
    showList(list) {
      var reslt = ""
      for (var i in list) {
        reslt += (list[i].address + list[i].title);
      }
      this.r_lat = list[0].lat;
      this.r_lng = list[0].lng;
      this.curAddress = list[0].address;
      this.curTit = list[0].title;
      var r_lng=this.r_lng;
      var r_lat=this.r_lat;
      //console.log("经度"+r_lng,"纬度"+r_lat);
     // console.log(list)
    //  this.$store.commit('getDingwei',r_lng)
      //this.$store1.commit('getDingwei1',this.r_lat)
      //保存到缓存 home调取
      localStorage.setItem("longitude",this.r_lng)
      localStorage.setItem("latitude",this.r_lat)
      // localStorage.setItem("curTit",this.curTit)
      

    },
    resetAutocomplete(_cityStr) {
      if (this.ac) this.ac.dispose();
      this.ac = new BMap.Autocomplete({
        "input": "address-detail",
        "location": _cityStr,
        "onSearchComplete": this.SearchingCmplt
      });
    },
    getPoi(poi) {
      this.hidePoi();
      this.local = new BMap.LocalSearch(this.map, { //智能搜索
        onSearchComplete: this.searchDone
      });
      let _value = poi;
      this.r_address = _value.address + _value.name;
      this.local.search(this.r_address);
    },
    searchDone() {
      var pp = this.local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
      this.map.centerAndZoom(pp, 18);
      this.curAddress = this.local.getResults().getPoi(0).address;
      this.curTit = this.local.getResults().getPoi(0).title;
      if (this.cityName !== "") {
        this.curcity = this.cityName.split("市")[0];
        this.resetAutocomplete(this.cityName);
      }
    },
    SearchingCmplt(AutocompleteResult) {
      var poiDetails = [];
      for (var i = 0; i < AutocompleteResult.getNumPois(); i++) {
        if (AutocompleteResult.getPoi(i)) {
          poiDetails.push({
            name: AutocompleteResult.getPoi(i).business,
            address: AutocompleteResult.getPoi(i).city + AutocompleteResult.getPoi(i).district,
            city: AutocompleteResult.getPoi(i).city.split("省").length > 1 ? AutocompleteResult.getPoi(i).business : AutocompleteResult.getPoi(i).city,
            district: AutocompleteResult.getPoi(i).district
          });
        }
      }
      this.poiList = {
        data: []
      }
      this.poiList.data = poiDetails;
      this.openPoi();
      this.showname=true;
    }
  }

}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.tangram-suggestion-main {
  display: none!important;
}

.BMap {

  .anchorBL {
    top: 70px!important;
  }
  width: 100%;
  height: 615px !important;
  height: 100%;
  overflow: hidden;
  position: relative;
  display:flex;
  align-items:center;
  justify-content:center;
  // margin-bottom: 60px;
    #mapPanel {
    min-height: 515px;
    height: 100%;
    width: 100%;
    position: absolute!important;
    background-color:rgba(76, 76, 76, 0.7686274509803922);
  }
  .pos-panel {
    width: 92%;
    left: 4%;
    bottom: -50px;
    position: absolute;
  }
  .pos-icon {
    z-index: 999;
    position: absolute;
    left: 45%;
    top: 45%;
    width: 29px;
    height: 40px;
    display: block;
  }
  .pos-icon .obj {
    position: absolute;
  }
  .pos-icon .obj>img {
    width: 38px;
  }
  .pos-icon .shadow {
    position: absolute;
    top: 34px;
    left: 3.5px;
  }
  .pos-icon .shadow>img {
    width: 10px;
  }
  .pos-tool {
    box-shadow: 0px 2px 2px #7b7b7b;
    position: absolute;
    width: 37px;
    height: 37px;
    border-radius: 5px;
    background: #f0f0f0;
    bottom: 140px;
    text-align: center;
    line-height: 34px;
    img {
      width: 24px;
    }
  }
  .city-panel {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    z-index: 5000;
    display: none;
  }
  .poi-panel {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    z-index: 5000;
    display: none;
  }
  .m-filter {
  width: 100%;
    position: absolute;
    top: 0px;
    left: 0px !important;
    z-index: 999;
    background-color: rgb(126,206,244) !important;
    margin: 0 auto;
    padding: 15px 0px;
    height: 55px !important;
    .cancel {
      position: absolute;
      display: block;
      font-size: 15px;
      right: 15px;
      top: 19px;
      z-index: 10;
    }
    .sl-switch {
      top: 0px;
      position: absolute;
      display: block;
      z-index: 10;
    }
  }
  .m-filter {
    div {
      .address-detail {
    outline: none;
    display: block;
    width: 75.8%;
    border: 0px solid #000;
    border-radius: 20px;
    margin-left: 15%;
    -webkit-appearance: none;
    padding-left: 30px;
    border-bottom: 1px solid #c6c6c6;
    line-height: 20px;
    font-size: 15px;
  
    /* padding-bottom: 5px; */
   /* text-align: center;*/
    height: 30px;
    font-size: 14px;
      }
    }
  }
  @media (min-width: 320px) and (max-height:668px)  {
     height: 589px !important;
  }
   @media (min-width: 320px) and (max-height:569px)  {
     height: 515px !important;
  }
   @media (min-width: 414px) and (max-height:737px) {
      height: 678px !important;
  }
    @media (min-width: 411px) and (max-height:737px) {
      height: 678px !important;
  }
   @media (min-width: 375px) and (max-height:668px) {
      height: 615px !important;
  }
  @media (min-width: 375px) and (min-height:812px) {
      height: 760px !important;
  }
   @media (min-width: 416px) and (max-width: 1023px) {
      height: 960px !important;
  }
   @media (min-width: 1024px) and (max-width: 1980px) {
      height: 1300px !important;
  }
  @media (min-width: 361px) and (max-height: 755px) {
    height: 680px !important;
  }
  .m-filter>div {
    width: 85%;
    margin: 0 auto;
  }
  .m-filter .mui-search {
    display: block;
    position: relative;
    content: ""
  }
  .m-filter .curcity {
   text-align: center;
    position: absolute;
    font-size: 16px;
    line-height: 16px;
    left: 10px;
    top: 15px;
    width: 60px;
    white-space: nowrap;
    overflow: hidden;
    top: 22px;
    text-overflow: ellipsis;
  }
  #m-result {
    position: absolute;
    bottom: 10px;
    width: 92%;
    background: #fff;
    left: 4%;
    border-radius: 5px;
    box-shadow: 0px 2px 2px #7b7b7b;
    .curResult {
      float: left;
      padding-left: 40px;
      box-sizing: border-box;
      display: block;
      width: 82%;
      span {
        height: 26px;
        width: 100%;
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 15px;
        text-align: center;
      }
      .curTit {
        float: left;
        padding-top: 6px;
        color: #35353f;
        font-size: 16px;
        text-align: center;
      }
      .curAddress {
        float: left;
        padding-bottom: 4px;
        color: #90909b;
        height: 25px;
      }
      img {
        width: 20px;
        position: absolute;
        left: 10px;
        top: 10px;
      }
    }
    .confirm {
      float: left;
      width: 18%;
      border: 0px;
      height: 60px;
      background: #1ea7fe;
      color: #fff;
      border-radius: 0px 5px 5px 0px;
      font-size: 15px;
    }
  }
  .cityList {
    width: 100%;
    height: 92%;
    overflow: scroll;
    overflow-x: hidden;
    background: #fff;
    position: absolute;
    display: none;
    z-index: 100000;
    top: 45px;
    .content {
      position: relative;
      ul {
        padding-top: 49px;
      }
      span {
        padding-left: 15px;
        font-size: 15px;
        min-height: 28px;
      }
      li {
        padding-left: 15px;
        font-size: 15px;
        line-height: 49px;
        border-bottom: 1px solid #f1f1f6;
      }
      .tit-bar {
        width: 100%;
        background: #f0f0f0;
        display: block;
        font-size: 13px;
        color: #90909b;
        padding: 15px;
      }
    }
    .footer {
      p {
        line-height: 15px;
        a {
          line-height: 20px;
          font-size: 14px;
          color: #35353f;
          font-family: PingFangSC-Semibold;
        }
      }
    }
    .cur-city {
      width: 100%;
      position: fixed;
      top: 44px;
      background: #fff;
      border-bottom: 0px solid #fff!important;
    }
  }
  .cityList.fixing-ios {
    top: 64px;
    .cur-city {
      top: 63px;
    }
  }
  .poiList {
    width: 100%;
    height: 100%;
    overflow: scroll;
    overflow-x: hidden;
    position: absolute;
    background-color: #f0f0f0;
    z-index: 99999;
    top: 52px;
    .content {
      background: #f0f0f0;
      padding: 10px;
      .empty {
        width: 100%;
        text-align: center;
        img {
          margin-top: 80px;
          width: 158px;
        }
      }
      ul {
        background: #fff;
        padding-left: 0px;
      }
      li {
        text-align: left;
        position: relative;
        padding-left: 40px;
        font-size: 15px;
        border-bottom: 1px solid #f1f1f6;
        img {
          position: absolute;
          top: 15px;
          width: 20px;
          left: 10px;
        }
      }
      span {
        width: 99.9%;
        display: block;
        font-size: 15px;
        line-height: 28px;
      }
      .poi-name {
        font-size: 16px;
      }
      .poi-address {
        font-size: 13px;
        color: #90909b;
        min-height: 28px;
      }
    }
    .footer {
      p {
        a {
          font-size: 14px;
          color: #35353f;
          font-family: PingFangSC-Semibold;
        }
      }
    }
    .cur-city {
      width: 100%;
      position: fixed;
      top: 8%;
      background: #fff;
    }
  }
  .poiList.fixing-ios {
    top: 115px;
  }
}

</style>
