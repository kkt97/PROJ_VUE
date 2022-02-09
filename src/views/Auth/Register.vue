<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <br>
        <div class="card">
          <div class="card-header">Register</div>
          <div class="card-body">
            <div class="row mb-3">
              <label for="name" class="col-md-4 col-form-label text-md-end">이름</label>
              <div class="col-md-6">
                <input id="name" type="name" class="form-control" name="name" v-model="item.name" autofocus>
              </div>

            </div>
            <div class="row mb-3">
              <label for="user_id" class="col-md-4 col-form-label text-md-end">아이디</label>
              <div class="col-md-6">
                <input id="user_id" type="text" class="form-control" name="user_id" v-model="item.user_id" autofocus>
              </div>
            </div>
            <div class="row mb-3">
              <label for="email" class="col-md-4 col-form-label text-md-end">이메일</label>
              <div class="col-md-6">
                <input id="email" type="email" class="form-control" name="email" v-model="item.email" autofocus>
              </div>
            </div>
            <div class="row mb-3">
              <label for="phone" class="col-md-4 col-form-label text-md-end">핸드폰 번호</label>
              <div class="col-md-6">
                <input id="phone" type="text" class="form-control" name="phone" v-model="item.phone" autofocus>
              </div>
            </div>
            <div class="postcode-demo">
              <button @click="showPopup()" class="col-md-4">주소 입력하기</button>
              <PostCode v-if="visible" @address="addrSelected" @change="totalAddr"/>
            </div>
            <div>기본주소 : {{this.addr1}}</div>
            <br>
            <div class="row mb-3">
              <label for="etcaddr" class="col-md-4 col-form-label text-md-end">상세 주소</label>
              <div class="col-md-6">
                <input id="etcaddr" type="etcaddr" class="form-control" name="etcaddr" @change="totalAddr" v-model="etcaddr" autofocus>
              </div>
            </div>
            <div>모든 주소 : {{this.item.address}}</div>
            <div>우편 번호 : {{this.item.code}}</div>
            <div class="row mb-3">
              <label for="password" class="col-md-4 col-form-label text-md-end">비밀번호</label>
              <div class="col-md-6">
                <input id="password" type="password" class="form-control" name="password" v-model="item.password" autofocus>
              </div>
            </div>
            <div class="row mb-3">
              <label for="passwordconfirm" class="col-md-4 col-form-label text-md-end">비밀번호 확인</label>
              <div class="col-md-6">
                <input id="passwordconfirm" type="password" class="form-control" name="passwordconfirm" v-model="item.passwordconfirm" autofocus>
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
import VueRouter from "vue-router";

Vue.use(VueDaumPostcode)

const URL_API_REGISTER = 'http://localhost:8000/api/register'


export default {
  name: 'Register',

  components: {
    PostCode
  },

  data() {
    return {
      item: {
        id: 0,
        name: '',
        user_id: '',
        email: '',
        phone: '',
        password: '',
        passwordconfirm: '',
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
      if (!this.item.name) {
        alert("이름을 입력하세요.")
        return;
      } else if (!this.item.user_id){
        alert("아이디를 입력해주세요.")
        return;
      } else if (!/^[a-zA-Z0-9]{8,}$/.test(this.item.user_id)){
        alert("아이디는 영문 or 숫자 8자 이상으로 입력해 주세요.")
        return;
      } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          this.item.email)) {
        alert("이메일 양식에 맞춰 입력해 주세요.")
        return;
      } else if (!/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(
          this.item.phone)) {
        alert("핸드폰 번호 양식에 맞춰 입력해 주세요.")
        return;
      } else if (!this.item.address){
        alert("주소를 입력해 주세요.")
        return;
      } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(this.item.password)){
        alert("비밀번호는 영문 or 숫자 or 특수문자 조합으로 8자 이상으로 입력해 주세요.")
        return;
      } else if (this.item.password != this.item.passwordconfirm){
        alert("비밀번호가 다릅니다.")
        return;
      }

      const res = await axios.post(URL_API_REGISTER, {
        ...this.item
      }).then(res => {
        alert("회원가입이 되었습니다.")
        window.location.href = "/";
      }).catch(e => {
        alert("일치하는 회원이 있습니다.")
      })
      console.log(res)


    },
    resetForm() {
      this.item = {
        name: '',
        user_id: '',
        email: '',
        phone: '',
        password: '',
        passwordconfirm: '',
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