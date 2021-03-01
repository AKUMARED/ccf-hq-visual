<template>
  <div >
    <dv-full-screen-container class="bg" >
        <div class="cont_join  ">
            <div class="cont_form_join">
                <h2>登陆</h2>

                <p>用户名:</p>
                <input type="text" class="input_text" v-model="username"/>
                <p>密码:</p>
                <input type="password" class="input_text" v-model="password" v-show="true/false"/>
            </div>
            <div class="cont_btn_join">
                <a href="#" @click="login()">Login</a>
            </div>
        </div>
    </dv-full-screen-container>
  </div>
</template>
<script>

export default {
  data () {
    return {
        username:"",
        password:""
    };
  },
  components: {
  },
  mounted () {

  },
  computed:{
  },
  methods: {
      login(){
          if(this.username === "admin" && this.password === "123456"){
              this.$router.push('/index');
          }
      }
  }
};
</script>

<style scoped>
* {
    margin:0 auto; padding:0px;
    text-align:center;
    text-decoration:none;
}
.bg {
    padding: 0.2rem 0.2rem 0 0.2rem;
    background-image: url("../assets/pageBg.png");
    background-size: cover;
    background-position: center center;
}
.cont_join {
    overflow:hidden;
    position:absolute;
    width:320px;
    height:460px;
    left:50%;
    top:50%;
    margin-top:-230px;
    margin-left:-160px;
    -webkit-transition: all 500ms;
    -o-transition: all 500ms;
    transition: all 500ms;

}
.cont_join:hover {
    box-shadow:1px 1px 1000px 1000px rgba(0,0,0,0.5),0px 0px 20px 4px rgba(0,0,0,0.4);

}
.cont_form_join {
    /*position: relative;*/
    width:100%;
    height:94%;
    float:left;
    left:-320px;
    -webkit-transition: all 500ms;
    -o-transition: all 500ms;
    transition: all 500ms;
    bottom:0px;


}
.cont_btn_join {
    position:absolute;
    bottom:0px;
    width:100%;
    -webkit-transition: all 500ms;
    -o-transition: all 500ms;
    transition: all 500ms;

}
a {
    display:block;
    text-align:center;
    padding:10px 0px;
    background-color:rgba(21, 74, 118,0.82);
    font-size:20px;
    /*font-family:Arial;*/
    font-weight:100;
    width:100%;
    color:#fff;
}
h2 {
    font-family: 'Josefin Sans';
    font-wight:800;
    color:#fff;
    font-size:40px;
    margin-top: 1rem;
}
p{
    font-weight:700;
    color:#fff;
    font-size:20px;
    margin:45px 0px 2px 25px;
    text-align:left;
}
.input_text {
    width:270px;
    padding:10px;
    margin-top: 0.3rem;
    border:1px solid rgba(0,0,0,0.2);
    font-size:20px;
    text-align:left;
    background-color:rgba(255,255,255,0.7);
    color: #000000;
}
</style>