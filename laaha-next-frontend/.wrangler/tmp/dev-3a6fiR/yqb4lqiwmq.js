function __cf_cjs(esm) {
  const cjs = 'default' in esm ? esm.default : {};
	for (const [k, v] of Object.entries(esm)) {
		if (k !== 'default') {
			Object.defineProperty(cjs, k, {
				enumerable: true,
				value: v,
			});
		}
	}
	return cjs;
}
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn2, res) => function __init() {
  return fn2 && (res = (0, fn2[__getOwnPropNames(fn2)[0]])(fn2 = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// node_modules/wrangler/_virtual_unenv_global_polyfill-clear$immediate.js
var init_virtual_unenv_global_polyfill_clear_immediate = __esm({
  "node_modules/wrangler/_virtual_unenv_global_polyfill-clear$immediate.js"() {
    init_cloudflare();
    globalThis.clearImmediate = clearImmediateFallback;
  }
});

// node_modules/unenv/runtime/_internal/utils.mjs
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
function notImplemented(name) {
  const fn2 = /* @__PURE__ */ __name(() => {
    throw createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn2, { __unenv__: true });
}
var init_utils = __esm({
  "node_modules/unenv/runtime/_internal/utils.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_process();
    init_virtual_unenv_global_polyfill_performance();
    init_virtual_unenv_global_polyfill_console();
    init_virtual_unenv_global_polyfill_set_immediate();
    init_virtual_unenv_global_polyfill_clear_immediate();
    __name(createNotImplementedError, "createNotImplementedError");
    __name(notImplemented, "notImplemented");
  }
});

// node_modules/unenv/runtime/mock/noop.mjs
var noop_default;
var init_noop = __esm({
  "node_modules/unenv/runtime/mock/noop.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_process();
    init_virtual_unenv_global_polyfill_performance();
    init_virtual_unenv_global_polyfill_console();
    init_virtual_unenv_global_polyfill_set_immediate();
    init_virtual_unenv_global_polyfill_clear_immediate();
    noop_default = Object.assign(() => {
    }, { __unenv__: true });
  }
});

// node_modules/unenv/runtime/node/timers/internal/immediate.mjs
var Immediate;
var init_immediate = __esm({
  "node_modules/unenv/runtime/node/timers/internal/immediate.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_process();
    init_virtual_unenv_global_polyfill_performance();
    init_virtual_unenv_global_polyfill_console();
    init_virtual_unenv_global_polyfill_set_immediate();
    init_virtual_unenv_global_polyfill_clear_immediate();
    Immediate = class {
      _onImmediate;
      _timeout;
      constructor(callback, args) {
        this._onImmediate = callback;
        if ("setTimeout" in globalThis) {
          this._timeout = setTimeout(callback, 0, ...args);
        } else {
          callback(...args);
        }
      }
      ref() {
        this._timeout?.ref();
        return this;
      }
      unref() {
        this._timeout?.unref();
        return this;
      }
      hasRef() {
        return this._timeout?.hasRef() ?? false;
      }
      [Symbol.dispose]() {
        if ("clearTimeout" in globalThis) {
          clearTimeout(this._timeout);
        }
      }
    };
    __name(Immediate, "Immediate");
  }
});

// node_modules/unenv/runtime/node/timers/internal/set-immediate.mjs
function setImmediateFallbackPromises(value) {
  return new Promise((res) => {
    res(value);
  });
}
function setImmediateFallback(callback, ...args) {
  return new Immediate(callback, args);
}
function clearImmediateFallback(immediate) {
  immediate?.[Symbol.dispose]();
}
var init_set_immediate = __esm({
  "node_modules/unenv/runtime/node/timers/internal/set-immediate.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_process();
    init_virtual_unenv_global_polyfill_performance();
    init_virtual_unenv_global_polyfill_console();
    init_virtual_unenv_global_polyfill_set_immediate();
    init_virtual_unenv_global_polyfill_clear_immediate();
    init_immediate();
    __name(setImmediateFallbackPromises, "setImmediateFallbackPromises");
    __name(setImmediateFallback, "setImmediateFallback");
    setImmediateFallback.__promisify__ = setImmediateFallbackPromises;
    __name(clearImmediateFallback, "clearImmediateFallback");
  }
});

// node_modules/unenv/runtime/node/timers/$cloudflare.mjs
var init_cloudflare = __esm({
  "node_modules/unenv/runtime/node/timers/$cloudflare.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_process();
    init_virtual_unenv_global_polyfill_performance();
    init_virtual_unenv_global_polyfill_console();
    init_virtual_unenv_global_polyfill_set_immediate();
    init_virtual_unenv_global_polyfill_clear_immediate();
    init_set_immediate();
  }
});

// node_modules/wrangler/_virtual_unenv_global_polyfill-set$immediate.js
var init_virtual_unenv_global_polyfill_set_immediate = __esm({
  "node_modules/wrangler/_virtual_unenv_global_polyfill-set$immediate.js"() {
    init_cloudflare();
    globalThis.setImmediate = setImmediateFallback;
  }
});

// node_modules/unenv/runtime/mock/proxy.mjs
function createMock(name, overrides = {}) {
  fn.prototype.name = name;
  const props = {};
  return new Proxy(fn, {
    get(_target, prop) {
      if (prop === "caller") {
        return null;
      }
      if (prop === "__createMock__") {
        return createMock;
      }
      if (prop === "__unenv__") {
        return true;
      }
      if (prop in overrides) {
        return overrides[prop];
      }
      return props[prop] = props[prop] || createMock(`${name}.${prop.toString()}`);
    },
    apply(_target, _this, _args) {
      return createMock(`${name}()`);
    },
    construct(_target, _args, _newT) {
      return createMock(`[${name}]`);
    },
    // @ts-ignore (ES6-only - removed in ES7)
    // https://github.com/tc39/ecma262/issues/161
    enumerate() {
      return [];
    }
  });
}
var fn, proxy_default;
var init_proxy = __esm({
  "node_modules/unenv/runtime/mock/proxy.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_process();
    init_virtual_unenv_global_polyfill_performance();
    init_virtual_unenv_global_polyfill_console();
    init_virtual_unenv_global_polyfill_set_immediate();
    init_virtual_unenv_global_polyfill_clear_immediate();
    fn = /* @__PURE__ */ __name(function() {
    }, "fn");
    __name(createMock, "createMock");
    proxy_default = createMock("mock");
  }
});

// node_modules/unenv/runtime/node/console/index.mjs
import { Writable } from "node:stream";
var _console, _ignoreErrors, _stderr, _stdout, log, info, trace, debug, table, error, warn, createTask, assert, clear, count, countReset, dir, dirxml, group, groupEnd, groupCollapsed, profile, profileEnd, time, timeEnd, timeLog, timeStamp, Console;
var init_console = __esm({
  "node_modules/unenv/runtime/node/console/index.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_process();
    init_virtual_unenv_global_polyfill_performance();
    init_virtual_unenv_global_polyfill_console();
    init_virtual_unenv_global_polyfill_set_immediate();
    init_virtual_unenv_global_polyfill_clear_immediate();
    init_proxy();
    init_noop();
    init_utils();
    init_proxy();
    init_noop();
    _console = globalThis.console;
    _ignoreErrors = true;
    _stderr = new Writable();
    _stdout = new Writable();
    log = _console?.log ?? noop_default;
    info = _console?.info ?? log;
    trace = _console?.trace ?? info;
    debug = _console?.debug ?? log;
    table = _console?.table ?? log;
    error = _console?.error ?? log;
    warn = _console?.warn ?? error;
    createTask = _console?.createTask ?? notImplemented("console.createTask");
    assert = notImplemented("console.assert");
    clear = _console?.clear ?? noop_default;
    count = _console?.count ?? noop_default;
    countReset = _console?.countReset ?? noop_default;
    dir = _console?.dir ?? noop_default;
    dirxml = _console?.dirxml ?? noop_default;
    group = _console?.group ?? noop_default;
    groupEnd = _console?.groupEnd ?? noop_default;
    groupCollapsed = _console?.groupCollapsed ?? noop_default;
    profile = _console?.profile ?? noop_default;
    profileEnd = _console?.profileEnd ?? noop_default;
    time = _console?.time ?? noop_default;
    timeEnd = _console?.timeEnd ?? noop_default;
    timeLog = _console?.timeLog ?? noop_default;
    timeStamp = _console?.timeStamp ?? noop_default;
    Console = _console?.Console ?? proxy_default.__createMock__("console.Console");
  }
});

// node_modules/unenv/runtime/node/console/$cloudflare.mjs
var workerdConsole, assert2, clear2, context, count2, countReset2, createTask2, debug2, dir2, dirxml2, error2, group2, groupCollapsed2, groupEnd2, info2, log2, profile2, profileEnd2, table2, time2, timeEnd2, timeLog2, timeStamp2, trace2, warn2, cloudflare_default;
var init_cloudflare2 = __esm({
  "node_modules/unenv/runtime/node/console/$cloudflare.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_process();
    init_virtual_unenv_global_polyfill_performance();
    init_virtual_unenv_global_polyfill_console();
    init_virtual_unenv_global_polyfill_set_immediate();
    init_virtual_unenv_global_polyfill_clear_immediate();
    init_console();
    workerdConsole = globalThis["console"];
    ({
      assert: assert2,
      clear: clear2,
      context: (
        // @ts-expect-error undocumented public API
        context
      ),
      count: count2,
      countReset: countReset2,
      createTask: (
        // @ts-expect-error undocumented public API
        createTask2
      ),
      debug: debug2,
      dir: dir2,
      dirxml: dirxml2,
      error: error2,
      group: group2,
      groupCollapsed: groupCollapsed2,
      groupEnd: groupEnd2,
      info: info2,
      log: log2,
      profile: profile2,
      profileEnd: profileEnd2,
      table: table2,
      time: time2,
      timeEnd: timeEnd2,
      timeLog: timeLog2,
      timeStamp: timeStamp2,
      trace: trace2,
      warn: warn2
    } = workerdConsole);
    Object.assign(workerdConsole, {
      Console,
      _ignoreErrors,
      _stderr,
      _stderrErrorHandler: noop_default,
      _stdout,
      _stdoutErrorHandler: noop_default,
      _times: proxy_default
    });
    cloudflare_default = workerdConsole;
  }
});

// node_modules/wrangler/_virtual_unenv_global_polyfill-console.js
var init_virtual_unenv_global_polyfill_console = __esm({
  "node_modules/wrangler/_virtual_unenv_global_polyfill-console.js"() {
    init_cloudflare2();
    globalThis.console = cloudflare_default;
  }
});

// node_modules/unenv/runtime/web/performance/_entry.mjs
var _supportedEntryTypes, _PerformanceEntry, PerformanceEntry, _PerformanceMark, PerformanceMark, _PerformanceMeasure, PerformanceMeasure, _PerformanceResourceTiming, PerformanceResourceTiming;
var init_entry = __esm({
  "node_modules/unenv/runtime/web/performance/_entry.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_process();
    init_virtual_unenv_global_polyfill_performance();
    init_virtual_unenv_global_polyfill_console();
    init_virtual_unenv_global_polyfill_set_immediate();
    init_virtual_unenv_global_polyfill_clear_immediate();
    _supportedEntryTypes = [
      "event",
      // PerformanceEntry
      "mark",
      // PerformanceMark
      "measure",
      // PerformanceMeasure
      "resource"
      // PerformanceResourceTiming
    ];
    _PerformanceEntry = class {
      __unenv__ = true;
      detail;
      entryType = "event";
      name;
      startTime;
      constructor(name, options) {
        this.name = name;
        this.startTime = options?.startTime || performance.now();
        this.detail = options?.detail;
      }
      get duration() {
        return performance.now() - this.startTime;
      }
      toJSON() {
        return {
          name: this.name,
          entryType: this.entryType,
          startTime: this.startTime,
          duration: this.duration,
          detail: this.detail
        };
      }
    };
    __name(_PerformanceEntry, "_PerformanceEntry");
    PerformanceEntry = globalThis.PerformanceEntry || _PerformanceEntry;
    _PerformanceMark = class extends _PerformanceEntry {
      entryType = "mark";
    };
    __name(_PerformanceMark, "_PerformanceMark");
    PerformanceMark = globalThis.PerformanceMark || _PerformanceMark;
    _PerformanceMeasure = class extends _PerformanceEntry {
      entryType = "measure";
    };
    __name(_PerformanceMeasure, "_PerformanceMeasure");
    PerformanceMeasure = globalThis.PerformanceMeasure || _PerformanceMeasure;
    _PerformanceResourceTiming = class extends _PerformanceEntry {
      entryType = "resource";
      serverTiming = [];
      connectEnd = 0;
      connectStart = 0;
      decodedBodySize = 0;
      domainLookupEnd = 0;
      domainLookupStart = 0;
      encodedBodySize = 0;
      fetchStart = 0;
      initiatorType = "";
      name = "";
      nextHopProtocol = "";
      redirectEnd = 0;
      redirectStart = 0;
      requestStart = 0;
      responseEnd = 0;
      responseStart = 0;
      secureConnectionStart = 0;
      startTime = 0;
      transferSize = 0;
      workerStart = 0;
    };
    __name(_PerformanceResourceTiming, "_PerformanceResourceTiming");
    PerformanceResourceTiming = globalThis.PerformanceResourceTiming || _PerformanceResourceTiming;
  }
});

// node_modules/unenv/runtime/web/performance/_performance.mjs
var _timeOrigin, _Performance, Performance, performance2;
var init_performance = __esm({
  "node_modules/unenv/runtime/web/performance/_performance.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_process();
    init_virtual_unenv_global_polyfill_performance();
    init_virtual_unenv_global_polyfill_console();
    init_virtual_unenv_global_polyfill_set_immediate();
    init_virtual_unenv_global_polyfill_clear_immediate();
    init_utils();
    init_proxy();
    init_entry();
    _timeOrigin = Date.now();
    _Performance = class {
      __unenv__ = true;
      timeOrigin = _timeOrigin;
      eventCounts = /* @__PURE__ */ new Map();
      _entries = [];
      _resourceTimingBufferSize = 0;
      navigation = proxy_default.__createMock__("PerformanceNavigation");
      timing = proxy_default.__createMock__("PerformanceTiming");
      onresourcetimingbufferfull = null;
      now() {
        if (globalThis?.performance?.now && this.timeOrigin === _timeOrigin) {
          return globalThis.performance.now();
        }
        return Date.now() - this.timeOrigin;
      }
      clearMarks(markName) {
        this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
      }
      clearMeasures(measureName) {
        this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
      }
      clearResourceTimings() {
        this._entries = this._entries.filter(
          (e) => e.entryType !== "resource" || e.entryType !== "navigation"
        );
      }
      getEntries() {
        return this._entries;
      }
      getEntriesByName(name, type) {
        return this._entries.filter(
          (e) => e.name === name && (!type || e.entryType === type)
        );
      }
      getEntriesByType(type) {
        return this._entries.filter(
          (e) => e.entryType === type
        );
      }
      mark(name, options) {
        const entry = new _PerformanceMark(name, options);
        this._entries.push(entry);
        return entry;
      }
      measure(measureName, startOrMeasureOptions, endMark) {
        let start;
        let end;
        if (typeof startOrMeasureOptions === "string") {
          start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
          end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
        } else {
          start = Number.parseFloat(startOrMeasureOptions?.start) || performance2.now();
          end = Number.parseFloat(startOrMeasureOptions?.end) || performance2.now();
        }
        const entry = new _PerformanceMeasure(measureName, {
          startTime: start,
          detail: { start, end }
        });
        this._entries.push(entry);
        return entry;
      }
      setResourceTimingBufferSize(maxSize) {
        this._resourceTimingBufferSize = maxSize;
      }
      toJSON() {
        return this;
      }
      addEventListener(type, listener, options) {
        throw createNotImplementedError("Performance.addEventListener");
      }
      removeEventListener(type, listener, options) {
        throw createNotImplementedError("Performance.removeEventListener");
      }
      dispatchEvent(event) {
        throw createNotImplementedError("Performance.dispatchEvent");
      }
    };
    __name(_Performance, "_Performance");
    Performance = globalThis.Performance || _Performance;
    performance2 = globalThis.performance || new Performance();
  }
});

