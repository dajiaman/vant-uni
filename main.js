import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'


// 引入全局uView
import vant from 'vant-ui'
Vue.use(vant)



const app = new Vue({
    ...App
})
app.$mount()
