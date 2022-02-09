<template>
  <div v-if="item" class="container">
    <div class="row justify-center-center">
      <div class="col-md-10">
        <b-card>
          <div>
            <div>
              <div>제목: {{item.title}}</div>
              <div>내용: {{item.content}}</div>
              <div>내용: {{item.image_path}}</div>
            </div>
            <div>
              <div>글쓴이: {{ item.user && item.user.name }}</div>
              <div style="padding:50px; position:relative;">
                <img :src="`../laravelProject/public/storage/images/1644289678_스크린샷%202022-02-08%20오전%209.48.15.png`" />
              </div>
              <div>등록일: {{moment(item.created_at).format('YYYY-MM-DD HH:MM')}}</div>
            </div>
          </div>
        </b-card>
        <b-card>
          <div>
            <b-button variant="primary" @click="updateData">수정</b-button>&nbsp;
            <b-button variant="success" @click="deleteData">삭제</b-button>
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

const URL_API_BOARD = 'http://localhost:8000/api/board'

export default {
  name: "BoardDetail",
  data() {
    return {
      moment: moment,

      item: {},
    }
  },
  methods: {
    async readItem() {

      const res = await axios.get(URL_API_BOARD + '/' + this.$route.params.id)

      this.item = res.data;

      console.log(this.item)
    },
    updateData(){

      window.location.href = '/board/' + this.$route.params.id + '/update'
    },
    async deleteData(){
      const res = await axios.delete(URL_API_BOARD + '/' + this.$route.params.id)

      this.item = res.data;

      window.location.href = '/board'
    }
  },
  mounted() {
    this.readItem()
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