// node_modules/unenv/runtime/web/performance/_observer.mjs
var _PerformanceObserver, PerformanceObserver, _PerformanceObserverEntryList, PerformanceObserverEntryList;
var init_observer = __esm({
  "node_modules/unenv/runtime/web/performance/_observer.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_process();
    init_virtual_unenv_global_polyfill_performance();
    init_virtual_unenv_global_polyfill_console();
    init_virtual_unenv_global_polyfill_set_immediate();
    init_virtual_unenv_global_polyfill_clear_immediate();
    init_utils();
    init_entry();
    _PerformanceObserver = class {
      __unenv__ = true;
      _callback = null;
      constructor(callback) {
        this._callback = callback;
      }
      takeRecords() {
        return [];
      }
      disconnect() {
        throw createNotImplementedError("PerformanceObserver.disconnect");
      }
      observe(options) {
        throw createNotImplementedError("PerformanceObserver.observe");
      }
    };
    __name(_PerformanceObserver, "_PerformanceObserver");
    __publicField(_PerformanceObserver, "supportedEntryTypes", _supportedEntryTypes);
    PerformanceObserver = globalThis.PerformanceObserver || _PerformanceObserver;
    _PerformanceObserverEntryList = class {
      __unenv__ = true;
      getEntries() {
        return [];
      }
      getEntriesByName(_name, _type) {
        return [];
      }
      getEntriesByType(type) {
        return [];
      }
    };
    __name(_PerformanceObserverEntryList, "_PerformanceObserverEntryList");
    PerformanceObserverEntryList = globalThis.PerformanceObserverEntryList || _PerformanceObserverEntryList;
  }
});

// node_modules/unenv/runtime/web/performance/index.mjs
var init_performance2 = __esm({
  "node_modules/unenv/runtime/web/performance/index.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_process();
    init_virtual_unenv_global_polyfill_performance();
    init_virtual_unenv_global_polyfill_console();
    init_virtual_unenv_global_polyfill_set_immediate();
    init_virtual_unenv_global_polyfill_clear_immediate();
    init_performance();
    init_observer();
    init_entry();
  }
});

// node_modules/unenv/runtime/polyfill/global-this.mjs
function getGlobal() {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  return {};
}
var global_this_default;
var init_global_this = __esm({
  "node_modules/unenv/runtime/polyfill/global-this.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_process();
    init_virtual_unenv_global_polyfill_performance();
    init_virtual_unenv_global_polyfill_console();
    init_virtual_unenv_global_polyfill_set_immediate();
    init_virtual_unenv_global_polyfill_clear_immediate();
    __name(getGlobal, "getGlobal");
    global_this_default = getGlobal();
  }
});

// node_modules/unenv/runtime/polyfill/performance.mjs
var performance_default;
var init_performance3 = __esm({
  "node_modules/unenv/runtime/polyfill/performance.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_process();
    init_virtual_unenv_global_polyfill_performance();
    init_virtual_unenv_global_polyfill_console();
    init_virtual_unenv_global_polyfill_set_immediate();
    init_virtual_unenv_global_polyfill_clear_immediate();
    init_performance2();
    init_global_this();
    global_this_default.performance = global_this_default.performance || performance2;
    global_this_default.Performance = global_this_default.Performance || Performance;
    global_this_default.PerformanceEntry = global_this_default.PerformanceEntry || PerformanceEntry;
    global_this_default.PerformanceMark = global_this_default.PerformanceMark || PerformanceMark;
    global_this_default.PerformanceMeasure = global_this_default.PerformanceMeasure || PerformanceMeasure;
    global_this_default.PerformanceObserver = global_this_default.PerformanceObserver || PerformanceObserver;
    global_this_default.PerformanceObserverEntryList = global_this_default.PerformanceObserverEntryList || PerformanceObserverEntryList;
    global_this_default.PerformanceResourceTiming = global_this_default.PerformanceResourceTiming || PerformanceResourceTiming;
    performance_default = global_this_default.performance;
  }
});

// node_modules/wrangler/_virtual_unenv_global_polyfill-performance.js
var init_virtual_unenv_global_polyfill_performance = __esm({
  "node_modules/wrangler/_virtual_unenv_global_polyfill-performance.js"() {
    init_performance3();
    globalThis.performance = performance_default;
  }
});

// node_modules/unenv/runtime/mock/empty.mjs
var empty_default;
var init_empty = __esm({
  "node_modules/unenv/runtime/mock/empty.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_process();
    init_virtual_unenv_global_polyfill_performance();
    init_virtual_unenv_global_polyfill_console();
    init_virtual_unenv_global_polyfill_set_immediate();
    init_virtual_unenv_global_polyfill_clear_immediate();
    empty_default = Object.freeze(
      Object.create(null, {
        __unenv__: { get: () => true }
      })
    );
  }
});

// node_modules/unenv/runtime/node/process/internal/env.mjs
var _envShim, _processEnv, _getEnv, env;
var init_env = __esm({
  "node_modules/unenv/runtime/node/process/internal/env.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_process();
    init_virtual_unenv_global_polyfill_performance();
    init_virtual_unenv_global_polyfill_console();
    init_virtual_unenv_global_polyfill_set_immediate();
    init_virtual_unenv_global_polyfill_clear_immediate();
    _envShim = /* @__PURE__ */ Object.create(null);
    _processEnv = globalThis.process?.env;
    _getEnv = /* @__PURE__ */ __name((useShim) => _processEnv || globalThis.__env__ || (useShim ? _envShim : globalThis), "_getEnv");
    env = new Proxy(_envShim, {
      get(_2, prop) {
        const env22 = _getEnv();
        return env22[prop] ?? _envShim[prop];
      },
      has(_2, prop) {
        const env22 = _getEnv();
        return prop in env22 || prop in _envShim;
      },
      set(_2, prop, value) {
        const env22 = _getEnv(true);
        env22[prop] = value;
        return true;
      },
      deleteProperty(_2, prop) {
        const env22 = _getEnv(true);
        delete env22[prop];
        return true;
      },
      ownKeys() {
        const env22 = _getEnv();
        return Object.keys(env22);
      }
    });
  }
});

// node_modules/unenv/runtime/node/process/internal/time.mjs
function _createNextTickWithTimeout() {
  let queue = [];
  let draining = false;
  let currentQueue;
  let queueIndex = -1;
  function cleanUpNextTick() {
    if (!draining || !currentQueue) {
      return;
    }
    draining = false;
    if (currentQueue.length > 0) {
      queue = [...currentQueue, ...queue];
    } else {
      queueIndex = -1;
    }
    if (queue.length > 0) {
      drainQueue();
    }
  }
  __name(cleanUpNextTick, "cleanUpNextTick");
  function drainQueue() {
    if (draining) {
      return;
    }
    const timeout = setTimeout(cleanUpNextTick);
    draining = true;
    let len = queue.length;
    while (len) {
      currentQueue = queue;
      queue = [];
      while (++queueIndex < len) {
        if (currentQueue) {
          currentQueue[queueIndex]();
        }
      }
      queueIndex = -1;
      len = queue.length;
    }
    currentQueue = void 0;
    draining = false;
    clearTimeout(timeout);
  }
  __name(drainQueue, "drainQueue");
  const nextTick22 = /* @__PURE__ */ __name((cb, ...args) => {
    queue.push(cb.bind(void 0, ...args));
    if (queue.length === 1 && !draining) {
      setTimeout(drainQueue);
    }
  }, "nextTick2");
  return nextTick22;
}
var hrtime, nextTick;
var init_time = __esm({
  "node_modules/unenv/runtime/node/process/internal/time.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_process();
    init_virtual_unenv_global_polyfill_performance();
    init_virtual_unenv_global_polyfill_console();
    init_virtual_unenv_global_polyfill_set_immediate();
    init_virtual_unenv_global_polyfill_clear_immediate();
    hrtime = Object.assign(
      /* @__PURE__ */ __name(function hrtime2(startTime) {
        const now = Date.now();
        const seconds = Math.trunc(now / 1e3);
        const nanos = now % 1e3 * 1e6;
        if (startTime) {
          let diffSeconds = seconds - startTime[0];
          let diffNanos = nanos - startTime[0];
          if (diffNanos < 0) {
            diffSeconds = diffSeconds - 1;
            diffNanos = 1e9 + diffNanos;
          }
          return [diffSeconds, diffNanos];
        }
        return [seconds, nanos];
      }, "hrtime2"),
      {
        bigint: /* @__PURE__ */ __name(function bigint() {
          return BigInt(Date.now() * 1e6);
        }, "bigint")
      }
    );
    nextTick = globalThis.queueMicrotask ? (cb, ...args) => {
      globalThis.queueMicrotask(cb.bind(void 0, ...args));
    } : _createNextTickWithTimeout();
    __name(_createNextTickWithTimeout, "_createNextTickWithTimeout");
  }
});

