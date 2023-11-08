import { createStore } from 'vuex'
import rule from './modules/rule'
import project from './modules/project'

const store = createStore({
    modules: {
        rule,
        project
    }
})


export default store