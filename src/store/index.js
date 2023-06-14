import { createStore } from 'vuex'

const store = createStore({
    state () {
        return {
            imageUrl: ''
        }
    },
    mutations: {
        setImageUrl (state, url) {
            state.imageUrl = url
        }
    }
})
export default store;