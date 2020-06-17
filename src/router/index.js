import Vue from 'vue'
import Router from 'vue-router'

import Login from "../components/Login"
import Company from "@/components/Company";
import Management from "@/components/Management";

Vue.use(Router);

export default new Router({
    routes: [
        {
            // 登录页
            path: '/',
            name: 'Login',
            component: Login
        }, {
            // 登录页
            path: '/company',
            name: 'Company',
            component: Company
        },
        {
            // 登录页
            path: '/management',
            name: 'Management',
            component: Management
        }

    ]
});