


export const constantRoutes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home/index.vue')
    },
    {
        path: '/user',
        name: 'User',
        component: () => import('@/views/User/index.vue')
    }
]