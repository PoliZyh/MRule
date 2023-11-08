import request from "../utils/request"

export default {
    // 1.1用户登录
    userLoginRequest(params) {
        return request({
            method: 'GET',
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
            method: 'GET',
            url: '/projects/get',
            data: params
        })
    },
    // 1.4 删除某一个项目
    deleteProjectRequest(params) {
        return request({
            method: 'POST',
            url: '/projects/delete',
            data: params
        })
    },
    // 1.5 新增项目
    addProjectRequest(params) {
        return request({
            method: 'POST',
            url: '/projects/add',
            data: params
        })
    },
    // 1.6 获取用户信息
    getUserInfoRequest() {
        return request({
            method: 'POST',
            url: '/getUserInfo',
        })
    }
}