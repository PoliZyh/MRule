


export const constantRoutes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home/index.vue')
    },
    {
        path: '/projects',
        name: 'Projects',
        component: () => import('@/layout/HomeLayout/index.vue'),
        children: [
            {
                path: '',
                redirect: '/projects/project-list'
            },
            {
                path: 'project-list',
                name: 'ProjectList',
                component: () => import('@/views/Projects/index.vue')
            },
            {
                path: 'docs',
                name: 'Docs',
                component: () => import('@/views/Docs/index.vue')
            }
        ]
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/Error/404.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'any',
        redirect: '/404'
    }
]