// node_modules/unenv/runtime/node/process/internal/process.mjs
function noop() {
  return process2;
}
var title, argv, version, versions, on, addListener, once, off, removeListener, removeAllListeners, emit, prependListener, prependOnceListener, listeners, listenerCount, binding, _cwd, cwd, chdir, umask, getegid, geteuid, getgid, getuid, getgroups, getBuiltinModule, abort, allowedNodeEnvironmentFlags, arch, argv0, config, connected, constrainedMemory, availableMemory, cpuUsage, debugPort, dlopen, disconnect, emitWarning, eventNames, execArgv, execPath, exit, features, getActiveResourcesInfo, getMaxListeners, kill, memoryUsage, pid, platform, ppid, rawListeners, release, report, resourceUsage, setegid, seteuid, setgid, setgroups, setuid, setMaxListeners, setSourceMapsEnabled, stdout, stderr, stdin, traceDeprecation, uptime, exitCode, setUncaughtExceptionCaptureCallback, hasUncaughtExceptionCaptureCallback, sourceMapsEnabled, loadEnvFile, mainModule, permission, channel, throwDeprecation, assert3, openStdin, _debugEnd, _debugProcess, _fatalException, _getActiveHandles, _getActiveRequests, _kill, _preload_modules, _rawDebug, _startProfilerIdleNotifier, _stopProfilerIdleNotifier, _tickCallback, _linkedBinding, domain, initgroups, moduleLoadList, reallyExit, _exiting, _events, _eventsCount, _maxListeners, process2;
var init_process = __esm({
  "node_modules/unenv/runtime/node/process/internal/process.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_process();
    init_virtual_unenv_global_polyfill_performance();
    init_virtual_unenv_global_polyfill_console();
    init_virtual_unenv_global_polyfill_set_immediate();
    init_virtual_unenv_global_polyfill_clear_immediate();
    init_proxy();
    init_empty();
    init_utils();
    init_env();
    init_time();
    init_time();
    title = "unenv";
    argv = [];
    version = "";
    versions = {
      ares: "",
      http_parser: "",
      icu: "",
      modules: "",
      node: "",
      openssl: "",
      uv: "",
      v8: "",
      zlib: ""
    };
    __name(noop, "noop");
    on = noop;
    addListener = noop;
    once = noop;
    off = noop;
    removeListener = noop;
    removeAllListeners = noop;
    emit = /* @__PURE__ */ __name(function emit2(event) {
      if (event === "message" || event === "multipleResolves") {
        return process2;
      }
      return false;
    }, "emit2");
    prependListener = noop;
    prependOnceListener = noop;
    listeners = /* @__PURE__ */ __name(function(name) {
      return [];
    }, "listeners");
    listenerCount = /* @__PURE__ */ __name(() => 0, "listenerCount");
    binding = /* @__PURE__ */ __name(function(name) {
      throw new Error("[unenv] process.binding is not supported");
    }, "binding");
    _cwd = "/";
    cwd = /* @__PURE__ */ __name(function cwd2() {
      return _cwd;
    }, "cwd2");
    chdir = /* @__PURE__ */ __name(function chdir2(dir3) {
      _cwd = dir3;
    }, "chdir2");
    umask = /* @__PURE__ */ __name(function umask2() {
      return 0;
    }, "umask2");
    getegid = /* @__PURE__ */ __name(function getegid2() {
      return 1e3;
    }, "getegid2");
    geteuid = /* @__PURE__ */ __name(function geteuid2() {
      return 1e3;
    }, "geteuid2");
    getgid = /* @__PURE__ */ __name(function getgid2() {
      return 1e3;
    }, "getgid2");
    getuid = /* @__PURE__ */ __name(function getuid2() {
      return 1e3;
    }, "getuid2");
    getgroups = /* @__PURE__ */ __name(function getgroups2() {
      return [];
    }, "getgroups2");
    getBuiltinModule = /* @__PURE__ */ __name((_name) => void 0, "getBuiltinModule");
    abort = notImplemented("process.abort");
    allowedNodeEnvironmentFlags = /* @__PURE__ */ new Set();
    arch = "";
    argv0 = "";
    config = empty_default;
    connected = false;
    constrainedMemory = /* @__PURE__ */ __name(() => 0, "constrainedMemory");
    availableMemory = /* @__PURE__ */ __name(() => 0, "availableMemory");
    cpuUsage = notImplemented("process.cpuUsage");
    debugPort = 0;
    dlopen = notImplemented("process.dlopen");
    disconnect = noop;
    emitWarning = noop;
    eventNames = notImplemented("process.eventNames");
    execArgv = [];
    execPath = "";
    exit = notImplemented("process.exit");
    features = /* @__PURE__ */ Object.create({
      inspector: void 0,
      debug: void 0,
      uv: void 0,
      ipv6: void 0,
      tls_alpn: void 0,
      tls_sni: void 0,
      tls_ocsp: void 0,
      tls: void 0,
      cached_builtins: void 0
    });
    getActiveResourcesInfo = /* @__PURE__ */ __name(() => [], "getActiveResourcesInfo");
    getMaxListeners = notImplemented(
      "process.getMaxListeners"
    );
    kill = notImplemented("process.kill");
    memoryUsage = Object.assign(
      () => ({
        arrayBuffers: 0,
        rss: 0,
        external: 0,
        heapTotal: 0,
        heapUsed: 0
      }),
      { rss: () => 0 }
    );
    pid = 1e3;
    platform = "";
    ppid = 1e3;
    rawListeners = notImplemented(
      "process.rawListeners"
    );
    release = /* @__PURE__ */ Object.create({
      name: "",
      lts: "",
      sourceUrl: void 0,
      headersUrl: void 0
    });
    report = /* @__PURE__ */ Object.create({
      compact: void 0,
      directory: void 0,
      filename: void 0,
      getReport: notImplemented("process.report.getReport"),
      reportOnFatalError: void 0,
      reportOnSignal: void 0,
      reportOnUncaughtException: void 0,
      signal: void 0,
      writeReport: notImplemented("process.report.writeReport")
    });
    resourceUsage = notImplemented(
      "process.resourceUsage"
    );
    setegid = notImplemented("process.setegid");
    seteuid = notImplemented("process.seteuid");
    setgid = notImplemented("process.setgid");
    setgroups = notImplemented("process.setgroups");
    setuid = notImplemented("process.setuid");
    setMaxListeners = notImplemented(
      "process.setMaxListeners"
    );
    setSourceMapsEnabled = notImplemented("process.setSourceMapsEnabled");
    stdout = proxy_default.__createMock__("process.stdout");
    stderr = proxy_default.__createMock__("process.stderr");
    stdin = proxy_default.__createMock__("process.stdin");
    traceDeprecation = false;
    uptime = /* @__PURE__ */ __name(() => 0, "uptime");
    exitCode = 0;
    setUncaughtExceptionCaptureCallback = notImplemented("process.setUncaughtExceptionCaptureCallback");
    hasUncaughtExceptionCaptureCallback = /* @__PURE__ */ __name(() => false, "hasUncaughtExceptionCaptureCallback");
    sourceMapsEnabled = false;
    loadEnvFile = notImplemented(
      "process.loadEnvFile"
    );
    mainModule = void 0;
    permission = {
      has: () => false
    };
    channel = {
      ref() {
      },
      unref() {
      }
    };
    throwDeprecation = false;
    assert3 = notImplemented("process.assert");
    openStdin = notImplemented("process.openStdin");
    _debugEnd = notImplemented("process._debugEnd");
    _debugProcess = notImplemented("process._debugProcess");
    _fatalException = notImplemented("process._fatalException");
    _getActiveHandles = notImplemented("process._getActiveHandles");
    _getActiveRequests = notImplemented("process._getActiveRequests");
    _kill = notImplemented("process._kill");
    _preload_modules = [];
    _rawDebug = notImplemented("process._rawDebug");
    _startProfilerIdleNotifier = notImplemented(
      "process._startProfilerIdleNotifier"
    );
    _stopProfilerIdleNotifier = notImplemented(
      "process.__stopProfilerIdleNotifier"
    );
    _tickCallback = notImplemented("process._tickCallback");
    _linkedBinding = notImplemented("process._linkedBinding");
    domain = proxy_default.__createMock__("process.domain");
    initgroups = notImplemented("process.initgroups");
    moduleLoadList = [];
    reallyExit = noop;
    _exiting = false;
    _events = [];
    _eventsCount = 0;
    _maxListeners = 0;
    process2 = {
      // @ts-expect-error
      _events,
      _eventsCount,
      _exiting,
      _maxListeners,
      _debugEnd,
      _debugProcess,
      _fatalException,
      _getActiveHandles,
      _getActiveRequests,
      _kill,
      _preload_modules,
      _rawDebug,
      _startProfilerIdleNotifier,
      _stopProfilerIdleNotifier,
      _tickCallback,
      domain,
      initgroups,
      moduleLoadList,
      reallyExit,
      exitCode,
      abort,
      addListener,
      allowedNodeEnvironmentFlags,
      hasUncaughtExceptionCaptureCallback,
      setUncaughtExceptionCaptureCallback,
      loadEnvFile,
      sourceMapsEnabled,
      throwDeprecation,
      mainModule,
      permission,
      channel,
      arch,
      argv,
      argv0,
      assert: assert3,
      binding,
      chdir,
      config,
      connected,
      constrainedMemory,
      availableMemory,
      cpuUsage,
      cwd,
      debugPort,
      dlopen,
      disconnect,
      emit,
      emitWarning,
      env,
      eventNames,
      execArgv,
      execPath,
      exit,
      features,
      getBuiltinModule,
      getegid,
      geteuid,
      getgid,
      getgroups,
      getuid,
      getActiveResourcesInfo,
      getMaxListeners,
      hrtime,
      kill,
      listeners,
      listenerCount,
      memoryUsage,
      nextTick,
      on,
      off,
      once,
      openStdin,
      pid,
      platform,
      ppid,
      prependListener,
      prependOnceListener,
      rawListeners,
      release,
      removeAllListeners,
      removeListener,
      report,
      resourceUsage,
      setegid,
      seteuid,
      setgid,
      setgroups,
      setuid,
      setMaxListeners,
      setSourceMapsEnabled,
      stderr,
      stdin,
      stdout,
      title,
      traceDeprecation,
      umask,
      uptime,
      version,
      versions
    };
  }
});

// node_modules/unenv/runtime/node/process/$cloudflare.mjs
var unpatchedGlobalThisProcess, getBuiltinModule2, workerdProcess, env2, exit2, nextTick2, platform2, _process, cloudflare_default2;
var init_cloudflare3 = __esm({
  "node_modules/unenv/runtime/node/process/$cloudflare.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_process();
    init_virtual_unenv_global_polyfill_performance();
    init_virtual_unenv_global_polyfill_console();
    init_virtual_unenv_global_polyfill_set_immediate();
    init_virtual_unenv_global_polyfill_clear_immediate();
    init_process();
    unpatchedGlobalThisProcess = globalThis["process"];
    getBuiltinModule2 = unpatchedGlobalThisProcess.getBuiltinModule;
    workerdProcess = getBuiltinModule2("node:process");
    ({ env: env2, exit: exit2, nextTick: nextTick2, platform: platform2 } = workerdProcess);
    _process = {
      /**
       * manually unroll unenv-polyfilled-symbols to make it tree-shakeable
       */
      // @ts-expect-error (not typed)
      _debugEnd,
      _debugProcess,
      _events,
      _eventsCount,
      _exiting,
      _fatalException,
      _getActiveHandles,
      _getActiveRequests,
      _kill,
      _linkedBinding,
      _maxListeners,
      _preload_modules,
      _rawDebug,
      _startProfilerIdleNotifier,
      _stopProfilerIdleNotifier,
      _tickCallback,
      abort,
      addListener,
      allowedNodeEnvironmentFlags,
      arch,
      argv,
      argv0,
      assert: assert3,
      availableMemory,
      binding,
      chdir,
      config,
      constrainedMemory,
      cpuUsage,
      cwd,
      debugPort,
      dlopen,
      domain,
      emit,
      emitWarning,
      eventNames,
      execArgv,
      execPath,
      exit: exit2,
      exitCode,
      features,
      getActiveResourcesInfo,
      getMaxListeners,
      getegid,
      geteuid,
      getgid,
      getgroups,
      getuid,
      hasUncaughtExceptionCaptureCallback,
      hrtime,
      initgroups,
      kill,
      listenerCount,
      listeners,
      loadEnvFile,
      memoryUsage,
      moduleLoadList,
      off,
      on,
      once,
      openStdin,
      pid,
      platform: platform2,
      ppid,
      prependListener,
      prependOnceListener,
      rawListeners,
      reallyExit,
      release,
      removeAllListeners,
      removeListener,
      report,
      resourceUsage,
      setMaxListeners,
      setSourceMapsEnabled,
      setUncaughtExceptionCaptureCallback,
      setegid,
      seteuid,
      setgid,
      setgroups,
      setuid,
      sourceMapsEnabled,
      stderr,
      stdin,
      stdout,
      title,
      umask,
      uptime,
      version,
      versions,
      /**
       * manually unroll workerd-polyfilled-symbols to make it tree-shakeable
       */
      env: env2,
      getBuiltinModule: getBuiltinModule2,
      nextTick: nextTick2
    };
    cloudflare_default2 = _process;
  }
});

// node_modules/wrangler/_virtual_unenv_global_polyfill-process.js
var init_virtual_unenv_global_polyfill_process = __esm({
  "node_modules/wrangler/_virtual_unenv_global_polyfill-process.js"() {
    init_cloudflare3();
    globalThis.process = cloudflare_default2;
  }
});

// wrangler-modules-watch:wrangler:modules-watch
var init_wrangler_modules_watch = __esm({
  "wrangler-modules-watch:wrangler:modules-watch"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_process();
    init_virtual_unenv_global_polyfill_performance();
    init_virtual_unenv_global_polyfill_console();
    init_virtual_unenv_global_polyfill_set_immediate();
    init_virtual_unenv_global_polyfill_clear_immediate();
  }
});

// node_modules/wrangler/templates/modules-watch-stub.js
var init_modules_watch_stub = __esm({
  "node_modules/wrangler/templates/modules-watch-stub.js"() {
    init_wrangler_modules_watch();
  }
});

// node_modules/unenv/runtime/node/async_hooks/internal/async-local-storage.mjs
var _AsyncLocalStorage, AsyncLocalStorage;
var init_async_local_storage = __esm({
  "node_modules/unenv/runtime/node/async_hooks/internal/async-local-storage.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_process();
    init_virtual_unenv_global_polyfill_performance();
    init_virtual_unenv_global_polyfill_console();
    init_virtual_unenv_global_polyfill_set_immediate();
    init_virtual_unenv_global_polyfill_clear_immediate();
    _AsyncLocalStorage = class {
      __unenv__ = true;
      _currentStore;
      _enterStore;
      _enabled = true;
      getStore() {
        return this._currentStore ?? this._enterStore;
      }
      disable() {
        this._enabled = false;
      }
      enable() {
        this._enabled = true;
      }
      enterWith(store) {
        this._enterStore = store;
      }
      run(store, callback, ...args) {
        this._currentStore = store;
        const res = callback(...args);
        this._currentStore = void 0;
        return res;
      }
      exit(callback, ...args) {
        const _previousStore = this._currentStore;
        this._currentStore = void 0;
        const res = callback(...args);
        this._currentStore = _previousStore;
        return res;
      }
      static snapshot() {
        throw new Error("[unenv] `AsyncLocalStorage.snapshot` is not implemented!");
      }
    };
    __name(_AsyncLocalStorage, "_AsyncLocalStorage");
    AsyncLocalStorage = globalThis.AsyncLocalStorage || _AsyncLocalStorage;
  }
});

// node_modules/unenv/runtime/node/async_hooks/internal/async-hook.mjs
var async_hook_exports = {};
__export(async_hook_exports, {
  AsyncHook: () => AsyncHook,
  asyncWrapProviders: () => asyncWrapProviders,
  createHook: () => createHook,
  executionAsyncId: () => executionAsyncId,
  executionAsyncResource: () => executionAsyncResource,
  triggerAsyncId: () => triggerAsyncId
});
var _AsyncHook, AsyncHook, createHook, executionAsyncId, executionAsyncResource, triggerAsyncId, asyncWrapProviders;
var init_async_hook = __esm({
  "node_modules/unenv/runtime/node/async_hooks/internal/async-hook.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_process();
    init_virtual_unenv_global_polyfill_performance();
    init_virtual_unenv_global_polyfill_console();
    init_virtual_unenv_global_polyfill_set_immediate();
    init_virtual_unenv_global_polyfill_clear_immediate();
    _AsyncHook = class {
      __unenv__ = true;
      _enabled = false;
      _callbacks = {};
      constructor(callbacks = {}) {
        this._callbacks = callbacks;
      }
      enable() {
        this._enabled = true;
        return this;
      }
      disable() {
        this._enabled = false;
        return this;
      }
      init(asyncId, type, triggerAsyncId2, resource) {
        if (this._enabled && this._callbacks.init) {
          this._callbacks.init(asyncId, type, triggerAsyncId2, resource);
        }
      }
      before(asyncId) {
        if (this._enabled && this._callbacks.before) {
          this._callbacks.before(asyncId);
        }
      }
      after(asyncId) {
        if (this._enabled && this._callbacks.after) {
          this._callbacks.after(asyncId);
        }
      }
      destroy(asyncId) {
        if (this._enabled && this._callbacks.destroy) {
          this._callbacks.destroy(asyncId);
        }
      }
      promiseResolve(asyncId) {
        if (this._enabled && this._callbacks.promiseResolve) {
          this._callbacks.promiseResolve(asyncId);
        }
      }
    };
    __name(_AsyncHook, "_AsyncHook");
    AsyncHook = globalThis.AsyncHook || _AsyncHook;
    createHook = /* @__PURE__ */ __name(function createHook2(callbacks) {
      const asyncHook = new _AsyncHook(callbacks);
      return asyncHook;
    }, "createHook2");
    executionAsyncId = /* @__PURE__ */ __name(function executionAsyncId2() {
      return 0;
    }, "executionAsyncId2");
    executionAsyncResource = /* @__PURE__ */ __name(function() {
      return /* @__PURE__ */ Object.create(null);
    }, "executionAsyncResource");
    triggerAsyncId = /* @__PURE__ */ __name(function() {
      return 0;
    }, "triggerAsyncId");
    asyncWrapProviders = Object.assign(/* @__PURE__ */ Object.create(null), {
      NONE: 0,
      DIRHANDLE: 1,
      DNSCHANNEL: 2,
      ELDHISTOGRAM: 3,
      FILEHANDLE: 4,
      FILEHANDLECLOSEREQ: 5,
      BLOBREADER: 6,
      FSEVENTWRAP: 7,
      FSREQCALLBACK: 8,
      FSREQPROMISE: 9,
      GETADDRINFOREQWRAP: 10,
      GETNAMEINFOREQWRAP: 11,
      HEAPSNAPSHOT: 12,
      HTTP2SESSION: 13,
      HTTP2STREAM: 14,
      HTTP2PING: 15,
      HTTP2SETTINGS: 16,
      HTTPINCOMINGMESSAGE: 17,
      HTTPCLIENTREQUEST: 18,
      JSSTREAM: 19,
      JSUDPWRAP: 20,
      MESSAGEPORT: 21,
      PIPECONNECTWRAP: 22,
      PIPESERVERWRAP: 23,
      PIPEWRAP: 24,
      PROCESSWRAP: 25,
      PROMISE: 26,
      QUERYWRAP: 27,
      QUIC_ENDPOINT: 28,
      QUIC_LOGSTREAM: 29,
      QUIC_PACKET: 30,
      QUIC_SESSION: 31,
      QUIC_STREAM: 32,
      QUIC_UDP: 33,
      SHUTDOWNWRAP: 34,
      SIGNALWRAP: 35,
      STATWATCHER: 36,
      STREAMPIPE: 37,
      TCPCONNECTWRAP: 38,
      TCPSERVERWRAP: 39,
      TCPWRAP: 40,
      TTYWRAP: 41,
      UDPSENDWRAP: 42,
      UDPWRAP: 43,
      SIGINTWATCHDOG: 44,
      WORKER: 45,
      WORKERHEAPSNAPSHOT: 46,
      WRITEWRAP: 47,
      ZLIB: 48,
      CHECKPRIMEREQUEST: 49,
      PBKDF2REQUEST: 50,
      KEYPAIRGENREQUEST: 51,
      KEYGENREQUEST: 52,
      KEYEXPORTREQUEST: 53,
      CIPHERREQUEST: 54,
      DERIVEBITSREQUEST: 55,
      HASHREQUEST: 56,
      RANDOMBYTESREQUEST: 57,
      RANDOMPRIMEREQUEST: 58,
      SCRYPTREQUEST: 59,
      SIGNREQUEST: 60,
      TLSWRAP: 61,
      VERIFYREQUEST: 62
    });
  }
});

