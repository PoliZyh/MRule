import request from "../utils/request";
import axios from "axios";

export default {
    // 2.1 工作台数据
    getWorkplaceDataRequest(params) {
        const queryString = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
        return axios.get(`https://www.fastmock.site/mock/c6545c717f98dc1a6910d7a16011fb03/api/rule/console?${queryString}`)
    },
    // 2.2 项目动态
    getProjectDynamicRequest(params) {
        const queryString = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
        return request({
            url: `/rule/projectDynamics?${queryString}`,
            method: "GET",
            data: params
        })
    },
    // 2.3 项目成员
    // 2.3.1 获取项目成员列表
    getProjectMemberListRequest(params) {
        const queryString = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
        return request({
            url: `/project/memebers?${queryString}`,
            method: "GET",
            data: params
        })
    },
    // 2.3.2 删除项目成员
    deleteProjectMemberRequest(params) {
        return request({
            url: "/project/deleteMember",
            method: "POST",
            data: params
        })
    },
    // 2.4 规则状态
    // 2.4.1 获取全部规则状态
    getRuleStatusListRequest(params) {
        const queryString = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
        return request({
            url: `/rule/ruleStatus/get?${queryString}`,
            method: "GET",
            data: params
        })
    },
    // 2.4.2  启用/禁用规则的状态
    changeRuleStatusRequest(params) {
        return request({
            url: "/rule/ruleStatus/change",
            method: "POST",
            data: params
        })
    },
    // 2.4.3 添加规则的历史记录
    addRuleHistoryRequest(params) {
        return request({
            url: "/rule/ruleHistory/add",
            method: "POST",
            data: params
        })
    },
    // 2.4.4 查看规则的历史记录
    getAllRuleHistoryRequest(params) {
        return request({
            url: "/rule/ruleHistory/get",
            method: "GET",
            data: params
        })
    },
    // 2.4.5 删除规则
    deleteRuleRequest(params) {
        const queryString = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
        return request({
            url: `/rule/ruleStatus/delete?${queryString}`,
            method: "GET",
            data: params
        })
    },
    // 2.5 设置面板
    // 2.5.1 用户申请列表接口
    getUserApplyListRequest(params) {
        const queryString = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
        return request({
            url: `/apply/get?${queryString}`,
            method: "GET",
            data: params
        })
    },
    // 2.5.2 同意/拒绝用户进入团队接口
    agreeOrRefuseUserRequest(params) {
        const queryString = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
        return request({
            url: `/apply/handle?${queryString}`,
            method: "GET",
            data: params
        })
    },
    //2.5.3 用户申请加入团队接口
    applyUserRequest(params) {
      
        return request({
            url: `/apply/add`,
            method: "POST",
            data: params
        })
    },
    // 2.6 操作变量库
    // 2.6.1 获取某个变量库中的所有变量
    getAllVariableRequest(params) {
        return request({
            url: "/variable/get",
            method: "POST",
            data: params
        })
    },
    // 2.6.2 删除某个变量
    deleteVariableRequest(params) {
        const queryString = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
        return request({
            url: `/variable/delete?${queryString}`,
            method: "GET",
            data: params
        })
    },
    //2.6.3 删除某个变量库
    deleteVariableLibraryRequest(params) {
        const queryString = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
        return request({
            url: `/variable/deleteSet?${queryString}`,
            method: "GET",
            data: params
        })
    },
    // 2.7
    // 2.7.1 新增规则
    addRuleRequest(params) {
        return request({
            url: "/rule/add",
            method: "POST",
            data: params
        })
    },
    // 2.7.2 运行项目
    runProjectRequest(params) {
        return request({
            url: "/rule/run",
            method: "POST",
            data: params
        })
    },
    // 2.7.3 获取文件树结构
    getFileTreeRequest(params) {
        return request({
            url: "/file/getTree",
            method: "POST",
            data: params
        })
    },
    // 2.7.7 / 4 修改规则
    updateRuleRequest(params) {
        return request({
            url: "/rule/update",
            method: "POST",
            data: params
        })
    },
    // 2.7.5 新增变量
    addVariableRequest(params) {
        return request({
            url: "/variable/add",
            method: "POST",
            data: params
        })
    },
    // 2.7.6 修改变量
    updateVariableRequest(params) {
        return request({
            url: "/variable/update",
            method: "POST",
            data: params
        })
    },
    // 2.7.8 创建文件（夹）
    createFileRequest(params) {
        return request({
            url: "/file/createFile",
            method: "POST",
            data: params
        })
    },
    // 2.7.10 获取某个决策集/规则库里的所有规则
    getAllRulesRequest(params) {
        return request({
            url: "/rule/get",
            method: "POST",
            data: params 
        })
    }

}