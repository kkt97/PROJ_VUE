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
                  <h5 style="color: red">{{ errMsg.user_id }}</h5>
                </div>
              </div>
              <div class="row mb-3">
                <label for="password" class="col-md-4 col-form-label text-md-end">비밀번호</label>
                <div class="col-md-6">
                  <input id="password" type="password" class="form-control" name="password" v-model="item.password" autofocus>
                  <h5 style="color: red">{{ errMsg.password }}</h5>
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
import axios from "axios"


const URL_API_LOGIN = 'http://localhost:8000/api/auth/login/login'

export default {
  name: "Login",
  data() {
    return {
      errMsg: {
        user_id: '',
        password: ''
      },
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

      const res = await axios.post(URL_API_LOGIN,
          {...this.item}
      ).then(res => {
          this.result = res.data

          this.token = this.result.access_token

          this.$cookie.set("accesstoken", this.token, 1)

          alert("Welcome!")
          this.$router.push('/')
      })
      .catch(e => {
        const error = e.response.data.errors;

        console.log(error.user_id)
        console.log(error.password)

        this.errMsg = {
          ...error
        }

        alert(`${this.errMsg.user_id}`&&`${this.errMsg.password}`)

      })
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