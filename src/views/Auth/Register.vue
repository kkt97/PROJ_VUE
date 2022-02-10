<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <br>
        <div class="card">
          <div class="card-header">Register</div>
          <div class="card-body">
            <div class="row mb-3">
              <span for="name" class="col-md-4 col-form-label text-md-end">이름</span>
              <div class="col-md-6">
                <input id="name" type="name" class="form-control" name="name" v-model="item.name" autofocus>
              </div>
            </div>
            <div class="row mb-3">
              <label for="user_id" class="col-md-4 col-form-label text-md-end">아이디</label>
              <div class="col-md-6">
                <input id="user_id" type="text" class="form-control" name="user_id" v-model="item.user_id" autofocus>
                <h5 style="color: red">{{ errMsg.user_id }}</h5>
                <span class="ml-4 text-sm text-gray-500">아이디는 6 ~ 15글자입니다</span>
              </div>
            </div>
            <div class="row mb-3">
              <label for="email" class="col-md-4 col-form-label text-md-end">이메일</label>
              <div class="col-md-6">
                <input id="email" type="email" class="form-control" name="email" v-model="item.email" autofocus>
                  <h5 style="color: red">{{ errMsg.email }}</h5>
              </div>
            </div>
            <div class="row mb-3">
              <label for="phone" class="col-md-4 col-form-label text-md-end">핸드폰 번호</label>
              <div class="col-md-6">
                <input id="phone" type="text" class="form-control" name="phone" v-model="item.phone" autofocus>
                <h5 style="color: red">{{ errMsg.phone }}</h5>
              </div>
            </div>
            <div class="postcode-demo">
              <button @click="showPopup()" class="col-md-4">주소 입력하기</button>
              <PostCode v-if="visible" @address="addrSelected" @change="totalAddr"/>
            </div>
            <br>
            <div class="row mb-3">
              <label for="etcaddr" class="col-md-4 col-form-label text-md-end">상세 주소</label>
              <div class="col-md-6">
                <input id="etcaddr" type="etcaddr" class="form-control" name="etcaddr" @change="totalAddr" v-model="etcaddr" autofocus>
              </div>
            </div>
            <div>모든 주소 : {{this.item.address}}</div>
            <div>우편 번호 : {{this.item.code}}</div>
            <h5 style="color: red">{{ errMsg.address }}</h5>
            <div class="row mb-3">
              <label for="password" class="col-md-4 col-form-label text-md-end">비밀번호</label>
              <div class="col-md-6">
                <input id="password" type="password" class="form-control" name="password" v-model="item.password" autofocus>
                <h5 style="color: red">{{ errMsg.password }}</h5>
                <span class="ml-4 text-sm text-gray-500">비밀번호는 8 ~ 20글자입니다</span>
              </div>
            </div>
            <div class="row mb-3">
              <label for="password" class="col-md-4 col-form-label text-md-end">비밀번호 확인</label>
              <div class="col-md-6">
                <input id="password_confirmation" type="password" class="form-control" name="password_confirmation" v-model="item.password_confirmation" autofocus>
              </div>
            </div>
            <div class="row mb-0">
              <div class="col-md-6 offset-md-4">
                <button @click="register" class="btn btn-primary">
                  가입하기
                </button>
                &nbsp;
                <button @click="goBack" type="button" class="btn btn-primary">
                  뒤로가기
                </button>
                &nbsp;
                <button class="btn btn-primary" @click="resetForm()">
                  Reset
                </button>
              </div>
            </div>
            <router-view :key="$route.fullPath"></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { VueDaumPostcode } from "vue-daum-postcode"
import Vue from "vue";
import PostCode from "@/components/PostCode";

Vue.use(VueDaumPostcode)

const URL_API_REGISTER = 'http://localhost:8000/api/register'


export default {
  name: 'Register',

  components: {
    PostCode
  },

  data() {
    return {
      errMsg: {
        address: '',
        user_id: '',
        email: '',
        phone: '',
        password: ''
      },
      item: {
        id: 0,
        name: '',
        user_id: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        code: '',
        address: '',
      },
      visible:false,
      etcaddr: '',
      addr1: '',
      itemId: 0,
      items: [],
    }
  },

  methods: {
    showPopup() {
      this.visible = true;
    },

    addrSelected(detail){
      console.log("선택된 주소", detail);
      this.addr1 = detail.jibunAddress;

      this.item.code = detail.zonecode;

      this.item.address = this.addr1  + ' ' +  this.etcaddr;

      this.visible = false;
    },

    totalAddr(){
      this.item.address = this.addr1 + ' ' + this.etcaddr;
    },

    async register() {

      const res = await axios.post(URL_API_REGISTER, {
        ...this.item
      }).then(res => {
        alert("회원가입이 되었습니다.")
        this.$router.push('/')
      }).catch(e => {
        const error = e.response.data.errors;

        console.log(error.user_id)
        console.log(error.email)
        console.log(error.phone)
        console.log(error.password)
        console.log(error.address)



        this.errMsg = {
          ...error
        }

        alert("회원가입이 되지 않았습니다.")
      })
    },

    resetForm() {
      this.item = {
        name: '',
        user_id: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
      };
    },

    goBack(){
      this.$router.go(-1); [2]
    },

  },
  mounted() {
    this.item.address
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


<style scoped>

</style>