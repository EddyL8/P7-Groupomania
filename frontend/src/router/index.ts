import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue';
import SignUp from '../views/SignUp.vue';
import Login from '../views/Login.vue';
import AllPosts from '../components/AllPosts.vue';
import Post from '../components/Post.vue';

const routes = [
    {
        path: '/',
        name: 'Root',
        component: Login
    },
    {
        path: '/Home',
        name: 'Home',
        component: Home
    },
    {
        path: '/SignUp',
        name: 'SignUp',
        component: SignUp
    },
    {
        path: '/Login',
        name: 'Login',
        component: Login
    },
    {
        path: '/AllPosts',
        name: 'AllPosts',
        component: AllPosts
    },
    {
        path: '/Post',
        name: 'Post',
        component: Post
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router