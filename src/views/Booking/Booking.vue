<template>
  <div>
    <b-row>
      <b-col md="auto">
        <b-calendar v-model="value" @context="onContext" :min="min" :max="max"></b-calendar>
      </b-col>
    </b-row>

    <div v-if="this.context">
      <div v-if="this.context.selectedYMD">
        <b-form-group label="시간대" v-slot="{ ariaDescribedby }">
          <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="오후 4시">오후 4시</b-form-radio>
          <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="오후 5시">오후 5시</b-form-radio>
          <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="오후 6시">오후 6시</b-form-radio>
          <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="오후 7시">오후 7시</b-form-radio>
          <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="오후 8시">오후 8시</b-form-radio>
        </b-form-group>
        <span class="mt-3">
          예약한 날짜와 시간:
          <strong>
            <span v-if="selected">
                {{context.selectedYMD}} {{ selected }}
              <div>
                <label for="name" class="col-md-2 col-form-label">이름</label>
                <div class="col-md-5">
                  <input id="name" type="text" class="form-control" name="title" v-model="item.name">
                  <h5 style="color: red">{{ errMsg.name }}</h5>
                </div>
                <label for="people" class="col-md-2 col-form-label">인원수</label>
                <div class="col-md-5">
                  <input id="people" type="text" class="form-control" name="people" v-model="item.people">
                  <h5 style="color: red">{{ errMsg.people }}</h5>
                </div>
                <label for="phone" class="col-md-2 col-form-label">연락처</label>
                <div class="col-md-5">
                  <input id="phone" type="text" class="form-control" name="phone" v-model="item.phone">
                  <h5 style="color: red">{{ errMsg.phone }}</h5>
                </div>
                <label for="email" class="col-md-2 col-form-label">이메일 주소</label>
                <div class="col-md-5">
                  <input id="email" type="email" class="form-control" name="email" v-model="item.email">
                  <h5 style="color: red">{{ errMsg.email }}</h5>
                </div>
              </div>
              <br>
              <button @click="booking" class="btn btn-primary">
                예약하기
              </button>
            </span>
          </strong>
        </span>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios'

const URL_API_BOOKING = 'http://localhost:8000/api/booking'

export default {
  name: 'Booking',

  data() {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const minDate = new Date(today)
    const maxDate = new Date(today)
    maxDate.setDate(maxDate.getDate() + 14)
    return {
      errMsg: {
        name: '',
        people: '',
        phone: '',
        email: ''
      },
      item:{
        name: '',
        people: '',
        phone: '',
        email: ''
      },
      value: '',
      context: '',
      selected: '',
      min: minDate,
      max: maxDate,
    }
  },
  methods: {
    onContext(ctx) {
      this.context = ctx
      // console.log(ctx.activeYMD)
      return ctx
    },
    async booking(){
      axios.post(URL_API_BOOKING, {
        ...this.item,
        'book_time': this.selected,
        'book_date': this.context.selectedYMD,
      }).then(res => {
        alert("예약에 성공하셨습니다.")
        this.$router.push('/')
      }).catch(e => {
        const error = e.response.data.errors;

        console.log(error.name)
        console.log(error.people)
        console.log(error.phone)
        console.log(error.email)

        this.errMsg = {
          ...error
        }

        // alert("예약에 실패하셨습니다.")
      })
    },

  }
}
</script>

<style scoped>

</style>