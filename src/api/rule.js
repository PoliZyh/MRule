import request from "../utils/request";

export default {
    // 2.1 工作台数据
    getWorkplaceDataRequest(params) {
        return request({
            url: "/rule/console",
            method: "GET",
            data: params
        })
    },
    // 2.2 项目动态
    getProjectDynamicRequest(params) {
        return request({
            url: "/rule/projectDynamics",
            method: "GET",
            data: params
        })
    },
    // 2.3 项目成员
    // 2.3.1 获取项目成员列表
    getProjectMemberListRequest(params) {
        return request({
            url: "/project/memebers",
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
        return request({
            url: "/rule/ruleStatus/get",
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
        return request({
            url: "/rule/ruleStatus/delete",
            method: "GET",
            data: params
        })
    },
    // 2.5 设置面板
    // 2.5.1 用户申请列表接口
    getUserApplyListRequest(params) {
        return request({
            url: "/apply/get",
            method: "GET",
            data: params
        })
    },
    // 2.5.2 同意/拒绝用户进入团队接口
    agreeOrRefuseUserRequest(params) {
        return request({
            url: "/apply/handle",
            method: "GET",
            data: params
        })
    },
    //2.5.3 用户申请加入团队接口
    applyUserRequest(params) {
        return request({
            url: "/apply/add",
            method: "GET",
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
        return request({
            url: "/variable/delete",
            method: "GET",
            data: params
        })
    },
    //2.6.3 删除某个变量库
    deleteVariableLibraryRequest(params) {
        return request({
            url: "/variable/deleteSet",
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
    // 2.7.4 修改规则
    updateRuleRequest(params) {
        return request({
            url: "/rule/update",
            method: "POST",
            data: params
        })
    }
}