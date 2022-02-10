<template>
  <div class="container">
    <div class="row justify-center-center">
      <div class="col-md-10">
        <br>
        <div>
          <h2>리뷰 게시판</h2>
          <table class="table">
            <thead>
            <tr>
              <th>일련번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>날짜</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in items.data" :key="item.id">
              <td><a :href="'/board/'+item.id">{{item.id}}</a></td>
              <td><a :href="'/board/'+item.id">{{item.title}}</a></td>
              <td>{{item.user && item.user.name}}</td>
              <td>{{moment(item.created_at).format('YYYY-MM-DD HH:MM')}}</td>
            </tr>
            </tbody>
          </table>
          <div>
            <div class="col-md-3" style="margin: auto;">
              <b-button @click="prevPage">이전</b-button>
              <span class="page-count"> {{ this.params.page }} 페이지</span>
              <b-button @click="nextPage">다음</b-button>
              <b-button style="float: right" variant="success" href="/boardcreate">글쓰기</b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios"
import moment from "moment"

const URL_API_BOARD = 'http://localhost:8000/api/board'

export default {
  name: "BoardList",
  data() {
    return {
      moment: moment,

      items: {
      },

      params: {
        page: 1,
        per_page: 10,
      }
    }
  },

  methods: {
    async readItems() {
      const res = axios.get(URL_API_BOARD, { params:this.params } )
          .then(response => {
            this.items = response.data
          })
      console.log(res)

    },
    prevPage() {
      this.params.page -= 1
      this.readItems()
    },
    nextPage(){
      this.params.page += 1
      this.readItems()
    },
  },

  mounted() {
    this.readItems()
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