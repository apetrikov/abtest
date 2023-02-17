// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }
  return bundleURL;
}
function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }
  return '/';
}
function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/const.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publicURL = exports.isRegisteredUser = exports.userId = exports.CTA_SELECTOR = void 0;
exports.CTA_SELECTOR = 'data-cta'; // for the button
exports.userId = '1'; // for the test reason id is here as a const
exports.isRegisteredUser = false; // We need only unregistered users
exports.publicURL = '/abtest';
},{}],"src/analytics/analytics-api.ts":[function(require,module,exports) {
"use strict";

/**
 * Tracks a pageview to our "imaginary api" - in this demo just the browser console. ;)
 * Send as params whatever you might seem valuable to send.
 * The URL is probably a good start though.
 */
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trackEvent = exports.trackPageview = void 0;
// send page events like open, close, scroll
var trackPageview = function trackPageview(payload) {
  var parsed = JSON.stringify(payload);
  console.log("--> Tracking Pageview: ".concat(parsed));
};
exports.trackPageview = trackPageview;
// sent user events like press, click
var trackEvent = function trackEvent(payload) {
  var parsed = JSON.stringify(payload);
  console.log("--> Tracking Event: ".concat(parsed));
};
exports.trackEvent = trackEvent;
},{}],"src/analytics/analytics.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initAnalytics = void 0;
var analytics_api_1 = require("./analytics-api");
var initAnalytics = function initAnalytics(userId, url, ctaSelector) {
  var loadPage = function loadPage() {
    return (0, analytics_api_1.trackPageview)({
      ts: Date.now(),
      url: url,
      type: 'load',
      userId: userId
    });
  };
  var clickCta = function clickCta() {
    return (0, analytics_api_1.trackEvent)({
      ts: Date.now(),
      url: url,
      type: 'click',
      userId: userId
    });
  };
  var unloadPage = function unloadPage() {
    window.removeEventListener('load', loadPage);
    window.removeEventListener('click', clickCta);
    window.removeEventListener('beforeunload', unloadPage);
    (0, analytics_api_1.trackPageview)({
      ts: Date.now(),
      url: url,
      type: 'unload',
      userId: userId
    });
  };
  window.addEventListener('load', loadPage);
  var ctaButton = document.querySelector("[".concat(ctaSelector, "]"));
  if (ctaButton) ctaButton.addEventListener('click', clickCta);
  window.addEventListener('beforeunload', unloadPage);
};
exports.initAnalytics = initAnalytics;
},{"./analytics-api":"src/analytics/analytics-api.ts"}],"src/ab-test/const.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LS = exports.AB = void 0;
var AB;
(function (AB) {
  AB["SELECTOR_NAME"] = "data-test";
  AB["SELECTOR_EXPIRATION"] = "data-expiration";
  AB["SELECTOR_VARIANT"] = "data-variant";
  AB["SELECTOR_IMAGE"] = "data-src"; // for image optimization
})(AB = exports.AB || (exports.AB = {}));
var LS;
(function (LS) {
  LS["KEY_NAME"] = "APP_ABTEST";
})(LS = exports.LS || (exports.LS = {}));
},{}],"src/ab-test/local-storage.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = exports.write = exports.read = void 0;
var const_1 = require("./const");
function isLStest(item) {
  // explicit properties
  if (typeof item.ts !== 'string' && typeof item.url !== 'string') return false;
  if (typeof item.name !== 'string' && typeof item.variant !== 'string') return false;
  if (typeof item.name !== 'string') return false;
  return true;
}
var read = function read(url) {
  var key = "".concat(const_1.LS.KEY_NAME, "_").concat(url);
  var rawItem = localStorage.getItem(key);
  if (!rawItem) return null;
  var item;
  try {
    item = JSON.parse(rawItem);
  } catch (_a) {
    console.log('LS parsing error'); // Not real log
    (0, exports.remove)(url);
    return null;
  }
  if (isLStest(item)) return item;
  return null;
};
exports.read = read;
var write = function write(params) {
  localStorage.setItem("".concat(const_1.LS.KEY_NAME, "_").concat(params.url), JSON.stringify(params));
};
exports.write = write;
var remove = function remove(url) {
  var key = "".concat(const_1.LS.KEY_NAME, "_").concat(url);
  localStorage.removeItem(key);
};
exports.remove = remove;
},{"./const":"src/ab-test/const.ts"}],"src/ab-test/index.ts":[function(require,module,exports) {
var define;
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initABTest = void 0;
var const_1 = require("./const");
var local_storage_1 = require("./local-storage");
var const_2 = require("../const");
var validateExpirationDate = function validateExpirationDate(expirationDate) {
  var date = new Date(expirationDate);
  if (date.toString() === 'Invalid date') return false;
  if (date.getTime() <= Date.now()) return false;
  return true;
};
var hideOtherVariants = function hideOtherVariants(variants) {
  return function (name) {
    var variantIndex = 0;
    if (name) {
      variantIndex = variants.findIndex(function (node) {
        return node.getAttribute(const_1.AB.SELECTOR_VARIANT) === name;
      });
    }
    if (variantIndex < 0) variantIndex = 0; // show default
    [].concat(_toConsumableArray(variants.slice(0, variantIndex)), _toConsumableArray(variants.slice(variantIndex + 1))).forEach(function (node) {
      return node.remove();
    });
  };
};
var hideLoader = function hideLoader() {
  var loader = document.querySelector('.loader');
  loader === null || loader === void 0 ? void 0 : loader.remove();
};
var loadimages = function loadimages() {
  return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var unloadedImages, array;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          unloadedImages = document.querySelectorAll("[".concat(const_1.AB.SELECTOR_IMAGE, "]"));
          if (!(unloadedImages.length === 0)) {
            _context.next = 3;
            break;
          }
          return _context.abrupt("return");
        case 3:
          array = [];
          unloadedImages.forEach(function (el) {
            var img = el;
            var src = img.getAttribute(const_1.AB.SELECTOR_IMAGE);
            if ("development" === 'production') {
              src && img.setAttribute('src', const_2.publicURL + src);
            } else {
              src && img.setAttribute('src', src);
            }
            array.push(img.decode());
          });
          _context.next = 7;
          return Promise.all(array);
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
};
var initABTest = function initABTest(params, log) {
  var testEl = document.querySelector("[".concat(const_1.AB.SELECTOR_NAME, "]"));
  if (!testEl) return; // no test, show as is, OK
  var testVariants = testEl.querySelectorAll("[".concat(const_1.AB.SELECTOR_VARIANT, "]"));
  if (testVariants.length < 2) {
    log === null || log === void 0 ? void 0 : log('AB test, less then 2 variants');
    (0, local_storage_1.remove)(params.url);
    return;
  } // log ERROR, show as is
  var showVariant = function showVariant(name) {
    return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            hideOtherVariants(Array.from(testVariants))(name);
            _context2.next = 3;
            return loadimages();
          case 3:
            hideLoader();
          case 4:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
  };
  // Further we have two+ variants
  var testName = testEl.getAttribute(const_1.AB.SELECTOR_NAME);
  if (!testName) {
    log === null || log === void 0 ? void 0 : log('AB test, no test name');
    (0, local_storage_1.remove)(params.url);
    showVariant();
    return;
  }
  var expirationDate = testEl.getAttribute(const_1.AB.SELECTOR_EXPIRATION);
  if (!expirationDate) {
    log === null || log === void 0 ? void 0 : log('AB test, no expiration date');
    (0, local_storage_1.remove)(params.url);
    showVariant();
    return;
  } // log error, select first variant (control)
  if (!validateExpirationDate(expirationDate)) {
    log === null || log === void 0 ? void 0 : log('AB test, wrong expiration date');
    (0, local_storage_1.remove)(params.url);
    showVariant();
    return;
  }
  if (params.isRegisteredUser) {
    showVariant();
    return;
  } // select first variant (control)
  // check LS
  var variantFromLS = function variantFromLS(test) {
    var compareTestAndLS = function compareTestAndLS(test, ls) {
      if (test.name !== ls.name) return false;
      if (test.expiration !== ls.expiration) return false;
      if (test.url !== ls.url) return false;
      return true;
    };
    var lsVariant = (0, local_storage_1.read)(params.url);
    if (!lsVariant) return;
    if (!compareTestAndLS(test, lsVariant)) {
      log === null || log === void 0 ? void 0 : log('AB test, wrong LS data');
      return;
    }
    return lsVariant.variant;
  };
  var test = {
    ts: "".concat(Date.now()),
    variant: 'A',
    name: testName,
    url: params.url,
    expiration: expirationDate
  };
  var LStestVariant = variantFromLS(test);
  if (LStestVariant) {
    showVariant(LStestVariant);
    return;
  }
  // randomly assign a variant, show it
  var numberOfVariants = testVariants.length;
  var randomVariant = Math.floor(Math.random() * numberOfVariants);
  var randomName = Array.from(testVariants)[randomVariant].getAttribute(const_1.AB.SELECTOR_VARIANT);
  if (!randomName) {
    log === null || log === void 0 ? void 0 : log('AB test, can not define random variant name');
    showVariant();
    return;
  }
  (0, local_storage_1.write)(Object.assign(Object.assign({}, test), {
    variant: randomName
  }));
  showVariant(randomName);
};
exports.initABTest = initABTest;
},{"./const":"src/ab-test/const.ts","./local-storage":"src/ab-test/local-storage.ts","../const":"src/const.ts"}],"src/api/logger.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log = void 0;
// logs events params: type, url, payload
var log = function log(payload) {
  console.log("--> Logger: ".concat(JSON.stringify(payload)));
};
exports.log = log;
},{}],"src/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
require("./styles.css");
var const_1 = require("./const");
var analytics_1 = require("./analytics/analytics");
var ab_test_1 = require("./ab-test");
var logger_1 = require("./api/logger");
// Your code here
// Parse HTML for test info
// Parse cookies
// Compare cookies and HTML
// Apply final variant changes to HTML
// TODO
// Add analytics tracker
var url = window.location.href;
var logger = function logger(payload) {
  return (0, logger_1.log)({
    url: url,
    type: 'error',
    payload: payload
  });
};
(0, analytics_1.initAnalytics)(const_1.userId, url, const_1.CTA_SELECTOR);
(0, ab_test_1.initABTest)({
  url: url,
  userId: const_1.userId,
  isRegisteredUser: const_1.isRegisteredUser
}, logger);
// Work with HTML service
// Work with cookie service
// Log errors servise
},{"./styles.css":"src/styles.css","./const":"src/const.ts","./analytics/analytics":"src/analytics/analytics.ts","./ab-test":"src/ab-test/index.ts","./api/logger":"src/api/logger.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50726" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map