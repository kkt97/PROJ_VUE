<template>
  <div v-if="item" class="container">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <br>
        <div class="card">
          <div class="card-header">글 수정</div>
          <div class="card-body">
            <div class="row mb-3">
              <label for="title" class="col-md-2 col-form-label text-md-end">제목</label>
              <div class="col-md-8">
                <input id="title" type="text" class="form-control" name="title" v-model="item.title">
              </div>
            </div>

            <div class="row mb-3">
              <label for="content" class="col-md-2 col-form-label text-md-end">내용</label>
              <div class="col-md-8">
                <div id="content" class="demo">
                  <textarea v-model="item.content" placeholder="add multiple lines"
                            style="width: 500px; height: 400px;"></textarea>
                </div>
              </div>
            </div>

            <div class="row mb-3">
              <label for="name" class="col-md-2 col-form-label text-md-end">작성자</label>
              <div class="col-md-8">
                <input id="name" type="name" class="form-control" name="name" v-model="item.user.name" disabled autofocus>
              </div>
            </div>

            <div class="row mb-3">
              <label for="image_name" class="col-md-2 col-form-label text-md-end">파일 이름</label>
              <div class="col-md-8">
                <input id="image_name" type="text" class="form-control" name="image_name" v-model="item.image_name" disabled autofocus>
              </div>
            </div>

            <button @click="deleteImage" class="btn btn-primary">
              사진 삭제
            </button>

            <div class="row mb-3">
              <label class="col-md-2 col-form-label text-md-end"></label>
              <div class="col-md-8">
                <input type="file"  @change="onImageChange($event)" />
              </div>
            </div>


            <div class="row mb-0">
              <div class="col-md-6 offset-md-4">
                <button @click="updateData" class="btn btn-primary">
                  글 수정
                </button>
                &nbsp;
                <button @click="goBack" type="button" class="btn btn-primary">
                  뒤로가기
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import moment from "moment";

const URL_API_BOARD = 'http://localhost:8000/api/board'

export default {
  name: "BoardUpdate",

  data() {
    return {
      moment: moment,

      item: {
        id: 0,
        title: '',
        content: '',
        name: '',
        image: {},
        user: {
          name: '',
        },
      },
      itemId: 0,
      items: [],
    }
  },
  methods: {
    async readItem() {
      const res = await axios.get(URL_API_BOARD + '/' + this.$route.params.id)
      if(!res.data.user) res.data.user = { name: '', }
      this.item = res.data;
      return this.item;
    },

    onInputImage(){
      this.item.image = this.$refs.serveyImage.files
      console.log("this.item.image", this.$refs.serveyImage.files)
    },

    async updateData() {
      console.log('1')
      if (confirm("수정하시겠습니까??") == true) {
        const res = await axios.put(URL_API_BOARD + '/' + this.$route.params.id, {
          ...this.item,
          'modeFileDelete': false,
          // false로 둠으로써 컨트롤러 else에서 실행됨.
        })
        console.log(res)
        this.$router.push('/board')
      }else {
        return false
      }
    },

    onImageChange(event){
      console.log(event.target.files[0], typeof event.target.files)
      this.item.image= event.target.files[0];
    },

    async deleteImage(){
      if (confirm("정말 삭제하시겠습니까??") == true){
        await axios.put(URL_API_BOARD + '/' + this.$route.params.id, {
          ...this.item,
          'modeFileDelete': true,
        })
        await this.readItem()
      }else {
        return false
      }
    },

    goBack(){
      this.$router.go(-1); [2]
    },
  },

  mounted() {
    this.readItem()
  },

  watch: {
    'input': {
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