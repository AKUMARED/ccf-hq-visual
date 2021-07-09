<template>
  <div>
    <dv-full-screen-container class="bg">
      <div class="cont_join">
        <div class="cont_form_join">
          <h2>登录</h2>
          <div>
            <p>Username:</p>
            <input
              type="text"
              class="input_text"
              v-model="username"
              placeholder="username"
            />
          </div>
          <div>
            <p>Password:</p>
            <input
              type="password"
              class="input_text"
              v-model="password"
              placeholder="password"
              v-show="true / false"
            />
          </div>
          <div class="cont_btn_join">
            <a href="#" @click="login()">Login</a>
          </div>
        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "admin",
      password: "123456",
    };
  },
  components: {},
  mounted() {},
  computed: {},
  methods: {
    login() {
      if (this.username === "admin" && this.password === "123456") {
        this.$router.push("/overView/index");
      }
    },
  },
};
</script>

<style scoped>
* {
  margin: 0 auto;
  padding: 0px;
  text-align: center;
  text-decoration: none;
}
.bg {
  padding: 0.2rem 0.2rem 0 0.2rem;
  background-image: url("../assets/loginBg.png");
  background-size: cover;
  background-position: center center;
}
.cont_form_join {
  width: 300px;
  height: 300px;
  margin-top: 32vh;
  margin-left: 72vw;
}
.cont_form_join h2 {
  padding: 25px 38px 40px 20px;
  color: #fff;
  font-size: 28px;
}
.cont_form_join div {
  margin: -10px 23px 37px 0;
}
.cont_form_join p {
  /* padding:10px 0 0 13px; */
  position: relative;
  top: -4px;
  left: -88px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}
.input_text {
  width: 250px;
  height: 36px;
  /* margin-left: 22px; */
  color: #666;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
  /* padding-right: 160px; */
  text-align: left;
  text-indent: 6px;
  font-size: 14px;
}
.input_text:focus {
  outline: none;
  border: 1px solid skyblue;
}
.cont_btn_join {
  width: 230px;
  height: 40px;
  border-radius: 4px;
  background: #2e5085;
  position: relative;
  left: 23px;
  top: 30px;
  text-align: center;
  font-size: 20px;
  line-height: 40px;
}
.cont_btn_join a {
  color: #fff;
}
</style>