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
                  <h5 style="color: red">
                    <div v-if="!errMsg == 0">
                      <div v-if="errMsg == 'Error: Request failed with status code 422'">
                          {{errMsg.response.data.user_id}}
                            <br>
                          {{errMsg.response.data.password}}
                      </div>
                      <div v-else-if="errMsg == 'Error: Request failed with status code 401'">
                        아이디 혹은 비밀번호가 맞지 않습니다.
                      </div>
                    </div>
                    <div v-else>
                    </div>
                  </h5>
                </div>
              </div>
              <div class="row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button @click="login" class="btn btn-primary">
                    로그인
                  </button>
                  <a class="btn btn-link" router="/register">
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
      },
      isLoggedIn: false,
      item: {
        user_id: '',
        password: '',
      },
      errors: [],
      token: '',
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
        this.errMsg = e
      })
    }
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