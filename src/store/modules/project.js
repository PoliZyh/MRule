
export default {
    namespaced: true,
    state: {
        projectId: sessionStorage.getItem('projectId') || '',
    },

    mutations: {
        setProjectId(state, projectId) {
            state.projectId = projectId;
            sessionStorage.setItem('projectId', projectId);
        },
    }
}