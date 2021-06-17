<template>
  <div >
    <dv-full-screen-container class="bg" >
       <div class="mainList">
           <ul>
               <li class="add_li">
                   <a target="_blank">
                       <span class="add_context">
                           <b style="color: #12a3ce">新建场景</b>
                       </span>
                   </a>
               </li>
               <li class="app_li"  @click="goScene()">
                   <a target="_blank">
                       <img  src="@/assets/listPg1.png" alt="" class="img-blur">
                       <span class="app_context">
                           <b class="app_name">配电网运行在线分析</b>
                       </span>
                   </a>
               </li>
           </ul>
       </div>
    </dv-full-screen-container>
  </div>
</template>
<script>

export default {
  data () {
    return {

    };
  },
  components: {
  },
  mounted () {

  },
  computed:{
  },
  methods: {
      goScene() {
          this.$router.push("/overView/index");
      },
  }
};
</script>

<style scoped lang="less">
* {
    /*margin:0 auto; padding:0px;*/
    text-align:center;
    text-decoration:none;
}
.bg {
    padding: 0.2rem 0.2rem 0 0.2rem;
    background-image: url("../assets/homeBg1.png");
    background-size: cover;
    background-position: center center;
}
.header-right {
    display: inline-block;
    float: right;
    .header-right-item {
        display: inline-block;
        padding: 0 15px 15px 0;
    }
}
.mainList ul {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    padding-left: 0!important;
}
.mainList ul li {
    list-style: none!important;
    position: relative;
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
    z-index: 200;
    /*margin-left: 180px;*/
    margin-top: 100px;
    width: 200px;
    height: 135px;
    margin-left: 30px;
    background-color: #1D262E;
    box-shadow: 5px 5px 1px rgba(0, 0, 0, 0.25);
    /*border-radius:25px;*/
}
.mainList ul li img {
    width: 100%;
    /*height: 100px;*/
    border: #ffffff;
    /*border-radius: 35%;*/
    z-index: 100;
    position: relative;
    display: block;
    float: left;
    /*top: 10px;*/
    /*left: 10px;*/

}
.app_context{
    /*width: 170px;*/
    /*height: 100px;*/
    /*position: relative;*/
    /*right: 40px;*/
    /*top:120px;*/
    /*left: 20px;*/
    /*background-color: #1D262E;*/
}
.app_name{
    width: 170px;
    float: top;
    color: #fff;
}
.add_li{
    border:1px solid #12a3ce;
    /*background-color: #ffffff;*/
}
    .add_context{
        width: 170px;
        height: 100px;
        position: relative;
        top:60px;
    }
</style>