// node_modules/unenv/runtime/node/async_hooks/internal/async-resource.mjs
var _asyncIdCounter, _AsyncResource, AsyncResource;
var init_async_resource = __esm({
  "node_modules/unenv/runtime/node/async_hooks/internal/async-resource.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_process();
    init_virtual_unenv_global_polyfill_performance();
    init_virtual_unenv_global_polyfill_console();
    init_virtual_unenv_global_polyfill_set_immediate();
    init_virtual_unenv_global_polyfill_clear_immediate();
    init_async_hook();
    _asyncIdCounter = 100;
    _AsyncResource = class {
      __unenv__ = true;
      type;
      _asyncId;
      _triggerAsyncId;
      constructor(type, triggerAsyncId2 = executionAsyncId()) {
        this.type = type;
        this._asyncId = -1 * _asyncIdCounter++;
        this._triggerAsyncId = typeof triggerAsyncId2 === "number" ? triggerAsyncId2 : triggerAsyncId2?.triggerAsyncId;
      }
      static bind(fn2, type, thisArg) {
        const resource = new AsyncResource(type ?? "anonymous");
        return resource.bind(fn2);
      }
      bind(fn2, thisArg) {
        const binded = /* @__PURE__ */ __name((...args) => this.runInAsyncScope(fn2, thisArg, ...args), "binded");
        binded.asyncResource = this;
        return binded;
      }
      runInAsyncScope(fn2, thisArg, ...args) {
        const result = fn2.apply(thisArg, args);
        return result;
      }
      emitDestroy() {
        return this;
      }
      asyncId() {
        return this._asyncId;
      }
      triggerAsyncId() {
        return this._triggerAsyncId;
      }
    };
    __name(_AsyncResource, "_AsyncResource");
    AsyncResource = globalThis.AsyncResource || _AsyncResource;
  }
});

// node_modules/unenv/runtime/node/async_hooks/index.mjs
var async_hooks_default;
var init_async_hooks = __esm({
  "node_modules/unenv/runtime/node/async_hooks/index.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_process();
    init_virtual_unenv_global_polyfill_performance();
    init_virtual_unenv_global_polyfill_console();
    init_virtual_unenv_global_polyfill_set_immediate();
    init_virtual_unenv_global_polyfill_clear_immediate();
    init_async_local_storage();
    init_async_resource();
    init_async_hook();
    init_async_hook();
    async_hooks_default = {
      AsyncLocalStorage,
      AsyncResource,
      ...async_hook_exports
    };
  }
});

// node_modules/unenv/runtime/node/async_hooks/$cloudflare.mjs
var cloudflare_exports = {};
__export(cloudflare_exports, {
  AsyncLocalStorage: () => AsyncLocalStorage2,
  AsyncResource: () => AsyncResource2,
  asyncWrapProviders: () => asyncWrapProviders,
  createHook: () => createHook,
  default: () => cloudflare_default3,
  executionAsyncId: () => executionAsyncId,
  executionAsyncResource: () => executionAsyncResource,
  triggerAsyncId: () => triggerAsyncId
});
var workerdAsyncHooks, AsyncLocalStorage2, AsyncResource2, cloudflare_default3;
var init_cloudflare4 = __esm({
  "node_modules/unenv/runtime/node/async_hooks/$cloudflare.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_process();
    init_virtual_unenv_global_polyfill_performance();
    init_virtual_unenv_global_polyfill_console();
    init_virtual_unenv_global_polyfill_set_immediate();
    init_virtual_unenv_global_polyfill_clear_immediate();
    init_async_hooks();
    init_async_hooks();
    workerdAsyncHooks = process.getBuiltinModule("node:async_hooks");
    ({ AsyncLocalStorage: AsyncLocalStorage2, AsyncResource: AsyncResource2 } = workerdAsyncHooks);
    cloudflare_default3 = {
      /**
       * manually unroll unenv-polyfilled-symbols to make it tree-shakeable
       */
      // @ts-expect-error @types/node is missing this one - this is a bug in typings
      asyncWrapProviders,
      createHook,
      executionAsyncId,
      executionAsyncResource,
      triggerAsyncId,
      /**
       * manually unroll workerd-polyfilled-symbols to make it tree-shakeable
       */
      AsyncLocalStorage: AsyncLocalStorage2,
      AsyncResource: AsyncResource2
    };
  }
});

// .wrangler/tmp/bundle-I019UQ/middleware-loader.entry.ts
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_process();
init_virtual_unenv_global_polyfill_performance();
init_virtual_unenv_global_polyfill_console();
init_virtual_unenv_global_polyfill_set_immediate();
init_virtual_unenv_global_polyfill_clear_immediate();

// .wrangler/tmp/bundle-I019UQ/middleware-insertion-facade.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_process();
init_virtual_unenv_global_polyfill_performance();
init_virtual_unenv_global_polyfill_console();
init_virtual_unenv_global_polyfill_set_immediate();
init_virtual_unenv_global_polyfill_clear_immediate();

// .wrangler/tmp/pages-xbBt83/yqb4lqiwmq.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_process();
init_virtual_unenv_global_polyfill_performance();
init_virtual_unenv_global_polyfill_console();
init_virtual_unenv_global_polyfill_set_immediate();
init_virtual_unenv_global_polyfill_clear_immediate();

