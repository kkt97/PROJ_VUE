<template>
  <div id="login">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <br>
          <div class="card">
            <div class="card-header">Login</div>
            <div class="card-body">
              <div class="row mb-3">
                <label for="user_id" class="col-md-4 col-form-label text-md-end">아이디</label>
                <div class="col-md-6">
                  <input id="user_id" type="text" class="form-control" name="user_id" v-model="item.user_id" autofocus>
                </div>
              </div>
              <div class="row mb-3">
                <label for="password" class="col-md-4 col-form-label text-md-end">비밀번호</label>
                <div class="col-md-6">
                  <input id="password" type="password" class="form-control" name="password" v-model="item.password" autofocus>
                </div>
              </div>
              <div class="row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button @click="login" class="btn btn-primary">
                    로그인
                  </button>
                  <a class="btn btn-link" href="/register">
                    회원가입
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";


const URL_API_LOGIN = 'http://localhost:8000/api/auth/login/login'

export default {
  name: "Login",
  data() {
    return {
      isLoggedIn: false,
      item: {
        user_id: '',
        password: '',
        token: '',
      },
      errors: [],
    }
  },
  methods: {

    async login() {
      var data = {
        user_id: this.item.user_id,
        password: this.item.password,
      };
      var router = this.$router;

      if (!data.user_id || !data.password){
        alert("Your email or password is empty");
      }

      axios.post(URL_API_LOGIN,
          {...this.item}
      ).then((res) => {
        if (res.status === 200) {
          this.result = res.data;
          console.log(this.result.access_token);
          this.token = this.result.access_token;
          console.log("토큰입니다: " + this.token);

          this.$cookie.set("accesstoken", this.token, 1);

          alert("Welcome!");
          router.push("/");
        }
      })
      .catch((err) => {
        alert("Sign in Failure: " + err);
      });
    },

  },
  watch: {
    'item': {
      deep: true,
      handler() {
        console.log('watch', this.item)
      },
    },
  },
}
</script>