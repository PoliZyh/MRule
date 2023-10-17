


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
        redirect: '/projects/project-list',
        children: [
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
        path: '/rule',
        name: 'Rule',
        component: () => import('@/layout/RuleLayout/index.vue'),
        redirect: '/rule/workstand',
        children: [
            {
                path: 'workstand',
                name: 'Workstand',
                component: () => import('@/views/Workstand/index.vue')
            },
            {
                path: 'project-dynamics',
                name: 'ProjectDynamics',
                component: () => import('@/views/ProjectDynamics/index.vue')
            },
            {
                path: 'rule-statistics',
                name: 'RuleStatistics',
                component: () => import('@/views/RuleStatistics/index.vue')
            },
            {
                path: 'member',
                name: 'Member',
                component: () => import('@/views/Member/index.vue')
            },
            {
                path: 'rule-status',
                name: 'RuleStatus',
                component: () => import('@/views/RuleStatus/index.vue')
            },
            {
                path: 'setting',
                name: 'Setting',
                component: () => import('@/views/Setting/index.vue')
            },
            {
                path: 'rule-editor',
                name: 'RuleEditor',
                component: () => import('@/views/RuleEditor/index.vue')
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