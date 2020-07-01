(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-count-down-index"],{"1f95":function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,".van-count-down[data-v-5fe73304]{color:#323233;font-size:%?28?%;line-height:%?40?%}",""]),t.exports=e},"202c":function(t,e,n){var a=n("3591");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=n("4f06").default;i("c647a41a",a,!0,{sourceMap:!1,shadowMode:!1})},3160:function(t,e,n){"use strict";n("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n("391b"),i={name:"van-count-down",props:{millisecond:Boolean,time:{type:[Number,String],default:0},format:{type:String,default:"HH:mm:ss"},autoStart:{type:Boolean,default:!0}},data:function(){return{remain:0}},computed:{timeData:function(){return(0,a.parseTimeData)(this.remain)},formattedTime:function(){return(0,a.parseFormat)(this.format,this.timeData)}},watch:{time:{immediate:!0,handler:"reset"}},methods:{start:function(){this.counting||(this.counting=!0,this.endTime=Date.now()+this.remain,this.tick())},pause:function(){this.counting=!1},reset:function(){this.pause(),this.remain=+this.time,this.autoStart&&this.start()},tick:function(){this.millisecond?this.microTick():this.macroTick()},microTick:function(){var t=this;this.rafId=setTimeout((function(){t.counting&&(t.setRemain(t.getRemain()),t.remain>0&&t.microTick())}))},macroTick:function(){var t=this;this.rafId=setTimeout((function(){if(t.counting){var e=t.getRemain();(0,a.isSameSecond)(e,t.remain)&&0!==e||t.setRemain(e),t.remain>0&&t.macroTick()}}))},getRemain:function(){return Math.max(this.endTime-Date.now(),0)},setRemain:function(t){this.remain=t,this.$emit("change",this.timeData),0===t&&(this.pause(),this.$emit("finish"))}}};e.default=i},3591:function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,".van-doc-demo-section[data-v-7cb99eae]{box-sizing:border-box;min-height:calc(100vh - 56px);padding-bottom:20px}.demo-count-down[data-v-7cb99eae]{background-color:#fff}.van-doc-demo-block__title[data-v-7cb99eae]{margin:0;padding:32px 16px 16px;color:rgba(69,90,100,.6);font-weight:400;font-size:14px;line-height:16px}.van-doc-demo-block:first-of-type .van-doc-demo-block__title[data-v-7cb99eae]{padding-top:20px}.demo-count-down .van-count-down[data-v-7cb99eae]{margin-left:16px}.colon[data-v-7cb99eae]{display:inline-block;margin:0 4px;color:#ee0a24}.block[data-v-7cb99eae]{display:inline-block;width:22px;color:#fff;font-size:12px;text-align:center;background-color:#ee0a24}",""]),t.exports=e},"391b":function(t,e,n){"use strict";function a(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2,n=t+"";while(n.length<e)n="0"+n;return n}n("c975"),n("fb6a"),n("ac1f"),n("5319"),Object.defineProperty(e,"__esModule",{value:!0}),e.padZero=a,e.parseTimeData=s,e.parseFormat=u,e.isSameSecond=d;var i=1e3,o=60*i,c=60*o,r=24*c;function s(t){var e=Math.floor(t/r),n=Math.floor(t%r/c),a=Math.floor(t%c/o),s=Math.floor(t%o/i),u=Math.floor(t%i);return{days:e,hours:n,minutes:a,seconds:s,milliseconds:u}}function u(t,e){var n=e.days,i=e.hours,o=e.minutes,c=e.seconds,r=e.milliseconds;if(-1===t.indexOf("DD")?i+=24*n:t=t.replace("DD",a(n)),-1===t.indexOf("HH")?o+=60*i:t=t.replace("HH",a(i)),-1===t.indexOf("mm")?c+=60*o:t=t.replace("mm",a(o)),-1===t.indexOf("ss")?r+=1e3*c:t=t.replace("ss",a(c)),-1!==t.indexOf("S")){var s=a(r,3);t=-1!==t.indexOf("SSS")?t.replace("SSS",s):-1!==t.indexOf("SS")?t.replace("SS",s.slice(0,2)):t.replace("S",s.charAt(0))}return t}function d(t,e){return Math.floor(t/1e3)===Math.floor(e/1e3)}},"4aa8":function(t,e,n){"use strict";var a={vanCountDown:n("8b05").default},i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"van-doc-demo-section demo-count-down"},[n("v-uni-view",{staticClass:"van-doc-demo-block"},[n("h2",{staticClass:"van-doc-demo-block__title"},[t._v("基础用法")]),n("van-count-down",{attrs:{time:t.time}})],1),n("v-uni-view",{staticClass:"van-doc-demo-block"},[n("h2",{staticClass:"van-doc-demo-block__title"},[t._v("自定义格式")]),n("van-count-down",{attrs:{time:t.time,format:"DD 天 HH 时 mm 分 ss 秒"}})],1),n("v-uni-view",{staticClass:"van-doc-demo-block"},[n("h2",{staticClass:"van-doc-demo-block__title"},[t._v("毫秒级渲染")]),n("van-count-down",{attrs:{millisecond:!0,time:t.time,format:"HH:mm:ss:SS"}})],1),n("v-uni-view",{staticClass:"van-doc-demo-block"},[n("h2",{staticClass:"van-doc-demo-block__title"},[t._v("自定义样式")])])],1)},o=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return a}))},"573b":function(t,e,n){"use strict";var a=n("202c"),i=n.n(a);i.a},"8b05":function(t,e,n){"use strict";n.r(e);var a=n("d98c"),i=n("a0a1");for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("9a91");var c,r=n("f0c5"),s=Object(r["a"])(i["default"],a["b"],a["c"],!1,null,"5fe73304",null,!1,a["a"],c);e["default"]=s.exports},"8cca":function(t,e,n){"use strict";n.r(e);var a=n("4aa8"),i=n("cfc8");for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("573b");var c,r=n("f0c5"),s=Object(r["a"])(i["default"],a["b"],a["c"],!1,null,"7cb99eae",null,!1,a["a"],c);e["default"]=s.exports},"9a91":function(t,e,n){"use strict";var a=n("f867"),i=n.n(a);i.a},a0a1:function(t,e,n){"use strict";n.r(e);var a=n("3160"),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=i.a},cfc8:function(t,e,n){"use strict";n.r(e);var a=n("de59"),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=i.a},d98c:function(t,e,n){"use strict";var a,i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"van-count-down"},[t._v(t._s(t.formattedTime))])},o=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return a}))},de59:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{time:5e3}}};e.default=a},f867:function(t,e,n){var a=n("1f95");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=n("4f06").default;i("19098e8f",a,!0,{sourceMap:!1,shadowMode:!1})}}]);