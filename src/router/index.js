import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import login from '../views/Auth/login'
import Register from "@/views/Auth/Register"
import BoardList from "@/views/Board/BoardList"
import BoardDetail from "@/views/Board/BoardDetail"
import BoardCreate from "@/views/Board/BoardCreate";
import BoardUpdate from "@/views/Board/BoardUpdate";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/board',
        name: 'BoardList',
        component: BoardList,
    },
    {
        path: '/board/:id',
        name: 'BoardDetail',
        component: BoardDetail,
    },
    {
        path: '/boardcreate',
        name: 'BoardCreate',
        component: BoardCreate,
    },
    {
        path: '/board/:id/update',
        name: 'BoardUpdate',
        component: BoardUpdate,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router