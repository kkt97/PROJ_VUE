<template>
  <div class="container">
    <div class="row justify-center-center">
      <div class="col-md-10">
        <div class="col-md-8">
          <div class="input-group">
            <input type="text" v-model="search" class="form-control">
            <div class="input-group-prepend">
              <button @click.prevent="searchBoard" class="btn btn-primary"><i class="fa fa-search">찾기</i></button>
            </div>
          </div>
        </div>
        <br>
        <div>
          <h2>리뷰 게시판</h2>
            <div v-if="showsearch==true">
              <div class="row">
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
                  <tr v-for="item in items" v-bind:key="item.id" class="col-md-6">
                    <td><router-link v-bind:to="`/board/${item.id}`">{{item.id}}</router-link></td>
                    <td><router-link v-bind:to="`/board/${item.id}`">{{item.title}}</router-link></td>
                    <td>{{item.user && item.user.name}}</td>
                    <td>{{moment(item.created_at).format('YYYY-MM-DD HH:MM')}}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div v-if="showsearch==false">
              <div class="row">
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
                  <tr v-for="item in items" v-bind:key="item.id" class="col-md-6">
                    <td><router-link v-bind:to="`/board/${item.id}`">{{item.id}}</router-link></td>
                    <td><router-link v-bind:to="`/board/${item.id}`">{{item.title}}</router-link></td>
                    <td>{{item.user && item.user.name}}</td>
                    <td>{{moment(item.created_at).format('YYYY-MM-DD HH:MM')}}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          <div>
            <div class="col-md-3" style="margin: auto;">
              <b-button @click="prevPage">이전</b-button>
              <span class="page-count"> {{ this.params.page }} 페이지</span>
              <b-button @click="nextPage">다음</b-button>
              <b-button style="float: right" variant="success" router-link to="/boardcreate">글쓰기</b-button>
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

      items: [],

      params: {
        page: 1,
        per_page: 10,
      },

      search: '',
      showsearch: false,
    }
  },

  methods: {
    searchBoard() {
      axios.get(URL_API_BOARD + '/search?q=' + this.search)
      .then(res => {

        console.log('ttttt', res, 'asdasd')

        this.items = res.data

        console.log(this.items)

        this.search = '';
        this.showsearch = true;
      })
      .catch(err => {
        console.log(err);
      })
    },

    async readItems() {
      const res = axios.get(URL_API_BOARD, { params:this.params } )
          .then(response => {
            this.items = response.data.data
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