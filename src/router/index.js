import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import List from '../views/products/List.vue';
import Form from '../views/products/Form.vue';
import ListUser from '../views/users/List.vue';
import FormUser from '../views/users/Form.vue';
import UserAdmin from '../views/UserAdmin.vue';

const routes = [
    {
        path: '/:id',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/product',
        name: 'productList',
        component: List,
    },
    {
        path: '/product/create',
        name: 'productCreate',
        component: Form,
    },
    {
        path: '/product/edit/:id',
        name: 'productEdit',
        component: Form,
    },
    {
        path: '/user',
        name: 'userList',
        component: ListUser,
    },
    {
        path: '/user/create',
        name: 'userCreate',
        component: FormUser,
    },
    {
        path: '/users/edit/:id',
        name: 'userEdit',
        component: FormUser,
    },
    {
        path: '/admin',
        name: 'userAdmin',
        component: UserAdmin,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
