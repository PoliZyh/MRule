import request from "../utils/request"

export default {
    // 1.1用户登录
    userLoginRequest(params) {
        const queryString = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
        return request({
            method: 'POST',
            // url: `/user/login?${queryString}`,
            url: '/user/login',
            data: params
        })
    },
    // 1.2注册
    userRegisterRequest(params) {
        return request({
            method: 'POST',
            url: '/user/register',
            data: params
        })
    },
    // 1.3 项目列表
    projectListRequest(params) {
        return request({
            method: 'POST',
            url: `/project/get`,
            data: params
        })
    },
    // 1.4 删除某一个项目
    deleteProjectRequest(params) {
        return request({
            method: 'POST',
            url: '/project/delete',
            data: params
        })
    },
    // 1.5 新增项目
    addProjectRequest(params) {
        return request({
            method: 'POST',
            url: '/project/add',
            data: params
        })
    },
    // 1.6 获取用户信息
    getUserInfoRequest(params) {
        return request({
            method: 'POST',
            url: '/getUserInfo',
            data: params
        })
    }
}