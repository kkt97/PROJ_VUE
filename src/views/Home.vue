<template>
  <div id="home">
    <div class="container">
      <div class="row">
        <div class="col-md-10 col-md-offset-1">
          <div class="panel">
            <div @click="loginCheck">
              {{ this.items.name }}님 안녕하세요. <br>
              여기는 홈입니다.<br>
            </div>

            <router-link to="/login" class="btn btn-primary"> 홈페이지에 들어오시려면 로그인을 하셔야 합니다.</router-link>
            <br>
            <br>

            <router-link to="/register" class="btn btn-primary"> 아이디가 없으시면 회원가입을 하세요.</router-link>
            <br>
            <br>

            <button @click="loginCheck" class="btn btn-primary"> 로그인 체크 </button>
            <br>
            <br>

            <button @click="deleteCookie" class="btn btn-primary">로그아웃</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const URL_API_LOGINCHECK = 'http://localhost:8000/api/auth/loginCheck/'

export default {
  name: "Home",
  data() {
    return {
      isCookie:null,
      items:[],
    }
  },
  methods:{
    async loginCheck() {

      const cookie = this.$cookie.get('accesstoken');
      console.log(cookie);

      axios.defaults.headers.Authorization = 'Bearer ' + cookie;

      const res = await axios.get(URL_API_LOGINCHECK)

      console.log(res.config.headers.Authorization)
      console.log('Bearer' + ' ' + cookie)
      console.log(res.data)

      this.items = res.data;

      console.log(this.items)
    },
    async deleteCookie() {
      this.$cookie.delete("accesstoken");
      this.isCookie = document.cookie;
      alert("로그아웃 되었습니다.");
      this.items = []
    }
  },

  mounted() {
    this.loginCheck()
  },
}

</script>

<style scoped>

</style>