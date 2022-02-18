<template>
  <div>
    <b-row>
      <b-col md="auto">
        <b-calendar v-model="value" @context="onContext" :min="min" :max="max"></b-calendar>
      </b-col>
    </b-row>

    <div v-if="this.context">
      <div v-if="this.context.selectedYMD">
        <div v-for="(v, k) in this.book_time" :key="k">
          <b-form-group v-slot="{ ariaDescribedby }">
            <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" :value="v.value" :disabled="v.disabled">{{ v.title }}</b-form-radio>
          </b-form-group>
        </div>
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
<!--                {{this.item[0].book_time}}-->
            </span>
          </strong>
        </span>
      </div>
    </div>

<!--    <button @click="foo">foo</button>-->

<!--    <div v-for="(v, k) in this.fooOuts" :key="k">-->
<!--      <input-->
<!--        :disabled="v.disabled"-->
<!--        :value="v.title"-->
<!--      />-->
<!--      {{ v }}-->
<!--    </div>-->

<!--    <div v-for="v in items" :key="v.id">-->

  </div>
</template>


<script>
import axios from 'axios'
import dayjs from 'dayjs'

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
      items: [],
      value: '',
      context: '',
      selected: '',
      min: minDate,
      max: maxDate,

      fooOuts: [],
      book_time: [],

    }
  },
  methods: {

    // foo() {
    //   const prefix = new Date().toISOString()
    //   this.fooOuts = [
    //     { disabled: true, title: prefix + '111' },
    //     { disabled: false, title: prefix + '222' },
    //   ]
    // },

    // onContext(ctx) {
    //
    //   this.book_time = []
    //
    //   // const foo = dayjs(activeDate).diff(this.book_time, 'hours')
    //   // this.items.forEach((item) => {
    //   //   // console.log(item.book_time)
    //   //   // console.log(ctx.selectedYMD)
    //   //   // console.log('1' + this.selected)
    //   //   // console.log(ctx.selectedYMD + this.book_time)
    //   //   // console.log(ctx.selectedYMD + ' 19:00' === item.book_time)
    //   //
    //   //     const time = (ctx.selectedYMD + ' 20:00' === item.book_time);
    //   //
    //   //     this.book_time.push({
    //   //         'disabled': time,
    //   //         'title': item.book_time,
    //   //         'value': 0,
    //   //     })
    //   //     // this.book_time = [
    //   //     //   { disabled: time, title: '오후 4시', value: '16:00'},
    //   //     // ]
    //   //
    //   //   // console.log('foo', this.book_time)
    //   //
    //   // })
    //
    //   this.items.map(item => {
    //     // item.name = item.name + 'bbbb'
    //     console.log(item.book_time)
    //
    //     if (ctx.selectedYMD + ' 16:00' === item.book_time ||
    //         ctx.selectedYMD + ' 17:00' === item.book_time ||
    //         ctx.selectedYMD + ' 18:00' === item.book_time ||
    //         ctx.selectedYMD + ' 19:00' === item.book_time ||
    //         ctx.selectedYMD + ' 20:00' === item.book_time ) {
    //       const time = true;
    //
    //       this.book_time = [
    //         { disabled: time, title: '오후 4시', value: '16:00'},
    //         // { disabled: false, title: '오후 5시', value: '17:00' },
    //         // { disabled: false, title: '오후 6시', value: '18:00' },
    //         // { disabled: false, title: '오후 7시', value: '19:00' },
    //         // { disabled: false, title: '오후 8시', value: '20:00' },
    //       ]
    //     } else {
    //       const time = false;
    //
    //       this.book_time = [
    //         { disabled: time, title: '오후 4시', value: '16:00'},
    //         { disabled: false, title: '오후 5시', value: '17:00' },
    //         { disabled: false, title: '오후 6시', value: '18:00' },
    //         { disabled: false, title: '오후 7시', value: '19:00' },
    //         { disabled: false, title: '오후 8시', value: '20:00' },
    //       ]
    //     }
    //
    //   })

      //   return item.book_time
      // })

      // console.log('123123' + this.items)
      // this.book_time = [
      //   { disabled: time, title: '오후 4시', value: '16:00'},
      //   { disabled: false, title: '오후 5시', value: '17:00' },
      //   { disabled: false, title: '오후 6시', value: '18:00' },
      //   { disabled: false, title: '오후 7시', value: '19:00' },
      //   { disabled: false, title: '오후 8시', value: '20:00' },
      // ]

      // this.context = ctx

      // console.log(ctx.selectedYMD)
      // console.log(this.selected)

      // if ( context.selectedYMD + selected = item.book_time) {
      //
      // }

      // console.log(this.items)

      // console.log(ctx)
      // const { activeDate, } = ctx
      // //
      // this.items.forEach(item => {
      //
      //   const foo = dayjs(activeDate).diff(item.book_time, 'hours')
      //   // console.log('1' + foo)
      //
      //   // this.book_time.push({
      //   //   'disabled': foo < 1,
      //   //   'title': item.book_time,
      //   //   'value': 0,
      //   // })
      // })
      // this.readItem()

      // return ctx, this.selected

    // },

    onContext(ctx) {
      this.context = ctx
      this.book_time = [
        { disabled: true, title: '오후 4시', value: '16:00'},
        { disabled: false, title: '오후 5시', value: '17:00' },
        { disabled: false, title: '오후 6시', value: '18:00' },
        { disabled: false, title: '오후 7시', value: '19:00' },
        { disabled: false, title: '오후 8시', value: '20:00' },
      ]

      return ctx
    },




    async booking(){
      axios.post(URL_API_BOOKING, {
        ...this.item,
        'book_time': `${this.context.selectedYMD} ${this.selected}`,
      }).then(res => {
        alert("예약에 성공하셨습니다.")
        this.$router.push('/')
      }).catch(e => {
        const error = e.response.data.errors;

        // console.log(error.name)
        // console.log(error.people)
        // console.log(error.phone)
        // console.log(error.email)

        this.errMsg = {
          ...error
        }

        alert("선택 시간대 예약이 실패하셨습니다.")
      })
    },
    async readItem() {
      const res = await axios.get(`${URL_API_BOOKING}`)
      this.item = res.data
      this.items = res.data
      // console.log(this.items)
      // this.items.forEach((item) => {
      //   // console.log(item.book_time)
      // })
      return res
    },

  },
  mounted() {
    this.readItem()
  }
}
</script>

<style scoped>

</style>