// .wrangler/tmp/pages-xbBt83/bundledWorker-0.970757260852753.mjs
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_process();
init_virtual_unenv_global_polyfill_performance();
init_virtual_unenv_global_polyfill_console();
init_virtual_unenv_global_polyfill_set_immediate();
init_virtual_unenv_global_polyfill_clear_immediate();
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
import("node:buffer").then(({ Buffer: Buffer2 }) => {
  globalThis.Buffer = Buffer2;
}).catch(() => null);
var __ALSes_PROMISE__ = Promise.resolve().then(() => (init_cloudflare4(), cloudflare_exports)).then(({ AsyncLocalStorage: AsyncLocalStorage3 }) => {
  globalThis.AsyncLocalStorage = AsyncLocalStorage3;
  const envAsyncLocalStorage = new AsyncLocalStorage3();
  const requestContextAsyncLocalStorage = new AsyncLocalStorage3();
  globalThis.process = {
    env: new Proxy(
      {},
      {
        ownKeys: () => Reflect.ownKeys(envAsyncLocalStorage.getStore()),
        getOwnPropertyDescriptor: (_2, ...args) => Reflect.getOwnPropertyDescriptor(envAsyncLocalStorage.getStore(), ...args),
        get: (_2, property) => Reflect.get(envAsyncLocalStorage.getStore(), property),
        set: (_2, property, value) => Reflect.set(envAsyncLocalStorage.getStore(), property, value)
      }
    )
  };
  globalThis[Symbol.for("__cloudflare-request-context__")] = new Proxy(
    {},
    {
      ownKeys: () => Reflect.ownKeys(requestContextAsyncLocalStorage.getStore()),
      getOwnPropertyDescriptor: (_2, ...args) => Reflect.getOwnPropertyDescriptor(requestContextAsyncLocalStorage.getStore(), ...args),
      get: (_2, property) => Reflect.get(requestContextAsyncLocalStorage.getStore(), property),
      set: (_2, property, value) => Reflect.set(requestContextAsyncLocalStorage.getStore(), property, value)
    }
  );
  return { envAsyncLocalStorage, requestContextAsyncLocalStorage };
}).catch(() => null);
var se = Object.create;
var O = Object.defineProperty;
var ae = Object.getOwnPropertyDescriptor;
var ne = Object.getOwnPropertyNames;
var ie = Object.getPrototypeOf;
var re = Object.prototype.hasOwnProperty;
var M = /* @__PURE__ */ __name2((e, t) => () => (e && (t = e(e = 0)), t), "M");
var V = /* @__PURE__ */ __name2((e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), "V");
var ce = /* @__PURE__ */ __name2((e, t, a, s) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let i of ne(t))
      !re.call(e, i) && i !== a && O(e, i, { get: () => t[i], enumerable: !(s = ae(t, i)) || s.enumerable });
  return e;
}, "ce");
var N = /* @__PURE__ */ __name2((e, t, a) => (a = e != null ? se(ie(e)) : {}, ce(t || !e || !e.__esModule ? O(a, "default", { value: e, enumerable: true }) : a, e)), "N");
var g;
var u = M(() => {
  g = { collectedLocales: [] };
});
var f;
var l = M(() => {
  f = { version: 3, routes: { none: [{ src: "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$", headers: { Location: "/$1" }, status: 308, continue: true }, { src: "^/_next/__private/trace$", dest: "/404", status: 404, continue: true }, { src: "^(?:/(.*))(?:/)?$", headers: { "X-Frame-Options": "SAMEORIGIN", "X-Content-Type-Options": "nosniff" }, continue: true }, { src: "^/404/?$", status: 404, continue: true, missing: [{ type: "header", key: "x-prerender-revalidate" }] }, { src: "^/500$", status: 500, continue: true }, { src: "^/_next/data/VR71AeU_Q3GXcr8QTHEd\\-/(.*).json$", dest: "/$1", override: true, continue: true, has: [{ type: "header", key: "x-nextjs-data" }] }, { src: "^/index(?:/)?$", has: [{ type: "header", key: "x-nextjs-data" }], dest: "/", override: true, continue: true }, { continue: true, src: "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!api|_next|_next\\/static|sw.js|_next\\/image|favicon.ico|sitemap.xml|robots.txt|assets).*))(.json)?[\\/#\\?]?$", missing: [{ type: "header", key: "x-prerender-revalidate", value: "79970bbb489fc6774be2ede0cf894fab" }], middlewarePath: "src/middleware", middlewareRawSrc: ["/((?!api|_next|_next/static|sw.js|_next/image|favicon.ico|sitemap.xml|robots.txt|assets).*)"], override: true }, { src: "^/$", has: [{ type: "header", key: "x-nextjs-data" }], dest: "/_next/data/VR71AeU_Q3GXcr8QTHEd-/index.json", continue: true, override: true }, { src: "^/((?!_next/)(?:.*[^/]|.*))/?$", has: [{ type: "header", key: "x-nextjs-data" }], dest: "/_next/data/VR71AeU_Q3GXcr8QTHEd-/$1.json", continue: true, override: true }, { src: "^/?$", has: [{ type: "header", key: "rsc" }], dest: "/index.rsc", headers: { vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }, continue: true, override: true }, { src: "^/((?!.+\\.rsc).+?)(?:/)?$", has: [{ type: "header", key: "rsc" }], dest: "/$1.rsc", headers: { vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }, continue: true, override: true }], filesystem: [{ src: "^/_next/data/VR71AeU_Q3GXcr8QTHEd\\-/(.*).json$", dest: "/$1", continue: true, has: [{ type: "header", key: "x-nextjs-data" }] }, { src: "^/index(?:/)?$", has: [{ type: "header", key: "x-nextjs-data" }], dest: "/", continue: true }, { src: "^/index(\\.action|\\.rsc)$", dest: "/", continue: true }, { src: "^/\\.prefetch\\.rsc$", dest: "/__index.prefetch.rsc", check: true }, { src: "^/(.+)/\\.prefetch\\.rsc$", dest: "/$1.prefetch.rsc", check: true }, { src: "^/\\.rsc$", dest: "/index.rsc", check: true }, { src: "^/(.+)/\\.rsc$", dest: "/$1.rsc", check: true }], miss: [{ src: "^/_next/static/(?:[^/]+/pages|pages|chunks|runtime|css|image|media)/.+$", status: 404, check: true, dest: "$0" }], rewrite: [{ src: "^/$", has: [{ type: "header", key: "x-nextjs-data" }], dest: "/_next/data/VR71AeU_Q3GXcr8QTHEd-/index.json", continue: true }, { src: "^/((?!_next/)(?:.*[^/]|.*))/?$", has: [{ type: "header", key: "x-nextjs-data" }], dest: "/_next/data/VR71AeU_Q3GXcr8QTHEd-/$1.json", continue: true }, { src: "^/_next/data/VR71AeU_Q3GXcr8QTHEd\\-/(?<nxtPlocale>[^/]+?)/access\\-services(?:/)?.json$", dest: "/[locale]/access-services?nxtPlocale=$nxtPlocale" }, { src: "^/_next/data/VR71AeU_Q3GXcr8QTHEd\\-/(?<nxtPlocale>[^/]+?)/community\\-conversations(?:/)?.json$", dest: "/[locale]/community-conversations?nxtPlocale=$nxtPlocale" }, { src: "^/_next/data/VR71AeU_Q3GXcr8QTHEd\\-/(?<nxtPlocale>[^/]+?)/content\\-curation/(?<nxtPslug>[^/]+?)(?:/)?.json$", dest: "/[locale]/content-curation/[slug]?nxtPlocale=$nxtPlocale&nxtPslug=$nxtPslug" }, { src: "^/_next/data/VR71AeU_Q3GXcr8QTHEd\\-/(?<nxtPlocale>[^/]+?)/home(?:/)?.json$", dest: "/[locale]/home?nxtPlocale=$nxtPlocale" }, { src: "^/_next/data/VR71AeU_Q3GXcr8QTHEd\\-/(?<nxtPlocale>[^/]+?)/moderator\\-user\\-dashboard(?:/)?.json$", dest: "/[locale]/moderator-user-dashboard?nxtPlocale=$nxtPlocale" }, { src: "^/_next/data/VR71AeU_Q3GXcr8QTHEd\\-/(?<nxtPlocale>[^/]+?)/resources(?:/)?.json$", dest: "/[locale]/resources?nxtPlocale=$nxtPlocale" }, { src: "^/_next/data/VR71AeU_Q3GXcr8QTHEd\\-/(?<nxtPlocale>[^/]+?)/search\\-form(?:/)?.json$", dest: "/[locale]/search-form?nxtPlocale=$nxtPlocale" }, { src: "^/_next/data/VR71AeU_Q3GXcr8QTHEd\\-/(?<nxtPlocale>[^/]+?)/user\\-dashboard(?:/)?.json$", dest: "/[locale]/user-dashboard?nxtPlocale=$nxtPlocale" }, { src: "^/_next/data/VR71AeU_Q3GXcr8QTHEd\\-/(?<nxtPlocale>[^/]+?)/user\\-login(?:/)?.json$", dest: "/[locale]/user-login?nxtPlocale=$nxtPlocale" }, { src: "^/_next/data/VR71AeU_Q3GXcr8QTHEd\\-/(?<nxtPlocale>[^/]+?)/(?<nxtPslug>[^/]+?)(?:/)?.json$", dest: "/[locale]/[slug]?nxtPlocale=$nxtPlocale&nxtPslug=$nxtPslug" }, { src: "^/_next/data/VR71AeU_Q3GXcr8QTHEd\\-/(?<nxtPlocale>[^/]+?)/(?<nxtPslug>[^/]+?)/(?<nxtPsubcategory>.+?)(?:/)?.json$", dest: "/[locale]/[slug]/[...subcategory]?nxtPlocale=$nxtPlocale&nxtPslug=$nxtPslug&nxtPsubcategory=$nxtPsubcategory" }, { src: "^/(?<nxtPlocale>[^/]+?)/access\\-services(?:\\.rsc)(?:/)?$", dest: "/[locale]/access-services.rsc?nxtPlocale=$nxtPlocale" }, { src: "^/(?<nxtPlocale>[^/]+?)/access\\-services(?:/)?$", dest: "/[locale]/access-services?nxtPlocale=$nxtPlocale" }, { src: "^/(?<nxtPlocale>[^/]+?)/community\\-conversations(?:\\.rsc)(?:/)?$", dest: "/[locale]/community-conversations.rsc?nxtPlocale=$nxtPlocale" }, { src: "^/(?<nxtPlocale>[^/]+?)/community\\-conversations(?:/)?$", dest: "/[locale]/community-conversations?nxtPlocale=$nxtPlocale" }, { src: "^/(?<nxtPlocale>[^/]+?)/content\\-curation/(?<nxtPslug>[^/]+?)(?:\\.rsc)(?:/)?$", dest: "/[locale]/content-curation/[slug].rsc?nxtPlocale=$nxtPlocale&nxtPslug=$nxtPslug" }, { src: "^/(?<nxtPlocale>[^/]+?)/content\\-curation/(?<nxtPslug>[^/]+?)(?:/)?$", dest: "/[locale]/content-curation/[slug]?nxtPlocale=$nxtPlocale&nxtPslug=$nxtPslug" }, { src: "^/(?<nxtPlocale>[^/]+?)/home(?:\\.rsc)(?:/)?$", dest: "/[locale]/home.rsc?nxtPlocale=$nxtPlocale" }, { src: "^/(?<nxtPlocale>[^/]+?)/home(?:/)?$", dest: "/[locale]/home?nxtPlocale=$nxtPlocale" }, { src: "^/(?<nxtPlocale>[^/]+?)/moderator\\-user\\-dashboard(?:\\.rsc)(?:/)?$", dest: "/[locale]/moderator-user-dashboard.rsc?nxtPlocale=$nxtPlocale" }, { src: "^/(?<nxtPlocale>[^/]+?)/moderator\\-user\\-dashboard(?:/)?$", dest: "/[locale]/moderator-user-dashboard?nxtPlocale=$nxtPlocale" }, { src: "^/(?<nxtPlocale>[^/]+?)/resources(?:\\.rsc)(?:/)?$", dest: "/[locale]/resources.rsc?nxtPlocale=$nxtPlocale" }, { src: "^/(?<nxtPlocale>[^/]+?)/resources(?:/)?$", dest: "/[locale]/resources?nxtPlocale=$nxtPlocale" }, { src: "^/(?<nxtPlocale>[^/]+?)/search\\-form(?:\\.rsc)(?:/)?$", dest: "/[locale]/search-form.rsc?nxtPlocale=$nxtPlocale" }, { src: "^/(?<nxtPlocale>[^/]+?)/search\\-form(?:/)?$", dest: "/[locale]/search-form?nxtPlocale=$nxtPlocale" }, { src: "^/(?<nxtPlocale>[^/]+?)/user\\-dashboard(?:\\.rsc)(?:/)?$", dest: "/[locale]/user-dashboard.rsc?nxtPlocale=$nxtPlocale" }, { src: "^/(?<nxtPlocale>[^/]+?)/user\\-dashboard(?:/)?$", dest: "/[locale]/user-dashboard?nxtPlocale=$nxtPlocale" }, { src: "^/(?<nxtPlocale>[^/]+?)/user\\-login(?:\\.rsc)(?:/)?$", dest: "/[locale]/user-login.rsc?nxtPlocale=$nxtPlocale" }, { src: "^/(?<nxtPlocale>[^/]+?)/user\\-login(?:/)?$", dest: "/[locale]/user-login?nxtPlocale=$nxtPlocale" }, { src: "^/(?<nxtPlocale>[^/]+?)/(?<nxtPslug>[^/]+?)(?:\\.rsc)(?:/)?$", dest: "/[locale]/[slug].rsc?nxtPlocale=$nxtPlocale&nxtPslug=$nxtPslug" }, { src: "^/(?<nxtPlocale>[^/]+?)/(?<nxtPslug>[^/]+?)(?:/)?$", dest: "/[locale]/[slug]?nxtPlocale=$nxtPlocale&nxtPslug=$nxtPslug" }, { src: "^/(?<nxtPlocale>[^/]+?)/(?<nxtPslug>[^/]+?)/(?<nxtPsubcategory>.+?)(?:\\.rsc)(?:/)?$", dest: "/[locale]/[slug]/[...subcategory].rsc?nxtPlocale=$nxtPlocale&nxtPslug=$nxtPslug&nxtPsubcategory=$nxtPsubcategory" }, { src: "^/(?<nxtPlocale>[^/]+?)/(?<nxtPslug>[^/]+?)/(?<nxtPsubcategory>.+?)(?:/)?$", dest: "/[locale]/[slug]/[...subcategory]?nxtPlocale=$nxtPlocale&nxtPslug=$nxtPslug&nxtPsubcategory=$nxtPsubcategory" }, { src: "^/_next/data/VR71AeU_Q3GXcr8QTHEd\\-/(.*).json$", headers: { "x-nextjs-matched-path": "/$1" }, continue: true, override: true }, { src: "^/_next/data/VR71AeU_Q3GXcr8QTHEd\\-/(.*).json$", dest: "__next_data_catchall" }], resource: [{ src: "^/.*$", status: 404 }], hit: [{ src: "^/_next/static/(?:[^/]+/pages|pages|chunks|runtime|css|image|media|VR71AeU_Q3GXcr8QTHEd\\-)/.+$", headers: { "cache-control": "public,max-age=31536000,immutable" }, continue: true, important: true }, { src: "^/index(?:/)?$", headers: { "x-matched-path": "/" }, continue: true, important: true }, { src: "^/((?!index$).*?)(?:/)?$", headers: { "x-matched-path": "/$1" }, continue: true, important: true }], error: [{ src: "^/.*$", dest: "/404", status: 404 }, { src: "^/.*$", dest: "/500", status: 500 }] }, images: { domains: [], sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840, 16, 32, 48, 64, 96, 128, 256, 384], remotePatterns: [{ hostname: "^(?:^(?:edit\\-dev\\.laaha\\.org)$)$", pathname: "^(?:(?!(?:^|\\/)\\.{1,2}(?:\\/|$))(?:(?:(?!(?:^|\\/)\\.{1,2}(?:\\/|$)).)*?)\\/?)$" }, { hostname: "^(?:^(?:test\\.laaha\\.org)$)$", pathname: "^(?:(?!(?:^|\\/)\\.{1,2}(?:\\/|$))(?:(?:(?!(?:^|\\/)\\.{1,2}(?:\\/|$)).)*?)\\/?)$" }, { hostname: "^(?:^(?:laaha\\.org)$)$", pathname: "^(?:(?!(?:^|\\/)\\.{1,2}(?:\\/|$))(?:(?:(?!(?:^|\\/)\\.{1,2}(?:\\/|$)).)*?)\\/?)$" }, { hostname: "^(?:^(?:edit\\-dev\\.laaha\\.org)$)$", pathname: "^(?:(?!(?:^|\\/)\\.{1,2}(?:\\/|$))(?:(?:(?!(?:^|\\/)\\.{1,2}(?:\\/|$)).)*?)\\/?)$" }], localPatterns: [{ pathname: "^(?:\\/assets\\/images(?:\\/(?!\\.{1,2}(?:\\/|$))(?:(?:(?!(?:^|\\/)\\.{1,2}(?:\\/|$)).)*?)|$))$", search: "" }, { pathname: "^(?:\\/_next\\/static\\/media(?:\\/(?!\\.{1,2}(?:\\/|$))(?:(?:(?!(?:^|\\/)\\.{1,2}(?:\\/|$)).)*?)|$))$", search: "" }], minimumCacheTTL: 60, formats: ["image/webp"], dangerouslyAllowSVG: false, contentSecurityPolicy: "script-src 'none'; frame-src 'none'; sandbox;", contentDispositionType: "inline" }, overrides: { "404.html": { path: "404", contentType: "text/html; charset=utf-8" }, "500.html": { path: "500", contentType: "text/html; charset=utf-8" }, "_app.rsc.json": { path: "_app.rsc", contentType: "application/json" }, "_error.rsc.json": { path: "_error.rsc", contentType: "application/json" }, "_document.rsc.json": { path: "_document.rsc", contentType: "application/json" }, "404.rsc.json": { path: "404.rsc", contentType: "application/json" }, "__next_data_catchall.json": { path: "__next_data_catchall", contentType: "application/json" } }, framework: { version: "14.2.18" }, crons: [] };
});
var y;
var p = M(() => {
  y = { "/404.html": { type: "override", path: "/404.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/404.rsc.json": { type: "override", path: "/404.rsc.json", headers: { "content-type": "application/json" } }, "/500.html": { type: "override", path: "/500.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/__next_data_catchall.json": { type: "override", path: "/__next_data_catchall.json", headers: { "content-type": "application/json" } }, "/_app.rsc.json": { type: "override", path: "/_app.rsc.json", headers: { "content-type": "application/json" } }, "/_document.rsc.json": { type: "override", path: "/_document.rsc.json", headers: { "content-type": "application/json" } }, "/_error.rsc.json": { type: "override", path: "/_error.rsc.json", headers: { "content-type": "application/json" } }, "/_next/static/VR71AeU_Q3GXcr8QTHEd-/_buildManifest.js": { type: "static" }, "/_next/static/VR71AeU_Q3GXcr8QTHEd-/_ssgManifest.js": { type: "static" }, "/_next/static/chunks/1142.325073a4fcd23bd2.js": { type: "static" }, "/_next/static/chunks/16-3847a63168496163.js": { type: "static" }, "/_next/static/chunks/1782.534fdf40d0c83117.js": { type: "static" }, "/_next/static/chunks/1800-04b349861bdd821c.js": { type: "static" }, "/_next/static/chunks/1834.207d64bd511cdb36.js": { type: "static" }, "/_next/static/chunks/1846-7c8fad4f295ec916.js": { type: "static" }, "/_next/static/chunks/2192-3f20fb88aefbd592.js": { type: "static" }, "/_next/static/chunks/2621.6dd72687cba9671d.js": { type: "static" }, "/_next/static/chunks/3061-20467c8b48f4a99c.js": { type: "static" }, "/_next/static/chunks/3145-87f8239472790093.js": { type: "static" }, "/_next/static/chunks/3282.edb9e085475060dd.js": { type: "static" }, "/_next/static/chunks/3464-5d41c42cc0ca945a.js": { type: "static" }, "/_next/static/chunks/3897-229545f881d3ab74.js": { type: "static" }, "/_next/static/chunks/4504.472f375ce6684fe2.js": { type: "static" }, "/_next/static/chunks/4826-a35a87f6310efd33.js": { type: "static" }, "/_next/static/chunks/4998-7327318b1b00ea03.js": { type: "static" }, "/_next/static/chunks/5030-1d3e405a3825f202.js": { type: "static" }, "/_next/static/chunks/5234.96288f8657a52a05.js": { type: "static" }, "/_next/static/chunks/5907.24341707144f75f7.js": { type: "static" }, "/_next/static/chunks/6406.1ac06d6a3430b497.js": { type: "static" }, "/_next/static/chunks/6459-3b62cdd52918c31f.js": { type: "static" }, "/_next/static/chunks/6520.6abe71bf7b4e12b9.js": { type: "static" }, "/_next/static/chunks/6826-945421c5286cce65.js": { type: "static" }, "/_next/static/chunks/6940.f10ddcf06a1dcbee.js": { type: "static" }, "/_next/static/chunks/6979.2ecdb1a33ffd9e16.js": { type: "static" }, "/_next/static/chunks/7452.b6c6110db78c309e.js": { type: "static" }, "/_next/static/chunks/7528-3e7a0f24cb6d3322.js": { type: "static" }, "/_next/static/chunks/7648-389904db7436460a.js": { type: "static" }, "/_next/static/chunks/7696.ae2a40c157e68c5d.js": { type: "static" }, "/_next/static/chunks/7854.ddab9acaef18406f.js": { type: "static" }, "/_next/static/chunks/7925.f7785b3a486ec71d.js": { type: "static" }, "/_next/static/chunks/8458.798468603fa733bc.js": { type: "static" }, "/_next/static/chunks/9591-09a48001b6950a10.js": { type: "static" }, "/_next/static/chunks/963.9082f180a7e6c1d1.js": { type: "static" }, "/_next/static/chunks/9763-931910fa97e63305.js": { type: "static" }, "/_next/static/chunks/9937.ab6df3882ff83f67.js": { type: "static" }, "/_next/static/chunks/app/[locale]/[slug]/[...subcategory]/page-74fb39aae8ce7f95.js": { type: "static" }, "/_next/static/chunks/app/[locale]/[slug]/page-931557ba408e108e.js": { type: "static" }, "/_next/static/chunks/app/[locale]/access-services/page-bdeff54b91667398.js": { type: "static" }, "/_next/static/chunks/app/[locale]/community-conversations/page-df5779db8cd584aa.js": { type: "static" }, "/_next/static/chunks/app/[locale]/content-curation/[slug]/page-a5c0c34b9e075b5a.js": { type: "static" }, "/_next/static/chunks/app/[locale]/home/page-3958c7089d4d809b.js": { type: "static" }, "/_next/static/chunks/app/[locale]/layout-92cb6d54e9aa917b.js": { type: "static" }, "/_next/static/chunks/app/[locale]/moderator-user-dashboard/page-302f15f997af98d7.js": { type: "static" }, "/_next/static/chunks/app/[locale]/resources/page-d67d454f2c375e59.js": { type: "static" }, "/_next/static/chunks/app/[locale]/search-form/page-5a7b72db342aaf42.js": { type: "static" }, "/_next/static/chunks/app/[locale]/user-dashboard/page-d70fc09c3de29c76.js": { type: "static" }, "/_next/static/chunks/app/[locale]/user-login/page-88bcca3bc1cfeebe.js": { type: "static" }, "/_next/static/chunks/app/_not-found/page-1e12d2d31532afdd.js": { type: "static" }, "/_next/static/chunks/fd9d1056-df82285580b13343.js": { type: "static" }, "/_next/static/chunks/framework-8e0e0f4a6b83a956.js": { type: "static" }, "/_next/static/chunks/main-app-500f30d267eba5ba.js": { type: "static" }, "/_next/static/chunks/main-f3fa669ee4cf4b64.js": { type: "static" }, "/_next/static/chunks/pages/_app-3c9ca398d360b709.js": { type: "static" }, "/_next/static/chunks/pages/_error-cf5ca766ac8f493f.js": { type: "static" }, "/_next/static/chunks/polyfills-42372ed130431b0a.js": { type: "static" }, "/_next/static/chunks/reactPlayerDailyMotion.4ce428e08da56f81.js": { type: "static" }, "/_next/static/chunks/reactPlayerFacebook.6979e1333a813b2f.js": { type: "static" }, "/_next/static/chunks/reactPlayerFilePlayer.e6d2f3c959f28902.js": { type: "static" }, "/_next/static/chunks/reactPlayerKaltura.eaab6ce37fc042fc.js": { type: "static" }, "/_next/static/chunks/reactPlayerMixcloud.ef2fad3b53af30de.js": { type: "static" }, "/_next/static/chunks/reactPlayerMux.68eaedd8a8e83a03.js": { type: "static" }, "/_next/static/chunks/reactPlayerPreview.3288e310f09a775e.js": { type: "static" }, "/_next/static/chunks/reactPlayerSoundCloud.2ebfd388e85a0b77.js": { type: "static" }, "/_next/static/chunks/reactPlayerStreamable.969e004edd1ba6b0.js": { type: "static" }, "/_next/static/chunks/reactPlayerTwitch.8983e9ea06739e4b.js": { type: "static" }, "/_next/static/chunks/reactPlayerVidyard.30aeaa5727b7e224.js": { type: "static" }, "/_next/static/chunks/reactPlayerVimeo.fdfc8213d8c50230.js": { type: "static" }, "/_next/static/chunks/reactPlayerWistia.d8da9ed3d80f4ac6.js": { type: "static" }, "/_next/static/chunks/reactPlayerYouTube.04ada298e347d23f.js": { type: "static" }, "/_next/static/chunks/webpack-1514e96bd66064d8.js": { type: "static" }, "/_next/static/css/04782da6ba82c408.css": { type: "static" }, "/_next/static/css/052e10ff1e933389.css": { type: "static" }, "/_next/static/css/2503cbc0e87124de.css": { type: "static" }, "/_next/static/css/43297c68f9c2716a.css": { type: "static" }, "/_next/static/css/664cdaeb3a2cc914.css": { type: "static" }, "/_next/static/css/83551098d66f9b4a.css": { type: "static" }, "/_next/static/css/84b4e35d673573a7.css": { type: "static" }, "/_next/static/css/8c741ee167cf8609.css": { type: "static" }, "/_next/static/css/8eaaaf866a0c2e09.css": { type: "static" }, "/_next/static/css/914e9a6f9a361edc.css": { type: "static" }, "/_next/static/css/9b2e2e898bb3e179.css": { type: "static" }, "/_next/static/css/a101c9487cf28e68.css": { type: "static" }, "/_next/static/css/ac677f3becdb0fb9.css": { type: "static" }, "/_next/static/css/bab1586a31c43985.css": { type: "static" }, "/_next/static/css/e43b06b632714ec1.css": { type: "static" }, "/_next/static/css/e8160e47011347cb.css": { type: "static" }, "/_next/static/css/ea29051c99fed529.css": { type: "static" }, "/_next/static/css/ef09b0611fcf4b6d.css": { type: "static" }, "/_next/static/css/f1ca83a82b5ef1f5.css": { type: "static" }, "/_next/static/css/fcf83f576148fe00.css": { type: "static" }, "/_next/static/media/205af106bef5c7f2-s.p.woff2": { type: "static" }, "/_next/static/media/2967033ad4bbca2a-s.p.woff2": { type: "static" }, "/_next/static/media/2a6285e056ff5bbd-s.p.woff2": { type: "static" }, "/_next/static/media/34b69d3ffdfa75d3-s.woff2": { type: "static" }, "/_next/static/media/40aae5def3a9844f-s.woff2": { type: "static" }, "/_next/static/media/5819a007bcc05f89-s.woff2": { type: "static" }, "/_next/static/media/6f205a32f9825c4c-s.woff2": { type: "static" }, "/_next/static/media/986cf32806d876f3-s.woff2": { type: "static" }, "/_next/static/media/UniversLTStd-Bold.e9b2ada6.otf": { type: "static" }, "/_next/static/media/UniversLTStd.0b9255ca.otf": { type: "static" }, "/_next/static/media/a9455e641565216e-s.p.woff2": { type: "static" }, "/_next/static/media/ae7ddf6c2270b841-s.woff2": { type: "static" }, "/_next/static/media/cbef3626a680ee4f-s.woff2": { type: "static" }, "/_next/static/media/eb89e856e6bc7e7c-s.woff2": { type: "static" }, "/assets/images/background-curve.svg": { type: "static" }, "/assets/images/breadcrumb-arrow.png": { type: "static" }, "/assets/images/breadcrumb-home.png": { type: "static" }, "/assets/images/carousel.png": { type: "static" }, "/assets/images/confirmation-one.png": { type: "static" }, "/assets/images/courses-icon.png": { type: "static" }, "/assets/images/default-avatar.png": { type: "static" }, "/assets/images/dropdown-arrow.svg": { type: "static" }, "/assets/images/exit-icon.png": { type: "static" }, "/assets/images/facebook.svg": { type: "static" }, "/assets/images/featured-cat-stories.png": { type: "static" }, "/assets/images/featured-head-icon.png": { type: "static" }, "/assets/images/feedback.png": { type: "static" }, "/assets/images/guide.png": { type: "static" }, "/assets/images/header-banner-homepage.png": { type: "static" }, "/assets/images/icon-complete-large.png": { type: "static" }, "/assets/images/instagram.svg": { type: "static" }, "/assets/images/laaha-logo_footer.webp": { type: "static" }, "/assets/images/need-help-no-results.webp": { type: "static" }, "/assets/images/podcast-icon.png": { type: "static" }, "/assets/images/registration.svg": { type: "static" }, "/assets/images/review-banner.jpg": { type: "static" }, "/assets/images/subcat-bg.svg": { type: "static" }, "/assets/images/subcat-hero-mobile.svg": { type: "static" }, "/assets/images/subcategory.png": { type: "static" }, "/assets/images/thumbsdown.svg": { type: "static" }, "/assets/images/thumbsup.svg": { type: "static" }, "/assets/images/user.png": { type: "static" }, "/assets/images/video-icon.png": { type: "static" }, "/assets/images/view-icon.png": { type: "static" }, "/favicon.ico": { type: "static" }, "/locales/ar.json": { type: "static" }, "/locales/en.json": { type: "static" }, "/locales/es.json": { type: "static" }, "/locales/fr.json": { type: "static" }, "/locales/ku.json": { type: "static" }, "/locales/ln.json": { type: "static" }, "/locales/my.json": { type: "static" }, "/locales/prs.json": { type: "static" }, "/locales/ps.json": { type: "static" }, "/locales/ro.json": { type: "static" }, "/locales/ru.json": { type: "static" }, "/locales/sw.json": { type: "static" }, "/locales/tr.json": { type: "static" }, "/locales/uk.json": { type: "static" }, "/robots.txt": { type: "static" }, "/sw.js": { type: "static" }, "/[locale]/[slug]/[...subcategory]": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/[slug]/[...subcategory].func.js" }, "/[locale]/[slug]/[...subcategory].rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/[slug]/[...subcategory].func.js" }, "/[locale]/[slug]": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/[slug].func.js" }, "/[locale]/[slug].rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/[slug].func.js" }, "/[locale]/access-services": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/access-services.func.js" }, "/[locale]/access-services.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/access-services.func.js" }, "/[locale]/community-conversations": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/community-conversations.func.js" }, "/[locale]/community-conversations.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/community-conversations.func.js" }, "/[locale]/content-curation/[slug]": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/content-curation/[slug].func.js" }, "/[locale]/content-curation/[slug].rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/content-curation/[slug].func.js" }, "/[locale]/home": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/home.func.js" }, "/[locale]/home.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/home.func.js" }, "/[locale]/moderator-user-dashboard": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/moderator-user-dashboard.func.js" }, "/[locale]/moderator-user-dashboard.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/moderator-user-dashboard.func.js" }, "/[locale]/resources": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/resources.func.js" }, "/[locale]/resources.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/resources.func.js" }, "/[locale]/search-form": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/search-form.func.js" }, "/[locale]/search-form.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/search-form.func.js" }, "/[locale]/user-dashboard": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/user-dashboard.func.js" }, "/[locale]/user-dashboard.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/user-dashboard.func.js" }, "/[locale]/user-login": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/user-login.func.js" }, "/[locale]/user-login.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/[locale]/user-login.func.js" }, "/404": { type: "override", path: "/404.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/500": { type: "override", path: "/500.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/_app.rsc": { type: "override", path: "/_app.rsc.json", headers: { "content-type": "application/json" } }, "/_error.rsc": { type: "override", path: "/_error.rsc.json", headers: { "content-type": "application/json" } }, "/_document.rsc": { type: "override", path: "/_document.rsc.json", headers: { "content-type": "application/json" } }, "/404.rsc": { type: "override", path: "/404.rsc.json", headers: { "content-type": "application/json" } }, "/__next_data_catchall": { type: "override", path: "/__next_data_catchall.json", headers: { "content-type": "application/json" } }, "src/middleware": { type: "middleware", entrypoint: "__next-on-pages-dist__/functions/src/middleware.func.js" } };
});
var $ = V((Ge, F) => {
  "use strict";
  u();
  l();
  p();
  function b(e, t) {
    e = String(e || "").trim();
    let a = e, s, i = "";
    if (/^[^a-zA-Z\\\s]/.test(e)) {
      s = e[0];
      let c = e.lastIndexOf(s);
      i += e.substring(c + 1), e = e.substring(1, c);
    }
    let n = 0;
    return e = le(e, (c) => {
      if (/^\(\?[P<']/.test(c)) {
        let o = /^\(\?P?[<']([^>']+)[>']/.exec(c);
        if (!o)
          throw new Error(`Failed to extract named captures from ${JSON.stringify(c)}`);
        let d = c.substring(o[0].length, c.length - 1);
        return t && (t[n] = o[1]), n++, `(${d})`;
      }
      return c.substring(0, 3) === "(?:" || n++, c;
    }), e = e.replace(/\[:([^:]+):\]/g, (c, o) => b.characterClasses[o] || c), new b.PCRE(e, i, a, i, s);
  }
  __name(b, "b");
  __name2(b, "b");
  function le(e, t) {
    let a = 0, s = 0, i = false;
    for (let r = 0; r < e.length; r++) {
      let n = e[r];
      if (i) {
        i = false;
        continue;
      }
      switch (n) {
        case "(":
          s === 0 && (a = r), s++;
          break;
        case ")":
          if (s > 0 && (s--, s === 0)) {
            let c = r + 1, o = a === 0 ? "" : e.substring(0, a), d = e.substring(c), h = String(t(e.substring(a, c)));
            e = o + h + d, r = a;
          }
          break;
        case "\\":
          i = true;
          break;
        default:
          break;
      }
    }
    return e;
  }
  __name(le, "le");
  __name2(le, "le");
  (function(e) {
    class t extends RegExp {
      constructor(s, i, r, n, c) {
        super(s, i), this.pcrePattern = r, this.pcreFlags = n, this.delimiter = c;
      }
    }
    __name(t, "t");
    __name2(t, "t");
    e.PCRE = t, e.characterClasses = { alnum: "[A-Za-z0-9]", word: "[A-Za-z0-9_]", alpha: "[A-Za-z]", blank: "[ \\t]", cntrl: "[\\x00-\\x1F\\x7F]", digit: "\\d", graph: "[\\x21-\\x7E]", lower: "[a-z]", print: "[\\x20-\\x7E]", punct: "[\\]\\[!\"#$%&'()*+,./:;<=>?@\\\\^_`{|}~-]", space: "\\s", upper: "[A-Z]", xdigit: "[A-Fa-f0-9]" };
  })(b || (b = {}));
  b.prototype = b.PCRE.prototype;
  F.exports = b;
});
var Z = V((U) => {
  "use strict";
  u();
  l();
  p();
  U.parse = Re;
  U.serialize = ve;
  var we = Object.prototype.toString, C = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
  function Re(e, t) {
    if (typeof e != "string")
      throw new TypeError("argument str must be a string");
    for (var a = {}, s = t || {}, i = s.decode || Pe, r = 0; r < e.length; ) {
      var n = e.indexOf("=", r);
      if (n === -1)
        break;
      var c = e.indexOf(";", r);
      if (c === -1)
        c = e.length;
      else if (c < n) {
        r = e.lastIndexOf(";", n - 1) + 1;
        continue;
      }
      var o = e.slice(r, n).trim();
      if (a[o] === void 0) {
        var d = e.slice(n + 1, c).trim();
        d.charCodeAt(0) === 34 && (d = d.slice(1, -1)), a[o] = Se(d, i);
      }
      r = c + 1;
    }
    return a;
  }
  __name(Re, "Re");
  __name2(Re, "Re");
  function ve(e, t, a) {
    var s = a || {}, i = s.encode || ke;
    if (typeof i != "function")
      throw new TypeError("option encode is invalid");
    if (!C.test(e))
      throw new TypeError("argument name is invalid");
    var r = i(t);
    if (r && !C.test(r))
      throw new TypeError("argument val is invalid");
    var n = e + "=" + r;
    if (s.maxAge != null) {
      var c = s.maxAge - 0;
      if (isNaN(c) || !isFinite(c))
        throw new TypeError("option maxAge is invalid");
      n += "; Max-Age=" + Math.floor(c);
    }
    if (s.domain) {
      if (!C.test(s.domain))
        throw new TypeError("option domain is invalid");
      n += "; Domain=" + s.domain;
    }
    if (s.path) {
      if (!C.test(s.path))
        throw new TypeError("option path is invalid");
      n += "; Path=" + s.path;
    }
    if (s.expires) {
      var o = s.expires;
      if (!je(o) || isNaN(o.valueOf()))
        throw new TypeError("option expires is invalid");
      n += "; Expires=" + o.toUTCString();
    }
    if (s.httpOnly && (n += "; HttpOnly"), s.secure && (n += "; Secure"), s.priority) {
      var d = typeof s.priority == "string" ? s.priority.toLowerCase() : s.priority;
      switch (d) {
        case "low":
          n += "; Priority=Low";
          break;
        case "medium":
          n += "; Priority=Medium";
          break;
        case "high":
          n += "; Priority=High";
          break;
        default:
          throw new TypeError("option priority is invalid");
      }
    }
    if (s.sameSite) {
      var h = typeof s.sameSite == "string" ? s.sameSite.toLowerCase() : s.sameSite;
      switch (h) {
        case true:
          n += "; SameSite=Strict";
          break;
        case "lax":
          n += "; SameSite=Lax";
          break;
        case "strict":
          n += "; SameSite=Strict";
          break;
        case "none":
          n += "; SameSite=None";
          break;
        default:
          throw new TypeError("option sameSite is invalid");
      }
    }
    return n;
  }
  __name(ve, "ve");
  __name2(ve, "ve");
  function Pe(e) {
    return e.indexOf("%") !== -1 ? decodeURIComponent(e) : e;
  }
  __name(Pe, "Pe");
  __name2(Pe, "Pe");
  function ke(e) {
    return encodeURIComponent(e);
  }
  __name(ke, "ke");
  __name2(ke, "ke");
  function je(e) {
    return we.call(e) === "[object Date]" || e instanceof Date;
  }
  __name(je, "je");
  __name2(je, "je");
  function Se(e, t) {
    try {
      return t(e);
    } catch {
      return e;
    }
  }
  __name(Se, "Se");
  __name2(Se, "Se");
});
u();
l();
p();
u();
l();
p();
u();
l();
p();
var R = "INTERNAL_SUSPENSE_CACHE_HOSTNAME.local";
u();
l();
p();
u();
l();
p();
u();
l();
p();
u();
l();
p();
var q = N($());
function j(e, t, a) {
  if (t == null)
    return { match: null, captureGroupKeys: [] };
  let s = a ? "" : "i", i = [];
  return { match: (0, q.default)(`%${e}%${s}`, i).exec(t), captureGroupKeys: i };
}
__name(j, "j");
__name2(j, "j");
function v(e, t, a, { namedOnly: s } = {}) {
  return e.replace(/\$([a-zA-Z0-9_]+)/g, (i, r) => {
    let n = a.indexOf(r);
    return s && n === -1 ? i : (n === -1 ? t[parseInt(r, 10)] : t[n + 1]) || "";
  });
}
__name(v, "v");
__name2(v, "v");
function I(e, { url: t, cookies: a, headers: s, routeDest: i }) {
  switch (e.type) {
    case "host":
      return { valid: t.hostname === e.value };
    case "header":
      return e.value !== void 0 ? T(e.value, s.get(e.key), i) : { valid: s.has(e.key) };
    case "cookie": {
      let r = a[e.key];
      return r && e.value !== void 0 ? T(e.value, r, i) : { valid: r !== void 0 };
    }
    case "query":
      return e.value !== void 0 ? T(e.value, t.searchParams.get(e.key), i) : { valid: t.searchParams.has(e.key) };
  }
}
__name(I, "I");
__name2(I, "I");
function T(e, t, a) {
  let { match: s, captureGroupKeys: i } = j(e, t);
  return a && s && i.length ? { valid: !!s, newRouteDest: v(a, s, i, { namedOnly: true }) } : { valid: !!s };
}
__name(T, "T");
__name2(T, "T");
u();
l();
p();
function D(e) {
  let t = new Headers(e.headers);
  return e.cf && (t.set("x-vercel-ip-city", encodeURIComponent(e.cf.city)), t.set("x-vercel-ip-country", e.cf.country), t.set("x-vercel-ip-country-region", e.cf.regionCode), t.set("x-vercel-ip-latitude", e.cf.latitude), t.set("x-vercel-ip-longitude", e.cf.longitude)), t.set("x-vercel-sc-host", R), new Request(e, { headers: t });
}
__name(D, "D");
__name2(D, "D");
u();
l();
p();
function _(e, t, a) {
  let s = t instanceof Headers ? t.entries() : Object.entries(t);
  for (let [i, r] of s) {
    let n = i.toLowerCase(), c = a?.match ? v(r, a.match, a.captureGroupKeys) : r;
    n === "set-cookie" ? e.append(n, c) : e.set(n, c);
  }
}
__name(_, "_");
__name2(_, "_");
function P(e) {
  return /^https?:\/\//.test(e);
}
__name(P, "P");
__name2(P, "P");
function x(e, t) {
  for (let [a, s] of t.entries()) {
    let i = /^nxtP(.+)$/.exec(a), r = /^nxtI(.+)$/.exec(a);
    i?.[1] ? (e.set(a, s), e.set(i[1], s)) : r?.[1] ? e.set(r[1], s.replace(/(\(\.+\))+/, "")) : (!e.has(a) || !!s && !e.getAll(a).includes(s)) && e.append(a, s);
  }
}
__name(x, "x");
__name2(x, "x");
function L(e, t) {
  let a = new URL(t, e.url);
  return x(a.searchParams, new URL(e.url).searchParams), a.pathname = a.pathname.replace(/\/index.html$/, "/").replace(/\.html$/, ""), new Request(a, e);
}
__name(L, "L");
__name2(L, "L");
function k(e) {
  return new Response(e.body, e);
}
__name(k, "k");
__name2(k, "k");
function A(e) {
  return e.split(",").map((t) => {
    let [a, s] = t.split(";"), i = parseFloat((s ?? "q=1").replace(/q *= */gi, ""));
    return [a.trim(), isNaN(i) ? 1 : i];
  }).sort((t, a) => a[1] - t[1]).map(([t]) => t === "*" || t === "" ? [] : t).flat();
}
__name(A, "A");
__name2(A, "A");
u();
l();
p();
function H(e) {
  switch (e) {
    case "none":
      return "filesystem";
    case "filesystem":
      return "rewrite";
    case "rewrite":
      return "resource";
    case "resource":
      return "miss";
    default:
      return "miss";
  }
}
__name(H, "H");
__name2(H, "H");
async function S(e, { request: t, assetsFetcher: a, ctx: s }, { path: i, searchParams: r }) {
  let n, c = new URL(t.url);
  x(c.searchParams, r);
  let o = new Request(c, t);
  try {
    switch (e?.type) {
      case "function":
      case "middleware": {
        let d = await import(e.entrypoint);
        try {
          n = await d.default(o, s);
        } catch (h) {
          let m = h;
          throw m.name === "TypeError" && m.message.endsWith("default is not a function") ? new Error(`An error occurred while evaluating the target edge function (${e.entrypoint})`) : h;
        }
        break;
      }
      case "override": {
        n = k(await a.fetch(L(o, e.path ?? i))), e.headers && _(n.headers, e.headers);
        break;
      }
      case "static": {
        n = await a.fetch(L(o, i));
        break;
      }
      default:
        n = new Response("Not Found", { status: 404 });
    }
  } catch (d) {
    return console.error(d), new Response("Internal Server Error", { status: 500 });
  }
  return k(n);
}
__name(S, "S");
__name2(S, "S");
function B(e, t) {
  let a = "^//?(?:", s = ")/(.*)$";
  return !e.startsWith(a) || !e.endsWith(s) ? false : e.slice(a.length, -s.length).split("|").every((r) => t.has(r));
}
__name(B, "B");
__name2(B, "B");
u();
l();
p();
function pe(e, { protocol: t, hostname: a, port: s, pathname: i }) {
  return !(t && e.protocol.replace(/:$/, "") !== t || !new RegExp(a).test(e.hostname) || s && !new RegExp(s).test(e.port) || i && !new RegExp(i).test(e.pathname));
}
__name(pe, "pe");
__name2(pe, "pe");
function de(e, t) {
  if (e.method !== "GET")
    return;
  let { origin: a, searchParams: s } = new URL(e.url), i = s.get("url"), r = Number.parseInt(s.get("w") ?? "", 10), n = Number.parseInt(s.get("q") ?? "75", 10);
  if (!i || Number.isNaN(r) || Number.isNaN(n) || !t?.sizes?.includes(r) || n < 0 || n > 100)
    return;
  let c = new URL(i, a);
  if (c.pathname.endsWith(".svg") && !t?.dangerouslyAllowSVG)
    return;
  let o = i.startsWith("//"), d = i.startsWith("/") && !o;
  if (!d && !t?.domains?.includes(c.hostname) && !t?.remotePatterns?.find((w) => pe(c, w)))
    return;
  let h = e.headers.get("Accept") ?? "", m = t?.formats?.find((w) => h.includes(w))?.replace("image/", "");
  return { isRelative: d, imageUrl: c, options: { width: r, quality: n, format: m } };
}
__name(de, "de");
__name2(de, "de");
function he(e, t, a) {
  let s = new Headers();
  if (a?.contentSecurityPolicy && s.set("Content-Security-Policy", a.contentSecurityPolicy), a?.contentDispositionType) {
    let r = t.pathname.split("/").pop(), n = r ? `${a.contentDispositionType}; filename="${r}"` : a.contentDispositionType;
    s.set("Content-Disposition", n);
  }
  e.headers.has("Cache-Control") || s.set("Cache-Control", `public, max-age=${a?.minimumCacheTTL ?? 60}`);
  let i = k(e);
  return _(i.headers, s), i;
}
__name(he, "he");
__name2(he, "he");
async function G(e, { buildOutput: t, assetsFetcher: a, imagesConfig: s }) {
  let i = de(e, s);
  if (!i)
    return new Response("Invalid image resizing request", { status: 400 });
  let { isRelative: r, imageUrl: n } = i, o = await (r && n.pathname in t ? a.fetch.bind(a) : fetch)(n);
  return he(o, n, s);
}
__name(G, "G");
__name2(G, "G");
u();
l();
p();
u();
l();
p();
var fe = "x-vercel-cache-tags";
var ye = "x-next-cache-soft-tags";
var ge = Symbol.for("__cloudflare-request-context__");
async function z(e) {
  let t = `https://${R}/v1/suspense-cache/`;
  if (!e.url.startsWith(t))
    return null;
  try {
    let a = new URL(e.url), s = await me();
    if (a.pathname === "/v1/suspense-cache/revalidate") {
      let r = a.searchParams.get("tags")?.split(",") ?? [];
      for (let n of r)
        await s.revalidateTag(n);
      return new Response(null, { status: 200 });
    }
    let i = a.pathname.replace("/v1/suspense-cache/", "");
    if (!i.length)
      return new Response("Invalid cache key", { status: 400 });
    switch (e.method) {
      case "GET": {
        let r = K(e, ye), n = await s.get(i, { softTags: r });
        return n ? new Response(JSON.stringify(n.value), { status: 200, headers: { "Content-Type": "application/json", "x-vercel-cache-state": "fresh", age: `${(Date.now() - (n.lastModified ?? Date.now())) / 1e3}` } }) : new Response(null, { status: 404 });
      }
      case "POST": {
        let r = globalThis[ge], n = /* @__PURE__ */ __name2(async () => {
          let c = await e.json();
          c.data.tags === void 0 && (c.tags ??= K(e, fe) ?? []), await s.set(i, c);
        }, "n");
        return r ? r.ctx.waitUntil(n()) : await n(), new Response(null, { status: 200 });
      }
      default:
        return new Response(null, { status: 405 });
    }
  } catch (a) {
    return console.error(a), new Response("Error handling cache request", { status: 500 });
  }
}
__name(z, "z");
__name2(z, "z");
async function me() {
  return process.env.__NEXT_ON_PAGES__KV_SUSPENSE_CACHE ? W("kv") : W("cache-api");
}
__name(me, "me");
__name2(me, "me");
async function W(e) {
  let t = await import(`./__next-on-pages-dist__/cache/${e}.js`);
  return new t.default();
}
__name(W, "W");
__name2(W, "W");
function K(e, t) {
  return e.headers.get(t)?.split(",")?.filter(Boolean);
}
__name(K, "K");
__name2(K, "K");
function X() {
  globalThis[J] || (_e(), globalThis[J] = true);
}
__name(X, "X");
__name2(X, "X");
function _e() {
  let e = globalThis.fetch;
  globalThis.fetch = async (...t) => {
    let a = new Request(...t), s = await xe(a);
    return s || (s = await z(a), s) ? s : (be(a), e(a));
  };
}
__name(_e, "_e");
__name2(_e, "_e");
async function xe(e) {
  if (e.url.startsWith("blob:"))
    try {
      let a = (await import(`./__next-on-pages-dist__/assets/${new URL(e.url).pathname}.bin`)).default, s = { async arrayBuffer() {
        return a;
      }, get body() {
        return new ReadableStream({ start(i) {
          let r = Buffer.from(a);
          i.enqueue(r), i.close();
        } });
      }, async text() {
        return Buffer.from(a).toString();
      }, async json() {
        let i = Buffer.from(a);
        return JSON.stringify(i.toString());
      }, async blob() {
        return new Blob(a);
      } };
      return s.clone = () => ({ ...s }), s;
    } catch {
    }
  return null;
}
__name(xe, "xe");
__name2(xe, "xe");
function be(e) {
  e.headers.has("user-agent") || e.headers.set("user-agent", "Next.js Middleware");
}
__name(be, "be");
__name2(be, "be");
var J = Symbol.for("next-on-pages fetch patch");
u();
l();
p();
var Q = N(Z());
var E = /* @__PURE__ */ __name2(class {
  constructor(t, a, s, i, r) {
    this.routes = t;
    this.output = a;
    this.reqCtx = s;
    this.url = new URL(s.request.url), this.cookies = (0, Q.parse)(s.request.headers.get("cookie") || ""), this.path = this.url.pathname || "/", this.headers = { normal: new Headers(), important: new Headers() }, this.searchParams = new URLSearchParams(), x(this.searchParams, this.url.searchParams), this.checkPhaseCounter = 0, this.middlewareInvoked = [], this.wildcardMatch = r?.find((n) => n.domain === this.url.hostname), this.locales = new Set(i.collectedLocales);
  }
  url;
  cookies;
  wildcardMatch;
  path;
  status;
  headers;
  searchParams;
  body;
  checkPhaseCounter;
  middlewareInvoked;
  locales;
  checkRouteMatch(t, { checkStatus: a, checkIntercept: s }) {
    let i = j(t.src, this.path, t.caseSensitive);
    if (!i.match || t.methods && !t.methods.map((n) => n.toUpperCase()).includes(this.reqCtx.request.method.toUpperCase()))
      return;
    let r = { url: this.url, cookies: this.cookies, headers: this.reqCtx.request.headers, routeDest: t.dest };
    if (!t.has?.find((n) => {
      let c = I(n, r);
      return c.newRouteDest && (r.routeDest = c.newRouteDest), !c.valid;
    }) && !t.missing?.find((n) => I(n, r).valid) && !(a && t.status !== this.status)) {
      if (s && t.dest) {
        let n = /\/(\(\.+\))+/, c = n.test(t.dest), o = n.test(this.path);
        if (c && !o)
          return;
      }
      return { routeMatch: i, routeDest: r.routeDest };
    }
  }
  processMiddlewareResp(t) {
    let a = "x-middleware-override-headers", s = t.headers.get(a);
    if (s) {
      let o = new Set(s.split(",").map((d) => d.trim()));
      for (let d of o.keys()) {
        let h = `x-middleware-request-${d}`, m = t.headers.get(h);
        this.reqCtx.request.headers.get(d) !== m && (m ? this.reqCtx.request.headers.set(d, m) : this.reqCtx.request.headers.delete(d)), t.headers.delete(h);
      }
      t.headers.delete(a);
    }
    let i = "x-middleware-rewrite", r = t.headers.get(i);
    if (r) {
      let o = new URL(r, this.url), d = this.url.hostname !== o.hostname;
      this.path = d ? `${o}` : o.pathname, x(this.searchParams, o.searchParams), t.headers.delete(i);
    }
    let n = "x-middleware-next";
    t.headers.get(n) ? t.headers.delete(n) : !r && !t.headers.has("location") ? (this.body = t.body, this.status = t.status) : t.headers.has("location") && t.status >= 300 && t.status < 400 && (this.status = t.status), _(this.reqCtx.request.headers, t.headers), _(this.headers.normal, t.headers), this.headers.middlewareLocation = t.headers.get("location");
  }
  async runRouteMiddleware(t) {
    if (!t)
      return true;
    let a = t && this.output[t];
    if (!a || a.type !== "middleware")
      return this.status = 500, false;
    let s = await S(a, this.reqCtx, { path: this.path, searchParams: this.searchParams, headers: this.headers, status: this.status });
    return this.middlewareInvoked.push(t), s.status === 500 ? (this.status = s.status, false) : (this.processMiddlewareResp(s), true);
  }
  applyRouteOverrides(t) {
    !t.override || (this.status = void 0, this.headers.normal = new Headers(), this.headers.important = new Headers());
  }
  applyRouteHeaders(t, a, s) {
    !t.headers || (_(this.headers.normal, t.headers, { match: a, captureGroupKeys: s }), t.important && _(this.headers.important, t.headers, { match: a, captureGroupKeys: s }));
  }
  applyRouteStatus(t) {
    !t.status || (this.status = t.status);
  }
  applyRouteDest(t, a, s) {
    if (!t.dest)
      return this.path;
    let i = this.path, r = t.dest;
    this.wildcardMatch && /\$wildcard/.test(r) && (r = r.replace(/\$wildcard/g, this.wildcardMatch.value)), this.path = v(r, a, s);
    let n = /\/index\.rsc$/i.test(this.path), c = /^\/(?:index)?$/i.test(i), o = /^\/__index\.prefetch\.rsc$/i.test(i);
    n && !c && !o && (this.path = i);
    let d = /\.rsc$/i.test(this.path), h = /\.prefetch\.rsc$/i.test(this.path), m = this.path in this.output;
    d && !h && !m && (this.path = this.path.replace(/\.rsc/i, ""));
    let w = new URL(this.path, this.url);
    return x(this.searchParams, w.searchParams), P(this.path) || (this.path = w.pathname), i;
  }
  applyLocaleRedirects(t) {
    if (!t.locale?.redirect || !/^\^(.)*$/.test(t.src) && t.src !== this.path || this.headers.normal.has("location"))
      return;
    let { locale: { redirect: s, cookie: i } } = t, r = i && this.cookies[i], n = A(r ?? ""), c = A(this.reqCtx.request.headers.get("accept-language") ?? ""), h = [...n, ...c].map((m) => s[m]).filter(Boolean)[0];
    if (h) {
      !this.path.startsWith(h) && (this.headers.normal.set("location", h), this.status = 307);
      return;
    }
  }
  getLocaleFriendlyRoute(t, a) {
    return !this.locales || a !== "miss" ? t : B(t.src, this.locales) ? { ...t, src: t.src.replace(/\/\(\.\*\)\$$/, "(?:/(.*))?$") } : t;
  }
  async checkRoute(t, a) {
    let s = this.getLocaleFriendlyRoute(a, t), { routeMatch: i, routeDest: r } = this.checkRouteMatch(s, { checkStatus: t === "error", checkIntercept: t === "rewrite" }) ?? {}, n = { ...s, dest: r };
    if (!i?.match || n.middlewarePath && this.middlewareInvoked.includes(n.middlewarePath))
      return "skip";
    let { match: c, captureGroupKeys: o } = i;
    if (this.applyRouteOverrides(n), this.applyLocaleRedirects(n), !await this.runRouteMiddleware(n.middlewarePath))
      return "error";
    if (this.body !== void 0 || this.headers.middlewareLocation)
      return "done";
    this.applyRouteHeaders(n, c, o), this.applyRouteStatus(n);
    let h = this.applyRouteDest(n, c, o);
    if (n.check && !P(this.path))
      if (h === this.path) {
        if (t !== "miss")
          return this.checkPhase(H(t));
        this.status = 404;
      } else if (t === "miss") {
        if (!(this.path in this.output) && !(this.path.replace(/\/$/, "") in this.output))
          return this.checkPhase("filesystem");
        this.status === 404 && (this.status = void 0);
      } else
        return this.checkPhase("none");
    return !n.continue || n.status && n.status >= 300 && n.status <= 399 ? "done" : "next";
  }
  async checkPhase(t) {
    if (this.checkPhaseCounter++ >= 50)
      return console.error(`Routing encountered an infinite loop while checking ${this.url.pathname}`), this.status = 500, "error";
    this.middlewareInvoked = [];
    let a = true;
    for (let r of this.routes[t]) {
      let n = await this.checkRoute(t, r);
      if (n === "error")
        return "error";
      if (n === "done") {
        a = false;
        break;
      }
    }
    if (t === "hit" || P(this.path) || this.headers.normal.has("location") || !!this.body)
      return "done";
    if (t === "none")
      for (let r of this.locales) {
        let n = new RegExp(`/${r}(/.*)`), o = this.path.match(n)?.[1];
        if (o && o in this.output) {
          this.path = o;
          break;
        }
      }
    let s = this.path in this.output;
    if (!s && this.path.endsWith("/")) {
      let r = this.path.replace(/\/$/, "");
      s = r in this.output, s && (this.path = r);
    }
    if (t === "miss" && !s) {
      let r = !this.status || this.status < 400;
      this.status = r ? 404 : this.status;
    }
    let i = "miss";
    return s || t === "miss" || t === "error" ? i = "hit" : a && (i = H(t)), this.checkPhase(i);
  }
  async run(t = "none") {
    this.checkPhaseCounter = 0;
    let a = await this.checkPhase(t);
    return this.headers.normal.has("location") && (!this.status || this.status < 300 || this.status >= 400) && (this.status = 307), a;
  }
}, "E");
async function Y(e, t, a, s) {
  let i = new E(t.routes, a, e, s, t.wildcard), r = await ee(i);
  return Ce(e, r, a);
}
__name(Y, "Y");
__name2(Y, "Y");
async function ee(e, t = "none", a = false) {
  return await e.run(t) === "error" || !a && e.status && e.status >= 400 ? ee(e, "error", true) : { path: e.path, status: e.status, headers: e.headers, searchParams: e.searchParams, body: e.body };
}
__name(ee, "ee");
__name2(ee, "ee");
async function Ce(e, { path: t = "/404", status: a, headers: s, searchParams: i, body: r }, n) {
  let c = s.normal.get("location");
  if (c) {
    if (c !== s.middlewareLocation) {
      let h = [...i.keys()].length ? `?${i.toString()}` : "";
      s.normal.set("location", `${c ?? "/"}${h}`);
    }
    return new Response(null, { status: a, headers: s.normal });
  }
  let o;
  if (r !== void 0)
    o = new Response(r, { status: a });
  else if (P(t)) {
    let h = new URL(t);
    x(h.searchParams, i), o = await fetch(h, e.request);
  } else
    o = await S(n[t], e, { path: t, status: a, headers: s, searchParams: i });
  let d = s.normal;
  return _(d, o.headers), _(d, s.important), o = new Response(o.body, { ...o, status: a || o.status, headers: d }), o;
}
__name(Ce, "Ce");
__name2(Ce, "Ce");
u();
l();
p();
function te() {
  globalThis.__nextOnPagesRoutesIsolation ??= { _map: /* @__PURE__ */ new Map(), getProxyFor: Ee };
}
__name(te, "te");
__name2(te, "te");
function Ee(e) {
  let t = globalThis.__nextOnPagesRoutesIsolation._map.get(e);
  if (t)
    return t;
  let a = Me();
  return globalThis.__nextOnPagesRoutesIsolation._map.set(e, a), a;
}
__name(Ee, "Ee");
__name2(Ee, "Ee");
function Me() {
  let e = /* @__PURE__ */ new Map();
  return new Proxy(globalThis, { get: (t, a) => e.has(a) ? e.get(a) : Reflect.get(globalThis, a), set: (t, a, s) => Te.has(a) ? Reflect.set(globalThis, a, s) : (e.set(a, s), true) });
}
__name(Me, "Me");
__name2(Me, "Me");
var Te = /* @__PURE__ */ new Set(["_nextOriginalFetch", "fetch", "__incrementalCache"]);
var ys = { async fetch(e, t, a) {
  te(), X();
  let s = await __ALSes_PROMISE__;
  if (!s) {
    let n = new URL(e.url), c = await t.ASSETS.fetch(`${n.protocol}//${n.host}/cdn-cgi/errors/no-nodejs_compat.html`), o = c.ok ? c.body : "Error: Could not access built-in Node.js modules. Please make sure that your Cloudflare Pages project has the 'nodejs_compat' compatibility flag set.";
    return new Response(o, { status: 503 });
  }
  let { envAsyncLocalStorage: i, requestContextAsyncLocalStorage: r } = s;
  return i.run({ ...t, NODE_ENV: "production", SUSPENSE_CACHE_URL: R }, async () => r.run({ env: t, ctx: a, cf: e.cf }, async () => {
    if (new URL(e.url).pathname.startsWith("/_next/image"))
      return G(e, { buildOutput: y, assetsFetcher: t.ASSETS, imagesConfig: f.images });
    let c = D(e);
    return Y({ request: c, ctx: a, assetsFetcher: t.ASSETS }, f, y, g);
  }));
} };

// node_modules/wrangler/templates/pages-dev-util.ts
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_process();
init_virtual_unenv_global_polyfill_performance();
init_virtual_unenv_global_polyfill_console();
init_virtual_unenv_global_polyfill_set_immediate();
init_virtual_unenv_global_polyfill_clear_immediate();
function isRoutingRuleMatch(pathname, routingRule) {
  if (!pathname) {
    throw new Error("Pathname is undefined.");
  }
  if (!routingRule) {
    throw new Error("Routing rule is undefined.");
  }
  const ruleRegExp = transformRoutingRuleToRegExp(routingRule);
  return pathname.match(ruleRegExp) !== null;
}
__name(isRoutingRuleMatch, "isRoutingRuleMatch");
function transformRoutingRuleToRegExp(rule) {
  let transformedRule;
  if (rule === "/" || rule === "/*") {
    transformedRule = rule;
  } else if (rule.endsWith("/*")) {
    transformedRule = `${rule.substring(0, rule.length - 2)}(/*)?`;
  } else if (rule.endsWith("/")) {
    transformedRule = `${rule.substring(0, rule.length - 1)}(/)?`;
  } else if (rule.endsWith("*")) {
    transformedRule = rule;
  } else {
    transformedRule = `${rule}(/)?`;
  }
  transformedRule = `^${transformedRule.replaceAll(/\./g, "\\.").replaceAll(/\*/g, ".*")}$`;
  return new RegExp(transformedRule);
}
__name(transformRoutingRuleToRegExp, "transformRoutingRuleToRegExp");

// .wrangler/tmp/pages-xbBt83/yqb4lqiwmq.js
var define_ROUTES_default = { version: 1, description: "Built with @cloudflare/next-on-pages@1.13.6.", include: ["/*"], exclude: ["/_next/static/*"] };
var routes = define_ROUTES_default;
var pages_dev_pipeline_default = {
  fetch(request, env3, context2) {
    const { pathname } = new URL(request.url);
    for (const exclude of routes.exclude) {
      if (isRoutingRuleMatch(pathname, exclude)) {
        return env3.ASSETS.fetch(request);
      }
    }
    for (const include of routes.include) {
      if (isRoutingRuleMatch(pathname, include)) {
        if (ys.fetch === void 0) {
          throw new TypeError("Entry point missing `fetch` handler");
        }
        return ys.fetch(request, env3, context2);
      }
    }
    return env3.ASSETS.fetch(request);
  }
};

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_process();
init_virtual_unenv_global_polyfill_performance();
init_virtual_unenv_global_polyfill_console();
init_virtual_unenv_global_polyfill_set_immediate();
init_virtual_unenv_global_polyfill_clear_immediate();
var drainBody = /* @__PURE__ */ __name(async (request, env3, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env3);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_process();
init_virtual_unenv_global_polyfill_performance();
init_virtual_unenv_global_polyfill_console();
init_virtual_unenv_global_polyfill_set_immediate();
init_virtual_unenv_global_polyfill_clear_immediate();
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env3, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env3);
  } catch (e) {
    const error3 = reduceError(e);
    return Response.json(error3, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-I019UQ/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = pages_dev_pipeline_default;

// node_modules/wrangler/templates/middleware/common.ts
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_process();
init_virtual_unenv_global_polyfill_performance();
init_virtual_unenv_global_polyfill_console();
init_virtual_unenv_global_polyfill_set_immediate();
init_virtual_unenv_global_polyfill_clear_immediate();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env3, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env3, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env3, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env3, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-I019UQ/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env3, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env3, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env3, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env3, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env3, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env3, ctx) => {
      this.env = env3;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
//# sourceMappingURL=yqb4lqiwmq.js.map
