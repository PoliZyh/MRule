
export default {
    namespaced: true,
    state: {
        activeKey: '1-1',
        ruleRoutesMap: [
            [
                {
                    key: '1-1',
                    label: '工作台',
                    routePath: '/rule/workstand',
                    iconName: 'Monitor'
                },
                {
                    key: '1-2',
                    label: '项目动态',
                    routePath: '/rule/project-dynamics',
                    iconName: 'SetUp'
                },
                {
                    key: '1-3',
                    label: '规则统计',
                    routePath: '/rule/rule-statistics',
                    iconName: 'Coin'
                },
                {
                    key: '1-4',
                    label: '成员',
                    routePath: '/rule/member',
                    iconName: 'User'
                },
                {
                    key: '1-5',
                    label: '规则状态',
                    routePath: '/rule/rule-status',
                    iconName: 'Histogram'
                },
                {
                    key: '1-6',
                    label: '设置',
                    routePath: '/rule/setting',
                    iconName: 'Setting'
                }
            ],
            [
                {
                    key: '2-1',
                    label: '规则设计',
                    routePath: '/rule/rule-editor',
                    iconName: 'Document'
                }
            ]
        ],
        historyRouteKeySet: new Set(),
    },

    mutations: {
        // 更新activekey
        setActiveKey(state, newActiveKey) {
            state.activeKey = newActiveKey
            this.commit('rule/setHistoryKey', newActiveKey)
        },

        // 设置默认的key
        initActiveKey(state, path) {
            const flagMap = state.ruleRoutesMap.flat(1)
            const routeItem = flagMap.find(item => item.routePath === path)
            state.activeKey = routeItem.key
            this.commit('rule/setHistoryKey', routeItem.key)
        },

        // 设置历史记录
        setHistoryKey(state, key) {
            state.historyRouteKeySet.add(key)
        },

        deleteHistoryKey(state, key) {
            if (state.historyRouteKeySet.size <= 1) return
            state.historyRouteKeySet.delete(key)
            if (state.activeKey === key) {
                state.activeKey = '1-1'
            }
            
        }

        
    },

    getters: {
        activeRouteItem(state) {
            const flagMap = state.ruleRoutesMap.flat(1)
            const routeItem = flagMap.find(item => item.key === state.activeKey)
            return routeItem
        },
        historyRoutes(state) {
            const historyList = [...state.historyRouteKeySet]
            const flagMap = state.ruleRoutesMap.flat(1)
            const curHistoryRoutes = flagMap.filter(item => historyList.includes(item.key))
            return curHistoryRoutes
        }
    }
}