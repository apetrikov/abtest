parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"D9Nj":[function(require,module,exports) {

},{}],"Q3x5":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.publicURL=exports.isRegisteredUser=exports.userId=exports.CTA_SELECTOR=void 0,exports.CTA_SELECTOR="data-cta",exports.userId="1",exports.isRegisteredUser=!1,exports.publicURL="/abtest";
},{}],"GwJF":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.trackEvent=exports.trackPageview=void 0;var e=function(e){var t=JSON.stringify(e);console.log("--\x3e Tracking Pageview: ".concat(t))};exports.trackPageview=e;var t=function(e){var t=JSON.stringify(e);console.log("--\x3e Tracking Event: ".concat(t))};exports.trackEvent=t;
},{}],"OTWw":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.initAnalytics=void 0;var e=require("./analytics-api"),t=function(t,n,r){var i=function(){return(0,e.trackPageview)({ts:Date.now(),url:n,type:"load",userId:t})},o=function(){return(0,e.trackEvent)({ts:Date.now(),url:n,type:"click",userId:t})};window.addEventListener("load",i);var a=document.querySelector("[".concat(r,"]"));a&&a.addEventListener("click",o),window.addEventListener("beforeunload",function r(){window.removeEventListener("load",i),window.removeEventListener("click",o),window.removeEventListener("beforeunload",r),(0,e.trackPageview)({ts:Date.now(),url:n,type:"unload",userId:t})})};exports.initAnalytics=t;
},{"./analytics-api":"GwJF"}],"p12s":[function(require,module,exports) {
"use strict";var t,e;Object.defineProperty(exports,"__esModule",{value:!0}),exports.LS=exports.AB=void 0,function(t){t.SELECTOR_NAME="data-test",t.SELECTOR_EXPIRATION="data-expiration",t.SELECTOR_VARIANT="data-variant",t.SELECTOR_IMAGE="data-src"}(t=exports.AB||(exports.AB={})),function(t){t.KEY_NAME="APP_ABTEST"}(e=exports.LS||(exports.LS={}));
},{}],"e1wq":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.remove=exports.write=exports.read=void 0;var r=require("./const");function e(r){return("string"==typeof r.ts||"string"==typeof r.url)&&(("string"==typeof r.name||"string"==typeof r.variant)&&"string"==typeof r.name)}var t=function(t){var o,n="".concat(r.LS.KEY_NAME,"_").concat(t),a=localStorage.getItem(n);if(!a)return null;try{o=JSON.parse(a)}catch(c){return console.log("LS parsing error"),(0,exports.remove)(t),null}return e(o)?o:null};exports.read=t;var o=function(e){localStorage.setItem("".concat(r.LS.KEY_NAME,"_").concat(e.url),JSON.stringify(e))};exports.write=o;var n=function(e){var t="".concat(r.LS.KEY_NAME,"_").concat(e);localStorage.removeItem(t)};exports.remove=n;
},{"./const":"p12s"}],"H02N":[function(require,module,exports) {
var define;
var t;function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function e(){"use strict";e=function(){return t};var t={},n=Object.prototype,o=n.hasOwnProperty,i=Object.defineProperty||function(t,r,e){t[r]=e.value},a="function"==typeof Symbol?Symbol:{},u=a.iterator||"@@iterator",c=a.asyncIterator||"@@asyncIterator",l=a.toStringTag||"@@toStringTag";function f(t,r,e){return Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}),t[r]}try{f({},"")}catch(B){f=function(t,r,e){return t[r]=e}}function s(t,r,e,n){var o=r&&r.prototype instanceof p?r:p,a=Object.create(o.prototype),u=new _(n||[]);return i(a,"_invoke",{value:x(t,e,u)}),a}function h(t,r,e){try{return{type:"normal",arg:t.call(r,e)}}catch(B){return{type:"throw",arg:B}}}t.wrap=s;var v={};function p(){}function d(){}function y(){}var m={};f(m,u,function(){return this});var g=Object.getPrototypeOf,w=g&&g(g(T([])));w&&w!==n&&o.call(w,u)&&(m=w);var b=y.prototype=p.prototype=Object.create(m);function A(t){["next","throw","return"].forEach(function(r){f(t,r,function(t){return this._invoke(r,t)})})}function E(t,e){var n;i(this,"_invoke",{value:function(i,a){function u(){return new e(function(n,u){!function n(i,a,u,c){var l=h(t[i],t,a);if("throw"!==l.type){var f=l.arg,s=f.value;return s&&"object"==r(s)&&o.call(s,"__await")?e.resolve(s.__await).then(function(t){n("next",t,u,c)},function(t){n("throw",t,u,c)}):e.resolve(s).then(function(t){f.value=t,u(f)},function(t){return n("throw",t,u,c)})}c(l.arg)}(i,a,n,u)})}return n=n?n.then(u,u):u()}})}function x(t,r,e){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return j()}for(e.method=o,e.arg=i;;){var a=e.delegate;if(a){var u=L(a,e);if(u){if(u===v)continue;return u}}if("next"===e.method)e.sent=e._sent=e.arg;else if("throw"===e.method){if("suspendedStart"===n)throw n="completed",e.arg;e.dispatchException(e.arg)}else"return"===e.method&&e.abrupt("return",e.arg);n="executing";var c=h(t,r,e);if("normal"===c.type){if(n=e.done?"completed":"suspendedYield",c.arg===v)continue;return{value:c.arg,done:e.done}}"throw"===c.type&&(n="completed",e.method="throw",e.arg=c.arg)}}}function L(t,r){var e=r.method,n=t.iterator[e];if(void 0===n)return r.delegate=null,"throw"===e&&t.iterator.return&&(r.method="return",r.arg=void 0,L(t,r),"throw"===r.method)||"return"!==e&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+e+"' method")),v;var o=h(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,v;var i=o.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=void 0),r.delegate=null,v):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,v)}function S(t){var r={tryLoc:t[0]};1 in t&&(r.catchLoc=t[1]),2 in t&&(r.finallyLoc=t[2],r.afterLoc=t[3]),this.tryEntries.push(r)}function O(t){var r=t.completion||{};r.type="normal",delete r.arg,t.completion=r}function _(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(S,this),this.reset(!0)}function T(t){if(t){var r=t[u];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var e=-1,n=function r(){for(;++e<t.length;)if(o.call(t,e))return r.value=t[e],r.done=!1,r;return r.value=void 0,r.done=!0,r};return n.next=n}}return{next:j}}function j(){return{value:void 0,done:!0}}return d.prototype=y,i(b,"constructor",{value:y,configurable:!0}),i(y,"constructor",{value:d,configurable:!0}),d.displayName=f(y,l,"GeneratorFunction"),t.isGeneratorFunction=function(t){var r="function"==typeof t&&t.constructor;return!!r&&(r===d||"GeneratorFunction"===(r.displayName||r.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,f(t,l,"GeneratorFunction")),t.prototype=Object.create(b),t},t.awrap=function(t){return{__await:t}},A(E.prototype),f(E.prototype,c,function(){return this}),t.AsyncIterator=E,t.async=function(r,e,n,o,i){void 0===i&&(i=Promise);var a=new E(s(r,e,n,o),i);return t.isGeneratorFunction(e)?a:a.next().then(function(t){return t.done?t.value:a.next()})},A(b),f(b,l,"Generator"),f(b,u,function(){return this}),f(b,"toString",function(){return"[object Generator]"}),t.keys=function(t){var r=Object(t),e=[];for(var n in r)e.push(n);return e.reverse(),function t(){for(;e.length;){var n=e.pop();if(n in r)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=T,_.prototype={constructor:_,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(O),!t)for(var r in this)"t"===r.charAt(0)&&o.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function e(e,n){return a.type="throw",a.arg=t,r.next=e,n&&(r.method="next",r.arg=void 0),!!n}for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n],a=i.completion;if("root"===i.tryLoc)return e("end");if(i.tryLoc<=this.prev){var u=o.call(i,"catchLoc"),c=o.call(i,"finallyLoc");if(u&&c){if(this.prev<i.catchLoc)return e(i.catchLoc,!0);if(this.prev<i.finallyLoc)return e(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return e(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return e(i.finallyLoc)}}}},abrupt:function(t,r){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=r&&r<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=r,i?(this.method="next",this.next=i.finallyLoc,v):this.complete(a)},complete:function(t,r){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&r&&(this.next=r),v},finish:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),O(e),v}},catch:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.tryLoc===t){var n=e.completion;if("throw"===n.type){var o=n.arg;O(e)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,e){return this.delegate={iterator:T(t),resultName:r,nextLoc:e},"next"===this.method&&(this.arg=void 0),v}},t}function n(t){return u(t)||a(t)||i(t)||o()}function o(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function i(t,r){if(t){if("string"==typeof t)return c(t,r);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?c(t,r):void 0}}function a(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}function u(t){if(Array.isArray(t))return c(t)}function c(t,r){(null==r||r>t.length)&&(r=t.length);for(var e=0,n=new Array(r);e<r;e++)n[e]=t[e];return n}var l=this&&this.__awaiter||function(t,r,e,n){return new(e||(e=Promise))(function(o,i){function a(t){try{c(n.next(t))}catch(r){i(r)}}function u(t){try{c(n.throw(t))}catch(r){i(r)}}function c(t){var r;t.done?o(t.value):(r=t.value,r instanceof e?r:new e(function(t){t(r)})).then(a,u)}c((n=n.apply(t,r||[])).next())})};Object.defineProperty(exports,"__esModule",{value:!0}),exports.initABTest=void 0;var f=require("./const"),s=require("./local-storage"),h=require("../const"),v=function(t){var r=new Date(t);return"Invalid date"!==r.toString()&&!(r.getTime()<=Date.now())},p=function(t){return function(r){var e=0;r&&(e=t.findIndex(function(t){return t.getAttribute(f.AB.SELECTOR_VARIANT)===r})),e<0&&(e=0),[].concat(n(t.slice(0,e)),n(t.slice(e+1))).forEach(function(t){return t.remove()})}},d=function(){var t=document.querySelector(".loader");null==t||t.remove()},y=function(){return l(void 0,void 0,void 0,e().mark(function t(){var r,n;return e().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(0!==(r=document.querySelectorAll("[".concat(f.AB.SELECTOR_IMAGE,"]"))).length){t.next=3;break}return t.abrupt("return");case 3:return n=[],r.forEach(function(t){var r=t,e=r.getAttribute(f.AB.SELECTOR_IMAGE);e&&r.setAttribute("src",h.publicURL+e),n.push(r.decode())}),t.next=7,Promise.all(n);case 7:case"end":return t.stop()}},t)}))},m=function(t,r){var n=document.querySelector("[".concat(f.AB.SELECTOR_NAME,"]"));if(n){var o=n.querySelectorAll("[".concat(f.AB.SELECTOR_VARIANT,"]"));if(o.length<2)return null==r||r("AB test, less then 2 variants"),void(0,s.remove)(t.url);var i=function(t){return l(void 0,void 0,void 0,e().mark(function r(){return e().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return p(Array.from(o))(t),r.next=3,y();case 3:d();case 4:case"end":return r.stop()}},r)}))},a=n.getAttribute(f.AB.SELECTOR_NAME);if(!a)return null==r||r("AB test, no test name"),(0,s.remove)(t.url),void i();var u=n.getAttribute(f.AB.SELECTOR_EXPIRATION);if(!u)return null==r||r("AB test, no expiration date"),(0,s.remove)(t.url),void i();if(!v(u))return null==r||r("AB test, wrong expiration date"),(0,s.remove)(t.url),void i();if(t.isRegisteredUser)i();else{var c={ts:"".concat(Date.now()),variant:"A",name:a,url:t.url,expiration:u},h=function(e){var n=(0,s.read)(t.url);if(n){if(function(t,r){return t.name===r.name&&t.expiration===r.expiration&&t.url===r.url}(e,n))return n.variant;null==r||r("AB test, wrong LS data")}}(c);if(h)i(h);else{var m=o.length,g=Math.floor(Math.random()*m),w=Array.from(o)[g].getAttribute(f.AB.SELECTOR_VARIANT);if(!w)return null==r||r("AB test, can not define random variant name"),void i();(0,s.write)(Object.assign(Object.assign({},c),{variant:w})),i(w)}}}};exports.initABTest=m;
},{"./const":"p12s","./local-storage":"e1wq","../const":"Q3x5"}],"IaMM":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.log=void 0;var e=function(e){console.log("--\x3e Logger: ".concat(JSON.stringify(e)))};exports.log=e;
},{}],"B6dB":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),require("./styles.css");var e=require("./const"),r=require("./analytics/analytics"),s=require("./ab-test"),i=require("./api/logger"),t=window.location.href,u=function(e){return(0,i.log)({url:t,type:"error",payload:e})};(0,r.initAnalytics)(e.userId,t,e.CTA_SELECTOR),(0,s.initABTest)({url:t,userId:e.userId,isRegisteredUser:e.isRegisteredUser},u);
},{"./styles.css":"D9Nj","./const":"Q3x5","./analytics/analytics":"OTWw","./ab-test":"H02N","./api/logger":"IaMM"}]},{},["B6dB"], null)
//# sourceMappingURL=/abtest/src.a70d0076.js.map