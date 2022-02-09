<template>
  <div id="app">
    <div id="nav">
      <b-navbar toggleable type="dark" variant="dark">
        <b-navbar-brand href="/">NavBar</b-navbar-brand>
        <ul>
          <li>
            <b-nav-item class="marker" href="/login">로그인
            </b-nav-item>
          </li>
          <li>
            <b-nav-item class="marker" href="/register">회원가입
            </b-nav-item>
          </li>
          <li>
            <b-nav-item  class="marker" href="/board">리뷰 게시판
            </b-nav-item>
          </li>
        </ul>
      </b-navbar>
    </div>
    <router-view/>
  </div>
</template>


<script>
export default {
  name: "Header"
}
</script>
<style>
@import "./assets/main.css";
</style>