import { createStore } from 'vuex'
import rule from './modules/rule'


const store = createStore({
    modules: {
        rule
    }
})


export default store