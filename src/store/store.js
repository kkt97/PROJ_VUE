import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
import router from "@/router";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        host: 'http://localhost:8000/',
        token: '',
        role:'',
    },
    mutations: {
        loginToken: function (state, payload) {
            state.token = payload;
        },
        logout: function (state) {
            if (state.token) {
                state.token = '';
                alert('로그아웃 되었습니다.');
            }
        },
        loginCheck: function (state) {
            axios.get(`${state.host}/api/auth/loginCheck/`, {
                headers: {
                    "x-access-token": state.token
                }
            })
            .then(
                res => {
                    console.log(res);
                    state.role = res.data.token.role;
                },
                error => {
                    console.log('로그인 정보가 없음');
                    router.push("/login")
                }
            );
        }
    }
});
