// 引入全局mixin
import mixin from './libs/mixin/mixin.js'

function wranning(str) {
	// 开发环境进行信息输出,主要是一些报错信息
	// 这个环境的来由是在程序编写时候,点击hx编辑器运行调试代码的时候,详见:
	// 	https://uniapp.dcloud.io/frame?id=%e5%bc%80%e5%8f%91%e7%8e%af%e5%a2%83%e5%92%8c%e7%94%9f%e4%ba%a7%e7%8e%af%e5%a2%83
	if (process.env.NODE_ENV === 'development') {
		console.warn(str)
	}
}

// post类型对象参数转为get类型url参数
import queryParams from './libs/function/queryParams.js'
// 路由封装
import route from './libs/function/route.js'
// 生成全局唯一guid字符串
import guid from './libs/function/guid.js'
// 随机数
import random from './libs/function/random.js'
// 打乱数组的顺序
import randomArray from './libs/function/randomArray.js'

// 对象和数组的深度克隆
import deepClone from './libs/function/deepClone.js'
// 对象深度拷贝
import deepMerge from './libs/function/deepMerge.js'


// toast提示，对uni.showToast的封装
import toast from './libs/function/toast.js'

// 配置信息
import config from './libs/config/config.js'
// 各个需要fixed的地方的z-index配置文件
import zIndex from './libs/config/zIndex.js'

const $van = {
	queryParams: queryParams,
	route: route,
	guid,
	random,
	deepClone,
	deepMerge,
	randomArray,
	
	toast,
	
	config, // uView配置信息相关，比如版本号
	zIndex
}



const install = Vue => {
	Vue.mixin(mixin)

	Vue.prototype.$van = $van
}


export default {
	install
}
