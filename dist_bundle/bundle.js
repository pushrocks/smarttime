var tsbundle = (function (exports, fs) {
	'use strict';

	fs = fs && Object.prototype.hasOwnProperty.call(fs, 'default') ? fs['default'] : fs;

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, basedir, module) {
		return module = {
		  path: basedir,
		  exports: {},
		  require: function (path, base) {
	      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
	    }
		}, fn(module, module.exports), module.exports;
	}

	function getCjsExportFromNamespace (n) {
		return n && n['default'] || n;
	}

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
	}

	var dist = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	class Deferred {
	    constructor() {
	        this.promise = new Promise((resolve, reject) => {
	            this.resolve = (valueArg) => {
	                this.status = 'fulfilled';
	                this.stoppedAt = Date.now();
	                resolve(valueArg);
	            };
	            this.reject = (reason) => {
	                this.status = 'rejected';
	                this.stoppedAt = Date.now();
	                reject(reason);
	            };
	            this.startedAt = Date.now();
	            this.status = 'pending';
	        });
	    }
	    get duration() {
	        if (this.stoppedAt) {
	            return this.stoppedAt - this.startedAt;
	        }
	        else {
	            return Date.now() - this.startedAt;
	        }
	    }
	}
	exports.Deferred = Deferred;
	exports.defer = () => {
	    return new Deferred();
	};
	/**
	 * Creates a new resolved promise for the provided value.
	 */
	exports.resolvedPromise = (value) => {
	    return Promise.resolve(value);
	};
	/**
	 * Creates a new rejected promise for the provided reason.
	 */
	exports.rejectedPromise = err => {
	    return Promise.reject(err);
	};
	exports.map = async (inputArg, functionArg) => {
	    let promiseArray = [];
	    let resultArray = [];
	    for (let item of inputArg) {
	        let promise = functionArg(item);
	        promiseArray.push(promise);
	        promise.then(x => {
	            resultArray.push(x);
	        });
	    }
	    await Promise.all(promiseArray);
	    return resultArray;
	};

	});

	unwrapExports(dist);
	var dist_1 = dist.Deferred;
	var dist_2 = dist.defer;
	var dist_3 = dist.resolvedPromise;
	var dist_4 = dist.rejectedPromise;
	var dist_5 = dist.map;

	var dist$1 = createCommonjsModule(function (module, exports) {
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
	    result["default"] = mod;
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	const smartpromise = __importStar(dist);
	/**
	 * delay something, works like setTimeout
	 * @param timeInMillisecond
	 * @param passOn
	 */
	exports.delayFor = async (timeInMillisecond, passOn) => {
	    await new Promise((resolve, reject) => {
	        setTimeout(() => {
	            resolve();
	        }, timeInMillisecond);
	    });
	    return passOn;
	};
	/**
	 * delay for a random time
	 */
	exports.delayForRandom = async (timeMinInMillisecond, timeMaxInMillisecond, passOn) => {
	    await new Promise((resolve, reject) => {
	        setTimeout(() => {
	            resolve();
	        }, Math.random() * (timeMaxInMillisecond - timeMinInMillisecond) + timeMinInMillisecond);
	    });
	    return passOn;
	};
	class Timeout {
	    constructor(timeInMillisecondArg, passOn) {
	        this._cancelled = false;
	        this._deferred = smartpromise.defer();
	        this.promise = this._deferred.promise;
	        this._timeout = setTimeout(() => {
	            if (!this._cancelled) {
	                this._deferred.resolve(passOn);
	            }
	        }, timeInMillisecondArg);
	    }
	    makeUnrefed() {
	        this._timeout.unref();
	    }
	    cancel() {
	        this._cancelled = true;
	        this.makeUnrefed();
	    }
	}
	exports.Timeout = Timeout;

	});

	unwrapExports(dist$1);
	var dist_1$1 = dist$1.delayFor;
	var dist_2$1 = dist$1.delayForRandom;
	var dist_3$1 = dist$1.Timeout;

	var moment = createCommonjsModule(function (module, exports) {
	(function (global, factory) {
	     module.exports = factory() ;
	}(commonjsGlobal, (function () {
	    var hookCallback;

	    function hooks() {
	        return hookCallback.apply(null, arguments);
	    }

	    // This is done to register the method called with moment()
	    // without creating circular dependencies.
	    function setHookCallback(callback) {
	        hookCallback = callback;
	    }

	    function isArray(input) {
	        return (
	            input instanceof Array ||
	            Object.prototype.toString.call(input) === '[object Array]'
	        );
	    }

	    function isObject(input) {
	        // IE8 will treat undefined and null as object if it wasn't for
	        // input != null
	        return (
	            input != null &&
	            Object.prototype.toString.call(input) === '[object Object]'
	        );
	    }

	    function hasOwnProp(a, b) {
	        return Object.prototype.hasOwnProperty.call(a, b);
	    }

	    function isObjectEmpty(obj) {
	        if (Object.getOwnPropertyNames) {
	            return Object.getOwnPropertyNames(obj).length === 0;
	        } else {
	            var k;
	            for (k in obj) {
	                if (hasOwnProp(obj, k)) {
	                    return false;
	                }
	            }
	            return true;
	        }
	    }

	    function isUndefined(input) {
	        return input === void 0;
	    }

	    function isNumber(input) {
	        return (
	            typeof input === 'number' ||
	            Object.prototype.toString.call(input) === '[object Number]'
	        );
	    }

	    function isDate(input) {
	        return (
	            input instanceof Date ||
	            Object.prototype.toString.call(input) === '[object Date]'
	        );
	    }

	    function map(arr, fn) {
	        var res = [],
	            i;
	        for (i = 0; i < arr.length; ++i) {
	            res.push(fn(arr[i], i));
	        }
	        return res;
	    }

	    function extend(a, b) {
	        for (var i in b) {
	            if (hasOwnProp(b, i)) {
	                a[i] = b[i];
	            }
	        }

	        if (hasOwnProp(b, 'toString')) {
	            a.toString = b.toString;
	        }

	        if (hasOwnProp(b, 'valueOf')) {
	            a.valueOf = b.valueOf;
	        }

	        return a;
	    }

	    function createUTC(input, format, locale, strict) {
	        return createLocalOrUTC(input, format, locale, strict, true).utc();
	    }

	    function defaultParsingFlags() {
	        // We need to deep clone this object.
	        return {
	            empty: false,
	            unusedTokens: [],
	            unusedInput: [],
	            overflow: -2,
	            charsLeftOver: 0,
	            nullInput: false,
	            invalidEra: null,
	            invalidMonth: null,
	            invalidFormat: false,
	            userInvalidated: false,
	            iso: false,
	            parsedDateParts: [],
	            era: null,
	            meridiem: null,
	            rfc2822: false,
	            weekdayMismatch: false,
	        };
	    }

	    function getParsingFlags(m) {
	        if (m._pf == null) {
	            m._pf = defaultParsingFlags();
	        }
	        return m._pf;
	    }

	    var some;
	    if (Array.prototype.some) {
	        some = Array.prototype.some;
	    } else {
	        some = function (fun) {
	            var t = Object(this),
	                len = t.length >>> 0,
	                i;

	            for (i = 0; i < len; i++) {
	                if (i in t && fun.call(this, t[i], i, t)) {
	                    return true;
	                }
	            }

	            return false;
	        };
	    }

	    function isValid(m) {
	        if (m._isValid == null) {
	            var flags = getParsingFlags(m),
	                parsedParts = some.call(flags.parsedDateParts, function (i) {
	                    return i != null;
	                }),
	                isNowValid =
	                    !isNaN(m._d.getTime()) &&
	                    flags.overflow < 0 &&
	                    !flags.empty &&
	                    !flags.invalidEra &&
	                    !flags.invalidMonth &&
	                    !flags.invalidWeekday &&
	                    !flags.weekdayMismatch &&
	                    !flags.nullInput &&
	                    !flags.invalidFormat &&
	                    !flags.userInvalidated &&
	                    (!flags.meridiem || (flags.meridiem && parsedParts));

	            if (m._strict) {
	                isNowValid =
	                    isNowValid &&
	                    flags.charsLeftOver === 0 &&
	                    flags.unusedTokens.length === 0 &&
	                    flags.bigHour === undefined;
	            }

	            if (Object.isFrozen == null || !Object.isFrozen(m)) {
	                m._isValid = isNowValid;
	            } else {
	                return isNowValid;
	            }
	        }
	        return m._isValid;
	    }

	    function createInvalid(flags) {
	        var m = createUTC(NaN);
	        if (flags != null) {
	            extend(getParsingFlags(m), flags);
	        } else {
	            getParsingFlags(m).userInvalidated = true;
	        }

	        return m;
	    }

	    // Plugins that add properties should also add the key here (null value),
	    // so we can properly clone ourselves.
	    var momentProperties = (hooks.momentProperties = []),
	        updateInProgress = false;

	    function copyConfig(to, from) {
	        var i, prop, val;

	        if (!isUndefined(from._isAMomentObject)) {
	            to._isAMomentObject = from._isAMomentObject;
	        }
	        if (!isUndefined(from._i)) {
	            to._i = from._i;
	        }
	        if (!isUndefined(from._f)) {
	            to._f = from._f;
	        }
	        if (!isUndefined(from._l)) {
	            to._l = from._l;
	        }
	        if (!isUndefined(from._strict)) {
	            to._strict = from._strict;
	        }
	        if (!isUndefined(from._tzm)) {
	            to._tzm = from._tzm;
	        }
	        if (!isUndefined(from._isUTC)) {
	            to._isUTC = from._isUTC;
	        }
	        if (!isUndefined(from._offset)) {
	            to._offset = from._offset;
	        }
	        if (!isUndefined(from._pf)) {
	            to._pf = getParsingFlags(from);
	        }
	        if (!isUndefined(from._locale)) {
	            to._locale = from._locale;
	        }

	        if (momentProperties.length > 0) {
	            for (i = 0; i < momentProperties.length; i++) {
	                prop = momentProperties[i];
	                val = from[prop];
	                if (!isUndefined(val)) {
	                    to[prop] = val;
	                }
	            }
	        }

	        return to;
	    }

	    // Moment prototype object
	    function Moment(config) {
	        copyConfig(this, config);
	        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
	        if (!this.isValid()) {
	            this._d = new Date(NaN);
	        }
	        // Prevent infinite loop in case updateOffset creates new moment
	        // objects.
	        if (updateInProgress === false) {
	            updateInProgress = true;
	            hooks.updateOffset(this);
	            updateInProgress = false;
	        }
	    }

	    function isMoment(obj) {
	        return (
	            obj instanceof Moment || (obj != null && obj._isAMomentObject != null)
	        );
	    }

	    function warn(msg) {
	        if (
	            hooks.suppressDeprecationWarnings === false &&
	            typeof console !== 'undefined' &&
	            console.warn
	        ) {
	            console.warn('Deprecation warning: ' + msg);
	        }
	    }

	    function deprecate(msg, fn) {
	        var firstTime = true;

	        return extend(function () {
	            if (hooks.deprecationHandler != null) {
	                hooks.deprecationHandler(null, msg);
	            }
	            if (firstTime) {
	                var args = [],
	                    arg,
	                    i,
	                    key;
	                for (i = 0; i < arguments.length; i++) {
	                    arg = '';
	                    if (typeof arguments[i] === 'object') {
	                        arg += '\n[' + i + '] ';
	                        for (key in arguments[0]) {
	                            if (hasOwnProp(arguments[0], key)) {
	                                arg += key + ': ' + arguments[0][key] + ', ';
	                            }
	                        }
	                        arg = arg.slice(0, -2); // Remove trailing comma and space
	                    } else {
	                        arg = arguments[i];
	                    }
	                    args.push(arg);
	                }
	                warn(
	                    msg +
	                        '\nArguments: ' +
	                        Array.prototype.slice.call(args).join('') +
	                        '\n' +
	                        new Error().stack
	                );
	                firstTime = false;
	            }
	            return fn.apply(this, arguments);
	        }, fn);
	    }

	    var deprecations = {};

	    function deprecateSimple(name, msg) {
	        if (hooks.deprecationHandler != null) {
	            hooks.deprecationHandler(name, msg);
	        }
	        if (!deprecations[name]) {
	            warn(msg);
	            deprecations[name] = true;
	        }
	    }

	    hooks.suppressDeprecationWarnings = false;
	    hooks.deprecationHandler = null;

	    function isFunction(input) {
	        return (
	            (typeof Function !== 'undefined' && input instanceof Function) ||
	            Object.prototype.toString.call(input) === '[object Function]'
	        );
	    }

	    function set(config) {
	        var prop, i;
	        for (i in config) {
	            if (hasOwnProp(config, i)) {
	                prop = config[i];
	                if (isFunction(prop)) {
	                    this[i] = prop;
	                } else {
	                    this['_' + i] = prop;
	                }
	            }
	        }
	        this._config = config;
	        // Lenient ordinal parsing accepts just a number in addition to
	        // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
	        // TODO: Remove "ordinalParse" fallback in next major release.
	        this._dayOfMonthOrdinalParseLenient = new RegExp(
	            (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
	                '|' +
	                /\d{1,2}/.source
	        );
	    }

	    function mergeConfigs(parentConfig, childConfig) {
	        var res = extend({}, parentConfig),
	            prop;
	        for (prop in childConfig) {
	            if (hasOwnProp(childConfig, prop)) {
	                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
	                    res[prop] = {};
	                    extend(res[prop], parentConfig[prop]);
	                    extend(res[prop], childConfig[prop]);
	                } else if (childConfig[prop] != null) {
	                    res[prop] = childConfig[prop];
	                } else {
	                    delete res[prop];
	                }
	            }
	        }
	        for (prop in parentConfig) {
	            if (
	                hasOwnProp(parentConfig, prop) &&
	                !hasOwnProp(childConfig, prop) &&
	                isObject(parentConfig[prop])
	            ) {
	                // make sure changes to properties don't modify parent config
	                res[prop] = extend({}, res[prop]);
	            }
	        }
	        return res;
	    }

	    function Locale(config) {
	        if (config != null) {
	            this.set(config);
	        }
	    }

	    var keys;

	    if (Object.keys) {
	        keys = Object.keys;
	    } else {
	        keys = function (obj) {
	            var i,
	                res = [];
	            for (i in obj) {
	                if (hasOwnProp(obj, i)) {
	                    res.push(i);
	                }
	            }
	            return res;
	        };
	    }

	    var defaultCalendar = {
	        sameDay: '[Today at] LT',
	        nextDay: '[Tomorrow at] LT',
	        nextWeek: 'dddd [at] LT',
	        lastDay: '[Yesterday at] LT',
	        lastWeek: '[Last] dddd [at] LT',
	        sameElse: 'L',
	    };

	    function calendar(key, mom, now) {
	        var output = this._calendar[key] || this._calendar['sameElse'];
	        return isFunction(output) ? output.call(mom, now) : output;
	    }

	    function zeroFill(number, targetLength, forceSign) {
	        var absNumber = '' + Math.abs(number),
	            zerosToFill = targetLength - absNumber.length,
	            sign = number >= 0;
	        return (
	            (sign ? (forceSign ? '+' : '') : '-') +
	            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) +
	            absNumber
	        );
	    }

	    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
	        localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
	        formatFunctions = {},
	        formatTokenFunctions = {};

	    // token:    'M'
	    // padded:   ['MM', 2]
	    // ordinal:  'Mo'
	    // callback: function () { this.month() + 1 }
	    function addFormatToken(token, padded, ordinal, callback) {
	        var func = callback;
	        if (typeof callback === 'string') {
	            func = function () {
	                return this[callback]();
	            };
	        }
	        if (token) {
	            formatTokenFunctions[token] = func;
	        }
	        if (padded) {
	            formatTokenFunctions[padded[0]] = function () {
	                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
	            };
	        }
	        if (ordinal) {
	            formatTokenFunctions[ordinal] = function () {
	                return this.localeData().ordinal(
	                    func.apply(this, arguments),
	                    token
	                );
	            };
	        }
	    }

	    function removeFormattingTokens(input) {
	        if (input.match(/\[[\s\S]/)) {
	            return input.replace(/^\[|\]$/g, '');
	        }
	        return input.replace(/\\/g, '');
	    }

	    function makeFormatFunction(format) {
	        var array = format.match(formattingTokens),
	            i,
	            length;

	        for (i = 0, length = array.length; i < length; i++) {
	            if (formatTokenFunctions[array[i]]) {
	                array[i] = formatTokenFunctions[array[i]];
	            } else {
	                array[i] = removeFormattingTokens(array[i]);
	            }
	        }

	        return function (mom) {
	            var output = '',
	                i;
	            for (i = 0; i < length; i++) {
	                output += isFunction(array[i])
	                    ? array[i].call(mom, format)
	                    : array[i];
	            }
	            return output;
	        };
	    }

	    // format date using native date object
	    function formatMoment(m, format) {
	        if (!m.isValid()) {
	            return m.localeData().invalidDate();
	        }

	        format = expandFormat(format, m.localeData());
	        formatFunctions[format] =
	            formatFunctions[format] || makeFormatFunction(format);

	        return formatFunctions[format](m);
	    }

	    function expandFormat(format, locale) {
	        var i = 5;

	        function replaceLongDateFormatTokens(input) {
	            return locale.longDateFormat(input) || input;
	        }

	        localFormattingTokens.lastIndex = 0;
	        while (i >= 0 && localFormattingTokens.test(format)) {
	            format = format.replace(
	                localFormattingTokens,
	                replaceLongDateFormatTokens
	            );
	            localFormattingTokens.lastIndex = 0;
	            i -= 1;
	        }

	        return format;
	    }

	    var defaultLongDateFormat = {
	        LTS: 'h:mm:ss A',
	        LT: 'h:mm A',
	        L: 'MM/DD/YYYY',
	        LL: 'MMMM D, YYYY',
	        LLL: 'MMMM D, YYYY h:mm A',
	        LLLL: 'dddd, MMMM D, YYYY h:mm A',
	    };

	    function longDateFormat(key) {
	        var format = this._longDateFormat[key],
	            formatUpper = this._longDateFormat[key.toUpperCase()];

	        if (format || !formatUpper) {
	            return format;
	        }

	        this._longDateFormat[key] = formatUpper
	            .match(formattingTokens)
	            .map(function (tok) {
	                if (
	                    tok === 'MMMM' ||
	                    tok === 'MM' ||
	                    tok === 'DD' ||
	                    tok === 'dddd'
	                ) {
	                    return tok.slice(1);
	                }
	                return tok;
	            })
	            .join('');

	        return this._longDateFormat[key];
	    }

	    var defaultInvalidDate = 'Invalid date';

	    function invalidDate() {
	        return this._invalidDate;
	    }

	    var defaultOrdinal = '%d',
	        defaultDayOfMonthOrdinalParse = /\d{1,2}/;

	    function ordinal(number) {
	        return this._ordinal.replace('%d', number);
	    }

	    var defaultRelativeTime = {
	        future: 'in %s',
	        past: '%s ago',
	        s: 'a few seconds',
	        ss: '%d seconds',
	        m: 'a minute',
	        mm: '%d minutes',
	        h: 'an hour',
	        hh: '%d hours',
	        d: 'a day',
	        dd: '%d days',
	        w: 'a week',
	        ww: '%d weeks',
	        M: 'a month',
	        MM: '%d months',
	        y: 'a year',
	        yy: '%d years',
	    };

	    function relativeTime(number, withoutSuffix, string, isFuture) {
	        var output = this._relativeTime[string];
	        return isFunction(output)
	            ? output(number, withoutSuffix, string, isFuture)
	            : output.replace(/%d/i, number);
	    }

	    function pastFuture(diff, output) {
	        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
	        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
	    }

	    var aliases = {};

	    function addUnitAlias(unit, shorthand) {
	        var lowerCase = unit.toLowerCase();
	        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
	    }

	    function normalizeUnits(units) {
	        return typeof units === 'string'
	            ? aliases[units] || aliases[units.toLowerCase()]
	            : undefined;
	    }

	    function normalizeObjectUnits(inputObject) {
	        var normalizedInput = {},
	            normalizedProp,
	            prop;

	        for (prop in inputObject) {
	            if (hasOwnProp(inputObject, prop)) {
	                normalizedProp = normalizeUnits(prop);
	                if (normalizedProp) {
	                    normalizedInput[normalizedProp] = inputObject[prop];
	                }
	            }
	        }

	        return normalizedInput;
	    }

	    var priorities = {};

	    function addUnitPriority(unit, priority) {
	        priorities[unit] = priority;
	    }

	    function getPrioritizedUnits(unitsObj) {
	        var units = [],
	            u;
	        for (u in unitsObj) {
	            if (hasOwnProp(unitsObj, u)) {
	                units.push({ unit: u, priority: priorities[u] });
	            }
	        }
	        units.sort(function (a, b) {
	            return a.priority - b.priority;
	        });
	        return units;
	    }

	    function isLeapYear(year) {
	        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
	    }

	    function absFloor(number) {
	        if (number < 0) {
	            // -0 -> 0
	            return Math.ceil(number) || 0;
	        } else {
	            return Math.floor(number);
	        }
	    }

	    function toInt(argumentForCoercion) {
	        var coercedNumber = +argumentForCoercion,
	            value = 0;

	        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
	            value = absFloor(coercedNumber);
	        }

	        return value;
	    }

	    function makeGetSet(unit, keepTime) {
	        return function (value) {
	            if (value != null) {
	                set$1(this, unit, value);
	                hooks.updateOffset(this, keepTime);
	                return this;
	            } else {
	                return get(this, unit);
	            }
	        };
	    }

	    function get(mom, unit) {
	        return mom.isValid()
	            ? mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]()
	            : NaN;
	    }

	    function set$1(mom, unit, value) {
	        if (mom.isValid() && !isNaN(value)) {
	            if (
	                unit === 'FullYear' &&
	                isLeapYear(mom.year()) &&
	                mom.month() === 1 &&
	                mom.date() === 29
	            ) {
	                value = toInt(value);
	                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](
	                    value,
	                    mom.month(),
	                    daysInMonth(value, mom.month())
	                );
	            } else {
	                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
	            }
	        }
	    }

	    // MOMENTS

	    function stringGet(units) {
	        units = normalizeUnits(units);
	        if (isFunction(this[units])) {
	            return this[units]();
	        }
	        return this;
	    }

	    function stringSet(units, value) {
	        if (typeof units === 'object') {
	            units = normalizeObjectUnits(units);
	            var prioritized = getPrioritizedUnits(units),
	                i;
	            for (i = 0; i < prioritized.length; i++) {
	                this[prioritized[i].unit](units[prioritized[i].unit]);
	            }
	        } else {
	            units = normalizeUnits(units);
	            if (isFunction(this[units])) {
	                return this[units](value);
	            }
	        }
	        return this;
	    }

	    var match1 = /\d/, //       0 - 9
	        match2 = /\d\d/, //      00 - 99
	        match3 = /\d{3}/, //     000 - 999
	        match4 = /\d{4}/, //    0000 - 9999
	        match6 = /[+-]?\d{6}/, // -999999 - 999999
	        match1to2 = /\d\d?/, //       0 - 99
	        match3to4 = /\d\d\d\d?/, //     999 - 9999
	        match5to6 = /\d\d\d\d\d\d?/, //   99999 - 999999
	        match1to3 = /\d{1,3}/, //       0 - 999
	        match1to4 = /\d{1,4}/, //       0 - 9999
	        match1to6 = /[+-]?\d{1,6}/, // -999999 - 999999
	        matchUnsigned = /\d+/, //       0 - inf
	        matchSigned = /[+-]?\d+/, //    -inf - inf
	        matchOffset = /Z|[+-]\d\d:?\d\d/gi, // +00:00 -00:00 +0000 -0000 or Z
	        matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, // +00 -00 +00:00 -00:00 +0000 -0000 or Z
	        matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123
	        // any word (or two) characters or numbers including two/three word month in arabic.
	        // includes scottish gaelic two word and hyphenated months
	        matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
	        regexes;

	    regexes = {};

	    function addRegexToken(token, regex, strictRegex) {
	        regexes[token] = isFunction(regex)
	            ? regex
	            : function (isStrict, localeData) {
	                  return isStrict && strictRegex ? strictRegex : regex;
	              };
	    }

	    function getParseRegexForToken(token, config) {
	        if (!hasOwnProp(regexes, token)) {
	            return new RegExp(unescapeFormat(token));
	        }

	        return regexes[token](config._strict, config._locale);
	    }

	    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
	    function unescapeFormat(s) {
	        return regexEscape(
	            s
	                .replace('\\', '')
	                .replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (
	                    matched,
	                    p1,
	                    p2,
	                    p3,
	                    p4
	                ) {
	                    return p1 || p2 || p3 || p4;
	                })
	        );
	    }

	    function regexEscape(s) {
	        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	    }

	    var tokens = {};

	    function addParseToken(token, callback) {
	        var i,
	            func = callback;
	        if (typeof token === 'string') {
	            token = [token];
	        }
	        if (isNumber(callback)) {
	            func = function (input, array) {
	                array[callback] = toInt(input);
	            };
	        }
	        for (i = 0; i < token.length; i++) {
	            tokens[token[i]] = func;
	        }
	    }

	    function addWeekParseToken(token, callback) {
	        addParseToken(token, function (input, array, config, token) {
	            config._w = config._w || {};
	            callback(input, config._w, config, token);
	        });
	    }

	    function addTimeToArrayFromToken(token, input, config) {
	        if (input != null && hasOwnProp(tokens, token)) {
	            tokens[token](input, config._a, config, token);
	        }
	    }

	    var YEAR = 0,
	        MONTH = 1,
	        DATE = 2,
	        HOUR = 3,
	        MINUTE = 4,
	        SECOND = 5,
	        MILLISECOND = 6,
	        WEEK = 7,
	        WEEKDAY = 8;

	    function mod(n, x) {
	        return ((n % x) + x) % x;
	    }

	    var indexOf;

	    if (Array.prototype.indexOf) {
	        indexOf = Array.prototype.indexOf;
	    } else {
	        indexOf = function (o) {
	            // I know
	            var i;
	            for (i = 0; i < this.length; ++i) {
	                if (this[i] === o) {
	                    return i;
	                }
	            }
	            return -1;
	        };
	    }

	    function daysInMonth(year, month) {
	        if (isNaN(year) || isNaN(month)) {
	            return NaN;
	        }
	        var modMonth = mod(month, 12);
	        year += (month - modMonth) / 12;
	        return modMonth === 1
	            ? isLeapYear(year)
	                ? 29
	                : 28
	            : 31 - ((modMonth % 7) % 2);
	    }

	    // FORMATTING

	    addFormatToken('M', ['MM', 2], 'Mo', function () {
	        return this.month() + 1;
	    });

	    addFormatToken('MMM', 0, 0, function (format) {
	        return this.localeData().monthsShort(this, format);
	    });

	    addFormatToken('MMMM', 0, 0, function (format) {
	        return this.localeData().months(this, format);
	    });

	    // ALIASES

	    addUnitAlias('month', 'M');

	    // PRIORITY

	    addUnitPriority('month', 8);

	    // PARSING

	    addRegexToken('M', match1to2);
	    addRegexToken('MM', match1to2, match2);
	    addRegexToken('MMM', function (isStrict, locale) {
	        return locale.monthsShortRegex(isStrict);
	    });
	    addRegexToken('MMMM', function (isStrict, locale) {
	        return locale.monthsRegex(isStrict);
	    });

	    addParseToken(['M', 'MM'], function (input, array) {
	        array[MONTH] = toInt(input) - 1;
	    });

	    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
	        var month = config._locale.monthsParse(input, token, config._strict);
	        // if we didn't find a month name, mark the date as invalid.
	        if (month != null) {
	            array[MONTH] = month;
	        } else {
	            getParsingFlags(config).invalidMonth = input;
	        }
	    });

	    // LOCALES

	    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split(
	            '_'
	        ),
	        defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split(
	            '_'
	        ),
	        MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
	        defaultMonthsShortRegex = matchWord,
	        defaultMonthsRegex = matchWord;

	    function localeMonths(m, format) {
	        if (!m) {
	            return isArray(this._months)
	                ? this._months
	                : this._months['standalone'];
	        }
	        return isArray(this._months)
	            ? this._months[m.month()]
	            : this._months[
	                  (this._months.isFormat || MONTHS_IN_FORMAT).test(format)
	                      ? 'format'
	                      : 'standalone'
	              ][m.month()];
	    }

	    function localeMonthsShort(m, format) {
	        if (!m) {
	            return isArray(this._monthsShort)
	                ? this._monthsShort
	                : this._monthsShort['standalone'];
	        }
	        return isArray(this._monthsShort)
	            ? this._monthsShort[m.month()]
	            : this._monthsShort[
	                  MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'
	              ][m.month()];
	    }

	    function handleStrictParse(monthName, format, strict) {
	        var i,
	            ii,
	            mom,
	            llc = monthName.toLocaleLowerCase();
	        if (!this._monthsParse) {
	            // this is not used
	            this._monthsParse = [];
	            this._longMonthsParse = [];
	            this._shortMonthsParse = [];
	            for (i = 0; i < 12; ++i) {
	                mom = createUTC([2000, i]);
	                this._shortMonthsParse[i] = this.monthsShort(
	                    mom,
	                    ''
	                ).toLocaleLowerCase();
	                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
	            }
	        }

	        if (strict) {
	            if (format === 'MMM') {
	                ii = indexOf.call(this._shortMonthsParse, llc);
	                return ii !== -1 ? ii : null;
	            } else {
	                ii = indexOf.call(this._longMonthsParse, llc);
	                return ii !== -1 ? ii : null;
	            }
	        } else {
	            if (format === 'MMM') {
	                ii = indexOf.call(this._shortMonthsParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._longMonthsParse, llc);
	                return ii !== -1 ? ii : null;
	            } else {
	                ii = indexOf.call(this._longMonthsParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._shortMonthsParse, llc);
	                return ii !== -1 ? ii : null;
	            }
	        }
	    }

	    function localeMonthsParse(monthName, format, strict) {
	        var i, mom, regex;

	        if (this._monthsParseExact) {
	            return handleStrictParse.call(this, monthName, format, strict);
	        }

	        if (!this._monthsParse) {
	            this._monthsParse = [];
	            this._longMonthsParse = [];
	            this._shortMonthsParse = [];
	        }

	        // TODO: add sorting
	        // Sorting makes sure if one month (or abbr) is a prefix of another
	        // see sorting in computeMonthsParse
	        for (i = 0; i < 12; i++) {
	            // make the regex if we don't have it already
	            mom = createUTC([2000, i]);
	            if (strict && !this._longMonthsParse[i]) {
	                this._longMonthsParse[i] = new RegExp(
	                    '^' + this.months(mom, '').replace('.', '') + '$',
	                    'i'
	                );
	                this._shortMonthsParse[i] = new RegExp(
	                    '^' + this.monthsShort(mom, '').replace('.', '') + '$',
	                    'i'
	                );
	            }
	            if (!strict && !this._monthsParse[i]) {
	                regex =
	                    '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
	                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
	            }
	            // test the regex
	            if (
	                strict &&
	                format === 'MMMM' &&
	                this._longMonthsParse[i].test(monthName)
	            ) {
	                return i;
	            } else if (
	                strict &&
	                format === 'MMM' &&
	                this._shortMonthsParse[i].test(monthName)
	            ) {
	                return i;
	            } else if (!strict && this._monthsParse[i].test(monthName)) {
	                return i;
	            }
	        }
	    }

	    // MOMENTS

	    function setMonth(mom, value) {
	        var dayOfMonth;

	        if (!mom.isValid()) {
	            // No op
	            return mom;
	        }

	        if (typeof value === 'string') {
	            if (/^\d+$/.test(value)) {
	                value = toInt(value);
	            } else {
	                value = mom.localeData().monthsParse(value);
	                // TODO: Another silent failure?
	                if (!isNumber(value)) {
	                    return mom;
	                }
	            }
	        }

	        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
	        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
	        return mom;
	    }

	    function getSetMonth(value) {
	        if (value != null) {
	            setMonth(this, value);
	            hooks.updateOffset(this, true);
	            return this;
	        } else {
	            return get(this, 'Month');
	        }
	    }

	    function getDaysInMonth() {
	        return daysInMonth(this.year(), this.month());
	    }

	    function monthsShortRegex(isStrict) {
	        if (this._monthsParseExact) {
	            if (!hasOwnProp(this, '_monthsRegex')) {
	                computeMonthsParse.call(this);
	            }
	            if (isStrict) {
	                return this._monthsShortStrictRegex;
	            } else {
	                return this._monthsShortRegex;
	            }
	        } else {
	            if (!hasOwnProp(this, '_monthsShortRegex')) {
	                this._monthsShortRegex = defaultMonthsShortRegex;
	            }
	            return this._monthsShortStrictRegex && isStrict
	                ? this._monthsShortStrictRegex
	                : this._monthsShortRegex;
	        }
	    }

	    function monthsRegex(isStrict) {
	        if (this._monthsParseExact) {
	            if (!hasOwnProp(this, '_monthsRegex')) {
	                computeMonthsParse.call(this);
	            }
	            if (isStrict) {
	                return this._monthsStrictRegex;
	            } else {
	                return this._monthsRegex;
	            }
	        } else {
	            if (!hasOwnProp(this, '_monthsRegex')) {
	                this._monthsRegex = defaultMonthsRegex;
	            }
	            return this._monthsStrictRegex && isStrict
	                ? this._monthsStrictRegex
	                : this._monthsRegex;
	        }
	    }

	    function computeMonthsParse() {
	        function cmpLenRev(a, b) {
	            return b.length - a.length;
	        }

	        var shortPieces = [],
	            longPieces = [],
	            mixedPieces = [],
	            i,
	            mom;
	        for (i = 0; i < 12; i++) {
	            // make the regex if we don't have it already
	            mom = createUTC([2000, i]);
	            shortPieces.push(this.monthsShort(mom, ''));
	            longPieces.push(this.months(mom, ''));
	            mixedPieces.push(this.months(mom, ''));
	            mixedPieces.push(this.monthsShort(mom, ''));
	        }
	        // Sorting makes sure if one month (or abbr) is a prefix of another it
	        // will match the longer piece.
	        shortPieces.sort(cmpLenRev);
	        longPieces.sort(cmpLenRev);
	        mixedPieces.sort(cmpLenRev);
	        for (i = 0; i < 12; i++) {
	            shortPieces[i] = regexEscape(shortPieces[i]);
	            longPieces[i] = regexEscape(longPieces[i]);
	        }
	        for (i = 0; i < 24; i++) {
	            mixedPieces[i] = regexEscape(mixedPieces[i]);
	        }

	        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
	        this._monthsShortRegex = this._monthsRegex;
	        this._monthsStrictRegex = new RegExp(
	            '^(' + longPieces.join('|') + ')',
	            'i'
	        );
	        this._monthsShortStrictRegex = new RegExp(
	            '^(' + shortPieces.join('|') + ')',
	            'i'
	        );
	    }

	    // FORMATTING

	    addFormatToken('Y', 0, 0, function () {
	        var y = this.year();
	        return y <= 9999 ? zeroFill(y, 4) : '+' + y;
	    });

	    addFormatToken(0, ['YY', 2], 0, function () {
	        return this.year() % 100;
	    });

	    addFormatToken(0, ['YYYY', 4], 0, 'year');
	    addFormatToken(0, ['YYYYY', 5], 0, 'year');
	    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

	    // ALIASES

	    addUnitAlias('year', 'y');

	    // PRIORITIES

	    addUnitPriority('year', 1);

	    // PARSING

	    addRegexToken('Y', matchSigned);
	    addRegexToken('YY', match1to2, match2);
	    addRegexToken('YYYY', match1to4, match4);
	    addRegexToken('YYYYY', match1to6, match6);
	    addRegexToken('YYYYYY', match1to6, match6);

	    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
	    addParseToken('YYYY', function (input, array) {
	        array[YEAR] =
	            input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
	    });
	    addParseToken('YY', function (input, array) {
	        array[YEAR] = hooks.parseTwoDigitYear(input);
	    });
	    addParseToken('Y', function (input, array) {
	        array[YEAR] = parseInt(input, 10);
	    });

	    // HELPERS

	    function daysInYear(year) {
	        return isLeapYear(year) ? 366 : 365;
	    }

	    // HOOKS

	    hooks.parseTwoDigitYear = function (input) {
	        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
	    };

	    // MOMENTS

	    var getSetYear = makeGetSet('FullYear', true);

	    function getIsLeapYear() {
	        return isLeapYear(this.year());
	    }

	    function createDate(y, m, d, h, M, s, ms) {
	        // can't just apply() to create a date:
	        // https://stackoverflow.com/q/181348
	        var date;
	        // the date constructor remaps years 0-99 to 1900-1999
	        if (y < 100 && y >= 0) {
	            // preserve leap years using a full 400 year cycle, then reset
	            date = new Date(y + 400, m, d, h, M, s, ms);
	            if (isFinite(date.getFullYear())) {
	                date.setFullYear(y);
	            }
	        } else {
	            date = new Date(y, m, d, h, M, s, ms);
	        }

	        return date;
	    }

	    function createUTCDate(y) {
	        var date, args;
	        // the Date.UTC function remaps years 0-99 to 1900-1999
	        if (y < 100 && y >= 0) {
	            args = Array.prototype.slice.call(arguments);
	            // preserve leap years using a full 400 year cycle, then reset
	            args[0] = y + 400;
	            date = new Date(Date.UTC.apply(null, args));
	            if (isFinite(date.getUTCFullYear())) {
	                date.setUTCFullYear(y);
	            }
	        } else {
	            date = new Date(Date.UTC.apply(null, arguments));
	        }

	        return date;
	    }

	    // start-of-first-week - start-of-year
	    function firstWeekOffset(year, dow, doy) {
	        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
	            fwd = 7 + dow - doy,
	            // first-week day local weekday -- which local weekday is fwd
	            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

	        return -fwdlw + fwd - 1;
	    }

	    // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
	    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
	        var localWeekday = (7 + weekday - dow) % 7,
	            weekOffset = firstWeekOffset(year, dow, doy),
	            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
	            resYear,
	            resDayOfYear;

	        if (dayOfYear <= 0) {
	            resYear = year - 1;
	            resDayOfYear = daysInYear(resYear) + dayOfYear;
	        } else if (dayOfYear > daysInYear(year)) {
	            resYear = year + 1;
	            resDayOfYear = dayOfYear - daysInYear(year);
	        } else {
	            resYear = year;
	            resDayOfYear = dayOfYear;
	        }

	        return {
	            year: resYear,
	            dayOfYear: resDayOfYear,
	        };
	    }

	    function weekOfYear(mom, dow, doy) {
	        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
	            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
	            resWeek,
	            resYear;

	        if (week < 1) {
	            resYear = mom.year() - 1;
	            resWeek = week + weeksInYear(resYear, dow, doy);
	        } else if (week > weeksInYear(mom.year(), dow, doy)) {
	            resWeek = week - weeksInYear(mom.year(), dow, doy);
	            resYear = mom.year() + 1;
	        } else {
	            resYear = mom.year();
	            resWeek = week;
	        }

	        return {
	            week: resWeek,
	            year: resYear,
	        };
	    }

	    function weeksInYear(year, dow, doy) {
	        var weekOffset = firstWeekOffset(year, dow, doy),
	            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
	        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
	    }

	    // FORMATTING

	    addFormatToken('w', ['ww', 2], 'wo', 'week');
	    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

	    // ALIASES

	    addUnitAlias('week', 'w');
	    addUnitAlias('isoWeek', 'W');

	    // PRIORITIES

	    addUnitPriority('week', 5);
	    addUnitPriority('isoWeek', 5);

	    // PARSING

	    addRegexToken('w', match1to2);
	    addRegexToken('ww', match1to2, match2);
	    addRegexToken('W', match1to2);
	    addRegexToken('WW', match1to2, match2);

	    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (
	        input,
	        week,
	        config,
	        token
	    ) {
	        week[token.substr(0, 1)] = toInt(input);
	    });

	    // HELPERS

	    // LOCALES

	    function localeWeek(mom) {
	        return weekOfYear(mom, this._week.dow, this._week.doy).week;
	    }

	    var defaultLocaleWeek = {
	        dow: 0, // Sunday is the first day of the week.
	        doy: 6, // The week that contains Jan 6th is the first week of the year.
	    };

	    function localeFirstDayOfWeek() {
	        return this._week.dow;
	    }

	    function localeFirstDayOfYear() {
	        return this._week.doy;
	    }

	    // MOMENTS

	    function getSetWeek(input) {
	        var week = this.localeData().week(this);
	        return input == null ? week : this.add((input - week) * 7, 'd');
	    }

	    function getSetISOWeek(input) {
	        var week = weekOfYear(this, 1, 4).week;
	        return input == null ? week : this.add((input - week) * 7, 'd');
	    }

	    // FORMATTING

	    addFormatToken('d', 0, 'do', 'day');

	    addFormatToken('dd', 0, 0, function (format) {
	        return this.localeData().weekdaysMin(this, format);
	    });

	    addFormatToken('ddd', 0, 0, function (format) {
	        return this.localeData().weekdaysShort(this, format);
	    });

	    addFormatToken('dddd', 0, 0, function (format) {
	        return this.localeData().weekdays(this, format);
	    });

	    addFormatToken('e', 0, 0, 'weekday');
	    addFormatToken('E', 0, 0, 'isoWeekday');

	    // ALIASES

	    addUnitAlias('day', 'd');
	    addUnitAlias('weekday', 'e');
	    addUnitAlias('isoWeekday', 'E');

	    // PRIORITY
	    addUnitPriority('day', 11);
	    addUnitPriority('weekday', 11);
	    addUnitPriority('isoWeekday', 11);

	    // PARSING

	    addRegexToken('d', match1to2);
	    addRegexToken('e', match1to2);
	    addRegexToken('E', match1to2);
	    addRegexToken('dd', function (isStrict, locale) {
	        return locale.weekdaysMinRegex(isStrict);
	    });
	    addRegexToken('ddd', function (isStrict, locale) {
	        return locale.weekdaysShortRegex(isStrict);
	    });
	    addRegexToken('dddd', function (isStrict, locale) {
	        return locale.weekdaysRegex(isStrict);
	    });

	    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
	        var weekday = config._locale.weekdaysParse(input, token, config._strict);
	        // if we didn't get a weekday name, mark the date as invalid
	        if (weekday != null) {
	            week.d = weekday;
	        } else {
	            getParsingFlags(config).invalidWeekday = input;
	        }
	    });

	    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
	        week[token] = toInt(input);
	    });

	    // HELPERS

	    function parseWeekday(input, locale) {
	        if (typeof input !== 'string') {
	            return input;
	        }

	        if (!isNaN(input)) {
	            return parseInt(input, 10);
	        }

	        input = locale.weekdaysParse(input);
	        if (typeof input === 'number') {
	            return input;
	        }

	        return null;
	    }

	    function parseIsoWeekday(input, locale) {
	        if (typeof input === 'string') {
	            return locale.weekdaysParse(input) % 7 || 7;
	        }
	        return isNaN(input) ? null : input;
	    }

	    // LOCALES
	    function shiftWeekdays(ws, n) {
	        return ws.slice(n, 7).concat(ws.slice(0, n));
	    }

	    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split(
	            '_'
	        ),
	        defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	        defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	        defaultWeekdaysRegex = matchWord,
	        defaultWeekdaysShortRegex = matchWord,
	        defaultWeekdaysMinRegex = matchWord;

	    function localeWeekdays(m, format) {
	        var weekdays = isArray(this._weekdays)
	            ? this._weekdays
	            : this._weekdays[
	                  m && m !== true && this._weekdays.isFormat.test(format)
	                      ? 'format'
	                      : 'standalone'
	              ];
	        return m === true
	            ? shiftWeekdays(weekdays, this._week.dow)
	            : m
	            ? weekdays[m.day()]
	            : weekdays;
	    }

	    function localeWeekdaysShort(m) {
	        return m === true
	            ? shiftWeekdays(this._weekdaysShort, this._week.dow)
	            : m
	            ? this._weekdaysShort[m.day()]
	            : this._weekdaysShort;
	    }

	    function localeWeekdaysMin(m) {
	        return m === true
	            ? shiftWeekdays(this._weekdaysMin, this._week.dow)
	            : m
	            ? this._weekdaysMin[m.day()]
	            : this._weekdaysMin;
	    }

	    function handleStrictParse$1(weekdayName, format, strict) {
	        var i,
	            ii,
	            mom,
	            llc = weekdayName.toLocaleLowerCase();
	        if (!this._weekdaysParse) {
	            this._weekdaysParse = [];
	            this._shortWeekdaysParse = [];
	            this._minWeekdaysParse = [];

	            for (i = 0; i < 7; ++i) {
	                mom = createUTC([2000, 1]).day(i);
	                this._minWeekdaysParse[i] = this.weekdaysMin(
	                    mom,
	                    ''
	                ).toLocaleLowerCase();
	                this._shortWeekdaysParse[i] = this.weekdaysShort(
	                    mom,
	                    ''
	                ).toLocaleLowerCase();
	                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
	            }
	        }

	        if (strict) {
	            if (format === 'dddd') {
	                ii = indexOf.call(this._weekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            } else if (format === 'ddd') {
	                ii = indexOf.call(this._shortWeekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            } else {
	                ii = indexOf.call(this._minWeekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            }
	        } else {
	            if (format === 'dddd') {
	                ii = indexOf.call(this._weekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._shortWeekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._minWeekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            } else if (format === 'ddd') {
	                ii = indexOf.call(this._shortWeekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._weekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._minWeekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            } else {
	                ii = indexOf.call(this._minWeekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._weekdaysParse, llc);
	                if (ii !== -1) {
	                    return ii;
	                }
	                ii = indexOf.call(this._shortWeekdaysParse, llc);
	                return ii !== -1 ? ii : null;
	            }
	        }
	    }

	    function localeWeekdaysParse(weekdayName, format, strict) {
	        var i, mom, regex;

	        if (this._weekdaysParseExact) {
	            return handleStrictParse$1.call(this, weekdayName, format, strict);
	        }

	        if (!this._weekdaysParse) {
	            this._weekdaysParse = [];
	            this._minWeekdaysParse = [];
	            this._shortWeekdaysParse = [];
	            this._fullWeekdaysParse = [];
	        }

	        for (i = 0; i < 7; i++) {
	            // make the regex if we don't have it already

	            mom = createUTC([2000, 1]).day(i);
	            if (strict && !this._fullWeekdaysParse[i]) {
	                this._fullWeekdaysParse[i] = new RegExp(
	                    '^' + this.weekdays(mom, '').replace('.', '\\.?') + '$',
	                    'i'
	                );
	                this._shortWeekdaysParse[i] = new RegExp(
	                    '^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$',
	                    'i'
	                );
	                this._minWeekdaysParse[i] = new RegExp(
	                    '^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$',
	                    'i'
	                );
	            }
	            if (!this._weekdaysParse[i]) {
	                regex =
	                    '^' +
	                    this.weekdays(mom, '') +
	                    '|^' +
	                    this.weekdaysShort(mom, '') +
	                    '|^' +
	                    this.weekdaysMin(mom, '');
	                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
	            }
	            // test the regex
	            if (
	                strict &&
	                format === 'dddd' &&
	                this._fullWeekdaysParse[i].test(weekdayName)
	            ) {
	                return i;
	            } else if (
	                strict &&
	                format === 'ddd' &&
	                this._shortWeekdaysParse[i].test(weekdayName)
	            ) {
	                return i;
	            } else if (
	                strict &&
	                format === 'dd' &&
	                this._minWeekdaysParse[i].test(weekdayName)
	            ) {
	                return i;
	            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
	                return i;
	            }
	        }
	    }

	    // MOMENTS

	    function getSetDayOfWeek(input) {
	        if (!this.isValid()) {
	            return input != null ? this : NaN;
	        }
	        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
	        if (input != null) {
	            input = parseWeekday(input, this.localeData());
	            return this.add(input - day, 'd');
	        } else {
	            return day;
	        }
	    }

	    function getSetLocaleDayOfWeek(input) {
	        if (!this.isValid()) {
	            return input != null ? this : NaN;
	        }
	        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
	        return input == null ? weekday : this.add(input - weekday, 'd');
	    }

	    function getSetISODayOfWeek(input) {
	        if (!this.isValid()) {
	            return input != null ? this : NaN;
	        }

	        // behaves the same as moment#day except
	        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
	        // as a setter, sunday should belong to the previous week.

	        if (input != null) {
	            var weekday = parseIsoWeekday(input, this.localeData());
	            return this.day(this.day() % 7 ? weekday : weekday - 7);
	        } else {
	            return this.day() || 7;
	        }
	    }

	    function weekdaysRegex(isStrict) {
	        if (this._weekdaysParseExact) {
	            if (!hasOwnProp(this, '_weekdaysRegex')) {
	                computeWeekdaysParse.call(this);
	            }
	            if (isStrict) {
	                return this._weekdaysStrictRegex;
	            } else {
	                return this._weekdaysRegex;
	            }
	        } else {
	            if (!hasOwnProp(this, '_weekdaysRegex')) {
	                this._weekdaysRegex = defaultWeekdaysRegex;
	            }
	            return this._weekdaysStrictRegex && isStrict
	                ? this._weekdaysStrictRegex
	                : this._weekdaysRegex;
	        }
	    }

	    function weekdaysShortRegex(isStrict) {
	        if (this._weekdaysParseExact) {
	            if (!hasOwnProp(this, '_weekdaysRegex')) {
	                computeWeekdaysParse.call(this);
	            }
	            if (isStrict) {
	                return this._weekdaysShortStrictRegex;
	            } else {
	                return this._weekdaysShortRegex;
	            }
	        } else {
	            if (!hasOwnProp(this, '_weekdaysShortRegex')) {
	                this._weekdaysShortRegex = defaultWeekdaysShortRegex;
	            }
	            return this._weekdaysShortStrictRegex && isStrict
	                ? this._weekdaysShortStrictRegex
	                : this._weekdaysShortRegex;
	        }
	    }

	    function weekdaysMinRegex(isStrict) {
	        if (this._weekdaysParseExact) {
	            if (!hasOwnProp(this, '_weekdaysRegex')) {
	                computeWeekdaysParse.call(this);
	            }
	            if (isStrict) {
	                return this._weekdaysMinStrictRegex;
	            } else {
	                return this._weekdaysMinRegex;
	            }
	        } else {
	            if (!hasOwnProp(this, '_weekdaysMinRegex')) {
	                this._weekdaysMinRegex = defaultWeekdaysMinRegex;
	            }
	            return this._weekdaysMinStrictRegex && isStrict
	                ? this._weekdaysMinStrictRegex
	                : this._weekdaysMinRegex;
	        }
	    }

	    function computeWeekdaysParse() {
	        function cmpLenRev(a, b) {
	            return b.length - a.length;
	        }

	        var minPieces = [],
	            shortPieces = [],
	            longPieces = [],
	            mixedPieces = [],
	            i,
	            mom,
	            minp,
	            shortp,
	            longp;
	        for (i = 0; i < 7; i++) {
	            // make the regex if we don't have it already
	            mom = createUTC([2000, 1]).day(i);
	            minp = regexEscape(this.weekdaysMin(mom, ''));
	            shortp = regexEscape(this.weekdaysShort(mom, ''));
	            longp = regexEscape(this.weekdays(mom, ''));
	            minPieces.push(minp);
	            shortPieces.push(shortp);
	            longPieces.push(longp);
	            mixedPieces.push(minp);
	            mixedPieces.push(shortp);
	            mixedPieces.push(longp);
	        }
	        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
	        // will match the longer piece.
	        minPieces.sort(cmpLenRev);
	        shortPieces.sort(cmpLenRev);
	        longPieces.sort(cmpLenRev);
	        mixedPieces.sort(cmpLenRev);

	        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
	        this._weekdaysShortRegex = this._weekdaysRegex;
	        this._weekdaysMinRegex = this._weekdaysRegex;

	        this._weekdaysStrictRegex = new RegExp(
	            '^(' + longPieces.join('|') + ')',
	            'i'
	        );
	        this._weekdaysShortStrictRegex = new RegExp(
	            '^(' + shortPieces.join('|') + ')',
	            'i'
	        );
	        this._weekdaysMinStrictRegex = new RegExp(
	            '^(' + minPieces.join('|') + ')',
	            'i'
	        );
	    }

	    // FORMATTING

	    function hFormat() {
	        return this.hours() % 12 || 12;
	    }

	    function kFormat() {
	        return this.hours() || 24;
	    }

	    addFormatToken('H', ['HH', 2], 0, 'hour');
	    addFormatToken('h', ['hh', 2], 0, hFormat);
	    addFormatToken('k', ['kk', 2], 0, kFormat);

	    addFormatToken('hmm', 0, 0, function () {
	        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
	    });

	    addFormatToken('hmmss', 0, 0, function () {
	        return (
	            '' +
	            hFormat.apply(this) +
	            zeroFill(this.minutes(), 2) +
	            zeroFill(this.seconds(), 2)
	        );
	    });

	    addFormatToken('Hmm', 0, 0, function () {
	        return '' + this.hours() + zeroFill(this.minutes(), 2);
	    });

	    addFormatToken('Hmmss', 0, 0, function () {
	        return (
	            '' +
	            this.hours() +
	            zeroFill(this.minutes(), 2) +
	            zeroFill(this.seconds(), 2)
	        );
	    });

	    function meridiem(token, lowercase) {
	        addFormatToken(token, 0, 0, function () {
	            return this.localeData().meridiem(
	                this.hours(),
	                this.minutes(),
	                lowercase
	            );
	        });
	    }

	    meridiem('a', true);
	    meridiem('A', false);

	    // ALIASES

	    addUnitAlias('hour', 'h');

	    // PRIORITY
	    addUnitPriority('hour', 13);

	    // PARSING

	    function matchMeridiem(isStrict, locale) {
	        return locale._meridiemParse;
	    }

	    addRegexToken('a', matchMeridiem);
	    addRegexToken('A', matchMeridiem);
	    addRegexToken('H', match1to2);
	    addRegexToken('h', match1to2);
	    addRegexToken('k', match1to2);
	    addRegexToken('HH', match1to2, match2);
	    addRegexToken('hh', match1to2, match2);
	    addRegexToken('kk', match1to2, match2);

	    addRegexToken('hmm', match3to4);
	    addRegexToken('hmmss', match5to6);
	    addRegexToken('Hmm', match3to4);
	    addRegexToken('Hmmss', match5to6);

	    addParseToken(['H', 'HH'], HOUR);
	    addParseToken(['k', 'kk'], function (input, array, config) {
	        var kInput = toInt(input);
	        array[HOUR] = kInput === 24 ? 0 : kInput;
	    });
	    addParseToken(['a', 'A'], function (input, array, config) {
	        config._isPm = config._locale.isPM(input);
	        config._meridiem = input;
	    });
	    addParseToken(['h', 'hh'], function (input, array, config) {
	        array[HOUR] = toInt(input);
	        getParsingFlags(config).bigHour = true;
	    });
	    addParseToken('hmm', function (input, array, config) {
	        var pos = input.length - 2;
	        array[HOUR] = toInt(input.substr(0, pos));
	        array[MINUTE] = toInt(input.substr(pos));
	        getParsingFlags(config).bigHour = true;
	    });
	    addParseToken('hmmss', function (input, array, config) {
	        var pos1 = input.length - 4,
	            pos2 = input.length - 2;
	        array[HOUR] = toInt(input.substr(0, pos1));
	        array[MINUTE] = toInt(input.substr(pos1, 2));
	        array[SECOND] = toInt(input.substr(pos2));
	        getParsingFlags(config).bigHour = true;
	    });
	    addParseToken('Hmm', function (input, array, config) {
	        var pos = input.length - 2;
	        array[HOUR] = toInt(input.substr(0, pos));
	        array[MINUTE] = toInt(input.substr(pos));
	    });
	    addParseToken('Hmmss', function (input, array, config) {
	        var pos1 = input.length - 4,
	            pos2 = input.length - 2;
	        array[HOUR] = toInt(input.substr(0, pos1));
	        array[MINUTE] = toInt(input.substr(pos1, 2));
	        array[SECOND] = toInt(input.substr(pos2));
	    });

	    // LOCALES

	    function localeIsPM(input) {
	        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
	        // Using charAt should be more compatible.
	        return (input + '').toLowerCase().charAt(0) === 'p';
	    }

	    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i,
	        // Setting the hour should keep the time, because the user explicitly
	        // specified which hour they want. So trying to maintain the same hour (in
	        // a new timezone) makes sense. Adding/subtracting hours does not follow
	        // this rule.
	        getSetHour = makeGetSet('Hours', true);

	    function localeMeridiem(hours, minutes, isLower) {
	        if (hours > 11) {
	            return isLower ? 'pm' : 'PM';
	        } else {
	            return isLower ? 'am' : 'AM';
	        }
	    }

	    var baseConfig = {
	        calendar: defaultCalendar,
	        longDateFormat: defaultLongDateFormat,
	        invalidDate: defaultInvalidDate,
	        ordinal: defaultOrdinal,
	        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
	        relativeTime: defaultRelativeTime,

	        months: defaultLocaleMonths,
	        monthsShort: defaultLocaleMonthsShort,

	        week: defaultLocaleWeek,

	        weekdays: defaultLocaleWeekdays,
	        weekdaysMin: defaultLocaleWeekdaysMin,
	        weekdaysShort: defaultLocaleWeekdaysShort,

	        meridiemParse: defaultLocaleMeridiemParse,
	    };

	    // internal storage for locale config files
	    var locales = {},
	        localeFamilies = {},
	        globalLocale;

	    function commonPrefix(arr1, arr2) {
	        var i,
	            minl = Math.min(arr1.length, arr2.length);
	        for (i = 0; i < minl; i += 1) {
	            if (arr1[i] !== arr2[i]) {
	                return i;
	            }
	        }
	        return minl;
	    }

	    function normalizeLocale(key) {
	        return key ? key.toLowerCase().replace('_', '-') : key;
	    }

	    // pick the locale from the array
	    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
	    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
	    function chooseLocale(names) {
	        var i = 0,
	            j,
	            next,
	            locale,
	            split;

	        while (i < names.length) {
	            split = normalizeLocale(names[i]).split('-');
	            j = split.length;
	            next = normalizeLocale(names[i + 1]);
	            next = next ? next.split('-') : null;
	            while (j > 0) {
	                locale = loadLocale(split.slice(0, j).join('-'));
	                if (locale) {
	                    return locale;
	                }
	                if (
	                    next &&
	                    next.length >= j &&
	                    commonPrefix(split, next) >= j - 1
	                ) {
	                    //the next array item is better than a shallower substring of this one
	                    break;
	                }
	                j--;
	            }
	            i++;
	        }
	        return globalLocale;
	    }

	    function loadLocale(name) {
	        var oldLocale = null,
	            aliasedRequire;
	        // TODO: Find a better way to register and load all the locales in Node
	        if (
	            locales[name] === undefined &&
	            'object' !== 'undefined' &&
	            module &&
	            module.exports
	        ) {
	            try {
	                oldLocale = globalLocale._abbr;
	                aliasedRequire = commonjsRequire;
	                aliasedRequire('./locale/' + name);
	                getSetGlobalLocale(oldLocale);
	            } catch (e) {
	                // mark as not found to avoid repeating expensive file require call causing high CPU
	                // when trying to find en-US, en_US, en-us for every format call
	                locales[name] = null; // null means not found
	            }
	        }
	        return locales[name];
	    }

	    // This function will load locale and then set the global locale.  If
	    // no arguments are passed in, it will simply return the current global
	    // locale key.
	    function getSetGlobalLocale(key, values) {
	        var data;
	        if (key) {
	            if (isUndefined(values)) {
	                data = getLocale(key);
	            } else {
	                data = defineLocale(key, values);
	            }

	            if (data) {
	                // moment.duration._locale = moment._locale = data;
	                globalLocale = data;
	            } else {
	                if (typeof console !== 'undefined' && console.warn) {
	                    //warn user if arguments are passed but the locale could not be set
	                    console.warn(
	                        'Locale ' + key + ' not found. Did you forget to load it?'
	                    );
	                }
	            }
	        }

	        return globalLocale._abbr;
	    }

	    function defineLocale(name, config) {
	        if (config !== null) {
	            var locale,
	                parentConfig = baseConfig;
	            config.abbr = name;
	            if (locales[name] != null) {
	                deprecateSimple(
	                    'defineLocaleOverride',
	                    'use moment.updateLocale(localeName, config) to change ' +
	                        'an existing locale. moment.defineLocale(localeName, ' +
	                        'config) should only be used for creating a new locale ' +
	                        'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.'
	                );
	                parentConfig = locales[name]._config;
	            } else if (config.parentLocale != null) {
	                if (locales[config.parentLocale] != null) {
	                    parentConfig = locales[config.parentLocale]._config;
	                } else {
	                    locale = loadLocale(config.parentLocale);
	                    if (locale != null) {
	                        parentConfig = locale._config;
	                    } else {
	                        if (!localeFamilies[config.parentLocale]) {
	                            localeFamilies[config.parentLocale] = [];
	                        }
	                        localeFamilies[config.parentLocale].push({
	                            name: name,
	                            config: config,
	                        });
	                        return null;
	                    }
	                }
	            }
	            locales[name] = new Locale(mergeConfigs(parentConfig, config));

	            if (localeFamilies[name]) {
	                localeFamilies[name].forEach(function (x) {
	                    defineLocale(x.name, x.config);
	                });
	            }

	            // backwards compat for now: also set the locale
	            // make sure we set the locale AFTER all child locales have been
	            // created, so we won't end up with the child locale set.
	            getSetGlobalLocale(name);

	            return locales[name];
	        } else {
	            // useful for testing
	            delete locales[name];
	            return null;
	        }
	    }

	    function updateLocale(name, config) {
	        if (config != null) {
	            var locale,
	                tmpLocale,
	                parentConfig = baseConfig;

	            if (locales[name] != null && locales[name].parentLocale != null) {
	                // Update existing child locale in-place to avoid memory-leaks
	                locales[name].set(mergeConfigs(locales[name]._config, config));
	            } else {
	                // MERGE
	                tmpLocale = loadLocale(name);
	                if (tmpLocale != null) {
	                    parentConfig = tmpLocale._config;
	                }
	                config = mergeConfigs(parentConfig, config);
	                if (tmpLocale == null) {
	                    // updateLocale is called for creating a new locale
	                    // Set abbr so it will have a name (getters return
	                    // undefined otherwise).
	                    config.abbr = name;
	                }
	                locale = new Locale(config);
	                locale.parentLocale = locales[name];
	                locales[name] = locale;
	            }

	            // backwards compat for now: also set the locale
	            getSetGlobalLocale(name);
	        } else {
	            // pass null for config to unupdate, useful for tests
	            if (locales[name] != null) {
	                if (locales[name].parentLocale != null) {
	                    locales[name] = locales[name].parentLocale;
	                    if (name === getSetGlobalLocale()) {
	                        getSetGlobalLocale(name);
	                    }
	                } else if (locales[name] != null) {
	                    delete locales[name];
	                }
	            }
	        }
	        return locales[name];
	    }

	    // returns locale data
	    function getLocale(key) {
	        var locale;

	        if (key && key._locale && key._locale._abbr) {
	            key = key._locale._abbr;
	        }

	        if (!key) {
	            return globalLocale;
	        }

	        if (!isArray(key)) {
	            //short-circuit everything else
	            locale = loadLocale(key);
	            if (locale) {
	                return locale;
	            }
	            key = [key];
	        }

	        return chooseLocale(key);
	    }

	    function listLocales() {
	        return keys(locales);
	    }

	    function checkOverflow(m) {
	        var overflow,
	            a = m._a;

	        if (a && getParsingFlags(m).overflow === -2) {
	            overflow =
	                a[MONTH] < 0 || a[MONTH] > 11
	                    ? MONTH
	                    : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH])
	                    ? DATE
	                    : a[HOUR] < 0 ||
	                      a[HOUR] > 24 ||
	                      (a[HOUR] === 24 &&
	                          (a[MINUTE] !== 0 ||
	                              a[SECOND] !== 0 ||
	                              a[MILLISECOND] !== 0))
	                    ? HOUR
	                    : a[MINUTE] < 0 || a[MINUTE] > 59
	                    ? MINUTE
	                    : a[SECOND] < 0 || a[SECOND] > 59
	                    ? SECOND
	                    : a[MILLISECOND] < 0 || a[MILLISECOND] > 999
	                    ? MILLISECOND
	                    : -1;

	            if (
	                getParsingFlags(m)._overflowDayOfYear &&
	                (overflow < YEAR || overflow > DATE)
	            ) {
	                overflow = DATE;
	            }
	            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
	                overflow = WEEK;
	            }
	            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
	                overflow = WEEKDAY;
	            }

	            getParsingFlags(m).overflow = overflow;
	        }

	        return m;
	    }

	    // iso 8601 regex
	    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
	    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
	        basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
	        tzRegex = /Z|[+-]\d\d(?::?\d\d)?/,
	        isoDates = [
	            ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
	            ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
	            ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
	            ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
	            ['YYYY-DDD', /\d{4}-\d{3}/],
	            ['YYYY-MM', /\d{4}-\d\d/, false],
	            ['YYYYYYMMDD', /[+-]\d{10}/],
	            ['YYYYMMDD', /\d{8}/],
	            ['GGGG[W]WWE', /\d{4}W\d{3}/],
	            ['GGGG[W]WW', /\d{4}W\d{2}/, false],
	            ['YYYYDDD', /\d{7}/],
	            ['YYYYMM', /\d{6}/, false],
	            ['YYYY', /\d{4}/, false],
	        ],
	        // iso time formats and regexes
	        isoTimes = [
	            ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
	            ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
	            ['HH:mm:ss', /\d\d:\d\d:\d\d/],
	            ['HH:mm', /\d\d:\d\d/],
	            ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
	            ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
	            ['HHmmss', /\d\d\d\d\d\d/],
	            ['HHmm', /\d\d\d\d/],
	            ['HH', /\d\d/],
	        ],
	        aspNetJsonRegex = /^\/?Date\((-?\d+)/i,
	        // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
	        rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
	        obsOffsets = {
	            UT: 0,
	            GMT: 0,
	            EDT: -4 * 60,
	            EST: -5 * 60,
	            CDT: -5 * 60,
	            CST: -6 * 60,
	            MDT: -6 * 60,
	            MST: -7 * 60,
	            PDT: -7 * 60,
	            PST: -8 * 60,
	        };

	    // date from iso format
	    function configFromISO(config) {
	        var i,
	            l,
	            string = config._i,
	            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
	            allowTime,
	            dateFormat,
	            timeFormat,
	            tzFormat;

	        if (match) {
	            getParsingFlags(config).iso = true;

	            for (i = 0, l = isoDates.length; i < l; i++) {
	                if (isoDates[i][1].exec(match[1])) {
	                    dateFormat = isoDates[i][0];
	                    allowTime = isoDates[i][2] !== false;
	                    break;
	                }
	            }
	            if (dateFormat == null) {
	                config._isValid = false;
	                return;
	            }
	            if (match[3]) {
	                for (i = 0, l = isoTimes.length; i < l; i++) {
	                    if (isoTimes[i][1].exec(match[3])) {
	                        // match[2] should be 'T' or space
	                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
	                        break;
	                    }
	                }
	                if (timeFormat == null) {
	                    config._isValid = false;
	                    return;
	                }
	            }
	            if (!allowTime && timeFormat != null) {
	                config._isValid = false;
	                return;
	            }
	            if (match[4]) {
	                if (tzRegex.exec(match[4])) {
	                    tzFormat = 'Z';
	                } else {
	                    config._isValid = false;
	                    return;
	                }
	            }
	            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
	            configFromStringAndFormat(config);
	        } else {
	            config._isValid = false;
	        }
	    }

	    function extractFromRFC2822Strings(
	        yearStr,
	        monthStr,
	        dayStr,
	        hourStr,
	        minuteStr,
	        secondStr
	    ) {
	        var result = [
	            untruncateYear(yearStr),
	            defaultLocaleMonthsShort.indexOf(monthStr),
	            parseInt(dayStr, 10),
	            parseInt(hourStr, 10),
	            parseInt(minuteStr, 10),
	        ];

	        if (secondStr) {
	            result.push(parseInt(secondStr, 10));
	        }

	        return result;
	    }

	    function untruncateYear(yearStr) {
	        var year = parseInt(yearStr, 10);
	        if (year <= 49) {
	            return 2000 + year;
	        } else if (year <= 999) {
	            return 1900 + year;
	        }
	        return year;
	    }

	    function preprocessRFC2822(s) {
	        // Remove comments and folding whitespace and replace multiple-spaces with a single space
	        return s
	            .replace(/\([^)]*\)|[\n\t]/g, ' ')
	            .replace(/(\s\s+)/g, ' ')
	            .replace(/^\s\s*/, '')
	            .replace(/\s\s*$/, '');
	    }

	    function checkWeekday(weekdayStr, parsedInput, config) {
	        if (weekdayStr) {
	            // TODO: Replace the vanilla JS Date object with an independent day-of-week check.
	            var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
	                weekdayActual = new Date(
	                    parsedInput[0],
	                    parsedInput[1],
	                    parsedInput[2]
	                ).getDay();
	            if (weekdayProvided !== weekdayActual) {
	                getParsingFlags(config).weekdayMismatch = true;
	                config._isValid = false;
	                return false;
	            }
	        }
	        return true;
	    }

	    function calculateOffset(obsOffset, militaryOffset, numOffset) {
	        if (obsOffset) {
	            return obsOffsets[obsOffset];
	        } else if (militaryOffset) {
	            // the only allowed military tz is Z
	            return 0;
	        } else {
	            var hm = parseInt(numOffset, 10),
	                m = hm % 100,
	                h = (hm - m) / 100;
	            return h * 60 + m;
	        }
	    }

	    // date and time from ref 2822 format
	    function configFromRFC2822(config) {
	        var match = rfc2822.exec(preprocessRFC2822(config._i)),
	            parsedArray;
	        if (match) {
	            parsedArray = extractFromRFC2822Strings(
	                match[4],
	                match[3],
	                match[2],
	                match[5],
	                match[6],
	                match[7]
	            );
	            if (!checkWeekday(match[1], parsedArray, config)) {
	                return;
	            }

	            config._a = parsedArray;
	            config._tzm = calculateOffset(match[8], match[9], match[10]);

	            config._d = createUTCDate.apply(null, config._a);
	            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

	            getParsingFlags(config).rfc2822 = true;
	        } else {
	            config._isValid = false;
	        }
	    }

	    // date from 1) ASP.NET, 2) ISO, 3) RFC 2822 formats, or 4) optional fallback if parsing isn't strict
	    function configFromString(config) {
	        var matched = aspNetJsonRegex.exec(config._i);
	        if (matched !== null) {
	            config._d = new Date(+matched[1]);
	            return;
	        }

	        configFromISO(config);
	        if (config._isValid === false) {
	            delete config._isValid;
	        } else {
	            return;
	        }

	        configFromRFC2822(config);
	        if (config._isValid === false) {
	            delete config._isValid;
	        } else {
	            return;
	        }

	        if (config._strict) {
	            config._isValid = false;
	        } else {
	            // Final attempt, use Input Fallback
	            hooks.createFromInputFallback(config);
	        }
	    }

	    hooks.createFromInputFallback = deprecate(
	        'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
	            'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
	            'discouraged and will be removed in an upcoming major release. Please refer to ' +
	            'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
	        function (config) {
	            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
	        }
	    );

	    // Pick the first defined of two or three arguments.
	    function defaults(a, b, c) {
	        if (a != null) {
	            return a;
	        }
	        if (b != null) {
	            return b;
	        }
	        return c;
	    }

	    function currentDateArray(config) {
	        // hooks is actually the exported moment object
	        var nowValue = new Date(hooks.now());
	        if (config._useUTC) {
	            return [
	                nowValue.getUTCFullYear(),
	                nowValue.getUTCMonth(),
	                nowValue.getUTCDate(),
	            ];
	        }
	        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
	    }

	    // convert an array to a date.
	    // the array should mirror the parameters below
	    // note: all values past the year are optional and will default to the lowest possible value.
	    // [year, month, day , hour, minute, second, millisecond]
	    function configFromArray(config) {
	        var i,
	            date,
	            input = [],
	            currentDate,
	            expectedWeekday,
	            yearToUse;

	        if (config._d) {
	            return;
	        }

	        currentDate = currentDateArray(config);

	        //compute day of the year from weeks and weekdays
	        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
	            dayOfYearFromWeekInfo(config);
	        }

	        //if the day of the year is set, figure out what it is
	        if (config._dayOfYear != null) {
	            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

	            if (
	                config._dayOfYear > daysInYear(yearToUse) ||
	                config._dayOfYear === 0
	            ) {
	                getParsingFlags(config)._overflowDayOfYear = true;
	            }

	            date = createUTCDate(yearToUse, 0, config._dayOfYear);
	            config._a[MONTH] = date.getUTCMonth();
	            config._a[DATE] = date.getUTCDate();
	        }

	        // Default to current date.
	        // * if no year, month, day of month are given, default to today
	        // * if day of month is given, default month and year
	        // * if month is given, default only year
	        // * if year is given, don't default anything
	        for (i = 0; i < 3 && config._a[i] == null; ++i) {
	            config._a[i] = input[i] = currentDate[i];
	        }

	        // Zero out whatever was not defaulted, including time
	        for (; i < 7; i++) {
	            config._a[i] = input[i] =
	                config._a[i] == null ? (i === 2 ? 1 : 0) : config._a[i];
	        }

	        // Check for 24:00:00.000
	        if (
	            config._a[HOUR] === 24 &&
	            config._a[MINUTE] === 0 &&
	            config._a[SECOND] === 0 &&
	            config._a[MILLISECOND] === 0
	        ) {
	            config._nextDay = true;
	            config._a[HOUR] = 0;
	        }

	        config._d = (config._useUTC ? createUTCDate : createDate).apply(
	            null,
	            input
	        );
	        expectedWeekday = config._useUTC
	            ? config._d.getUTCDay()
	            : config._d.getDay();

	        // Apply timezone offset from input. The actual utcOffset can be changed
	        // with parseZone.
	        if (config._tzm != null) {
	            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
	        }

	        if (config._nextDay) {
	            config._a[HOUR] = 24;
	        }

	        // check for mismatching day of week
	        if (
	            config._w &&
	            typeof config._w.d !== 'undefined' &&
	            config._w.d !== expectedWeekday
	        ) {
	            getParsingFlags(config).weekdayMismatch = true;
	        }
	    }

	    function dayOfYearFromWeekInfo(config) {
	        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;

	        w = config._w;
	        if (w.GG != null || w.W != null || w.E != null) {
	            dow = 1;
	            doy = 4;

	            // TODO: We need to take the current isoWeekYear, but that depends on
	            // how we interpret now (local, utc, fixed offset). So create
	            // a now version of current config (take local/utc/offset flags, and
	            // create now).
	            weekYear = defaults(
	                w.GG,
	                config._a[YEAR],
	                weekOfYear(createLocal(), 1, 4).year
	            );
	            week = defaults(w.W, 1);
	            weekday = defaults(w.E, 1);
	            if (weekday < 1 || weekday > 7) {
	                weekdayOverflow = true;
	            }
	        } else {
	            dow = config._locale._week.dow;
	            doy = config._locale._week.doy;

	            curWeek = weekOfYear(createLocal(), dow, doy);

	            weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

	            // Default to current week.
	            week = defaults(w.w, curWeek.week);

	            if (w.d != null) {
	                // weekday -- low day numbers are considered next week
	                weekday = w.d;
	                if (weekday < 0 || weekday > 6) {
	                    weekdayOverflow = true;
	                }
	            } else if (w.e != null) {
	                // local weekday -- counting starts from beginning of week
	                weekday = w.e + dow;
	                if (w.e < 0 || w.e > 6) {
	                    weekdayOverflow = true;
	                }
	            } else {
	                // default to beginning of week
	                weekday = dow;
	            }
	        }
	        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
	            getParsingFlags(config)._overflowWeeks = true;
	        } else if (weekdayOverflow != null) {
	            getParsingFlags(config)._overflowWeekday = true;
	        } else {
	            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
	            config._a[YEAR] = temp.year;
	            config._dayOfYear = temp.dayOfYear;
	        }
	    }

	    // constant that refers to the ISO standard
	    hooks.ISO_8601 = function () {};

	    // constant that refers to the RFC 2822 form
	    hooks.RFC_2822 = function () {};

	    // date from string and format string
	    function configFromStringAndFormat(config) {
	        // TODO: Move this to another part of the creation flow to prevent circular deps
	        if (config._f === hooks.ISO_8601) {
	            configFromISO(config);
	            return;
	        }
	        if (config._f === hooks.RFC_2822) {
	            configFromRFC2822(config);
	            return;
	        }
	        config._a = [];
	        getParsingFlags(config).empty = true;

	        // This array is used to make a Date, either with `new Date` or `Date.UTC`
	        var string = '' + config._i,
	            i,
	            parsedInput,
	            tokens,
	            token,
	            skipped,
	            stringLength = string.length,
	            totalParsedInputLength = 0,
	            era;

	        tokens =
	            expandFormat(config._f, config._locale).match(formattingTokens) || [];

	        for (i = 0; i < tokens.length; i++) {
	            token = tokens[i];
	            parsedInput = (string.match(getParseRegexForToken(token, config)) ||
	                [])[0];
	            if (parsedInput) {
	                skipped = string.substr(0, string.indexOf(parsedInput));
	                if (skipped.length > 0) {
	                    getParsingFlags(config).unusedInput.push(skipped);
	                }
	                string = string.slice(
	                    string.indexOf(parsedInput) + parsedInput.length
	                );
	                totalParsedInputLength += parsedInput.length;
	            }
	            // don't parse if it's not a known token
	            if (formatTokenFunctions[token]) {
	                if (parsedInput) {
	                    getParsingFlags(config).empty = false;
	                } else {
	                    getParsingFlags(config).unusedTokens.push(token);
	                }
	                addTimeToArrayFromToken(token, parsedInput, config);
	            } else if (config._strict && !parsedInput) {
	                getParsingFlags(config).unusedTokens.push(token);
	            }
	        }

	        // add remaining unparsed input length to the string
	        getParsingFlags(config).charsLeftOver =
	            stringLength - totalParsedInputLength;
	        if (string.length > 0) {
	            getParsingFlags(config).unusedInput.push(string);
	        }

	        // clear _12h flag if hour is <= 12
	        if (
	            config._a[HOUR] <= 12 &&
	            getParsingFlags(config).bigHour === true &&
	            config._a[HOUR] > 0
	        ) {
	            getParsingFlags(config).bigHour = undefined;
	        }

	        getParsingFlags(config).parsedDateParts = config._a.slice(0);
	        getParsingFlags(config).meridiem = config._meridiem;
	        // handle meridiem
	        config._a[HOUR] = meridiemFixWrap(
	            config._locale,
	            config._a[HOUR],
	            config._meridiem
	        );

	        // handle era
	        era = getParsingFlags(config).era;
	        if (era !== null) {
	            config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR]);
	        }

	        configFromArray(config);
	        checkOverflow(config);
	    }

	    function meridiemFixWrap(locale, hour, meridiem) {
	        var isPm;

	        if (meridiem == null) {
	            // nothing to do
	            return hour;
	        }
	        if (locale.meridiemHour != null) {
	            return locale.meridiemHour(hour, meridiem);
	        } else if (locale.isPM != null) {
	            // Fallback
	            isPm = locale.isPM(meridiem);
	            if (isPm && hour < 12) {
	                hour += 12;
	            }
	            if (!isPm && hour === 12) {
	                hour = 0;
	            }
	            return hour;
	        } else {
	            // this is not supposed to happen
	            return hour;
	        }
	    }

	    // date from string and array of format strings
	    function configFromStringAndArray(config) {
	        var tempConfig,
	            bestMoment,
	            scoreToBeat,
	            i,
	            currentScore,
	            validFormatFound,
	            bestFormatIsValid = false;

	        if (config._f.length === 0) {
	            getParsingFlags(config).invalidFormat = true;
	            config._d = new Date(NaN);
	            return;
	        }

	        for (i = 0; i < config._f.length; i++) {
	            currentScore = 0;
	            validFormatFound = false;
	            tempConfig = copyConfig({}, config);
	            if (config._useUTC != null) {
	                tempConfig._useUTC = config._useUTC;
	            }
	            tempConfig._f = config._f[i];
	            configFromStringAndFormat(tempConfig);

	            if (isValid(tempConfig)) {
	                validFormatFound = true;
	            }

	            // if there is any input that was not parsed add a penalty for that format
	            currentScore += getParsingFlags(tempConfig).charsLeftOver;

	            //or tokens
	            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

	            getParsingFlags(tempConfig).score = currentScore;

	            if (!bestFormatIsValid) {
	                if (
	                    scoreToBeat == null ||
	                    currentScore < scoreToBeat ||
	                    validFormatFound
	                ) {
	                    scoreToBeat = currentScore;
	                    bestMoment = tempConfig;
	                    if (validFormatFound) {
	                        bestFormatIsValid = true;
	                    }
	                }
	            } else {
	                if (currentScore < scoreToBeat) {
	                    scoreToBeat = currentScore;
	                    bestMoment = tempConfig;
	                }
	            }
	        }

	        extend(config, bestMoment || tempConfig);
	    }

	    function configFromObject(config) {
	        if (config._d) {
	            return;
	        }

	        var i = normalizeObjectUnits(config._i),
	            dayOrDate = i.day === undefined ? i.date : i.day;
	        config._a = map(
	            [i.year, i.month, dayOrDate, i.hour, i.minute, i.second, i.millisecond],
	            function (obj) {
	                return obj && parseInt(obj, 10);
	            }
	        );

	        configFromArray(config);
	    }

	    function createFromConfig(config) {
	        var res = new Moment(checkOverflow(prepareConfig(config)));
	        if (res._nextDay) {
	            // Adding is smart enough around DST
	            res.add(1, 'd');
	            res._nextDay = undefined;
	        }

	        return res;
	    }

	    function prepareConfig(config) {
	        var input = config._i,
	            format = config._f;

	        config._locale = config._locale || getLocale(config._l);

	        if (input === null || (format === undefined && input === '')) {
	            return createInvalid({ nullInput: true });
	        }

	        if (typeof input === 'string') {
	            config._i = input = config._locale.preparse(input);
	        }

	        if (isMoment(input)) {
	            return new Moment(checkOverflow(input));
	        } else if (isDate(input)) {
	            config._d = input;
	        } else if (isArray(format)) {
	            configFromStringAndArray(config);
	        } else if (format) {
	            configFromStringAndFormat(config);
	        } else {
	            configFromInput(config);
	        }

	        if (!isValid(config)) {
	            config._d = null;
	        }

	        return config;
	    }

	    function configFromInput(config) {
	        var input = config._i;
	        if (isUndefined(input)) {
	            config._d = new Date(hooks.now());
	        } else if (isDate(input)) {
	            config._d = new Date(input.valueOf());
	        } else if (typeof input === 'string') {
	            configFromString(config);
	        } else if (isArray(input)) {
	            config._a = map(input.slice(0), function (obj) {
	                return parseInt(obj, 10);
	            });
	            configFromArray(config);
	        } else if (isObject(input)) {
	            configFromObject(config);
	        } else if (isNumber(input)) {
	            // from milliseconds
	            config._d = new Date(input);
	        } else {
	            hooks.createFromInputFallback(config);
	        }
	    }

	    function createLocalOrUTC(input, format, locale, strict, isUTC) {
	        var c = {};

	        if (format === true || format === false) {
	            strict = format;
	            format = undefined;
	        }

	        if (locale === true || locale === false) {
	            strict = locale;
	            locale = undefined;
	        }

	        if (
	            (isObject(input) && isObjectEmpty(input)) ||
	            (isArray(input) && input.length === 0)
	        ) {
	            input = undefined;
	        }
	        // object construction must be done this way.
	        // https://github.com/moment/moment/issues/1423
	        c._isAMomentObject = true;
	        c._useUTC = c._isUTC = isUTC;
	        c._l = locale;
	        c._i = input;
	        c._f = format;
	        c._strict = strict;

	        return createFromConfig(c);
	    }

	    function createLocal(input, format, locale, strict) {
	        return createLocalOrUTC(input, format, locale, strict, false);
	    }

	    var prototypeMin = deprecate(
	            'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
	            function () {
	                var other = createLocal.apply(null, arguments);
	                if (this.isValid() && other.isValid()) {
	                    return other < this ? this : other;
	                } else {
	                    return createInvalid();
	                }
	            }
	        ),
	        prototypeMax = deprecate(
	            'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
	            function () {
	                var other = createLocal.apply(null, arguments);
	                if (this.isValid() && other.isValid()) {
	                    return other > this ? this : other;
	                } else {
	                    return createInvalid();
	                }
	            }
	        );

	    // Pick a moment m from moments so that m[fn](other) is true for all
	    // other. This relies on the function fn to be transitive.
	    //
	    // moments should either be an array of moment objects or an array, whose
	    // first element is an array of moment objects.
	    function pickBy(fn, moments) {
	        var res, i;
	        if (moments.length === 1 && isArray(moments[0])) {
	            moments = moments[0];
	        }
	        if (!moments.length) {
	            return createLocal();
	        }
	        res = moments[0];
	        for (i = 1; i < moments.length; ++i) {
	            if (!moments[i].isValid() || moments[i][fn](res)) {
	                res = moments[i];
	            }
	        }
	        return res;
	    }

	    // TODO: Use [].sort instead?
	    function min() {
	        var args = [].slice.call(arguments, 0);

	        return pickBy('isBefore', args);
	    }

	    function max() {
	        var args = [].slice.call(arguments, 0);

	        return pickBy('isAfter', args);
	    }

	    var now = function () {
	        return Date.now ? Date.now() : +new Date();
	    };

	    var ordering = [
	        'year',
	        'quarter',
	        'month',
	        'week',
	        'day',
	        'hour',
	        'minute',
	        'second',
	        'millisecond',
	    ];

	    function isDurationValid(m) {
	        var key,
	            unitHasDecimal = false,
	            i;
	        for (key in m) {
	            if (
	                hasOwnProp(m, key) &&
	                !(
	                    indexOf.call(ordering, key) !== -1 &&
	                    (m[key] == null || !isNaN(m[key]))
	                )
	            ) {
	                return false;
	            }
	        }

	        for (i = 0; i < ordering.length; ++i) {
	            if (m[ordering[i]]) {
	                if (unitHasDecimal) {
	                    return false; // only allow non-integers for smallest unit
	                }
	                if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
	                    unitHasDecimal = true;
	                }
	            }
	        }

	        return true;
	    }

	    function isValid$1() {
	        return this._isValid;
	    }

	    function createInvalid$1() {
	        return createDuration(NaN);
	    }

	    function Duration(duration) {
	        var normalizedInput = normalizeObjectUnits(duration),
	            years = normalizedInput.year || 0,
	            quarters = normalizedInput.quarter || 0,
	            months = normalizedInput.month || 0,
	            weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
	            days = normalizedInput.day || 0,
	            hours = normalizedInput.hour || 0,
	            minutes = normalizedInput.minute || 0,
	            seconds = normalizedInput.second || 0,
	            milliseconds = normalizedInput.millisecond || 0;

	        this._isValid = isDurationValid(normalizedInput);

	        // representation for dateAddRemove
	        this._milliseconds =
	            +milliseconds +
	            seconds * 1e3 + // 1000
	            minutes * 6e4 + // 1000 * 60
	            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
	        // Because of dateAddRemove treats 24 hours as different from a
	        // day when working around DST, we need to store them separately
	        this._days = +days + weeks * 7;
	        // It is impossible to translate months into days without knowing
	        // which months you are are talking about, so we have to store
	        // it separately.
	        this._months = +months + quarters * 3 + years * 12;

	        this._data = {};

	        this._locale = getLocale();

	        this._bubble();
	    }

	    function isDuration(obj) {
	        return obj instanceof Duration;
	    }

	    function absRound(number) {
	        if (number < 0) {
	            return Math.round(-1 * number) * -1;
	        } else {
	            return Math.round(number);
	        }
	    }

	    // compare two arrays, return the number of differences
	    function compareArrays(array1, array2, dontConvert) {
	        var len = Math.min(array1.length, array2.length),
	            lengthDiff = Math.abs(array1.length - array2.length),
	            diffs = 0,
	            i;
	        for (i = 0; i < len; i++) {
	            if (
	                (dontConvert && array1[i] !== array2[i]) ||
	                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))
	            ) {
	                diffs++;
	            }
	        }
	        return diffs + lengthDiff;
	    }

	    // FORMATTING

	    function offset(token, separator) {
	        addFormatToken(token, 0, 0, function () {
	            var offset = this.utcOffset(),
	                sign = '+';
	            if (offset < 0) {
	                offset = -offset;
	                sign = '-';
	            }
	            return (
	                sign +
	                zeroFill(~~(offset / 60), 2) +
	                separator +
	                zeroFill(~~offset % 60, 2)
	            );
	        });
	    }

	    offset('Z', ':');
	    offset('ZZ', '');

	    // PARSING

	    addRegexToken('Z', matchShortOffset);
	    addRegexToken('ZZ', matchShortOffset);
	    addParseToken(['Z', 'ZZ'], function (input, array, config) {
	        config._useUTC = true;
	        config._tzm = offsetFromString(matchShortOffset, input);
	    });

	    // HELPERS

	    // timezone chunker
	    // '+10:00' > ['10',  '00']
	    // '-1530'  > ['-15', '30']
	    var chunkOffset = /([\+\-]|\d\d)/gi;

	    function offsetFromString(matcher, string) {
	        var matches = (string || '').match(matcher),
	            chunk,
	            parts,
	            minutes;

	        if (matches === null) {
	            return null;
	        }

	        chunk = matches[matches.length - 1] || [];
	        parts = (chunk + '').match(chunkOffset) || ['-', 0, 0];
	        minutes = +(parts[1] * 60) + toInt(parts[2]);

	        return minutes === 0 ? 0 : parts[0] === '+' ? minutes : -minutes;
	    }

	    // Return a moment from input, that is local/utc/zone equivalent to model.
	    function cloneWithOffset(input, model) {
	        var res, diff;
	        if (model._isUTC) {
	            res = model.clone();
	            diff =
	                (isMoment(input) || isDate(input)
	                    ? input.valueOf()
	                    : createLocal(input).valueOf()) - res.valueOf();
	            // Use low-level api, because this fn is low-level api.
	            res._d.setTime(res._d.valueOf() + diff);
	            hooks.updateOffset(res, false);
	            return res;
	        } else {
	            return createLocal(input).local();
	        }
	    }

	    function getDateOffset(m) {
	        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
	        // https://github.com/moment/moment/pull/1871
	        return -Math.round(m._d.getTimezoneOffset());
	    }

	    // HOOKS

	    // This function will be called whenever a moment is mutated.
	    // It is intended to keep the offset in sync with the timezone.
	    hooks.updateOffset = function () {};

	    // MOMENTS

	    // keepLocalTime = true means only change the timezone, without
	    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
	    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
	    // +0200, so we adjust the time as needed, to be valid.
	    //
	    // Keeping the time actually adds/subtracts (one hour)
	    // from the actual represented time. That is why we call updateOffset
	    // a second time. In case it wants us to change the offset again
	    // _changeInProgress == true case, then we have to adjust, because
	    // there is no such time in the given timezone.
	    function getSetOffset(input, keepLocalTime, keepMinutes) {
	        var offset = this._offset || 0,
	            localAdjust;
	        if (!this.isValid()) {
	            return input != null ? this : NaN;
	        }
	        if (input != null) {
	            if (typeof input === 'string') {
	                input = offsetFromString(matchShortOffset, input);
	                if (input === null) {
	                    return this;
	                }
	            } else if (Math.abs(input) < 16 && !keepMinutes) {
	                input = input * 60;
	            }
	            if (!this._isUTC && keepLocalTime) {
	                localAdjust = getDateOffset(this);
	            }
	            this._offset = input;
	            this._isUTC = true;
	            if (localAdjust != null) {
	                this.add(localAdjust, 'm');
	            }
	            if (offset !== input) {
	                if (!keepLocalTime || this._changeInProgress) {
	                    addSubtract(
	                        this,
	                        createDuration(input - offset, 'm'),
	                        1,
	                        false
	                    );
	                } else if (!this._changeInProgress) {
	                    this._changeInProgress = true;
	                    hooks.updateOffset(this, true);
	                    this._changeInProgress = null;
	                }
	            }
	            return this;
	        } else {
	            return this._isUTC ? offset : getDateOffset(this);
	        }
	    }

	    function getSetZone(input, keepLocalTime) {
	        if (input != null) {
	            if (typeof input !== 'string') {
	                input = -input;
	            }

	            this.utcOffset(input, keepLocalTime);

	            return this;
	        } else {
	            return -this.utcOffset();
	        }
	    }

	    function setOffsetToUTC(keepLocalTime) {
	        return this.utcOffset(0, keepLocalTime);
	    }

	    function setOffsetToLocal(keepLocalTime) {
	        if (this._isUTC) {
	            this.utcOffset(0, keepLocalTime);
	            this._isUTC = false;

	            if (keepLocalTime) {
	                this.subtract(getDateOffset(this), 'm');
	            }
	        }
	        return this;
	    }

	    function setOffsetToParsedOffset() {
	        if (this._tzm != null) {
	            this.utcOffset(this._tzm, false, true);
	        } else if (typeof this._i === 'string') {
	            var tZone = offsetFromString(matchOffset, this._i);
	            if (tZone != null) {
	                this.utcOffset(tZone);
	            } else {
	                this.utcOffset(0, true);
	            }
	        }
	        return this;
	    }

	    function hasAlignedHourOffset(input) {
	        if (!this.isValid()) {
	            return false;
	        }
	        input = input ? createLocal(input).utcOffset() : 0;

	        return (this.utcOffset() - input) % 60 === 0;
	    }

	    function isDaylightSavingTime() {
	        return (
	            this.utcOffset() > this.clone().month(0).utcOffset() ||
	            this.utcOffset() > this.clone().month(5).utcOffset()
	        );
	    }

	    function isDaylightSavingTimeShifted() {
	        if (!isUndefined(this._isDSTShifted)) {
	            return this._isDSTShifted;
	        }

	        var c = {},
	            other;

	        copyConfig(c, this);
	        c = prepareConfig(c);

	        if (c._a) {
	            other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
	            this._isDSTShifted =
	                this.isValid() && compareArrays(c._a, other.toArray()) > 0;
	        } else {
	            this._isDSTShifted = false;
	        }

	        return this._isDSTShifted;
	    }

	    function isLocal() {
	        return this.isValid() ? !this._isUTC : false;
	    }

	    function isUtcOffset() {
	        return this.isValid() ? this._isUTC : false;
	    }

	    function isUtc() {
	        return this.isValid() ? this._isUTC && this._offset === 0 : false;
	    }

	    // ASP.NET json date format regex
	    var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
	        // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
	        // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
	        // and further modified to allow for strings containing both week and day
	        isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

	    function createDuration(input, key) {
	        var duration = input,
	            // matching against regexp is expensive, do it on demand
	            match = null,
	            sign,
	            ret,
	            diffRes;

	        if (isDuration(input)) {
	            duration = {
	                ms: input._milliseconds,
	                d: input._days,
	                M: input._months,
	            };
	        } else if (isNumber(input) || !isNaN(+input)) {
	            duration = {};
	            if (key) {
	                duration[key] = +input;
	            } else {
	                duration.milliseconds = +input;
	            }
	        } else if ((match = aspNetRegex.exec(input))) {
	            sign = match[1] === '-' ? -1 : 1;
	            duration = {
	                y: 0,
	                d: toInt(match[DATE]) * sign,
	                h: toInt(match[HOUR]) * sign,
	                m: toInt(match[MINUTE]) * sign,
	                s: toInt(match[SECOND]) * sign,
	                ms: toInt(absRound(match[MILLISECOND] * 1000)) * sign, // the millisecond decimal point is included in the match
	            };
	        } else if ((match = isoRegex.exec(input))) {
	            sign = match[1] === '-' ? -1 : 1;
	            duration = {
	                y: parseIso(match[2], sign),
	                M: parseIso(match[3], sign),
	                w: parseIso(match[4], sign),
	                d: parseIso(match[5], sign),
	                h: parseIso(match[6], sign),
	                m: parseIso(match[7], sign),
	                s: parseIso(match[8], sign),
	            };
	        } else if (duration == null) {
	            // checks for null or undefined
	            duration = {};
	        } else if (
	            typeof duration === 'object' &&
	            ('from' in duration || 'to' in duration)
	        ) {
	            diffRes = momentsDifference(
	                createLocal(duration.from),
	                createLocal(duration.to)
	            );

	            duration = {};
	            duration.ms = diffRes.milliseconds;
	            duration.M = diffRes.months;
	        }

	        ret = new Duration(duration);

	        if (isDuration(input) && hasOwnProp(input, '_locale')) {
	            ret._locale = input._locale;
	        }

	        if (isDuration(input) && hasOwnProp(input, '_isValid')) {
	            ret._isValid = input._isValid;
	        }

	        return ret;
	    }

	    createDuration.fn = Duration.prototype;
	    createDuration.invalid = createInvalid$1;

	    function parseIso(inp, sign) {
	        // We'd normally use ~~inp for this, but unfortunately it also
	        // converts floats to ints.
	        // inp may be undefined, so careful calling replace on it.
	        var res = inp && parseFloat(inp.replace(',', '.'));
	        // apply sign while we're at it
	        return (isNaN(res) ? 0 : res) * sign;
	    }

	    function positiveMomentsDifference(base, other) {
	        var res = {};

	        res.months =
	            other.month() - base.month() + (other.year() - base.year()) * 12;
	        if (base.clone().add(res.months, 'M').isAfter(other)) {
	            --res.months;
	        }

	        res.milliseconds = +other - +base.clone().add(res.months, 'M');

	        return res;
	    }

	    function momentsDifference(base, other) {
	        var res;
	        if (!(base.isValid() && other.isValid())) {
	            return { milliseconds: 0, months: 0 };
	        }

	        other = cloneWithOffset(other, base);
	        if (base.isBefore(other)) {
	            res = positiveMomentsDifference(base, other);
	        } else {
	            res = positiveMomentsDifference(other, base);
	            res.milliseconds = -res.milliseconds;
	            res.months = -res.months;
	        }

	        return res;
	    }

	    // TODO: remove 'name' arg after deprecation is removed
	    function createAdder(direction, name) {
	        return function (val, period) {
	            var dur, tmp;
	            //invert the arguments, but complain about it
	            if (period !== null && !isNaN(+period)) {
	                deprecateSimple(
	                    name,
	                    'moment().' +
	                        name +
	                        '(period, number) is deprecated. Please use moment().' +
	                        name +
	                        '(number, period). ' +
	                        'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.'
	                );
	                tmp = val;
	                val = period;
	                period = tmp;
	            }

	            dur = createDuration(val, period);
	            addSubtract(this, dur, direction);
	            return this;
	        };
	    }

	    function addSubtract(mom, duration, isAdding, updateOffset) {
	        var milliseconds = duration._milliseconds,
	            days = absRound(duration._days),
	            months = absRound(duration._months);

	        if (!mom.isValid()) {
	            // No op
	            return;
	        }

	        updateOffset = updateOffset == null ? true : updateOffset;

	        if (months) {
	            setMonth(mom, get(mom, 'Month') + months * isAdding);
	        }
	        if (days) {
	            set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
	        }
	        if (milliseconds) {
	            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
	        }
	        if (updateOffset) {
	            hooks.updateOffset(mom, days || months);
	        }
	    }

	    var add = createAdder(1, 'add'),
	        subtract = createAdder(-1, 'subtract');

	    function isString(input) {
	        return typeof input === 'string' || input instanceof String;
	    }

	    // type MomentInput = Moment | Date | string | number | (number | string)[] | MomentInputObject | void; // null | undefined
	    function isMomentInput(input) {
	        return (
	            isMoment(input) ||
	            isDate(input) ||
	            isString(input) ||
	            isNumber(input) ||
	            isNumberOrStringArray(input) ||
	            isMomentInputObject(input) ||
	            input === null ||
	            input === undefined
	        );
	    }

	    function isMomentInputObject(input) {
	        var objectTest = isObject(input) && !isObjectEmpty(input),
	            propertyTest = false,
	            properties = [
	                'years',
	                'year',
	                'y',
	                'months',
	                'month',
	                'M',
	                'days',
	                'day',
	                'd',
	                'dates',
	                'date',
	                'D',
	                'hours',
	                'hour',
	                'h',
	                'minutes',
	                'minute',
	                'm',
	                'seconds',
	                'second',
	                's',
	                'milliseconds',
	                'millisecond',
	                'ms',
	            ],
	            i,
	            property;

	        for (i = 0; i < properties.length; i += 1) {
	            property = properties[i];
	            propertyTest = propertyTest || hasOwnProp(input, property);
	        }

	        return objectTest && propertyTest;
	    }

	    function isNumberOrStringArray(input) {
	        var arrayTest = isArray(input),
	            dataTypeTest = false;
	        if (arrayTest) {
	            dataTypeTest =
	                input.filter(function (item) {
	                    return !isNumber(item) && isString(input);
	                }).length === 0;
	        }
	        return arrayTest && dataTypeTest;
	    }

	    function isCalendarSpec(input) {
	        var objectTest = isObject(input) && !isObjectEmpty(input),
	            propertyTest = false,
	            properties = [
	                'sameDay',
	                'nextDay',
	                'lastDay',
	                'nextWeek',
	                'lastWeek',
	                'sameElse',
	            ],
	            i,
	            property;

	        for (i = 0; i < properties.length; i += 1) {
	            property = properties[i];
	            propertyTest = propertyTest || hasOwnProp(input, property);
	        }

	        return objectTest && propertyTest;
	    }

	    function getCalendarFormat(myMoment, now) {
	        var diff = myMoment.diff(now, 'days', true);
	        return diff < -6
	            ? 'sameElse'
	            : diff < -1
	            ? 'lastWeek'
	            : diff < 0
	            ? 'lastDay'
	            : diff < 1
	            ? 'sameDay'
	            : diff < 2
	            ? 'nextDay'
	            : diff < 7
	            ? 'nextWeek'
	            : 'sameElse';
	    }

	    function calendar$1(time, formats) {
	        // Support for single parameter, formats only overload to the calendar function
	        if (arguments.length === 1) {
	            if (isMomentInput(arguments[0])) {
	                time = arguments[0];
	                formats = undefined;
	            } else if (isCalendarSpec(arguments[0])) {
	                formats = arguments[0];
	                time = undefined;
	            }
	        }
	        // We want to compare the start of today, vs this.
	        // Getting start-of-today depends on whether we're local/utc/offset or not.
	        var now = time || createLocal(),
	            sod = cloneWithOffset(now, this).startOf('day'),
	            format = hooks.calendarFormat(this, sod) || 'sameElse',
	            output =
	                formats &&
	                (isFunction(formats[format])
	                    ? formats[format].call(this, now)
	                    : formats[format]);

	        return this.format(
	            output || this.localeData().calendar(format, this, createLocal(now))
	        );
	    }

	    function clone() {
	        return new Moment(this);
	    }

	    function isAfter(input, units) {
	        var localInput = isMoment(input) ? input : createLocal(input);
	        if (!(this.isValid() && localInput.isValid())) {
	            return false;
	        }
	        units = normalizeUnits(units) || 'millisecond';
	        if (units === 'millisecond') {
	            return this.valueOf() > localInput.valueOf();
	        } else {
	            return localInput.valueOf() < this.clone().startOf(units).valueOf();
	        }
	    }

	    function isBefore(input, units) {
	        var localInput = isMoment(input) ? input : createLocal(input);
	        if (!(this.isValid() && localInput.isValid())) {
	            return false;
	        }
	        units = normalizeUnits(units) || 'millisecond';
	        if (units === 'millisecond') {
	            return this.valueOf() < localInput.valueOf();
	        } else {
	            return this.clone().endOf(units).valueOf() < localInput.valueOf();
	        }
	    }

	    function isBetween(from, to, units, inclusivity) {
	        var localFrom = isMoment(from) ? from : createLocal(from),
	            localTo = isMoment(to) ? to : createLocal(to);
	        if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
	            return false;
	        }
	        inclusivity = inclusivity || '()';
	        return (
	            (inclusivity[0] === '('
	                ? this.isAfter(localFrom, units)
	                : !this.isBefore(localFrom, units)) &&
	            (inclusivity[1] === ')'
	                ? this.isBefore(localTo, units)
	                : !this.isAfter(localTo, units))
	        );
	    }

	    function isSame(input, units) {
	        var localInput = isMoment(input) ? input : createLocal(input),
	            inputMs;
	        if (!(this.isValid() && localInput.isValid())) {
	            return false;
	        }
	        units = normalizeUnits(units) || 'millisecond';
	        if (units === 'millisecond') {
	            return this.valueOf() === localInput.valueOf();
	        } else {
	            inputMs = localInput.valueOf();
	            return (
	                this.clone().startOf(units).valueOf() <= inputMs &&
	                inputMs <= this.clone().endOf(units).valueOf()
	            );
	        }
	    }

	    function isSameOrAfter(input, units) {
	        return this.isSame(input, units) || this.isAfter(input, units);
	    }

	    function isSameOrBefore(input, units) {
	        return this.isSame(input, units) || this.isBefore(input, units);
	    }

	    function diff(input, units, asFloat) {
	        var that, zoneDelta, output;

	        if (!this.isValid()) {
	            return NaN;
	        }

	        that = cloneWithOffset(input, this);

	        if (!that.isValid()) {
	            return NaN;
	        }

	        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

	        units = normalizeUnits(units);

	        switch (units) {
	            case 'year':
	                output = monthDiff(this, that) / 12;
	                break;
	            case 'month':
	                output = monthDiff(this, that);
	                break;
	            case 'quarter':
	                output = monthDiff(this, that) / 3;
	                break;
	            case 'second':
	                output = (this - that) / 1e3;
	                break; // 1000
	            case 'minute':
	                output = (this - that) / 6e4;
	                break; // 1000 * 60
	            case 'hour':
	                output = (this - that) / 36e5;
	                break; // 1000 * 60 * 60
	            case 'day':
	                output = (this - that - zoneDelta) / 864e5;
	                break; // 1000 * 60 * 60 * 24, negate dst
	            case 'week':
	                output = (this - that - zoneDelta) / 6048e5;
	                break; // 1000 * 60 * 60 * 24 * 7, negate dst
	            default:
	                output = this - that;
	        }

	        return asFloat ? output : absFloor(output);
	    }

	    function monthDiff(a, b) {
	        if (a.date() < b.date()) {
	            // end-of-month calculations work correct when the start month has more
	            // days than the end month.
	            return -monthDiff(b, a);
	        }
	        // difference in months
	        var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()),
	            // b is in (anchor - 1 month, anchor + 1 month)
	            anchor = a.clone().add(wholeMonthDiff, 'months'),
	            anchor2,
	            adjust;

	        if (b - anchor < 0) {
	            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
	            // linear across the month
	            adjust = (b - anchor) / (anchor - anchor2);
	        } else {
	            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
	            // linear across the month
	            adjust = (b - anchor) / (anchor2 - anchor);
	        }

	        //check for negative zero, return zero if negative zero
	        return -(wholeMonthDiff + adjust) || 0;
	    }

	    hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
	    hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

	    function toString() {
	        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
	    }

	    function toISOString(keepOffset) {
	        if (!this.isValid()) {
	            return null;
	        }
	        var utc = keepOffset !== true,
	            m = utc ? this.clone().utc() : this;
	        if (m.year() < 0 || m.year() > 9999) {
	            return formatMoment(
	                m,
	                utc
	                    ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]'
	                    : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ'
	            );
	        }
	        if (isFunction(Date.prototype.toISOString)) {
	            // native implementation is ~50x faster, use it when we can
	            if (utc) {
	                return this.toDate().toISOString();
	            } else {
	                return new Date(this.valueOf() + this.utcOffset() * 60 * 1000)
	                    .toISOString()
	                    .replace('Z', formatMoment(m, 'Z'));
	            }
	        }
	        return formatMoment(
	            m,
	            utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ'
	        );
	    }

	    /**
	     * Return a human readable representation of a moment that can
	     * also be evaluated to get a new moment which is the same
	     *
	     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
	     */
	    function inspect() {
	        if (!this.isValid()) {
	            return 'moment.invalid(/* ' + this._i + ' */)';
	        }
	        var func = 'moment',
	            zone = '',
	            prefix,
	            year,
	            datetime,
	            suffix;
	        if (!this.isLocal()) {
	            func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
	            zone = 'Z';
	        }
	        prefix = '[' + func + '("]';
	        year = 0 <= this.year() && this.year() <= 9999 ? 'YYYY' : 'YYYYYY';
	        datetime = '-MM-DD[T]HH:mm:ss.SSS';
	        suffix = zone + '[")]';

	        return this.format(prefix + year + datetime + suffix);
	    }

	    function format(inputString) {
	        if (!inputString) {
	            inputString = this.isUtc()
	                ? hooks.defaultFormatUtc
	                : hooks.defaultFormat;
	        }
	        var output = formatMoment(this, inputString);
	        return this.localeData().postformat(output);
	    }

	    function from(time, withoutSuffix) {
	        if (
	            this.isValid() &&
	            ((isMoment(time) && time.isValid()) || createLocal(time).isValid())
	        ) {
	            return createDuration({ to: this, from: time })
	                .locale(this.locale())
	                .humanize(!withoutSuffix);
	        } else {
	            return this.localeData().invalidDate();
	        }
	    }

	    function fromNow(withoutSuffix) {
	        return this.from(createLocal(), withoutSuffix);
	    }

	    function to(time, withoutSuffix) {
	        if (
	            this.isValid() &&
	            ((isMoment(time) && time.isValid()) || createLocal(time).isValid())
	        ) {
	            return createDuration({ from: this, to: time })
	                .locale(this.locale())
	                .humanize(!withoutSuffix);
	        } else {
	            return this.localeData().invalidDate();
	        }
	    }

	    function toNow(withoutSuffix) {
	        return this.to(createLocal(), withoutSuffix);
	    }

	    // If passed a locale key, it will set the locale for this
	    // instance.  Otherwise, it will return the locale configuration
	    // variables for this instance.
	    function locale(key) {
	        var newLocaleData;

	        if (key === undefined) {
	            return this._locale._abbr;
	        } else {
	            newLocaleData = getLocale(key);
	            if (newLocaleData != null) {
	                this._locale = newLocaleData;
	            }
	            return this;
	        }
	    }

	    var lang = deprecate(
	        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
	        function (key) {
	            if (key === undefined) {
	                return this.localeData();
	            } else {
	                return this.locale(key);
	            }
	        }
	    );

	    function localeData() {
	        return this._locale;
	    }

	    var MS_PER_SECOND = 1000,
	        MS_PER_MINUTE = 60 * MS_PER_SECOND,
	        MS_PER_HOUR = 60 * MS_PER_MINUTE,
	        MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;

	    // actual modulo - handles negative numbers (for dates before 1970):
	    function mod$1(dividend, divisor) {
	        return ((dividend % divisor) + divisor) % divisor;
	    }

	    function localStartOfDate(y, m, d) {
	        // the date constructor remaps years 0-99 to 1900-1999
	        if (y < 100 && y >= 0) {
	            // preserve leap years using a full 400 year cycle, then reset
	            return new Date(y + 400, m, d) - MS_PER_400_YEARS;
	        } else {
	            return new Date(y, m, d).valueOf();
	        }
	    }

	    function utcStartOfDate(y, m, d) {
	        // Date.UTC remaps years 0-99 to 1900-1999
	        if (y < 100 && y >= 0) {
	            // preserve leap years using a full 400 year cycle, then reset
	            return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
	        } else {
	            return Date.UTC(y, m, d);
	        }
	    }

	    function startOf(units) {
	        var time, startOfDate;
	        units = normalizeUnits(units);
	        if (units === undefined || units === 'millisecond' || !this.isValid()) {
	            return this;
	        }

	        startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

	        switch (units) {
	            case 'year':
	                time = startOfDate(this.year(), 0, 1);
	                break;
	            case 'quarter':
	                time = startOfDate(
	                    this.year(),
	                    this.month() - (this.month() % 3),
	                    1
	                );
	                break;
	            case 'month':
	                time = startOfDate(this.year(), this.month(), 1);
	                break;
	            case 'week':
	                time = startOfDate(
	                    this.year(),
	                    this.month(),
	                    this.date() - this.weekday()
	                );
	                break;
	            case 'isoWeek':
	                time = startOfDate(
	                    this.year(),
	                    this.month(),
	                    this.date() - (this.isoWeekday() - 1)
	                );
	                break;
	            case 'day':
	            case 'date':
	                time = startOfDate(this.year(), this.month(), this.date());
	                break;
	            case 'hour':
	                time = this._d.valueOf();
	                time -= mod$1(
	                    time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
	                    MS_PER_HOUR
	                );
	                break;
	            case 'minute':
	                time = this._d.valueOf();
	                time -= mod$1(time, MS_PER_MINUTE);
	                break;
	            case 'second':
	                time = this._d.valueOf();
	                time -= mod$1(time, MS_PER_SECOND);
	                break;
	        }

	        this._d.setTime(time);
	        hooks.updateOffset(this, true);
	        return this;
	    }

	    function endOf(units) {
	        var time, startOfDate;
	        units = normalizeUnits(units);
	        if (units === undefined || units === 'millisecond' || !this.isValid()) {
	            return this;
	        }

	        startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

	        switch (units) {
	            case 'year':
	                time = startOfDate(this.year() + 1, 0, 1) - 1;
	                break;
	            case 'quarter':
	                time =
	                    startOfDate(
	                        this.year(),
	                        this.month() - (this.month() % 3) + 3,
	                        1
	                    ) - 1;
	                break;
	            case 'month':
	                time = startOfDate(this.year(), this.month() + 1, 1) - 1;
	                break;
	            case 'week':
	                time =
	                    startOfDate(
	                        this.year(),
	                        this.month(),
	                        this.date() - this.weekday() + 7
	                    ) - 1;
	                break;
	            case 'isoWeek':
	                time =
	                    startOfDate(
	                        this.year(),
	                        this.month(),
	                        this.date() - (this.isoWeekday() - 1) + 7
	                    ) - 1;
	                break;
	            case 'day':
	            case 'date':
	                time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
	                break;
	            case 'hour':
	                time = this._d.valueOf();
	                time +=
	                    MS_PER_HOUR -
	                    mod$1(
	                        time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
	                        MS_PER_HOUR
	                    ) -
	                    1;
	                break;
	            case 'minute':
	                time = this._d.valueOf();
	                time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
	                break;
	            case 'second':
	                time = this._d.valueOf();
	                time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
	                break;
	        }

	        this._d.setTime(time);
	        hooks.updateOffset(this, true);
	        return this;
	    }

	    function valueOf() {
	        return this._d.valueOf() - (this._offset || 0) * 60000;
	    }

	    function unix() {
	        return Math.floor(this.valueOf() / 1000);
	    }

	    function toDate() {
	        return new Date(this.valueOf());
	    }

	    function toArray() {
	        var m = this;
	        return [
	            m.year(),
	            m.month(),
	            m.date(),
	            m.hour(),
	            m.minute(),
	            m.second(),
	            m.millisecond(),
	        ];
	    }

	    function toObject() {
	        var m = this;
	        return {
	            years: m.year(),
	            months: m.month(),
	            date: m.date(),
	            hours: m.hours(),
	            minutes: m.minutes(),
	            seconds: m.seconds(),
	            milliseconds: m.milliseconds(),
	        };
	    }

	    function toJSON() {
	        // new Date(NaN).toJSON() === null
	        return this.isValid() ? this.toISOString() : null;
	    }

	    function isValid$2() {
	        return isValid(this);
	    }

	    function parsingFlags() {
	        return extend({}, getParsingFlags(this));
	    }

	    function invalidAt() {
	        return getParsingFlags(this).overflow;
	    }

	    function creationData() {
	        return {
	            input: this._i,
	            format: this._f,
	            locale: this._locale,
	            isUTC: this._isUTC,
	            strict: this._strict,
	        };
	    }

	    addFormatToken('N', 0, 0, 'eraAbbr');
	    addFormatToken('NN', 0, 0, 'eraAbbr');
	    addFormatToken('NNN', 0, 0, 'eraAbbr');
	    addFormatToken('NNNN', 0, 0, 'eraName');
	    addFormatToken('NNNNN', 0, 0, 'eraNarrow');

	    addFormatToken('y', ['y', 1], 'yo', 'eraYear');
	    addFormatToken('y', ['yy', 2], 0, 'eraYear');
	    addFormatToken('y', ['yyy', 3], 0, 'eraYear');
	    addFormatToken('y', ['yyyy', 4], 0, 'eraYear');

	    addRegexToken('N', matchEraAbbr);
	    addRegexToken('NN', matchEraAbbr);
	    addRegexToken('NNN', matchEraAbbr);
	    addRegexToken('NNNN', matchEraName);
	    addRegexToken('NNNNN', matchEraNarrow);

	    addParseToken(['N', 'NN', 'NNN', 'NNNN', 'NNNNN'], function (
	        input,
	        array,
	        config,
	        token
	    ) {
	        var era = config._locale.erasParse(input, token, config._strict);
	        if (era) {
	            getParsingFlags(config).era = era;
	        } else {
	            getParsingFlags(config).invalidEra = input;
	        }
	    });

	    addRegexToken('y', matchUnsigned);
	    addRegexToken('yy', matchUnsigned);
	    addRegexToken('yyy', matchUnsigned);
	    addRegexToken('yyyy', matchUnsigned);
	    addRegexToken('yo', matchEraYearOrdinal);

	    addParseToken(['y', 'yy', 'yyy', 'yyyy'], YEAR);
	    addParseToken(['yo'], function (input, array, config, token) {
	        var match;
	        if (config._locale._eraYearOrdinalRegex) {
	            match = input.match(config._locale._eraYearOrdinalRegex);
	        }

	        if (config._locale.eraYearOrdinalParse) {
	            array[YEAR] = config._locale.eraYearOrdinalParse(input, match);
	        } else {
	            array[YEAR] = parseInt(input, 10);
	        }
	    });

	    function localeEras(m, format) {
	        var i,
	            l,
	            date,
	            eras = this._eras || getLocale('en')._eras;
	        for (i = 0, l = eras.length; i < l; ++i) {
	            switch (typeof eras[i].since) {
	                case 'string':
	                    // truncate time
	                    date = hooks(eras[i].since).startOf('day');
	                    eras[i].since = date.valueOf();
	                    break;
	            }

	            switch (typeof eras[i].until) {
	                case 'undefined':
	                    eras[i].until = +Infinity;
	                    break;
	                case 'string':
	                    // truncate time
	                    date = hooks(eras[i].until).startOf('day').valueOf();
	                    eras[i].until = date.valueOf();
	                    break;
	            }
	        }
	        return eras;
	    }

	    function localeErasParse(eraName, format, strict) {
	        var i,
	            l,
	            eras = this.eras(),
	            name,
	            abbr,
	            narrow;
	        eraName = eraName.toUpperCase();

	        for (i = 0, l = eras.length; i < l; ++i) {
	            name = eras[i].name.toUpperCase();
	            abbr = eras[i].abbr.toUpperCase();
	            narrow = eras[i].narrow.toUpperCase();

	            if (strict) {
	                switch (format) {
	                    case 'N':
	                    case 'NN':
	                    case 'NNN':
	                        if (abbr === eraName) {
	                            return eras[i];
	                        }
	                        break;

	                    case 'NNNN':
	                        if (name === eraName) {
	                            return eras[i];
	                        }
	                        break;

	                    case 'NNNNN':
	                        if (narrow === eraName) {
	                            return eras[i];
	                        }
	                        break;
	                }
	            } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
	                return eras[i];
	            }
	        }
	    }

	    function localeErasConvertYear(era, year) {
	        var dir = era.since <= era.until ? +1 : -1;
	        if (year === undefined) {
	            return hooks(era.since).year();
	        } else {
	            return hooks(era.since).year() + (year - era.offset) * dir;
	        }
	    }

	    function getEraName() {
	        var i,
	            l,
	            val,
	            eras = this.localeData().eras();
	        for (i = 0, l = eras.length; i < l; ++i) {
	            // truncate time
	            val = this.startOf('day').valueOf();

	            if (eras[i].since <= val && val <= eras[i].until) {
	                return eras[i].name;
	            }
	            if (eras[i].until <= val && val <= eras[i].since) {
	                return eras[i].name;
	            }
	        }

	        return '';
	    }

	    function getEraNarrow() {
	        var i,
	            l,
	            val,
	            eras = this.localeData().eras();
	        for (i = 0, l = eras.length; i < l; ++i) {
	            // truncate time
	            val = this.startOf('day').valueOf();

	            if (eras[i].since <= val && val <= eras[i].until) {
	                return eras[i].narrow;
	            }
	            if (eras[i].until <= val && val <= eras[i].since) {
	                return eras[i].narrow;
	            }
	        }

	        return '';
	    }

	    function getEraAbbr() {
	        var i,
	            l,
	            val,
	            eras = this.localeData().eras();
	        for (i = 0, l = eras.length; i < l; ++i) {
	            // truncate time
	            val = this.startOf('day').valueOf();

	            if (eras[i].since <= val && val <= eras[i].until) {
	                return eras[i].abbr;
	            }
	            if (eras[i].until <= val && val <= eras[i].since) {
	                return eras[i].abbr;
	            }
	        }

	        return '';
	    }

	    function getEraYear() {
	        var i,
	            l,
	            dir,
	            val,
	            eras = this.localeData().eras();
	        for (i = 0, l = eras.length; i < l; ++i) {
	            dir = eras[i].since <= eras[i].until ? +1 : -1;

	            // truncate time
	            val = this.startOf('day').valueOf();

	            if (
	                (eras[i].since <= val && val <= eras[i].until) ||
	                (eras[i].until <= val && val <= eras[i].since)
	            ) {
	                return (
	                    (this.year() - hooks(eras[i].since).year()) * dir +
	                    eras[i].offset
	                );
	            }
	        }

	        return this.year();
	    }

	    function erasNameRegex(isStrict) {
	        if (!hasOwnProp(this, '_erasNameRegex')) {
	            computeErasParse.call(this);
	        }
	        return isStrict ? this._erasNameRegex : this._erasRegex;
	    }

	    function erasAbbrRegex(isStrict) {
	        if (!hasOwnProp(this, '_erasAbbrRegex')) {
	            computeErasParse.call(this);
	        }
	        return isStrict ? this._erasAbbrRegex : this._erasRegex;
	    }

	    function erasNarrowRegex(isStrict) {
	        if (!hasOwnProp(this, '_erasNarrowRegex')) {
	            computeErasParse.call(this);
	        }
	        return isStrict ? this._erasNarrowRegex : this._erasRegex;
	    }

	    function matchEraAbbr(isStrict, locale) {
	        return locale.erasAbbrRegex(isStrict);
	    }

	    function matchEraName(isStrict, locale) {
	        return locale.erasNameRegex(isStrict);
	    }

	    function matchEraNarrow(isStrict, locale) {
	        return locale.erasNarrowRegex(isStrict);
	    }

	    function matchEraYearOrdinal(isStrict, locale) {
	        return locale._eraYearOrdinalRegex || matchUnsigned;
	    }

	    function computeErasParse() {
	        var abbrPieces = [],
	            namePieces = [],
	            narrowPieces = [],
	            mixedPieces = [],
	            i,
	            l,
	            eras = this.eras();

	        for (i = 0, l = eras.length; i < l; ++i) {
	            namePieces.push(regexEscape(eras[i].name));
	            abbrPieces.push(regexEscape(eras[i].abbr));
	            narrowPieces.push(regexEscape(eras[i].narrow));

	            mixedPieces.push(regexEscape(eras[i].name));
	            mixedPieces.push(regexEscape(eras[i].abbr));
	            mixedPieces.push(regexEscape(eras[i].narrow));
	        }

	        this._erasRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
	        this._erasNameRegex = new RegExp('^(' + namePieces.join('|') + ')', 'i');
	        this._erasAbbrRegex = new RegExp('^(' + abbrPieces.join('|') + ')', 'i');
	        this._erasNarrowRegex = new RegExp(
	            '^(' + narrowPieces.join('|') + ')',
	            'i'
	        );
	    }

	    // FORMATTING

	    addFormatToken(0, ['gg', 2], 0, function () {
	        return this.weekYear() % 100;
	    });

	    addFormatToken(0, ['GG', 2], 0, function () {
	        return this.isoWeekYear() % 100;
	    });

	    function addWeekYearFormatToken(token, getter) {
	        addFormatToken(0, [token, token.length], 0, getter);
	    }

	    addWeekYearFormatToken('gggg', 'weekYear');
	    addWeekYearFormatToken('ggggg', 'weekYear');
	    addWeekYearFormatToken('GGGG', 'isoWeekYear');
	    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

	    // ALIASES

	    addUnitAlias('weekYear', 'gg');
	    addUnitAlias('isoWeekYear', 'GG');

	    // PRIORITY

	    addUnitPriority('weekYear', 1);
	    addUnitPriority('isoWeekYear', 1);

	    // PARSING

	    addRegexToken('G', matchSigned);
	    addRegexToken('g', matchSigned);
	    addRegexToken('GG', match1to2, match2);
	    addRegexToken('gg', match1to2, match2);
	    addRegexToken('GGGG', match1to4, match4);
	    addRegexToken('gggg', match1to4, match4);
	    addRegexToken('GGGGG', match1to6, match6);
	    addRegexToken('ggggg', match1to6, match6);

	    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (
	        input,
	        week,
	        config,
	        token
	    ) {
	        week[token.substr(0, 2)] = toInt(input);
	    });

	    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
	        week[token] = hooks.parseTwoDigitYear(input);
	    });

	    // MOMENTS

	    function getSetWeekYear(input) {
	        return getSetWeekYearHelper.call(
	            this,
	            input,
	            this.week(),
	            this.weekday(),
	            this.localeData()._week.dow,
	            this.localeData()._week.doy
	        );
	    }

	    function getSetISOWeekYear(input) {
	        return getSetWeekYearHelper.call(
	            this,
	            input,
	            this.isoWeek(),
	            this.isoWeekday(),
	            1,
	            4
	        );
	    }

	    function getISOWeeksInYear() {
	        return weeksInYear(this.year(), 1, 4);
	    }

	    function getISOWeeksInISOWeekYear() {
	        return weeksInYear(this.isoWeekYear(), 1, 4);
	    }

	    function getWeeksInYear() {
	        var weekInfo = this.localeData()._week;
	        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
	    }

	    function getWeeksInWeekYear() {
	        var weekInfo = this.localeData()._week;
	        return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
	    }

	    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
	        var weeksTarget;
	        if (input == null) {
	            return weekOfYear(this, dow, doy).year;
	        } else {
	            weeksTarget = weeksInYear(input, dow, doy);
	            if (week > weeksTarget) {
	                week = weeksTarget;
	            }
	            return setWeekAll.call(this, input, week, weekday, dow, doy);
	        }
	    }

	    function setWeekAll(weekYear, week, weekday, dow, doy) {
	        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
	            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

	        this.year(date.getUTCFullYear());
	        this.month(date.getUTCMonth());
	        this.date(date.getUTCDate());
	        return this;
	    }

	    // FORMATTING

	    addFormatToken('Q', 0, 'Qo', 'quarter');

	    // ALIASES

	    addUnitAlias('quarter', 'Q');

	    // PRIORITY

	    addUnitPriority('quarter', 7);

	    // PARSING

	    addRegexToken('Q', match1);
	    addParseToken('Q', function (input, array) {
	        array[MONTH] = (toInt(input) - 1) * 3;
	    });

	    // MOMENTS

	    function getSetQuarter(input) {
	        return input == null
	            ? Math.ceil((this.month() + 1) / 3)
	            : this.month((input - 1) * 3 + (this.month() % 3));
	    }

	    // FORMATTING

	    addFormatToken('D', ['DD', 2], 'Do', 'date');

	    // ALIASES

	    addUnitAlias('date', 'D');

	    // PRIORITY
	    addUnitPriority('date', 9);

	    // PARSING

	    addRegexToken('D', match1to2);
	    addRegexToken('DD', match1to2, match2);
	    addRegexToken('Do', function (isStrict, locale) {
	        // TODO: Remove "ordinalParse" fallback in next major release.
	        return isStrict
	            ? locale._dayOfMonthOrdinalParse || locale._ordinalParse
	            : locale._dayOfMonthOrdinalParseLenient;
	    });

	    addParseToken(['D', 'DD'], DATE);
	    addParseToken('Do', function (input, array) {
	        array[DATE] = toInt(input.match(match1to2)[0]);
	    });

	    // MOMENTS

	    var getSetDayOfMonth = makeGetSet('Date', true);

	    // FORMATTING

	    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

	    // ALIASES

	    addUnitAlias('dayOfYear', 'DDD');

	    // PRIORITY
	    addUnitPriority('dayOfYear', 4);

	    // PARSING

	    addRegexToken('DDD', match1to3);
	    addRegexToken('DDDD', match3);
	    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
	        config._dayOfYear = toInt(input);
	    });

	    // HELPERS

	    // MOMENTS

	    function getSetDayOfYear(input) {
	        var dayOfYear =
	            Math.round(
	                (this.clone().startOf('day') - this.clone().startOf('year')) / 864e5
	            ) + 1;
	        return input == null ? dayOfYear : this.add(input - dayOfYear, 'd');
	    }

	    // FORMATTING

	    addFormatToken('m', ['mm', 2], 0, 'minute');

	    // ALIASES

	    addUnitAlias('minute', 'm');

	    // PRIORITY

	    addUnitPriority('minute', 14);

	    // PARSING

	    addRegexToken('m', match1to2);
	    addRegexToken('mm', match1to2, match2);
	    addParseToken(['m', 'mm'], MINUTE);

	    // MOMENTS

	    var getSetMinute = makeGetSet('Minutes', false);

	    // FORMATTING

	    addFormatToken('s', ['ss', 2], 0, 'second');

	    // ALIASES

	    addUnitAlias('second', 's');

	    // PRIORITY

	    addUnitPriority('second', 15);

	    // PARSING

	    addRegexToken('s', match1to2);
	    addRegexToken('ss', match1to2, match2);
	    addParseToken(['s', 'ss'], SECOND);

	    // MOMENTS

	    var getSetSecond = makeGetSet('Seconds', false);

	    // FORMATTING

	    addFormatToken('S', 0, 0, function () {
	        return ~~(this.millisecond() / 100);
	    });

	    addFormatToken(0, ['SS', 2], 0, function () {
	        return ~~(this.millisecond() / 10);
	    });

	    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
	    addFormatToken(0, ['SSSS', 4], 0, function () {
	        return this.millisecond() * 10;
	    });
	    addFormatToken(0, ['SSSSS', 5], 0, function () {
	        return this.millisecond() * 100;
	    });
	    addFormatToken(0, ['SSSSSS', 6], 0, function () {
	        return this.millisecond() * 1000;
	    });
	    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
	        return this.millisecond() * 10000;
	    });
	    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
	        return this.millisecond() * 100000;
	    });
	    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
	        return this.millisecond() * 1000000;
	    });

	    // ALIASES

	    addUnitAlias('millisecond', 'ms');

	    // PRIORITY

	    addUnitPriority('millisecond', 16);

	    // PARSING

	    addRegexToken('S', match1to3, match1);
	    addRegexToken('SS', match1to3, match2);
	    addRegexToken('SSS', match1to3, match3);

	    var token, getSetMillisecond;
	    for (token = 'SSSS'; token.length <= 9; token += 'S') {
	        addRegexToken(token, matchUnsigned);
	    }

	    function parseMs(input, array) {
	        array[MILLISECOND] = toInt(('0.' + input) * 1000);
	    }

	    for (token = 'S'; token.length <= 9; token += 'S') {
	        addParseToken(token, parseMs);
	    }

	    getSetMillisecond = makeGetSet('Milliseconds', false);

	    // FORMATTING

	    addFormatToken('z', 0, 0, 'zoneAbbr');
	    addFormatToken('zz', 0, 0, 'zoneName');

	    // MOMENTS

	    function getZoneAbbr() {
	        return this._isUTC ? 'UTC' : '';
	    }

	    function getZoneName() {
	        return this._isUTC ? 'Coordinated Universal Time' : '';
	    }

	    var proto = Moment.prototype;

	    proto.add = add;
	    proto.calendar = calendar$1;
	    proto.clone = clone;
	    proto.diff = diff;
	    proto.endOf = endOf;
	    proto.format = format;
	    proto.from = from;
	    proto.fromNow = fromNow;
	    proto.to = to;
	    proto.toNow = toNow;
	    proto.get = stringGet;
	    proto.invalidAt = invalidAt;
	    proto.isAfter = isAfter;
	    proto.isBefore = isBefore;
	    proto.isBetween = isBetween;
	    proto.isSame = isSame;
	    proto.isSameOrAfter = isSameOrAfter;
	    proto.isSameOrBefore = isSameOrBefore;
	    proto.isValid = isValid$2;
	    proto.lang = lang;
	    proto.locale = locale;
	    proto.localeData = localeData;
	    proto.max = prototypeMax;
	    proto.min = prototypeMin;
	    proto.parsingFlags = parsingFlags;
	    proto.set = stringSet;
	    proto.startOf = startOf;
	    proto.subtract = subtract;
	    proto.toArray = toArray;
	    proto.toObject = toObject;
	    proto.toDate = toDate;
	    proto.toISOString = toISOString;
	    proto.inspect = inspect;
	    if (typeof Symbol !== 'undefined' && Symbol.for != null) {
	        proto[Symbol.for('nodejs.util.inspect.custom')] = function () {
	            return 'Moment<' + this.format() + '>';
	        };
	    }
	    proto.toJSON = toJSON;
	    proto.toString = toString;
	    proto.unix = unix;
	    proto.valueOf = valueOf;
	    proto.creationData = creationData;
	    proto.eraName = getEraName;
	    proto.eraNarrow = getEraNarrow;
	    proto.eraAbbr = getEraAbbr;
	    proto.eraYear = getEraYear;
	    proto.year = getSetYear;
	    proto.isLeapYear = getIsLeapYear;
	    proto.weekYear = getSetWeekYear;
	    proto.isoWeekYear = getSetISOWeekYear;
	    proto.quarter = proto.quarters = getSetQuarter;
	    proto.month = getSetMonth;
	    proto.daysInMonth = getDaysInMonth;
	    proto.week = proto.weeks = getSetWeek;
	    proto.isoWeek = proto.isoWeeks = getSetISOWeek;
	    proto.weeksInYear = getWeeksInYear;
	    proto.weeksInWeekYear = getWeeksInWeekYear;
	    proto.isoWeeksInYear = getISOWeeksInYear;
	    proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
	    proto.date = getSetDayOfMonth;
	    proto.day = proto.days = getSetDayOfWeek;
	    proto.weekday = getSetLocaleDayOfWeek;
	    proto.isoWeekday = getSetISODayOfWeek;
	    proto.dayOfYear = getSetDayOfYear;
	    proto.hour = proto.hours = getSetHour;
	    proto.minute = proto.minutes = getSetMinute;
	    proto.second = proto.seconds = getSetSecond;
	    proto.millisecond = proto.milliseconds = getSetMillisecond;
	    proto.utcOffset = getSetOffset;
	    proto.utc = setOffsetToUTC;
	    proto.local = setOffsetToLocal;
	    proto.parseZone = setOffsetToParsedOffset;
	    proto.hasAlignedHourOffset = hasAlignedHourOffset;
	    proto.isDST = isDaylightSavingTime;
	    proto.isLocal = isLocal;
	    proto.isUtcOffset = isUtcOffset;
	    proto.isUtc = isUtc;
	    proto.isUTC = isUtc;
	    proto.zoneAbbr = getZoneAbbr;
	    proto.zoneName = getZoneName;
	    proto.dates = deprecate(
	        'dates accessor is deprecated. Use date instead.',
	        getSetDayOfMonth
	    );
	    proto.months = deprecate(
	        'months accessor is deprecated. Use month instead',
	        getSetMonth
	    );
	    proto.years = deprecate(
	        'years accessor is deprecated. Use year instead',
	        getSetYear
	    );
	    proto.zone = deprecate(
	        'moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/',
	        getSetZone
	    );
	    proto.isDSTShifted = deprecate(
	        'isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information',
	        isDaylightSavingTimeShifted
	    );

	    function createUnix(input) {
	        return createLocal(input * 1000);
	    }

	    function createInZone() {
	        return createLocal.apply(null, arguments).parseZone();
	    }

	    function preParsePostFormat(string) {
	        return string;
	    }

	    var proto$1 = Locale.prototype;

	    proto$1.calendar = calendar;
	    proto$1.longDateFormat = longDateFormat;
	    proto$1.invalidDate = invalidDate;
	    proto$1.ordinal = ordinal;
	    proto$1.preparse = preParsePostFormat;
	    proto$1.postformat = preParsePostFormat;
	    proto$1.relativeTime = relativeTime;
	    proto$1.pastFuture = pastFuture;
	    proto$1.set = set;
	    proto$1.eras = localeEras;
	    proto$1.erasParse = localeErasParse;
	    proto$1.erasConvertYear = localeErasConvertYear;
	    proto$1.erasAbbrRegex = erasAbbrRegex;
	    proto$1.erasNameRegex = erasNameRegex;
	    proto$1.erasNarrowRegex = erasNarrowRegex;

	    proto$1.months = localeMonths;
	    proto$1.monthsShort = localeMonthsShort;
	    proto$1.monthsParse = localeMonthsParse;
	    proto$1.monthsRegex = monthsRegex;
	    proto$1.monthsShortRegex = monthsShortRegex;
	    proto$1.week = localeWeek;
	    proto$1.firstDayOfYear = localeFirstDayOfYear;
	    proto$1.firstDayOfWeek = localeFirstDayOfWeek;

	    proto$1.weekdays = localeWeekdays;
	    proto$1.weekdaysMin = localeWeekdaysMin;
	    proto$1.weekdaysShort = localeWeekdaysShort;
	    proto$1.weekdaysParse = localeWeekdaysParse;

	    proto$1.weekdaysRegex = weekdaysRegex;
	    proto$1.weekdaysShortRegex = weekdaysShortRegex;
	    proto$1.weekdaysMinRegex = weekdaysMinRegex;

	    proto$1.isPM = localeIsPM;
	    proto$1.meridiem = localeMeridiem;

	    function get$1(format, index, field, setter) {
	        var locale = getLocale(),
	            utc = createUTC().set(setter, index);
	        return locale[field](utc, format);
	    }

	    function listMonthsImpl(format, index, field) {
	        if (isNumber(format)) {
	            index = format;
	            format = undefined;
	        }

	        format = format || '';

	        if (index != null) {
	            return get$1(format, index, field, 'month');
	        }

	        var i,
	            out = [];
	        for (i = 0; i < 12; i++) {
	            out[i] = get$1(format, i, field, 'month');
	        }
	        return out;
	    }

	    // ()
	    // (5)
	    // (fmt, 5)
	    // (fmt)
	    // (true)
	    // (true, 5)
	    // (true, fmt, 5)
	    // (true, fmt)
	    function listWeekdaysImpl(localeSorted, format, index, field) {
	        if (typeof localeSorted === 'boolean') {
	            if (isNumber(format)) {
	                index = format;
	                format = undefined;
	            }

	            format = format || '';
	        } else {
	            format = localeSorted;
	            index = format;
	            localeSorted = false;

	            if (isNumber(format)) {
	                index = format;
	                format = undefined;
	            }

	            format = format || '';
	        }

	        var locale = getLocale(),
	            shift = localeSorted ? locale._week.dow : 0,
	            i,
	            out = [];

	        if (index != null) {
	            return get$1(format, (index + shift) % 7, field, 'day');
	        }

	        for (i = 0; i < 7; i++) {
	            out[i] = get$1(format, (i + shift) % 7, field, 'day');
	        }
	        return out;
	    }

	    function listMonths(format, index) {
	        return listMonthsImpl(format, index, 'months');
	    }

	    function listMonthsShort(format, index) {
	        return listMonthsImpl(format, index, 'monthsShort');
	    }

	    function listWeekdays(localeSorted, format, index) {
	        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
	    }

	    function listWeekdaysShort(localeSorted, format, index) {
	        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
	    }

	    function listWeekdaysMin(localeSorted, format, index) {
	        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
	    }

	    getSetGlobalLocale('en', {
	        eras: [
	            {
	                since: '0001-01-01',
	                until: +Infinity,
	                offset: 1,
	                name: 'Anno Domini',
	                narrow: 'AD',
	                abbr: 'AD',
	            },
	            {
	                since: '0000-12-31',
	                until: -Infinity,
	                offset: 1,
	                name: 'Before Christ',
	                narrow: 'BC',
	                abbr: 'BC',
	            },
	        ],
	        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
	        ordinal: function (number) {
	            var b = number % 10,
	                output =
	                    toInt((number % 100) / 10) === 1
	                        ? 'th'
	                        : b === 1
	                        ? 'st'
	                        : b === 2
	                        ? 'nd'
	                        : b === 3
	                        ? 'rd'
	                        : 'th';
	            return number + output;
	        },
	    });

	    // Side effect imports

	    hooks.lang = deprecate(
	        'moment.lang is deprecated. Use moment.locale instead.',
	        getSetGlobalLocale
	    );
	    hooks.langData = deprecate(
	        'moment.langData is deprecated. Use moment.localeData instead.',
	        getLocale
	    );

	    var mathAbs = Math.abs;

	    function abs() {
	        var data = this._data;

	        this._milliseconds = mathAbs(this._milliseconds);
	        this._days = mathAbs(this._days);
	        this._months = mathAbs(this._months);

	        data.milliseconds = mathAbs(data.milliseconds);
	        data.seconds = mathAbs(data.seconds);
	        data.minutes = mathAbs(data.minutes);
	        data.hours = mathAbs(data.hours);
	        data.months = mathAbs(data.months);
	        data.years = mathAbs(data.years);

	        return this;
	    }

	    function addSubtract$1(duration, input, value, direction) {
	        var other = createDuration(input, value);

	        duration._milliseconds += direction * other._milliseconds;
	        duration._days += direction * other._days;
	        duration._months += direction * other._months;

	        return duration._bubble();
	    }

	    // supports only 2.0-style add(1, 's') or add(duration)
	    function add$1(input, value) {
	        return addSubtract$1(this, input, value, 1);
	    }

	    // supports only 2.0-style subtract(1, 's') or subtract(duration)
	    function subtract$1(input, value) {
	        return addSubtract$1(this, input, value, -1);
	    }

	    function absCeil(number) {
	        if (number < 0) {
	            return Math.floor(number);
	        } else {
	            return Math.ceil(number);
	        }
	    }

	    function bubble() {
	        var milliseconds = this._milliseconds,
	            days = this._days,
	            months = this._months,
	            data = this._data,
	            seconds,
	            minutes,
	            hours,
	            years,
	            monthsFromDays;

	        // if we have a mix of positive and negative values, bubble down first
	        // check: https://github.com/moment/moment/issues/2166
	        if (
	            !(
	                (milliseconds >= 0 && days >= 0 && months >= 0) ||
	                (milliseconds <= 0 && days <= 0 && months <= 0)
	            )
	        ) {
	            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
	            days = 0;
	            months = 0;
	        }

	        // The following code bubbles up values, see the tests for
	        // examples of what that means.
	        data.milliseconds = milliseconds % 1000;

	        seconds = absFloor(milliseconds / 1000);
	        data.seconds = seconds % 60;

	        minutes = absFloor(seconds / 60);
	        data.minutes = minutes % 60;

	        hours = absFloor(minutes / 60);
	        data.hours = hours % 24;

	        days += absFloor(hours / 24);

	        // convert days to months
	        monthsFromDays = absFloor(daysToMonths(days));
	        months += monthsFromDays;
	        days -= absCeil(monthsToDays(monthsFromDays));

	        // 12 months -> 1 year
	        years = absFloor(months / 12);
	        months %= 12;

	        data.days = days;
	        data.months = months;
	        data.years = years;

	        return this;
	    }

	    function daysToMonths(days) {
	        // 400 years have 146097 days (taking into account leap year rules)
	        // 400 years have 12 months === 4800
	        return (days * 4800) / 146097;
	    }

	    function monthsToDays(months) {
	        // the reverse of daysToMonths
	        return (months * 146097) / 4800;
	    }

	    function as(units) {
	        if (!this.isValid()) {
	            return NaN;
	        }
	        var days,
	            months,
	            milliseconds = this._milliseconds;

	        units = normalizeUnits(units);

	        if (units === 'month' || units === 'quarter' || units === 'year') {
	            days = this._days + milliseconds / 864e5;
	            months = this._months + daysToMonths(days);
	            switch (units) {
	                case 'month':
	                    return months;
	                case 'quarter':
	                    return months / 3;
	                case 'year':
	                    return months / 12;
	            }
	        } else {
	            // handle milliseconds separately because of floating point math errors (issue #1867)
	            days = this._days + Math.round(monthsToDays(this._months));
	            switch (units) {
	                case 'week':
	                    return days / 7 + milliseconds / 6048e5;
	                case 'day':
	                    return days + milliseconds / 864e5;
	                case 'hour':
	                    return days * 24 + milliseconds / 36e5;
	                case 'minute':
	                    return days * 1440 + milliseconds / 6e4;
	                case 'second':
	                    return days * 86400 + milliseconds / 1000;
	                // Math.floor prevents floating point math errors here
	                case 'millisecond':
	                    return Math.floor(days * 864e5) + milliseconds;
	                default:
	                    throw new Error('Unknown unit ' + units);
	            }
	        }
	    }

	    // TODO: Use this.as('ms')?
	    function valueOf$1() {
	        if (!this.isValid()) {
	            return NaN;
	        }
	        return (
	            this._milliseconds +
	            this._days * 864e5 +
	            (this._months % 12) * 2592e6 +
	            toInt(this._months / 12) * 31536e6
	        );
	    }

	    function makeAs(alias) {
	        return function () {
	            return this.as(alias);
	        };
	    }

	    var asMilliseconds = makeAs('ms'),
	        asSeconds = makeAs('s'),
	        asMinutes = makeAs('m'),
	        asHours = makeAs('h'),
	        asDays = makeAs('d'),
	        asWeeks = makeAs('w'),
	        asMonths = makeAs('M'),
	        asQuarters = makeAs('Q'),
	        asYears = makeAs('y');

	    function clone$1() {
	        return createDuration(this);
	    }

	    function get$2(units) {
	        units = normalizeUnits(units);
	        return this.isValid() ? this[units + 's']() : NaN;
	    }

	    function makeGetter(name) {
	        return function () {
	            return this.isValid() ? this._data[name] : NaN;
	        };
	    }

	    var milliseconds = makeGetter('milliseconds'),
	        seconds = makeGetter('seconds'),
	        minutes = makeGetter('minutes'),
	        hours = makeGetter('hours'),
	        days = makeGetter('days'),
	        months = makeGetter('months'),
	        years = makeGetter('years');

	    function weeks() {
	        return absFloor(this.days() / 7);
	    }

	    var round = Math.round,
	        thresholds = {
	            ss: 44, // a few seconds to seconds
	            s: 45, // seconds to minute
	            m: 45, // minutes to hour
	            h: 22, // hours to day
	            d: 26, // days to month/week
	            w: null, // weeks to month
	            M: 11, // months to year
	        };

	    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
	    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
	        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
	    }

	    function relativeTime$1(posNegDuration, withoutSuffix, thresholds, locale) {
	        var duration = createDuration(posNegDuration).abs(),
	            seconds = round(duration.as('s')),
	            minutes = round(duration.as('m')),
	            hours = round(duration.as('h')),
	            days = round(duration.as('d')),
	            months = round(duration.as('M')),
	            weeks = round(duration.as('w')),
	            years = round(duration.as('y')),
	            a =
	                (seconds <= thresholds.ss && ['s', seconds]) ||
	                (seconds < thresholds.s && ['ss', seconds]) ||
	                (minutes <= 1 && ['m']) ||
	                (minutes < thresholds.m && ['mm', minutes]) ||
	                (hours <= 1 && ['h']) ||
	                (hours < thresholds.h && ['hh', hours]) ||
	                (days <= 1 && ['d']) ||
	                (days < thresholds.d && ['dd', days]);

	        if (thresholds.w != null) {
	            a =
	                a ||
	                (weeks <= 1 && ['w']) ||
	                (weeks < thresholds.w && ['ww', weeks]);
	        }
	        a = a ||
	            (months <= 1 && ['M']) ||
	            (months < thresholds.M && ['MM', months]) ||
	            (years <= 1 && ['y']) || ['yy', years];

	        a[2] = withoutSuffix;
	        a[3] = +posNegDuration > 0;
	        a[4] = locale;
	        return substituteTimeAgo.apply(null, a);
	    }

	    // This function allows you to set the rounding function for relative time strings
	    function getSetRelativeTimeRounding(roundingFunction) {
	        if (roundingFunction === undefined) {
	            return round;
	        }
	        if (typeof roundingFunction === 'function') {
	            round = roundingFunction;
	            return true;
	        }
	        return false;
	    }

	    // This function allows you to set a threshold for relative time strings
	    function getSetRelativeTimeThreshold(threshold, limit) {
	        if (thresholds[threshold] === undefined) {
	            return false;
	        }
	        if (limit === undefined) {
	            return thresholds[threshold];
	        }
	        thresholds[threshold] = limit;
	        if (threshold === 's') {
	            thresholds.ss = limit - 1;
	        }
	        return true;
	    }

	    function humanize(argWithSuffix, argThresholds) {
	        if (!this.isValid()) {
	            return this.localeData().invalidDate();
	        }

	        var withSuffix = false,
	            th = thresholds,
	            locale,
	            output;

	        if (typeof argWithSuffix === 'object') {
	            argThresholds = argWithSuffix;
	            argWithSuffix = false;
	        }
	        if (typeof argWithSuffix === 'boolean') {
	            withSuffix = argWithSuffix;
	        }
	        if (typeof argThresholds === 'object') {
	            th = Object.assign({}, thresholds, argThresholds);
	            if (argThresholds.s != null && argThresholds.ss == null) {
	                th.ss = argThresholds.s - 1;
	            }
	        }

	        locale = this.localeData();
	        output = relativeTime$1(this, !withSuffix, th, locale);

	        if (withSuffix) {
	            output = locale.pastFuture(+this, output);
	        }

	        return locale.postformat(output);
	    }

	    var abs$1 = Math.abs;

	    function sign(x) {
	        return (x > 0) - (x < 0) || +x;
	    }

	    function toISOString$1() {
	        // for ISO strings we do not use the normal bubbling rules:
	        //  * milliseconds bubble up until they become hours
	        //  * days do not bubble at all
	        //  * months bubble up until they become years
	        // This is because there is no context-free conversion between hours and days
	        // (think of clock changes)
	        // and also not between days and months (28-31 days per month)
	        if (!this.isValid()) {
	            return this.localeData().invalidDate();
	        }

	        var seconds = abs$1(this._milliseconds) / 1000,
	            days = abs$1(this._days),
	            months = abs$1(this._months),
	            minutes,
	            hours,
	            years,
	            s,
	            total = this.asSeconds(),
	            totalSign,
	            ymSign,
	            daysSign,
	            hmsSign;

	        if (!total) {
	            // this is the same as C#'s (Noda) and python (isodate)...
	            // but not other JS (goog.date)
	            return 'P0D';
	        }

	        // 3600 seconds -> 60 minutes -> 1 hour
	        minutes = absFloor(seconds / 60);
	        hours = absFloor(minutes / 60);
	        seconds %= 60;
	        minutes %= 60;

	        // 12 months -> 1 year
	        years = absFloor(months / 12);
	        months %= 12;

	        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
	        s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';

	        totalSign = total < 0 ? '-' : '';
	        ymSign = sign(this._months) !== sign(total) ? '-' : '';
	        daysSign = sign(this._days) !== sign(total) ? '-' : '';
	        hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

	        return (
	            totalSign +
	            'P' +
	            (years ? ymSign + years + 'Y' : '') +
	            (months ? ymSign + months + 'M' : '') +
	            (days ? daysSign + days + 'D' : '') +
	            (hours || minutes || seconds ? 'T' : '') +
	            (hours ? hmsSign + hours + 'H' : '') +
	            (minutes ? hmsSign + minutes + 'M' : '') +
	            (seconds ? hmsSign + s + 'S' : '')
	        );
	    }

	    var proto$2 = Duration.prototype;

	    proto$2.isValid = isValid$1;
	    proto$2.abs = abs;
	    proto$2.add = add$1;
	    proto$2.subtract = subtract$1;
	    proto$2.as = as;
	    proto$2.asMilliseconds = asMilliseconds;
	    proto$2.asSeconds = asSeconds;
	    proto$2.asMinutes = asMinutes;
	    proto$2.asHours = asHours;
	    proto$2.asDays = asDays;
	    proto$2.asWeeks = asWeeks;
	    proto$2.asMonths = asMonths;
	    proto$2.asQuarters = asQuarters;
	    proto$2.asYears = asYears;
	    proto$2.valueOf = valueOf$1;
	    proto$2._bubble = bubble;
	    proto$2.clone = clone$1;
	    proto$2.get = get$2;
	    proto$2.milliseconds = milliseconds;
	    proto$2.seconds = seconds;
	    proto$2.minutes = minutes;
	    proto$2.hours = hours;
	    proto$2.days = days;
	    proto$2.weeks = weeks;
	    proto$2.months = months;
	    proto$2.years = years;
	    proto$2.humanize = humanize;
	    proto$2.toISOString = toISOString$1;
	    proto$2.toString = toISOString$1;
	    proto$2.toJSON = toISOString$1;
	    proto$2.locale = locale;
	    proto$2.localeData = localeData;

	    proto$2.toIsoString = deprecate(
	        'toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)',
	        toISOString$1
	    );
	    proto$2.lang = lang;

	    // FORMATTING

	    addFormatToken('X', 0, 0, 'unix');
	    addFormatToken('x', 0, 0, 'valueOf');

	    // PARSING

	    addRegexToken('x', matchSigned);
	    addRegexToken('X', matchTimestamp);
	    addParseToken('X', function (input, array, config) {
	        config._d = new Date(parseFloat(input) * 1000);
	    });
	    addParseToken('x', function (input, array, config) {
	        config._d = new Date(toInt(input));
	    });

	    //! moment.js

	    hooks.version = '2.26.0';

	    setHookCallback(createLocal);

	    hooks.fn = proto;
	    hooks.min = min;
	    hooks.max = max;
	    hooks.now = now;
	    hooks.utc = createUTC;
	    hooks.unix = createUnix;
	    hooks.months = listMonths;
	    hooks.isDate = isDate;
	    hooks.locale = getSetGlobalLocale;
	    hooks.invalid = createInvalid;
	    hooks.duration = createDuration;
	    hooks.isMoment = isMoment;
	    hooks.weekdays = listWeekdays;
	    hooks.parseZone = createInZone;
	    hooks.localeData = getLocale;
	    hooks.isDuration = isDuration;
	    hooks.monthsShort = listMonthsShort;
	    hooks.weekdaysMin = listWeekdaysMin;
	    hooks.defineLocale = defineLocale;
	    hooks.updateLocale = updateLocale;
	    hooks.locales = listLocales;
	    hooks.weekdaysShort = listWeekdaysShort;
	    hooks.normalizeUnits = normalizeUnits;
	    hooks.relativeTimeRounding = getSetRelativeTimeRounding;
	    hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
	    hooks.calendarFormat = getCalendarFormat;
	    hooks.prototype = proto;

	    // currently HTML5 input type only supports 24-hour formats
	    hooks.HTML5_FMT = {
	        DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm', // <input type="datetime-local" />
	        DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss', // <input type="datetime-local" step="1" />
	        DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS', // <input type="datetime-local" step="0.001" />
	        DATE: 'YYYY-MM-DD', // <input type="date" />
	        TIME: 'HH:mm', // <input type="time" />
	        TIME_SECONDS: 'HH:mm:ss', // <input type="time" step="1" />
	        TIME_MS: 'HH:mm:ss.SSS', // <input type="time" step="0.001" />
	        WEEK: 'GGGG-[W]WW', // <input type="week" />
	        MONTH: 'YYYY-MM', // <input type="month" />
	    };

	    return hooks;

	})));
	});

	var momentTimezone = createCommonjsModule(function (module) {
	//! moment-timezone.js
	//! version : 0.5.31
	//! Copyright (c) JS Foundation and other contributors
	//! license : MIT
	//! github.com/moment/moment-timezone

	(function (root, factory) {

		/*global define*/
		if ( module.exports) {
			module.exports = factory(moment); // Node
		} else {
			factory(root.moment);                        // Browser
		}
	}(commonjsGlobal, function (moment) {

		// Resolves es6 module loading issue
		if (moment.version === undefined && moment.default) {
			moment = moment.default;
		}

		// Do not load moment-timezone a second time.
		// if (moment.tz !== undefined) {
		// 	logError('Moment Timezone ' + moment.tz.version + ' was already loaded ' + (moment.tz.dataVersion ? 'with data from ' : 'without any data') + moment.tz.dataVersion);
		// 	return moment;
		// }

		var VERSION = "0.5.31",
			zones = {},
			links = {},
			countries = {},
			names = {},
			guesses = {},
			cachedGuess;

		if (!moment || typeof moment.version !== 'string') {
			logError('Moment Timezone requires Moment.js. See https://momentjs.com/timezone/docs/#/use-it/browser/');
		}

		var momentVersion = moment.version.split('.'),
			major = +momentVersion[0],
			minor = +momentVersion[1];

		// Moment.js version check
		if (major < 2 || (major === 2 && minor < 6)) {
			logError('Moment Timezone requires Moment.js >= 2.6.0. You are using Moment.js ' + moment.version + '. See momentjs.com');
		}

		/************************************
			Unpacking
		************************************/

		function charCodeToInt(charCode) {
			if (charCode > 96) {
				return charCode - 87;
			} else if (charCode > 64) {
				return charCode - 29;
			}
			return charCode - 48;
		}

		function unpackBase60(string) {
			var i = 0,
				parts = string.split('.'),
				whole = parts[0],
				fractional = parts[1] || '',
				multiplier = 1,
				num,
				out = 0,
				sign = 1;

			// handle negative numbers
			if (string.charCodeAt(0) === 45) {
				i = 1;
				sign = -1;
			}

			// handle digits before the decimal
			for (i; i < whole.length; i++) {
				num = charCodeToInt(whole.charCodeAt(i));
				out = 60 * out + num;
			}

			// handle digits after the decimal
			for (i = 0; i < fractional.length; i++) {
				multiplier = multiplier / 60;
				num = charCodeToInt(fractional.charCodeAt(i));
				out += num * multiplier;
			}

			return out * sign;
		}

		function arrayToInt (array) {
			for (var i = 0; i < array.length; i++) {
				array[i] = unpackBase60(array[i]);
			}
		}

		function intToUntil (array, length) {
			for (var i = 0; i < length; i++) {
				array[i] = Math.round((array[i - 1] || 0) + (array[i] * 60000)); // minutes to milliseconds
			}

			array[length - 1] = Infinity;
		}

		function mapIndices (source, indices) {
			var out = [], i;

			for (i = 0; i < indices.length; i++) {
				out[i] = source[indices[i]];
			}

			return out;
		}

		function unpack (string) {
			var data = string.split('|'),
				offsets = data[2].split(' '),
				indices = data[3].split(''),
				untils  = data[4].split(' ');

			arrayToInt(offsets);
			arrayToInt(indices);
			arrayToInt(untils);

			intToUntil(untils, indices.length);

			return {
				name       : data[0],
				abbrs      : mapIndices(data[1].split(' '), indices),
				offsets    : mapIndices(offsets, indices),
				untils     : untils,
				population : data[5] | 0
			};
		}

		/************************************
			Zone object
		************************************/

		function Zone (packedString) {
			if (packedString) {
				this._set(unpack(packedString));
			}
		}

		Zone.prototype = {
			_set : function (unpacked) {
				this.name       = unpacked.name;
				this.abbrs      = unpacked.abbrs;
				this.untils     = unpacked.untils;
				this.offsets    = unpacked.offsets;
				this.population = unpacked.population;
			},

			_index : function (timestamp) {
				var target = +timestamp,
					untils = this.untils,
					i;

				for (i = 0; i < untils.length; i++) {
					if (target < untils[i]) {
						return i;
					}
				}
			},

			countries : function () {
				var zone_name = this.name;
				return Object.keys(countries).filter(function (country_code) {
					return countries[country_code].zones.indexOf(zone_name) !== -1;
				});
			},

			parse : function (timestamp) {
				var target  = +timestamp,
					offsets = this.offsets,
					untils  = this.untils,
					max     = untils.length - 1,
					offset, offsetNext, offsetPrev, i;

				for (i = 0; i < max; i++) {
					offset     = offsets[i];
					offsetNext = offsets[i + 1];
					offsetPrev = offsets[i ? i - 1 : i];

					if (offset < offsetNext && tz.moveAmbiguousForward) {
						offset = offsetNext;
					} else if (offset > offsetPrev && tz.moveInvalidForward) {
						offset = offsetPrev;
					}

					if (target < untils[i] - (offset * 60000)) {
						return offsets[i];
					}
				}

				return offsets[max];
			},

			abbr : function (mom) {
				return this.abbrs[this._index(mom)];
			},

			offset : function (mom) {
				logError("zone.offset has been deprecated in favor of zone.utcOffset");
				return this.offsets[this._index(mom)];
			},

			utcOffset : function (mom) {
				return this.offsets[this._index(mom)];
			}
		};

		/************************************
			Country object
		************************************/

		function Country (country_name, zone_names) {
			this.name = country_name;
			this.zones = zone_names;
		}

		/************************************
			Current Timezone
		************************************/

		function OffsetAt(at) {
			var timeString = at.toTimeString();
			var abbr = timeString.match(/\([a-z ]+\)/i);
			if (abbr && abbr[0]) {
				// 17:56:31 GMT-0600 (CST)
				// 17:56:31 GMT-0600 (Central Standard Time)
				abbr = abbr[0].match(/[A-Z]/g);
				abbr = abbr ? abbr.join('') : undefined;
			} else {
				// 17:56:31 CST
				// 17:56:31 GMT+0800 (台北標準時間)
				abbr = timeString.match(/[A-Z]{3,5}/g);
				abbr = abbr ? abbr[0] : undefined;
			}

			if (abbr === 'GMT') {
				abbr = undefined;
			}

			this.at = +at;
			this.abbr = abbr;
			this.offset = at.getTimezoneOffset();
		}

		function ZoneScore(zone) {
			this.zone = zone;
			this.offsetScore = 0;
			this.abbrScore = 0;
		}

		ZoneScore.prototype.scoreOffsetAt = function (offsetAt) {
			this.offsetScore += Math.abs(this.zone.utcOffset(offsetAt.at) - offsetAt.offset);
			if (this.zone.abbr(offsetAt.at).replace(/[^A-Z]/g, '') !== offsetAt.abbr) {
				this.abbrScore++;
			}
		};

		function findChange(low, high) {
			var mid, diff;

			while ((diff = ((high.at - low.at) / 12e4 | 0) * 6e4)) {
				mid = new OffsetAt(new Date(low.at + diff));
				if (mid.offset === low.offset) {
					low = mid;
				} else {
					high = mid;
				}
			}

			return low;
		}

		function userOffsets() {
			var startYear = new Date().getFullYear() - 2,
				last = new OffsetAt(new Date(startYear, 0, 1)),
				offsets = [last],
				change, next, i;

			for (i = 1; i < 48; i++) {
				next = new OffsetAt(new Date(startYear, i, 1));
				if (next.offset !== last.offset) {
					change = findChange(last, next);
					offsets.push(change);
					offsets.push(new OffsetAt(new Date(change.at + 6e4)));
				}
				last = next;
			}

			for (i = 0; i < 4; i++) {
				offsets.push(new OffsetAt(new Date(startYear + i, 0, 1)));
				offsets.push(new OffsetAt(new Date(startYear + i, 6, 1)));
			}

			return offsets;
		}

		function sortZoneScores (a, b) {
			if (a.offsetScore !== b.offsetScore) {
				return a.offsetScore - b.offsetScore;
			}
			if (a.abbrScore !== b.abbrScore) {
				return a.abbrScore - b.abbrScore;
			}
			if (a.zone.population !== b.zone.population) {
				return b.zone.population - a.zone.population;
			}
			return b.zone.name.localeCompare(a.zone.name);
		}

		function addToGuesses (name, offsets) {
			var i, offset;
			arrayToInt(offsets);
			for (i = 0; i < offsets.length; i++) {
				offset = offsets[i];
				guesses[offset] = guesses[offset] || {};
				guesses[offset][name] = true;
			}
		}

		function guessesForUserOffsets (offsets) {
			var offsetsLength = offsets.length,
				filteredGuesses = {},
				out = [],
				i, j, guessesOffset;

			for (i = 0; i < offsetsLength; i++) {
				guessesOffset = guesses[offsets[i].offset] || {};
				for (j in guessesOffset) {
					if (guessesOffset.hasOwnProperty(j)) {
						filteredGuesses[j] = true;
					}
				}
			}

			for (i in filteredGuesses) {
				if (filteredGuesses.hasOwnProperty(i)) {
					out.push(names[i]);
				}
			}

			return out;
		}

		function rebuildGuess () {

			// use Intl API when available and returning valid time zone
			try {
				var intlName = Intl.DateTimeFormat().resolvedOptions().timeZone;
				if (intlName && intlName.length > 3) {
					var name = names[normalizeName(intlName)];
					if (name) {
						return name;
					}
					logError("Moment Timezone found " + intlName + " from the Intl api, but did not have that data loaded.");
				}
			} catch (e) {
				// Intl unavailable, fall back to manual guessing.
			}

			var offsets = userOffsets(),
				offsetsLength = offsets.length,
				guesses = guessesForUserOffsets(offsets),
				zoneScores = [],
				zoneScore, i, j;

			for (i = 0; i < guesses.length; i++) {
				zoneScore = new ZoneScore(getZone(guesses[i]), offsetsLength);
				for (j = 0; j < offsetsLength; j++) {
					zoneScore.scoreOffsetAt(offsets[j]);
				}
				zoneScores.push(zoneScore);
			}

			zoneScores.sort(sortZoneScores);

			return zoneScores.length > 0 ? zoneScores[0].zone.name : undefined;
		}

		function guess (ignoreCache) {
			if (!cachedGuess || ignoreCache) {
				cachedGuess = rebuildGuess();
			}
			return cachedGuess;
		}

		/************************************
			Global Methods
		************************************/

		function normalizeName (name) {
			return (name || '').toLowerCase().replace(/\//g, '_');
		}

		function addZone (packed) {
			var i, name, split, normalized;

			if (typeof packed === "string") {
				packed = [packed];
			}

			for (i = 0; i < packed.length; i++) {
				split = packed[i].split('|');
				name = split[0];
				normalized = normalizeName(name);
				zones[normalized] = packed[i];
				names[normalized] = name;
				addToGuesses(normalized, split[2].split(' '));
			}
		}

		function getZone (name, caller) {

			name = normalizeName(name);

			var zone = zones[name];
			var link;

			if (zone instanceof Zone) {
				return zone;
			}

			if (typeof zone === 'string') {
				zone = new Zone(zone);
				zones[name] = zone;
				return zone;
			}

			// Pass getZone to prevent recursion more than 1 level deep
			if (links[name] && caller !== getZone && (link = getZone(links[name], getZone))) {
				zone = zones[name] = new Zone();
				zone._set(link);
				zone.name = names[name];
				return zone;
			}

			return null;
		}

		function getNames () {
			var i, out = [];

			for (i in names) {
				if (names.hasOwnProperty(i) && (zones[i] || zones[links[i]]) && names[i]) {
					out.push(names[i]);
				}
			}

			return out.sort();
		}

		function getCountryNames () {
			return Object.keys(countries);
		}

		function addLink (aliases) {
			var i, alias, normal0, normal1;

			if (typeof aliases === "string") {
				aliases = [aliases];
			}

			for (i = 0; i < aliases.length; i++) {
				alias = aliases[i].split('|');

				normal0 = normalizeName(alias[0]);
				normal1 = normalizeName(alias[1]);

				links[normal0] = normal1;
				names[normal0] = alias[0];

				links[normal1] = normal0;
				names[normal1] = alias[1];
			}
		}

		function addCountries (data) {
			var i, country_code, country_zones, split;
			if (!data || !data.length) return;
			for (i = 0; i < data.length; i++) {
				split = data[i].split('|');
				country_code = split[0].toUpperCase();
				country_zones = split[1].split(' ');
				countries[country_code] = new Country(
					country_code,
					country_zones
				);
			}
		}

		function getCountry (name) {
			name = name.toUpperCase();
			return countries[name] || null;
		}

		function zonesForCountry(country, with_offset) {
			country = getCountry(country);

			if (!country) return null;

			var zones = country.zones.sort();

			if (with_offset) {
				return zones.map(function (zone_name) {
					var zone = getZone(zone_name);
					return {
						name: zone_name,
						offset: zone.utcOffset(new Date())
					};
				});
			}

			return zones;
		}

		function loadData (data) {
			addZone(data.zones);
			addLink(data.links);
			addCountries(data.countries);
			tz.dataVersion = data.version;
		}

		function zoneExists (name) {
			if (!zoneExists.didShowError) {
				zoneExists.didShowError = true;
					logError("moment.tz.zoneExists('" + name + "') has been deprecated in favor of !moment.tz.zone('" + name + "')");
			}
			return !!getZone(name);
		}

		function needsOffset (m) {
			var isUnixTimestamp = (m._f === 'X' || m._f === 'x');
			return !!(m._a && (m._tzm === undefined) && !isUnixTimestamp);
		}

		function logError (message) {
			if (typeof console !== 'undefined' && typeof console.error === 'function') {
				console.error(message);
			}
		}

		/************************************
			moment.tz namespace
		************************************/

		function tz (input) {
			var args = Array.prototype.slice.call(arguments, 0, -1),
				name = arguments[arguments.length - 1],
				zone = getZone(name),
				out  = moment.utc.apply(null, args);

			if (zone && !moment.isMoment(input) && needsOffset(out)) {
				out.add(zone.parse(out), 'minutes');
			}

			out.tz(name);

			return out;
		}

		tz.version      = VERSION;
		tz.dataVersion  = '';
		tz._zones       = zones;
		tz._links       = links;
		tz._names       = names;
		tz._countries	= countries;
		tz.add          = addZone;
		tz.link         = addLink;
		tz.load         = loadData;
		tz.zone         = getZone;
		tz.zoneExists   = zoneExists; // deprecated in 0.1.0
		tz.guess        = guess;
		tz.names        = getNames;
		tz.Zone         = Zone;
		tz.unpack       = unpack;
		tz.unpackBase60 = unpackBase60;
		tz.needsOffset  = needsOffset;
		tz.moveInvalidForward   = true;
		tz.moveAmbiguousForward = false;
		tz.countries    = getCountryNames;
		tz.zonesForCountry = zonesForCountry;

		/************************************
			Interface with Moment.js
		************************************/

		var fn = moment.fn;

		moment.tz = tz;

		moment.defaultZone = null;

		moment.updateOffset = function (mom, keepTime) {
			var zone = moment.defaultZone,
				offset;

			if (mom._z === undefined) {
				if (zone && needsOffset(mom) && !mom._isUTC) {
					mom._d = moment.utc(mom._a)._d;
					mom.utc().add(zone.parse(mom), 'minutes');
				}
				mom._z = zone;
			}
			if (mom._z) {
				offset = mom._z.utcOffset(mom);
				if (Math.abs(offset) < 16) {
					offset = offset / 60;
				}
				if (mom.utcOffset !== undefined) {
					var z = mom._z;
					mom.utcOffset(-offset, keepTime);
					mom._z = z;
				} else {
					mom.zone(offset, keepTime);
				}
			}
		};

		fn.tz = function (name, keepTime) {
			if (name) {
				if (typeof name !== 'string') {
					throw new Error('Time zone name must be a string, got ' + name + ' [' + typeof name + ']');
				}
				this._z = getZone(name);
				if (this._z) {
					moment.updateOffset(this, keepTime);
				} else {
					logError("Moment Timezone has no data for " + name + ". See http://momentjs.com/timezone/docs/#/data-loading/.");
				}
				return this;
			}
			if (this._z) { return this._z.name; }
		};

		function abbrWrap (old) {
			return function () {
				if (this._z) { return this._z.abbr(this); }
				return old.call(this);
			};
		}

		function resetZoneWrap (old) {
			return function () {
				this._z = null;
				return old.apply(this, arguments);
			};
		}

		function resetZoneWrap2 (old) {
			return function () {
				if (arguments.length > 0) this._z = null;
				return old.apply(this, arguments);
			};
		}

		fn.zoneName  = abbrWrap(fn.zoneName);
		fn.zoneAbbr  = abbrWrap(fn.zoneAbbr);
		fn.utc       = resetZoneWrap(fn.utc);
		fn.local     = resetZoneWrap(fn.local);
		fn.utcOffset = resetZoneWrap2(fn.utcOffset);

		moment.tz.setDefault = function(name) {
			if (major < 2 || (major === 2 && minor < 9)) {
				logError('Moment Timezone setDefault() requires Moment.js >= 2.9.0. You are using Moment.js ' + moment.version + '.');
			}
			moment.defaultZone = name ? getZone(name) : null;
			return moment;
		};

		// Cloning a moment should include the _z property.
		var momentProperties = moment.momentProperties;
		if (Object.prototype.toString.call(momentProperties) === '[object Array]') {
			// moment 2.8.1+
			momentProperties.push('_z');
			momentProperties.push('_a');
		} else if (momentProperties) {
			// moment 2.7.0
			momentProperties._z = null;
		}

		// INJECT DATA

		return moment;
	}));
	});

	var version = "2020a";
	var zones = [
		"Africa/Abidjan|LMT GMT|g.8 0|01|-2ldXH.Q|48e5",
		"Africa/Accra|LMT GMT +0020|.Q 0 -k|012121212121212121212121212121212121212121212121|-26BbX.8 6tzX.8 MnE 1BAk MnE 1BAk MnE 1BAk MnE 1C0k MnE 1BAk MnE 1BAk MnE 1BAk MnE 1C0k MnE 1BAk MnE 1BAk MnE 1BAk MnE 1C0k MnE 1BAk MnE 1BAk MnE 1BAk MnE 1C0k MnE 1BAk MnE 1BAk MnE 1BAk MnE 1C0k MnE 1BAk MnE 1BAk MnE|41e5",
		"Africa/Nairobi|LMT EAT +0230 +0245|-2r.g -30 -2u -2J|01231|-1F3Cr.g 3Dzr.g okMu MFXJ|47e5",
		"Africa/Algiers|PMT WET WEST CET CEST|-9.l 0 -10 -10 -20|0121212121212121343431312123431213|-2nco9.l cNb9.l HA0 19A0 1iM0 11c0 1oo0 Wo0 1rc0 QM0 1EM0 UM0 DA0 Imo0 rd0 De0 9Xz0 1fb0 1ap0 16K0 2yo0 mEp0 hwL0 jxA0 11A0 dDd0 17b0 11B0 1cN0 2Dy0 1cN0 1fB0 1cL0|26e5",
		"Africa/Lagos|LMT WAT|-d.A -10|01|-22y0d.A|17e6",
		"Africa/Bissau|LMT -01 GMT|12.k 10 0|012|-2ldX0 2xoo0|39e4",
		"Africa/Maputo|LMT CAT|-2a.k -20|01|-2GJea.k|26e5",
		"Africa/Cairo|EET EEST|-20 -30|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-1bIO0 vb0 1ip0 11z0 1iN0 1nz0 12p0 1pz0 10N0 1pz0 16p0 1jz0 s3d0 Vz0 1oN0 11b0 1oO0 10N0 1pz0 10N0 1pb0 10N0 1pb0 10N0 1pb0 10N0 1pz0 10N0 1pb0 10N0 1pb0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1WL0 rd0 1Rz0 wp0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1qL0 Xd0 1oL0 11d0 1oL0 11d0 1pb0 11d0 1oL0 11d0 1oL0 11d0 1ny0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 WL0 1qN0 Rb0 1wp0 On0 1zd0 Lz0 1EN0 Fb0 c10 8n0 8Nd0 gL0 e10 mn0|15e6",
		"Africa/Casablanca|LMT +00 +01|u.k 0 -10|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212|-2gMnt.E 130Lt.E rb0 Dd0 dVb0 b6p0 TX0 EoB0 LL0 gnd0 rz0 43d0 AL0 1Nd0 XX0 1Cp0 pz0 dEp0 4mn0 SyN0 AL0 1Nd0 wn0 1FB0 Db0 1zd0 Lz0 1Nf0 wM0 co0 go0 1o00 s00 dA0 vc0 11A0 A00 e00 y00 11A0 uM0 e00 Dc0 11A0 s00 e00 IM0 WM0 mo0 gM0 LA0 WM0 jA0 e00 28M0 e00 2600 gM0 2600 e00 2600 gM0 2600 e00 28M0 e00 2600 gM0 2600 e00 28M0 e00 2600 gM0 2600 e00 2600 gM0 2600 e00 28M0 e00 2600 gM0 2600 e00 2600 gM0 2600 gM0 2600 e00 2600 gM0|32e5",
		"Africa/Ceuta|WET WEST CET CEST|0 -10 -10 -20|010101010101010101010232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-25KN0 11z0 drd0 18p0 3HX0 17d0 1fz0 1a10 1io0 1a00 1y7o0 LL0 gnd0 rz0 43d0 AL0 1Nd0 XX0 1Cp0 pz0 dEp0 4VB0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|85e3",
		"Africa/El_Aaiun|LMT -01 +00 +01|Q.M 10 0 -10|012323232323232323232323232323232323232323232323232323232323232323232323232323232323|-1rDz7.c 1GVA7.c 6L0 AL0 1Nd0 XX0 1Cp0 pz0 1cBB0 AL0 1Nd0 wn0 1FB0 Db0 1zd0 Lz0 1Nf0 wM0 co0 go0 1o00 s00 dA0 vc0 11A0 A00 e00 y00 11A0 uM0 e00 Dc0 11A0 s00 e00 IM0 WM0 mo0 gM0 LA0 WM0 jA0 e00 28M0 e00 2600 gM0 2600 e00 2600 gM0 2600 e00 28M0 e00 2600 gM0 2600 e00 28M0 e00 2600 gM0 2600 e00 2600 gM0 2600 e00 28M0 e00 2600 gM0 2600 e00 2600 gM0 2600 gM0 2600 e00 2600 gM0|20e4",
		"Africa/Johannesburg|SAST SAST SAST|-1u -20 -30|012121|-2GJdu 1Ajdu 1cL0 1cN0 1cL0|84e5",
		"Africa/Juba|LMT CAT CAST EAT|-26.s -20 -30 -30|01212121212121212121212121212121213|-1yW26.s 1zK06.s 16L0 1iN0 17b0 1jd0 17b0 1ip0 17z0 1i10 17X0 1hB0 18n0 1hd0 19b0 1gp0 19z0 1iN0 17b0 1ip0 17z0 1i10 18n0 1hd0 18L0 1gN0 19b0 1gp0 19z0 1iN0 17z0 1i10 17X0 yGd0|",
		"Africa/Khartoum|LMT CAT CAST EAT|-2a.8 -20 -30 -30|012121212121212121212121212121212131|-1yW2a.8 1zK0a.8 16L0 1iN0 17b0 1jd0 17b0 1ip0 17z0 1i10 17X0 1hB0 18n0 1hd0 19b0 1gp0 19z0 1iN0 17b0 1ip0 17z0 1i10 18n0 1hd0 18L0 1gN0 19b0 1gp0 19z0 1iN0 17z0 1i10 17X0 yGd0 HjL0|51e5",
		"Africa/Monrovia|MMT MMT GMT|H.8 I.u 0|012|-23Lzg.Q 28G01.m|11e5",
		"Africa/Ndjamena|LMT WAT WAST|-10.c -10 -20|0121|-2le10.c 2J3c0.c Wn0|13e5",
		"Africa/Sao_Tome|LMT GMT WAT|A.J 0 -10|0121|-2le00 4i6N0 2q00|",
		"Africa/Tripoli|LMT CET CEST EET|-Q.I -10 -20 -20|012121213121212121212121213123123|-21JcQ.I 1hnBQ.I vx0 4iP0 xx0 4eN0 Bb0 7ip0 U0n0 A10 1db0 1cN0 1db0 1dd0 1db0 1eN0 1bb0 1e10 1cL0 1c10 1db0 1dd0 1db0 1cN0 1db0 1q10 fAn0 1ep0 1db0 AKq0 TA0 1o00|11e5",
		"Africa/Tunis|PMT CET CEST|-9.l -10 -20|0121212121212121212121212121212121|-2nco9.l 18pa9.l 1qM0 DA0 3Tc0 11B0 1ze0 WM0 7z0 3d0 14L0 1cN0 1f90 1ar0 16J0 1gXB0 WM0 1rA0 11c0 nwo0 Ko0 1cM0 1cM0 1rA0 10M0 zuM0 10N0 1aN0 1qM0 WM0 1qM0 11A0 1o00|20e5",
		"Africa/Windhoek|+0130 SAST SAST CAT WAT|-1u -20 -30 -20 -10|01213434343434343434343434343434343434343434343434343|-2GJdu 1Ajdu 1cL0 1SqL0 9Io0 16P0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0|32e4",
		"America/Adak|NST NWT NPT BST BDT AHST HST HDT|b0 a0 a0 b0 a0 a0 a0 90|012034343434343434343434343434343456767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676|-17SX0 8wW0 iB0 Qlb0 52O0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 cm0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|326",
		"America/Anchorage|AST AWT APT AHST AHDT YST AKST AKDT|a0 90 90 a0 90 90 90 80|012034343434343434343434343434343456767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676|-17T00 8wX0 iA0 Qlb0 52O0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 cm0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|30e4",
		"America/Port_of_Spain|LMT AST|46.4 40|01|-2kNvR.U|43e3",
		"America/Araguaina|LMT -03 -02|3c.M 30 20|0121212121212121212121212121212121212121212121212121|-2glwL.c HdKL.c 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 dMN0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 ny10 Lz0|14e4",
		"America/Argentina/Buenos_Aires|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232323232323232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wp0 Rb0 1wp0 TX0 A4p0 uL0 1qN0 WL0|",
		"America/Argentina/Catamarca|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232323132321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wq0 Ra0 1wp0 TX0 rlB0 7B0 8zb0 uL0|",
		"America/Argentina/Cordoba|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232323132323232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wq0 Ra0 1wp0 TX0 A4p0 uL0 1qN0 WL0|",
		"America/Argentina/Jujuy|CMT -04 -03 -02|4g.M 40 30 20|012121212121212121212121212121212121212121232323121323232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1ze0 TX0 1ld0 WK0 1wp0 TX0 A4p0 uL0|",
		"America/Argentina/La_Rioja|CMT -04 -03 -02|4g.M 40 30 20|012121212121212121212121212121212121212121232323231232321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Qn0 qO0 16n0 Rb0 1wp0 TX0 rlB0 7B0 8zb0 uL0|",
		"America/Argentina/Mendoza|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232312121321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1u20 SL0 1vd0 Tb0 1wp0 TW0 ri10 Op0 7TX0 uL0|",
		"America/Argentina/Rio_Gallegos|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232323232321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wp0 Rb0 1wp0 TX0 rlB0 7B0 8zb0 uL0|",
		"America/Argentina/Salta|CMT -04 -03 -02|4g.M 40 30 20|012121212121212121212121212121212121212121232323231323232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wq0 Ra0 1wp0 TX0 A4p0 uL0|",
		"America/Argentina/San_Juan|CMT -04 -03 -02|4g.M 40 30 20|012121212121212121212121212121212121212121232323231232321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Qn0 qO0 16n0 Rb0 1wp0 TX0 rld0 m10 8lb0 uL0|",
		"America/Argentina/San_Luis|CMT -04 -03 -02|4g.M 40 30 20|012121212121212121212121212121212121212121232323121212321212|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 XX0 1q20 SL0 AN0 vDb0 m10 8lb0 8L0 jd0 1qN0 WL0 1qN0|",
		"America/Argentina/Tucuman|CMT -04 -03 -02|4g.M 40 30 20|0121212121212121212121212121212121212121212323232313232123232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wq0 Ra0 1wp0 TX0 rlB0 4N0 8BX0 uL0 1qN0 WL0|",
		"America/Argentina/Ushuaia|CMT -04 -03 -02|4g.M 40 30 20|01212121212121212121212121212121212121212123232323232321232|-20UHH.c pKnH.c Mn0 1iN0 Tb0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 1C10 LX0 1C10 LX0 1C10 LX0 1C10 Mn0 MN0 2jz0 MN0 4lX0 u10 5Lb0 1pB0 Fnz0 u10 uL0 1vd0 SL0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 zvd0 Bz0 1tB0 TX0 1wp0 Rb0 1wp0 Rb0 1wp0 TX0 rkN0 8p0 8zb0 uL0|",
		"America/Curacao|LMT -0430 AST|4z.L 4u 40|012|-2kV7o.d 28KLS.d|15e4",
		"America/Asuncion|AMT -04 -03|3O.E 40 30|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212|-1x589.k 1DKM9.k 3CL0 3Dd0 10L0 1pB0 10n0 1pB0 10n0 1pB0 1cL0 1dd0 1db0 1dd0 1cL0 1dd0 1cL0 1dd0 1cL0 1dd0 1db0 1dd0 1cL0 1dd0 1cL0 1dd0 1cL0 1dd0 1db0 1dd0 1cL0 1lB0 14n0 1dd0 1cL0 1fd0 WL0 1rd0 1aL0 1dB0 Xz0 1qp0 Xb0 1qN0 10L0 1rB0 TX0 1tB0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 1cL0 WN0 1qL0 11B0 1nX0 1ip0 WL0 1qN0 WL0 1qN0 WL0 1tB0 TX0 1tB0 TX0 1tB0 19X0 1a10 1fz0 1a10 1fz0 1cN0 17b0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1ip0 17b0 1ip0 17b0 1ip0|28e5",
		"America/Atikokan|CST CDT CWT CPT EST|60 50 50 50 50|0101234|-25TQ0 1in0 Rnb0 3je0 8x30 iw0|28e2",
		"America/Bahia_Banderas|LMT MST CST PST MDT CDT|71 70 60 80 60 50|0121212131414141414141414141414141414152525252525252525252525252525252525252525252525252525252|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 otX0 gmN0 P2N0 13Vd0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nW0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|84e3",
		"America/Bahia|LMT -03 -02|2y.4 30 20|01212121212121212121212121212121212121212121212121212121212121|-2glxp.U HdLp.U 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 1EN0 Lz0 1C10 IL0 1HB0 Db0 1HB0 On0 1zd0 On0 1zd0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 l5B0 Rb0|27e5",
		"America/Barbados|LMT BMT AST ADT|3W.t 3W.t 40 30|01232323232|-1Q0I1.v jsM0 1ODC1.v IL0 1ip0 17b0 1ip0 17b0 1ld0 13b0|28e4",
		"America/Belem|LMT -03 -02|3d.U 30 20|012121212121212121212121212121|-2glwK.4 HdKK.4 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0|20e5",
		"America/Belize|LMT CST -0530 CDT|5Q.M 60 5u 50|01212121212121212121212121212121212121212121212121213131|-2kBu7.c fPA7.c Onu 1zcu Rbu 1wou Rbu 1wou Rbu 1zcu Onu 1zcu Onu 1zcu Rbu 1wou Rbu 1wou Rbu 1wou Rbu 1zcu Onu 1zcu Onu 1zcu Rbu 1wou Rbu 1wou Rbu 1zcu Onu 1zcu Onu 1zcu Onu 1zcu Rbu 1wou Rbu 1wou Rbu 1zcu Onu 1zcu Onu 1zcu Rbu 1wou Rbu 1f0Mu qn0 lxB0 mn0|57e3",
		"America/Blanc-Sablon|AST ADT AWT APT|40 30 30 30|010230|-25TS0 1in0 UGp0 8x50 iu0|11e2",
		"America/Boa_Vista|LMT -04 -03|42.E 40 30|0121212121212121212121212121212121|-2glvV.k HdKV.k 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 smp0 WL0 1tB0 2L0|62e2",
		"America/Bogota|BMT -05 -04|4U.g 50 40|0121|-2eb73.I 38yo3.I 2en0|90e5",
		"America/Boise|PST PDT MST MWT MPT MDT|80 70 70 60 60 60|0101023425252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252|-261q0 1nX0 11B0 1nX0 8C10 JCL0 8x20 ix0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 Dd0 1Kn0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|21e4",
		"America/Cambridge_Bay|-00 MST MWT MPT MDDT MDT CST CDT EST|0 70 60 60 50 60 60 50 50|0123141515151515151515151515151515151515151515678651515151515151515151515151515151515151515151515151515151515151515151515151|-21Jc0 RO90 8x20 ix0 LCL0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11A0 1nX0 2K0 WQ0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|15e2",
		"America/Campo_Grande|LMT -04 -03|3C.s 40 30|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2glwl.w HdLl.w 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 1EN0 Lz0 1C10 IL0 1HB0 Db0 1HB0 On0 1zd0 On0 1zd0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 1C10 Lz0 1Ip0 HX0 1zd0 On0 1HB0 IL0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1HB0 FX0|77e4",
		"America/Cancun|LMT CST EST EDT CDT|5L.4 60 50 40 50|0123232341414141414141414141414141414141412|-1UQG0 2q2o0 yLB0 1lb0 14p0 1lb0 14p0 Lz0 xB0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 Dd0|63e4",
		"America/Caracas|CMT -0430 -04|4r.E 4u 40|01212|-2kV7w.k 28KM2.k 1IwOu kqo0|29e5",
		"America/Cayenne|LMT -04 -03|3t.k 40 30|012|-2mrwu.E 2gWou.E|58e3",
		"America/Panama|CMT EST|5j.A 50|01|-2uduE.o|15e5",
		"America/Chicago|CST CDT EST CWT CPT|60 50 50 50 50|01010101010101010101010101010101010102010101010103401010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 1wp0 TX0 WN0 1qL0 1cN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 11B0 1Hz0 14p0 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 RB0 8x30 iw0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|92e5",
		"America/Chihuahua|LMT MST CST CDT MDT|74.k 70 60 50 60|0121212323241414141414141414141414141414141414141414141414141414141414141414141414141414141|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 2zQN0 1lb0 14p0 1lb0 14q0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|81e4",
		"America/Costa_Rica|SJMT CST CDT|5A.d 60 50|0121212121|-1Xd6n.L 2lu0n.L Db0 1Kp0 Db0 pRB0 15b0 1kp0 mL0|12e5",
		"America/Creston|MST PST|70 80|010|-29DR0 43B0|53e2",
		"America/Cuiaba|LMT -04 -03|3I.k 40 30|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2glwf.E HdLf.E 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 1EN0 Lz0 1C10 IL0 1HB0 Db0 1HB0 On0 1zd0 On0 1zd0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 4a10 HX0 1zd0 On0 1HB0 IL0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1HB0 FX0|54e4",
		"America/Danmarkshavn|LMT -03 -02 GMT|1e.E 30 20 0|01212121212121212121212121212121213|-2a5WJ.k 2z5fJ.k 19U0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 DC0|8",
		"America/Dawson_Creek|PST PDT PWT PPT MST|80 70 70 70 70|0102301010101010101010101010101010101010101010101010101014|-25TO0 1in0 UGp0 8x10 iy0 3NB0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 ML0|12e3",
		"America/Dawson|YST YDT YWT YPT YDDT PST PDT MST|90 80 80 80 70 80 70 70|01010230405656565656565656565656565656565656565656565656565656565656565656565656565656565657|-25TN0 1in0 1o10 13V0 Ser0 8x00 iz0 LCL0 1fA0 jrA0 fNd0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0|13e2",
		"America/Denver|MST MDT MWT MPT|70 60 60 60|01010101023010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261r0 1nX0 11B0 1nX0 11B0 1qL0 WN0 mn0 Ord0 8x20 ix0 LCN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|26e5",
		"America/Detroit|LMT CST EST EWT EPT EDT|5w.b 60 50 40 40 40|0123425252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252|-2Cgir.N peqr.N 156L0 8x40 iv0 6fd0 11z0 JxX1 SMX 1cN0 1cL0 aW10 1cL0 s10 1Vz0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|37e5",
		"America/Edmonton|LMT MST MDT MWT MPT|7x.Q 70 60 60 60|0121212121212134121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2yd4q.8 shdq.8 1in0 17d0 hz0 2dB0 1fz0 1a10 11z0 1qN0 WL0 1qN0 11z0 IGN0 8x20 ix0 3NB0 11z0 XQp0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|10e5",
		"America/Eirunepe|LMT -05 -04|4D.s 50 40|0121212121212121212121212121212121|-2glvk.w HdLk.w 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 dPB0 On0 yTd0 d5X0|31e3",
		"America/El_Salvador|LMT CST CDT|5U.M 60 50|012121|-1XiG3.c 2Fvc3.c WL0 1qN0 WL0|11e5",
		"America/Tijuana|LMT MST PST PDT PWT PPT|7M.4 70 80 70 70 70|012123245232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-1UQE0 4PX0 8mM0 8lc0 SN0 1cL0 pHB0 83r0 zI0 5O10 1Rz0 cOO0 11A0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 BUp0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 U10 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|20e5",
		"America/Fort_Nelson|PST PDT PWT PPT MST|80 70 70 70 70|01023010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010104|-25TO0 1in0 UGp0 8x10 iy0 3NB0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0|39e2",
		"America/Fort_Wayne|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|010101023010101010101010101040454545454545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 QI10 Db0 RB0 8x30 iw0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 5Tz0 1o10 qLb0 1cL0 1cN0 1cL0 1qhd0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
		"America/Fortaleza|LMT -03 -02|2y 30 20|0121212121212121212121212121212121212121|-2glxq HdLq 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 nsp0 WL0 1tB0 5z0 2mN0 On0|34e5",
		"America/Glace_Bay|LMT AST ADT AWT APT|3X.M 40 30 30 30|012134121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2IsI0.c CwO0.c 1in0 UGp0 8x50 iu0 iq10 11z0 Jg10 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|19e3",
		"America/Godthab|LMT -03 -02|3q.U 30 20|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2a5Ux.4 2z5dx.4 19U0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|17e3",
		"America/Goose_Bay|NST NDT NST NDT NWT NPT AST ADT ADDT|3u.Q 2u.Q 3u 2u 2u 2u 40 30 20|010232323232323245232323232323232323232323232323232323232326767676767676767676767676767676767676767676768676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676|-25TSt.8 1in0 DXb0 2HbX.8 WL0 1qN0 WL0 1qN0 WL0 1tB0 TX0 1tB0 WL0 1qN0 WL0 1qN0 7UHu itu 1tB0 WL0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1tB0 WL0 1ld0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 S10 g0u 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14n1 1lb0 14p0 1nW0 11C0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zcX Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|76e2",
		"America/Grand_Turk|KMT EST EDT AST|57.a 50 40 40|01212121212121212121212121212121212121212121212121212121212121212121212121232121212121212121212121212121212121212121|-2l1uQ.O 2HHBQ.O 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 5Ip0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|37e2",
		"America/Guatemala|LMT CST CDT|62.4 60 50|0121212121|-24KhV.U 2efXV.U An0 mtd0 Nz0 ifB0 17b0 zDB0 11z0|13e5",
		"America/Guayaquil|QMT -05 -04|5e 50 40|0121|-1yVSK 2uILK rz0|27e5",
		"America/Guyana|LMT -0345 -03 -04|3Q.E 3J 30 40|0123|-2dvU7.k 2r6LQ.k Bxbf|80e4",
		"America/Halifax|LMT AST ADT AWT APT|4e.o 40 30 30 30|0121212121212121212121212121212121212121212121212134121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2IsHJ.A xzzJ.A 1db0 3I30 1in0 3HX0 IL0 1E10 ML0 1yN0 Pb0 1Bd0 Mn0 1Bd0 Rz0 1w10 Xb0 1w10 LX0 1w10 Xb0 1w10 Lz0 1C10 Jz0 1E10 OL0 1yN0 Un0 1qp0 Xb0 1qp0 11X0 1w10 Lz0 1HB0 LX0 1C10 FX0 1w10 Xb0 1qp0 Xb0 1BB0 LX0 1td0 Xb0 1qp0 Xb0 Rf0 8x50 iu0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 3Qp0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 3Qp0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 6i10 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|39e4",
		"America/Havana|HMT CST CDT|5t.A 50 40|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1Meuu.o 72zu.o ML0 sld0 An0 1Nd0 Db0 1Nd0 An0 6Ep0 An0 1Nd0 An0 JDd0 Mn0 1Ap0 On0 1fd0 11X0 1qN0 WL0 1wp0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 14n0 1ld0 14L0 1kN0 15b0 1kp0 1cL0 1cN0 1fz0 1a10 1fz0 1fB0 11z0 14p0 1nX0 11B0 1nX0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 14n0 1ld0 14n0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 1a10 1in0 1a10 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 17c0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 11A0 6i00 Rc0 1wo0 U00 1tA0 Rc0 1wo0 U00 1wo0 U00 1zc0 U00 1qM0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0|21e5",
		"America/Hermosillo|LMT MST CST PST MDT|7n.Q 70 60 80 60|0121212131414141|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 otX0 gmN0 P2N0 13Vd0 1lb0 14p0 1lb0 14p0 1lb0|64e4",
		"America/Indiana/Knox|CST CDT CWT CPT EST|60 50 50 50 50|0101023010101010101010101010101010101040101010101010101010101010101010101010101010101010141010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 3NB0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 11z0 1o10 11z0 1o10 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 3Cn0 8wp0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 z8o0 1o00 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
		"America/Indiana/Marengo|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|0101023010101010101010104545454545414545454545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 dyN0 11z0 6fd0 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 jrz0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1VA0 LA0 1BX0 1e6p0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
		"America/Indiana/Petersburg|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|01010230101010101010101010104010101010101010101010141014545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 njX0 WN0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 3Fb0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 19co0 1o00 Rd0 1zb0 Oo0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
		"America/Indiana/Tell_City|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|01010230101010101010101010401054541010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 njX0 WN0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 8wn0 1cN0 1cL0 1cN0 1cK0 1cN0 1cL0 1qhd0 1o00 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
		"America/Indiana/Vevay|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|010102304545454545454545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 kPB0 Awn0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1lnd0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
		"America/Indiana/Vincennes|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|01010230101010101010101010101010454541014545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 1o10 11z0 g0p0 11z0 1o10 11z0 1qL0 WN0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 WL0 1qN0 1cL0 1cN0 1cL0 1cN0 caL0 1cL0 1cN0 1cL0 1qhd0 1o00 Rd0 1zb0 Oo0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
		"America/Indiana/Winamac|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|01010230101010101010101010101010101010454541054545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 jrz0 1cL0 1cN0 1cL0 1qhd0 1o00 Rd0 1za0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
		"America/Inuvik|-00 PST PDDT MST MDT|0 80 60 70 60|0121343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343|-FnA0 tWU0 1fA0 wPe0 2pz0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|35e2",
		"America/Iqaluit|-00 EWT EPT EST EDDT EDT CST CDT|0 40 40 50 30 40 60 50|01234353535353535353535353535353535353535353567353535353535353535353535353535353535353535353535353535353535353535353535353|-16K00 7nX0 iv0 LCL0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11C0 1nX0 11A0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|67e2",
		"America/Jamaica|KMT EST EDT|57.a 50 40|0121212121212121212121|-2l1uQ.O 2uM1Q.O 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0|94e4",
		"America/Juneau|PST PWT PPT PDT YDT YST AKST AKDT|80 70 70 70 80 90 90 80|01203030303030303030303030403030356767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676|-17T20 8x10 iy0 Vo10 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cM0 1cM0 1cL0 1cN0 1fz0 1a10 1fz0 co0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|33e3",
		"America/Kentucky/Louisville|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|0101010102301010101010101010101010101454545454545414545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 3Fd0 Nb0 LPd0 11z0 RB0 8x30 iw0 1nX1 e0X 9vd0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 xz0 gso0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1VA0 LA0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
		"America/Kentucky/Monticello|CST CDT CWT CPT EST EDT|60 50 50 50 50 40|0101023010101010101010101010101010101010101010101010101010101010101010101454545454545454545454545454545454545454545454545454545454545454545454545454|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 SWp0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11A0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
		"America/La_Paz|CMT BST -04|4w.A 3w.A 40|012|-1x37r.o 13b0|19e5",
		"America/Lima|LMT -05 -04|58.A 50 40|0121212121212121|-2tyGP.o 1bDzP.o zX0 1aN0 1cL0 1cN0 1cL0 1PrB0 zX0 1O10 zX0 6Gp0 zX0 98p0 zX0|11e6",
		"America/Los_Angeles|PST PDT PWT PPT|80 70 70 70|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261q0 1nX0 11B0 1nX0 SgN0 8x10 iy0 5Wp1 1VaX 3dA0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1a00 1fA0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|15e6",
		"America/Maceio|LMT -03 -02|2m.Q 30 20|012121212121212121212121212121212121212121|-2glxB.8 HdLB.8 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 dMN0 Lz0 8Q10 WL0 1tB0 5z0 2mN0 On0|93e4",
		"America/Managua|MMT CST EST CDT|5J.c 60 50 50|0121313121213131|-1quie.M 1yAMe.M 4mn0 9Up0 Dz0 1K10 Dz0 s3F0 1KH0 DB0 9In0 k8p0 19X0 1o30 11y0|22e5",
		"America/Manaus|LMT -04 -03|40.4 40 30|01212121212121212121212121212121|-2glvX.U HdKX.U 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 dPB0 On0|19e5",
		"America/Martinique|FFMT AST ADT|44.k 40 30|0121|-2mPTT.E 2LPbT.E 19X0|39e4",
		"America/Matamoros|LMT CST CDT|6E 60 50|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1UQG0 2FjC0 1nX0 i6p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 U10 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|45e4",
		"America/Mazatlan|LMT MST CST PST MDT|75.E 70 60 80 60|0121212131414141414141414141414141414141414141414141414141414141414141414141414141414141414141|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 otX0 gmN0 P2N0 13Vd0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|44e4",
		"America/Menominee|CST CDT CWT CPT EST|60 50 50 50 50|01010230101041010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 1o10 11z0 LCN0 1fz0 6410 9Jb0 1cM0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|85e2",
		"America/Merida|LMT CST EST CDT|5W.s 60 50 50|0121313131313131313131313131313131313131313131313131313131313131313131313131313131313131|-1UQG0 2q2o0 2hz0 wu30 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|11e5",
		"America/Metlakatla|PST PWT PPT PDT AKST AKDT|80 70 70 70 90 80|01203030303030303030303030303030304545450454545454545454545454545454545454545454|-17T20 8x10 iy0 Vo10 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1hU10 Rd0 1zb0 Op0 1zb0 Op0 1zb0 uM0 jB0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|14e2",
		"America/Mexico_City|LMT MST CST CDT CWT|6A.A 70 60 50 50|012121232324232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 gEn0 TX0 3xd0 Jb0 6zB0 SL0 e5d0 17b0 1Pff0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|20e6",
		"America/Miquelon|LMT AST -03 -02|3I.E 40 30 20|012323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-2mKkf.k 2LTAf.k gQ10 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|61e2",
		"America/Moncton|EST AST ADT AWT APT|50 40 30 30 30|012121212121212121212134121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2IsH0 CwN0 1in0 zAo0 An0 1Nd0 An0 1Nd0 An0 1Nd0 An0 1Nd0 An0 1Nd0 An0 1K10 Lz0 1zB0 NX0 1u10 Wn0 S20 8x50 iu0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 3Cp0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14n1 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 ReX 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|64e3",
		"America/Monterrey|LMT CST CDT|6F.g 60 50|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1UQG0 2FjC0 1nX0 i6p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|41e5",
		"America/Montevideo|LMT MMT -04 -03 -0330 -0230 -02 -0130|3I.P 3I.P 40 30 3u 2u 20 1u|012343434343434343434343435353636353636375363636363636363636363636363636363636363636363|-2tRUf.9 sVc0 8jcf.9 1db0 1dcu 1cLu 1dcu 1cLu ircu 11zu 1o0u 11zu 1o0u 11zu 1o0u 11zu 1qMu WLu 1qMu WLu 1fAu 1cLu 1o0u 11zu NAu 3jXu zXu Dq0u 19Xu pcu jz0 cm10 19X0 6tB0 1fbu 3o0u jX0 4vB0 xz0 3Cp0 mmu 1a10 IMu Db0 4c10 uL0 1Nd0 An0 1SN0 uL0 mp0 28L0 iPB0 un0 1SN0 xz0 1zd0 Lz0 1zd0 Rb0 1zd0 On0 1wp0 Rb0 s8p0 1fB0 1ip0 11z0 1ld0 14n0 1o10 11z0 1o10 11z0 1o10 14n0 1ld0 14n0 1ld0 14n0 1o10 11z0 1o10 11z0 1o10 11z0|17e5",
		"America/Toronto|EST EDT EWT EPT|50 40 40 40|01010101010101010101010101010101010101010101012301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-25TR0 1in0 11Wu 1nzu 1fD0 WJ0 1wr0 Nb0 1Ap0 On0 1zd0 On0 1wp0 TX0 1tB0 TX0 1tB0 TX0 1tB0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 4kM0 8x40 iv0 1o10 11z0 1nX0 11z0 1o10 11z0 1o10 1qL0 11D0 1nX0 11B0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|65e5",
		"America/Nassau|LMT EST EDT|59.u 50 40|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2kNuO.u 26XdO.u 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|24e4",
		"America/New_York|EST EDT EWT EPT|50 40 40 40|01010101010101010101010101010101010101010101010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261t0 1nX0 11B0 1nX0 11B0 1qL0 1a10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 RB0 8x40 iv0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|21e6",
		"America/Nipigon|EST EDT EWT EPT|50 40 40 40|010123010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-25TR0 1in0 Rnb0 3je0 8x40 iv0 19yN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|16e2",
		"America/Nome|NST NWT NPT BST BDT YST AKST AKDT|b0 a0 a0 b0 a0 90 90 80|012034343434343434343434343434343456767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676767676|-17SX0 8wW0 iB0 Qlb0 52O0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 cl0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|38e2",
		"America/Noronha|LMT -02 -01|29.E 20 10|0121212121212121212121212121212121212121|-2glxO.k HdKO.k 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 nsp0 WL0 1tB0 2L0 2pB0 On0|30e2",
		"America/North_Dakota/Beulah|MST MDT MWT MPT CST CDT|70 60 60 60 60 50|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101014545454545454545454545454545454545454545454545454545454|-261r0 1nX0 11B0 1nX0 SgN0 8x20 ix0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Oo0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
		"America/North_Dakota/Center|MST MDT MWT MPT CST CDT|70 60 60 60 60 50|010102301010101010101010101010101010101010101010101010101014545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-261r0 1nX0 11B0 1nX0 SgN0 8x20 ix0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14o0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
		"America/North_Dakota/New_Salem|MST MDT MWT MPT CST CDT|70 60 60 60 60 50|010102301010101010101010101010101010101010101010101010101010101010101010101010101454545454545454545454545454545454545454545454545454545454545454545454|-261r0 1nX0 11B0 1nX0 SgN0 8x20 ix0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14o0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
		"America/Ojinaga|LMT MST CST CDT MDT|6V.E 70 60 50 60|0121212323241414141414141414141414141414141414141414141414141414141414141414141414141414141|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 2zQN0 1lb0 14p0 1lb0 14q0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 U10 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|23e3",
		"America/Pangnirtung|-00 AST AWT APT ADDT ADT EDT EST CST CDT|0 40 30 30 20 30 40 50 60 50|012314151515151515151515151515151515167676767689767676767676767676767676767676767676767676767676767676767676767676767676767|-1XiM0 PnG0 8x50 iu0 LCL0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1o00 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11C0 1nX0 11A0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|14e2",
		"America/Paramaribo|LMT PMT PMT -0330 -03|3E.E 3E.Q 3E.A 3u 30|01234|-2nDUj.k Wqo0.c qanX.I 1yVXN.o|24e4",
		"America/Phoenix|MST MDT MWT|70 60 60|01010202010|-261r0 1nX0 11B0 1nX0 SgN0 4Al1 Ap0 1db0 SWqX 1cL0|42e5",
		"America/Port-au-Prince|PPMT EST EDT|4N 50 40|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-28RHb 2FnMb 19X0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14q0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 i6n0 1nX0 11B0 1nX0 d430 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 3iN0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|23e5",
		"America/Rio_Branco|LMT -05 -04|4v.c 50 40|01212121212121212121212121212121|-2glvs.M HdLs.M 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 NBd0 d5X0|31e4",
		"America/Porto_Velho|LMT -04 -03|4f.A 40 30|012121212121212121212121212121|-2glvI.o HdKI.o 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0|37e4",
		"America/Puerto_Rico|AST AWT APT|40 30 30|0120|-17lU0 7XT0 iu0|24e5",
		"America/Punta_Arenas|SMT -05 -04 -03|4G.K 50 40 30|0102021212121212121232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323|-2q2jh.e fJAh.e 5knG.K 1Vzh.e jRAG.K 1pbh.e 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 nHX0 op0 blz0 ko0 Qeo0 WL0 1zd0 On0 1ip0 11z0 1o10 11z0 1qN0 WL0 1ld0 14n0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 1cL0 1cN0 11z0 1o10 11z0 1qN0 WL0 1fB0 19X0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1ip0 1fz0 1fB0 11z0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1o10 19X0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 46n0 Ap0|",
		"America/Rainy_River|CST CDT CWT CPT|60 50 50 50|010123010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-25TQ0 1in0 Rnb0 3je0 8x30 iw0 19yN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|842",
		"America/Rankin_Inlet|-00 CST CDDT CDT EST|0 60 40 50 50|012131313131313131313131313131313131313131313431313131313131313131313131313131313131313131313131313131313131313131313131|-vDc0 keu0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|26e2",
		"America/Recife|LMT -03 -02|2j.A 30 20|0121212121212121212121212121212121212121|-2glxE.o HdLE.o 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 nsp0 WL0 1tB0 2L0 2pB0 On0|33e5",
		"America/Regina|LMT MST MDT MWT MPT CST|6W.A 70 60 60 60 60|012121212121212121212121341212121212121212121212121215|-2AD51.o uHe1.o 1in0 s2L0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 66N0 1cL0 1cN0 19X0 1fB0 1cL0 1fB0 1cL0 1cN0 1cL0 M30 8x20 ix0 1ip0 1cL0 1ip0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 3NB0 1cL0 1cN0|19e4",
		"America/Resolute|-00 CST CDDT CDT EST|0 60 40 50 50|012131313131313131313131313131313131313131313431313131313431313131313131313131313131313131313131313131313131313131313131|-SnA0 GWS0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|229",
		"America/Santarem|LMT -04 -03|3C.M 40 30|0121212121212121212121212121212|-2glwl.c HdLl.c 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 qe10 xb0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 NBd0|21e4",
		"America/Santiago|SMT -05 -04 -03|4G.K 50 40 30|010202121212121212321232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323|-2q2jh.e fJAh.e 5knG.K 1Vzh.e jRAG.K 1pbh.e 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 nHX0 op0 9Bz0 jb0 1oN0 ko0 Qeo0 WL0 1zd0 On0 1ip0 11z0 1o10 11z0 1qN0 WL0 1ld0 14n0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 1cL0 1cN0 11z0 1o10 11z0 1qN0 WL0 1fB0 19X0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1ip0 1fz0 1fB0 11z0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1o10 19X0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 46n0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1zb0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0|62e5",
		"America/Santo_Domingo|SDMT EST EDT -0430 AST|4E 50 40 4u 40|01213131313131414|-1ttjk 1lJMk Mn0 6sp0 Lbu 1Cou yLu 1RAu wLu 1QMu xzu 1Q0u xXu 1PAu 13jB0 e00|29e5",
		"America/Sao_Paulo|LMT -03 -02|36.s 30 20|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2glwR.w HdKR.w 1cc0 1e10 1bX0 Ezd0 So0 1vA0 Mn0 1BB0 ML0 1BB0 zX0 pTd0 PX0 2ep0 nz0 1C10 zX0 1C10 LX0 1C10 Mn0 H210 Rb0 1tB0 IL0 1Fd0 FX0 1EN0 FX0 1HB0 Lz0 1EN0 Lz0 1C10 IL0 1HB0 Db0 1HB0 On0 1zd0 On0 1zd0 Lz0 1zd0 Rb0 1wN0 Wn0 1tB0 Rb0 1tB0 WL0 1tB0 Rb0 1zd0 On0 1HB0 FX0 1C10 Lz0 1Ip0 HX0 1zd0 On0 1HB0 IL0 1wp0 On0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 Rb0 1zd0 Lz0 1C10 Lz0 1C10 On0 1zd0 On0 1zd0 On0 1zd0 On0 1HB0 FX0|20e6",
		"America/Scoresbysund|LMT -02 -01 +00|1r.Q 20 10 0|0121323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-2a5Ww.8 2z5ew.8 1a00 1cK0 1cL0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|452",
		"America/Sitka|PST PWT PPT PDT YST AKST AKDT|80 70 70 70 90 90 80|01203030303030303030303030303030345656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565656565|-17T20 8x10 iy0 Vo10 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 co0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|90e2",
		"America/St_Johns|NST NDT NST NDT NWT NPT NDDT|3u.Q 2u.Q 3u 2u 2u 2u 1u|01010101010101010101010101010101010102323232323232324523232323232323232323232323232323232323232323232323232323232323232323232323232323232326232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-28oit.8 14L0 1nB0 1in0 1gm0 Dz0 1JB0 1cL0 1cN0 1cL0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1fB0 1cL0 1cN0 1cL0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1fB0 19X0 1fB0 1cL0 1fB0 19X0 1fB0 19X0 10O0 eKX.8 19X0 1iq0 WL0 1qN0 WL0 1qN0 WL0 1tB0 TX0 1tB0 WL0 1qN0 WL0 1qN0 7UHu itu 1tB0 WL0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1tB0 WL0 1ld0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14n1 1lb0 14p0 1nW0 11C0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zcX Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|11e4",
		"America/Swift_Current|LMT MST MDT MWT MPT CST|7b.k 70 60 60 60 60|012134121212121212121215|-2AD4M.E uHdM.E 1in0 UGp0 8x20 ix0 1o10 17b0 1ip0 11z0 1o10 11z0 1o10 11z0 isN0 1cL0 3Cp0 1cL0 1cN0 11z0 1qN0 WL0 pMp0|16e3",
		"America/Tegucigalpa|LMT CST CDT|5M.Q 60 50|01212121|-1WGGb.8 2ETcb.8 WL0 1qN0 WL0 GRd0 AL0|11e5",
		"America/Thule|LMT AST ADT|4z.8 40 30|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2a5To.Q 31NBo.Q 1cL0 1cN0 1cL0 1fB0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|656",
		"America/Thunder_Bay|CST EST EWT EPT EDT|60 50 40 40 40|0123141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141414141|-2q5S0 1iaN0 8x40 iv0 XNB0 1cL0 1cN0 1fz0 1cN0 1cL0 3Cp0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|11e4",
		"America/Vancouver|PST PDT PWT PPT|80 70 70 70|0102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-25TO0 1in0 UGp0 8x10 iy0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|23e5",
		"America/Whitehorse|YST YDT YWT YPT YDDT PST PDT MST|90 80 80 80 70 80 70 70|01010230405656565656565656565656565656565656565656565656565656565656565656565656565656565657|-25TN0 1in0 1o10 13V0 Ser0 8x00 iz0 LCL0 1fA0 3NA0 vrd0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0|23e3",
		"America/Winnipeg|CST CDT CWT CPT|60 50 50 50|010101023010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aIi0 WL0 3ND0 1in0 Jap0 Rb0 aCN0 8x30 iw0 1tB0 11z0 1ip0 11z0 1o10 11z0 1o10 11z0 1rd0 10L0 1op0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 1cL0 1cN0 11z0 6i10 WL0 6i10 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1a00 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1a00 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1o00 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1o00 11A0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|66e4",
		"America/Yakutat|YST YWT YPT YDT AKST AKDT|90 80 80 80 90 80|01203030303030303030303030303030304545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-17T10 8x00 iz0 Vo10 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 cn0 10q0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|642",
		"America/Yellowknife|-00 MST MWT MPT MDDT MDT|0 70 60 60 50 60|012314151515151515151515151515151515151515151515151515151515151515151515151515151515151515151515151515151515151515151515151|-1pdA0 hix0 8x20 ix0 LCL0 1fA0 zgO0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|19e3",
		"Antarctica/Casey|-00 +08 +11|0 -80 -b0|01212121|-2q00 1DjS0 T90 40P0 KL0 blz0 3m10|10",
		"Antarctica/Davis|-00 +07 +05|0 -70 -50|01012121|-vyo0 iXt0 alj0 1D7v0 VB0 3Wn0 KN0|70",
		"Antarctica/DumontDUrville|-00 +10|0 -a0|0101|-U0o0 cfq0 bFm0|80",
		"Antarctica/Macquarie|AEST AEDT -00 +11|-a0 -b0 0 -b0|0102010101010101010101010101010101010101010101010101010101010101010101010101010101010101013|-29E80 19X0 4SL0 1ayy0 Lvs0 1cM0 1o00 Rc0 1wo0 Rc0 1wo0 U00 1wo0 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1qM0 WM0 1qM0 Oo0 1zc0 Oo0 1zc0 Oo0 1wo0 WM0 1tA0 WM0 1tA0 U00 1tA0 U00 1tA0 11A0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 11A0 1o00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1cM0 1cM0 1cM0|1",
		"Antarctica/Mawson|-00 +06 +05|0 -60 -50|012|-CEo0 2fyk0|60",
		"Pacific/Auckland|NZMT NZST NZST NZDT|-bu -cu -c0 -d0|01020202020202020202020202023232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323|-1GCVu Lz0 1tB0 11zu 1o0u 11zu 1o0u 11zu 1o0u 14nu 1lcu 14nu 1lcu 1lbu 11Au 1nXu 11Au 1nXu 11Au 1nXu 11Au 1nXu 11Au 1qLu WMu 1qLu 11Au 1n1bu IM0 1C00 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1qM0 14o0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1io0 17c0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1io0 17c0 1io0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00|14e5",
		"Antarctica/Palmer|-00 -03 -04 -02|0 30 40 20|0121212121213121212121212121212121212121212121212121212121212121212121212121212121|-cao0 nD0 1vd0 SL0 1vd0 17z0 1cN0 1fz0 1cN0 1cL0 1cN0 asn0 Db0 jsN0 14N0 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 1cL0 1cN0 11z0 1o10 11z0 1qN0 WL0 1fB0 19X0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1ip0 1fz0 1fB0 11z0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1o10 19X0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 46n0 Ap0|40",
		"Antarctica/Rothera|-00 -03|0 30|01|gOo0|130",
		"Antarctica/Syowa|-00 +03|0 -30|01|-vs00|20",
		"Antarctica/Troll|-00 +00 +02|0 0 -20|01212121212121212121212121212121212121212121212121212121212121212121|1puo0 hd0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|40",
		"Antarctica/Vostok|-00 +06|0 -60|01|-tjA0|25",
		"Europe/Oslo|CET CEST|-10 -20|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2awM0 Qm0 W6o0 5pf0 WM0 1fA0 1cM0 1cM0 1cM0 1cM0 wJc0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1qM0 WM0 zpc0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|62e4",
		"Asia/Riyadh|LMT +03|-36.Q -30|01|-TvD6.Q|57e5",
		"Asia/Almaty|LMT +05 +06 +07|-57.M -50 -60 -70|012323232323232323232321232323232323232323232323232|-1Pc57.M eUo7.M 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0|15e5",
		"Asia/Amman|LMT EET EEST|-2n.I -20 -30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1yW2n.I 1HiMn.I KL0 1oN0 11b0 1oN0 11b0 1pd0 1dz0 1cp0 11b0 1op0 11b0 fO10 1db0 1e10 1cL0 1cN0 1cL0 1cN0 1fz0 1pd0 10n0 1ld0 14n0 1hB0 15b0 1ip0 19X0 1cN0 1cL0 1cN0 17b0 1ld0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1So0 y00 1fc0 1dc0 1co0 1dc0 1cM0 1cM0 1cM0 1o00 11A0 1lc0 17c0 1cM0 1cM0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 4bX0 Dd0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0|25e5",
		"Asia/Anadyr|LMT +12 +13 +14 +11|-bN.U -c0 -d0 -e0 -b0|01232121212121212121214121212121212121212121212121212121212141|-1PcbN.U eUnN.U 23CL0 1db0 2q10 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 2sp0 WM0|13e3",
		"Asia/Aqtau|LMT +04 +05 +06|-3l.4 -40 -50 -60|012323232323232323232123232312121212121212121212|-1Pc3l.4 eUnl.4 24PX0 2pX0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0|15e4",
		"Asia/Aqtobe|LMT +04 +05 +06|-3M.E -40 -50 -60|0123232323232323232321232323232323232323232323232|-1Pc3M.E eUnM.E 23CL0 3Db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0|27e4",
		"Asia/Ashgabat|LMT +04 +05 +06|-3R.w -40 -50 -60|0123232323232323232323212|-1Pc3R.w eUnR.w 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0|41e4",
		"Asia/Atyrau|LMT +03 +05 +06 +04|-3r.I -30 -50 -60 -40|01232323232323232323242323232323232324242424242|-1Pc3r.I eUor.I 24PW0 2pX0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 2sp0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0|",
		"Asia/Baghdad|BMT +03 +04|-2V.A -30 -40|012121212121212121212121212121212121212121212121212121|-26BeV.A 2ACnV.A 11b0 1cp0 1dz0 1dd0 1db0 1cN0 1cp0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1de0 1dc0 1dc0 1dc0 1cM0 1dc0 1cM0 1dc0 1cM0 1dc0 1dc0 1dc0 1cM0 1dc0 1cM0 1dc0 1cM0 1dc0 1dc0 1dc0 1cM0 1dc0 1cM0 1dc0 1cM0 1dc0 1dc0 1dc0 1cM0 1dc0 1cM0 1dc0 1cM0 1dc0|66e5",
		"Asia/Qatar|LMT +04 +03|-3q.8 -40 -30|012|-21Jfq.8 27BXq.8|96e4",
		"Asia/Baku|LMT +03 +04 +05|-3j.o -30 -40 -50|01232323232323232323232123232323232323232323232323232323232323232|-1Pc3j.o 1jUoj.o WCL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 1cM0 9Je0 1o00 11z0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00|27e5",
		"Asia/Bangkok|BMT +07|-6G.4 -70|01|-218SG.4|15e6",
		"Asia/Barnaul|LMT +06 +07 +08|-5z -60 -70 -80|0123232323232323232323212323232321212121212121212121212121212121212|-21S5z pCnz 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 p90 LE0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3rd0|",
		"Asia/Beirut|EET EEST|-20 -30|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-21aq0 1on0 1410 1db0 19B0 1in0 1ip0 WL0 1lQp0 11b0 1oN0 11b0 1oN0 11b0 1pd0 11b0 1oN0 11b0 q6N0 En0 1oN0 11b0 1oN0 11b0 1oN0 11b0 1pd0 11b0 1oN0 11b0 1op0 11b0 dA10 17b0 1iN0 17b0 1iN0 17b0 1iN0 17b0 1vB0 SL0 1mp0 13z0 1iN0 17b0 1iN0 17b0 1jd0 12n0 1a10 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0|22e5",
		"Asia/Bishkek|LMT +05 +06 +07|-4W.o -50 -60 -70|012323232323232323232321212121212121212121212121212|-1Pc4W.o eUnW.o 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2e00 1tX0 17b0 1ip0 17b0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1cPu 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0|87e4",
		"Asia/Brunei|LMT +0730 +08|-7D.E -7u -80|012|-1KITD.E gDc9.E|42e4",
		"Asia/Kolkata|MMT IST +0630|-5l.a -5u -6u|012121|-2zOtl.a 1r2LP.a 1un0 HB0 7zX0|15e6",
		"Asia/Chita|LMT +08 +09 +10|-7x.Q -80 -90 -a0|012323232323232323232321232323232323232323232323232323232323232312|-21Q7x.Q pAnx.Q 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3re0|33e4",
		"Asia/Choibalsan|LMT +07 +08 +10 +09|-7C -70 -80 -a0 -90|0123434343434343434343434343434343434343434343424242|-2APHC 2UkoC cKn0 1da0 1dd0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 6hD0 11z0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 3Db0 h1f0 1cJ0 1cP0 1cJ0|38e3",
		"Asia/Shanghai|CST CDT|-80 -90|01010101010101010101010101010|-23uw0 18n0 OjB0 Rz0 11d0 1wL0 A10 8HX0 1G10 Tz0 1ip0 1jX0 1cN0 11b0 1oN0 aL0 1tU30 Rb0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0|23e6",
		"Asia/Colombo|MMT +0530 +06 +0630|-5j.w -5u -60 -6u|01231321|-2zOtj.w 1rFbN.w 1zzu 7Apu 23dz0 11zu n3cu|22e5",
		"Asia/Dhaka|HMT +0630 +0530 +06 +07|-5R.k -6u -5u -60 -70|0121343|-18LFR.k 1unn.k HB0 m6n0 2kxbu 1i00|16e6",
		"Asia/Damascus|LMT EET EEST|-2p.c -20 -30|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-21Jep.c Hep.c 17b0 1ip0 17b0 1ip0 17b0 1ip0 19X0 1xRB0 11X0 1oN0 10L0 1pB0 11b0 1oN0 10L0 1mp0 13X0 1oN0 11b0 1pd0 11b0 1oN0 11b0 1oN0 11b0 1oN0 11b0 1pd0 11b0 1oN0 11b0 1oN0 11b0 1oN0 11b0 1pd0 11b0 1oN0 Nb0 1AN0 Nb0 bcp0 19X0 1gp0 19X0 3ld0 1xX0 Vd0 1Bz0 Sp0 1vX0 10p0 1dz0 1cN0 1cL0 1db0 1db0 1g10 1an0 1ap0 1db0 1fd0 1db0 1cN0 1db0 1dd0 1db0 1cp0 1dz0 1c10 1dX0 1cN0 1db0 1dd0 1db0 1cN0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1db0 1cN0 1db0 1cN0 19z0 1fB0 1qL0 11B0 1on0 Wp0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0|26e5",
		"Asia/Dili|LMT +08 +09|-8m.k -80 -90|01212|-2le8m.k 1dnXm.k 1nfA0 Xld0|19e4",
		"Asia/Dubai|LMT +04|-3F.c -40|01|-21JfF.c|39e5",
		"Asia/Dushanbe|LMT +05 +06 +07|-4z.c -50 -60 -70|012323232323232323232321|-1Pc4z.c eUnz.c 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2hB0|76e4",
		"Asia/Famagusta|LMT EET EEST +03|-2f.M -20 -30 -30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212312121212121212121212121212121212121212121|-1Vc2f.M 2a3cf.M 1cL0 1qp0 Xz0 19B0 19X0 1fB0 1db0 1cp0 1cL0 1fB0 19X0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1o30 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 15U0 2Ks0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|",
		"Asia/Gaza|EET EEST IST IDT|-20 -30 -20 -30|0101010101010101010101010101010123232323232323232323232323232320101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-1c2q0 5Rb0 10r0 1px0 10N0 1pz0 16p0 1jB0 16p0 1jx0 pBd0 Vz0 1oN0 11b0 1oO0 10N0 1pz0 10N0 1pb0 10N0 1pb0 10N0 1pb0 10N0 1pz0 10N0 1pb0 10N0 1pb0 11d0 1oL0 dW0 hfB0 Db0 1fB0 Rb0 bXd0 gM0 8Q00 IM0 1wM0 11z0 1C10 IL0 1s10 10n0 1o10 WL0 1zd0 On0 1ld0 11z0 1o10 14n0 1o10 14n0 1nd0 12n0 1nd0 Xz0 1q10 12n0 M10 C00 17c0 1io0 17c0 1io0 17c0 1o00 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 17c0 1io0 18N0 1bz0 19z0 1gp0 1610 1iL0 11z0 1o10 14o0 1lA1 SKX 1xd1 MKX 1AN0 1a00 1fA0 1cL0 1cN0 1nX0 1210 1nz0 1220 1qL0 WN0 1qL0 WN0 1qL0 11c0 1oo0 11c0 1rc0 Wo0 1rc0 Wo0 1rc0 11c0 1oo0 11c0 1oo0 11c0 1oo0 11c0 1rc0 Wo0 1rc0 11c0 1oo0 11c0 1oo0 11c0 1oo0 11c0 1oo0 11c0 1rc0 Wo0 1rc0 11c0 1oo0 11c0 1oo0 11c0 1oo0 11c0 1rc0|18e5",
		"Asia/Hebron|EET EEST IST IDT|-20 -30 -20 -30|010101010101010101010101010101012323232323232323232323232323232010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-1c2q0 5Rb0 10r0 1px0 10N0 1pz0 16p0 1jB0 16p0 1jx0 pBd0 Vz0 1oN0 11b0 1oO0 10N0 1pz0 10N0 1pb0 10N0 1pb0 10N0 1pb0 10N0 1pz0 10N0 1pb0 10N0 1pb0 11d0 1oL0 dW0 hfB0 Db0 1fB0 Rb0 bXd0 gM0 8Q00 IM0 1wM0 11z0 1C10 IL0 1s10 10n0 1o10 WL0 1zd0 On0 1ld0 11z0 1o10 14n0 1o10 14n0 1nd0 12n0 1nd0 Xz0 1q10 12n0 M10 C00 17c0 1io0 17c0 1io0 17c0 1o00 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 17c0 1io0 18N0 1bz0 19z0 1gp0 1610 1iL0 12L0 1mN0 14o0 1lc0 Tb0 1xd1 MKX bB0 cn0 1cN0 1a00 1fA0 1cL0 1cN0 1nX0 1210 1nz0 1220 1qL0 WN0 1qL0 WN0 1qL0 11c0 1oo0 11c0 1rc0 Wo0 1rc0 Wo0 1rc0 11c0 1oo0 11c0 1oo0 11c0 1oo0 11c0 1rc0 Wo0 1rc0 11c0 1oo0 11c0 1oo0 11c0 1oo0 11c0 1oo0 11c0 1rc0 Wo0 1rc0 11c0 1oo0 11c0 1oo0 11c0 1oo0 11c0 1rc0|25e4",
		"Asia/Ho_Chi_Minh|LMT PLMT +07 +08 +09|-76.E -76.u -70 -80 -90|0123423232|-2yC76.E bK00.a 1h7b6.u 5lz0 18o0 3Oq0 k5b0 aW00 BAM0|90e5",
		"Asia/Hong_Kong|LMT HKT HKST HKWT JST|-7A.G -80 -90 -8u -90|0123412121212121212121212121212121212121212121212121212121212121212121|-2CFH0 1taO0 Hc0 xUu 9tBu 11z0 1tDu Rc0 1wo0 11A0 1cM0 11A0 1o00 11A0 1o00 11A0 1o00 14o0 1o00 11A0 1nX0 U10 1tz0 U10 1wn0 Rd0 1wn0 U10 1tz0 U10 1tz0 U10 1tz0 U10 1wn0 Rd0 1wn0 Rd0 1wn0 U10 1tz0 U10 1tz0 17d0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 s10 1Vz0 1cN0 1cL0 1cN0 1cL0 6fd0 14n0|73e5",
		"Asia/Hovd|LMT +06 +07 +08|-66.A -60 -70 -80|012323232323232323232323232323232323232323232323232|-2APG6.A 2Uko6.A cKn0 1db0 1dd0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 6hD0 11z0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 kEp0 1cJ0 1cP0 1cJ0|81e3",
		"Asia/Irkutsk|IMT +07 +08 +09|-6V.5 -70 -80 -90|01232323232323232323232123232323232323232323232323232323232323232|-21zGV.5 pjXV.5 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|60e4",
		"Europe/Istanbul|IMT EET EEST +03 +04|-1U.U -20 -30 -30 -40|0121212121212121212121212121212121212121212121234312121212121212121212121212121212121212121212121212121212121212123|-2ogNU.U dzzU.U 11b0 8tB0 1on0 1410 1db0 19B0 1in0 3Rd0 Un0 1oN0 11b0 zSN0 CL0 mp0 1Vz0 1gN0 8yn0 1yp0 ML0 1kp0 17b0 1ip0 17b0 1fB0 19X0 1ip0 19X0 1ip0 17b0 qdB0 38L0 1jd0 Tz0 l6O0 11A0 WN0 1qL0 TB0 1tX0 U10 1tz0 11B0 1in0 17d0 z90 cne0 pb0 2Cp0 1800 14o0 1dc0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1a00 1fA0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WO0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 Xc0 1qo0 WM0 1qM0 11A0 1o00 1200 1nA0 11A0 1tA0 U00 15w0|13e6",
		"Asia/Jakarta|BMT +0720 +0730 +09 +08 WIB|-77.c -7k -7u -90 -80 -70|01232425|-1Q0Tk luM0 mPzO 8vWu 6kpu 4PXu xhcu|31e6",
		"Asia/Jayapura|LMT +09 +0930 WIT|-9m.M -90 -9u -90|0123|-1uu9m.M sMMm.M L4nu|26e4",
		"Asia/Jerusalem|JMT IST IDT IDDT|-2k.E -20 -30 -40|012121212121321212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-26Bek.E SyMk.E 5Rb0 10r0 1px0 10N0 1pz0 16p0 1jB0 16p0 1jx0 3LB0 Em0 or0 1cn0 1dB0 16n0 10O0 1ja0 1tC0 14o0 1cM0 1a00 11A0 1Na0 An0 1MP0 AJ0 1Kp0 LC0 1oo0 Wl0 EQN0 Db0 1fB0 Rb0 bXd0 gM0 8Q00 IM0 1wM0 11z0 1C10 IL0 1s10 10n0 1o10 WL0 1zd0 On0 1ld0 11z0 1o10 14n0 1o10 14n0 1nd0 12n0 1nd0 Xz0 1q10 12n0 1hB0 1dX0 1ep0 1aL0 1eN0 17X0 1nf0 11z0 1tB0 19W0 1e10 17b0 1ep0 1gL0 18N0 1fz0 1eN0 17b0 1gq0 1gn0 19d0 1dz0 1c10 17X0 1hB0 1gn0 19d0 1dz0 1c10 17X0 1kp0 1dz0 1c10 1aL0 1eN0 1oL0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0 10N0 1rz0 W10 1rz0 W10 1rz0 W10 1rz0 10N0 1oL0 10N0 1oL0|81e4",
		"Asia/Kabul|+04 +0430|-40 -4u|01|-10Qs0|46e5",
		"Asia/Kamchatka|LMT +11 +12 +13|-ay.A -b0 -c0 -d0|012323232323232323232321232323232323232323232323232323232323212|-1SLKy.A ivXy.A 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 2sp0 WM0|18e4",
		"Asia/Karachi|LMT +0530 +0630 +05 PKT PKST|-4s.c -5u -6u -50 -50 -60|012134545454|-2xoss.c 1qOKW.c 7zX0 eup0 LqMu 1fy00 1cL0 dK10 11b0 1610 1jX0|24e6",
		"Asia/Urumqi|LMT +06|-5O.k -60|01|-1GgtO.k|32e5",
		"Asia/Kathmandu|LMT +0530 +0545|-5F.g -5u -5J|012|-21JhF.g 2EGMb.g|12e5",
		"Asia/Khandyga|LMT +08 +09 +10 +11|-92.d -80 -90 -a0 -b0|0123232323232323232323212323232323232323232323232343434343434343432|-21Q92.d pAp2.d 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 qK0 yN0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 17V0 7zD0|66e2",
		"Asia/Krasnoyarsk|LMT +06 +07 +08|-6b.q -60 -70 -80|01232323232323232323232123232323232323232323232323232323232323232|-21Hib.q prAb.q 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|10e5",
		"Asia/Kuala_Lumpur|SMT +07 +0720 +0730 +09 +08|-6T.p -70 -7k -7u -90 -80|0123435|-2Bg6T.p 17anT.p l5XE 17bO 8Fyu 1so1u|71e5",
		"Asia/Kuching|LMT +0730 +08 +0820 +09|-7l.k -7u -80 -8k -90|0123232323232323242|-1KITl.k gDbP.k 6ynu AnE 1O0k AnE 1NAk AnE 1NAk AnE 1NAk AnE 1O0k AnE 1NAk AnE pAk 8Fz0|13e4",
		"Asia/Macau|LMT CST +09 +10 CDT|-7y.a -80 -90 -a0 -90|012323214141414141414141414141414141414141414141414141414141414141414141|-2CFHy.a 1uqKy.a PX0 1kn0 15B0 11b0 4Qq0 1oM0 11c0 1ko0 1u00 11A0 1cM0 11c0 1o00 11A0 1o00 11A0 1oo0 1400 1o00 11A0 1o00 U00 1tA0 U00 1wo0 Rc0 1wru U10 1tz0 U10 1tz0 U10 1tz0 U10 1wn0 Rd0 1wn0 Rd0 1wn0 U10 1tz0 U10 1tz0 17d0 1cK0 1cO0 1cK0 1cO0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 s10 1Vz0 1cN0 1cL0 1cN0 1cL0 6fd0 14n0|57e4",
		"Asia/Magadan|LMT +10 +11 +12|-a3.c -a0 -b0 -c0|012323232323232323232321232323232323232323232323232323232323232312|-1Pca3.c eUo3.c 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3Cq0|95e3",
		"Asia/Makassar|LMT MMT +08 +09 WITA|-7V.A -7V.A -80 -90 -80|01234|-21JjV.A vfc0 myLV.A 8ML0|15e5",
		"Asia/Manila|PST PDT JST|-80 -90 -90|010201010|-1kJI0 AL0 cK10 65X0 mXB0 vX0 VK10 1db0|24e6",
		"Asia/Nicosia|LMT EET EEST|-2d.s -20 -30|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1Vc2d.s 2a3cd.s 1cL0 1qp0 Xz0 19B0 19X0 1fB0 1db0 1cp0 1cL0 1fB0 19X0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1o30 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|32e4",
		"Asia/Novokuznetsk|LMT +06 +07 +08|-5M.M -60 -70 -80|012323232323232323232321232323232323232323232323232323232323212|-1PctM.M eULM.M 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 2sp0 WM0|55e4",
		"Asia/Novosibirsk|LMT +06 +07 +08|-5v.E -60 -70 -80|0123232323232323232323212323212121212121212121212121212121212121212|-21Qnv.E pAFv.E 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 ml0 Os0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 4eN0|15e5",
		"Asia/Omsk|LMT +05 +06 +07|-4R.u -50 -60 -70|01232323232323232323232123232323232323232323232323232323232323232|-224sR.u pMLR.u 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|12e5",
		"Asia/Oral|LMT +03 +05 +06 +04|-3p.o -30 -50 -60 -40|01232323232323232424242424242424242424242424242|-1Pc3p.o eUop.o 23CK0 3Db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1fA0 1cM0 1cM0 IM0 1EM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0|27e4",
		"Asia/Pontianak|LMT PMT +0730 +09 +08 WITA WIB|-7h.k -7h.k -7u -90 -80 -80 -70|012324256|-2ua7h.k XE00 munL.k 8Rau 6kpu 4PXu xhcu Wqnu|23e4",
		"Asia/Pyongyang|LMT KST JST KST|-8n -8u -90 -90|012313|-2um8n 97XR 1lTzu 2Onc0 6BA0|29e5",
		"Asia/Qostanay|LMT +04 +05 +06|-4e.s -40 -50 -60|012323232323232323232123232323232323232323232323|-1Pc4e.s eUoe.s 23CL0 3Db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0|",
		"Asia/Qyzylorda|LMT +04 +05 +06|-4l.Q -40 -50 -60|01232323232323232323232323232323232323232323232|-1Pc4l.Q eUol.Q 23CL0 3Db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 3ao0 1EM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 zQl0|73e4",
		"Asia/Rangoon|RMT +0630 +09|-6o.L -6u -90|0121|-21Jio.L SmnS.L 7j9u|48e5",
		"Asia/Sakhalin|LMT +09 +11 +12 +10|-9u.M -90 -b0 -c0 -a0|01232323232323232323232423232323232424242424242424242424242424242|-2AGVu.M 1BoMu.M 1qFa0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 2pB0 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3rd0|58e4",
		"Asia/Samarkand|LMT +04 +05 +06|-4r.R -40 -50 -60|01232323232323232323232|-1Pc4r.R eUor.R 23CL0 3Db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0|36e4",
		"Asia/Seoul|LMT KST JST KST KDT KDT|-8r.Q -8u -90 -90 -a0 -9u|012343434343151515151515134343|-2um8r.Q 97XV.Q 1m1zu 6CM0 Fz0 1kN0 14n0 1kN0 14L0 1zd0 On0 69B0 2I0u OL0 1FB0 Rb0 1qN0 TX0 1tB0 TX0 1tB0 TX0 1tB0 TX0 2ap0 12FBu 11A0 1o00 11A0|23e6",
		"Asia/Srednekolymsk|LMT +10 +11 +12|-ae.Q -a0 -b0 -c0|01232323232323232323232123232323232323232323232323232323232323232|-1Pcae.Q eUoe.Q 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|35e2",
		"Asia/Taipei|CST JST CDT|-80 -90 -90|01020202020202020202020202020202020202020|-1iw80 joM0 1yo0 Tz0 1ip0 1jX0 1cN0 11b0 1oN0 11b0 1oN0 11b0 1oN0 11b0 10N0 1BX0 10p0 1pz0 10p0 1pz0 10p0 1db0 1dd0 1db0 1cN0 1db0 1cN0 1db0 1cN0 1db0 1BB0 ML0 1Bd0 ML0 uq10 1db0 1cN0 1db0 97B0 AL0|74e5",
		"Asia/Tashkent|LMT +05 +06 +07|-4B.b -50 -60 -70|012323232323232323232321|-1Pc4B.b eUnB.b 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0|23e5",
		"Asia/Tbilisi|TBMT +03 +04 +05|-2X.b -30 -40 -50|0123232323232323232323212121232323232323232323212|-1Pc2X.b 1jUnX.b WCL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 1cK0 1cL0 1cN0 1cL0 1cN0 2pz0 1cL0 1fB0 3Nz0 11B0 1nX0 11B0 1qL0 WN0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 An0 Os0 WM0|11e5",
		"Asia/Tehran|LMT TMT +0330 +04 +05 +0430|-3p.I -3p.I -3u -40 -50 -4u|01234325252525252525252525252525252525252525252525252525252525252525252525252525252525252525252525252|-2btDp.I 1d3c0 1huLT.I TXu 1pz0 sN0 vAu 1cL0 1dB0 1en0 pNB0 UL0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 64p0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0 1cN0 1dz0 1cp0 1dz0 1cp0 1dz0 1cp0 1dz0|14e6",
		"Asia/Thimphu|LMT +0530 +06|-5W.A -5u -60|012|-Su5W.A 1BGMs.A|79e3",
		"Asia/Tokyo|JST JDT|-90 -a0|010101010|-QJJ0 Rc0 1lc0 14o0 1zc0 Oo0 1zc0 Oo0|38e6",
		"Asia/Tomsk|LMT +06 +07 +08|-5D.P -60 -70 -80|0123232323232323232323212323232323232323232323212121212121212121212|-21NhD.P pxzD.P 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 co0 1bB0 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3Qp0|10e5",
		"Asia/Ulaanbaatar|LMT +07 +08 +09|-77.w -70 -80 -90|012323232323232323232323232323232323232323232323232|-2APH7.w 2Uko7.w cKn0 1db0 1dd0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 6hD0 11z0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 kEp0 1cJ0 1cP0 1cJ0|12e5",
		"Asia/Ust-Nera|LMT +08 +09 +12 +11 +10|-9w.S -80 -90 -c0 -b0 -a0|012343434343434343434345434343434343434343434343434343434343434345|-21Q9w.S pApw.S 23CL0 1d90 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 17V0 7zD0|65e2",
		"Asia/Vladivostok|LMT +09 +10 +11|-8L.v -90 -a0 -b0|01232323232323232323232123232323232323232323232323232323232323232|-1SJIL.v itXL.v 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|60e4",
		"Asia/Yakutsk|LMT +08 +09 +10|-8C.W -80 -90 -a0|01232323232323232323232123232323232323232323232323232323232323232|-21Q8C.W pAoC.W 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|28e4",
		"Asia/Yekaterinburg|LMT PMT +04 +05 +06|-42.x -3J.5 -40 -50 -60|012343434343434343434343234343434343434343434343434343434343434343|-2ag42.x 7mQh.s qBvJ.5 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|14e5",
		"Asia/Yerevan|LMT +03 +04 +05|-2W -30 -40 -50|0123232323232323232323212121212323232323232323232323232323232|-1Pc2W 1jUnW WCL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 4RX0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0|13e5",
		"Atlantic/Azores|HMT -02 -01 +00 WET|1S.w 20 10 0 0|01212121212121212121212121212121212121212121232123212321232121212121212121212121212121212121212121232323232323232323232323232323234323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-2ldW0 aPX0 Sp0 LX0 1vc0 Tc0 1uM0 SM0 1vc0 Tc0 1vc0 SM0 1vc0 6600 1co0 3E00 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 3I00 17c0 1cM0 1cM0 3Fc0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 1tA0 1cM0 1dc0 1400 gL0 IM0 s10 U00 dX0 Rc0 pd0 Rc0 gL0 Oo0 pd0 Rc0 gL0 Oo0 pd0 14o0 1cM0 1cP0 1cM0 1cM0 1cM0 1cM0 1cM0 3Co0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 qIl0 1cM0 1fA0 1cM0 1cM0 1cN0 1cL0 1cN0 1cM0 1cM0 1cM0 1cM0 1cN0 1cL0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cL0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|25e4",
		"Atlantic/Bermuda|LMT AST ADT|4j.i 40 30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1BnRE.G 1LTbE.G 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|65e3",
		"Atlantic/Canary|LMT -01 WET WEST|11.A 10 0 -10|01232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-1UtaW.o XPAW.o 1lAK0 1a10 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|54e4",
		"Atlantic/Cape_Verde|LMT -02 -01|1y.4 20 10|01212|-2ldW0 1eEo0 7zX0 1djf0|50e4",
		"Atlantic/Faroe|LMT WET WEST|r.4 0 -10|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2uSnw.U 2Wgow.U 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|49e3",
		"Atlantic/Madeira|FMT -01 +00 +01 WET WEST|17.A 10 0 -10 0 -10|01212121212121212121212121212121212121212121232123212321232121212121212121212121212121212121212121454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-2ldX0 aPX0 Sp0 LX0 1vc0 Tc0 1uM0 SM0 1vc0 Tc0 1vc0 SM0 1vc0 6600 1co0 3E00 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 3I00 17c0 1cM0 1cM0 3Fc0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 1tA0 1cM0 1dc0 1400 gL0 IM0 s10 U00 dX0 Rc0 pd0 Rc0 gL0 Oo0 pd0 Rc0 gL0 Oo0 pd0 14o0 1cM0 1cP0 1cM0 1cM0 1cM0 1cM0 1cM0 3Co0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 qIl0 1cM0 1fA0 1cM0 1cM0 1cN0 1cL0 1cN0 1cM0 1cM0 1cM0 1cM0 1cN0 1cL0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|27e4",
		"Atlantic/Reykjavik|LMT -01 +00 GMT|1s 10 0 0|012121212121212121212121212121212121212121212121212121212121212121213|-2uWmw mfaw 1Bd0 ML0 1LB0 Cn0 1LB0 3fX0 C10 HrX0 1cO0 LB0 1EL0 LA0 1C00 Oo0 1wo0 Rc0 1wo0 Rc0 1wo0 Rc0 1zc0 Oo0 1zc0 14o0 1lc0 14o0 1lc0 14o0 1o00 11A0 1lc0 14o0 1o00 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1o00 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1o00 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1lc0 14o0 1o00 14o0|12e4",
		"Atlantic/South_Georgia|-02|20|0||30",
		"Atlantic/Stanley|SMT -04 -03 -02|3P.o 40 30 20|012121212121212323212121212121212121212121212121212121212121212121212|-2kJw8.A 12bA8.A 19X0 1fB0 19X0 1ip0 19X0 1fB0 19X0 1fB0 19X0 1fB0 Cn0 1Cc10 WL0 1qL0 U10 1tz0 2mN0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1tz0 U10 1tz0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1tz0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qL0 WN0 1qN0 U10 1wn0 Rd0 1wn0 U10 1tz0 U10 1tz0 U10 1tz0 U10 1tz0 U10 1wn0 U10 1tz0 U10 1tz0 U10|21e2",
		"Australia/Sydney|AEST AEDT|-a0 -b0|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-293lX xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 14o0 1o00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 U00 1qM0 WM0 1tA0 WM0 1tA0 U00 1tA0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 11A0 1o00 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 14o0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|40e5",
		"Australia/Adelaide|ACST ACDT|-9u -au|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-293lt xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 U00 1qM0 WM0 1tA0 WM0 1tA0 U00 1tA0 U00 1tA0 Oo0 1zc0 WM0 1qM0 Rc0 1zc0 U00 1tA0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 14o0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|11e5",
		"Australia/Brisbane|AEST AEDT|-a0 -b0|01010101010101010|-293lX xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 H1A0 Oo0 1zc0 Oo0 1zc0 Oo0|20e5",
		"Australia/Broken_Hill|ACST ACDT|-9u -au|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-293lt xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 14o0 1o00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 U00 1qM0 WM0 1tA0 WM0 1tA0 U00 1tA0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 14o0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|18e3",
		"Australia/Currie|AEST AEDT|-a0 -b0|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-29E80 19X0 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1qM0 WM0 1qM0 Oo0 1zc0 Oo0 1zc0 Oo0 1wo0 WM0 1tA0 WM0 1tA0 U00 1tA0 U00 1tA0 11A0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 11A0 1o00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|746",
		"Australia/Darwin|ACST ACDT|-9u -au|010101010|-293lt xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0|12e4",
		"Australia/Eucla|+0845 +0945|-8J -9J|0101010101010101010|-293kI xcX 10jd0 yL0 1cN0 1cL0 1gSp0 Oo0 l5A0 Oo0 iJA0 G00 zU00 IM0 1qM0 11A0 1o00 11A0|368",
		"Australia/Hobart|AEST AEDT|-a0 -b0|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-29E80 19X0 10jd0 yL0 1cN0 1cL0 1fB0 19X0 VfB0 1cM0 1o00 Rc0 1wo0 Rc0 1wo0 U00 1wo0 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 11A0 1qM0 WM0 1qM0 Oo0 1zc0 Oo0 1zc0 Oo0 1wo0 WM0 1tA0 WM0 1tA0 U00 1tA0 U00 1tA0 11A0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 11A0 1o00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|21e4",
		"Australia/Lord_Howe|AEST +1030 +1130 +11|-a0 -au -bu -b0|0121212121313131313131313131313131313131313131313131313131313131313131313131313131313131313131313131313131313131313|raC0 1zdu Rb0 1zd0 On0 1zd0 On0 1zd0 On0 1zd0 TXu 1qMu WLu 1tAu WLu 1tAu TXu 1tAu Onu 1zcu Onu 1zcu Onu 1zcu Rbu 1zcu Onu 1zcu Onu 1zcu 11zu 1o0u 11zu 1o0u 11zu 1o0u 11zu 1qMu WLu 11Au 1nXu 1qMu 11zu 1o0u 11zu 1o0u 11zu 1qMu WLu 1qMu 11zu 1o0u WLu 1qMu 14nu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1fzu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1cMu 1cLu 1fAu 1cLu 1cMu 1cLu 1cMu|347",
		"Australia/Lindeman|AEST AEDT|-a0 -b0|010101010101010101010|-293lX xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 H1A0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0|10",
		"Australia/Melbourne|AEST AEDT|-a0 -b0|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101|-293lX xcX 10jd0 yL0 1cN0 1cL0 1fB0 19X0 17c10 LA0 1C00 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 U00 1qM0 WM0 1qM0 11A0 1tA0 U00 1tA0 U00 1tA0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 11A0 1o00 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 14o0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|39e5",
		"Australia/Perth|AWST AWDT|-80 -90|0101010101010101010|-293jX xcX 10jd0 yL0 1cN0 1cL0 1gSp0 Oo0 l5A0 Oo0 iJA0 G00 zU00 IM0 1qM0 11A0 1o00 11A0|18e5",
		"CET|CET CEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 16M0 1gMM0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|",
		"Pacific/Easter|EMT -07 -06 -05|7h.s 70 60 50|012121212121212121212121212123232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323|-1uSgG.w 1s4IG.w WL0 1zd0 On0 1ip0 11z0 1o10 11z0 1qN0 WL0 1ld0 14n0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 2pA0 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 1cL0 1cN0 11z0 1o10 11z0 1qN0 WL0 1fB0 19X0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1ip0 1fz0 1fB0 11z0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1o10 19X0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 46n0 Ap0 1Nb0 Ap0 1Nb0 Ap0 1zb0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1qL0 WN0 1qL0 11B0 1nX0 11B0|30e2",
		"CST6CDT|CST CDT CWT CPT|60 50 50 50|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261s0 1nX0 11B0 1nX0 SgN0 8x30 iw0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
		"EET|EET EEST|-20 -30|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|hDB0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|",
		"Europe/Dublin|DMT IST GMT BST IST|p.l -y.D 0 -10 -10|01232323232324242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242424242|-2ax9y.D Rc0 1fzy.D 14M0 1fc0 1g00 1co0 1dc0 1co0 1oo0 1400 1dc0 19A0 1io0 1io0 WM0 1o00 14o0 1o00 17c0 1io0 17c0 1fA0 1a00 1lc0 17c0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1cM0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1io0 1qM0 Dc0 g600 14o0 1wo0 17c0 1io0 11A0 1o00 17c0 1fA0 1a00 1fA0 1cM0 1fA0 1a00 17c0 1fA0 1a00 1io0 17c0 1lc0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1a00 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1tA0 IM0 90o0 U00 1tA0 U00 1tA0 U00 1tA0 U00 1tA0 WM0 1qM0 WM0 1qM0 WM0 1tA0 U00 1tA0 U00 1tA0 11z0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 14o0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5",
		"EST|EST|50|0||",
		"EST5EDT|EST EDT EWT EPT|50 40 40 40|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261t0 1nX0 11B0 1nX0 SgN0 8x40 iv0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
		"Etc/GMT-0|GMT|0|0||",
		"Etc/GMT-1|+01|-10|0||",
		"Pacific/Port_Moresby|+10|-a0|0||25e4",
		"Etc/GMT-11|+11|-b0|0||",
		"Pacific/Tarawa|+12|-c0|0||29e3",
		"Etc/GMT-13|+13|-d0|0||",
		"Etc/GMT-14|+14|-e0|0||",
		"Etc/GMT-2|+02|-20|0||",
		"Etc/GMT-3|+03|-30|0||",
		"Etc/GMT-4|+04|-40|0||",
		"Etc/GMT-5|+05|-50|0||",
		"Etc/GMT-6|+06|-60|0||",
		"Indian/Christmas|+07|-70|0||21e2",
		"Etc/GMT-8|+08|-80|0||",
		"Pacific/Palau|+09|-90|0||21e3",
		"Etc/GMT+1|-01|10|0||",
		"Etc/GMT+10|-10|a0|0||",
		"Etc/GMT+11|-11|b0|0||",
		"Etc/GMT+12|-12|c0|0||",
		"Etc/GMT+3|-03|30|0||",
		"Etc/GMT+4|-04|40|0||",
		"Etc/GMT+5|-05|50|0||",
		"Etc/GMT+6|-06|60|0||",
		"Etc/GMT+7|-07|70|0||",
		"Etc/GMT+8|-08|80|0||",
		"Etc/GMT+9|-09|90|0||",
		"Etc/UTC|UTC|0|0||",
		"Europe/Amsterdam|AMT NST +0120 +0020 CEST CET|-j.w -1j.w -1k -k -20 -10|010101010101010101010101010101010101010101012323234545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545|-2aFcj.w 11b0 1iP0 11A0 1io0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1co0 1io0 1yo0 Pc0 1a00 1fA0 1Bc0 Mo0 1tc0 Uo0 1tA0 U00 1uo0 W00 1s00 VA0 1so0 Vc0 1sM0 UM0 1wo0 Rc0 1u00 Wo0 1rA0 W00 1s00 VA0 1sM0 UM0 1w00 fV0 BCX.w 1tA0 U00 1u00 Wo0 1sm0 601k WM0 1fA0 1cM0 1cM0 1cM0 16M0 1gMM0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|16e5",
		"Europe/Andorra|WET CET CEST|0 -10 -20|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-UBA0 1xIN0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|79e3",
		"Europe/Astrakhan|LMT +03 +04 +05|-3c.c -30 -40 -50|012323232323232323212121212121212121212121212121212121212121212|-1Pcrc.c eUMc.c 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1fA0 1cM0 3Co0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3rd0|10e5",
		"Europe/Athens|AMT EET EEST CEST CET|-1y.Q -20 -30 -20 -10|012123434121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2a61x.Q CNbx.Q mn0 kU10 9b0 3Es0 Xa0 1fb0 1dd0 k3X0 Nz0 SCp0 1vc0 SO0 1cM0 1a00 1ao0 1fc0 1a10 1fG0 1cg0 1dX0 1bX0 1cQ0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|35e5",
		"Europe/London|GMT BST BDST|0 -10 -20|0101010101010101010101010101010101010101010101010121212121210101210101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2axa0 Rc0 1fA0 14M0 1fc0 1g00 1co0 1dc0 1co0 1oo0 1400 1dc0 19A0 1io0 1io0 WM0 1o00 14o0 1o00 17c0 1io0 17c0 1fA0 1a00 1lc0 17c0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1cM0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1io0 1qM0 Dc0 2Rz0 Dc0 1zc0 Oo0 1zc0 Rc0 1wo0 17c0 1iM0 FA0 xB0 1fA0 1a00 14o0 bb0 LA0 xB0 Rc0 1wo0 11A0 1o00 17c0 1fA0 1a00 1fA0 1cM0 1fA0 1a00 17c0 1fA0 1a00 1io0 17c0 1lc0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1a00 1qM0 WM0 1qM0 11A0 1o00 WM0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1tA0 IM0 90o0 U00 1tA0 U00 1tA0 U00 1tA0 U00 1tA0 WM0 1qM0 WM0 1qM0 WM0 1tA0 U00 1tA0 U00 1tA0 11z0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1o00 14o0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|10e6",
		"Europe/Belgrade|CET CEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-19RC0 3IP0 WM0 1fA0 1cM0 1cM0 1rc0 Qo0 1vmo0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5",
		"Europe/Berlin|CET CEST CEMT|-10 -20 -30|01010101010101210101210101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 kL0 Nc0 m10 WM0 1ao0 1cp0 dX0 jz0 Dd0 1io0 17c0 1fA0 1a00 1ehA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|41e5",
		"Europe/Prague|CET CEST GMT|-10 -20 0|01010101010101010201010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 1cM0 1qM0 11c0 mp0 xA0 mn0 17c0 1io0 17c0 1fc0 1ao0 1bNc0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|13e5",
		"Europe/Brussels|WET CET CEST WEST|0 -10 -20 -10|0121212103030303030303030303030303030303030303030303212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2ehc0 3zX0 11c0 1iO0 11A0 1o00 11A0 my0 Ic0 1qM0 Rc0 1EM0 UM0 1u00 10o0 1io0 1io0 17c0 1a00 1fA0 1cM0 1cM0 1io0 17c0 1fA0 1a00 1io0 1a30 1io0 17c0 1fA0 1a00 1io0 17c0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 y00 5Wn0 WM0 1fA0 1cM0 16M0 1iM0 16M0 1C00 Uo0 1eeo0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|21e5",
		"Europe/Bucharest|BMT EET EEST|-1I.o -20 -30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1xApI.o 20LI.o RA0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1Axc0 On0 1fA0 1a10 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cK0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cL0 1cN0 1cL0 1fB0 1nX0 11E0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|19e5",
		"Europe/Budapest|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1ip0 17b0 1op0 1tb0 Q2m0 3Ne0 WM0 1fA0 1cM0 1cM0 1oJ0 1dc0 1030 1fA0 1cM0 1cM0 1cM0 1cM0 1fA0 1a00 1iM0 1fA0 8Ha0 Rb0 1wN0 Rb0 1BB0 Lz0 1C20 LB0 SNX0 1a10 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|17e5",
		"Europe/Zurich|CET CEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-19Lc0 11A0 1o00 11A0 1xG10 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|38e4",
		"Europe/Chisinau|CMT BMT EET EEST CEST CET MSK MSD|-1T -1I.o -20 -30 -20 -10 -30 -40|012323232323232323234545467676767676767676767323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-26jdT wGMa.A 20LI.o RA0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 27A0 2en0 39g0 WM0 1fA0 1cM0 V90 1t7z0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 gL0 WO0 1cM0 1cM0 1cK0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1nX0 11D0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|67e4",
		"Europe/Copenhagen|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2azC0 Tz0 VuO0 60q0 WM0 1fA0 1cM0 1cM0 1cM0 S00 1HA0 Nc0 1C00 Dc0 1Nc0 Ao0 1h5A0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5",
		"Europe/Gibraltar|GMT BST BDST CET CEST|0 -10 -20 -10 -20|010101010101010101010101010101010101010101010101012121212121010121010101010101010101034343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343|-2axa0 Rc0 1fA0 14M0 1fc0 1g00 1co0 1dc0 1co0 1oo0 1400 1dc0 19A0 1io0 1io0 WM0 1o00 14o0 1o00 17c0 1io0 17c0 1fA0 1a00 1lc0 17c0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1cM0 1io0 17c0 1fA0 1a00 1io0 17c0 1io0 17c0 1fA0 1a00 1io0 1qM0 Dc0 2Rz0 Dc0 1zc0 Oo0 1zc0 Rc0 1wo0 17c0 1iM0 FA0 xB0 1fA0 1a00 14o0 bb0 LA0 xB0 Rc0 1wo0 11A0 1o00 17c0 1fA0 1a00 1fA0 1cM0 1fA0 1a00 17c0 1fA0 1a00 1io0 17c0 1lc0 17c0 1fA0 10Jz0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|30e3",
		"Europe/Helsinki|HMT EET EEST|-1D.N -20 -30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1WuND.N OULD.N 1dA0 1xGq0 1cM0 1cM0 1cM0 1cN0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5",
		"Europe/Kaliningrad|CET CEST EET EEST MSK MSD +03|-10 -20 -20 -30 -30 -40 -30|01010101010101232454545454545454543232323232323232323232323232323232323232323262|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 390 7A0 1en0 12N0 1pbb0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|44e4",
		"Europe/Kiev|KMT EET MSK CEST CET MSD EEST|-22.4 -20 -30 -20 -10 -40 -30|0123434252525252525252525256161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161|-1Pc22.4 eUo2.4 rnz0 2Hg0 WM0 1fA0 da0 1v4m0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 Db0 3220 1cK0 1cL0 1cN0 1cL0 1cN0 1cL0 1cQ0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|34e5",
		"Europe/Kirov|LMT +03 +04 +05|-3i.M -30 -40 -50|01232323232323232321212121212121212121212121212121212121212121|-22WM0 qH90 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1fA0 1cM0 3Co0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|48e4",
		"Europe/Lisbon|LMT WET WEST WEMT CET CEST|A.J 0 -10 -20 -10 -20|012121212121212121212121212121212121212121212321232123212321212121212121212121212121212121212121214121212121212121212121212121212124545454212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2le00 aPX0 Sp0 LX0 1vc0 Tc0 1uM0 SM0 1vc0 Tc0 1vc0 SM0 1vc0 6600 1co0 3E00 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 3I00 17c0 1cM0 1cM0 3Fc0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 1tA0 1cM0 1dc0 1400 gL0 IM0 s10 U00 dX0 Rc0 pd0 Rc0 gL0 Oo0 pd0 Rc0 gL0 Oo0 pd0 14o0 1cM0 1cP0 1cM0 1cM0 1cM0 1cM0 1cM0 3Co0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 pvy0 1cM0 1cM0 1fA0 1cM0 1cM0 1cN0 1cL0 1cN0 1cM0 1cM0 1cM0 1cM0 1cN0 1cL0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|27e5",
		"Europe/Luxembourg|LMT CET CEST WET WEST WEST WET|-o.A -10 -20 0 -10 -20 -10|0121212134343434343434343434343434343434343434343434565651212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2DG0o.A t6mo.A TB0 1nX0 Up0 1o20 11A0 rW0 CM0 1qP0 R90 1EO0 UK0 1u20 10m0 1ip0 1in0 17e0 19W0 1fB0 1db0 1cp0 1in0 17d0 1fz0 1a10 1in0 1a10 1in0 17f0 1fA0 1a00 1io0 17c0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 vA0 60L0 WM0 1fA0 1cM0 17c0 1io0 16M0 1C00 Uo0 1eeo0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|54e4",
		"Europe/Madrid|WET WEST WEMT CET CEST|0 -10 -20 -10 -20|010101010101010101210343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343|-25Td0 19B0 1cL0 1dd0 b1z0 18p0 3HX0 17d0 1fz0 1a10 1io0 1a00 1in0 17d0 iIn0 Hd0 1cL0 bb0 1200 2s20 14n0 5aL0 Mp0 1vz0 17d0 1in0 17d0 1in0 17d0 1in0 17d0 6hX0 11B0 XHX0 1a10 1fz0 1a10 19X0 1cN0 1fz0 1a10 1fC0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|62e5",
		"Europe/Malta|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2arB0 Lz0 1cN0 1db0 1410 1on0 Wp0 1qL0 17d0 1cL0 M3B0 5M20 WM0 1fA0 1co0 17c0 1iM0 16m0 1de0 1lc0 14m0 1lc0 WO0 1qM0 GTW0 On0 1C10 LA0 1C00 LA0 1EM0 LA0 1C00 LA0 1zc0 Oo0 1C00 Oo0 1co0 1cM0 1lA0 Xc0 1qq0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1iN0 19z0 1fB0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|42e4",
		"Europe/Minsk|MMT EET MSK CEST CET MSD EEST +03|-1O -20 -30 -20 -10 -40 -30 -30|01234343252525252525252525261616161616161616161616161616161616161617|-1Pc1O eUnO qNX0 3gQ0 WM0 1fA0 1cM0 Al0 1tsn0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 3Fc0 1cN0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0|19e5",
		"Europe/Monaco|PMT WET WEST WEMT CET CEST|-9.l 0 -10 -20 -10 -20|01212121212121212121212121212121212121212121212121232323232345454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-2nco9.l cNb9.l HA0 19A0 1iM0 11c0 1oo0 Wo0 1rc0 QM0 1EM0 UM0 1u00 10o0 1io0 1wo0 Rc0 1a00 1fA0 1cM0 1cM0 1io0 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 1fA0 1a00 1io0 17c0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Df0 2RV0 11z0 11B0 1ze0 WM0 1fA0 1cM0 1fa0 1aq0 16M0 1ekn0 1cL0 1fC0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|38e3",
		"Europe/Moscow|MMT MMT MST MDST MSD MSK +05 EET EEST MSK|-2u.h -2v.j -3v.j -4v.j -40 -30 -50 -20 -30 -40|012132345464575454545454545454545458754545454545454545454545454545454545454595|-2ag2u.h 2pyW.W 1bA0 11X0 GN0 1Hb0 c4v.j ik0 3DA0 dz0 15A0 c10 2q10 iM10 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cN0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|16e6",
		"Europe/Paris|PMT WET WEST CEST CET WEMT|-9.l 0 -10 -20 -10 -20|0121212121212121212121212121212121212121212121212123434352543434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434|-2nco8.l cNb8.l HA0 19A0 1iM0 11c0 1oo0 Wo0 1rc0 QM0 1EM0 UM0 1u00 10o0 1io0 1wo0 Rc0 1a00 1fA0 1cM0 1cM0 1io0 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 1fA0 1a00 1io0 17c0 1cM0 1cM0 1a00 1io0 1cM0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Df0 Ik0 5M30 WM0 1fA0 1cM0 Vx0 hB0 1aq0 16M0 1ekn0 1cL0 1fC0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|11e6",
		"Europe/Riga|RMT LST EET MSK CEST CET MSD EEST|-1A.y -2A.y -20 -30 -20 -10 -40 -30|010102345454536363636363636363727272727272727272727272727272727272727272727272727272727272727272727272727272727272727272727272|-25TzA.y 11A0 1iM0 ko0 gWm0 yDXA.y 2bX0 3fE0 WM0 1fA0 1cM0 1cM0 4m0 1sLy0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cN0 1o00 11A0 1o00 11A0 1qM0 3oo0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|64e4",
		"Europe/Rome|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2arB0 Lz0 1cN0 1db0 1410 1on0 Wp0 1qL0 17d0 1cL0 M3B0 5M20 WM0 1fA0 1cM0 16M0 1iM0 16m0 1de0 1lc0 14m0 1lc0 WO0 1qM0 GTW0 On0 1C10 LA0 1C00 LA0 1EM0 LA0 1C00 LA0 1zc0 Oo0 1C00 Oo0 1C00 LA0 1zc0 Oo0 1C00 LA0 1C00 LA0 1zc0 Oo0 1C00 Oo0 1zc0 Oo0 1fC0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|39e5",
		"Europe/Samara|LMT +03 +04 +05|-3k.k -30 -40 -50|0123232323232323232121232323232323232323232323232323232323212|-22WM0 qH90 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1fA0 2y10 14m0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 2sp0 WM0|12e5",
		"Europe/Saratov|LMT +03 +04 +05|-34.i -30 -40 -50|012323232323232321212121212121212121212121212121212121212121212|-22WM0 qH90 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1cM0 1cM0 1fA0 1cM0 3Co0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 5810|",
		"Europe/Simferopol|SMT EET MSK CEST CET MSD EEST MSK|-2g -20 -30 -20 -10 -40 -30 -40|012343432525252525252525252161616525252616161616161616161616161616161616172|-1Pc2g eUog rEn0 2qs0 WM0 1fA0 1cM0 3V0 1u0L0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1Q00 4eL0 1cL0 1cN0 1cL0 1cN0 dX0 WL0 1cN0 1cL0 1fB0 1o30 11B0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11z0 1nW0|33e4",
		"Europe/Sofia|EET CET CEST EEST|-20 -10 -20 -30|01212103030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030|-168L0 WM0 1fA0 1cM0 1cM0 1cN0 1mKH0 1dd0 1fb0 1ap0 1fb0 1a20 1fy0 1a30 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cK0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 1nX0 11E0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5",
		"Europe/Stockholm|CET CEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2azC0 TB0 2yDe0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|15e5",
		"Europe/Tallinn|TMT CET CEST EET MSK MSD EEST|-1D -10 -20 -20 -30 -40 -30|012103421212454545454545454546363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363|-26oND teD 11A0 1Ta0 4rXl KSLD 2FX0 2Jg0 WM0 1fA0 1cM0 18J0 1sTX0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o10 11A0 1qM0 5QM0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|41e4",
		"Europe/Tirane|LMT CET CEST|-1j.k -10 -20|01212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2glBj.k 14pcj.k 5LC0 WM0 4M0 1fCK0 10n0 1op0 11z0 1pd0 11z0 1qN0 WL0 1qp0 Xb0 1qp0 Xb0 1qp0 11z0 1lB0 11z0 1qN0 11z0 1iN0 16n0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|42e4",
		"Europe/Ulyanovsk|LMT +03 +04 +05 +02|-3d.A -30 -40 -50 -20|01232323232323232321214121212121212121212121212121212121212121212|-22WM0 qH90 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 3rd0|13e5",
		"Europe/Uzhgorod|CET CEST MSK MSD EET EEST|-10 -20 -30 -40 -20 -30|010101023232323232323232320454545454545454545454545454545454545454545454545454545454545454545454545454545454545454545454|-1cqL0 6i00 WM0 1fA0 1cM0 1ml0 1Cp0 1r3W0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1Q00 1Nf0 2pw0 1cL0 1cN0 1cL0 1cN0 1cL0 1cQ0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|11e4",
		"Europe/Vienna|CET CEST|-10 -20|0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 3KM0 14o0 LA00 6i00 WM0 1fA0 1cM0 1cM0 1cM0 400 2qM0 1ao0 1co0 1cM0 1io0 17c0 1gHa0 19X0 1cP0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|18e5",
		"Europe/Vilnius|WMT KMT CET EET MSK CEST MSD EEST|-1o -1z.A -10 -20 -30 -20 -40 -30|012324525254646464646464646473737373737373737352537373737373737373737373737373737373737373737373737373737373737373737373|-293do 6ILM.o 1Ooz.A zz0 Mfd0 29W0 3is0 WM0 1fA0 1cM0 LV0 1tgL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11B0 1o00 11A0 1qM0 8io0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|54e4",
		"Europe/Volgograd|LMT +03 +04 +05|-2V.E -30 -40 -50|012323232323232321212121212121212121212121212121212121212121212|-21IqV.E psLV.E 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 2pB0 1cM0 1cM0 1cM0 1fA0 1cM0 3Co0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0 9Jd0|10e5",
		"Europe/Warsaw|WMT CET CEST EET EEST|-1o -10 -20 -20 -30|012121234312121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2ctdo 1LXo 11d0 1iO0 11A0 1o00 11A0 1on0 11A0 6zy0 HWP0 5IM0 WM0 1fA0 1cM0 1dz0 1mL0 1en0 15B0 1aq0 1nA0 11A0 1io0 17c0 1fA0 1a00 iDX0 LA0 1cM0 1cM0 1C00 Oo0 1cM0 1cM0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1C00 LA0 uso0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cN0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|17e5",
		"Europe/Zaporozhye|+0220 EET MSK CEST CET MSD EEST|-2k -20 -30 -20 -10 -40 -30|01234342525252525252525252526161616161616161616161616161616161616161616161616161616161616161616161616161616161616161616161|-1Pc2k eUok rdb0 2RE0 WM0 1fA0 8m0 1v9a0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cK0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cQ0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|77e4",
		"HST|HST|a0|0||",
		"Indian/Chagos|LMT +05 +06|-4N.E -50 -60|012|-2xosN.E 3AGLN.E|30e2",
		"Indian/Cocos|+0630|-6u|0||596",
		"Indian/Kerguelen|-00 +05|0 -50|01|-MG00|130",
		"Indian/Mahe|LMT +04|-3F.M -40|01|-2yO3F.M|79e3",
		"Indian/Maldives|MMT +05|-4S -50|01|-olgS|35e4",
		"Indian/Mauritius|LMT +04 +05|-3O -40 -50|012121|-2xorO 34unO 14L0 12kr0 11z0|15e4",
		"Indian/Reunion|LMT +04|-3F.Q -40|01|-2mDDF.Q|84e4",
		"Pacific/Kwajalein|+11 +10 +09 -12 +12|-b0 -a0 -90 c0 -c0|012034|-1kln0 akp0 6Up0 12ry0 Wan0|14e3",
		"MET|MET MEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 16M0 1gMM0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|",
		"MST|MST|70|0||",
		"MST7MDT|MST MDT MWT MPT|70 60 60 60|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261r0 1nX0 11B0 1nX0 SgN0 8x20 ix0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
		"Pacific/Chatham|+1215 +1245 +1345|-cf -cJ -dJ|012121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212|-WqAf 1adef IM0 1C00 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Oo0 1zc0 Rc0 1zc0 Oo0 1qM0 14o0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1io0 17c0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1lc0 14o0 1lc0 14o0 1lc0 17c0 1io0 17c0 1io0 17c0 1io0 17c0 1io0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00|600",
		"Pacific/Apia|LMT -1130 -11 -10 +14 +13|bq.U bu b0 a0 -e0 -d0|01232345454545454545454545454545454545454545454545454545454|-2nDMx.4 1yW03.4 2rRbu 1ff0 1a00 CI0 AQ0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1io0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1a00 1fA0 1cM0 1fA0 1a00 1fA0 1a00|37e3",
		"Pacific/Bougainville|+10 +09 +11|-a0 -90 -b0|0102|-16Wy0 7CN0 2MQp0|18e4",
		"Pacific/Chuuk|+10 +09|-a0 -90|01010|-2ewy0 axB0 RVX0 axd0|49e3",
		"Pacific/Efate|LMT +11 +12|-bd.g -b0 -c0|0121212121212121212121|-2l9nd.g 2Szcd.g 1cL0 1oN0 10L0 1fB0 19X0 1fB0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1fB0 Lz0 1Nd0 An0|66e3",
		"Pacific/Enderbury|-12 -11 +13|c0 b0 -d0|012|nIc0 B7X0|1",
		"Pacific/Fakaofo|-11 +13|b0 -d0|01|1Gfn0|483",
		"Pacific/Fiji|LMT +12 +13|-bT.I -c0 -d0|0121212121212121212121212121212121212121212121212121212121212121|-2bUzT.I 3m8NT.I LA0 1EM0 IM0 nJc0 LA0 1o00 Rc0 1wo0 Ao0 1Nc0 Ao0 1Q00 xz0 1SN0 uM0 1SM0 uM0 1VA0 s00 1VA0 s00 1VA0 s00 20o0 pc0 20o0 s00 20o0 pc0 20o0 pc0 20o0 pc0 20o0 pc0 20o0 s00 1VA0 s00 20o0 pc0 20o0 pc0 20o0 pc0 20o0 pc0 20o0 s00 20o0 pc0 20o0 pc0 20o0 pc0 20o0 pc0 20o0 s00 1VA0 s00|88e4",
		"Pacific/Galapagos|LMT -05 -06|5W.o 50 60|01212|-1yVS1.A 2dTz1.A gNd0 rz0|25e3",
		"Pacific/Gambier|LMT -09|8X.M 90|01|-2jof0.c|125",
		"Pacific/Guadalcanal|LMT +11|-aD.M -b0|01|-2joyD.M|11e4",
		"Pacific/Guam|GST +09 GDT ChST|-a0 -90 -b0 -a0|01020202020202020203|-18jK0 6pB0 AhB0 3QL0 g2p0 3p91 WOX rX0 1zd0 Rb0 1wp0 Rb0 5xd0 rX0 5sN0 zb1 1C0X On0 ULb0|17e4",
		"Pacific/Honolulu|HST HDT HWT HPT HST|au 9u 9u 9u a0|0102304|-1thLu 8x0 lef0 8wWu iAu 46p0|37e4",
		"Pacific/Kiritimati|-1040 -10 +14|aE a0 -e0|012|nIaE B7Xk|51e2",
		"Pacific/Kosrae|+11 +09 +10 +12|-b0 -90 -a0 -c0|01021030|-2ewz0 axC0 HBy0 akp0 axd0 WOK0 1bdz0|66e2",
		"Pacific/Majuro|+11 +09 +10 +12|-b0 -90 -a0 -c0|0102103|-2ewz0 axC0 HBy0 akp0 6RB0 12um0|28e3",
		"Pacific/Marquesas|LMT -0930|9i 9u|01|-2joeG|86e2",
		"Pacific/Pago_Pago|LMT SST|bm.M b0|01|-2nDMB.c|37e2",
		"Pacific/Nauru|LMT +1130 +09 +12|-b7.E -bu -90 -c0|01213|-1Xdn7.E QCnB.E 7mqu 1lnbu|10e3",
		"Pacific/Niue|-1120 -1130 -11|bk bu b0|012|-KfME 17y0a|12e2",
		"Pacific/Norfolk|+1112 +1130 +1230 +11 +12|-bc -bu -cu -b0 -c0|012134343434343434343434343434343434343434|-Kgbc W01G Oo0 1COo0 9Jcu 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0|25e4",
		"Pacific/Noumea|LMT +11 +12|-b5.M -b0 -c0|01212121|-2l9n5.M 2EqM5.M xX0 1PB0 yn0 HeP0 Ao0|98e3",
		"Pacific/Pitcairn|-0830 -08|8u 80|01|18Vku|56",
		"Pacific/Pohnpei|+11 +09 +10|-b0 -90 -a0|010210|-2ewz0 axC0 HBy0 akp0 axd0|34e3",
		"Pacific/Rarotonga|-1030 -0930 -10|au 9u a0|012121212121212121212121212|lyWu IL0 1zcu Onu 1zcu Onu 1zcu Rbu 1zcu Onu 1zcu Onu 1zcu Onu 1zcu Onu 1zcu Onu 1zcu Rbu 1zcu Onu 1zcu Onu 1zcu Onu|13e3",
		"Pacific/Tahiti|LMT -10|9W.g a0|01|-2joe1.I|18e4",
		"Pacific/Tongatapu|+1220 +13 +14|-ck -d0 -e0|0121212121|-1aB0k 2n5dk 15A0 1wo0 xz0 1Q10 xz0 zWN0 s00|75e3",
		"PST8PDT|PST PDT PWT PPT|80 70 70 70|010102301010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-261q0 1nX0 11B0 1nX0 SgN0 8x10 iy0 QwN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|",
		"WET|WET WEST|0 -10|010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|hDB0 1a00 1fA0 1cM0 1cM0 1cM0 1fA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|"
	];
	var links = [
		"Africa/Abidjan|Africa/Bamako",
		"Africa/Abidjan|Africa/Banjul",
		"Africa/Abidjan|Africa/Conakry",
		"Africa/Abidjan|Africa/Dakar",
		"Africa/Abidjan|Africa/Freetown",
		"Africa/Abidjan|Africa/Lome",
		"Africa/Abidjan|Africa/Nouakchott",
		"Africa/Abidjan|Africa/Ouagadougou",
		"Africa/Abidjan|Africa/Timbuktu",
		"Africa/Abidjan|Atlantic/St_Helena",
		"Africa/Cairo|Egypt",
		"Africa/Johannesburg|Africa/Maseru",
		"Africa/Johannesburg|Africa/Mbabane",
		"Africa/Lagos|Africa/Bangui",
		"Africa/Lagos|Africa/Brazzaville",
		"Africa/Lagos|Africa/Douala",
		"Africa/Lagos|Africa/Kinshasa",
		"Africa/Lagos|Africa/Libreville",
		"Africa/Lagos|Africa/Luanda",
		"Africa/Lagos|Africa/Malabo",
		"Africa/Lagos|Africa/Niamey",
		"Africa/Lagos|Africa/Porto-Novo",
		"Africa/Maputo|Africa/Blantyre",
		"Africa/Maputo|Africa/Bujumbura",
		"Africa/Maputo|Africa/Gaborone",
		"Africa/Maputo|Africa/Harare",
		"Africa/Maputo|Africa/Kigali",
		"Africa/Maputo|Africa/Lubumbashi",
		"Africa/Maputo|Africa/Lusaka",
		"Africa/Nairobi|Africa/Addis_Ababa",
		"Africa/Nairobi|Africa/Asmara",
		"Africa/Nairobi|Africa/Asmera",
		"Africa/Nairobi|Africa/Dar_es_Salaam",
		"Africa/Nairobi|Africa/Djibouti",
		"Africa/Nairobi|Africa/Kampala",
		"Africa/Nairobi|Africa/Mogadishu",
		"Africa/Nairobi|Indian/Antananarivo",
		"Africa/Nairobi|Indian/Comoro",
		"Africa/Nairobi|Indian/Mayotte",
		"Africa/Tripoli|Libya",
		"America/Adak|America/Atka",
		"America/Adak|US/Aleutian",
		"America/Anchorage|US/Alaska",
		"America/Argentina/Buenos_Aires|America/Buenos_Aires",
		"America/Argentina/Catamarca|America/Argentina/ComodRivadavia",
		"America/Argentina/Catamarca|America/Catamarca",
		"America/Argentina/Cordoba|America/Cordoba",
		"America/Argentina/Cordoba|America/Rosario",
		"America/Argentina/Jujuy|America/Jujuy",
		"America/Argentina/Mendoza|America/Mendoza",
		"America/Atikokan|America/Coral_Harbour",
		"America/Chicago|US/Central",
		"America/Curacao|America/Aruba",
		"America/Curacao|America/Kralendijk",
		"America/Curacao|America/Lower_Princes",
		"America/Denver|America/Shiprock",
		"America/Denver|Navajo",
		"America/Denver|US/Mountain",
		"America/Detroit|US/Michigan",
		"America/Edmonton|Canada/Mountain",
		"America/Fort_Wayne|America/Indiana/Indianapolis",
		"America/Fort_Wayne|America/Indianapolis",
		"America/Fort_Wayne|US/East-Indiana",
		"America/Godthab|America/Nuuk",
		"America/Halifax|Canada/Atlantic",
		"America/Havana|Cuba",
		"America/Indiana/Knox|America/Knox_IN",
		"America/Indiana/Knox|US/Indiana-Starke",
		"America/Jamaica|Jamaica",
		"America/Kentucky/Louisville|America/Louisville",
		"America/Los_Angeles|US/Pacific",
		"America/Los_Angeles|US/Pacific-New",
		"America/Manaus|Brazil/West",
		"America/Mazatlan|Mexico/BajaSur",
		"America/Mexico_City|Mexico/General",
		"America/New_York|US/Eastern",
		"America/Noronha|Brazil/DeNoronha",
		"America/Panama|America/Cayman",
		"America/Phoenix|US/Arizona",
		"America/Port_of_Spain|America/Anguilla",
		"America/Port_of_Spain|America/Antigua",
		"America/Port_of_Spain|America/Dominica",
		"America/Port_of_Spain|America/Grenada",
		"America/Port_of_Spain|America/Guadeloupe",
		"America/Port_of_Spain|America/Marigot",
		"America/Port_of_Spain|America/Montserrat",
		"America/Port_of_Spain|America/St_Barthelemy",
		"America/Port_of_Spain|America/St_Kitts",
		"America/Port_of_Spain|America/St_Lucia",
		"America/Port_of_Spain|America/St_Thomas",
		"America/Port_of_Spain|America/St_Vincent",
		"America/Port_of_Spain|America/Tortola",
		"America/Port_of_Spain|America/Virgin",
		"America/Regina|Canada/Saskatchewan",
		"America/Rio_Branco|America/Porto_Acre",
		"America/Rio_Branco|Brazil/Acre",
		"America/Santiago|Chile/Continental",
		"America/Sao_Paulo|Brazil/East",
		"America/St_Johns|Canada/Newfoundland",
		"America/Tijuana|America/Ensenada",
		"America/Tijuana|America/Santa_Isabel",
		"America/Tijuana|Mexico/BajaNorte",
		"America/Toronto|America/Montreal",
		"America/Toronto|Canada/Eastern",
		"America/Vancouver|Canada/Pacific",
		"America/Whitehorse|Canada/Yukon",
		"America/Winnipeg|Canada/Central",
		"Asia/Ashgabat|Asia/Ashkhabad",
		"Asia/Bangkok|Asia/Phnom_Penh",
		"Asia/Bangkok|Asia/Vientiane",
		"Asia/Dhaka|Asia/Dacca",
		"Asia/Dubai|Asia/Muscat",
		"Asia/Ho_Chi_Minh|Asia/Saigon",
		"Asia/Hong_Kong|Hongkong",
		"Asia/Jerusalem|Asia/Tel_Aviv",
		"Asia/Jerusalem|Israel",
		"Asia/Kathmandu|Asia/Katmandu",
		"Asia/Kolkata|Asia/Calcutta",
		"Asia/Kuala_Lumpur|Asia/Singapore",
		"Asia/Kuala_Lumpur|Singapore",
		"Asia/Macau|Asia/Macao",
		"Asia/Makassar|Asia/Ujung_Pandang",
		"Asia/Nicosia|Europe/Nicosia",
		"Asia/Qatar|Asia/Bahrain",
		"Asia/Rangoon|Asia/Yangon",
		"Asia/Riyadh|Asia/Aden",
		"Asia/Riyadh|Asia/Kuwait",
		"Asia/Seoul|ROK",
		"Asia/Shanghai|Asia/Chongqing",
		"Asia/Shanghai|Asia/Chungking",
		"Asia/Shanghai|Asia/Harbin",
		"Asia/Shanghai|PRC",
		"Asia/Taipei|ROC",
		"Asia/Tehran|Iran",
		"Asia/Thimphu|Asia/Thimbu",
		"Asia/Tokyo|Japan",
		"Asia/Ulaanbaatar|Asia/Ulan_Bator",
		"Asia/Urumqi|Asia/Kashgar",
		"Atlantic/Faroe|Atlantic/Faeroe",
		"Atlantic/Reykjavik|Iceland",
		"Atlantic/South_Georgia|Etc/GMT+2",
		"Australia/Adelaide|Australia/South",
		"Australia/Brisbane|Australia/Queensland",
		"Australia/Broken_Hill|Australia/Yancowinna",
		"Australia/Darwin|Australia/North",
		"Australia/Hobart|Australia/Tasmania",
		"Australia/Lord_Howe|Australia/LHI",
		"Australia/Melbourne|Australia/Victoria",
		"Australia/Perth|Australia/West",
		"Australia/Sydney|Australia/ACT",
		"Australia/Sydney|Australia/Canberra",
		"Australia/Sydney|Australia/NSW",
		"Etc/GMT-0|Etc/GMT",
		"Etc/GMT-0|Etc/GMT+0",
		"Etc/GMT-0|Etc/GMT0",
		"Etc/GMT-0|Etc/Greenwich",
		"Etc/GMT-0|GMT",
		"Etc/GMT-0|GMT+0",
		"Etc/GMT-0|GMT-0",
		"Etc/GMT-0|GMT0",
		"Etc/GMT-0|Greenwich",
		"Etc/UTC|Etc/UCT",
		"Etc/UTC|Etc/Universal",
		"Etc/UTC|Etc/Zulu",
		"Etc/UTC|UCT",
		"Etc/UTC|UTC",
		"Etc/UTC|Universal",
		"Etc/UTC|Zulu",
		"Europe/Belgrade|Europe/Ljubljana",
		"Europe/Belgrade|Europe/Podgorica",
		"Europe/Belgrade|Europe/Sarajevo",
		"Europe/Belgrade|Europe/Skopje",
		"Europe/Belgrade|Europe/Zagreb",
		"Europe/Chisinau|Europe/Tiraspol",
		"Europe/Dublin|Eire",
		"Europe/Helsinki|Europe/Mariehamn",
		"Europe/Istanbul|Asia/Istanbul",
		"Europe/Istanbul|Turkey",
		"Europe/Lisbon|Portugal",
		"Europe/London|Europe/Belfast",
		"Europe/London|Europe/Guernsey",
		"Europe/London|Europe/Isle_of_Man",
		"Europe/London|Europe/Jersey",
		"Europe/London|GB",
		"Europe/London|GB-Eire",
		"Europe/Moscow|W-SU",
		"Europe/Oslo|Arctic/Longyearbyen",
		"Europe/Oslo|Atlantic/Jan_Mayen",
		"Europe/Prague|Europe/Bratislava",
		"Europe/Rome|Europe/San_Marino",
		"Europe/Rome|Europe/Vatican",
		"Europe/Warsaw|Poland",
		"Europe/Zurich|Europe/Busingen",
		"Europe/Zurich|Europe/Vaduz",
		"Indian/Christmas|Etc/GMT-7",
		"Pacific/Auckland|Antarctica/McMurdo",
		"Pacific/Auckland|Antarctica/South_Pole",
		"Pacific/Auckland|NZ",
		"Pacific/Chatham|NZ-CHAT",
		"Pacific/Chuuk|Pacific/Truk",
		"Pacific/Chuuk|Pacific/Yap",
		"Pacific/Easter|Chile/EasterIsland",
		"Pacific/Guam|Pacific/Saipan",
		"Pacific/Honolulu|Pacific/Johnston",
		"Pacific/Honolulu|US/Hawaii",
		"Pacific/Kwajalein|Kwajalein",
		"Pacific/Pago_Pago|Pacific/Midway",
		"Pacific/Pago_Pago|Pacific/Samoa",
		"Pacific/Pago_Pago|US/Samoa",
		"Pacific/Palau|Etc/GMT-9",
		"Pacific/Pohnpei|Pacific/Ponape",
		"Pacific/Port_Moresby|Etc/GMT-10",
		"Pacific/Tarawa|Etc/GMT-12",
		"Pacific/Tarawa|Pacific/Funafuti",
		"Pacific/Tarawa|Pacific/Wake",
		"Pacific/Tarawa|Pacific/Wallis"
	];
	var countries = [
		"AD|Europe/Andorra",
		"AE|Asia/Dubai",
		"AF|Asia/Kabul",
		"AG|America/Port_of_Spain America/Antigua",
		"AI|America/Port_of_Spain America/Anguilla",
		"AL|Europe/Tirane",
		"AM|Asia/Yerevan",
		"AO|Africa/Lagos Africa/Luanda",
		"AQ|Antarctica/Casey Antarctica/Davis Antarctica/DumontDUrville Antarctica/Mawson Antarctica/Palmer Antarctica/Rothera Antarctica/Syowa Antarctica/Troll Antarctica/Vostok Pacific/Auckland Antarctica/McMurdo",
		"AR|America/Argentina/Buenos_Aires America/Argentina/Cordoba America/Argentina/Salta America/Argentina/Jujuy America/Argentina/Tucuman America/Argentina/Catamarca America/Argentina/La_Rioja America/Argentina/San_Juan America/Argentina/Mendoza America/Argentina/San_Luis America/Argentina/Rio_Gallegos America/Argentina/Ushuaia",
		"AS|Pacific/Pago_Pago",
		"AT|Europe/Vienna",
		"AU|Australia/Lord_Howe Antarctica/Macquarie Australia/Hobart Australia/Currie Australia/Melbourne Australia/Sydney Australia/Broken_Hill Australia/Brisbane Australia/Lindeman Australia/Adelaide Australia/Darwin Australia/Perth Australia/Eucla",
		"AW|America/Curacao America/Aruba",
		"AX|Europe/Helsinki Europe/Mariehamn",
		"AZ|Asia/Baku",
		"BA|Europe/Belgrade Europe/Sarajevo",
		"BB|America/Barbados",
		"BD|Asia/Dhaka",
		"BE|Europe/Brussels",
		"BF|Africa/Abidjan Africa/Ouagadougou",
		"BG|Europe/Sofia",
		"BH|Asia/Qatar Asia/Bahrain",
		"BI|Africa/Maputo Africa/Bujumbura",
		"BJ|Africa/Lagos Africa/Porto-Novo",
		"BL|America/Port_of_Spain America/St_Barthelemy",
		"BM|Atlantic/Bermuda",
		"BN|Asia/Brunei",
		"BO|America/La_Paz",
		"BQ|America/Curacao America/Kralendijk",
		"BR|America/Noronha America/Belem America/Fortaleza America/Recife America/Araguaina America/Maceio America/Bahia America/Sao_Paulo America/Campo_Grande America/Cuiaba America/Santarem America/Porto_Velho America/Boa_Vista America/Manaus America/Eirunepe America/Rio_Branco",
		"BS|America/Nassau",
		"BT|Asia/Thimphu",
		"BW|Africa/Maputo Africa/Gaborone",
		"BY|Europe/Minsk",
		"BZ|America/Belize",
		"CA|America/St_Johns America/Halifax America/Glace_Bay America/Moncton America/Goose_Bay America/Blanc-Sablon America/Toronto America/Nipigon America/Thunder_Bay America/Iqaluit America/Pangnirtung America/Atikokan America/Winnipeg America/Rainy_River America/Resolute America/Rankin_Inlet America/Regina America/Swift_Current America/Edmonton America/Cambridge_Bay America/Yellowknife America/Inuvik America/Creston America/Dawson_Creek America/Fort_Nelson America/Vancouver America/Whitehorse America/Dawson",
		"CC|Indian/Cocos",
		"CD|Africa/Maputo Africa/Lagos Africa/Kinshasa Africa/Lubumbashi",
		"CF|Africa/Lagos Africa/Bangui",
		"CG|Africa/Lagos Africa/Brazzaville",
		"CH|Europe/Zurich",
		"CI|Africa/Abidjan",
		"CK|Pacific/Rarotonga",
		"CL|America/Santiago America/Punta_Arenas Pacific/Easter",
		"CM|Africa/Lagos Africa/Douala",
		"CN|Asia/Shanghai Asia/Urumqi",
		"CO|America/Bogota",
		"CR|America/Costa_Rica",
		"CU|America/Havana",
		"CV|Atlantic/Cape_Verde",
		"CW|America/Curacao",
		"CX|Indian/Christmas",
		"CY|Asia/Nicosia Asia/Famagusta",
		"CZ|Europe/Prague",
		"DE|Europe/Zurich Europe/Berlin Europe/Busingen",
		"DJ|Africa/Nairobi Africa/Djibouti",
		"DK|Europe/Copenhagen",
		"DM|America/Port_of_Spain America/Dominica",
		"DO|America/Santo_Domingo",
		"DZ|Africa/Algiers",
		"EC|America/Guayaquil Pacific/Galapagos",
		"EE|Europe/Tallinn",
		"EG|Africa/Cairo",
		"EH|Africa/El_Aaiun",
		"ER|Africa/Nairobi Africa/Asmara",
		"ES|Europe/Madrid Africa/Ceuta Atlantic/Canary",
		"ET|Africa/Nairobi Africa/Addis_Ababa",
		"FI|Europe/Helsinki",
		"FJ|Pacific/Fiji",
		"FK|Atlantic/Stanley",
		"FM|Pacific/Chuuk Pacific/Pohnpei Pacific/Kosrae",
		"FO|Atlantic/Faroe",
		"FR|Europe/Paris",
		"GA|Africa/Lagos Africa/Libreville",
		"GB|Europe/London",
		"GD|America/Port_of_Spain America/Grenada",
		"GE|Asia/Tbilisi",
		"GF|America/Cayenne",
		"GG|Europe/London Europe/Guernsey",
		"GH|Africa/Accra",
		"GI|Europe/Gibraltar",
		"GL|America/Nuuk America/Danmarkshavn America/Scoresbysund America/Thule",
		"GM|Africa/Abidjan Africa/Banjul",
		"GN|Africa/Abidjan Africa/Conakry",
		"GP|America/Port_of_Spain America/Guadeloupe",
		"GQ|Africa/Lagos Africa/Malabo",
		"GR|Europe/Athens",
		"GS|Atlantic/South_Georgia",
		"GT|America/Guatemala",
		"GU|Pacific/Guam",
		"GW|Africa/Bissau",
		"GY|America/Guyana",
		"HK|Asia/Hong_Kong",
		"HN|America/Tegucigalpa",
		"HR|Europe/Belgrade Europe/Zagreb",
		"HT|America/Port-au-Prince",
		"HU|Europe/Budapest",
		"ID|Asia/Jakarta Asia/Pontianak Asia/Makassar Asia/Jayapura",
		"IE|Europe/Dublin",
		"IL|Asia/Jerusalem",
		"IM|Europe/London Europe/Isle_of_Man",
		"IN|Asia/Kolkata",
		"IO|Indian/Chagos",
		"IQ|Asia/Baghdad",
		"IR|Asia/Tehran",
		"IS|Atlantic/Reykjavik",
		"IT|Europe/Rome",
		"JE|Europe/London Europe/Jersey",
		"JM|America/Jamaica",
		"JO|Asia/Amman",
		"JP|Asia/Tokyo",
		"KE|Africa/Nairobi",
		"KG|Asia/Bishkek",
		"KH|Asia/Bangkok Asia/Phnom_Penh",
		"KI|Pacific/Tarawa Pacific/Enderbury Pacific/Kiritimati",
		"KM|Africa/Nairobi Indian/Comoro",
		"KN|America/Port_of_Spain America/St_Kitts",
		"KP|Asia/Pyongyang",
		"KR|Asia/Seoul",
		"KW|Asia/Riyadh Asia/Kuwait",
		"KY|America/Panama America/Cayman",
		"KZ|Asia/Almaty Asia/Qyzylorda Asia/Qostanay Asia/Aqtobe Asia/Aqtau Asia/Atyrau Asia/Oral",
		"LA|Asia/Bangkok Asia/Vientiane",
		"LB|Asia/Beirut",
		"LC|America/Port_of_Spain America/St_Lucia",
		"LI|Europe/Zurich Europe/Vaduz",
		"LK|Asia/Colombo",
		"LR|Africa/Monrovia",
		"LS|Africa/Johannesburg Africa/Maseru",
		"LT|Europe/Vilnius",
		"LU|Europe/Luxembourg",
		"LV|Europe/Riga",
		"LY|Africa/Tripoli",
		"MA|Africa/Casablanca",
		"MC|Europe/Monaco",
		"MD|Europe/Chisinau",
		"ME|Europe/Belgrade Europe/Podgorica",
		"MF|America/Port_of_Spain America/Marigot",
		"MG|Africa/Nairobi Indian/Antananarivo",
		"MH|Pacific/Majuro Pacific/Kwajalein",
		"MK|Europe/Belgrade Europe/Skopje",
		"ML|Africa/Abidjan Africa/Bamako",
		"MM|Asia/Yangon",
		"MN|Asia/Ulaanbaatar Asia/Hovd Asia/Choibalsan",
		"MO|Asia/Macau",
		"MP|Pacific/Guam Pacific/Saipan",
		"MQ|America/Martinique",
		"MR|Africa/Abidjan Africa/Nouakchott",
		"MS|America/Port_of_Spain America/Montserrat",
		"MT|Europe/Malta",
		"MU|Indian/Mauritius",
		"MV|Indian/Maldives",
		"MW|Africa/Maputo Africa/Blantyre",
		"MX|America/Mexico_City America/Cancun America/Merida America/Monterrey America/Matamoros America/Mazatlan America/Chihuahua America/Ojinaga America/Hermosillo America/Tijuana America/Bahia_Banderas",
		"MY|Asia/Kuala_Lumpur Asia/Kuching",
		"MZ|Africa/Maputo",
		"NA|Africa/Windhoek",
		"NC|Pacific/Noumea",
		"NE|Africa/Lagos Africa/Niamey",
		"NF|Pacific/Norfolk",
		"NG|Africa/Lagos",
		"NI|America/Managua",
		"NL|Europe/Amsterdam",
		"NO|Europe/Oslo",
		"NP|Asia/Kathmandu",
		"NR|Pacific/Nauru",
		"NU|Pacific/Niue",
		"NZ|Pacific/Auckland Pacific/Chatham",
		"OM|Asia/Dubai Asia/Muscat",
		"PA|America/Panama",
		"PE|America/Lima",
		"PF|Pacific/Tahiti Pacific/Marquesas Pacific/Gambier",
		"PG|Pacific/Port_Moresby Pacific/Bougainville",
		"PH|Asia/Manila",
		"PK|Asia/Karachi",
		"PL|Europe/Warsaw",
		"PM|America/Miquelon",
		"PN|Pacific/Pitcairn",
		"PR|America/Puerto_Rico",
		"PS|Asia/Gaza Asia/Hebron",
		"PT|Europe/Lisbon Atlantic/Madeira Atlantic/Azores",
		"PW|Pacific/Palau",
		"PY|America/Asuncion",
		"QA|Asia/Qatar",
		"RE|Indian/Reunion",
		"RO|Europe/Bucharest",
		"RS|Europe/Belgrade",
		"RU|Europe/Kaliningrad Europe/Moscow Europe/Simferopol Europe/Kirov Europe/Astrakhan Europe/Volgograd Europe/Saratov Europe/Ulyanovsk Europe/Samara Asia/Yekaterinburg Asia/Omsk Asia/Novosibirsk Asia/Barnaul Asia/Tomsk Asia/Novokuznetsk Asia/Krasnoyarsk Asia/Irkutsk Asia/Chita Asia/Yakutsk Asia/Khandyga Asia/Vladivostok Asia/Ust-Nera Asia/Magadan Asia/Sakhalin Asia/Srednekolymsk Asia/Kamchatka Asia/Anadyr",
		"RW|Africa/Maputo Africa/Kigali",
		"SA|Asia/Riyadh",
		"SB|Pacific/Guadalcanal",
		"SC|Indian/Mahe",
		"SD|Africa/Khartoum",
		"SE|Europe/Stockholm",
		"SG|Asia/Singapore",
		"SH|Africa/Abidjan Atlantic/St_Helena",
		"SI|Europe/Belgrade Europe/Ljubljana",
		"SJ|Europe/Oslo Arctic/Longyearbyen",
		"SK|Europe/Prague Europe/Bratislava",
		"SL|Africa/Abidjan Africa/Freetown",
		"SM|Europe/Rome Europe/San_Marino",
		"SN|Africa/Abidjan Africa/Dakar",
		"SO|Africa/Nairobi Africa/Mogadishu",
		"SR|America/Paramaribo",
		"SS|Africa/Juba",
		"ST|Africa/Sao_Tome",
		"SV|America/El_Salvador",
		"SX|America/Curacao America/Lower_Princes",
		"SY|Asia/Damascus",
		"SZ|Africa/Johannesburg Africa/Mbabane",
		"TC|America/Grand_Turk",
		"TD|Africa/Ndjamena",
		"TF|Indian/Reunion Indian/Kerguelen",
		"TG|Africa/Abidjan Africa/Lome",
		"TH|Asia/Bangkok",
		"TJ|Asia/Dushanbe",
		"TK|Pacific/Fakaofo",
		"TL|Asia/Dili",
		"TM|Asia/Ashgabat",
		"TN|Africa/Tunis",
		"TO|Pacific/Tongatapu",
		"TR|Europe/Istanbul",
		"TT|America/Port_of_Spain",
		"TV|Pacific/Funafuti",
		"TW|Asia/Taipei",
		"TZ|Africa/Nairobi Africa/Dar_es_Salaam",
		"UA|Europe/Simferopol Europe/Kiev Europe/Uzhgorod Europe/Zaporozhye",
		"UG|Africa/Nairobi Africa/Kampala",
		"UM|Pacific/Pago_Pago Pacific/Wake Pacific/Honolulu Pacific/Midway",
		"US|America/New_York America/Detroit America/Kentucky/Louisville America/Kentucky/Monticello America/Indiana/Indianapolis America/Indiana/Vincennes America/Indiana/Winamac America/Indiana/Marengo America/Indiana/Petersburg America/Indiana/Vevay America/Chicago America/Indiana/Tell_City America/Indiana/Knox America/Menominee America/North_Dakota/Center America/North_Dakota/New_Salem America/North_Dakota/Beulah America/Denver America/Boise America/Phoenix America/Los_Angeles America/Anchorage America/Juneau America/Sitka America/Metlakatla America/Yakutat America/Nome America/Adak Pacific/Honolulu",
		"UY|America/Montevideo",
		"UZ|Asia/Samarkand Asia/Tashkent",
		"VA|Europe/Rome Europe/Vatican",
		"VC|America/Port_of_Spain America/St_Vincent",
		"VE|America/Caracas",
		"VG|America/Port_of_Spain America/Tortola",
		"VI|America/Port_of_Spain America/St_Thomas",
		"VN|Asia/Bangkok Asia/Ho_Chi_Minh",
		"VU|Pacific/Efate",
		"WF|Pacific/Wallis",
		"WS|Pacific/Apia",
		"YE|Asia/Riyadh Asia/Aden",
		"YT|Africa/Nairobi Indian/Mayotte",
		"ZA|Africa/Johannesburg",
		"ZM|Africa/Maputo Africa/Lusaka",
		"ZW|Africa/Maputo Africa/Harare"
	];
	var latest = {
		version: version,
		zones: zones,
		links: links,
		countries: countries
	};

	var latest$1 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		version: version,
		zones: zones,
		links: links,
		countries: countries,
		'default': latest
	});

	var require$$1 = getCjsExportFromNamespace(latest$1);

	var momentTimezone$1 = createCommonjsModule(function (module) {
	var moment = module.exports = momentTimezone;
	moment.tz.load(require$$1);
	});

	CronDate.prototype.addYear = function() {
	  this._date.add(1, 'year');
	};

	CronDate.prototype.addMonth = function() {
	  this._date.add(1, 'month').startOf('month');
	};

	CronDate.prototype.addDay = function() {
	  this._date.add(1, 'day').startOf('day');
	};

	CronDate.prototype.addHour = function() {
	  var prev = this.getTime();
	  this._date.add(1, 'hour').startOf('hour');
	  if (this.getTime() <= prev) {
	    this._date.add(1, 'hour');
	  }
	};

	CronDate.prototype.addMinute = function() {
	  var prev = this.getTime();
	  this._date.add(1, 'minute').startOf('minute');
	  if (this.getTime() < prev) {
	    this._date.add(1, 'hour');
	  }
	};

	CronDate.prototype.addSecond = function() {
	  var prev = this.getTime();
	  this._date.add(1, 'second').startOf('second');
	  if (this.getTime() < prev) {
	    this._date.add(1, 'hour');
	  }
	};

	CronDate.prototype.subtractYear = function() {
	  this._date.subtract(1, 'year');
	};

	CronDate.prototype.subtractMonth = function() {
	  this._date.subtract(1, 'month').endOf('month');
	};

	CronDate.prototype.subtractDay = function() {
	  this._date.subtract(1, 'day').endOf('day');
	};

	CronDate.prototype.subtractHour = function() {
	  var prev = this.getTime();
	  this._date.subtract(1, 'hour').endOf('hour');
	  if (this.getTime() >= prev) {
	    this._date.subtract(1, 'hour');
	  }
	};

	CronDate.prototype.subtractMinute = function() {
	  var prev = this.getTime();
	  this._date.subtract(1, 'minute').endOf('minute');
	  if (this.getTime() > prev) {
	    this._date.subtract(1, 'hour');
	  }
	};

	CronDate.prototype.subtractSecond = function() {
	  var prev = this.getTime();
	  this._date.subtract(1, 'second').startOf('second');
	  if (this.getTime() > prev) {
	    this._date.subtract(1, 'hour');
	  }
	};

	CronDate.prototype.getDate = function() {
	  return this._date.date();
	};

	CronDate.prototype.getFullYear = function() {
	  return this._date.year();
	};

	CronDate.prototype.getDay = function() {
	  return this._date.day();
	};

	CronDate.prototype.getMonth = function() {
	  return this._date.month();
	};

	CronDate.prototype.getHours = function() {
	  return this._date.hours();
	};

	CronDate.prototype.getMinutes = function() {
	  return this._date.minute();
	};

	CronDate.prototype.getSeconds = function() {
	  return this._date.second();
	};

	CronDate.prototype.getMilliseconds = function() {
	  return this._date.millisecond();
	};

	CronDate.prototype.getTime = function() {
	  return this._date.valueOf();
	};

	CronDate.prototype.getUTCDate = function() {
	  return this._getUTC().date();
	};

	CronDate.prototype.getUTCFullYear = function() {
	  return this._getUTC().year();
	};

	CronDate.prototype.getUTCDay = function() {
	  return this._getUTC().day();
	};

	CronDate.prototype.getUTCMonth = function() {
	  return this._getUTC().month();
	};

	CronDate.prototype.getUTCHours = function() {
	  return this._getUTC().hours();
	};

	CronDate.prototype.getUTCMinutes = function() {
	  return this._getUTC().minute();
	};

	CronDate.prototype.getUTCSeconds = function() {
	  return this._getUTC().second();
	};

	CronDate.prototype.toISOString = function() {
	  return this._date.toISOString();
	};

	CronDate.prototype.toJSON = function() {
	  return this._date.toJSON();
	};

	CronDate.prototype.setDate = function(d) {
	  return this._date.date(d);
	};

	CronDate.prototype.setFullYear = function(y) {
	  return this._date.year(y);
	};

	CronDate.prototype.setDay = function(d) {
	  return this._date.day(d);
	};

	CronDate.prototype.setMonth = function(m) {
	  return this._date.month(m);
	};

	CronDate.prototype.setHours = function(h) {
	  return this._date.hour(h);
	};

	CronDate.prototype.setMinutes = function(m) {
	  return this._date.minute(m);
	};

	CronDate.prototype.setSeconds = function(s) {
	  return this._date.second(s);
	};

	CronDate.prototype.setMilliseconds = function(s) {
	  return this._date.millisecond(s);
	};

	CronDate.prototype.getTime = function() {
	  return this._date.valueOf();
	};

	CronDate.prototype._getUTC = function() {
	  return momentTimezone$1.utc(this._date);
	};

	CronDate.prototype.toString = function() {
	  return this._date.toString();
	};

	CronDate.prototype.toDate = function() {
	  return this._date.toDate();
	};

	function CronDate (timestamp, tz) {
	  if (timestamp instanceof CronDate) {
	    timestamp = timestamp._date;
	  }

	  if (!tz) {
	    this._date = momentTimezone$1(timestamp);
	  } else {
	    this._date = momentTimezone$1.tz(timestamp, tz);
	  }
	}

	var date = CronDate;

	var toStr = Object.prototype.toString;

	var isArguments = function isArguments(value) {
		var str = toStr.call(value);
		var isArgs = str === '[object Arguments]';
		if (!isArgs) {
			isArgs = str !== '[object Array]' &&
				value !== null &&
				typeof value === 'object' &&
				typeof value.length === 'number' &&
				value.length >= 0 &&
				toStr.call(value.callee) === '[object Function]';
		}
		return isArgs;
	};

	var keysShim;
	if (!Object.keys) {
		// modified from https://github.com/es-shims/es5-shim
		var has = Object.prototype.hasOwnProperty;
		var toStr$1 = Object.prototype.toString;
		var isArgs = isArguments; // eslint-disable-line global-require
		var isEnumerable = Object.prototype.propertyIsEnumerable;
		var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
		var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
		var dontEnums = [
			'toString',
			'toLocaleString',
			'valueOf',
			'hasOwnProperty',
			'isPrototypeOf',
			'propertyIsEnumerable',
			'constructor'
		];
		var equalsConstructorPrototype = function (o) {
			var ctor = o.constructor;
			return ctor && ctor.prototype === o;
		};
		var excludedKeys = {
			$applicationCache: true,
			$console: true,
			$external: true,
			$frame: true,
			$frameElement: true,
			$frames: true,
			$innerHeight: true,
			$innerWidth: true,
			$onmozfullscreenchange: true,
			$onmozfullscreenerror: true,
			$outerHeight: true,
			$outerWidth: true,
			$pageXOffset: true,
			$pageYOffset: true,
			$parent: true,
			$scrollLeft: true,
			$scrollTop: true,
			$scrollX: true,
			$scrollY: true,
			$self: true,
			$webkitIndexedDB: true,
			$webkitStorageInfo: true,
			$window: true
		};
		var hasAutomationEqualityBug = (function () {
			/* global window */
			if (typeof window === 'undefined') { return false; }
			for (var k in window) {
				try {
					if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
						try {
							equalsConstructorPrototype(window[k]);
						} catch (e) {
							return true;
						}
					}
				} catch (e) {
					return true;
				}
			}
			return false;
		}());
		var equalsConstructorPrototypeIfNotBuggy = function (o) {
			/* global window */
			if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
				return equalsConstructorPrototype(o);
			}
			try {
				return equalsConstructorPrototype(o);
			} catch (e) {
				return false;
			}
		};

		keysShim = function keys(object) {
			var isObject = object !== null && typeof object === 'object';
			var isFunction = toStr$1.call(object) === '[object Function]';
			var isArguments = isArgs(object);
			var isString = isObject && toStr$1.call(object) === '[object String]';
			var theKeys = [];

			if (!isObject && !isFunction && !isArguments) {
				throw new TypeError('Object.keys called on a non-object');
			}

			var skipProto = hasProtoEnumBug && isFunction;
			if (isString && object.length > 0 && !has.call(object, 0)) {
				for (var i = 0; i < object.length; ++i) {
					theKeys.push(String(i));
				}
			}

			if (isArguments && object.length > 0) {
				for (var j = 0; j < object.length; ++j) {
					theKeys.push(String(j));
				}
			} else {
				for (var name in object) {
					if (!(skipProto && name === 'prototype') && has.call(object, name)) {
						theKeys.push(String(name));
					}
				}
			}

			if (hasDontEnumBug) {
				var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

				for (var k = 0; k < dontEnums.length; ++k) {
					if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
						theKeys.push(dontEnums[k]);
					}
				}
			}
			return theKeys;
		};
	}
	var implementation = keysShim;

	var slice = Array.prototype.slice;


	var origKeys = Object.keys;
	var keysShim$1 = origKeys ? function keys(o) { return origKeys(o); } : implementation;

	var originalKeys = Object.keys;

	keysShim$1.shim = function shimObjectKeys() {
		if (Object.keys) {
			var keysWorksWithArguments = (function () {
				// Safari 5.0 bug
				var args = Object.keys(arguments);
				return args && args.length === arguments.length;
			}(1, 2));
			if (!keysWorksWithArguments) {
				Object.keys = function keys(object) { // eslint-disable-line func-name-matching
					if (isArguments(object)) {
						return originalKeys(slice.call(object));
					}
					return originalKeys(object);
				};
			}
		} else {
			Object.keys = keysShim$1;
		}
		return Object.keys || keysShim$1;
	};

	var objectKeys = keysShim$1;

	var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

	var toStr$2 = Object.prototype.toString;
	var concat = Array.prototype.concat;
	var origDefineProperty = Object.defineProperty;

	var isFunction = function (fn) {
		return typeof fn === 'function' && toStr$2.call(fn) === '[object Function]';
	};

	var arePropertyDescriptorsSupported = function () {
		var obj = {};
		try {
			origDefineProperty(obj, 'x', { enumerable: false, value: obj });
			// eslint-disable-next-line no-unused-vars, no-restricted-syntax
			for (var _ in obj) { // jscs:ignore disallowUnusedVariables
				return false;
			}
			return obj.x === obj;
		} catch (e) { /* this is IE 8. */
			return false;
		}
	};
	var supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();

	var defineProperty = function (object, name, value, predicate) {
		if (name in object && (!isFunction(predicate) || !predicate())) {
			return;
		}
		if (supportsDescriptors) {
			origDefineProperty(object, name, {
				configurable: true,
				enumerable: false,
				value: value,
				writable: true
			});
		} else {
			object[name] = value;
		}
	};

	var defineProperties = function (object, map) {
		var predicates = arguments.length > 2 ? arguments[2] : {};
		var props = objectKeys(map);
		if (hasSymbols) {
			props = concat.call(props, Object.getOwnPropertySymbols(map));
		}
		for (var i = 0; i < props.length; i += 1) {
			defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
		}
	};

	defineProperties.supportsDescriptors = !!supportsDescriptors;

	var defineProperties_1 = defineProperties;

	/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

	var implementation$1 = function isNaN(value) {
		return value !== value;
	};

	var polyfill = function getPolyfill() {
		if (Number.isNaN && Number.isNaN(NaN) && !Number.isNaN('a')) {
			return Number.isNaN;
		}
		return implementation$1;
	};

	/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

	var shim = function shimNumberIsNaN() {
		var polyfill$1 = polyfill();
		defineProperties_1(Number, { isNaN: polyfill$1 }, {
			isNaN: function testIsNaN() {
				return Number.isNaN !== polyfill$1;
			}
		});
		return polyfill$1;
	};

	var polyfill$1 = polyfill();

	/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

	defineProperties_1(polyfill$1, {
		getPolyfill: polyfill,
		implementation: implementation$1,
		shim: shim
	});

	var isNan = polyfill$1;

	// Load Date class extensions


	// Get Number.isNaN or the polyfill


	/**
	 * Cron iteration loop safety limit
	 */
	var LOOP_LIMIT = 10000;

	/**
	 * Detect if input range fully matches constraint bounds
	 * @param {Array} range Input range
	 * @param {Array} constraints Input constraints
	 * @returns {Boolean}
	 * @private
	 */
	function isWildcardRange(range, constraints) {
	  if (range instanceof Array && !range.length) {
	    return false;
	  }

	  if (constraints.length !== 2) {
	    return false;
	  }

	  return range.length === (constraints[1] - (constraints[0] < 1 ? - 1 : 0));
	}

	/**
	 * Construct a new expression parser
	 *
	 * Options:
	 *   currentDate: iterator start date
	 *   endDate: iterator end date
	 *
	 * @constructor
	 * @private
	 * @param {Object} fields  Expression fields parsed values
	 * @param {Object} options Parser options
	 */
	function CronExpression (fields, options) {
	  this._options = options;
	  this._utc = options.utc || false;
	  this._tz = this._utc ? 'UTC' : options.tz;
	  this._currentDate = new date(options.currentDate, this._tz);
	  this._startDate = options.startDate ? new date(options.startDate, this._tz) : null;
	  this._endDate = options.endDate ? new date(options.endDate, this._tz) : null;
	  this._fields = fields;
	  this._isIterator = options.iterator || false;
	  this._hasIterated = false;
	  this._nthDayOfWeek = options.nthDayOfWeek || 0;
	}

	/**
	 * Field mappings
	 * @type {Array}
	 */
	CronExpression.map = [ 'second', 'minute', 'hour', 'dayOfMonth', 'month', 'dayOfWeek' ];

	/**
	 * Prefined intervals
	 * @type {Object}
	 */
	CronExpression.predefined = {
	  '@yearly': '0 0 1 1 *',
	  '@monthly': '0 0 1 * *',
	  '@weekly': '0 0 * * 0',
	  '@daily': '0 0 * * *',
	  '@hourly': '0 * * * *'
	};

	/**
	 * Fields constraints
	 * @type {Array}
	 */
	CronExpression.constraints = [
	  [ 0, 59 ], // Second
	  [ 0, 59 ], // Minute
	  [ 0, 23 ], // Hour
	  [ 1, 31 ], // Day of month
	  [ 1, 12 ], // Month
	  [ 0, 7 ] // Day of week
	];

	/**
	 * Days in month
	 * @type {number[]}
	 */
	CronExpression.daysInMonth = [
	  31,
	  29,
	  31,
	  30,
	  31,
	  30,
	  31,
	  31,
	  30,
	  31,
	  30,
	  31
	];

	/**
	 * Field aliases
	 * @type {Object}
	 */
	CronExpression.aliases = {
	  month: {
	    jan: 1,
	    feb: 2,
	    mar: 3,
	    apr: 4,
	    may: 5,
	    jun: 6,
	    jul: 7,
	    aug: 8,
	    sep: 9,
	    oct: 10,
	    nov: 11,
	    dec: 12
	  },

	  dayOfWeek: {
	    sun: 0,
	    mon: 1,
	    tue: 2,
	    wed: 3,
	    thu: 4,
	    fri: 5,
	    sat: 6
	  }
	};

	/**
	 * Field defaults
	 * @type {Array}
	 */
	CronExpression.parseDefaults = [ '0', '*', '*', '*', '*', '*' ];

	CronExpression.standardValidCharacters = /^[\d|/|*|\-|,]+$/;
	CronExpression.dayValidCharacters = /^[\d|/|*|\-|,|\?]+$/;
	CronExpression.validCharacters = {
	  second: CronExpression.standardValidCharacters,
	  minute: CronExpression.standardValidCharacters,
	  hour: CronExpression.standardValidCharacters,
	  dayOfMonth: CronExpression.dayValidCharacters,
	  month: CronExpression.standardValidCharacters,
	  dayOfWeek: CronExpression.dayValidCharacters,
	};

	/**
	 * Parse input interval
	 *
	 * @param {String} field Field symbolic name
	 * @param {String} value Field value
	 * @param {Array} constraints Range upper and lower constraints
	 * @return {Array} Sequence of sorted values
	 * @private
	 */
	CronExpression._parseField = function _parseField (field, value, constraints) {
	  // Replace aliases
	  switch (field) {
	    case 'month':
	    case 'dayOfWeek':
	      var aliases = CronExpression.aliases[field];

	      value = value.replace(/[a-z]{1,3}/gi, function(match) {
	        match = match.toLowerCase();

	        if (typeof aliases[match] !== undefined) {
	          return aliases[match];
	        } else {
	          throw new Error('Cannot resolve alias "' + match + '"')
	        }
	      });
	      break;
	  }

	  // Check for valid characters.
	  if (!(CronExpression.validCharacters[field].test(value))) {
	    throw new Error('Invalid characters, got value: ' + value)
	  }

	  // Replace '*' and '?'
	  if (value.indexOf('*') !== -1) {
	    value = value.replace(/\*/g, constraints.join('-'));
	  } else if (value.indexOf('?') !== -1) {
	    value = value.replace(/\?/g, constraints.join('-'));
	  }

	  //
	  // Inline parsing functions
	  //
	  // Parser path:
	  //  - parseSequence
	  //    - parseRepeat
	  //      - parseRange

	  /**
	   * Parse sequence
	   *
	   * @param {String} val
	   * @return {Array}
	   * @private
	   */
	  function parseSequence (val) {
	    var stack = [];

	    function handleResult (result) {
	      var max = stack.length > 0 ? Math.max.apply(Math, stack) : -1;

	      if (result instanceof Array) { // Make sequence linear
	        for (var i = 0, c = result.length; i < c; i++) {
	          var value = result[i];

	          // Check constraints
	          if (value < constraints[0] || value > constraints[1]) {
	            throw new Error(
	                'Constraint error, got value ' + value + ' expected range ' +
	                constraints[0] + '-' + constraints[1]
	            );
	          }

	          if (value > max) {
	            stack.push(value);
	          }

	          max = Math.max.apply(Math, stack);
	        }
	      } else { // Scalar value
	        result = +result;

	        // Check constraints
	        if (result < constraints[0] || result > constraints[1]) {
	          throw new Error(
	            'Constraint error, got value ' + result + ' expected range ' +
	            constraints[0] + '-' + constraints[1]
	          );
	        }

	        if (field == 'dayOfWeek') {
	          result = result % 7;
	        }

	        stack.push(result);
	      }
	    }

	    var atoms = val
	      .split(',')
	      .sort(function(a, b) {
	        return a.localeCompare(b);
	      });

	    if (atoms.length > 1) {
	      for (var i = 0, c = atoms.length; i < c; i++) {
	        handleResult(parseRepeat(atoms[i]));
	      }
	    } else {
	      handleResult(parseRepeat(val));
	    }

	    stack.sort(function(a, b) {
	      return a - b;
	    });

	    return stack;
	  }

	  /**
	   * Parse repetition interval
	   *
	   * @param {String} val
	   * @return {Array}
	   */
	  function parseRepeat (val) {
	    var repeatInterval = 1;
	    var atoms = val.split('/');

	    if (atoms.length > 1) {
	      return parseRange(atoms[0], atoms[atoms.length - 1]);
	    }

	    return parseRange(val, repeatInterval);
	  }

	  /**
	   * Parse range
	   *
	   * @param {String} val
	   * @param {Number} repeatInterval Repetition interval
	   * @return {Array}
	   * @private
	   */
	  function parseRange (val, repeatInterval) {
	    var stack = [];
	    var atoms = val.split('-');

	    if (atoms.length > 1 ) {
	      // Invalid range, return value
	      if (atoms.length < 2) {
	        return +val;
	      }

	      if (!atoms[0].length) {
	        if (!atoms[1].length) {
	          throw new Error('Invalid range: ' + val);
	        }

	        return +val;
	      }

	      // Validate range
	      var min = +atoms[0];
	      var max = +atoms[1];

	      if (isNan(min) || isNan(max) ||
	          min < constraints[0] || max > constraints[1]) {
	        throw new Error(
	          'Constraint error, got range ' +
	          min + '-' + max +
	          ' expected range ' +
	          constraints[0] + '-' + constraints[1]
	        );
	      } else if (min >= max) {
	        throw new Error('Invalid range: ' + val);
	      }

	      // Create range
	      var repeatIndex = +repeatInterval;

	      if (isNan(repeatIndex) || repeatIndex <= 0) {
	        throw new Error('Constraint error, cannot repeat at every ' + repeatIndex + ' time.');
	      }

	      for (var index = min, count = max; index <= count; index++) {
	        if (repeatIndex > 0 && (repeatIndex % repeatInterval) === 0) {
	          repeatIndex = 1;
	          stack.push(index);
	        } else {
	          repeatIndex++;
	        }
	      }

	      return stack;
	    }

	    return +val;
	  }

	  return parseSequence(value);
	};

	CronExpression.prototype._applyTimezoneShift = function(currentDate, dateMathVerb, method) {
	  if ((method === 'Month') || (method === 'Day')) {
	    var prevTime = currentDate.getTime();
	    currentDate[dateMathVerb + method]();
	    var currTime = currentDate.getTime();
	    if (prevTime === currTime) {
	      // Jumped into a not existent date due to a DST transition
	      if ((currentDate.getMinutes() === 0) &&
	          (currentDate.getSeconds() === 0)) {
	        currentDate.addHour();
	      } else if ((currentDate.getMinutes() === 59) &&
	                 (currentDate.getSeconds() === 59)) {
	        currentDate.subtractHour();
	      }
	    }
	  } else {
	    var previousHour = currentDate.getHours();
	    currentDate[dateMathVerb + method]();
	    var currentHour = currentDate.getHours();
	    var diff = currentHour - previousHour;
	    if (diff === 2) {
	        // Starting DST
	        if (this._fields.hour.length !== 24) {
	          // Hour is specified
	          this._dstStart = currentHour;
	        }
	      } else if ((diff === 0) &&
	                 (currentDate.getMinutes() === 0) &&
	                 (currentDate.getSeconds() === 0)) {
	        // Ending DST
	        if (this._fields.hour.length !== 24) {
	          // Hour is specified
	          this._dstEnd = currentHour;
	        }
	      }
	  }
	};


	/**
	 * Find next or previous matching schedule date
	 *
	 * @return {CronDate}
	 * @private
	 */
	CronExpression.prototype._findSchedule = function _findSchedule (reverse) {

	  /**
	   * Match field value
	   *
	   * @param {String} value
	   * @param {Array} sequence
	   * @return {Boolean}
	   * @private
	   */
	  function matchSchedule (value, sequence) {
	    for (var i = 0, c = sequence.length; i < c; i++) {
	      if (sequence[i] >= value) {
	        return sequence[i] === value;
	      }
	    }

	    return sequence[0] === value;
	  }

	  /**
	   * Helps determine if the provided date is the correct nth occurence of the
	   * desired day of week.
	   *
	   * @param {CronDate} date
	   * @param {Number} nthDayOfWeek
	   * @return {Boolean}
	   * @private
	   */
	  function isNthDayMatch(date, nthDayOfWeek) {
	    if (nthDayOfWeek < 6) {
	      if (
	        date.getDate() < 8 &&
	        nthDayOfWeek === 1 // First occurence has to happen in first 7 days of the month
	      ) {
	        return true;
	      }

	      var offset = date.getDate() % 7 ? 1 : 0; // Math is off by 1 when dayOfWeek isn't divisible by 7
	      var adjustedDate = date.getDate() - (date.getDate() % 7); // find the first occurance
	      var occurrence = Math.floor(adjustedDate / 7) + offset;

	      return occurrence === nthDayOfWeek;
	    }

	    return false;
	  }

	  // Whether to use backwards directionality when searching
	  reverse = reverse || false;
	  var dateMathVerb = reverse ? 'subtract' : 'add';

	  var currentDate = new date(this._currentDate, this._tz);
	  var startDate = this._startDate;
	  var endDate = this._endDate;

	  // Find matching schedule
	  var startTimestamp = currentDate.getTime();
	  var stepCount = 0;

	  while (stepCount < LOOP_LIMIT) {
	    stepCount++;

	    // Validate timespan
	    if (reverse) {
	      if (startDate && (currentDate.getTime() - startDate.getTime() < 0)) {
	        throw new Error('Out of the timespan range');
	      }
	    } else {
	      if (endDate && (endDate.getTime() - currentDate.getTime()) < 0) {
	        throw new Error('Out of the timespan range');
	      }
	    }

	    // Day of month and week matching:
	    //
	    // "The day of a command's execution can be specified by two fields --
	    // day of month, and day of week.  If  both	 fields	 are  restricted  (ie,
	    // aren't  *),  the command will be run when either field matches the cur-
	    // rent time.  For example, "30 4 1,15 * 5" would cause a command to be
	    // run at 4:30 am on the  1st and 15th of each month, plus every Friday."
	    //
	    // http://unixhelp.ed.ac.uk/CGI/man-cgi?crontab+5
	    //

	    var dayOfMonthMatch = matchSchedule(currentDate.getDate(), this._fields.dayOfMonth);
	    var dayOfWeekMatch = matchSchedule(currentDate.getDay(), this._fields.dayOfWeek);

	    var isDayOfMonthWildcardMatch = isWildcardRange(this._fields.dayOfMonth, CronExpression.constraints[3]);
	    var isDayOfWeekWildcardMatch = isWildcardRange(this._fields.dayOfWeek, CronExpression.constraints[5]);

	    var currentHour = currentDate.getHours();

	    // Add or subtract day if select day not match with month (according to calendar)
	    if (!dayOfMonthMatch && !dayOfWeekMatch) {
	      this._applyTimezoneShift(currentDate, dateMathVerb, 'Day');
	      continue;
	    }

	    // Add or subtract day if not day of month is set (and no match) and day of week is wildcard
	    if (!isDayOfMonthWildcardMatch && isDayOfWeekWildcardMatch && !dayOfMonthMatch) {
	      this._applyTimezoneShift(currentDate, dateMathVerb, 'Day');
	      continue;
	    }

	    // Add or subtract day if not day of week is set (and no match) and day of month is wildcard
	    if (isDayOfMonthWildcardMatch && !isDayOfWeekWildcardMatch && !dayOfWeekMatch) {
	      this._applyTimezoneShift(currentDate, dateMathVerb, 'Day');
	      continue;
	    }

	    // Add or subtract day if day of month and week are non-wildcard values and both doesn't match
	    if (!(isDayOfMonthWildcardMatch && isDayOfWeekWildcardMatch) &&
	        !dayOfMonthMatch && !dayOfWeekMatch) {
	      this._applyTimezoneShift(currentDate, dateMathVerb, 'Day');
	      continue;
	    }

	    // Add or subtract day if day of week & nthDayOfWeek are set (and no match)
	    if (
	      this._nthDayOfWeek > 0 &&
	      !isNthDayMatch(currentDate, this._nthDayOfWeek)
	    ) {
	      this._applyTimezoneShift(currentDate, dateMathVerb, 'Day');
	      continue;
	    }

	    // Match month
	    if (!matchSchedule(currentDate.getMonth() + 1, this._fields.month)) {
	      this._applyTimezoneShift(currentDate, dateMathVerb, 'Month');
	      continue;
	    }

	    // Match hour
	    if (!matchSchedule(currentHour, this._fields.hour)) {
	      if (this._dstStart !== currentHour) {
	        this._dstStart = null;
	        this._applyTimezoneShift(currentDate, dateMathVerb, 'Hour');
	        continue;
	      } else if (!matchSchedule(currentHour - 1, this._fields.hour)) {
	        currentDate[dateMathVerb + 'Hour']();
	        continue;
	      }
	    } else if (this._dstEnd === currentHour) {
	      if (!reverse) {
	        this._dstEnd = null;
	        this._applyTimezoneShift(currentDate, 'add', 'Hour');
	        continue;
	      }
	    }

	    // Match minute
	    if (!matchSchedule(currentDate.getMinutes(), this._fields.minute)) {
	      this._applyTimezoneShift(currentDate, dateMathVerb, 'Minute');
	      continue;
	    }

	    // Match second
	    if (!matchSchedule(currentDate.getSeconds(), this._fields.second)) {
	      this._applyTimezoneShift(currentDate, dateMathVerb, 'Second');
	      continue;
	    }

	    // Increase a second in case in the first iteration the currentDate was not
	    // modified
	    if (startTimestamp === currentDate.getTime()) {
	      if ((dateMathVerb === 'add') || (currentDate.getMilliseconds() === 0)) {
	        this._applyTimezoneShift(currentDate, dateMathVerb, 'Second');
	      } else {
	        currentDate.setMilliseconds(0);
	      }

	      continue;
	    }

	    break;
	  }

	  if (stepCount >= LOOP_LIMIT) {
	    throw new Error('Invalid expression, loop limit exceeded');
	  }

	  this._currentDate = new date(currentDate, this._tz);
	  this._hasIterated = true;

	  return currentDate;
	};

	/**
	 * Find next suitable date
	 *
	 * @public
	 * @return {CronDate|Object}
	 */
	CronExpression.prototype.next = function next () {
	  var schedule = this._findSchedule();

	  // Try to return ES6 compatible iterator
	  if (this._isIterator) {
	    return {
	      value: schedule,
	      done: !this.hasNext()
	    };
	  }

	  return schedule;
	};

	/**
	 * Find previous suitable date
	 *
	 * @public
	 * @return {CronDate|Object}
	 */
	CronExpression.prototype.prev = function prev () {
	  var schedule = this._findSchedule(true);

	  // Try to return ES6 compatible iterator
	  if (this._isIterator) {
	    return {
	      value: schedule,
	      done: !this.hasPrev()
	    };
	  }

	  return schedule;
	};

	/**
	 * Check if next suitable date exists
	 *
	 * @public
	 * @return {Boolean}
	 */
	CronExpression.prototype.hasNext = function() {
	  var current = this._currentDate;
	  var hasIterated = this._hasIterated;

	  try {
	    this._findSchedule();
	    return true;
	  } catch (err) {
	    return false;
	  } finally {
	    this._currentDate = current;
	    this._hasIterated = hasIterated;
	  }
	};

	/**
	 * Check if previous suitable date exists
	 *
	 * @public
	 * @return {Boolean}
	 */
	CronExpression.prototype.hasPrev = function() {
	  var current = this._currentDate;
	  var hasIterated = this._hasIterated;

	  try {
	    this._findSchedule(true);
	    return true;
	  } catch (err) {
	    return false;
	  } finally {
	    this._currentDate = current;
	    this._hasIterated = hasIterated;
	  }
	};

	/**
	 * Iterate over expression iterator
	 *
	 * @public
	 * @param {Number} steps Numbers of steps to iterate
	 * @param {Function} callback Optional callback
	 * @return {Array} Array of the iterated results
	 */
	CronExpression.prototype.iterate = function iterate (steps, callback) {
	  var dates = [];

	  if (steps >= 0) {
	    for (var i = 0, c = steps; i < c; i++) {
	      try {
	        var item = this.next();
	        dates.push(item);

	        // Fire the callback
	        if (callback) {
	          callback(item, i);
	        }
	      } catch (err) {
	        break;
	      }
	    }
	  } else {
	    for (var i = 0, c = steps; i > c; i--) {
	      try {
	        var item = this.prev();
	        dates.push(item);

	        // Fire the callback
	        if (callback) {
	          callback(item, i);
	        }
	      } catch (err) {
	        break;
	      }
	    }
	  }

	  return dates;
	};

	/**
	 * Reset expression iterator state
	 *
	 * @public
	 */
	CronExpression.prototype.reset = function reset (newDate) {
	  this._currentDate = new date(newDate || this._options.currentDate);
	};

	/**
	 * Parse input expression (async)
	 *
	 * @public
	 * @param {String} expression Input expression
	 * @param {Object} [options] Parsing options
	 * @param {Function} [callback]
	 */
	CronExpression.parse = function parse(expression, options, callback) {
	  var self = this;
	  if (typeof options === 'function') {
	    options = {};
	  }

	  function parse (expression, options) {
	    if (!options) {
	      options = {};
	    }

	    if (typeof options.currentDate === 'undefined') {
	      options.currentDate = new date(undefined, self._tz);
	    }

	    // Is input expression predefined?
	    if (CronExpression.predefined[expression]) {
	      expression = CronExpression.predefined[expression];
	    }

	    // Split fields
	    var fields = [];
	    var atoms = (expression + '').trim().split(/\s+/);

	    if (atoms.length > 6) {
	      throw new Error('Invalid cron expression');
	    }

	    // Resolve fields
	    var start = (CronExpression.map.length - atoms.length);
	    for (var i = 0, c = CronExpression.map.length; i < c; ++i) {
	      var field = CronExpression.map[i]; // Field name
	      var value = atoms[atoms.length > c ? i : i - start]; // Field value

	      if (i < start || !value) { // Use default value
	        fields.push(CronExpression._parseField(
	          field,
	          CronExpression.parseDefaults[i],
	          CronExpression.constraints[i])
	        );
	      } else {
	        var val = field === 'dayOfWeek' ? parseNthDay(value) : value;

	        fields.push(CronExpression._parseField(
	          field,
	          val,
	          CronExpression.constraints[i])
	        );
	      }
	    }

	    var mappedFields = {};
	    for (var i = 0, c = CronExpression.map.length; i < c; i++) {
	      var key = CronExpression.map[i];
	      mappedFields[key] = fields[i];
	    }

	    // Filter out any day of month value that is larger than given month expects
	    if (mappedFields.month.length === 1) {
	      var daysInMonth = CronExpression.daysInMonth[mappedFields.month[0] - 1];

	      if (mappedFields.dayOfMonth[0] > daysInMonth) {
	        throw new Error('Invalid explicit day of month definition');
	      }

	      mappedFields.dayOfMonth = mappedFields.dayOfMonth.filter(function(dayOfMonth) {
	        return dayOfMonth <= daysInMonth;
	      });
	    }

	    return new CronExpression(mappedFields, options);

	    /**
	     * Parses out the # special character for the dayOfWeek field & adds it to options.
	     *
	     * @param {String} val
	     * @return {String}
	     * @private
	     */
	    function parseNthDay(val) {
	      var atoms = val.split('#');
	      if (atoms.length > 1) {
	        var nthValue = +atoms[atoms.length - 1];
	        if(/,/.test(val)) {
	          throw new Error('Constraint error, invalid dayOfWeek `#` and `,` '
	            + 'special characters are incompatible');
	        }
	        if(/\//.test(val)) {
	          throw new Error('Constraint error, invalid dayOfWeek `#` and `/` '
	            + 'special characters are incompatible');
	        }
	        if(/-/.test(val)) {
	          throw new Error('Constraint error, invalid dayOfWeek `#` and `-` '
	            + 'special characters are incompatible');
	        }
	        if (atoms.length > 2 || isNan(nthValue) || (nthValue < 1 || nthValue > 5)) {
	          throw new Error('Constraint error, invalid dayOfWeek occurrence number (#)');
	        }

	        options.nthDayOfWeek = nthValue;
	        return atoms[0];
	      }
	      return val;
	    }
	  }

	  return parse(expression, options);
	};

	var expression = CronExpression;

	function CronParser() {}

	/**
	 * Parse crontab entry
	 *
	 * @private
	 * @param {String} entry Crontab file entry/line
	 */
	CronParser._parseEntry = function _parseEntry (entry) {
	  var atoms = entry.split(' ');

	  if (atoms.length === 6) {
	    return {
	      interval: expression.parse(entry)
	    };
	  } else if (atoms.length > 6) {
	    return {
	      interval: expression.parse(
	        atoms.slice(0, 6).join(' ')
	      ),
	      command: atoms.slice(6, atoms.length)
	    };
	  } else {
	    throw new Error('Invalid entry: ' + entry);
	  }
	};

	/**
	 * Wrapper for CronExpression.parser method
	 *
	 * @public
	 * @param {String} expression Input expression
	 * @param {Object} [options] Parsing options
	 * @return {Object}
	 */
	CronParser.parseExpression = function parseExpression (expression$1, options, callback) {
	  return expression.parse(expression$1, options, callback);
	};

	/**
	 * Parse content string
	 *
	 * @public
	 * @param {String} data Crontab content
	 * @return {Object}
	 */
	CronParser.parseString = function parseString (data) {
	  var self = this;
	  var blocks = data.split('\n');

	  var response = {
	    variables: {},
	    expressions: [],
	    errors: {}
	  };

	  for (var i = 0, c = blocks.length; i < c; i++) {
	    var block = blocks[i];
	    var matches = null;
	    var entry = block.replace(/^\s+|\s+$/g, ''); // Remove surrounding spaces

	    if (entry.length > 0) {
	      if (entry.match(/^#/)) { // Comment
	        continue;
	      } else if ((matches = entry.match(/^(.*)=(.*)$/))) { // Variable
	        response.variables[matches[1]] = matches[2];
	      } else { // Expression?
	        var result = null;

	        try {
	          result = self._parseEntry('0 ' + entry);
	          response.expressions.push(result.interval);
	        } catch (err) {
	          response.errors[entry] = err;
	        }
	      }
	    }
	  }

	  return response;
	};

	/**
	 * Parse crontab file
	 *
	 * @public
	 * @param {String} filePath Path to file
	 * @param {Function} callback
	 */
	CronParser.parseFile = function parseFile (filePath, callback) {
	  fs.readFile(filePath, function(err, data) {
	    if (err) {
	      callback(err);
	      return;
	    }

	    return callback(null, CronParser.parseString(data.toString()));
	  });
	};

	var parser = CronParser;

	// these aren't really private, but nor are they really useful to document

	/**
	 * @private
	 */
	class LuxonError extends Error {}

	/**
	 * @private
	 */
	class InvalidDateTimeError extends LuxonError {
	  constructor(reason) {
	    super(`Invalid DateTime: ${reason.toMessage()}`);
	  }
	}

	/**
	 * @private
	 */
	class InvalidIntervalError extends LuxonError {
	  constructor(reason) {
	    super(`Invalid Interval: ${reason.toMessage()}`);
	  }
	}

	/**
	 * @private
	 */
	class InvalidDurationError extends LuxonError {
	  constructor(reason) {
	    super(`Invalid Duration: ${reason.toMessage()}`);
	  }
	}

	/**
	 * @private
	 */
	class ConflictingSpecificationError extends LuxonError {}

	/**
	 * @private
	 */
	class InvalidUnitError extends LuxonError {
	  constructor(unit) {
	    super(`Invalid unit ${unit}`);
	  }
	}

	/**
	 * @private
	 */
	class InvalidArgumentError extends LuxonError {}

	/**
	 * @private
	 */
	class ZoneIsAbstractError extends LuxonError {
	  constructor() {
	    super("Zone is an abstract class");
	  }
	}

	/**
	 * @private
	 */

	const n = "numeric",
	  s = "short",
	  l = "long";

	const DATE_SHORT = {
	  year: n,
	  month: n,
	  day: n
	};

	const DATE_MED = {
	  year: n,
	  month: s,
	  day: n
	};

	const DATE_FULL = {
	  year: n,
	  month: l,
	  day: n
	};

	const DATE_HUGE = {
	  year: n,
	  month: l,
	  day: n,
	  weekday: l
	};

	const TIME_SIMPLE = {
	  hour: n,
	  minute: n
	};

	const TIME_WITH_SECONDS = {
	  hour: n,
	  minute: n,
	  second: n
	};

	const TIME_WITH_SHORT_OFFSET = {
	  hour: n,
	  minute: n,
	  second: n,
	  timeZoneName: s
	};

	const TIME_WITH_LONG_OFFSET = {
	  hour: n,
	  minute: n,
	  second: n,
	  timeZoneName: l
	};

	const TIME_24_SIMPLE = {
	  hour: n,
	  minute: n,
	  hour12: false
	};

	/**
	 * {@link toLocaleString}; format like '09:30:23', always 24-hour.
	 */
	const TIME_24_WITH_SECONDS = {
	  hour: n,
	  minute: n,
	  second: n,
	  hour12: false
	};

	/**
	 * {@link toLocaleString}; format like '09:30:23 EDT', always 24-hour.
	 */
	const TIME_24_WITH_SHORT_OFFSET = {
	  hour: n,
	  minute: n,
	  second: n,
	  hour12: false,
	  timeZoneName: s
	};

	/**
	 * {@link toLocaleString}; format like '09:30:23 Eastern Daylight Time', always 24-hour.
	 */
	const TIME_24_WITH_LONG_OFFSET = {
	  hour: n,
	  minute: n,
	  second: n,
	  hour12: false,
	  timeZoneName: l
	};

	/**
	 * {@link toLocaleString}; format like '10/14/1983, 9:30 AM'. Only 12-hour if the locale is.
	 */
	const DATETIME_SHORT = {
	  year: n,
	  month: n,
	  day: n,
	  hour: n,
	  minute: n
	};

	/**
	 * {@link toLocaleString}; format like '10/14/1983, 9:30:33 AM'. Only 12-hour if the locale is.
	 */
	const DATETIME_SHORT_WITH_SECONDS = {
	  year: n,
	  month: n,
	  day: n,
	  hour: n,
	  minute: n,
	  second: n
	};

	const DATETIME_MED = {
	  year: n,
	  month: s,
	  day: n,
	  hour: n,
	  minute: n
	};

	const DATETIME_MED_WITH_SECONDS = {
	  year: n,
	  month: s,
	  day: n,
	  hour: n,
	  minute: n,
	  second: n
	};

	const DATETIME_MED_WITH_WEEKDAY = {
	  year: n,
	  month: s,
	  day: n,
	  weekday: s,
	  hour: n,
	  minute: n
	};

	const DATETIME_FULL = {
	  year: n,
	  month: l,
	  day: n,
	  hour: n,
	  minute: n,
	  timeZoneName: s
	};

	const DATETIME_FULL_WITH_SECONDS = {
	  year: n,
	  month: l,
	  day: n,
	  hour: n,
	  minute: n,
	  second: n,
	  timeZoneName: s
	};

	const DATETIME_HUGE = {
	  year: n,
	  month: l,
	  day: n,
	  weekday: l,
	  hour: n,
	  minute: n,
	  timeZoneName: l
	};

	const DATETIME_HUGE_WITH_SECONDS = {
	  year: n,
	  month: l,
	  day: n,
	  weekday: l,
	  hour: n,
	  minute: n,
	  second: n,
	  timeZoneName: l
	};

	/*
	  This is just a junk drawer, containing anything used across multiple classes.
	  Because Luxon is small(ish), this should stay small and we won't worry about splitting
	  it up into, say, parsingUtil.js and basicUtil.js and so on. But they are divided up by feature area.
	*/

	/**
	 * @private
	 */

	// TYPES

	function isUndefined(o) {
	  return typeof o === "undefined";
	}

	function isNumber(o) {
	  return typeof o === "number";
	}

	function isInteger(o) {
	  return typeof o === "number" && o % 1 === 0;
	}

	function isString(o) {
	  return typeof o === "string";
	}

	function isDate(o) {
	  return Object.prototype.toString.call(o) === "[object Date]";
	}

	// CAPABILITIES

	function hasIntl() {
	  try {
	    return typeof Intl !== "undefined" && Intl.DateTimeFormat;
	  } catch (e) {
	    return false;
	  }
	}

	function hasFormatToParts() {
	  return !isUndefined(Intl.DateTimeFormat.prototype.formatToParts);
	}

	function hasRelative() {
	  try {
	    return typeof Intl !== "undefined" && !!Intl.RelativeTimeFormat;
	  } catch (e) {
	    return false;
	  }
	}

	// OBJECTS AND ARRAYS

	function maybeArray(thing) {
	  return Array.isArray(thing) ? thing : [thing];
	}

	function bestBy(arr, by, compare) {
	  if (arr.length === 0) {
	    return undefined;
	  }
	  return arr.reduce((best, next) => {
	    const pair = [by(next), next];
	    if (!best) {
	      return pair;
	    } else if (compare(best[0], pair[0]) === best[0]) {
	      return best;
	    } else {
	      return pair;
	    }
	  }, null)[1];
	}

	function pick(obj, keys) {
	  return keys.reduce((a, k) => {
	    a[k] = obj[k];
	    return a;
	  }, {});
	}

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	// NUMBERS AND STRINGS

	function integerBetween(thing, bottom, top) {
	  return isInteger(thing) && thing >= bottom && thing <= top;
	}

	// x % n but takes the sign of n instead of x
	function floorMod(x, n) {
	  return x - n * Math.floor(x / n);
	}

	function padStart(input, n = 2) {
	  if (input.toString().length < n) {
	    return ("0".repeat(n) + input).slice(-n);
	  } else {
	    return input.toString();
	  }
	}

	function parseInteger(string) {
	  if (isUndefined(string) || string === null || string === "") {
	    return undefined;
	  } else {
	    return parseInt(string, 10);
	  }
	}

	function parseMillis(fraction) {
	  // Return undefined (instead of 0) in these cases, where fraction is not set
	  if (isUndefined(fraction) || fraction === null || fraction === "") {
	    return undefined;
	  } else {
	    const f = parseFloat("0." + fraction) * 1000;
	    return Math.floor(f);
	  }
	}

	function roundTo(number, digits, towardZero = false) {
	  const factor = 10 ** digits,
	    rounder = towardZero ? Math.trunc : Math.round;
	  return rounder(number * factor) / factor;
	}

	// DATE BASICS

	function isLeapYear(year) {
	  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
	}

	function daysInYear(year) {
	  return isLeapYear(year) ? 366 : 365;
	}

	function daysInMonth(year, month) {
	  const modMonth = floorMod(month - 1, 12) + 1,
	    modYear = year + (month - modMonth) / 12;

	  if (modMonth === 2) {
	    return isLeapYear(modYear) ? 29 : 28;
	  } else {
	    return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][modMonth - 1];
	  }
	}

	// covert a calendar object to a local timestamp (epoch, but with the offset baked in)
	function objToLocalTS(obj) {
	  let d = Date.UTC(
	    obj.year,
	    obj.month - 1,
	    obj.day,
	    obj.hour,
	    obj.minute,
	    obj.second,
	    obj.millisecond
	  );

	  // for legacy reasons, years between 0 and 99 are interpreted as 19XX; revert that
	  if (obj.year < 100 && obj.year >= 0) {
	    d = new Date(d);
	    d.setUTCFullYear(d.getUTCFullYear() - 1900);
	  }
	  return +d;
	}

	function weeksInWeekYear(weekYear) {
	  const p1 =
	      (weekYear +
	        Math.floor(weekYear / 4) -
	        Math.floor(weekYear / 100) +
	        Math.floor(weekYear / 400)) %
	      7,
	    last = weekYear - 1,
	    p2 = (last + Math.floor(last / 4) - Math.floor(last / 100) + Math.floor(last / 400)) % 7;
	  return p1 === 4 || p2 === 3 ? 53 : 52;
	}

	function untruncateYear(year) {
	  if (year > 99) {
	    return year;
	  } else return year > 60 ? 1900 + year : 2000 + year;
	}

	// PARSING

	function parseZoneInfo(ts, offsetFormat, locale, timeZone = null) {
	  const date = new Date(ts),
	    intlOpts = {
	      hour12: false,
	      year: "numeric",
	      month: "2-digit",
	      day: "2-digit",
	      hour: "2-digit",
	      minute: "2-digit"
	    };

	  if (timeZone) {
	    intlOpts.timeZone = timeZone;
	  }

	  const modified = Object.assign({ timeZoneName: offsetFormat }, intlOpts),
	    intl = hasIntl();

	  if (intl && hasFormatToParts()) {
	    const parsed = new Intl.DateTimeFormat(locale, modified)
	      .formatToParts(date)
	      .find(m => m.type.toLowerCase() === "timezonename");
	    return parsed ? parsed.value : null;
	  } else if (intl) {
	    // this probably doesn't work for all locales
	    const without = new Intl.DateTimeFormat(locale, intlOpts).format(date),
	      included = new Intl.DateTimeFormat(locale, modified).format(date),
	      diffed = included.substring(without.length),
	      trimmed = diffed.replace(/^[, \u200e]+/, "");
	    return trimmed;
	  } else {
	    return null;
	  }
	}

	// signedOffset('-5', '30') -> -330
	function signedOffset(offHourStr, offMinuteStr) {
	  let offHour = parseInt(offHourStr, 10);

	  // don't || this because we want to preserve -0
	  if (Number.isNaN(offHour)) {
	    offHour = 0;
	  }

	  const offMin = parseInt(offMinuteStr, 10) || 0,
	    offMinSigned = offHour < 0 || Object.is(offHour, -0) ? -offMin : offMin;
	  return offHour * 60 + offMinSigned;
	}

	// COERCION

	function asNumber(value) {
	  const numericValue = Number(value);
	  if (typeof value === "boolean" || value === "" || Number.isNaN(numericValue))
	    throw new InvalidArgumentError(`Invalid unit value ${value}`);
	  return numericValue;
	}

	function normalizeObject(obj, normalizer, nonUnitKeys) {
	  const normalized = {};
	  for (const u in obj) {
	    if (hasOwnProperty(obj, u)) {
	      if (nonUnitKeys.indexOf(u) >= 0) continue;
	      const v = obj[u];
	      if (v === undefined || v === null) continue;
	      normalized[normalizer(u)] = asNumber(v);
	    }
	  }
	  return normalized;
	}

	function formatOffset(offset, format) {
	  const hours = Math.trunc(offset / 60),
	    minutes = Math.abs(offset % 60),
	    sign = hours >= 0 && !Object.is(hours, -0) ? "+" : "-",
	    base = `${sign}${Math.abs(hours)}`;

	  switch (format) {
	    case "short":
	      return `${sign}${padStart(Math.abs(hours), 2)}:${padStart(minutes, 2)}`;
	    case "narrow":
	      return minutes > 0 ? `${base}:${minutes}` : base;
	    case "techie":
	      return `${sign}${padStart(Math.abs(hours), 2)}${padStart(minutes, 2)}`;
	    default:
	      throw new RangeError(`Value format ${format} is out of range for property format`);
	  }
	}

	function timeObject(obj) {
	  return pick(obj, ["hour", "minute", "second", "millisecond"]);
	}

	const ianaRegex = /[A-Za-z_+-]{1,256}(:?\/[A-Za-z_+-]{1,256}(\/[A-Za-z_+-]{1,256})?)?/;

	function stringify(obj) {
	  return JSON.stringify(obj, Object.keys(obj).sort());
	}

	/**
	 * @private
	 */

	const monthsLong = [
	  "January",
	  "February",
	  "March",
	  "April",
	  "May",
	  "June",
	  "July",
	  "August",
	  "September",
	  "October",
	  "November",
	  "December"
	];

	const monthsShort = [
	  "Jan",
	  "Feb",
	  "Mar",
	  "Apr",
	  "May",
	  "Jun",
	  "Jul",
	  "Aug",
	  "Sep",
	  "Oct",
	  "Nov",
	  "Dec"
	];

	const monthsNarrow = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

	function months(length) {
	  switch (length) {
	    case "narrow":
	      return monthsNarrow;
	    case "short":
	      return monthsShort;
	    case "long":
	      return monthsLong;
	    case "numeric":
	      return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
	    case "2-digit":
	      return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
	    default:
	      return null;
	  }
	}

	const weekdaysLong = [
	  "Monday",
	  "Tuesday",
	  "Wednesday",
	  "Thursday",
	  "Friday",
	  "Saturday",
	  "Sunday"
	];

	const weekdaysShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

	const weekdaysNarrow = ["M", "T", "W", "T", "F", "S", "S"];

	function weekdays(length) {
	  switch (length) {
	    case "narrow":
	      return weekdaysNarrow;
	    case "short":
	      return weekdaysShort;
	    case "long":
	      return weekdaysLong;
	    case "numeric":
	      return ["1", "2", "3", "4", "5", "6", "7"];
	    default:
	      return null;
	  }
	}

	const meridiems = ["AM", "PM"];

	const erasLong = ["Before Christ", "Anno Domini"];

	const erasShort = ["BC", "AD"];

	const erasNarrow = ["B", "A"];

	function eras(length) {
	  switch (length) {
	    case "narrow":
	      return erasNarrow;
	    case "short":
	      return erasShort;
	    case "long":
	      return erasLong;
	    default:
	      return null;
	  }
	}

	function meridiemForDateTime(dt) {
	  return meridiems[dt.hour < 12 ? 0 : 1];
	}

	function weekdayForDateTime(dt, length) {
	  return weekdays(length)[dt.weekday - 1];
	}

	function monthForDateTime(dt, length) {
	  return months(length)[dt.month - 1];
	}

	function eraForDateTime(dt, length) {
	  return eras(length)[dt.year < 0 ? 0 : 1];
	}

	function formatRelativeTime(unit, count, numeric = "always", narrow = false) {
	  const units = {
	    years: ["year", "yr."],
	    quarters: ["quarter", "qtr."],
	    months: ["month", "mo."],
	    weeks: ["week", "wk."],
	    days: ["day", "day", "days"],
	    hours: ["hour", "hr."],
	    minutes: ["minute", "min."],
	    seconds: ["second", "sec."]
	  };

	  const lastable = ["hours", "minutes", "seconds"].indexOf(unit) === -1;

	  if (numeric === "auto" && lastable) {
	    const isDay = unit === "days";
	    switch (count) {
	      case 1:
	        return isDay ? "tomorrow" : `next ${units[unit][0]}`;
	      case -1:
	        return isDay ? "yesterday" : `last ${units[unit][0]}`;
	      case 0:
	        return isDay ? "today" : `this ${units[unit][0]}`;
	    }
	  }

	  const isInPast = Object.is(count, -0) || count < 0,
	    fmtValue = Math.abs(count),
	    singular = fmtValue === 1,
	    lilUnits = units[unit],
	    fmtUnit = narrow
	      ? singular
	        ? lilUnits[1]
	        : lilUnits[2] || lilUnits[1]
	      : singular
	        ? units[unit][0]
	        : unit;
	  return isInPast ? `${fmtValue} ${fmtUnit} ago` : `in ${fmtValue} ${fmtUnit}`;
	}

	function formatString(knownFormat) {
	  // these all have the offsets removed because we don't have access to them
	  // without all the intl stuff this is backfilling
	  const filtered = pick(knownFormat, [
	      "weekday",
	      "era",
	      "year",
	      "month",
	      "day",
	      "hour",
	      "minute",
	      "second",
	      "timeZoneName",
	      "hour12"
	    ]),
	    key = stringify(filtered),
	    dateTimeHuge = "EEEE, LLLL d, yyyy, h:mm a";
	  switch (key) {
	    case stringify(DATE_SHORT):
	      return "M/d/yyyy";
	    case stringify(DATE_MED):
	      return "LLL d, yyyy";
	    case stringify(DATE_FULL):
	      return "LLLL d, yyyy";
	    case stringify(DATE_HUGE):
	      return "EEEE, LLLL d, yyyy";
	    case stringify(TIME_SIMPLE):
	      return "h:mm a";
	    case stringify(TIME_WITH_SECONDS):
	      return "h:mm:ss a";
	    case stringify(TIME_WITH_SHORT_OFFSET):
	      return "h:mm a";
	    case stringify(TIME_WITH_LONG_OFFSET):
	      return "h:mm a";
	    case stringify(TIME_24_SIMPLE):
	      return "HH:mm";
	    case stringify(TIME_24_WITH_SECONDS):
	      return "HH:mm:ss";
	    case stringify(TIME_24_WITH_SHORT_OFFSET):
	      return "HH:mm";
	    case stringify(TIME_24_WITH_LONG_OFFSET):
	      return "HH:mm";
	    case stringify(DATETIME_SHORT):
	      return "M/d/yyyy, h:mm a";
	    case stringify(DATETIME_MED):
	      return "LLL d, yyyy, h:mm a";
	    case stringify(DATETIME_FULL):
	      return "LLLL d, yyyy, h:mm a";
	    case stringify(DATETIME_HUGE):
	      return dateTimeHuge;
	    case stringify(DATETIME_SHORT_WITH_SECONDS):
	      return "M/d/yyyy, h:mm:ss a";
	    case stringify(DATETIME_MED_WITH_SECONDS):
	      return "LLL d, yyyy, h:mm:ss a";
	    case stringify(DATETIME_MED_WITH_WEEKDAY):
	      return "EEE, d LLL yyyy, h:mm a";
	    case stringify(DATETIME_FULL_WITH_SECONDS):
	      return "LLLL d, yyyy, h:mm:ss a";
	    case stringify(DATETIME_HUGE_WITH_SECONDS):
	      return "EEEE, LLLL d, yyyy, h:mm:ss a";
	    default:
	      return dateTimeHuge;
	  }
	}

	function stringifyTokens(splits, tokenToString) {
	  let s = "";
	  for (const token of splits) {
	    if (token.literal) {
	      s += token.val;
	    } else {
	      s += tokenToString(token.val);
	    }
	  }
	  return s;
	}

	const macroTokenToFormatOpts = {
	  D: DATE_SHORT,
	  DD: DATE_MED,
	  DDD: DATE_FULL,
	  DDDD: DATE_HUGE,
	  t: TIME_SIMPLE,
	  tt: TIME_WITH_SECONDS,
	  ttt: TIME_WITH_SHORT_OFFSET,
	  tttt: TIME_WITH_LONG_OFFSET,
	  T: TIME_24_SIMPLE,
	  TT: TIME_24_WITH_SECONDS,
	  TTT: TIME_24_WITH_SHORT_OFFSET,
	  TTTT: TIME_24_WITH_LONG_OFFSET,
	  f: DATETIME_SHORT,
	  ff: DATETIME_MED,
	  fff: DATETIME_FULL,
	  ffff: DATETIME_HUGE,
	  F: DATETIME_SHORT_WITH_SECONDS,
	  FF: DATETIME_MED_WITH_SECONDS,
	  FFF: DATETIME_FULL_WITH_SECONDS,
	  FFFF: DATETIME_HUGE_WITH_SECONDS
	};

	/**
	 * @private
	 */

	class Formatter {
	  static create(locale, opts = {}) {
	    return new Formatter(locale, opts);
	  }

	  static parseFormat(fmt) {
	    let current = null,
	      currentFull = "",
	      bracketed = false;
	    const splits = [];
	    for (let i = 0; i < fmt.length; i++) {
	      const c = fmt.charAt(i);
	      if (c === "'") {
	        if (currentFull.length > 0) {
	          splits.push({ literal: bracketed, val: currentFull });
	        }
	        current = null;
	        currentFull = "";
	        bracketed = !bracketed;
	      } else if (bracketed) {
	        currentFull += c;
	      } else if (c === current) {
	        currentFull += c;
	      } else {
	        if (currentFull.length > 0) {
	          splits.push({ literal: false, val: currentFull });
	        }
	        currentFull = c;
	        current = c;
	      }
	    }

	    if (currentFull.length > 0) {
	      splits.push({ literal: bracketed, val: currentFull });
	    }

	    return splits;
	  }

	  static macroTokenToFormatOpts(token) {
	    return macroTokenToFormatOpts[token];
	  }

	  constructor(locale, formatOpts) {
	    this.opts = formatOpts;
	    this.loc = locale;
	    this.systemLoc = null;
	  }

	  formatWithSystemDefault(dt, opts) {
	    if (this.systemLoc === null) {
	      this.systemLoc = this.loc.redefaultToSystem();
	    }
	    const df = this.systemLoc.dtFormatter(dt, Object.assign({}, this.opts, opts));
	    return df.format();
	  }

	  formatDateTime(dt, opts = {}) {
	    const df = this.loc.dtFormatter(dt, Object.assign({}, this.opts, opts));
	    return df.format();
	  }

	  formatDateTimeParts(dt, opts = {}) {
	    const df = this.loc.dtFormatter(dt, Object.assign({}, this.opts, opts));
	    return df.formatToParts();
	  }

	  resolvedOptions(dt, opts = {}) {
	    const df = this.loc.dtFormatter(dt, Object.assign({}, this.opts, opts));
	    return df.resolvedOptions();
	  }

	  num(n, p = 0) {
	    // we get some perf out of doing this here, annoyingly
	    if (this.opts.forceSimple) {
	      return padStart(n, p);
	    }

	    const opts = Object.assign({}, this.opts);

	    if (p > 0) {
	      opts.padTo = p;
	    }

	    return this.loc.numberFormatter(opts).format(n);
	  }

	  formatDateTimeFromString(dt, fmt) {
	    const knownEnglish = this.loc.listingMode() === "en",
	      useDateTimeFormatter =
	        this.loc.outputCalendar && this.loc.outputCalendar !== "gregory" && hasFormatToParts(),
	      string = (opts, extract) => this.loc.extract(dt, opts, extract),
	      formatOffset = opts => {
	        if (dt.isOffsetFixed && dt.offset === 0 && opts.allowZ) {
	          return "Z";
	        }

	        return dt.isValid ? dt.zone.formatOffset(dt.ts, opts.format) : "";
	      },
	      meridiem = () =>
	        knownEnglish
	          ? meridiemForDateTime(dt)
	          : string({ hour: "numeric", hour12: true }, "dayperiod"),
	      month = (length, standalone) =>
	        knownEnglish
	          ? monthForDateTime(dt, length)
	          : string(standalone ? { month: length } : { month: length, day: "numeric" }, "month"),
	      weekday = (length, standalone) =>
	        knownEnglish
	          ? weekdayForDateTime(dt, length)
	          : string(
	              standalone ? { weekday: length } : { weekday: length, month: "long", day: "numeric" },
	              "weekday"
	            ),
	      maybeMacro = token => {
	        const formatOpts = Formatter.macroTokenToFormatOpts(token);
	        if (formatOpts) {
	          return this.formatWithSystemDefault(dt, formatOpts);
	        } else {
	          return token;
	        }
	      },
	      era = length =>
	        knownEnglish ? eraForDateTime(dt, length) : string({ era: length }, "era"),
	      tokenToString = token => {
	        // Where possible: http://cldr.unicode.org/translation/date-time#TOC-Stand-Alone-vs.-Format-Styles
	        switch (token) {
	          // ms
	          case "S":
	            return this.num(dt.millisecond);
	          case "u":
	          // falls through
	          case "SSS":
	            return this.num(dt.millisecond, 3);
	          // seconds
	          case "s":
	            return this.num(dt.second);
	          case "ss":
	            return this.num(dt.second, 2);
	          // minutes
	          case "m":
	            return this.num(dt.minute);
	          case "mm":
	            return this.num(dt.minute, 2);
	          // hours
	          case "h":
	            return this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12);
	          case "hh":
	            return this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12, 2);
	          case "H":
	            return this.num(dt.hour);
	          case "HH":
	            return this.num(dt.hour, 2);
	          // offset
	          case "Z":
	            // like +6
	            return formatOffset({ format: "narrow", allowZ: this.opts.allowZ });
	          case "ZZ":
	            // like +06:00
	            return formatOffset({ format: "short", allowZ: this.opts.allowZ });
	          case "ZZZ":
	            // like +0600
	            return formatOffset({ format: "techie", allowZ: this.opts.allowZ });
	          case "ZZZZ":
	            // like EST
	            return dt.zone.offsetName(dt.ts, { format: "short", locale: this.loc.locale });
	          case "ZZZZZ":
	            // like Eastern Standard Time
	            return dt.zone.offsetName(dt.ts, { format: "long", locale: this.loc.locale });
	          // zone
	          case "z":
	            // like America/New_York
	            return dt.zoneName;
	          // meridiems
	          case "a":
	            return meridiem();
	          // dates
	          case "d":
	            return useDateTimeFormatter ? string({ day: "numeric" }, "day") : this.num(dt.day);
	          case "dd":
	            return useDateTimeFormatter ? string({ day: "2-digit" }, "day") : this.num(dt.day, 2);
	          // weekdays - standalone
	          case "c":
	            // like 1
	            return this.num(dt.weekday);
	          case "ccc":
	            // like 'Tues'
	            return weekday("short", true);
	          case "cccc":
	            // like 'Tuesday'
	            return weekday("long", true);
	          case "ccccc":
	            // like 'T'
	            return weekday("narrow", true);
	          // weekdays - format
	          case "E":
	            // like 1
	            return this.num(dt.weekday);
	          case "EEE":
	            // like 'Tues'
	            return weekday("short", false);
	          case "EEEE":
	            // like 'Tuesday'
	            return weekday("long", false);
	          case "EEEEE":
	            // like 'T'
	            return weekday("narrow", false);
	          // months - standalone
	          case "L":
	            // like 1
	            return useDateTimeFormatter
	              ? string({ month: "numeric", day: "numeric" }, "month")
	              : this.num(dt.month);
	          case "LL":
	            // like 01, doesn't seem to work
	            return useDateTimeFormatter
	              ? string({ month: "2-digit", day: "numeric" }, "month")
	              : this.num(dt.month, 2);
	          case "LLL":
	            // like Jan
	            return month("short", true);
	          case "LLLL":
	            // like January
	            return month("long", true);
	          case "LLLLL":
	            // like J
	            return month("narrow", true);
	          // months - format
	          case "M":
	            // like 1
	            return useDateTimeFormatter
	              ? string({ month: "numeric" }, "month")
	              : this.num(dt.month);
	          case "MM":
	            // like 01
	            return useDateTimeFormatter
	              ? string({ month: "2-digit" }, "month")
	              : this.num(dt.month, 2);
	          case "MMM":
	            // like Jan
	            return month("short", false);
	          case "MMMM":
	            // like January
	            return month("long", false);
	          case "MMMMM":
	            // like J
	            return month("narrow", false);
	          // years
	          case "y":
	            // like 2014
	            return useDateTimeFormatter ? string({ year: "numeric" }, "year") : this.num(dt.year);
	          case "yy":
	            // like 14
	            return useDateTimeFormatter
	              ? string({ year: "2-digit" }, "year")
	              : this.num(dt.year.toString().slice(-2), 2);
	          case "yyyy":
	            // like 0012
	            return useDateTimeFormatter
	              ? string({ year: "numeric" }, "year")
	              : this.num(dt.year, 4);
	          case "yyyyyy":
	            // like 000012
	            return useDateTimeFormatter
	              ? string({ year: "numeric" }, "year")
	              : this.num(dt.year, 6);
	          // eras
	          case "G":
	            // like AD
	            return era("short");
	          case "GG":
	            // like Anno Domini
	            return era("long");
	          case "GGGGG":
	            return era("narrow");
	          case "kk":
	            return this.num(dt.weekYear.toString().slice(-2), 2);
	          case "kkkk":
	            return this.num(dt.weekYear, 4);
	          case "W":
	            return this.num(dt.weekNumber);
	          case "WW":
	            return this.num(dt.weekNumber, 2);
	          case "o":
	            return this.num(dt.ordinal);
	          case "ooo":
	            return this.num(dt.ordinal, 3);
	          case "q":
	            // like 1
	            return this.num(dt.quarter);
	          case "qq":
	            // like 01
	            return this.num(dt.quarter, 2);
	          case "X":
	            return this.num(Math.floor(dt.ts / 1000));
	          case "x":
	            return this.num(dt.ts);
	          default:
	            return maybeMacro(token);
	        }
	      };

	    return stringifyTokens(Formatter.parseFormat(fmt), tokenToString);
	  }

	  formatDurationFromString(dur, fmt) {
	    const tokenToField = token => {
	        switch (token[0]) {
	          case "S":
	            return "millisecond";
	          case "s":
	            return "second";
	          case "m":
	            return "minute";
	          case "h":
	            return "hour";
	          case "d":
	            return "day";
	          case "M":
	            return "month";
	          case "y":
	            return "year";
	          default:
	            return null;
	        }
	      },
	      tokenToString = lildur => token => {
	        const mapped = tokenToField(token);
	        if (mapped) {
	          return this.num(lildur.get(mapped), token.length);
	        } else {
	          return token;
	        }
	      },
	      tokens = Formatter.parseFormat(fmt),
	      realTokens = tokens.reduce(
	        (found, { literal, val }) => (literal ? found : found.concat(val)),
	        []
	      ),
	      collapsed = dur.shiftTo(...realTokens.map(tokenToField).filter(t => t));
	    return stringifyTokens(tokens, tokenToString(collapsed));
	  }
	}

	class Invalid {
	  constructor(reason, explanation) {
	    this.reason = reason;
	    this.explanation = explanation;
	  }

	  toMessage() {
	    if (this.explanation) {
	      return `${this.reason}: ${this.explanation}`;
	    } else {
	      return this.reason;
	    }
	  }
	}

	/* eslint no-unused-vars: "off" */

	/**
	 * @interface
	 */
	class Zone {
	  /**
	   * The type of zone
	   * @abstract
	   * @type {string}
	   */
	  get type() {
	    throw new ZoneIsAbstractError();
	  }

	  /**
	   * The name of this zone.
	   * @abstract
	   * @type {string}
	   */
	  get name() {
	    throw new ZoneIsAbstractError();
	  }

	  /**
	   * Returns whether the offset is known to be fixed for the whole year.
	   * @abstract
	   * @type {boolean}
	   */
	  get universal() {
	    throw new ZoneIsAbstractError();
	  }

	  /**
	   * Returns the offset's common name (such as EST) at the specified timestamp
	   * @abstract
	   * @param {number} ts - Epoch milliseconds for which to get the name
	   * @param {Object} opts - Options to affect the format
	   * @param {string} opts.format - What style of offset to return. Accepts 'long' or 'short'.
	   * @param {string} opts.locale - What locale to return the offset name in.
	   * @return {string}
	   */
	  offsetName(ts, opts) {
	    throw new ZoneIsAbstractError();
	  }

	  /**
	   * Returns the offset's value as a string
	   * @abstract
	   * @param {number} ts - Epoch milliseconds for which to get the offset
	   * @param {string} format - What style of offset to return.
	   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
	   * @return {string}
	   */
	  formatOffset(ts, format) {
	    throw new ZoneIsAbstractError();
	  }

	  /**
	   * Return the offset in minutes for this zone at the specified timestamp.
	   * @abstract
	   * @param {number} ts - Epoch milliseconds for which to compute the offset
	   * @return {number}
	   */
	  offset(ts) {
	    throw new ZoneIsAbstractError();
	  }

	  /**
	   * Return whether this Zone is equal to another zone
	   * @abstract
	   * @param {Zone} otherZone - the zone to compare
	   * @return {boolean}
	   */
	  equals(otherZone) {
	    throw new ZoneIsAbstractError();
	  }

	  /**
	   * Return whether this Zone is valid.
	   * @abstract
	   * @type {boolean}
	   */
	  get isValid() {
	    throw new ZoneIsAbstractError();
	  }
	}

	let singleton = null;

	/**
	 * Represents the local zone for this Javascript environment.
	 * @implements {Zone}
	 */
	class LocalZone extends Zone {
	  /**
	   * Get a singleton instance of the local zone
	   * @return {LocalZone}
	   */
	  static get instance() {
	    if (singleton === null) {
	      singleton = new LocalZone();
	    }
	    return singleton;
	  }

	  /** @override **/
	  get type() {
	    return "local";
	  }

	  /** @override **/
	  get name() {
	    if (hasIntl()) {
	      return new Intl.DateTimeFormat().resolvedOptions().timeZone;
	    } else return "local";
	  }

	  /** @override **/
	  get universal() {
	    return false;
	  }

	  /** @override **/
	  offsetName(ts, { format, locale }) {
	    return parseZoneInfo(ts, format, locale);
	  }

	  /** @override **/
	  formatOffset(ts, format) {
	    return formatOffset(this.offset(ts), format);
	  }

	  /** @override **/
	  offset(ts) {
	    return -new Date(ts).getTimezoneOffset();
	  }

	  /** @override **/
	  equals(otherZone) {
	    return otherZone.type === "local";
	  }

	  /** @override **/
	  get isValid() {
	    return true;
	  }
	}

	const matchingRegex = RegExp(`^${ianaRegex.source}$`);

	let dtfCache = {};
	function makeDTF(zone) {
	  if (!dtfCache[zone]) {
	    dtfCache[zone] = new Intl.DateTimeFormat("en-US", {
	      hour12: false,
	      timeZone: zone,
	      year: "numeric",
	      month: "2-digit",
	      day: "2-digit",
	      hour: "2-digit",
	      minute: "2-digit",
	      second: "2-digit"
	    });
	  }
	  return dtfCache[zone];
	}

	const typeToPos = {
	  year: 0,
	  month: 1,
	  day: 2,
	  hour: 3,
	  minute: 4,
	  second: 5
	};

	function hackyOffset(dtf, date) {
	  const formatted = dtf.format(date).replace(/\u200E/g, ""),
	    parsed = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(formatted),
	    [, fMonth, fDay, fYear, fHour, fMinute, fSecond] = parsed;
	  return [fYear, fMonth, fDay, fHour, fMinute, fSecond];
	}

	function partsOffset(dtf, date) {
	  const formatted = dtf.formatToParts(date),
	    filled = [];
	  for (let i = 0; i < formatted.length; i++) {
	    const { type, value } = formatted[i],
	      pos = typeToPos[type];

	    if (!isUndefined(pos)) {
	      filled[pos] = parseInt(value, 10);
	    }
	  }
	  return filled;
	}

	let ianaZoneCache = {};
	/**
	 * A zone identified by an IANA identifier, like America/New_York
	 * @implements {Zone}
	 */
	class IANAZone extends Zone {
	  /**
	   * @param {string} name - Zone name
	   * @return {IANAZone}
	   */
	  static create(name) {
	    if (!ianaZoneCache[name]) {
	      ianaZoneCache[name] = new IANAZone(name);
	    }
	    return ianaZoneCache[name];
	  }

	  /**
	   * Reset local caches. Should only be necessary in testing scenarios.
	   * @return {void}
	   */
	  static resetCache() {
	    ianaZoneCache = {};
	    dtfCache = {};
	  }

	  /**
	   * Returns whether the provided string is a valid specifier. This only checks the string's format, not that the specifier identifies a known zone; see isValidZone for that.
	   * @param {string} s - The string to check validity on
	   * @example IANAZone.isValidSpecifier("America/New_York") //=> true
	   * @example IANAZone.isValidSpecifier("Fantasia/Castle") //=> true
	   * @example IANAZone.isValidSpecifier("Sport~~blorp") //=> false
	   * @return {boolean}
	   */
	  static isValidSpecifier(s) {
	    return !!(s && s.match(matchingRegex));
	  }

	  /**
	   * Returns whether the provided string identifies a real zone
	   * @param {string} zone - The string to check
	   * @example IANAZone.isValidZone("America/New_York") //=> true
	   * @example IANAZone.isValidZone("Fantasia/Castle") //=> false
	   * @example IANAZone.isValidZone("Sport~~blorp") //=> false
	   * @return {boolean}
	   */
	  static isValidZone(zone) {
	    try {
	      new Intl.DateTimeFormat("en-US", { timeZone: zone }).format();
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }

	  // Etc/GMT+8 -> -480
	  /** @ignore */
	  static parseGMTOffset(specifier) {
	    if (specifier) {
	      const match = specifier.match(/^Etc\/GMT([+-]\d{1,2})$/i);
	      if (match) {
	        return -60 * parseInt(match[1]);
	      }
	    }
	    return null;
	  }

	  constructor(name) {
	    super();
	    /** @private **/
	    this.zoneName = name;
	    /** @private **/
	    this.valid = IANAZone.isValidZone(name);
	  }

	  /** @override **/
	  get type() {
	    return "iana";
	  }

	  /** @override **/
	  get name() {
	    return this.zoneName;
	  }

	  /** @override **/
	  get universal() {
	    return false;
	  }

	  /** @override **/
	  offsetName(ts, { format, locale }) {
	    return parseZoneInfo(ts, format, locale, this.name);
	  }

	  /** @override **/
	  formatOffset(ts, format) {
	    return formatOffset(this.offset(ts), format);
	  }

	  /** @override **/
	  offset(ts) {
	    const date = new Date(ts),
	      dtf = makeDTF(this.name),
	      [year, month, day, hour, minute, second] = dtf.formatToParts
	        ? partsOffset(dtf, date)
	        : hackyOffset(dtf, date),
	      // work around https://bugs.chromium.org/p/chromium/issues/detail?id=1025564&can=2&q=%2224%3A00%22%20datetimeformat
	      adjustedHour = hour === 24 ? 0 : hour;

	    const asUTC = objToLocalTS({
	      year,
	      month,
	      day,
	      hour: adjustedHour,
	      minute,
	      second,
	      millisecond: 0
	    });

	    let asTS = +date;
	    const over = asTS % 1000;
	    asTS -= over >= 0 ? over : 1000 + over;
	    return (asUTC - asTS) / (60 * 1000);
	  }

	  /** @override **/
	  equals(otherZone) {
	    return otherZone.type === "iana" && otherZone.name === this.name;
	  }

	  /** @override **/
	  get isValid() {
	    return this.valid;
	  }
	}

	let singleton$1 = null;

	/**
	 * A zone with a fixed offset (meaning no DST)
	 * @implements {Zone}
	 */
	class FixedOffsetZone extends Zone {
	  /**
	   * Get a singleton instance of UTC
	   * @return {FixedOffsetZone}
	   */
	  static get utcInstance() {
	    if (singleton$1 === null) {
	      singleton$1 = new FixedOffsetZone(0);
	    }
	    return singleton$1;
	  }

	  /**
	   * Get an instance with a specified offset
	   * @param {number} offset - The offset in minutes
	   * @return {FixedOffsetZone}
	   */
	  static instance(offset) {
	    return offset === 0 ? FixedOffsetZone.utcInstance : new FixedOffsetZone(offset);
	  }

	  /**
	   * Get an instance of FixedOffsetZone from a UTC offset string, like "UTC+6"
	   * @param {string} s - The offset string to parse
	   * @example FixedOffsetZone.parseSpecifier("UTC+6")
	   * @example FixedOffsetZone.parseSpecifier("UTC+06")
	   * @example FixedOffsetZone.parseSpecifier("UTC-6:00")
	   * @return {FixedOffsetZone}
	   */
	  static parseSpecifier(s) {
	    if (s) {
	      const r = s.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
	      if (r) {
	        return new FixedOffsetZone(signedOffset(r[1], r[2]));
	      }
	    }
	    return null;
	  }

	  constructor(offset) {
	    super();
	    /** @private **/
	    this.fixed = offset;
	  }

	  /** @override **/
	  get type() {
	    return "fixed";
	  }

	  /** @override **/
	  get name() {
	    return this.fixed === 0 ? "UTC" : `UTC${formatOffset(this.fixed, "narrow")}`;
	  }

	  /** @override **/
	  offsetName() {
	    return this.name;
	  }

	  /** @override **/
	  formatOffset(ts, format) {
	    return formatOffset(this.fixed, format);
	  }

	  /** @override **/
	  get universal() {
	    return true;
	  }

	  /** @override **/
	  offset() {
	    return this.fixed;
	  }

	  /** @override **/
	  equals(otherZone) {
	    return otherZone.type === "fixed" && otherZone.fixed === this.fixed;
	  }

	  /** @override **/
	  get isValid() {
	    return true;
	  }
	}

	/**
	 * A zone that failed to parse. You should never need to instantiate this.
	 * @implements {Zone}
	 */
	class InvalidZone extends Zone {
	  constructor(zoneName) {
	    super();
	    /**  @private */
	    this.zoneName = zoneName;
	  }

	  /** @override **/
	  get type() {
	    return "invalid";
	  }

	  /** @override **/
	  get name() {
	    return this.zoneName;
	  }

	  /** @override **/
	  get universal() {
	    return false;
	  }

	  /** @override **/
	  offsetName() {
	    return null;
	  }

	  /** @override **/
	  formatOffset() {
	    return "";
	  }

	  /** @override **/
	  offset() {
	    return NaN;
	  }

	  /** @override **/
	  equals() {
	    return false;
	  }

	  /** @override **/
	  get isValid() {
	    return false;
	  }
	}

	/**
	 * @private
	 */

	function normalizeZone(input, defaultZone) {
	  let offset;
	  if (isUndefined(input) || input === null) {
	    return defaultZone;
	  } else if (input instanceof Zone) {
	    return input;
	  } else if (isString(input)) {
	    const lowered = input.toLowerCase();
	    if (lowered === "local") return defaultZone;
	    else if (lowered === "utc" || lowered === "gmt") return FixedOffsetZone.utcInstance;
	    else if ((offset = IANAZone.parseGMTOffset(input)) != null) {
	      // handle Etc/GMT-4, which V8 chokes on
	      return FixedOffsetZone.instance(offset);
	    } else if (IANAZone.isValidSpecifier(lowered)) return IANAZone.create(input);
	    else return FixedOffsetZone.parseSpecifier(lowered) || new InvalidZone(input);
	  } else if (isNumber(input)) {
	    return FixedOffsetZone.instance(input);
	  } else if (typeof input === "object" && input.offset && typeof input.offset === "number") {
	    // This is dumb, but the instanceof check above doesn't seem to really work
	    // so we're duck checking it
	    return input;
	  } else {
	    return new InvalidZone(input);
	  }
	}

	let now = () => Date.now(),
	  defaultZone = null, // not setting this directly to LocalZone.instance bc loading order issues
	  defaultLocale = null,
	  defaultNumberingSystem = null,
	  defaultOutputCalendar = null,
	  throwOnInvalid = false;

	/**
	 * Settings contains static getters and setters that control Luxon's overall behavior. Luxon is a simple library with few options, but the ones it does have live here.
	 */
	class Settings {
	  /**
	   * Get the callback for returning the current timestamp.
	   * @type {function}
	   */
	  static get now() {
	    return now;
	  }

	  /**
	   * Set the callback for returning the current timestamp.
	   * The function should return a number, which will be interpreted as an Epoch millisecond count
	   * @type {function}
	   * @example Settings.now = () => Date.now() + 3000 // pretend it is 3 seconds in the future
	   * @example Settings.now = () => 0 // always pretend it's Jan 1, 1970 at midnight in UTC time
	   */
	  static set now(n) {
	    now = n;
	  }

	  /**
	   * Get the default time zone to create DateTimes in.
	   * @type {string}
	   */
	  static get defaultZoneName() {
	    return Settings.defaultZone.name;
	  }

	  /**
	   * Set the default time zone to create DateTimes in. Does not affect existing instances.
	   * @type {string}
	   */
	  static set defaultZoneName(z) {
	    if (!z) {
	      defaultZone = null;
	    } else {
	      defaultZone = normalizeZone(z);
	    }
	  }

	  /**
	   * Get the default time zone object to create DateTimes in. Does not affect existing instances.
	   * @type {Zone}
	   */
	  static get defaultZone() {
	    return defaultZone || LocalZone.instance;
	  }

	  /**
	   * Get the default locale to create DateTimes with. Does not affect existing instances.
	   * @type {string}
	   */
	  static get defaultLocale() {
	    return defaultLocale;
	  }

	  /**
	   * Set the default locale to create DateTimes with. Does not affect existing instances.
	   * @type {string}
	   */
	  static set defaultLocale(locale) {
	    defaultLocale = locale;
	  }

	  /**
	   * Get the default numbering system to create DateTimes with. Does not affect existing instances.
	   * @type {string}
	   */
	  static get defaultNumberingSystem() {
	    return defaultNumberingSystem;
	  }

	  /**
	   * Set the default numbering system to create DateTimes with. Does not affect existing instances.
	   * @type {string}
	   */
	  static set defaultNumberingSystem(numberingSystem) {
	    defaultNumberingSystem = numberingSystem;
	  }

	  /**
	   * Get the default output calendar to create DateTimes with. Does not affect existing instances.
	   * @type {string}
	   */
	  static get defaultOutputCalendar() {
	    return defaultOutputCalendar;
	  }

	  /**
	   * Set the default output calendar to create DateTimes with. Does not affect existing instances.
	   * @type {string}
	   */
	  static set defaultOutputCalendar(outputCalendar) {
	    defaultOutputCalendar = outputCalendar;
	  }

	  /**
	   * Get whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
	   * @type {boolean}
	   */
	  static get throwOnInvalid() {
	    return throwOnInvalid;
	  }

	  /**
	   * Set whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
	   * @type {boolean}
	   */
	  static set throwOnInvalid(t) {
	    throwOnInvalid = t;
	  }

	  /**
	   * Reset Luxon's global caches. Should only be necessary in testing scenarios.
	   * @return {void}
	   */
	  static resetCaches() {
	    Locale.resetCache();
	    IANAZone.resetCache();
	  }
	}

	let intlDTCache = {};
	function getCachedDTF(locString, opts = {}) {
	  const key = JSON.stringify([locString, opts]);
	  let dtf = intlDTCache[key];
	  if (!dtf) {
	    dtf = new Intl.DateTimeFormat(locString, opts);
	    intlDTCache[key] = dtf;
	  }
	  return dtf;
	}

	let intlNumCache = {};
	function getCachedINF(locString, opts = {}) {
	  const key = JSON.stringify([locString, opts]);
	  let inf = intlNumCache[key];
	  if (!inf) {
	    inf = new Intl.NumberFormat(locString, opts);
	    intlNumCache[key] = inf;
	  }
	  return inf;
	}

	let intlRelCache = {};
	function getCachedRTF(locString, opts = {}) {
	  const { base, ...cacheKeyOpts } = opts; // exclude `base` from the options
	  const key = JSON.stringify([locString, cacheKeyOpts]);
	  let inf = intlRelCache[key];
	  if (!inf) {
	    inf = new Intl.RelativeTimeFormat(locString, opts);
	    intlRelCache[key] = inf;
	  }
	  return inf;
	}

	let sysLocaleCache = null;
	function systemLocale() {
	  if (sysLocaleCache) {
	    return sysLocaleCache;
	  } else if (hasIntl()) {
	    const computedSys = new Intl.DateTimeFormat().resolvedOptions().locale;
	    // node sometimes defaults to "und". Override that because that is dumb
	    sysLocaleCache = !computedSys || computedSys === "und" ? "en-US" : computedSys;
	    return sysLocaleCache;
	  } else {
	    sysLocaleCache = "en-US";
	    return sysLocaleCache;
	  }
	}

	function parseLocaleString(localeStr) {
	  // I really want to avoid writing a BCP 47 parser
	  // see, e.g. https://github.com/wooorm/bcp-47
	  // Instead, we'll do this:

	  // a) if the string has no -u extensions, just leave it alone
	  // b) if it does, use Intl to resolve everything
	  // c) if Intl fails, try again without the -u

	  const uIndex = localeStr.indexOf("-u-");
	  if (uIndex === -1) {
	    return [localeStr];
	  } else {
	    let options;
	    const smaller = localeStr.substring(0, uIndex);
	    try {
	      options = getCachedDTF(localeStr).resolvedOptions();
	    } catch (e) {
	      options = getCachedDTF(smaller).resolvedOptions();
	    }

	    const { numberingSystem, calendar } = options;
	    // return the smaller one so that we can append the calendar and numbering overrides to it
	    return [smaller, numberingSystem, calendar];
	  }
	}

	function intlConfigString(localeStr, numberingSystem, outputCalendar) {
	  if (hasIntl()) {
	    if (outputCalendar || numberingSystem) {
	      localeStr += "-u";

	      if (outputCalendar) {
	        localeStr += `-ca-${outputCalendar}`;
	      }

	      if (numberingSystem) {
	        localeStr += `-nu-${numberingSystem}`;
	      }
	      return localeStr;
	    } else {
	      return localeStr;
	    }
	  } else {
	    return [];
	  }
	}

	function mapMonths(f) {
	  const ms = [];
	  for (let i = 1; i <= 12; i++) {
	    const dt = DateTime.utc(2016, i, 1);
	    ms.push(f(dt));
	  }
	  return ms;
	}

	function mapWeekdays(f) {
	  const ms = [];
	  for (let i = 1; i <= 7; i++) {
	    const dt = DateTime.utc(2016, 11, 13 + i);
	    ms.push(f(dt));
	  }
	  return ms;
	}

	function listStuff(loc, length, defaultOK, englishFn, intlFn) {
	  const mode = loc.listingMode(defaultOK);

	  if (mode === "error") {
	    return null;
	  } else if (mode === "en") {
	    return englishFn(length);
	  } else {
	    return intlFn(length);
	  }
	}

	function supportsFastNumbers(loc) {
	  if (loc.numberingSystem && loc.numberingSystem !== "latn") {
	    return false;
	  } else {
	    return (
	      loc.numberingSystem === "latn" ||
	      !loc.locale ||
	      loc.locale.startsWith("en") ||
	      (hasIntl() && new Intl.DateTimeFormat(loc.intl).resolvedOptions().numberingSystem === "latn")
	    );
	  }
	}

	/**
	 * @private
	 */

	class PolyNumberFormatter {
	  constructor(intl, forceSimple, opts) {
	    this.padTo = opts.padTo || 0;
	    this.floor = opts.floor || false;

	    if (!forceSimple && hasIntl()) {
	      const intlOpts = { useGrouping: false };
	      if (opts.padTo > 0) intlOpts.minimumIntegerDigits = opts.padTo;
	      this.inf = getCachedINF(intl, intlOpts);
	    }
	  }

	  format(i) {
	    if (this.inf) {
	      const fixed = this.floor ? Math.floor(i) : i;
	      return this.inf.format(fixed);
	    } else {
	      // to match the browser's numberformatter defaults
	      const fixed = this.floor ? Math.floor(i) : roundTo(i, 3);
	      return padStart(fixed, this.padTo);
	    }
	  }
	}

	/**
	 * @private
	 */

	class PolyDateFormatter {
	  constructor(dt, intl, opts) {
	    this.opts = opts;
	    this.hasIntl = hasIntl();

	    let z;
	    if (dt.zone.universal && this.hasIntl) {
	      // Chromium doesn't support fixed-offset zones like Etc/GMT+8 in its formatter,
	      // See https://bugs.chromium.org/p/chromium/issues/detail?id=364374.
	      // So we have to make do. Two cases:
	      // 1. The format options tell us to show the zone. We can't do that, so the best
	      // we can do is format the date in UTC.
	      // 2. The format options don't tell us to show the zone. Then we can adjust them
	      // the time and tell the formatter to show it to us in UTC, so that the time is right
	      // and the bad zone doesn't show up.
	      // We can clean all this up when Chrome fixes this.
	      z = "UTC";
	      if (opts.timeZoneName) {
	        this.dt = dt;
	      } else {
	        this.dt = dt.offset === 0 ? dt : DateTime.fromMillis(dt.ts + dt.offset * 60 * 1000);
	      }
	    } else if (dt.zone.type === "local") {
	      this.dt = dt;
	    } else {
	      this.dt = dt;
	      z = dt.zone.name;
	    }

	    if (this.hasIntl) {
	      const intlOpts = Object.assign({}, this.opts);
	      if (z) {
	        intlOpts.timeZone = z;
	      }
	      this.dtf = getCachedDTF(intl, intlOpts);
	    }
	  }

	  format() {
	    if (this.hasIntl) {
	      return this.dtf.format(this.dt.toJSDate());
	    } else {
	      const tokenFormat = formatString(this.opts),
	        loc = Locale.create("en-US");
	      return Formatter.create(loc).formatDateTimeFromString(this.dt, tokenFormat);
	    }
	  }

	  formatToParts() {
	    if (this.hasIntl && hasFormatToParts()) {
	      return this.dtf.formatToParts(this.dt.toJSDate());
	    } else {
	      // This is kind of a cop out. We actually could do this for English. However, we couldn't do it for intl strings
	      // and IMO it's too weird to have an uncanny valley like that
	      return [];
	    }
	  }

	  resolvedOptions() {
	    if (this.hasIntl) {
	      return this.dtf.resolvedOptions();
	    } else {
	      return {
	        locale: "en-US",
	        numberingSystem: "latn",
	        outputCalendar: "gregory"
	      };
	    }
	  }
	}

	/**
	 * @private
	 */
	class PolyRelFormatter {
	  constructor(intl, isEnglish, opts) {
	    this.opts = Object.assign({ style: "long" }, opts);
	    if (!isEnglish && hasRelative()) {
	      this.rtf = getCachedRTF(intl, opts);
	    }
	  }

	  format(count, unit) {
	    if (this.rtf) {
	      return this.rtf.format(count, unit);
	    } else {
	      return formatRelativeTime(unit, count, this.opts.numeric, this.opts.style !== "long");
	    }
	  }

	  formatToParts(count, unit) {
	    if (this.rtf) {
	      return this.rtf.formatToParts(count, unit);
	    } else {
	      return [];
	    }
	  }
	}

	/**
	 * @private
	 */

	class Locale {
	  static fromOpts(opts) {
	    return Locale.create(opts.locale, opts.numberingSystem, opts.outputCalendar, opts.defaultToEN);
	  }

	  static create(locale, numberingSystem, outputCalendar, defaultToEN = false) {
	    const specifiedLocale = locale || Settings.defaultLocale,
	      // the system locale is useful for human readable strings but annoying for parsing/formatting known formats
	      localeR = specifiedLocale || (defaultToEN ? "en-US" : systemLocale()),
	      numberingSystemR = numberingSystem || Settings.defaultNumberingSystem,
	      outputCalendarR = outputCalendar || Settings.defaultOutputCalendar;
	    return new Locale(localeR, numberingSystemR, outputCalendarR, specifiedLocale);
	  }

	  static resetCache() {
	    sysLocaleCache = null;
	    intlDTCache = {};
	    intlNumCache = {};
	    intlRelCache = {};
	  }

	  static fromObject({ locale, numberingSystem, outputCalendar } = {}) {
	    return Locale.create(locale, numberingSystem, outputCalendar);
	  }

	  constructor(locale, numbering, outputCalendar, specifiedLocale) {
	    const [parsedLocale, parsedNumberingSystem, parsedOutputCalendar] = parseLocaleString(locale);

	    this.locale = parsedLocale;
	    this.numberingSystem = numbering || parsedNumberingSystem || null;
	    this.outputCalendar = outputCalendar || parsedOutputCalendar || null;
	    this.intl = intlConfigString(this.locale, this.numberingSystem, this.outputCalendar);

	    this.weekdaysCache = { format: {}, standalone: {} };
	    this.monthsCache = { format: {}, standalone: {} };
	    this.meridiemCache = null;
	    this.eraCache = {};

	    this.specifiedLocale = specifiedLocale;
	    this.fastNumbersCached = null;
	  }

	  get fastNumbers() {
	    if (this.fastNumbersCached == null) {
	      this.fastNumbersCached = supportsFastNumbers(this);
	    }

	    return this.fastNumbersCached;
	  }

	  listingMode(defaultOK = true) {
	    const intl = hasIntl(),
	      hasFTP = intl && hasFormatToParts(),
	      isActuallyEn = this.isEnglish(),
	      hasNoWeirdness =
	        (this.numberingSystem === null || this.numberingSystem === "latn") &&
	        (this.outputCalendar === null || this.outputCalendar === "gregory");

	    if (!hasFTP && !(isActuallyEn && hasNoWeirdness) && !defaultOK) {
	      return "error";
	    } else if (!hasFTP || (isActuallyEn && hasNoWeirdness)) {
	      return "en";
	    } else {
	      return "intl";
	    }
	  }

	  clone(alts) {
	    if (!alts || Object.getOwnPropertyNames(alts).length === 0) {
	      return this;
	    } else {
	      return Locale.create(
	        alts.locale || this.specifiedLocale,
	        alts.numberingSystem || this.numberingSystem,
	        alts.outputCalendar || this.outputCalendar,
	        alts.defaultToEN || false
	      );
	    }
	  }

	  redefaultToEN(alts = {}) {
	    return this.clone(Object.assign({}, alts, { defaultToEN: true }));
	  }

	  redefaultToSystem(alts = {}) {
	    return this.clone(Object.assign({}, alts, { defaultToEN: false }));
	  }

	  months(length, format = false, defaultOK = true) {
	    return listStuff(this, length, defaultOK, months, () => {
	      const intl = format ? { month: length, day: "numeric" } : { month: length },
	        formatStr = format ? "format" : "standalone";
	      if (!this.monthsCache[formatStr][length]) {
	        this.monthsCache[formatStr][length] = mapMonths(dt => this.extract(dt, intl, "month"));
	      }
	      return this.monthsCache[formatStr][length];
	    });
	  }

	  weekdays(length, format = false, defaultOK = true) {
	    return listStuff(this, length, defaultOK, weekdays, () => {
	      const intl = format
	          ? { weekday: length, year: "numeric", month: "long", day: "numeric" }
	          : { weekday: length },
	        formatStr = format ? "format" : "standalone";
	      if (!this.weekdaysCache[formatStr][length]) {
	        this.weekdaysCache[formatStr][length] = mapWeekdays(dt =>
	          this.extract(dt, intl, "weekday")
	        );
	      }
	      return this.weekdaysCache[formatStr][length];
	    });
	  }

	  meridiems(defaultOK = true) {
	    return listStuff(
	      this,
	      undefined,
	      defaultOK,
	      () => meridiems,
	      () => {
	        // In theory there could be aribitrary day periods. We're gonna assume there are exactly two
	        // for AM and PM. This is probably wrong, but it's makes parsing way easier.
	        if (!this.meridiemCache) {
	          const intl = { hour: "numeric", hour12: true };
	          this.meridiemCache = [DateTime.utc(2016, 11, 13, 9), DateTime.utc(2016, 11, 13, 19)].map(
	            dt => this.extract(dt, intl, "dayperiod")
	          );
	        }

	        return this.meridiemCache;
	      }
	    );
	  }

	  eras(length, defaultOK = true) {
	    return listStuff(this, length, defaultOK, eras, () => {
	      const intl = { era: length };

	      // This is utter bullshit. Different calendars are going to define eras totally differently. What I need is the minimum set of dates
	      // to definitely enumerate them.
	      if (!this.eraCache[length]) {
	        this.eraCache[length] = [DateTime.utc(-40, 1, 1), DateTime.utc(2017, 1, 1)].map(dt =>
	          this.extract(dt, intl, "era")
	        );
	      }

	      return this.eraCache[length];
	    });
	  }

	  extract(dt, intlOpts, field) {
	    const df = this.dtFormatter(dt, intlOpts),
	      results = df.formatToParts(),
	      matching = results.find(m => m.type.toLowerCase() === field);
	    return matching ? matching.value : null;
	  }

	  numberFormatter(opts = {}) {
	    // this forcesimple option is never used (the only caller short-circuits on it, but it seems safer to leave)
	    // (in contrast, the rest of the condition is used heavily)
	    return new PolyNumberFormatter(this.intl, opts.forceSimple || this.fastNumbers, opts);
	  }

	  dtFormatter(dt, intlOpts = {}) {
	    return new PolyDateFormatter(dt, this.intl, intlOpts);
	  }

	  relFormatter(opts = {}) {
	    return new PolyRelFormatter(this.intl, this.isEnglish(), opts);
	  }

	  isEnglish() {
	    return (
	      this.locale === "en" ||
	      this.locale.toLowerCase() === "en-us" ||
	      (hasIntl() && new Intl.DateTimeFormat(this.intl).resolvedOptions().locale.startsWith("en-us"))
	    );
	  }

	  equals(other) {
	    return (
	      this.locale === other.locale &&
	      this.numberingSystem === other.numberingSystem &&
	      this.outputCalendar === other.outputCalendar
	    );
	  }
	}

	/*
	 * This file handles parsing for well-specified formats. Here's how it works:
	 * Two things go into parsing: a regex to match with and an extractor to take apart the groups in the match.
	 * An extractor is just a function that takes a regex match array and returns a { year: ..., month: ... } object
	 * parse() does the work of executing the regex and applying the extractor. It takes multiple regex/extractor pairs to try in sequence.
	 * Extractors can take a "cursor" representing the offset in the match to look at. This makes it easy to combine extractors.
	 * combineExtractors() does the work of combining them, keeping track of the cursor through multiple extractions.
	 * Some extractions are super dumb and simpleParse and fromStrings help DRY them.
	 */

	function combineRegexes(...regexes) {
	  const full = regexes.reduce((f, r) => f + r.source, "");
	  return RegExp(`^${full}$`);
	}

	function combineExtractors(...extractors) {
	  return m =>
	    extractors
	      .reduce(
	        ([mergedVals, mergedZone, cursor], ex) => {
	          const [val, zone, next] = ex(m, cursor);
	          return [Object.assign(mergedVals, val), mergedZone || zone, next];
	        },
	        [{}, null, 1]
	      )
	      .slice(0, 2);
	}

	function parse(s, ...patterns) {
	  if (s == null) {
	    return [null, null];
	  }

	  for (const [regex, extractor] of patterns) {
	    const m = regex.exec(s);
	    if (m) {
	      return extractor(m);
	    }
	  }
	  return [null, null];
	}

	function simpleParse(...keys) {
	  return (match, cursor) => {
	    const ret = {};
	    let i;

	    for (i = 0; i < keys.length; i++) {
	      ret[keys[i]] = parseInteger(match[cursor + i]);
	    }
	    return [ret, null, cursor + i];
	  };
	}

	// ISO and SQL parsing
	const offsetRegex = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/,
	  isoTimeBaseRegex = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,9}))?)?)?/,
	  isoTimeRegex = RegExp(`${isoTimeBaseRegex.source}${offsetRegex.source}?`),
	  isoTimeExtensionRegex = RegExp(`(?:T${isoTimeRegex.source})?`),
	  isoYmdRegex = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/,
	  isoWeekRegex = /(\d{4})-?W(\d\d)(?:-?(\d))?/,
	  isoOrdinalRegex = /(\d{4})-?(\d{3})/,
	  extractISOWeekData = simpleParse("weekYear", "weekNumber", "weekDay"),
	  extractISOOrdinalData = simpleParse("year", "ordinal"),
	  sqlYmdRegex = /(\d{4})-(\d\d)-(\d\d)/, // dumbed-down version of the ISO one
	  sqlTimeRegex = RegExp(
	    `${isoTimeBaseRegex.source} ?(?:${offsetRegex.source}|(${ianaRegex.source}))?`
	  ),
	  sqlTimeExtensionRegex = RegExp(`(?: ${sqlTimeRegex.source})?`);

	function int(match, pos, fallback) {
	  const m = match[pos];
	  return isUndefined(m) ? fallback : parseInteger(m);
	}

	function extractISOYmd(match, cursor) {
	  const item = {
	    year: int(match, cursor),
	    month: int(match, cursor + 1, 1),
	    day: int(match, cursor + 2, 1)
	  };

	  return [item, null, cursor + 3];
	}

	function extractISOTime(match, cursor) {
	  const item = {
	    hour: int(match, cursor, 0),
	    minute: int(match, cursor + 1, 0),
	    second: int(match, cursor + 2, 0),
	    millisecond: parseMillis(match[cursor + 3])
	  };

	  return [item, null, cursor + 4];
	}

	function extractISOOffset(match, cursor) {
	  const local = !match[cursor] && !match[cursor + 1],
	    fullOffset = signedOffset(match[cursor + 1], match[cursor + 2]),
	    zone = local ? null : FixedOffsetZone.instance(fullOffset);
	  return [{}, zone, cursor + 3];
	}

	function extractIANAZone(match, cursor) {
	  const zone = match[cursor] ? IANAZone.create(match[cursor]) : null;
	  return [{}, zone, cursor + 1];
	}

	// ISO duration parsing

	const isoDuration = /^-?P(?:(?:(-?\d{1,9})Y)?(?:(-?\d{1,9})M)?(?:(-?\d{1,9})W)?(?:(-?\d{1,9})D)?(?:T(?:(-?\d{1,9})H)?(?:(-?\d{1,9})M)?(?:(-?\d{1,9})(?:[.,](-?\d{1,9}))?S)?)?)$/;

	function extractISODuration(match) {
	  const [
	    s,
	    yearStr,
	    monthStr,
	    weekStr,
	    dayStr,
	    hourStr,
	    minuteStr,
	    secondStr,
	    millisecondsStr
	  ] = match;

	  const hasNegativePrefix = s[0] === "-";

	  const maybeNegate = num => (num && hasNegativePrefix ? -num : num);

	  return [
	    {
	      years: maybeNegate(parseInteger(yearStr)),
	      months: maybeNegate(parseInteger(monthStr)),
	      weeks: maybeNegate(parseInteger(weekStr)),
	      days: maybeNegate(parseInteger(dayStr)),
	      hours: maybeNegate(parseInteger(hourStr)),
	      minutes: maybeNegate(parseInteger(minuteStr)),
	      seconds: maybeNegate(parseInteger(secondStr)),
	      milliseconds: maybeNegate(parseMillis(millisecondsStr))
	    }
	  ];
	}

	// These are a little braindead. EDT *should* tell us that we're in, say, America/New_York
	// and not just that we're in -240 *right now*. But since I don't think these are used that often
	// I'm just going to ignore that
	const obsOffsets = {
	  GMT: 0,
	  EDT: -4 * 60,
	  EST: -5 * 60,
	  CDT: -5 * 60,
	  CST: -6 * 60,
	  MDT: -6 * 60,
	  MST: -7 * 60,
	  PDT: -7 * 60,
	  PST: -8 * 60
	};

	function fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
	  const result = {
	    year: yearStr.length === 2 ? untruncateYear(parseInteger(yearStr)) : parseInteger(yearStr),
	    month: monthsShort.indexOf(monthStr) + 1,
	    day: parseInteger(dayStr),
	    hour: parseInteger(hourStr),
	    minute: parseInteger(minuteStr)
	  };

	  if (secondStr) result.second = parseInteger(secondStr);
	  if (weekdayStr) {
	    result.weekday =
	      weekdayStr.length > 3
	        ? weekdaysLong.indexOf(weekdayStr) + 1
	        : weekdaysShort.indexOf(weekdayStr) + 1;
	  }

	  return result;
	}

	// RFC 2822/5322
	const rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;

	function extractRFC2822(match) {
	  const [
	      ,
	      weekdayStr,
	      dayStr,
	      monthStr,
	      yearStr,
	      hourStr,
	      minuteStr,
	      secondStr,
	      obsOffset,
	      milOffset,
	      offHourStr,
	      offMinuteStr
	    ] = match,
	    result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);

	  let offset;
	  if (obsOffset) {
	    offset = obsOffsets[obsOffset];
	  } else if (milOffset) {
	    offset = 0;
	  } else {
	    offset = signedOffset(offHourStr, offMinuteStr);
	  }

	  return [result, new FixedOffsetZone(offset)];
	}

	function preprocessRFC2822(s) {
	  // Remove comments and folding whitespace and replace multiple-spaces with a single space
	  return s
	    .replace(/\([^)]*\)|[\n\t]/g, " ")
	    .replace(/(\s\s+)/g, " ")
	    .trim();
	}

	// http date

	const rfc1123 = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/,
	  rfc850 = /^(Monday|Tuesday|Wedsday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/,
	  ascii = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;

	function extractRFC1123Or850(match) {
	  const [, weekdayStr, dayStr, monthStr, yearStr, hourStr, minuteStr, secondStr] = match,
	    result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
	  return [result, FixedOffsetZone.utcInstance];
	}

	function extractASCII(match) {
	  const [, weekdayStr, monthStr, dayStr, hourStr, minuteStr, secondStr, yearStr] = match,
	    result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
	  return [result, FixedOffsetZone.utcInstance];
	}

	const isoYmdWithTimeExtensionRegex = combineRegexes(isoYmdRegex, isoTimeExtensionRegex);
	const isoWeekWithTimeExtensionRegex = combineRegexes(isoWeekRegex, isoTimeExtensionRegex);
	const isoOrdinalWithTimeExtensionRegex = combineRegexes(isoOrdinalRegex, isoTimeExtensionRegex);
	const isoTimeCombinedRegex = combineRegexes(isoTimeRegex);

	const extractISOYmdTimeAndOffset = combineExtractors(
	  extractISOYmd,
	  extractISOTime,
	  extractISOOffset
	);
	const extractISOWeekTimeAndOffset = combineExtractors(
	  extractISOWeekData,
	  extractISOTime,
	  extractISOOffset
	);
	const extractISOOrdinalDataAndTime = combineExtractors(extractISOOrdinalData, extractISOTime);
	const extractISOTimeAndOffset = combineExtractors(extractISOTime, extractISOOffset);

	/**
	 * @private
	 */

	function parseISODate(s) {
	  return parse(
	    s,
	    [isoYmdWithTimeExtensionRegex, extractISOYmdTimeAndOffset],
	    [isoWeekWithTimeExtensionRegex, extractISOWeekTimeAndOffset],
	    [isoOrdinalWithTimeExtensionRegex, extractISOOrdinalDataAndTime],
	    [isoTimeCombinedRegex, extractISOTimeAndOffset]
	  );
	}

	function parseRFC2822Date(s) {
	  return parse(preprocessRFC2822(s), [rfc2822, extractRFC2822]);
	}

	function parseHTTPDate(s) {
	  return parse(
	    s,
	    [rfc1123, extractRFC1123Or850],
	    [rfc850, extractRFC1123Or850],
	    [ascii, extractASCII]
	  );
	}

	function parseISODuration(s) {
	  return parse(s, [isoDuration, extractISODuration]);
	}

	const sqlYmdWithTimeExtensionRegex = combineRegexes(sqlYmdRegex, sqlTimeExtensionRegex);
	const sqlTimeCombinedRegex = combineRegexes(sqlTimeRegex);

	const extractISOYmdTimeOffsetAndIANAZone = combineExtractors(
	  extractISOYmd,
	  extractISOTime,
	  extractISOOffset,
	  extractIANAZone
	);
	const extractISOTimeOffsetAndIANAZone = combineExtractors(
	  extractISOTime,
	  extractISOOffset,
	  extractIANAZone
	);

	function parseSQL(s) {
	  return parse(
	    s,
	    [sqlYmdWithTimeExtensionRegex, extractISOYmdTimeOffsetAndIANAZone],
	    [sqlTimeCombinedRegex, extractISOTimeOffsetAndIANAZone]
	  );
	}

	const INVALID = "Invalid Duration";

	// unit conversion constants
	const lowOrderMatrix = {
	    weeks: {
	      days: 7,
	      hours: 7 * 24,
	      minutes: 7 * 24 * 60,
	      seconds: 7 * 24 * 60 * 60,
	      milliseconds: 7 * 24 * 60 * 60 * 1000
	    },
	    days: {
	      hours: 24,
	      minutes: 24 * 60,
	      seconds: 24 * 60 * 60,
	      milliseconds: 24 * 60 * 60 * 1000
	    },
	    hours: { minutes: 60, seconds: 60 * 60, milliseconds: 60 * 60 * 1000 },
	    minutes: { seconds: 60, milliseconds: 60 * 1000 },
	    seconds: { milliseconds: 1000 }
	  },
	  casualMatrix = Object.assign(
	    {
	      years: {
	        months: 12,
	        weeks: 52,
	        days: 365,
	        hours: 365 * 24,
	        minutes: 365 * 24 * 60,
	        seconds: 365 * 24 * 60 * 60,
	        milliseconds: 365 * 24 * 60 * 60 * 1000
	      },
	      quarters: {
	        months: 3,
	        weeks: 13,
	        days: 91,
	        hours: 91 * 24,
	        minutes: 91 * 24 * 60,
	        milliseconds: 91 * 24 * 60 * 60 * 1000
	      },
	      months: {
	        weeks: 4,
	        days: 30,
	        hours: 30 * 24,
	        minutes: 30 * 24 * 60,
	        seconds: 30 * 24 * 60 * 60,
	        milliseconds: 30 * 24 * 60 * 60 * 1000
	      }
	    },
	    lowOrderMatrix
	  ),
	  daysInYearAccurate = 146097.0 / 400,
	  daysInMonthAccurate = 146097.0 / 4800,
	  accurateMatrix = Object.assign(
	    {
	      years: {
	        months: 12,
	        weeks: daysInYearAccurate / 7,
	        days: daysInYearAccurate,
	        hours: daysInYearAccurate * 24,
	        minutes: daysInYearAccurate * 24 * 60,
	        seconds: daysInYearAccurate * 24 * 60 * 60,
	        milliseconds: daysInYearAccurate * 24 * 60 * 60 * 1000
	      },
	      quarters: {
	        months: 3,
	        weeks: daysInYearAccurate / 28,
	        days: daysInYearAccurate / 4,
	        hours: (daysInYearAccurate * 24) / 4,
	        minutes: (daysInYearAccurate * 24 * 60) / 4,
	        seconds: (daysInYearAccurate * 24 * 60 * 60) / 4,
	        milliseconds: (daysInYearAccurate * 24 * 60 * 60 * 1000) / 4
	      },
	      months: {
	        weeks: daysInMonthAccurate / 7,
	        days: daysInMonthAccurate,
	        hours: daysInMonthAccurate * 24,
	        minutes: daysInMonthAccurate * 24 * 60,
	        seconds: daysInMonthAccurate * 24 * 60 * 60,
	        milliseconds: daysInMonthAccurate * 24 * 60 * 60 * 1000
	      }
	    },
	    lowOrderMatrix
	  );

	// units ordered by size
	const orderedUnits = [
	  "years",
	  "quarters",
	  "months",
	  "weeks",
	  "days",
	  "hours",
	  "minutes",
	  "seconds",
	  "milliseconds"
	];

	const reverseUnits = orderedUnits.slice(0).reverse();

	// clone really means "create another instance just like this one, but with these changes"
	function clone(dur, alts, clear = false) {
	  // deep merge for vals
	  const conf = {
	    values: clear ? alts.values : Object.assign({}, dur.values, alts.values || {}),
	    loc: dur.loc.clone(alts.loc),
	    conversionAccuracy: alts.conversionAccuracy || dur.conversionAccuracy
	  };
	  return new Duration(conf);
	}

	function antiTrunc(n) {
	  return n < 0 ? Math.floor(n) : Math.ceil(n);
	}

	// NB: mutates parameters
	function convert(matrix, fromMap, fromUnit, toMap, toUnit) {
	  const conv = matrix[toUnit][fromUnit],
	    raw = fromMap[fromUnit] / conv,
	    sameSign = Math.sign(raw) === Math.sign(toMap[toUnit]),
	    // ok, so this is wild, but see the matrix in the tests
	    added =
	      !sameSign && toMap[toUnit] !== 0 && Math.abs(raw) <= 1 ? antiTrunc(raw) : Math.trunc(raw);
	  toMap[toUnit] += added;
	  fromMap[fromUnit] -= added * conv;
	}

	// NB: mutates parameters
	function normalizeValues(matrix, vals) {
	  reverseUnits.reduce((previous, current) => {
	    if (!isUndefined(vals[current])) {
	      if (previous) {
	        convert(matrix, vals, previous, vals, current);
	      }
	      return current;
	    } else {
	      return previous;
	    }
	  }, null);
	}

	/**
	 * A Duration object represents a period of time, like "2 months" or "1 day, 1 hour". Conceptually, it's just a map of units to their quantities, accompanied by some additional configuration and methods for creating, parsing, interrogating, transforming, and formatting them. They can be used on their own or in conjunction with other Luxon types; for example, you can use {@link DateTime.plus} to add a Duration object to a DateTime, producing another DateTime.
	 *
	 * Here is a brief overview of commonly used methods and getters in Duration:
	 *
	 * * **Creation** To create a Duration, use {@link Duration.fromMillis}, {@link Duration.fromObject}, or {@link Duration.fromISO}.
	 * * **Unit values** See the {@link Duration.years}, {@link Duration.months}, {@link Duration.weeks}, {@link Duration.days}, {@link Duration.hours}, {@link Duration.minutes}, {@link Duration.seconds}, {@link Duration.milliseconds} accessors.
	 * * **Configuration** See  {@link Duration.locale} and {@link Duration.numberingSystem} accessors.
	 * * **Transformation** To create new Durations out of old ones use {@link Duration.plus}, {@link Duration.minus}, {@link Duration.normalize}, {@link Duration.set}, {@link Duration.reconfigure}, {@link Duration.shiftTo}, and {@link Duration.negate}.
	 * * **Output** To convert the Duration into other representations, see {@link Duration.as}, {@link Duration.toISO}, {@link Duration.toFormat}, and {@link Duration.toJSON}
	 *
	 * There's are more methods documented below. In addition, for more information on subtler topics like internationalization and validity, see the external documentation.
	 */
	class Duration {
	  /**
	   * @private
	   */
	  constructor(config) {
	    const accurate = config.conversionAccuracy === "longterm" || false;
	    /**
	     * @access private
	     */
	    this.values = config.values;
	    /**
	     * @access private
	     */
	    this.loc = config.loc || Locale.create();
	    /**
	     * @access private
	     */
	    this.conversionAccuracy = accurate ? "longterm" : "casual";
	    /**
	     * @access private
	     */
	    this.invalid = config.invalid || null;
	    /**
	     * @access private
	     */
	    this.matrix = accurate ? accurateMatrix : casualMatrix;
	    /**
	     * @access private
	     */
	    this.isLuxonDuration = true;
	  }

	  /**
	   * Create Duration from a number of milliseconds.
	   * @param {number} count of milliseconds
	   * @param {Object} opts - options for parsing
	   * @param {string} [opts.locale='en-US'] - the locale to use
	   * @param {string} opts.numberingSystem - the numbering system to use
	   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
	   * @return {Duration}
	   */
	  static fromMillis(count, opts) {
	    return Duration.fromObject(Object.assign({ milliseconds: count }, opts));
	  }

	  /**
	   * Create a Duration from a Javascript object with keys like 'years' and 'hours.
	   * If this object is empty then a zero milliseconds duration is returned.
	   * @param {Object} obj - the object to create the DateTime from
	   * @param {number} obj.years
	   * @param {number} obj.quarters
	   * @param {number} obj.months
	   * @param {number} obj.weeks
	   * @param {number} obj.days
	   * @param {number} obj.hours
	   * @param {number} obj.minutes
	   * @param {number} obj.seconds
	   * @param {number} obj.milliseconds
	   * @param {string} [obj.locale='en-US'] - the locale to use
	   * @param {string} obj.numberingSystem - the numbering system to use
	   * @param {string} [obj.conversionAccuracy='casual'] - the conversion system to use
	   * @return {Duration}
	   */
	  static fromObject(obj) {
	    if (obj == null || typeof obj !== "object") {
	      throw new InvalidArgumentError(
	        `Duration.fromObject: argument expected to be an object, got ${
          obj === null ? "null" : typeof obj
        }`
	      );
	    }
	    return new Duration({
	      values: normalizeObject(obj, Duration.normalizeUnit, [
	        "locale",
	        "numberingSystem",
	        "conversionAccuracy",
	        "zone" // a bit of debt; it's super inconvenient internally not to be able to blindly pass this
	      ]),
	      loc: Locale.fromObject(obj),
	      conversionAccuracy: obj.conversionAccuracy
	    });
	  }

	  /**
	   * Create a Duration from an ISO 8601 duration string.
	   * @param {string} text - text to parse
	   * @param {Object} opts - options for parsing
	   * @param {string} [opts.locale='en-US'] - the locale to use
	   * @param {string} opts.numberingSystem - the numbering system to use
	   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
	   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
	   * @example Duration.fromISO('P3Y6M1W4DT12H30M5S').toObject() //=> { years: 3, months: 6, weeks: 1, days: 4, hours: 12, minutes: 30, seconds: 5 }
	   * @example Duration.fromISO('PT23H').toObject() //=> { hours: 23 }
	   * @example Duration.fromISO('P5Y3M').toObject() //=> { years: 5, months: 3 }
	   * @return {Duration}
	   */
	  static fromISO(text, opts) {
	    const [parsed] = parseISODuration(text);
	    if (parsed) {
	      const obj = Object.assign(parsed, opts);
	      return Duration.fromObject(obj);
	    } else {
	      return Duration.invalid("unparsable", `the input "${text}" can't be parsed as ISO 8601`);
	    }
	  }

	  /**
	   * Create an invalid Duration.
	   * @param {string} reason - simple string of why this datetime is invalid. Should not contain parameters or anything else data-dependent
	   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
	   * @return {Duration}
	   */
	  static invalid(reason, explanation = null) {
	    if (!reason) {
	      throw new InvalidArgumentError("need to specify a reason the Duration is invalid");
	    }

	    const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);

	    if (Settings.throwOnInvalid) {
	      throw new InvalidDurationError(invalid);
	    } else {
	      return new Duration({ invalid });
	    }
	  }

	  /**
	   * @private
	   */
	  static normalizeUnit(unit) {
	    const normalized = {
	      year: "years",
	      years: "years",
	      quarter: "quarters",
	      quarters: "quarters",
	      month: "months",
	      months: "months",
	      week: "weeks",
	      weeks: "weeks",
	      day: "days",
	      days: "days",
	      hour: "hours",
	      hours: "hours",
	      minute: "minutes",
	      minutes: "minutes",
	      second: "seconds",
	      seconds: "seconds",
	      millisecond: "milliseconds",
	      milliseconds: "milliseconds"
	    }[unit ? unit.toLowerCase() : unit];

	    if (!normalized) throw new InvalidUnitError(unit);

	    return normalized;
	  }

	  /**
	   * Check if an object is a Duration. Works across context boundaries
	   * @param {object} o
	   * @return {boolean}
	   */
	  static isDuration(o) {
	    return (o && o.isLuxonDuration) || false;
	  }

	  /**
	   * Get  the locale of a Duration, such 'en-GB'
	   * @type {string}
	   */
	  get locale() {
	    return this.isValid ? this.loc.locale : null;
	  }

	  /**
	   * Get the numbering system of a Duration, such 'beng'. The numbering system is used when formatting the Duration
	   *
	   * @type {string}
	   */
	  get numberingSystem() {
	    return this.isValid ? this.loc.numberingSystem : null;
	  }

	  /**
	   * Returns a string representation of this Duration formatted according to the specified format string. You may use these tokens:
	   * * `S` for milliseconds
	   * * `s` for seconds
	   * * `m` for minutes
	   * * `h` for hours
	   * * `d` for days
	   * * `M` for months
	   * * `y` for years
	   * Notes:
	   * * Add padding by repeating the token, e.g. "yy" pads the years to two digits, "hhhh" pads the hours out to four digits
	   * * The duration will be converted to the set of units in the format string using {@link Duration.shiftTo} and the Durations's conversion accuracy setting.
	   * @param {string} fmt - the format string
	   * @param {Object} opts - options
	   * @param {boolean} [opts.floor=true] - floor numerical values
	   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("y d s") //=> "1 6 2"
	   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("yy dd sss") //=> "01 06 002"
	   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("M S") //=> "12 518402000"
	   * @return {string}
	   */
	  toFormat(fmt, opts = {}) {
	    // reverse-compat since 1.2; we always round down now, never up, and we do it by default
	    const fmtOpts = Object.assign({}, opts, {
	      floor: opts.round !== false && opts.floor !== false
	    });
	    return this.isValid
	      ? Formatter.create(this.loc, fmtOpts).formatDurationFromString(this, fmt)
	      : INVALID;
	  }

	  /**
	   * Returns a Javascript object with this Duration's values.
	   * @param opts - options for generating the object
	   * @param {boolean} [opts.includeConfig=false] - include configuration attributes in the output
	   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toObject() //=> { years: 1, days: 6, seconds: 2 }
	   * @return {Object}
	   */
	  toObject(opts = {}) {
	    if (!this.isValid) return {};

	    const base = Object.assign({}, this.values);

	    if (opts.includeConfig) {
	      base.conversionAccuracy = this.conversionAccuracy;
	      base.numberingSystem = this.loc.numberingSystem;
	      base.locale = this.loc.locale;
	    }
	    return base;
	  }

	  /**
	   * Returns an ISO 8601-compliant string representation of this Duration.
	   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
	   * @example Duration.fromObject({ years: 3, seconds: 45 }).toISO() //=> 'P3YT45S'
	   * @example Duration.fromObject({ months: 4, seconds: 45 }).toISO() //=> 'P4MT45S'
	   * @example Duration.fromObject({ months: 5 }).toISO() //=> 'P5M'
	   * @example Duration.fromObject({ minutes: 5 }).toISO() //=> 'PT5M'
	   * @example Duration.fromObject({ milliseconds: 6 }).toISO() //=> 'PT0.006S'
	   * @return {string}
	   */
	  toISO() {
	    // we could use the formatter, but this is an easier way to get the minimum string
	    if (!this.isValid) return null;

	    let s = "P";
	    if (this.years !== 0) s += this.years + "Y";
	    if (this.months !== 0 || this.quarters !== 0) s += this.months + this.quarters * 3 + "M";
	    if (this.weeks !== 0) s += this.weeks + "W";
	    if (this.days !== 0) s += this.days + "D";
	    if (this.hours !== 0 || this.minutes !== 0 || this.seconds !== 0 || this.milliseconds !== 0)
	      s += "T";
	    if (this.hours !== 0) s += this.hours + "H";
	    if (this.minutes !== 0) s += this.minutes + "M";
	    if (this.seconds !== 0 || this.milliseconds !== 0)
	      // this will handle "floating point madness" by removing extra decimal places
	      // https://stackoverflow.com/questions/588004/is-floating-point-math-broken
	      s += roundTo(this.seconds + this.milliseconds / 1000, 3) + "S";
	    if (s === "P") s += "T0S";
	    return s;
	  }

	  /**
	   * Returns an ISO 8601 representation of this Duration appropriate for use in JSON.
	   * @return {string}
	   */
	  toJSON() {
	    return this.toISO();
	  }

	  /**
	   * Returns an ISO 8601 representation of this Duration appropriate for use in debugging.
	   * @return {string}
	   */
	  toString() {
	    return this.toISO();
	  }

	  /**
	   * Returns an milliseconds value of this Duration.
	   * @return {number}
	   */
	  valueOf() {
	    return this.as("milliseconds");
	  }

	  /**
	   * Make this Duration longer by the specified amount. Return a newly-constructed Duration.
	   * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
	   * @return {Duration}
	   */
	  plus(duration) {
	    if (!this.isValid) return this;

	    const dur = friendlyDuration(duration),
	      result = {};

	    for (const k of orderedUnits) {
	      if (hasOwnProperty(dur.values, k) || hasOwnProperty(this.values, k)) {
	        result[k] = dur.get(k) + this.get(k);
	      }
	    }

	    return clone(this, { values: result }, true);
	  }

	  /**
	   * Make this Duration shorter by the specified amount. Return a newly-constructed Duration.
	   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
	   * @return {Duration}
	   */
	  minus(duration) {
	    if (!this.isValid) return this;

	    const dur = friendlyDuration(duration);
	    return this.plus(dur.negate());
	  }

	  /**
	   * Scale this Duration by the specified amount. Return a newly-constructed Duration.
	   * @param {function} fn - The function to apply to each unit. Arity is 1 or 2: the value of the unit and, optionally, the unit name. Must return a number.
	   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnit(x => x * 2) //=> { hours: 2, minutes: 60 }
	   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnit((x, u) => u === "hour" ? x * 2 : x) //=> { hours: 2, minutes: 30 }
	   * @return {Duration}
	   */
	  mapUnits(fn) {
	    if (!this.isValid) return this;
	    const result = {};
	    for (const k of Object.keys(this.values)) {
	      result[k] = asNumber(fn(this.values[k], k));
	    }
	    return clone(this, { values: result }, true);
	  }

	  /**
	   * Get the value of unit.
	   * @param {string} unit - a unit such as 'minute' or 'day'
	   * @example Duration.fromObject({years: 2, days: 3}).years //=> 2
	   * @example Duration.fromObject({years: 2, days: 3}).months //=> 0
	   * @example Duration.fromObject({years: 2, days: 3}).days //=> 3
	   * @return {number}
	   */
	  get(unit) {
	    return this[Duration.normalizeUnit(unit)];
	  }

	  /**
	   * "Set" the values of specified units. Return a newly-constructed Duration.
	   * @param {Object} values - a mapping of units to numbers
	   * @example dur.set({ years: 2017 })
	   * @example dur.set({ hours: 8, minutes: 30 })
	   * @return {Duration}
	   */
	  set(values) {
	    if (!this.isValid) return this;

	    const mixed = Object.assign(this.values, normalizeObject(values, Duration.normalizeUnit, []));
	    return clone(this, { values: mixed });
	  }

	  /**
	   * "Set" the locale and/or numberingSystem.  Returns a newly-constructed Duration.
	   * @example dur.reconfigure({ locale: 'en-GB' })
	   * @return {Duration}
	   */
	  reconfigure({ locale, numberingSystem, conversionAccuracy } = {}) {
	    const loc = this.loc.clone({ locale, numberingSystem }),
	      opts = { loc };

	    if (conversionAccuracy) {
	      opts.conversionAccuracy = conversionAccuracy;
	    }

	    return clone(this, opts);
	  }

	  /**
	   * Return the length of the duration in the specified unit.
	   * @param {string} unit - a unit such as 'minutes' or 'days'
	   * @example Duration.fromObject({years: 1}).as('days') //=> 365
	   * @example Duration.fromObject({years: 1}).as('months') //=> 12
	   * @example Duration.fromObject({hours: 60}).as('days') //=> 2.5
	   * @return {number}
	   */
	  as(unit) {
	    return this.isValid ? this.shiftTo(unit).get(unit) : NaN;
	  }

	  /**
	   * Reduce this Duration to its canonical representation in its current units.
	   * @example Duration.fromObject({ years: 2, days: 5000 }).normalize().toObject() //=> { years: 15, days: 255 }
	   * @example Duration.fromObject({ hours: 12, minutes: -45 }).normalize().toObject() //=> { hours: 11, minutes: 15 }
	   * @return {Duration}
	   */
	  normalize() {
	    if (!this.isValid) return this;
	    const vals = this.toObject();
	    normalizeValues(this.matrix, vals);
	    return clone(this, { values: vals }, true);
	  }

	  /**
	   * Convert this Duration into its representation in a different set of units.
	   * @example Duration.fromObject({ hours: 1, seconds: 30 }).shiftTo('minutes', 'milliseconds').toObject() //=> { minutes: 60, milliseconds: 30000 }
	   * @return {Duration}
	   */
	  shiftTo(...units) {
	    if (!this.isValid) return this;

	    if (units.length === 0) {
	      return this;
	    }

	    units = units.map(u => Duration.normalizeUnit(u));

	    const built = {},
	      accumulated = {},
	      vals = this.toObject();
	    let lastUnit;

	    normalizeValues(this.matrix, vals);

	    for (const k of orderedUnits) {
	      if (units.indexOf(k) >= 0) {
	        lastUnit = k;

	        let own = 0;

	        // anything we haven't boiled down yet should get boiled to this unit
	        for (const ak in accumulated) {
	          own += this.matrix[ak][k] * accumulated[ak];
	          accumulated[ak] = 0;
	        }

	        // plus anything that's already in this unit
	        if (isNumber(vals[k])) {
	          own += vals[k];
	        }

	        const i = Math.trunc(own);
	        built[k] = i;
	        accumulated[k] = own - i; // we'd like to absorb these fractions in another unit

	        // plus anything further down the chain that should be rolled up in to this
	        for (const down in vals) {
	          if (orderedUnits.indexOf(down) > orderedUnits.indexOf(k)) {
	            convert(this.matrix, vals, down, built, k);
	          }
	        }
	        // otherwise, keep it in the wings to boil it later
	      } else if (isNumber(vals[k])) {
	        accumulated[k] = vals[k];
	      }
	    }

	    // anything leftover becomes the decimal for the last unit
	    // lastUnit must be defined since units is not empty
	    for (const key in accumulated) {
	      if (accumulated[key] !== 0) {
	        built[lastUnit] +=
	          key === lastUnit ? accumulated[key] : accumulated[key] / this.matrix[lastUnit][key];
	      }
	    }

	    return clone(this, { values: built }, true).normalize();
	  }

	  /**
	   * Return the negative of this Duration.
	   * @example Duration.fromObject({ hours: 1, seconds: 30 }).negate().toObject() //=> { hours: -1, seconds: -30 }
	   * @return {Duration}
	   */
	  negate() {
	    if (!this.isValid) return this;
	    const negated = {};
	    for (const k of Object.keys(this.values)) {
	      negated[k] = -this.values[k];
	    }
	    return clone(this, { values: negated }, true);
	  }

	  /**
	   * Get the years.
	   * @type {number}
	   */
	  get years() {
	    return this.isValid ? this.values.years || 0 : NaN;
	  }

	  /**
	   * Get the quarters.
	   * @type {number}
	   */
	  get quarters() {
	    return this.isValid ? this.values.quarters || 0 : NaN;
	  }

	  /**
	   * Get the months.
	   * @type {number}
	   */
	  get months() {
	    return this.isValid ? this.values.months || 0 : NaN;
	  }

	  /**
	   * Get the weeks
	   * @type {number}
	   */
	  get weeks() {
	    return this.isValid ? this.values.weeks || 0 : NaN;
	  }

	  /**
	   * Get the days.
	   * @type {number}
	   */
	  get days() {
	    return this.isValid ? this.values.days || 0 : NaN;
	  }

	  /**
	   * Get the hours.
	   * @type {number}
	   */
	  get hours() {
	    return this.isValid ? this.values.hours || 0 : NaN;
	  }

	  /**
	   * Get the minutes.
	   * @type {number}
	   */
	  get minutes() {
	    return this.isValid ? this.values.minutes || 0 : NaN;
	  }

	  /**
	   * Get the seconds.
	   * @return {number}
	   */
	  get seconds() {
	    return this.isValid ? this.values.seconds || 0 : NaN;
	  }

	  /**
	   * Get the milliseconds.
	   * @return {number}
	   */
	  get milliseconds() {
	    return this.isValid ? this.values.milliseconds || 0 : NaN;
	  }

	  /**
	   * Returns whether the Duration is invalid. Invalid durations are returned by diff operations
	   * on invalid DateTimes or Intervals.
	   * @return {boolean}
	   */
	  get isValid() {
	    return this.invalid === null;
	  }

	  /**
	   * Returns an error code if this Duration became invalid, or null if the Duration is valid
	   * @return {string}
	   */
	  get invalidReason() {
	    return this.invalid ? this.invalid.reason : null;
	  }

	  /**
	   * Returns an explanation of why this Duration became invalid, or null if the Duration is valid
	   * @type {string}
	   */
	  get invalidExplanation() {
	    return this.invalid ? this.invalid.explanation : null;
	  }

	  /**
	   * Equality check
	   * Two Durations are equal iff they have the same units and the same values for each unit.
	   * @param {Duration} other
	   * @return {boolean}
	   */
	  equals(other) {
	    if (!this.isValid || !other.isValid) {
	      return false;
	    }

	    if (!this.loc.equals(other.loc)) {
	      return false;
	    }

	    for (const u of orderedUnits) {
	      if (this.values[u] !== other.values[u]) {
	        return false;
	      }
	    }
	    return true;
	  }
	}

	/**
	 * @private
	 */
	function friendlyDuration(durationish) {
	  if (isNumber(durationish)) {
	    return Duration.fromMillis(durationish);
	  } else if (Duration.isDuration(durationish)) {
	    return durationish;
	  } else if (typeof durationish === "object") {
	    return Duration.fromObject(durationish);
	  } else {
	    throw new InvalidArgumentError(
	      `Unknown duration argument ${durationish} of type ${typeof durationish}`
	    );
	  }
	}

	const INVALID$1 = "Invalid Interval";

	// checks if the start is equal to or before the end
	function validateStartEnd(start, end) {
	  if (!start || !start.isValid) {
	    return Interval.invalid("missing or invalid start");
	  } else if (!end || !end.isValid) {
	    return Interval.invalid("missing or invalid end");
	  } else if (end < start) {
	    return Interval.invalid(
	      "end before start",
	      `The end of an interval must be after its start, but you had start=${start.toISO()} and end=${end.toISO()}`
	    );
	  } else {
	    return null;
	  }
	}

	/**
	 * An Interval object represents a half-open interval of time, where each endpoint is a {@link DateTime}. Conceptually, it's a container for those two endpoints, accompanied by methods for creating, parsing, interrogating, comparing, transforming, and formatting them.
	 *
	 * Here is a brief overview of the most commonly used methods and getters in Interval:
	 *
	 * * **Creation** To create an Interval, use {@link fromDateTimes}, {@link after}, {@link before}, or {@link fromISO}.
	 * * **Accessors** Use {@link start} and {@link end} to get the start and end.
	 * * **Interrogation** To analyze the Interval, use {@link count}, {@link length}, {@link hasSame}, {@link contains}, {@link isAfter}, or {@link isBefore}.
	 * * **Transformation** To create other Intervals out of this one, use {@link set}, {@link splitAt}, {@link splitBy}, {@link divideEqually}, {@link merge}, {@link xor}, {@link union}, {@link intersection}, or {@link difference}.
	 * * **Comparison** To compare this Interval to another one, use {@link equals}, {@link overlaps}, {@link abutsStart}, {@link abutsEnd}, {@link engulfs}
	 * * **Output** To convert the Interval into other representations, see {@link toString}, {@link toISO}, {@link toISODate}, {@link toISOTime}, {@link toFormat}, and {@link toDuration}.
	 */
	class Interval {
	  /**
	   * @private
	   */
	  constructor(config) {
	    /**
	     * @access private
	     */
	    this.s = config.start;
	    /**
	     * @access private
	     */
	    this.e = config.end;
	    /**
	     * @access private
	     */
	    this.invalid = config.invalid || null;
	    /**
	     * @access private
	     */
	    this.isLuxonInterval = true;
	  }

	  /**
	   * Create an invalid Interval.
	   * @param {string} reason - simple string of why this Interval is invalid. Should not contain parameters or anything else data-dependent
	   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
	   * @return {Interval}
	   */
	  static invalid(reason, explanation = null) {
	    if (!reason) {
	      throw new InvalidArgumentError("need to specify a reason the Interval is invalid");
	    }

	    const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);

	    if (Settings.throwOnInvalid) {
	      throw new InvalidIntervalError(invalid);
	    } else {
	      return new Interval({ invalid });
	    }
	  }

	  /**
	   * Create an Interval from a start DateTime and an end DateTime. Inclusive of the start but not the end.
	   * @param {DateTime|Date|Object} start
	   * @param {DateTime|Date|Object} end
	   * @return {Interval}
	   */
	  static fromDateTimes(start, end) {
	    const builtStart = friendlyDateTime(start),
	      builtEnd = friendlyDateTime(end);

	    const validateError = validateStartEnd(builtStart, builtEnd);

	    if (validateError == null) {
	      return new Interval({
	        start: builtStart,
	        end: builtEnd
	      });
	    } else {
	      return validateError;
	    }
	  }

	  /**
	   * Create an Interval from a start DateTime and a Duration to extend to.
	   * @param {DateTime|Date|Object} start
	   * @param {Duration|Object|number} duration - the length of the Interval.
	   * @return {Interval}
	   */
	  static after(start, duration) {
	    const dur = friendlyDuration(duration),
	      dt = friendlyDateTime(start);
	    return Interval.fromDateTimes(dt, dt.plus(dur));
	  }

	  /**
	   * Create an Interval from an end DateTime and a Duration to extend backwards to.
	   * @param {DateTime|Date|Object} end
	   * @param {Duration|Object|number} duration - the length of the Interval.
	   * @return {Interval}
	   */
	  static before(end, duration) {
	    const dur = friendlyDuration(duration),
	      dt = friendlyDateTime(end);
	    return Interval.fromDateTimes(dt.minus(dur), dt);
	  }

	  /**
	   * Create an Interval from an ISO 8601 string.
	   * Accepts `<start>/<end>`, `<start>/<duration>`, and `<duration>/<end>` formats.
	   * @param {string} text - the ISO string to parse
	   * @param {Object} [opts] - options to pass {@link DateTime.fromISO} and optionally {@link Duration.fromISO}
	   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
	   * @return {Interval}
	   */
	  static fromISO(text, opts) {
	    const [s, e] = (text || "").split("/", 2);
	    if (s && e) {
	      const start = DateTime.fromISO(s, opts),
	        end = DateTime.fromISO(e, opts);

	      if (start.isValid && end.isValid) {
	        return Interval.fromDateTimes(start, end);
	      }

	      if (start.isValid) {
	        const dur = Duration.fromISO(e, opts);
	        if (dur.isValid) {
	          return Interval.after(start, dur);
	        }
	      } else if (end.isValid) {
	        const dur = Duration.fromISO(s, opts);
	        if (dur.isValid) {
	          return Interval.before(end, dur);
	        }
	      }
	    }
	    return Interval.invalid("unparsable", `the input "${text}" can't be parsed as ISO 8601`);
	  }

	  /**
	   * Check if an object is an Interval. Works across context boundaries
	   * @param {object} o
	   * @return {boolean}
	   */
	  static isInterval(o) {
	    return (o && o.isLuxonInterval) || false;
	  }

	  /**
	   * Returns the start of the Interval
	   * @type {DateTime}
	   */
	  get start() {
	    return this.isValid ? this.s : null;
	  }

	  /**
	   * Returns the end of the Interval
	   * @type {DateTime}
	   */
	  get end() {
	    return this.isValid ? this.e : null;
	  }

	  /**
	   * Returns whether this Interval's end is at least its start, meaning that the Interval isn't 'backwards'.
	   * @type {boolean}
	   */
	  get isValid() {
	    return this.invalidReason === null;
	  }

	  /**
	   * Returns an error code if this Interval is invalid, or null if the Interval is valid
	   * @type {string}
	   */
	  get invalidReason() {
	    return this.invalid ? this.invalid.reason : null;
	  }

	  /**
	   * Returns an explanation of why this Interval became invalid, or null if the Interval is valid
	   * @type {string}
	   */
	  get invalidExplanation() {
	    return this.invalid ? this.invalid.explanation : null;
	  }

	  /**
	   * Returns the length of the Interval in the specified unit.
	   * @param {string} unit - the unit (such as 'hours' or 'days') to return the length in.
	   * @return {number}
	   */
	  length(unit = "milliseconds") {
	    return this.isValid ? this.toDuration(...[unit]).get(unit) : NaN;
	  }

	  /**
	   * Returns the count of minutes, hours, days, months, or years included in the Interval, even in part.
	   * Unlike {@link length} this counts sections of the calendar, not periods of time, e.g. specifying 'day'
	   * asks 'what dates are included in this interval?', not 'how many days long is this interval?'
	   * @param {string} [unit='milliseconds'] - the unit of time to count.
	   * @return {number}
	   */
	  count(unit = "milliseconds") {
	    if (!this.isValid) return NaN;
	    const start = this.start.startOf(unit),
	      end = this.end.startOf(unit);
	    return Math.floor(end.diff(start, unit).get(unit)) + 1;
	  }

	  /**
	   * Returns whether this Interval's start and end are both in the same unit of time
	   * @param {string} unit - the unit of time to check sameness on
	   * @return {boolean}
	   */
	  hasSame(unit) {
	    return this.isValid ? this.e.minus(1).hasSame(this.s, unit) : false;
	  }

	  /**
	   * Return whether this Interval has the same start and end DateTimes.
	   * @return {boolean}
	   */
	  isEmpty() {
	    return this.s.valueOf() === this.e.valueOf();
	  }

	  /**
	   * Return whether this Interval's start is after the specified DateTime.
	   * @param {DateTime} dateTime
	   * @return {boolean}
	   */
	  isAfter(dateTime) {
	    if (!this.isValid) return false;
	    return this.s > dateTime;
	  }

	  /**
	   * Return whether this Interval's end is before the specified DateTime.
	   * @param {DateTime} dateTime
	   * @return {boolean}
	   */
	  isBefore(dateTime) {
	    if (!this.isValid) return false;
	    return this.e <= dateTime;
	  }

	  /**
	   * Return whether this Interval contains the specified DateTime.
	   * @param {DateTime} dateTime
	   * @return {boolean}
	   */
	  contains(dateTime) {
	    if (!this.isValid) return false;
	    return this.s <= dateTime && this.e > dateTime;
	  }

	  /**
	   * "Sets" the start and/or end dates. Returns a newly-constructed Interval.
	   * @param {Object} values - the values to set
	   * @param {DateTime} values.start - the starting DateTime
	   * @param {DateTime} values.end - the ending DateTime
	   * @return {Interval}
	   */
	  set({ start, end } = {}) {
	    if (!this.isValid) return this;
	    return Interval.fromDateTimes(start || this.s, end || this.e);
	  }

	  /**
	   * Split this Interval at each of the specified DateTimes
	   * @param {...[DateTime]} dateTimes - the unit of time to count.
	   * @return {[Interval]}
	   */
	  splitAt(...dateTimes) {
	    if (!this.isValid) return [];
	    const sorted = dateTimes
	        .map(friendlyDateTime)
	        .filter(d => this.contains(d))
	        .sort(),
	      results = [];
	    let { s } = this,
	      i = 0;

	    while (s < this.e) {
	      const added = sorted[i] || this.e,
	        next = +added > +this.e ? this.e : added;
	      results.push(Interval.fromDateTimes(s, next));
	      s = next;
	      i += 1;
	    }

	    return results;
	  }

	  /**
	   * Split this Interval into smaller Intervals, each of the specified length.
	   * Left over time is grouped into a smaller interval
	   * @param {Duration|Object|number} duration - The length of each resulting interval.
	   * @return {[Interval]}
	   */
	  splitBy(duration) {
	    const dur = friendlyDuration(duration);

	    if (!this.isValid || !dur.isValid || dur.as("milliseconds") === 0) {
	      return [];
	    }

	    let { s } = this,
	      added,
	      next;

	    const results = [];
	    while (s < this.e) {
	      added = s.plus(dur);
	      next = +added > +this.e ? this.e : added;
	      results.push(Interval.fromDateTimes(s, next));
	      s = next;
	    }

	    return results;
	  }

	  /**
	   * Split this Interval into the specified number of smaller intervals.
	   * @param {number} numberOfParts - The number of Intervals to divide the Interval into.
	   * @return {[Interval]}
	   */
	  divideEqually(numberOfParts) {
	    if (!this.isValid) return [];
	    return this.splitBy(this.length() / numberOfParts).slice(0, numberOfParts);
	  }

	  /**
	   * Return whether this Interval overlaps with the specified Interval
	   * @param {Interval} other
	   * @return {boolean}
	   */
	  overlaps(other) {
	    return this.e > other.s && this.s < other.e;
	  }

	  /**
	   * Return whether this Interval's end is adjacent to the specified Interval's start.
	   * @param {Interval} other
	   * @return {boolean}
	   */
	  abutsStart(other) {
	    if (!this.isValid) return false;
	    return +this.e === +other.s;
	  }

	  /**
	   * Return whether this Interval's start is adjacent to the specified Interval's end.
	   * @param {Interval} other
	   * @return {boolean}
	   */
	  abutsEnd(other) {
	    if (!this.isValid) return false;
	    return +other.e === +this.s;
	  }

	  /**
	   * Return whether this Interval engulfs the start and end of the specified Interval.
	   * @param {Interval} other
	   * @return {boolean}
	   */
	  engulfs(other) {
	    if (!this.isValid) return false;
	    return this.s <= other.s && this.e >= other.e;
	  }

	  /**
	   * Return whether this Interval has the same start and end as the specified Interval.
	   * @param {Interval} other
	   * @return {boolean}
	   */
	  equals(other) {
	    if (!this.isValid || !other.isValid) {
	      return false;
	    }

	    return this.s.equals(other.s) && this.e.equals(other.e);
	  }

	  /**
	   * Return an Interval representing the intersection of this Interval and the specified Interval.
	   * Specifically, the resulting Interval has the maximum start time and the minimum end time of the two Intervals.
	   * Returns null if the intersection is empty, meaning, the intervals don't intersect.
	   * @param {Interval} other
	   * @return {Interval}
	   */
	  intersection(other) {
	    if (!this.isValid) return this;
	    const s = this.s > other.s ? this.s : other.s,
	      e = this.e < other.e ? this.e : other.e;

	    if (s > e) {
	      return null;
	    } else {
	      return Interval.fromDateTimes(s, e);
	    }
	  }

	  /**
	   * Return an Interval representing the union of this Interval and the specified Interval.
	   * Specifically, the resulting Interval has the minimum start time and the maximum end time of the two Intervals.
	   * @param {Interval} other
	   * @return {Interval}
	   */
	  union(other) {
	    if (!this.isValid) return this;
	    const s = this.s < other.s ? this.s : other.s,
	      e = this.e > other.e ? this.e : other.e;
	    return Interval.fromDateTimes(s, e);
	  }

	  /**
	   * Merge an array of Intervals into a equivalent minimal set of Intervals.
	   * Combines overlapping and adjacent Intervals.
	   * @param {[Interval]} intervals
	   * @return {[Interval]}
	   */
	  static merge(intervals) {
	    const [found, final] = intervals.sort((a, b) => a.s - b.s).reduce(
	      ([sofar, current], item) => {
	        if (!current) {
	          return [sofar, item];
	        } else if (current.overlaps(item) || current.abutsStart(item)) {
	          return [sofar, current.union(item)];
	        } else {
	          return [sofar.concat([current]), item];
	        }
	      },
	      [[], null]
	    );
	    if (final) {
	      found.push(final);
	    }
	    return found;
	  }

	  /**
	   * Return an array of Intervals representing the spans of time that only appear in one of the specified Intervals.
	   * @param {[Interval]} intervals
	   * @return {[Interval]}
	   */
	  static xor(intervals) {
	    let start = null,
	      currentCount = 0;
	    const results = [],
	      ends = intervals.map(i => [{ time: i.s, type: "s" }, { time: i.e, type: "e" }]),
	      flattened = Array.prototype.concat(...ends),
	      arr = flattened.sort((a, b) => a.time - b.time);

	    for (const i of arr) {
	      currentCount += i.type === "s" ? 1 : -1;

	      if (currentCount === 1) {
	        start = i.time;
	      } else {
	        if (start && +start !== +i.time) {
	          results.push(Interval.fromDateTimes(start, i.time));
	        }

	        start = null;
	      }
	    }

	    return Interval.merge(results);
	  }

	  /**
	   * Return an Interval representing the span of time in this Interval that doesn't overlap with any of the specified Intervals.
	   * @param {...Interval} intervals
	   * @return {[Interval]}
	   */
	  difference(...intervals) {
	    return Interval.xor([this].concat(intervals))
	      .map(i => this.intersection(i))
	      .filter(i => i && !i.isEmpty());
	  }

	  /**
	   * Returns a string representation of this Interval appropriate for debugging.
	   * @return {string}
	   */
	  toString() {
	    if (!this.isValid) return INVALID$1;
	    return `[${this.s.toISO()} – ${this.e.toISO()})`;
	  }

	  /**
	   * Returns an ISO 8601-compliant string representation of this Interval.
	   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
	   * @param {Object} opts - The same options as {@link DateTime.toISO}
	   * @return {string}
	   */
	  toISO(opts) {
	    if (!this.isValid) return INVALID$1;
	    return `${this.s.toISO(opts)}/${this.e.toISO(opts)}`;
	  }

	  /**
	   * Returns an ISO 8601-compliant string representation of date of this Interval.
	   * The time components are ignored.
	   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
	   * @return {string}
	   */
	  toISODate() {
	    if (!this.isValid) return INVALID$1;
	    return `${this.s.toISODate()}/${this.e.toISODate()}`;
	  }

	  /**
	   * Returns an ISO 8601-compliant string representation of time of this Interval.
	   * The date components are ignored.
	   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
	   * @param {Object} opts - The same options as {@link DateTime.toISO}
	   * @return {string}
	   */
	  toISOTime(opts) {
	    if (!this.isValid) return INVALID$1;
	    return `${this.s.toISOTime(opts)}/${this.e.toISOTime(opts)}`;
	  }

	  /**
	   * Returns a string representation of this Interval formatted according to the specified format string.
	   * @param {string} dateFormat - the format string. This string formats the start and end time. See {@link DateTime.toFormat} for details.
	   * @param {Object} opts - options
	   * @param {string} [opts.separator =  ' – '] - a separator to place between the start and end representations
	   * @return {string}
	   */
	  toFormat(dateFormat, { separator = " – " } = {}) {
	    if (!this.isValid) return INVALID$1;
	    return `${this.s.toFormat(dateFormat)}${separator}${this.e.toFormat(dateFormat)}`;
	  }

	  /**
	   * Return a Duration representing the time spanned by this interval.
	   * @param {string|string[]} [unit=['milliseconds']] - the unit or units (such as 'hours' or 'days') to include in the duration.
	   * @param {Object} opts - options that affect the creation of the Duration
	   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
	   * @example Interval.fromDateTimes(dt1, dt2).toDuration().toObject() //=> { milliseconds: 88489257 }
	   * @example Interval.fromDateTimes(dt1, dt2).toDuration('days').toObject() //=> { days: 1.0241812152777778 }
	   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes']).toObject() //=> { hours: 24, minutes: 34.82095 }
	   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes', 'seconds']).toObject() //=> { hours: 24, minutes: 34, seconds: 49.257 }
	   * @example Interval.fromDateTimes(dt1, dt2).toDuration('seconds').toObject() //=> { seconds: 88489.257 }
	   * @return {Duration}
	   */
	  toDuration(unit, opts) {
	    if (!this.isValid) {
	      return Duration.invalid(this.invalidReason);
	    }
	    return this.e.diff(this.s, unit, opts);
	  }

	  /**
	   * Run mapFn on the interval start and end, returning a new Interval from the resulting DateTimes
	   * @param {function} mapFn
	   * @return {Interval}
	   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.toUTC())
	   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.plus({ hours: 2 }))
	   */
	  mapEndpoints(mapFn) {
	    return Interval.fromDateTimes(mapFn(this.s), mapFn(this.e));
	  }
	}

	/**
	 * The Info class contains static methods for retrieving general time and date related data. For example, it has methods for finding out if a time zone has a DST, for listing the months in any supported locale, and for discovering which of Luxon features are available in the current environment.
	 */
	class Info {
	  /**
	   * Return whether the specified zone contains a DST.
	   * @param {string|Zone} [zone='local'] - Zone to check. Defaults to the environment's local zone.
	   * @return {boolean}
	   */
	  static hasDST(zone = Settings.defaultZone) {
	    const proto = DateTime.local()
	      .setZone(zone)
	      .set({ month: 12 });

	    return !zone.universal && proto.offset !== proto.set({ month: 6 }).offset;
	  }

	  /**
	   * Return whether the specified zone is a valid IANA specifier.
	   * @param {string} zone - Zone to check
	   * @return {boolean}
	   */
	  static isValidIANAZone(zone) {
	    return IANAZone.isValidSpecifier(zone) && IANAZone.isValidZone(zone);
	  }

	  /**
	   * Converts the input into a {@link Zone} instance.
	   *
	   * * If `input` is already a Zone instance, it is returned unchanged.
	   * * If `input` is a string containing a valid time zone name, a Zone instance
	   *   with that name is returned.
	   * * If `input` is a string that doesn't refer to a known time zone, a Zone
	   *   instance with {@link Zone.isValid} == false is returned.
	   * * If `input is a number, a Zone instance with the specified fixed offset
	   *   in minutes is returned.
	   * * If `input` is `null` or `undefined`, the default zone is returned.
	   * @param {string|Zone|number} [input] - the value to be converted
	   * @return {Zone}
	   */
	  static normalizeZone(input) {
	    return normalizeZone(input, Settings.defaultZone);
	  }

	  /**
	   * Return an array of standalone month names.
	   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
	   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
	   * @param {Object} opts - options
	   * @param {string} [opts.locale] - the locale code
	   * @param {string} [opts.numberingSystem=null] - the numbering system
	   * @param {string} [opts.outputCalendar='gregory'] - the calendar
	   * @example Info.months()[0] //=> 'January'
	   * @example Info.months('short')[0] //=> 'Jan'
	   * @example Info.months('numeric')[0] //=> '1'
	   * @example Info.months('short', { locale: 'fr-CA' } )[0] //=> 'janv.'
	   * @example Info.months('numeric', { locale: 'ar' })[0] //=> '١'
	   * @example Info.months('long', { outputCalendar: 'islamic' })[0] //=> 'Rabiʻ I'
	   * @return {[string]}
	   */
	  static months(
	    length = "long",
	    { locale = null, numberingSystem = null, outputCalendar = "gregory" } = {}
	  ) {
	    return Locale.create(locale, numberingSystem, outputCalendar).months(length);
	  }

	  /**
	   * Return an array of format month names.
	   * Format months differ from standalone months in that they're meant to appear next to the day of the month. In some languages, that
	   * changes the string.
	   * See {@link months}
	   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
	   * @param {Object} opts - options
	   * @param {string} [opts.locale] - the locale code
	   * @param {string} [opts.numberingSystem=null] - the numbering system
	   * @param {string} [opts.outputCalendar='gregory'] - the calendar
	   * @return {[string]}
	   */
	  static monthsFormat(
	    length = "long",
	    { locale = null, numberingSystem = null, outputCalendar = "gregory" } = {}
	  ) {
	    return Locale.create(locale, numberingSystem, outputCalendar).months(length, true);
	  }

	  /**
	   * Return an array of standalone week names.
	   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
	   * @param {string} [length='long'] - the length of the month representation, such as "narrow", "short", "long".
	   * @param {Object} opts - options
	   * @param {string} [opts.locale] - the locale code
	   * @param {string} [opts.numberingSystem=null] - the numbering system
	   * @example Info.weekdays()[0] //=> 'Monday'
	   * @example Info.weekdays('short')[0] //=> 'Mon'
	   * @example Info.weekdays('short', { locale: 'fr-CA' })[0] //=> 'lun.'
	   * @example Info.weekdays('short', { locale: 'ar' })[0] //=> 'الاثنين'
	   * @return {[string]}
	   */
	  static weekdays(length = "long", { locale = null, numberingSystem = null } = {}) {
	    return Locale.create(locale, numberingSystem, null).weekdays(length);
	  }

	  /**
	   * Return an array of format week names.
	   * Format weekdays differ from standalone weekdays in that they're meant to appear next to more date information. In some languages, that
	   * changes the string.
	   * See {@link weekdays}
	   * @param {string} [length='long'] - the length of the month representation, such as "narrow", "short", "long".
	   * @param {Object} opts - options
	   * @param {string} [opts.locale=null] - the locale code
	   * @param {string} [opts.numberingSystem=null] - the numbering system
	   * @return {[string]}
	   */
	  static weekdaysFormat(length = "long", { locale = null, numberingSystem = null } = {}) {
	    return Locale.create(locale, numberingSystem, null).weekdays(length, true);
	  }

	  /**
	   * Return an array of meridiems.
	   * @param {Object} opts - options
	   * @param {string} [opts.locale] - the locale code
	   * @example Info.meridiems() //=> [ 'AM', 'PM' ]
	   * @example Info.meridiems({ locale: 'my' }) //=> [ 'နံနက်', 'ညနေ' ]
	   * @return {[string]}
	   */
	  static meridiems({ locale = null } = {}) {
	    return Locale.create(locale).meridiems();
	  }

	  /**
	   * Return an array of eras, such as ['BC', 'AD']. The locale can be specified, but the calendar system is always Gregorian.
	   * @param {string} [length='short'] - the length of the era representation, such as "short" or "long".
	   * @param {Object} opts - options
	   * @param {string} [opts.locale] - the locale code
	   * @example Info.eras() //=> [ 'BC', 'AD' ]
	   * @example Info.eras('long') //=> [ 'Before Christ', 'Anno Domini' ]
	   * @example Info.eras('long', { locale: 'fr' }) //=> [ 'avant Jésus-Christ', 'après Jésus-Christ' ]
	   * @return {[string]}
	   */
	  static eras(length = "short", { locale = null } = {}) {
	    return Locale.create(locale, null, "gregory").eras(length);
	  }

	  /**
	   * Return the set of available features in this environment.
	   * Some features of Luxon are not available in all environments. For example, on older browsers, timezone support is not available. Use this function to figure out if that's the case.
	   * Keys:
	   * * `zones`: whether this environment supports IANA timezones
	   * * `intlTokens`: whether this environment supports internationalized token-based formatting/parsing
	   * * `intl`: whether this environment supports general internationalization
	   * * `relative`: whether this environment supports relative time formatting
	   * @example Info.features() //=> { intl: true, intlTokens: false, zones: true, relative: false }
	   * @return {Object}
	   */
	  static features() {
	    let intl = false,
	      intlTokens = false,
	      zones = false,
	      relative = false;

	    if (hasIntl()) {
	      intl = true;
	      intlTokens = hasFormatToParts();
	      relative = hasRelative();

	      try {
	        zones =
	          new Intl.DateTimeFormat("en", { timeZone: "America/New_York" }).resolvedOptions()
	            .timeZone === "America/New_York";
	      } catch (e) {
	        zones = false;
	      }
	    }

	    return { intl, intlTokens, zones, relative };
	  }
	}

	function dayDiff(earlier, later) {
	  const utcDayStart = dt =>
	      dt
	        .toUTC(0, { keepLocalTime: true })
	        .startOf("day")
	        .valueOf(),
	    ms = utcDayStart(later) - utcDayStart(earlier);
	  return Math.floor(Duration.fromMillis(ms).as("days"));
	}

	function highOrderDiffs(cursor, later, units) {
	  const differs = [
	    ["years", (a, b) => b.year - a.year],
	    ["months", (a, b) => b.month - a.month + (b.year - a.year) * 12],
	    [
	      "weeks",
	      (a, b) => {
	        const days = dayDiff(a, b);
	        return (days - (days % 7)) / 7;
	      }
	    ],
	    ["days", dayDiff]
	  ];

	  const results = {};
	  let lowestOrder, highWater;

	  for (const [unit, differ] of differs) {
	    if (units.indexOf(unit) >= 0) {
	      lowestOrder = unit;

	      let delta = differ(cursor, later);
	      highWater = cursor.plus({ [unit]: delta });

	      if (highWater > later) {
	        cursor = cursor.plus({ [unit]: delta - 1 });
	        delta -= 1;
	      } else {
	        cursor = highWater;
	      }

	      results[unit] = delta;
	    }
	  }

	  return [cursor, results, highWater, lowestOrder];
	}

	function diff(earlier, later, units, opts) {
	  let [cursor, results, highWater, lowestOrder] = highOrderDiffs(earlier, later, units);

	  const remainingMillis = later - cursor;

	  const lowerOrderUnits = units.filter(
	    u => ["hours", "minutes", "seconds", "milliseconds"].indexOf(u) >= 0
	  );

	  if (lowerOrderUnits.length === 0) {
	    if (highWater < later) {
	      highWater = cursor.plus({ [lowestOrder]: 1 });
	    }

	    if (highWater !== cursor) {
	      results[lowestOrder] = (results[lowestOrder] || 0) + remainingMillis / (highWater - cursor);
	    }
	  }

	  const duration = Duration.fromObject(Object.assign(results, opts));

	  if (lowerOrderUnits.length > 0) {
	    return Duration.fromMillis(remainingMillis, opts)
	      .shiftTo(...lowerOrderUnits)
	      .plus(duration);
	  } else {
	    return duration;
	  }
	}

	const numberingSystems = {
	  arab: "[\u0660-\u0669]",
	  arabext: "[\u06F0-\u06F9]",
	  bali: "[\u1B50-\u1B59]",
	  beng: "[\u09E6-\u09EF]",
	  deva: "[\u0966-\u096F]",
	  fullwide: "[\uFF10-\uFF19]",
	  gujr: "[\u0AE6-\u0AEF]",
	  hanidec: "[〇|一|二|三|四|五|六|七|八|九]",
	  khmr: "[\u17E0-\u17E9]",
	  knda: "[\u0CE6-\u0CEF]",
	  laoo: "[\u0ED0-\u0ED9]",
	  limb: "[\u1946-\u194F]",
	  mlym: "[\u0D66-\u0D6F]",
	  mong: "[\u1810-\u1819]",
	  mymr: "[\u1040-\u1049]",
	  orya: "[\u0B66-\u0B6F]",
	  tamldec: "[\u0BE6-\u0BEF]",
	  telu: "[\u0C66-\u0C6F]",
	  thai: "[\u0E50-\u0E59]",
	  tibt: "[\u0F20-\u0F29]",
	  latn: "\\d"
	};

	const numberingSystemsUTF16 = {
	  arab: [1632, 1641],
	  arabext: [1776, 1785],
	  bali: [6992, 7001],
	  beng: [2534, 2543],
	  deva: [2406, 2415],
	  fullwide: [65296, 65303],
	  gujr: [2790, 2799],
	  khmr: [6112, 6121],
	  knda: [3302, 3311],
	  laoo: [3792, 3801],
	  limb: [6470, 6479],
	  mlym: [3430, 3439],
	  mong: [6160, 6169],
	  mymr: [4160, 4169],
	  orya: [2918, 2927],
	  tamldec: [3046, 3055],
	  telu: [3174, 3183],
	  thai: [3664, 3673],
	  tibt: [3872, 3881]
	};

	// eslint-disable-next-line
	const hanidecChars = numberingSystems.hanidec.replace(/[\[|\]]/g, "").split("");

	function parseDigits(str) {
	  let value = parseInt(str, 10);
	  if (isNaN(value)) {
	    value = "";
	    for (let i = 0; i < str.length; i++) {
	      const code = str.charCodeAt(i);

	      if (str[i].search(numberingSystems.hanidec) !== -1) {
	        value += hanidecChars.indexOf(str[i]);
	      } else {
	        for (const key in numberingSystemsUTF16) {
	          const [min, max] = numberingSystemsUTF16[key];
	          if (code >= min && code <= max) {
	            value += code - min;
	          }
	        }
	      }
	    }
	    return parseInt(value, 10);
	  } else {
	    return value;
	  }
	}

	function digitRegex({ numberingSystem }, append = "") {
	  return new RegExp(`${numberingSystems[numberingSystem || "latn"]}${append}`);
	}

	const MISSING_FTP = "missing Intl.DateTimeFormat.formatToParts support";

	function intUnit(regex, post = i => i) {
	  return { regex, deser: ([s]) => post(parseDigits(s)) };
	}

	function fixListRegex(s) {
	  // make dots optional and also make them literal
	  return s.replace(/\./, "\\.?");
	}

	function stripInsensitivities(s) {
	  return s.replace(/\./, "").toLowerCase();
	}

	function oneOf(strings, startIndex) {
	  if (strings === null) {
	    return null;
	  } else {
	    return {
	      regex: RegExp(strings.map(fixListRegex).join("|")),
	      deser: ([s]) =>
	        strings.findIndex(i => stripInsensitivities(s) === stripInsensitivities(i)) + startIndex
	    };
	  }
	}

	function offset(regex, groups) {
	  return { regex, deser: ([, h, m]) => signedOffset(h, m), groups };
	}

	function simple(regex) {
	  return { regex, deser: ([s]) => s };
	}

	function escapeToken(value) {
	  // eslint-disable-next-line no-useless-escape
	  return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
	}

	function unitForToken(token, loc) {
	  const one = digitRegex(loc),
	    two = digitRegex(loc, "{2}"),
	    three = digitRegex(loc, "{3}"),
	    four = digitRegex(loc, "{4}"),
	    six = digitRegex(loc, "{6}"),
	    oneOrTwo = digitRegex(loc, "{1,2}"),
	    oneToThree = digitRegex(loc, "{1,3}"),
	    oneToSix = digitRegex(loc, "{1,6}"),
	    oneToNine = digitRegex(loc, "{1,9}"),
	    twoToFour = digitRegex(loc, "{2,4}"),
	    fourToSix = digitRegex(loc, "{4,6}"),
	    literal = t => ({ regex: RegExp(escapeToken(t.val)), deser: ([s]) => s, literal: true }),
	    unitate = t => {
	      if (token.literal) {
	        return literal(t);
	      }
	      switch (t.val) {
	        // era
	        case "G":
	          return oneOf(loc.eras("short", false), 0);
	        case "GG":
	          return oneOf(loc.eras("long", false), 0);
	        // years
	        case "y":
	          return intUnit(oneToSix);
	        case "yy":
	          return intUnit(twoToFour, untruncateYear);
	        case "yyyy":
	          return intUnit(four);
	        case "yyyyy":
	          return intUnit(fourToSix);
	        case "yyyyyy":
	          return intUnit(six);
	        // months
	        case "M":
	          return intUnit(oneOrTwo);
	        case "MM":
	          return intUnit(two);
	        case "MMM":
	          return oneOf(loc.months("short", true, false), 1);
	        case "MMMM":
	          return oneOf(loc.months("long", true, false), 1);
	        case "L":
	          return intUnit(oneOrTwo);
	        case "LL":
	          return intUnit(two);
	        case "LLL":
	          return oneOf(loc.months("short", false, false), 1);
	        case "LLLL":
	          return oneOf(loc.months("long", false, false), 1);
	        // dates
	        case "d":
	          return intUnit(oneOrTwo);
	        case "dd":
	          return intUnit(two);
	        // ordinals
	        case "o":
	          return intUnit(oneToThree);
	        case "ooo":
	          return intUnit(three);
	        // time
	        case "HH":
	          return intUnit(two);
	        case "H":
	          return intUnit(oneOrTwo);
	        case "hh":
	          return intUnit(two);
	        case "h":
	          return intUnit(oneOrTwo);
	        case "mm":
	          return intUnit(two);
	        case "m":
	          return intUnit(oneOrTwo);
	        case "q":
	          return intUnit(oneOrTwo);
	        case "qq":
	          return intUnit(two);
	        case "s":
	          return intUnit(oneOrTwo);
	        case "ss":
	          return intUnit(two);
	        case "S":
	          return intUnit(oneToThree);
	        case "SSS":
	          return intUnit(three);
	        case "u":
	          return simple(oneToNine);
	        // meridiem
	        case "a":
	          return oneOf(loc.meridiems(), 0);
	        // weekYear (k)
	        case "kkkk":
	          return intUnit(four);
	        case "kk":
	          return intUnit(twoToFour, untruncateYear);
	        // weekNumber (W)
	        case "W":
	          return intUnit(oneOrTwo);
	        case "WW":
	          return intUnit(two);
	        // weekdays
	        case "E":
	        case "c":
	          return intUnit(one);
	        case "EEE":
	          return oneOf(loc.weekdays("short", false, false), 1);
	        case "EEEE":
	          return oneOf(loc.weekdays("long", false, false), 1);
	        case "ccc":
	          return oneOf(loc.weekdays("short", true, false), 1);
	        case "cccc":
	          return oneOf(loc.weekdays("long", true, false), 1);
	        // offset/zone
	        case "Z":
	        case "ZZ":
	          return offset(new RegExp(`([+-]${oneOrTwo.source})(?::(${two.source}))?`), 2);
	        case "ZZZ":
	          return offset(new RegExp(`([+-]${oneOrTwo.source})(${two.source})?`), 2);
	        // we don't support ZZZZ (PST) or ZZZZZ (Pacific Standard Time) in parsing
	        // because we don't have any way to figure out what they are
	        case "z":
	          return simple(/[a-z_+-/]{1,256}?/i);
	        default:
	          return literal(t);
	      }
	    };

	  const unit = unitate(token) || {
	    invalidReason: MISSING_FTP
	  };

	  unit.token = token;

	  return unit;
	}

	const partTypeStyleToTokenVal = {
	  year: {
	    "2-digit": "yy",
	    numeric: "yyyyy"
	  },
	  month: {
	    numeric: "M",
	    "2-digit": "MM",
	    short: "MMM",
	    long: "MMMM"
	  },
	  day: {
	    numeric: "d",
	    "2-digit": "dd"
	  },
	  weekday: {
	    short: "EEE",
	    long: "EEEE"
	  },
	  dayperiod: "a",
	  dayPeriod: "a",
	  hour: {
	    numeric: "h",
	    "2-digit": "hh"
	  },
	  minute: {
	    numeric: "m",
	    "2-digit": "mm"
	  },
	  second: {
	    numeric: "s",
	    "2-digit": "ss"
	  }
	};

	function tokenForPart(part, locale, formatOpts) {
	  const { type, value } = part;

	  if (type === "literal") {
	    return {
	      literal: true,
	      val: value
	    };
	  }

	  const style = formatOpts[type];

	  let val = partTypeStyleToTokenVal[type];
	  if (typeof val === "object") {
	    val = val[style];
	  }

	  if (val) {
	    return {
	      literal: false,
	      val
	    };
	  }

	  return undefined;
	}

	function buildRegex(units) {
	  const re = units.map(u => u.regex).reduce((f, r) => `${f}(${r.source})`, "");
	  return [`^${re}$`, units];
	}

	function match(input, regex, handlers) {
	  const matches = input.match(regex);

	  if (matches) {
	    const all = {};
	    let matchIndex = 1;
	    for (const i in handlers) {
	      if (hasOwnProperty(handlers, i)) {
	        const h = handlers[i],
	          groups = h.groups ? h.groups + 1 : 1;
	        if (!h.literal && h.token) {
	          all[h.token.val[0]] = h.deser(matches.slice(matchIndex, matchIndex + groups));
	        }
	        matchIndex += groups;
	      }
	    }
	    return [matches, all];
	  } else {
	    return [matches, {}];
	  }
	}

	function dateTimeFromMatches(matches) {
	  const toField = token => {
	    switch (token) {
	      case "S":
	        return "millisecond";
	      case "s":
	        return "second";
	      case "m":
	        return "minute";
	      case "h":
	      case "H":
	        return "hour";
	      case "d":
	        return "day";
	      case "o":
	        return "ordinal";
	      case "L":
	      case "M":
	        return "month";
	      case "y":
	        return "year";
	      case "E":
	      case "c":
	        return "weekday";
	      case "W":
	        return "weekNumber";
	      case "k":
	        return "weekYear";
	      case "q":
	        return "quarter";
	      default:
	        return null;
	    }
	  };

	  let zone;
	  if (!isUndefined(matches.Z)) {
	    zone = new FixedOffsetZone(matches.Z);
	  } else if (!isUndefined(matches.z)) {
	    zone = IANAZone.create(matches.z);
	  } else {
	    zone = null;
	  }

	  if (!isUndefined(matches.q)) {
	    matches.M = (matches.q - 1) * 3 + 1;
	  }

	  if (!isUndefined(matches.h)) {
	    if (matches.h < 12 && matches.a === 1) {
	      matches.h += 12;
	    } else if (matches.h === 12 && matches.a === 0) {
	      matches.h = 0;
	    }
	  }

	  if (matches.G === 0 && matches.y) {
	    matches.y = -matches.y;
	  }

	  if (!isUndefined(matches.u)) {
	    matches.S = parseMillis(matches.u);
	  }

	  const vals = Object.keys(matches).reduce((r, k) => {
	    const f = toField(k);
	    if (f) {
	      r[f] = matches[k];
	    }

	    return r;
	  }, {});

	  return [vals, zone];
	}

	let dummyDateTimeCache = null;

	function getDummyDateTime() {
	  if (!dummyDateTimeCache) {
	    dummyDateTimeCache = DateTime.fromMillis(1555555555555);
	  }

	  return dummyDateTimeCache;
	}

	function maybeExpandMacroToken(token, locale) {
	  if (token.literal) {
	    return token;
	  }

	  const formatOpts = Formatter.macroTokenToFormatOpts(token.val);

	  if (!formatOpts) {
	    return token;
	  }

	  const formatter = Formatter.create(locale, formatOpts);
	  const parts = formatter.formatDateTimeParts(getDummyDateTime());

	  const tokens = parts.map(p => tokenForPart(p, locale, formatOpts));

	  if (tokens.includes(undefined)) {
	    return token;
	  }

	  return tokens;
	}

	function expandMacroTokens(tokens, locale) {
	  return Array.prototype.concat(...tokens.map(t => maybeExpandMacroToken(t, locale)));
	}

	/**
	 * @private
	 */

	function explainFromTokens(locale, input, format) {
	  const tokens = expandMacroTokens(Formatter.parseFormat(format), locale),
	    units = tokens.map(t => unitForToken(t, locale)),
	    disqualifyingUnit = units.find(t => t.invalidReason);

	  if (disqualifyingUnit) {
	    return { input, tokens, invalidReason: disqualifyingUnit.invalidReason };
	  } else {
	    const [regexString, handlers] = buildRegex(units),
	      regex = RegExp(regexString, "i"),
	      [rawMatches, matches] = match(input, regex, handlers),
	      [result, zone] = matches ? dateTimeFromMatches(matches) : [null, null];
	    if (hasOwnProperty(matches, "a") && hasOwnProperty(matches, "H")) {
	      throw new ConflictingSpecificationError(
	        "Can't include meridiem when specifying 24-hour format"
	      );
	    }
	    return { input, tokens, regex, rawMatches, matches, result, zone };
	  }
	}

	function parseFromTokens(locale, input, format) {
	  const { result, zone, invalidReason } = explainFromTokens(locale, input, format);
	  return [result, zone, invalidReason];
	}

	const nonLeapLadder = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
	  leapLadder = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];

	function unitOutOfRange(unit, value) {
	  return new Invalid(
	    "unit out of range",
	    `you specified ${value} (of type ${typeof value}) as a ${unit}, which is invalid`
	  );
	}

	function dayOfWeek(year, month, day) {
	  const js = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
	  return js === 0 ? 7 : js;
	}

	function computeOrdinal(year, month, day) {
	  return day + (isLeapYear(year) ? leapLadder : nonLeapLadder)[month - 1];
	}

	function uncomputeOrdinal(year, ordinal) {
	  const table = isLeapYear(year) ? leapLadder : nonLeapLadder,
	    month0 = table.findIndex(i => i < ordinal),
	    day = ordinal - table[month0];
	  return { month: month0 + 1, day };
	}

	/**
	 * @private
	 */

	function gregorianToWeek(gregObj) {
	  const { year, month, day } = gregObj,
	    ordinal = computeOrdinal(year, month, day),
	    weekday = dayOfWeek(year, month, day);

	  let weekNumber = Math.floor((ordinal - weekday + 10) / 7),
	    weekYear;

	  if (weekNumber < 1) {
	    weekYear = year - 1;
	    weekNumber = weeksInWeekYear(weekYear);
	  } else if (weekNumber > weeksInWeekYear(year)) {
	    weekYear = year + 1;
	    weekNumber = 1;
	  } else {
	    weekYear = year;
	  }

	  return Object.assign({ weekYear, weekNumber, weekday }, timeObject(gregObj));
	}

	function weekToGregorian(weekData) {
	  const { weekYear, weekNumber, weekday } = weekData,
	    weekdayOfJan4 = dayOfWeek(weekYear, 1, 4),
	    yearInDays = daysInYear(weekYear);

	  let ordinal = weekNumber * 7 + weekday - weekdayOfJan4 - 3,
	    year;

	  if (ordinal < 1) {
	    year = weekYear - 1;
	    ordinal += daysInYear(year);
	  } else if (ordinal > yearInDays) {
	    year = weekYear + 1;
	    ordinal -= daysInYear(weekYear);
	  } else {
	    year = weekYear;
	  }

	  const { month, day } = uncomputeOrdinal(year, ordinal);

	  return Object.assign({ year, month, day }, timeObject(weekData));
	}

	function gregorianToOrdinal(gregData) {
	  const { year, month, day } = gregData,
	    ordinal = computeOrdinal(year, month, day);

	  return Object.assign({ year, ordinal }, timeObject(gregData));
	}

	function ordinalToGregorian(ordinalData) {
	  const { year, ordinal } = ordinalData,
	    { month, day } = uncomputeOrdinal(year, ordinal);

	  return Object.assign({ year, month, day }, timeObject(ordinalData));
	}

	function hasInvalidWeekData(obj) {
	  const validYear = isInteger(obj.weekYear),
	    validWeek = integerBetween(obj.weekNumber, 1, weeksInWeekYear(obj.weekYear)),
	    validWeekday = integerBetween(obj.weekday, 1, 7);

	  if (!validYear) {
	    return unitOutOfRange("weekYear", obj.weekYear);
	  } else if (!validWeek) {
	    return unitOutOfRange("week", obj.week);
	  } else if (!validWeekday) {
	    return unitOutOfRange("weekday", obj.weekday);
	  } else return false;
	}

	function hasInvalidOrdinalData(obj) {
	  const validYear = isInteger(obj.year),
	    validOrdinal = integerBetween(obj.ordinal, 1, daysInYear(obj.year));

	  if (!validYear) {
	    return unitOutOfRange("year", obj.year);
	  } else if (!validOrdinal) {
	    return unitOutOfRange("ordinal", obj.ordinal);
	  } else return false;
	}

	function hasInvalidGregorianData(obj) {
	  const validYear = isInteger(obj.year),
	    validMonth = integerBetween(obj.month, 1, 12),
	    validDay = integerBetween(obj.day, 1, daysInMonth(obj.year, obj.month));

	  if (!validYear) {
	    return unitOutOfRange("year", obj.year);
	  } else if (!validMonth) {
	    return unitOutOfRange("month", obj.month);
	  } else if (!validDay) {
	    return unitOutOfRange("day", obj.day);
	  } else return false;
	}

	function hasInvalidTimeData(obj) {
	  const { hour, minute, second, millisecond } = obj;
	  const validHour =
	      integerBetween(hour, 0, 23) ||
	      (hour === 24 && minute === 0 && second === 0 && millisecond === 0),
	    validMinute = integerBetween(minute, 0, 59),
	    validSecond = integerBetween(second, 0, 59),
	    validMillisecond = integerBetween(millisecond, 0, 999);

	  if (!validHour) {
	    return unitOutOfRange("hour", hour);
	  } else if (!validMinute) {
	    return unitOutOfRange("minute", minute);
	  } else if (!validSecond) {
	    return unitOutOfRange("second", second);
	  } else if (!validMillisecond) {
	    return unitOutOfRange("millisecond", millisecond);
	  } else return false;
	}

	const INVALID$2 = "Invalid DateTime";
	const MAX_DATE = 8.64e15;

	function unsupportedZone(zone) {
	  return new Invalid("unsupported zone", `the zone "${zone.name}" is not supported`);
	}

	// we cache week data on the DT object and this intermediates the cache
	function possiblyCachedWeekData(dt) {
	  if (dt.weekData === null) {
	    dt.weekData = gregorianToWeek(dt.c);
	  }
	  return dt.weekData;
	}

	// clone really means, "make a new object with these modifications". all "setters" really use this
	// to create a new object while only changing some of the properties
	function clone$1(inst, alts) {
	  const current = {
	    ts: inst.ts,
	    zone: inst.zone,
	    c: inst.c,
	    o: inst.o,
	    loc: inst.loc,
	    invalid: inst.invalid
	  };
	  return new DateTime(Object.assign({}, current, alts, { old: current }));
	}

	// find the right offset a given local time. The o input is our guess, which determines which
	// offset we'll pick in ambiguous cases (e.g. there are two 3 AMs b/c Fallback DST)
	function fixOffset(localTS, o, tz) {
	  // Our UTC time is just a guess because our offset is just a guess
	  let utcGuess = localTS - o * 60 * 1000;

	  // Test whether the zone matches the offset for this ts
	  const o2 = tz.offset(utcGuess);

	  // If so, offset didn't change and we're done
	  if (o === o2) {
	    return [utcGuess, o];
	  }

	  // If not, change the ts by the difference in the offset
	  utcGuess -= (o2 - o) * 60 * 1000;

	  // If that gives us the local time we want, we're done
	  const o3 = tz.offset(utcGuess);
	  if (o2 === o3) {
	    return [utcGuess, o2];
	  }

	  // If it's different, we're in a hole time. The offset has changed, but the we don't adjust the time
	  return [localTS - Math.min(o2, o3) * 60 * 1000, Math.max(o2, o3)];
	}

	// convert an epoch timestamp into a calendar object with the given offset
	function tsToObj(ts, offset) {
	  ts += offset * 60 * 1000;

	  const d = new Date(ts);

	  return {
	    year: d.getUTCFullYear(),
	    month: d.getUTCMonth() + 1,
	    day: d.getUTCDate(),
	    hour: d.getUTCHours(),
	    minute: d.getUTCMinutes(),
	    second: d.getUTCSeconds(),
	    millisecond: d.getUTCMilliseconds()
	  };
	}

	// convert a calendar object to a epoch timestamp
	function objToTS(obj, offset, zone) {
	  return fixOffset(objToLocalTS(obj), offset, zone);
	}

	// create a new DT instance by adding a duration, adjusting for DSTs
	function adjustTime(inst, dur) {
	  const keys = Object.keys(dur.values);
	  if (keys.indexOf("milliseconds") === -1) {
	    keys.push("milliseconds");
	  }

	  dur = dur.shiftTo(...keys);

	  const oPre = inst.o,
	    year = inst.c.year + dur.years,
	    month = inst.c.month + dur.months + dur.quarters * 3,
	    c = Object.assign({}, inst.c, {
	      year,
	      month,
	      day: Math.min(inst.c.day, daysInMonth(year, month)) + dur.days + dur.weeks * 7
	    }),
	    millisToAdd = Duration.fromObject({
	      hours: dur.hours,
	      minutes: dur.minutes,
	      seconds: dur.seconds,
	      milliseconds: dur.milliseconds
	    }).as("milliseconds"),
	    localTS = objToLocalTS(c);

	  let [ts, o] = fixOffset(localTS, oPre, inst.zone);

	  if (millisToAdd !== 0) {
	    ts += millisToAdd;
	    // that could have changed the offset by going over a DST, but we want to keep the ts the same
	    o = inst.zone.offset(ts);
	  }

	  return { ts, o };
	}

	// helper useful in turning the results of parsing into real dates
	// by handling the zone options
	function parseDataToDateTime(parsed, parsedZone, opts, format, text) {
	  const { setZone, zone } = opts;
	  if (parsed && Object.keys(parsed).length !== 0) {
	    const interpretationZone = parsedZone || zone,
	      inst = DateTime.fromObject(
	        Object.assign(parsed, opts, {
	          zone: interpretationZone,
	          // setZone is a valid option in the calling methods, but not in fromObject
	          setZone: undefined
	        })
	      );
	    return setZone ? inst : inst.setZone(zone);
	  } else {
	    return DateTime.invalid(
	      new Invalid("unparsable", `the input "${text}" can't be parsed as ${format}`)
	    );
	  }
	}

	// if you want to output a technical format (e.g. RFC 2822), this helper
	// helps handle the details
	function toTechFormat(dt, format, allowZ = true) {
	  return dt.isValid
	    ? Formatter.create(Locale.create("en-US"), {
	        allowZ,
	        forceSimple: true
	      }).formatDateTimeFromString(dt, format)
	    : null;
	}

	// technical time formats (e.g. the time part of ISO 8601), take some options
	// and this commonizes their handling
	function toTechTimeFormat(
	  dt,
	  {
	    suppressSeconds = false,
	    suppressMilliseconds = false,
	    includeOffset,
	    includeZone = false,
	    spaceZone = false,
	    format = "extended"
	  }
	) {
	  let fmt = format === "basic" ? "HHmm" : "HH:mm";

	  if (!suppressSeconds || dt.second !== 0 || dt.millisecond !== 0) {
	    fmt += format === "basic" ? "ss" : ":ss";
	    if (!suppressMilliseconds || dt.millisecond !== 0) {
	      fmt += ".SSS";
	    }
	  }

	  if ((includeZone || includeOffset) && spaceZone) {
	    fmt += " ";
	  }

	  if (includeZone) {
	    fmt += "z";
	  } else if (includeOffset) {
	    fmt += format === "basic" ? "ZZZ" : "ZZ";
	  }

	  return toTechFormat(dt, fmt);
	}

	// defaults for unspecified units in the supported calendars
	const defaultUnitValues = {
	    month: 1,
	    day: 1,
	    hour: 0,
	    minute: 0,
	    second: 0,
	    millisecond: 0
	  },
	  defaultWeekUnitValues = {
	    weekNumber: 1,
	    weekday: 1,
	    hour: 0,
	    minute: 0,
	    second: 0,
	    millisecond: 0
	  },
	  defaultOrdinalUnitValues = {
	    ordinal: 1,
	    hour: 0,
	    minute: 0,
	    second: 0,
	    millisecond: 0
	  };

	// Units in the supported calendars, sorted by bigness
	const orderedUnits$1 = ["year", "month", "day", "hour", "minute", "second", "millisecond"],
	  orderedWeekUnits = [
	    "weekYear",
	    "weekNumber",
	    "weekday",
	    "hour",
	    "minute",
	    "second",
	    "millisecond"
	  ],
	  orderedOrdinalUnits = ["year", "ordinal", "hour", "minute", "second", "millisecond"];

	// standardize case and plurality in units
	function normalizeUnit(unit) {
	  const normalized = {
	    year: "year",
	    years: "year",
	    month: "month",
	    months: "month",
	    day: "day",
	    days: "day",
	    hour: "hour",
	    hours: "hour",
	    minute: "minute",
	    minutes: "minute",
	    quarter: "quarter",
	    quarters: "quarter",
	    second: "second",
	    seconds: "second",
	    millisecond: "millisecond",
	    milliseconds: "millisecond",
	    weekday: "weekday",
	    weekdays: "weekday",
	    weeknumber: "weekNumber",
	    weeksnumber: "weekNumber",
	    weeknumbers: "weekNumber",
	    weekyear: "weekYear",
	    weekyears: "weekYear",
	    ordinal: "ordinal"
	  }[unit.toLowerCase()];

	  if (!normalized) throw new InvalidUnitError(unit);

	  return normalized;
	}

	// this is a dumbed down version of fromObject() that runs about 60% faster
	// but doesn't do any validation, makes a bunch of assumptions about what units
	// are present, and so on.
	function quickDT(obj, zone) {
	  // assume we have the higher-order units
	  for (const u of orderedUnits$1) {
	    if (isUndefined(obj[u])) {
	      obj[u] = defaultUnitValues[u];
	    }
	  }

	  const invalid = hasInvalidGregorianData(obj) || hasInvalidTimeData(obj);
	  if (invalid) {
	    return DateTime.invalid(invalid);
	  }

	  const tsNow = Settings.now(),
	    offsetProvis = zone.offset(tsNow),
	    [ts, o] = objToTS(obj, offsetProvis, zone);

	  return new DateTime({
	    ts,
	    zone,
	    o
	  });
	}

	function diffRelative(start, end, opts) {
	  const round = isUndefined(opts.round) ? true : opts.round,
	    format = (c, unit) => {
	      c = roundTo(c, round || opts.calendary ? 0 : 2, true);
	      const formatter = end.loc.clone(opts).relFormatter(opts);
	      return formatter.format(c, unit);
	    },
	    differ = unit => {
	      if (opts.calendary) {
	        if (!end.hasSame(start, unit)) {
	          return end
	            .startOf(unit)
	            .diff(start.startOf(unit), unit)
	            .get(unit);
	        } else return 0;
	      } else {
	        return end.diff(start, unit).get(unit);
	      }
	    };

	  if (opts.unit) {
	    return format(differ(opts.unit), opts.unit);
	  }

	  for (const unit of opts.units) {
	    const count = differ(unit);
	    if (Math.abs(count) >= 1) {
	      return format(count, unit);
	    }
	  }
	  return format(0, opts.units[opts.units.length - 1]);
	}

	/**
	 * A DateTime is an immutable data structure representing a specific date and time and accompanying methods. It contains class and instance methods for creating, parsing, interrogating, transforming, and formatting them.
	 *
	 * A DateTime comprises of:
	 * * A timestamp. Each DateTime instance refers to a specific millisecond of the Unix epoch.
	 * * A time zone. Each instance is considered in the context of a specific zone (by default the local system's zone).
	 * * Configuration properties that effect how output strings are formatted, such as `locale`, `numberingSystem`, and `outputCalendar`.
	 *
	 * Here is a brief overview of the most commonly used functionality it provides:
	 *
	 * * **Creation**: To create a DateTime from its components, use one of its factory class methods: {@link local}, {@link utc}, and (most flexibly) {@link fromObject}. To create one from a standard string format, use {@link fromISO}, {@link fromHTTP}, and {@link fromRFC2822}. To create one from a custom string format, use {@link fromFormat}. To create one from a native JS date, use {@link fromJSDate}.
	 * * **Gregorian calendar and time**: To examine the Gregorian properties of a DateTime individually (i.e as opposed to collectively through {@link toObject}), use the {@link year}, {@link month},
	 * {@link day}, {@link hour}, {@link minute}, {@link second}, {@link millisecond} accessors.
	 * * **Week calendar**: For ISO week calendar attributes, see the {@link weekYear}, {@link weekNumber}, and {@link weekday} accessors.
	 * * **Configuration** See the {@link locale} and {@link numberingSystem} accessors.
	 * * **Transformation**: To transform the DateTime into other DateTimes, use {@link set}, {@link reconfigure}, {@link setZone}, {@link setLocale}, {@link plus}, {@link minus}, {@link endOf}, {@link startOf}, {@link toUTC}, and {@link toLocal}.
	 * * **Output**: To convert the DateTime to other representations, use the {@link toRelative}, {@link toRelativeCalendar}, {@link toJSON}, {@link toISO}, {@link toHTTP}, {@link toObject}, {@link toRFC2822}, {@link toString}, {@link toLocaleString}, {@link toFormat}, {@link toMillis} and {@link toJSDate}.
	 *
	 * There's plenty others documented below. In addition, for more information on subtler topics like internationalization, time zones, alternative calendars, validity, and so on, see the external documentation.
	 */
	class DateTime {
	  /**
	   * @access private
	   */
	  constructor(config) {
	    const zone = config.zone || Settings.defaultZone;

	    let invalid =
	      config.invalid ||
	      (Number.isNaN(config.ts) ? new Invalid("invalid input") : null) ||
	      (!zone.isValid ? unsupportedZone(zone) : null);
	    /**
	     * @access private
	     */
	    this.ts = isUndefined(config.ts) ? Settings.now() : config.ts;

	    let c = null,
	      o = null;
	    if (!invalid) {
	      const unchanged = config.old && config.old.ts === this.ts && config.old.zone.equals(zone);

	      if (unchanged) {
	        [c, o] = [config.old.c, config.old.o];
	      } else {
	        const ot = zone.offset(this.ts);
	        c = tsToObj(this.ts, ot);
	        invalid = Number.isNaN(c.year) ? new Invalid("invalid input") : null;
	        c = invalid ? null : c;
	        o = invalid ? null : ot;
	      }
	    }

	    /**
	     * @access private
	     */
	    this._zone = zone;
	    /**
	     * @access private
	     */
	    this.loc = config.loc || Locale.create();
	    /**
	     * @access private
	     */
	    this.invalid = invalid;
	    /**
	     * @access private
	     */
	    this.weekData = null;
	    /**
	     * @access private
	     */
	    this.c = c;
	    /**
	     * @access private
	     */
	    this.o = o;
	    /**
	     * @access private
	     */
	    this.isLuxonDateTime = true;
	  }

	  // CONSTRUCT

	  /**
	   * Create a local DateTime
	   * @param {number} [year] - The calendar year. If omitted (as in, call `local()` with no arguments), the current time will be used
	   * @param {number} [month=1] - The month, 1-indexed
	   * @param {number} [day=1] - The day of the month
	   * @param {number} [hour=0] - The hour of the day, in 24-hour time
	   * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
	   * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
	   * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
	   * @example DateTime.local()                            //~> now
	   * @example DateTime.local(2017)                        //~> 2017-01-01T00:00:00
	   * @example DateTime.local(2017, 3)                     //~> 2017-03-01T00:00:00
	   * @example DateTime.local(2017, 3, 12)                 //~> 2017-03-12T00:00:00
	   * @example DateTime.local(2017, 3, 12, 5)              //~> 2017-03-12T05:00:00
	   * @example DateTime.local(2017, 3, 12, 5, 45)          //~> 2017-03-12T05:45:00
	   * @example DateTime.local(2017, 3, 12, 5, 45, 10)      //~> 2017-03-12T05:45:10
	   * @example DateTime.local(2017, 3, 12, 5, 45, 10, 765) //~> 2017-03-12T05:45:10.765
	   * @return {DateTime}
	   */
	  static local(year, month, day, hour, minute, second, millisecond) {
	    if (isUndefined(year)) {
	      return new DateTime({ ts: Settings.now() });
	    } else {
	      return quickDT(
	        {
	          year,
	          month,
	          day,
	          hour,
	          minute,
	          second,
	          millisecond
	        },
	        Settings.defaultZone
	      );
	    }
	  }

	  /**
	   * Create a DateTime in UTC
	   * @param {number} [year] - The calendar year. If omitted (as in, call `utc()` with no arguments), the current time will be used
	   * @param {number} [month=1] - The month, 1-indexed
	   * @param {number} [day=1] - The day of the month
	   * @param {number} [hour=0] - The hour of the day, in 24-hour time
	   * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
	   * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
	   * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
	   * @example DateTime.utc()                            //~> now
	   * @example DateTime.utc(2017)                        //~> 2017-01-01T00:00:00Z
	   * @example DateTime.utc(2017, 3)                     //~> 2017-03-01T00:00:00Z
	   * @example DateTime.utc(2017, 3, 12)                 //~> 2017-03-12T00:00:00Z
	   * @example DateTime.utc(2017, 3, 12, 5)              //~> 2017-03-12T05:00:00Z
	   * @example DateTime.utc(2017, 3, 12, 5, 45)          //~> 2017-03-12T05:45:00Z
	   * @example DateTime.utc(2017, 3, 12, 5, 45, 10)      //~> 2017-03-12T05:45:10Z
	   * @example DateTime.utc(2017, 3, 12, 5, 45, 10, 765) //~> 2017-03-12T05:45:10.765Z
	   * @return {DateTime}
	   */
	  static utc(year, month, day, hour, minute, second, millisecond) {
	    if (isUndefined(year)) {
	      return new DateTime({
	        ts: Settings.now(),
	        zone: FixedOffsetZone.utcInstance
	      });
	    } else {
	      return quickDT(
	        {
	          year,
	          month,
	          day,
	          hour,
	          minute,
	          second,
	          millisecond
	        },
	        FixedOffsetZone.utcInstance
	      );
	    }
	  }

	  /**
	   * Create a DateTime from a Javascript Date object. Uses the default zone.
	   * @param {Date} date - a Javascript Date object
	   * @param {Object} options - configuration options for the DateTime
	   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
	   * @return {DateTime}
	   */
	  static fromJSDate(date, options = {}) {
	    const ts = isDate(date) ? date.valueOf() : NaN;
	    if (Number.isNaN(ts)) {
	      return DateTime.invalid("invalid input");
	    }

	    const zoneToUse = normalizeZone(options.zone, Settings.defaultZone);
	    if (!zoneToUse.isValid) {
	      return DateTime.invalid(unsupportedZone(zoneToUse));
	    }

	    return new DateTime({
	      ts: ts,
	      zone: zoneToUse,
	      loc: Locale.fromObject(options)
	    });
	  }

	  /**
	   * Create a DateTime from a number of milliseconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
	   * @param {number} milliseconds - a number of milliseconds since 1970 UTC
	   * @param {Object} options - configuration options for the DateTime
	   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
	   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
	   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
	   * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
	   * @return {DateTime}
	   */
	  static fromMillis(milliseconds, options = {}) {
	    if (!isNumber(milliseconds)) {
	      throw new InvalidArgumentError(
	        `fromMillis requires a numerical input, but received a ${typeof milliseconds} with value ${milliseconds}`
	      );
	    } else if (milliseconds < -MAX_DATE || milliseconds > MAX_DATE) {
	      // this isn't perfect because because we can still end up out of range because of additional shifting, but it's a start
	      return DateTime.invalid("Timestamp out of range");
	    } else {
	      return new DateTime({
	        ts: milliseconds,
	        zone: normalizeZone(options.zone, Settings.defaultZone),
	        loc: Locale.fromObject(options)
	      });
	    }
	  }

	  /**
	   * Create a DateTime from a number of seconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
	   * @param {number} seconds - a number of seconds since 1970 UTC
	   * @param {Object} options - configuration options for the DateTime
	   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
	   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
	   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
	   * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
	   * @return {DateTime}
	   */
	  static fromSeconds(seconds, options = {}) {
	    if (!isNumber(seconds)) {
	      throw new InvalidArgumentError("fromSeconds requires a numerical input");
	    } else {
	      return new DateTime({
	        ts: seconds * 1000,
	        zone: normalizeZone(options.zone, Settings.defaultZone),
	        loc: Locale.fromObject(options)
	      });
	    }
	  }

	  /**
	   * Create a DateTime from a Javascript object with keys like 'year' and 'hour' with reasonable defaults.
	   * @param {Object} obj - the object to create the DateTime from
	   * @param {number} obj.year - a year, such as 1987
	   * @param {number} obj.month - a month, 1-12
	   * @param {number} obj.day - a day of the month, 1-31, depending on the month
	   * @param {number} obj.ordinal - day of the year, 1-365 or 366
	   * @param {number} obj.weekYear - an ISO week year
	   * @param {number} obj.weekNumber - an ISO week number, between 1 and 52 or 53, depending on the year
	   * @param {number} obj.weekday - an ISO weekday, 1-7, where 1 is Monday and 7 is Sunday
	   * @param {number} obj.hour - hour of the day, 0-23
	   * @param {number} obj.minute - minute of the hour, 0-59
	   * @param {number} obj.second - second of the minute, 0-59
	   * @param {number} obj.millisecond - millisecond of the second, 0-999
	   * @param {string|Zone} [obj.zone='local'] - interpret the numbers in the context of a particular zone. Can take any value taken as the first argument to setZone()
	   * @param {string} [obj.locale='system's locale'] - a locale to set on the resulting DateTime instance
	   * @param {string} obj.outputCalendar - the output calendar to set on the resulting DateTime instance
	   * @param {string} obj.numberingSystem - the numbering system to set on the resulting DateTime instance
	   * @example DateTime.fromObject({ year: 1982, month: 5, day: 25}).toISODate() //=> '1982-05-25'
	   * @example DateTime.fromObject({ year: 1982 }).toISODate() //=> '1982-01-01'
	   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }) //~> today at 10:26:06
	   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6, zone: 'utc' }),
	   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6, zone: 'local' })
	   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6, zone: 'America/New_York' })
	   * @example DateTime.fromObject({ weekYear: 2016, weekNumber: 2, weekday: 3 }).toISODate() //=> '2016-01-13'
	   * @return {DateTime}
	   */
	  static fromObject(obj) {
	    const zoneToUse = normalizeZone(obj.zone, Settings.defaultZone);
	    if (!zoneToUse.isValid) {
	      return DateTime.invalid(unsupportedZone(zoneToUse));
	    }

	    const tsNow = Settings.now(),
	      offsetProvis = zoneToUse.offset(tsNow),
	      normalized = normalizeObject(obj, normalizeUnit, [
	        "zone",
	        "locale",
	        "outputCalendar",
	        "numberingSystem"
	      ]),
	      containsOrdinal = !isUndefined(normalized.ordinal),
	      containsGregorYear = !isUndefined(normalized.year),
	      containsGregorMD = !isUndefined(normalized.month) || !isUndefined(normalized.day),
	      containsGregor = containsGregorYear || containsGregorMD,
	      definiteWeekDef = normalized.weekYear || normalized.weekNumber,
	      loc = Locale.fromObject(obj);

	    // cases:
	    // just a weekday -> this week's instance of that weekday, no worries
	    // (gregorian data or ordinal) + (weekYear or weekNumber) -> error
	    // (gregorian month or day) + ordinal -> error
	    // otherwise just use weeks or ordinals or gregorian, depending on what's specified

	    if ((containsGregor || containsOrdinal) && definiteWeekDef) {
	      throw new ConflictingSpecificationError(
	        "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
	      );
	    }

	    if (containsGregorMD && containsOrdinal) {
	      throw new ConflictingSpecificationError("Can't mix ordinal dates with month/day");
	    }

	    const useWeekData = definiteWeekDef || (normalized.weekday && !containsGregor);

	    // configure ourselves to deal with gregorian dates or week stuff
	    let units,
	      defaultValues,
	      objNow = tsToObj(tsNow, offsetProvis);
	    if (useWeekData) {
	      units = orderedWeekUnits;
	      defaultValues = defaultWeekUnitValues;
	      objNow = gregorianToWeek(objNow);
	    } else if (containsOrdinal) {
	      units = orderedOrdinalUnits;
	      defaultValues = defaultOrdinalUnitValues;
	      objNow = gregorianToOrdinal(objNow);
	    } else {
	      units = orderedUnits$1;
	      defaultValues = defaultUnitValues;
	    }

	    // set default values for missing stuff
	    let foundFirst = false;
	    for (const u of units) {
	      const v = normalized[u];
	      if (!isUndefined(v)) {
	        foundFirst = true;
	      } else if (foundFirst) {
	        normalized[u] = defaultValues[u];
	      } else {
	        normalized[u] = objNow[u];
	      }
	    }

	    // make sure the values we have are in range
	    const higherOrderInvalid = useWeekData
	        ? hasInvalidWeekData(normalized)
	        : containsOrdinal
	          ? hasInvalidOrdinalData(normalized)
	          : hasInvalidGregorianData(normalized),
	      invalid = higherOrderInvalid || hasInvalidTimeData(normalized);

	    if (invalid) {
	      return DateTime.invalid(invalid);
	    }

	    // compute the actual time
	    const gregorian = useWeekData
	        ? weekToGregorian(normalized)
	        : containsOrdinal
	          ? ordinalToGregorian(normalized)
	          : normalized,
	      [tsFinal, offsetFinal] = objToTS(gregorian, offsetProvis, zoneToUse),
	      inst = new DateTime({
	        ts: tsFinal,
	        zone: zoneToUse,
	        o: offsetFinal,
	        loc
	      });

	    // gregorian data + weekday serves only to validate
	    if (normalized.weekday && containsGregor && obj.weekday !== inst.weekday) {
	      return DateTime.invalid(
	        "mismatched weekday",
	        `you can't specify both a weekday of ${normalized.weekday} and a date of ${inst.toISO()}`
	      );
	    }

	    return inst;
	  }

	  /**
	   * Create a DateTime from an ISO 8601 string
	   * @param {string} text - the ISO string
	   * @param {Object} opts - options to affect the creation
	   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the time to this zone
	   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
	   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
	   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
	   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
	   * @example DateTime.fromISO('2016-05-25T09:08:34.123')
	   * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00')
	   * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00', {setZone: true})
	   * @example DateTime.fromISO('2016-05-25T09:08:34.123', {zone: 'utc'})
	   * @example DateTime.fromISO('2016-W05-4')
	   * @return {DateTime}
	   */
	  static fromISO(text, opts = {}) {
	    const [vals, parsedZone] = parseISODate(text);
	    return parseDataToDateTime(vals, parsedZone, opts, "ISO 8601", text);
	  }

	  /**
	   * Create a DateTime from an RFC 2822 string
	   * @param {string} text - the RFC 2822 string
	   * @param {Object} opts - options to affect the creation
	   * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since the offset is always specified in the string itself, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
	   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
	   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
	   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
	   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
	   * @example DateTime.fromRFC2822('25 Nov 2016 13:23:12 GMT')
	   * @example DateTime.fromRFC2822('Fri, 25 Nov 2016 13:23:12 +0600')
	   * @example DateTime.fromRFC2822('25 Nov 2016 13:23 Z')
	   * @return {DateTime}
	   */
	  static fromRFC2822(text, opts = {}) {
	    const [vals, parsedZone] = parseRFC2822Date(text);
	    return parseDataToDateTime(vals, parsedZone, opts, "RFC 2822", text);
	  }

	  /**
	   * Create a DateTime from an HTTP header date
	   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
	   * @param {string} text - the HTTP header date
	   * @param {Object} opts - options to affect the creation
	   * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since HTTP dates are always in UTC, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
	   * @param {boolean} [opts.setZone=false] - override the zone with the fixed-offset zone specified in the string. For HTTP dates, this is always UTC, so this option is equivalent to setting the `zone` option to 'utc', but this option is included for consistency with similar methods.
	   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
	   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
	   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
	   * @example DateTime.fromHTTP('Sun, 06 Nov 1994 08:49:37 GMT')
	   * @example DateTime.fromHTTP('Sunday, 06-Nov-94 08:49:37 GMT')
	   * @example DateTime.fromHTTP('Sun Nov  6 08:49:37 1994')
	   * @return {DateTime}
	   */
	  static fromHTTP(text, opts = {}) {
	    const [vals, parsedZone] = parseHTTPDate(text);
	    return parseDataToDateTime(vals, parsedZone, opts, "HTTP", opts);
	  }

	  /**
	   * Create a DateTime from an input string and format string.
	   * Defaults to en-US if no locale has been specified, regardless of the system's locale.
	   * @see https://moment.github.io/luxon/docs/manual/parsing.html#table-of-tokens
	   * @param {string} text - the string to parse
	   * @param {string} fmt - the format the string is expected to be in (see the link below for the formats)
	   * @param {Object} opts - options to affect the creation
	   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
	   * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
	   * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
	   * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
	   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
	   * @return {DateTime}
	   */
	  static fromFormat(text, fmt, opts = {}) {
	    if (isUndefined(text) || isUndefined(fmt)) {
	      throw new InvalidArgumentError("fromFormat requires an input string and a format");
	    }

	    const { locale = null, numberingSystem = null } = opts,
	      localeToUse = Locale.fromOpts({
	        locale,
	        numberingSystem,
	        defaultToEN: true
	      }),
	      [vals, parsedZone, invalid] = parseFromTokens(localeToUse, text, fmt);
	    if (invalid) {
	      return DateTime.invalid(invalid);
	    } else {
	      return parseDataToDateTime(vals, parsedZone, opts, `format ${fmt}`, text);
	    }
	  }

	  /**
	   * @deprecated use fromFormat instead
	   */
	  static fromString(text, fmt, opts = {}) {
	    return DateTime.fromFormat(text, fmt, opts);
	  }

	  /**
	   * Create a DateTime from a SQL date, time, or datetime
	   * Defaults to en-US if no locale has been specified, regardless of the system's locale
	   * @param {string} text - the string to parse
	   * @param {Object} opts - options to affect the creation
	   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
	   * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
	   * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
	   * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
	   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
	   * @example DateTime.fromSQL('2017-05-15')
	   * @example DateTime.fromSQL('2017-05-15 09:12:34')
	   * @example DateTime.fromSQL('2017-05-15 09:12:34.342')
	   * @example DateTime.fromSQL('2017-05-15 09:12:34.342+06:00')
	   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles')
	   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles', { setZone: true })
	   * @example DateTime.fromSQL('2017-05-15 09:12:34.342', { zone: 'America/Los_Angeles' })
	   * @example DateTime.fromSQL('09:12:34.342')
	   * @return {DateTime}
	   */
	  static fromSQL(text, opts = {}) {
	    const [vals, parsedZone] = parseSQL(text);
	    return parseDataToDateTime(vals, parsedZone, opts, "SQL", text);
	  }

	  /**
	   * Create an invalid DateTime.
	   * @param {string} reason - simple string of why this DateTime is invalid. Should not contain parameters or anything else data-dependent
	   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
	   * @return {DateTime}
	   */
	  static invalid(reason, explanation = null) {
	    if (!reason) {
	      throw new InvalidArgumentError("need to specify a reason the DateTime is invalid");
	    }

	    const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);

	    if (Settings.throwOnInvalid) {
	      throw new InvalidDateTimeError(invalid);
	    } else {
	      return new DateTime({ invalid });
	    }
	  }

	  /**
	   * Check if an object is a DateTime. Works across context boundaries
	   * @param {object} o
	   * @return {boolean}
	   */
	  static isDateTime(o) {
	    return (o && o.isLuxonDateTime) || false;
	  }

	  // INFO

	  /**
	   * Get the value of unit.
	   * @param {string} unit - a unit such as 'minute' or 'day'
	   * @example DateTime.local(2017, 7, 4).get('month'); //=> 7
	   * @example DateTime.local(2017, 7, 4).get('day'); //=> 4
	   * @return {number}
	   */
	  get(unit) {
	    return this[unit];
	  }

	  /**
	   * Returns whether the DateTime is valid. Invalid DateTimes occur when:
	   * * The DateTime was created from invalid calendar information, such as the 13th month or February 30
	   * * The DateTime was created by an operation on another invalid date
	   * @type {boolean}
	   */
	  get isValid() {
	    return this.invalid === null;
	  }

	  /**
	   * Returns an error code if this DateTime is invalid, or null if the DateTime is valid
	   * @type {string}
	   */
	  get invalidReason() {
	    return this.invalid ? this.invalid.reason : null;
	  }

	  /**
	   * Returns an explanation of why this DateTime became invalid, or null if the DateTime is valid
	   * @type {string}
	   */
	  get invalidExplanation() {
	    return this.invalid ? this.invalid.explanation : null;
	  }

	  /**
	   * Get the locale of a DateTime, such 'en-GB'. The locale is used when formatting the DateTime
	   *
	   * @type {string}
	   */
	  get locale() {
	    return this.isValid ? this.loc.locale : null;
	  }

	  /**
	   * Get the numbering system of a DateTime, such 'beng'. The numbering system is used when formatting the DateTime
	   *
	   * @type {string}
	   */
	  get numberingSystem() {
	    return this.isValid ? this.loc.numberingSystem : null;
	  }

	  /**
	   * Get the output calendar of a DateTime, such 'islamic'. The output calendar is used when formatting the DateTime
	   *
	   * @type {string}
	   */
	  get outputCalendar() {
	    return this.isValid ? this.loc.outputCalendar : null;
	  }

	  /**
	   * Get the time zone associated with this DateTime.
	   * @type {Zone}
	   */
	  get zone() {
	    return this._zone;
	  }

	  /**
	   * Get the name of the time zone.
	   * @type {string}
	   */
	  get zoneName() {
	    return this.isValid ? this.zone.name : null;
	  }

	  /**
	   * Get the year
	   * @example DateTime.local(2017, 5, 25).year //=> 2017
	   * @type {number}
	   */
	  get year() {
	    return this.isValid ? this.c.year : NaN;
	  }

	  /**
	   * Get the quarter
	   * @example DateTime.local(2017, 5, 25).quarter //=> 2
	   * @type {number}
	   */
	  get quarter() {
	    return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
	  }

	  /**
	   * Get the month (1-12).
	   * @example DateTime.local(2017, 5, 25).month //=> 5
	   * @type {number}
	   */
	  get month() {
	    return this.isValid ? this.c.month : NaN;
	  }

	  /**
	   * Get the day of the month (1-30ish).
	   * @example DateTime.local(2017, 5, 25).day //=> 25
	   * @type {number}
	   */
	  get day() {
	    return this.isValid ? this.c.day : NaN;
	  }

	  /**
	   * Get the hour of the day (0-23).
	   * @example DateTime.local(2017, 5, 25, 9).hour //=> 9
	   * @type {number}
	   */
	  get hour() {
	    return this.isValid ? this.c.hour : NaN;
	  }

	  /**
	   * Get the minute of the hour (0-59).
	   * @example DateTime.local(2017, 5, 25, 9, 30).minute //=> 30
	   * @type {number}
	   */
	  get minute() {
	    return this.isValid ? this.c.minute : NaN;
	  }

	  /**
	   * Get the second of the minute (0-59).
	   * @example DateTime.local(2017, 5, 25, 9, 30, 52).second //=> 52
	   * @type {number}
	   */
	  get second() {
	    return this.isValid ? this.c.second : NaN;
	  }

	  /**
	   * Get the millisecond of the second (0-999).
	   * @example DateTime.local(2017, 5, 25, 9, 30, 52, 654).millisecond //=> 654
	   * @type {number}
	   */
	  get millisecond() {
	    return this.isValid ? this.c.millisecond : NaN;
	  }

	  /**
	   * Get the week year
	   * @see https://en.wikipedia.org/wiki/ISO_week_date
	   * @example DateTime.local(2014, 11, 31).weekYear //=> 2015
	   * @type {number}
	   */
	  get weekYear() {
	    return this.isValid ? possiblyCachedWeekData(this).weekYear : NaN;
	  }

	  /**
	   * Get the week number of the week year (1-52ish).
	   * @see https://en.wikipedia.org/wiki/ISO_week_date
	   * @example DateTime.local(2017, 5, 25).weekNumber //=> 21
	   * @type {number}
	   */
	  get weekNumber() {
	    return this.isValid ? possiblyCachedWeekData(this).weekNumber : NaN;
	  }

	  /**
	   * Get the day of the week.
	   * 1 is Monday and 7 is Sunday
	   * @see https://en.wikipedia.org/wiki/ISO_week_date
	   * @example DateTime.local(2014, 11, 31).weekday //=> 4
	   * @type {number}
	   */
	  get weekday() {
	    return this.isValid ? possiblyCachedWeekData(this).weekday : NaN;
	  }

	  /**
	   * Get the ordinal (meaning the day of the year)
	   * @example DateTime.local(2017, 5, 25).ordinal //=> 145
	   * @type {number|DateTime}
	   */
	  get ordinal() {
	    return this.isValid ? gregorianToOrdinal(this.c).ordinal : NaN;
	  }

	  /**
	   * Get the human readable short month name, such as 'Oct'.
	   * Defaults to the system's locale if no locale has been specified
	   * @example DateTime.local(2017, 10, 30).monthShort //=> Oct
	   * @type {string}
	   */
	  get monthShort() {
	    return this.isValid ? Info.months("short", { locale: this.locale })[this.month - 1] : null;
	  }

	  /**
	   * Get the human readable long month name, such as 'October'.
	   * Defaults to the system's locale if no locale has been specified
	   * @example DateTime.local(2017, 10, 30).monthLong //=> October
	   * @type {string}
	   */
	  get monthLong() {
	    return this.isValid ? Info.months("long", { locale: this.locale })[this.month - 1] : null;
	  }

	  /**
	   * Get the human readable short weekday, such as 'Mon'.
	   * Defaults to the system's locale if no locale has been specified
	   * @example DateTime.local(2017, 10, 30).weekdayShort //=> Mon
	   * @type {string}
	   */
	  get weekdayShort() {
	    return this.isValid ? Info.weekdays("short", { locale: this.locale })[this.weekday - 1] : null;
	  }

	  /**
	   * Get the human readable long weekday, such as 'Monday'.
	   * Defaults to the system's locale if no locale has been specified
	   * @example DateTime.local(2017, 10, 30).weekdayLong //=> Monday
	   * @type {string}
	   */
	  get weekdayLong() {
	    return this.isValid ? Info.weekdays("long", { locale: this.locale })[this.weekday - 1] : null;
	  }

	  /**
	   * Get the UTC offset of this DateTime in minutes
	   * @example DateTime.local().offset //=> -240
	   * @example DateTime.utc().offset //=> 0
	   * @type {number}
	   */
	  get offset() {
	    return this.isValid ? +this.o : NaN;
	  }

	  /**
	   * Get the short human name for the zone's current offset, for example "EST" or "EDT".
	   * Defaults to the system's locale if no locale has been specified
	   * @type {string}
	   */
	  get offsetNameShort() {
	    if (this.isValid) {
	      return this.zone.offsetName(this.ts, {
	        format: "short",
	        locale: this.locale
	      });
	    } else {
	      return null;
	    }
	  }

	  /**
	   * Get the long human name for the zone's current offset, for example "Eastern Standard Time" or "Eastern Daylight Time".
	   * Defaults to the system's locale if no locale has been specified
	   * @type {string}
	   */
	  get offsetNameLong() {
	    if (this.isValid) {
	      return this.zone.offsetName(this.ts, {
	        format: "long",
	        locale: this.locale
	      });
	    } else {
	      return null;
	    }
	  }

	  /**
	   * Get whether this zone's offset ever changes, as in a DST.
	   * @type {boolean}
	   */
	  get isOffsetFixed() {
	    return this.isValid ? this.zone.universal : null;
	  }

	  /**
	   * Get whether the DateTime is in a DST.
	   * @type {boolean}
	   */
	  get isInDST() {
	    if (this.isOffsetFixed) {
	      return false;
	    } else {
	      return (
	        this.offset > this.set({ month: 1 }).offset || this.offset > this.set({ month: 5 }).offset
	      );
	    }
	  }

	  /**
	   * Returns true if this DateTime is in a leap year, false otherwise
	   * @example DateTime.local(2016).isInLeapYear //=> true
	   * @example DateTime.local(2013).isInLeapYear //=> false
	   * @type {boolean}
	   */
	  get isInLeapYear() {
	    return isLeapYear(this.year);
	  }

	  /**
	   * Returns the number of days in this DateTime's month
	   * @example DateTime.local(2016, 2).daysInMonth //=> 29
	   * @example DateTime.local(2016, 3).daysInMonth //=> 31
	   * @type {number}
	   */
	  get daysInMonth() {
	    return daysInMonth(this.year, this.month);
	  }

	  /**
	   * Returns the number of days in this DateTime's year
	   * @example DateTime.local(2016).daysInYear //=> 366
	   * @example DateTime.local(2013).daysInYear //=> 365
	   * @type {number}
	   */
	  get daysInYear() {
	    return this.isValid ? daysInYear(this.year) : NaN;
	  }

	  /**
	   * Returns the number of weeks in this DateTime's year
	   * @see https://en.wikipedia.org/wiki/ISO_week_date
	   * @example DateTime.local(2004).weeksInWeekYear //=> 53
	   * @example DateTime.local(2013).weeksInWeekYear //=> 52
	   * @type {number}
	   */
	  get weeksInWeekYear() {
	    return this.isValid ? weeksInWeekYear(this.weekYear) : NaN;
	  }

	  /**
	   * Returns the resolved Intl options for this DateTime.
	   * This is useful in understanding the behavior of formatting methods
	   * @param {Object} opts - the same options as toLocaleString
	   * @return {Object}
	   */
	  resolvedLocaleOpts(opts = {}) {
	    const { locale, numberingSystem, calendar } = Formatter.create(
	      this.loc.clone(opts),
	      opts
	    ).resolvedOptions(this);
	    return { locale, numberingSystem, outputCalendar: calendar };
	  }

	  // TRANSFORM

	  /**
	   * "Set" the DateTime's zone to UTC. Returns a newly-constructed DateTime.
	   *
	   * Equivalent to {@link setZone}('utc')
	   * @param {number} [offset=0] - optionally, an offset from UTC in minutes
	   * @param {Object} [opts={}] - options to pass to `setZone()`
	   * @return {DateTime}
	   */
	  toUTC(offset = 0, opts = {}) {
	    return this.setZone(FixedOffsetZone.instance(offset), opts);
	  }

	  /**
	   * "Set" the DateTime's zone to the host's local zone. Returns a newly-constructed DateTime.
	   *
	   * Equivalent to `setZone('local')`
	   * @return {DateTime}
	   */
	  toLocal() {
	    return this.setZone(Settings.defaultZone);
	  }

	  /**
	   * "Set" the DateTime's zone to specified zone. Returns a newly-constructed DateTime.
	   *
	   * By default, the setter keeps the underlying time the same (as in, the same timestamp), but the new instance will report different local times and consider DSTs when making computations, as with {@link plus}. You may wish to use {@link toLocal} and {@link toUTC} which provide simple convenience wrappers for commonly used zones.
	   * @param {string|Zone} [zone='local'] - a zone identifier. As a string, that can be any IANA zone supported by the host environment, or a fixed-offset name of the form 'UTC+3', or the strings 'local' or 'utc'. You may also supply an instance of a {@link Zone} class.
	   * @param {Object} opts - options
	   * @param {boolean} [opts.keepLocalTime=false] - If true, adjust the underlying time so that the local time stays the same, but in the target zone. You should rarely need this.
	   * @return {DateTime}
	   */
	  setZone(zone, { keepLocalTime = false, keepCalendarTime = false } = {}) {
	    zone = normalizeZone(zone, Settings.defaultZone);
	    if (zone.equals(this.zone)) {
	      return this;
	    } else if (!zone.isValid) {
	      return DateTime.invalid(unsupportedZone(zone));
	    } else {
	      let newTS = this.ts;
	      if (keepLocalTime || keepCalendarTime) {
	        const offsetGuess = zone.offset(this.ts);
	        const asObj = this.toObject();
	        [newTS] = objToTS(asObj, offsetGuess, zone);
	      }
	      return clone$1(this, { ts: newTS, zone });
	    }
	  }

	  /**
	   * "Set" the locale, numberingSystem, or outputCalendar. Returns a newly-constructed DateTime.
	   * @param {Object} properties - the properties to set
	   * @example DateTime.local(2017, 5, 25).reconfigure({ locale: 'en-GB' })
	   * @return {DateTime}
	   */
	  reconfigure({ locale, numberingSystem, outputCalendar } = {}) {
	    const loc = this.loc.clone({ locale, numberingSystem, outputCalendar });
	    return clone$1(this, { loc });
	  }

	  /**
	   * "Set" the locale. Returns a newly-constructed DateTime.
	   * Just a convenient alias for reconfigure({ locale })
	   * @example DateTime.local(2017, 5, 25).setLocale('en-GB')
	   * @return {DateTime}
	   */
	  setLocale(locale) {
	    return this.reconfigure({ locale });
	  }

	  /**
	   * "Set" the values of specified units. Returns a newly-constructed DateTime.
	   * You can only set units with this method; for "setting" metadata, see {@link reconfigure} and {@link setZone}.
	   * @param {Object} values - a mapping of units to numbers
	   * @example dt.set({ year: 2017 })
	   * @example dt.set({ hour: 8, minute: 30 })
	   * @example dt.set({ weekday: 5 })
	   * @example dt.set({ year: 2005, ordinal: 234 })
	   * @return {DateTime}
	   */
	  set(values) {
	    if (!this.isValid) return this;

	    const normalized = normalizeObject(values, normalizeUnit, []),
	      settingWeekStuff =
	        !isUndefined(normalized.weekYear) ||
	        !isUndefined(normalized.weekNumber) ||
	        !isUndefined(normalized.weekday);

	    let mixed;
	    if (settingWeekStuff) {
	      mixed = weekToGregorian(Object.assign(gregorianToWeek(this.c), normalized));
	    } else if (!isUndefined(normalized.ordinal)) {
	      mixed = ordinalToGregorian(Object.assign(gregorianToOrdinal(this.c), normalized));
	    } else {
	      mixed = Object.assign(this.toObject(), normalized);

	      // if we didn't set the day but we ended up on an overflow date,
	      // use the last day of the right month
	      if (isUndefined(normalized.day)) {
	        mixed.day = Math.min(daysInMonth(mixed.year, mixed.month), mixed.day);
	      }
	    }

	    const [ts, o] = objToTS(mixed, this.o, this.zone);
	    return clone$1(this, { ts, o });
	  }

	  /**
	   * Add a period of time to this DateTime and return the resulting DateTime
	   *
	   * Adding hours, minutes, seconds, or milliseconds increases the timestamp by the right number of milliseconds. Adding days, months, or years shifts the calendar, accounting for DSTs and leap years along the way. Thus, `dt.plus({ hours: 24 })` may result in a different time than `dt.plus({ days: 1 })` if there's a DST shift in between.
	   * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
	   * @example DateTime.local().plus(123) //~> in 123 milliseconds
	   * @example DateTime.local().plus({ minutes: 15 }) //~> in 15 minutes
	   * @example DateTime.local().plus({ days: 1 }) //~> this time tomorrow
	   * @example DateTime.local().plus({ days: -1 }) //~> this time yesterday
	   * @example DateTime.local().plus({ hours: 3, minutes: 13 }) //~> in 3 hr, 13 min
	   * @example DateTime.local().plus(Duration.fromObject({ hours: 3, minutes: 13 })) //~> in 3 hr, 13 min
	   * @return {DateTime}
	   */
	  plus(duration) {
	    if (!this.isValid) return this;
	    const dur = friendlyDuration(duration);
	    return clone$1(this, adjustTime(this, dur));
	  }

	  /**
	   * Subtract a period of time to this DateTime and return the resulting DateTime
	   * See {@link plus}
	   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
	   @return {DateTime}
	  */
	  minus(duration) {
	    if (!this.isValid) return this;
	    const dur = friendlyDuration(duration).negate();
	    return clone$1(this, adjustTime(this, dur));
	  }

	  /**
	   * "Set" this DateTime to the beginning of a unit of time.
	   * @param {string} unit - The unit to go to the beginning of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
	   * @example DateTime.local(2014, 3, 3).startOf('month').toISODate(); //=> '2014-03-01'
	   * @example DateTime.local(2014, 3, 3).startOf('year').toISODate(); //=> '2014-01-01'
	   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('day').toISOTime(); //=> '00:00.000-05:00'
	   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('hour').toISOTime(); //=> '05:00:00.000-05:00'
	   * @return {DateTime}
	   */
	  startOf(unit) {
	    if (!this.isValid) return this;
	    const o = {},
	      normalizedUnit = Duration.normalizeUnit(unit);
	    switch (normalizedUnit) {
	      case "years":
	        o.month = 1;
	      // falls through
	      case "quarters":
	      case "months":
	        o.day = 1;
	      // falls through
	      case "weeks":
	      case "days":
	        o.hour = 0;
	      // falls through
	      case "hours":
	        o.minute = 0;
	      // falls through
	      case "minutes":
	        o.second = 0;
	      // falls through
	      case "seconds":
	        o.millisecond = 0;
	        break;
	      // no default, invalid units throw in normalizeUnit()
	    }

	    if (normalizedUnit === "weeks") {
	      o.weekday = 1;
	    }

	    if (normalizedUnit === "quarters") {
	      const q = Math.ceil(this.month / 3);
	      o.month = (q - 1) * 3 + 1;
	    }

	    return this.set(o);
	  }

	  /**
	   * "Set" this DateTime to the end (meaning the last millisecond) of a unit of time
	   * @param {string} unit - The unit to go to the end of. Can be 'year', 'month', 'day', 'hour', 'minute', 'second', or 'millisecond'.
	   * @example DateTime.local(2014, 3, 3).endOf('month').toISO(); //=> '2014-03-31T23:59:59.999-05:00'
	   * @example DateTime.local(2014, 3, 3).endOf('year').toISO(); //=> '2014-12-31T23:59:59.999-05:00'
	   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('day').toISO(); //=> '2014-03-03T23:59:59.999-05:00'
	   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('hour').toISO(); //=> '2014-03-03T05:59:59.999-05:00'
	   * @return {DateTime}
	   */
	  endOf(unit) {
	    return this.isValid
	      ? this.plus({ [unit]: 1 })
	          .startOf(unit)
	          .minus(1)
	      : this;
	  }

	  // OUTPUT

	  /**
	   * Returns a string representation of this DateTime formatted according to the specified format string.
	   * **You may not want this.** See {@link toLocaleString} for a more flexible formatting tool. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens).
	   * Defaults to en-US if no locale has been specified, regardless of the system's locale.
	   * @see https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens
	   * @param {string} fmt - the format string
	   * @param {Object} opts - opts to override the configuration options
	   * @example DateTime.local().toFormat('yyyy LLL dd') //=> '2017 Apr 22'
	   * @example DateTime.local().setLocale('fr').toFormat('yyyy LLL dd') //=> '2017 avr. 22'
	   * @example DateTime.local().toFormat('yyyy LLL dd', { locale: "fr" }) //=> '2017 avr. 22'
	   * @example DateTime.local().toFormat("HH 'hours and' mm 'minutes'") //=> '20 hours and 55 minutes'
	   * @return {string}
	   */
	  toFormat(fmt, opts = {}) {
	    return this.isValid
	      ? Formatter.create(this.loc.redefaultToEN(opts)).formatDateTimeFromString(this, fmt)
	      : INVALID$2;
	  }

	  /**
	   * Returns a localized string representing this date. Accepts the same options as the Intl.DateTimeFormat constructor and any presets defined by Luxon, such as `DateTime.DATE_FULL` or `DateTime.TIME_SIMPLE`.
	   * The exact behavior of this method is browser-specific, but in general it will return an appropriate representation
	   * of the DateTime in the assigned locale.
	   * Defaults to the system's locale if no locale has been specified
	   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
	   * @param opts {Object} - Intl.DateTimeFormat constructor options and configuration options
	   * @example DateTime.local().toLocaleString(); //=> 4/20/2017
	   * @example DateTime.local().setLocale('en-gb').toLocaleString(); //=> '20/04/2017'
	   * @example DateTime.local().toLocaleString({ locale: 'en-gb' }); //=> '20/04/2017'
	   * @example DateTime.local().toLocaleString(DateTime.DATE_FULL); //=> 'April 20, 2017'
	   * @example DateTime.local().toLocaleString(DateTime.TIME_SIMPLE); //=> '11:32 AM'
	   * @example DateTime.local().toLocaleString(DateTime.DATETIME_SHORT); //=> '4/20/2017, 11:32 AM'
	   * @example DateTime.local().toLocaleString({ weekday: 'long', month: 'long', day: '2-digit' }); //=> 'Thursday, April 20'
	   * @example DateTime.local().toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> 'Thu, Apr 20, 11:27 AM'
	   * @example DateTime.local().toLocaleString({ hour: '2-digit', minute: '2-digit', hour12: false }); //=> '11:32'
	   * @return {string}
	   */
	  toLocaleString(opts = DATE_SHORT) {
	    return this.isValid
	      ? Formatter.create(this.loc.clone(opts), opts).formatDateTime(this)
	      : INVALID$2;
	  }

	  /**
	   * Returns an array of format "parts", meaning individual tokens along with metadata. This is allows callers to post-process individual sections of the formatted output.
	   * Defaults to the system's locale if no locale has been specified
	   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/formatToParts
	   * @param opts {Object} - Intl.DateTimeFormat constructor options, same as `toLocaleString`.
	   * @example DateTime.local().toLocaleParts(); //=> [
	   *                                   //=>   { type: 'day', value: '25' },
	   *                                   //=>   { type: 'literal', value: '/' },
	   *                                   //=>   { type: 'month', value: '05' },
	   *                                   //=>   { type: 'literal', value: '/' },
	   *                                   //=>   { type: 'year', value: '1982' }
	   *                                   //=> ]
	   */
	  toLocaleParts(opts = {}) {
	    return this.isValid
	      ? Formatter.create(this.loc.clone(opts), opts).formatDateTimeParts(this)
	      : [];
	  }

	  /**
	   * Returns an ISO 8601-compliant string representation of this DateTime
	   * @param {Object} opts - options
	   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
	   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
	   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
	   * @param {string} [opts.format='extended'] - choose between the basic and extended format
	   * @example DateTime.utc(1982, 5, 25).toISO() //=> '1982-05-25T00:00:00.000Z'
	   * @example DateTime.local().toISO() //=> '2017-04-22T20:47:05.335-04:00'
	   * @example DateTime.local().toISO({ includeOffset: false }) //=> '2017-04-22T20:47:05.335'
	   * @example DateTime.local().toISO({ format: 'basic' }) //=> '20170422T204705.335-0400'
	   * @return {string}
	   */
	  toISO(opts = {}) {
	    if (!this.isValid) {
	      return null;
	    }

	    return `${this.toISODate(opts)}T${this.toISOTime(opts)}`;
	  }

	  /**
	   * Returns an ISO 8601-compliant string representation of this DateTime's date component
	   * @param {Object} opts - options
	   * @param {string} [opts.format='extended'] - choose between the basic and extended format
	   * @example DateTime.utc(1982, 5, 25).toISODate() //=> '1982-05-25'
	   * @example DateTime.utc(1982, 5, 25).toISODate({ format: 'basic' }) //=> '19820525'
	   * @return {string}
	   */
	  toISODate({ format = "extended" } = {}) {
	    let fmt = format === "basic" ? "yyyyMMdd" : "yyyy-MM-dd";
	    if (this.year > 9999) {
	      fmt = "+" + fmt;
	    }

	    return toTechFormat(this, fmt);
	  }

	  /**
	   * Returns an ISO 8601-compliant string representation of this DateTime's week date
	   * @example DateTime.utc(1982, 5, 25).toISOWeekDate() //=> '1982-W21-2'
	   * @return {string}
	   */
	  toISOWeekDate() {
	    return toTechFormat(this, "kkkk-'W'WW-c");
	  }

	  /**
	   * Returns an ISO 8601-compliant string representation of this DateTime's time component
	   * @param {Object} opts - options
	   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
	   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
	   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
	   * @param {string} [opts.format='extended'] - choose between the basic and extended format
	   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime() //=> '07:34:19.361Z'
	   * @example DateTime.utc().set({ hour: 7, minute: 34, seconds: 0, milliseconds: 0 }).toISOTime({ suppressSeconds: true }) //=> '07:34Z'
	   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ format: 'basic' }) //=> '073419.361Z'
	   * @return {string}
	   */
	  toISOTime({
	    suppressMilliseconds = false,
	    suppressSeconds = false,
	    includeOffset = true,
	    format = "extended"
	  } = {}) {
	    return toTechTimeFormat(this, {
	      suppressSeconds,
	      suppressMilliseconds,
	      includeOffset,
	      format
	    });
	  }

	  /**
	   * Returns an RFC 2822-compatible string representation of this DateTime, always in UTC
	   * @example DateTime.utc(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 +0000'
	   * @example DateTime.local(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 -0400'
	   * @return {string}
	   */
	  toRFC2822() {
	    return toTechFormat(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", false);
	  }

	  /**
	   * Returns a string representation of this DateTime appropriate for use in HTTP headers.
	   * Specifically, the string conforms to RFC 1123.
	   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
	   * @example DateTime.utc(2014, 7, 13).toHTTP() //=> 'Sun, 13 Jul 2014 00:00:00 GMT'
	   * @example DateTime.utc(2014, 7, 13, 19).toHTTP() //=> 'Sun, 13 Jul 2014 19:00:00 GMT'
	   * @return {string}
	   */
	  toHTTP() {
	    return toTechFormat(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
	  }

	  /**
	   * Returns a string representation of this DateTime appropriate for use in SQL Date
	   * @example DateTime.utc(2014, 7, 13).toSQLDate() //=> '2014-07-13'
	   * @return {string}
	   */
	  toSQLDate() {
	    return toTechFormat(this, "yyyy-MM-dd");
	  }

	  /**
	   * Returns a string representation of this DateTime appropriate for use in SQL Time
	   * @param {Object} opts - options
	   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
	   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
	   * @example DateTime.utc().toSQL() //=> '05:15:16.345'
	   * @example DateTime.local().toSQL() //=> '05:15:16.345 -04:00'
	   * @example DateTime.local().toSQL({ includeOffset: false }) //=> '05:15:16.345'
	   * @example DateTime.local().toSQL({ includeZone: false }) //=> '05:15:16.345 America/New_York'
	   * @return {string}
	   */
	  toSQLTime({ includeOffset = true, includeZone = false } = {}) {
	    return toTechTimeFormat(this, {
	      includeOffset,
	      includeZone,
	      spaceZone: true
	    });
	  }

	  /**
	   * Returns a string representation of this DateTime appropriate for use in SQL DateTime
	   * @param {Object} opts - options
	   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
	   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
	   * @example DateTime.utc(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 Z'
	   * @example DateTime.local(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 -04:00'
	   * @example DateTime.local(2014, 7, 13).toSQL({ includeOffset: false }) //=> '2014-07-13 00:00:00.000'
	   * @example DateTime.local(2014, 7, 13).toSQL({ includeZone: true }) //=> '2014-07-13 00:00:00.000 America/New_York'
	   * @return {string}
	   */
	  toSQL(opts = {}) {
	    if (!this.isValid) {
	      return null;
	    }

	    return `${this.toSQLDate()} ${this.toSQLTime(opts)}`;
	  }

	  /**
	   * Returns a string representation of this DateTime appropriate for debugging
	   * @return {string}
	   */
	  toString() {
	    return this.isValid ? this.toISO() : INVALID$2;
	  }

	  /**
	   * Returns the epoch milliseconds of this DateTime. Alias of {@link toMillis}
	   * @return {number}
	   */
	  valueOf() {
	    return this.toMillis();
	  }

	  /**
	   * Returns the epoch milliseconds of this DateTime.
	   * @return {number}
	   */
	  toMillis() {
	    return this.isValid ? this.ts : NaN;
	  }

	  /**
	   * Returns the epoch seconds of this DateTime.
	   * @return {number}
	   */
	  toSeconds() {
	    return this.isValid ? this.ts / 1000 : NaN;
	  }

	  /**
	   * Returns an ISO 8601 representation of this DateTime appropriate for use in JSON.
	   * @return {string}
	   */
	  toJSON() {
	    return this.toISO();
	  }

	  /**
	   * Returns a BSON serializable equivalent to this DateTime.
	   * @return {Date}
	   */
	  toBSON() {
	    return this.toJSDate();
	  }

	  /**
	   * Returns a Javascript object with this DateTime's year, month, day, and so on.
	   * @param opts - options for generating the object
	   * @param {boolean} [opts.includeConfig=false] - include configuration attributes in the output
	   * @example DateTime.local().toObject() //=> { year: 2017, month: 4, day: 22, hour: 20, minute: 49, second: 42, millisecond: 268 }
	   * @return {Object}
	   */
	  toObject(opts = {}) {
	    if (!this.isValid) return {};

	    const base = Object.assign({}, this.c);

	    if (opts.includeConfig) {
	      base.outputCalendar = this.outputCalendar;
	      base.numberingSystem = this.loc.numberingSystem;
	      base.locale = this.loc.locale;
	    }
	    return base;
	  }

	  /**
	   * Returns a Javascript Date equivalent to this DateTime.
	   * @return {Date}
	   */
	  toJSDate() {
	    return new Date(this.isValid ? this.ts : NaN);
	  }

	  // COMPARE

	  /**
	   * Return the difference between two DateTimes as a Duration.
	   * @param {DateTime} otherDateTime - the DateTime to compare this one to
	   * @param {string|string[]} [unit=['milliseconds']] - the unit or array of units (such as 'hours' or 'days') to include in the duration.
	   * @param {Object} opts - options that affect the creation of the Duration
	   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
	   * @example
	   * var i1 = DateTime.fromISO('1982-05-25T09:45'),
	   *     i2 = DateTime.fromISO('1983-10-14T10:30');
	   * i2.diff(i1).toObject() //=> { milliseconds: 43807500000 }
	   * i2.diff(i1, 'hours').toObject() //=> { hours: 12168.75 }
	   * i2.diff(i1, ['months', 'days']).toObject() //=> { months: 16, days: 19.03125 }
	   * i2.diff(i1, ['months', 'days', 'hours']).toObject() //=> { months: 16, days: 19, hours: 0.75 }
	   * @return {Duration}
	   */
	  diff(otherDateTime, unit = "milliseconds", opts = {}) {
	    if (!this.isValid || !otherDateTime.isValid) {
	      return Duration.invalid(
	        this.invalid || otherDateTime.invalid,
	        "created by diffing an invalid DateTime"
	      );
	    }

	    const durOpts = Object.assign(
	      { locale: this.locale, numberingSystem: this.numberingSystem },
	      opts
	    );

	    const units = maybeArray(unit).map(Duration.normalizeUnit),
	      otherIsLater = otherDateTime.valueOf() > this.valueOf(),
	      earlier = otherIsLater ? this : otherDateTime,
	      later = otherIsLater ? otherDateTime : this,
	      diffed = diff(earlier, later, units, durOpts);

	    return otherIsLater ? diffed.negate() : diffed;
	  }

	  /**
	   * Return the difference between this DateTime and right now.
	   * See {@link diff}
	   * @param {string|string[]} [unit=['milliseconds']] - the unit or units units (such as 'hours' or 'days') to include in the duration
	   * @param {Object} opts - options that affect the creation of the Duration
	   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
	   * @return {Duration}
	   */
	  diffNow(unit = "milliseconds", opts = {}) {
	    return this.diff(DateTime.local(), unit, opts);
	  }

	  /**
	   * Return an Interval spanning between this DateTime and another DateTime
	   * @param {DateTime} otherDateTime - the other end point of the Interval
	   * @return {Interval}
	   */
	  until(otherDateTime) {
	    return this.isValid ? Interval.fromDateTimes(this, otherDateTime) : this;
	  }

	  /**
	   * Return whether this DateTime is in the same unit of time as another DateTime
	   * @param {DateTime} otherDateTime - the other DateTime
	   * @param {string} unit - the unit of time to check sameness on
	   * @example DateTime.local().hasSame(otherDT, 'day'); //~> true if both the same calendar day
	   * @return {boolean}
	   */
	  hasSame(otherDateTime, unit) {
	    if (!this.isValid) return false;
	    if (unit === "millisecond") {
	      return this.valueOf() === otherDateTime.valueOf();
	    } else {
	      const inputMs = otherDateTime.valueOf();
	      return this.startOf(unit) <= inputMs && inputMs <= this.endOf(unit);
	    }
	  }

	  /**
	   * Equality check
	   * Two DateTimes are equal iff they represent the same millisecond, have the same zone and location, and are both valid.
	   * To compare just the millisecond values, use `+dt1 === +dt2`.
	   * @param {DateTime} other - the other DateTime
	   * @return {boolean}
	   */
	  equals(other) {
	    return (
	      this.isValid &&
	      other.isValid &&
	      this.valueOf() === other.valueOf() &&
	      this.zone.equals(other.zone) &&
	      this.loc.equals(other.loc)
	    );
	  }

	  /**
	   * Returns a string representation of a this time relative to now, such as "in two days". Can only internationalize if your
	   * platform supports Intl.RelativeTimeFormat. Rounds down by default.
	   * @param {Object} options - options that affect the output
	   * @param {DateTime} [options.base=DateTime.local()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
	   * @param {string} [options.style="long"] - the style of units, must be "long", "short", or "narrow"
	   * @param {string} options.unit - use a specific unit; if omitted, the method will pick the unit. Use one of "years", "quarters", "months", "weeks", "days", "hours", "minutes", or "seconds"
	   * @param {boolean} [options.round=true] - whether to round the numbers in the output.
	   * @param {boolean} [options.padding=0] - padding in milliseconds. This allows you to round up the result if it fits inside the threshold. Don't use in combination with {round: false} because the decimal output will include the padding.
	   * @param {string} options.locale - override the locale of this DateTime
	   * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
	   * @example DateTime.local().plus({ days: 1 }).toRelative() //=> "in 1 day"
	   * @example DateTime.local().setLocale("es").toRelative({ days: 1 }) //=> "dentro de 1 día"
	   * @example DateTime.local().plus({ days: 1 }).toRelative({ locale: "fr" }) //=> "dans 23 heures"
	   * @example DateTime.local().minus({ days: 2 }).toRelative() //=> "2 days ago"
	   * @example DateTime.local().minus({ days: 2 }).toRelative({ unit: "hours" }) //=> "48 hours ago"
	   * @example DateTime.local().minus({ hours: 36 }).toRelative({ round: false }) //=> "1.5 days ago"
	   */
	  toRelative(options = {}) {
	    if (!this.isValid) return null;
	    const base = options.base || DateTime.fromObject({ zone: this.zone }),
	      padding = options.padding ? (this < base ? -options.padding : options.padding) : 0;
	    return diffRelative(
	      base,
	      this.plus(padding),
	      Object.assign(options, {
	        numeric: "always",
	        units: ["years", "months", "days", "hours", "minutes", "seconds"]
	      })
	    );
	  }

	  /**
	   * Returns a string representation of this date relative to today, such as "yesterday" or "next month".
	   * Only internationalizes on platforms that supports Intl.RelativeTimeFormat.
	   * @param {Object} options - options that affect the output
	   * @param {DateTime} [options.base=DateTime.local()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
	   * @param {string} options.locale - override the locale of this DateTime
	   * @param {string} options.unit - use a specific unit; if omitted, the method will pick the unit. Use one of "years", "quarters", "months", "weeks", or "days"
	   * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
	   * @example DateTime.local().plus({ days: 1 }).toRelativeCalendar() //=> "tomorrow"
	   * @example DateTime.local().setLocale("es").plus({ days: 1 }).toRelative() //=> ""mañana"
	   * @example DateTime.local().plus({ days: 1 }).toRelativeCalendar({ locale: "fr" }) //=> "demain"
	   * @example DateTime.local().minus({ days: 2 }).toRelativeCalendar() //=> "2 days ago"
	   */
	  toRelativeCalendar(options = {}) {
	    if (!this.isValid) return null;

	    return diffRelative(
	      options.base || DateTime.fromObject({ zone: this.zone }),
	      this,
	      Object.assign(options, {
	        numeric: "auto",
	        units: ["years", "months", "days"],
	        calendary: true
	      })
	    );
	  }

	  /**
	   * Return the min of several date times
	   * @param {...DateTime} dateTimes - the DateTimes from which to choose the minimum
	   * @return {DateTime} the min DateTime, or undefined if called with no argument
	   */
	  static min(...dateTimes) {
	    if (!dateTimes.every(DateTime.isDateTime)) {
	      throw new InvalidArgumentError("min requires all arguments be DateTimes");
	    }
	    return bestBy(dateTimes, i => i.valueOf(), Math.min);
	  }

	  /**
	   * Return the max of several date times
	   * @param {...DateTime} dateTimes - the DateTimes from which to choose the maximum
	   * @return {DateTime} the max DateTime, or undefined if called with no argument
	   */
	  static max(...dateTimes) {
	    if (!dateTimes.every(DateTime.isDateTime)) {
	      throw new InvalidArgumentError("max requires all arguments be DateTimes");
	    }
	    return bestBy(dateTimes, i => i.valueOf(), Math.max);
	  }

	  // MISC

	  /**
	   * Explain how a string would be parsed by fromFormat()
	   * @param {string} text - the string to parse
	   * @param {string} fmt - the format the string is expected to be in (see description)
	   * @param {Object} options - options taken by fromFormat()
	   * @return {Object}
	   */
	  static fromFormatExplain(text, fmt, options = {}) {
	    const { locale = null, numberingSystem = null } = options,
	      localeToUse = Locale.fromOpts({
	        locale,
	        numberingSystem,
	        defaultToEN: true
	      });
	    return explainFromTokens(localeToUse, text, fmt);
	  }

	  /**
	   * @deprecated use fromFormatExplain instead
	   */
	  static fromStringExplain(text, fmt, options = {}) {
	    return DateTime.fromFormatExplain(text, fmt, options);
	  }

	  // FORMAT PRESETS

	  /**
	   * {@link toLocaleString} format like 10/14/1983
	   * @type {Object}
	   */
	  static get DATE_SHORT() {
	    return DATE_SHORT;
	  }

	  /**
	   * {@link toLocaleString} format like 'Oct 14, 1983'
	   * @type {Object}
	   */
	  static get DATE_MED() {
	    return DATE_MED;
	  }

	  /**
	   * {@link toLocaleString} format like 'October 14, 1983'
	   * @type {Object}
	   */
	  static get DATE_FULL() {
	    return DATE_FULL;
	  }

	  /**
	   * {@link toLocaleString} format like 'Tuesday, October 14, 1983'
	   * @type {Object}
	   */
	  static get DATE_HUGE() {
	    return DATE_HUGE;
	  }

	  /**
	   * {@link toLocaleString} format like '09:30 AM'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get TIME_SIMPLE() {
	    return TIME_SIMPLE;
	  }

	  /**
	   * {@link toLocaleString} format like '09:30:23 AM'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get TIME_WITH_SECONDS() {
	    return TIME_WITH_SECONDS;
	  }

	  /**
	   * {@link toLocaleString} format like '09:30:23 AM EDT'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get TIME_WITH_SHORT_OFFSET() {
	    return TIME_WITH_SHORT_OFFSET;
	  }

	  /**
	   * {@link toLocaleString} format like '09:30:23 AM Eastern Daylight Time'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get TIME_WITH_LONG_OFFSET() {
	    return TIME_WITH_LONG_OFFSET;
	  }

	  /**
	   * {@link toLocaleString} format like '09:30', always 24-hour.
	   * @type {Object}
	   */
	  static get TIME_24_SIMPLE() {
	    return TIME_24_SIMPLE;
	  }

	  /**
	   * {@link toLocaleString} format like '09:30:23', always 24-hour.
	   * @type {Object}
	   */
	  static get TIME_24_WITH_SECONDS() {
	    return TIME_24_WITH_SECONDS;
	  }

	  /**
	   * {@link toLocaleString} format like '09:30:23 EDT', always 24-hour.
	   * @type {Object}
	   */
	  static get TIME_24_WITH_SHORT_OFFSET() {
	    return TIME_24_WITH_SHORT_OFFSET;
	  }

	  /**
	   * {@link toLocaleString} format like '09:30:23 Eastern Daylight Time', always 24-hour.
	   * @type {Object}
	   */
	  static get TIME_24_WITH_LONG_OFFSET() {
	    return TIME_24_WITH_LONG_OFFSET;
	  }

	  /**
	   * {@link toLocaleString} format like '10/14/1983, 9:30 AM'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get DATETIME_SHORT() {
	    return DATETIME_SHORT;
	  }

	  /**
	   * {@link toLocaleString} format like '10/14/1983, 9:30:33 AM'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get DATETIME_SHORT_WITH_SECONDS() {
	    return DATETIME_SHORT_WITH_SECONDS;
	  }

	  /**
	   * {@link toLocaleString} format like 'Oct 14, 1983, 9:30 AM'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get DATETIME_MED() {
	    return DATETIME_MED;
	  }

	  /**
	   * {@link toLocaleString} format like 'Oct 14, 1983, 9:30:33 AM'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get DATETIME_MED_WITH_SECONDS() {
	    return DATETIME_MED_WITH_SECONDS;
	  }

	  /**
	   * {@link toLocaleString} format like 'Fri, 14 Oct 1983, 9:30 AM'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get DATETIME_MED_WITH_WEEKDAY() {
	    return DATETIME_MED_WITH_WEEKDAY;
	  }

	  /**
	   * {@link toLocaleString} format like 'October 14, 1983, 9:30 AM EDT'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get DATETIME_FULL() {
	    return DATETIME_FULL;
	  }

	  /**
	   * {@link toLocaleString} format like 'October 14, 1983, 9:30:33 AM EDT'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get DATETIME_FULL_WITH_SECONDS() {
	    return DATETIME_FULL_WITH_SECONDS;
	  }

	  /**
	   * {@link toLocaleString} format like 'Friday, October 14, 1983, 9:30 AM Eastern Daylight Time'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get DATETIME_HUGE() {
	    return DATETIME_HUGE;
	  }

	  /**
	   * {@link toLocaleString} format like 'Friday, October 14, 1983, 9:30:33 AM Eastern Daylight Time'. Only 12-hour if the locale is.
	   * @type {Object}
	   */
	  static get DATETIME_HUGE_WITH_SECONDS() {
	    return DATETIME_HUGE_WITH_SECONDS;
	  }
	}

	/**
	 * @private
	 */
	function friendlyDateTime(dateTimeish) {
	  if (DateTime.isDateTime(dateTimeish)) {
	    return dateTimeish;
	  } else if (dateTimeish && dateTimeish.valueOf && isNumber(dateTimeish.valueOf())) {
	    return DateTime.fromJSDate(dateTimeish);
	  } else if (dateTimeish && typeof dateTimeish === "object") {
	    return DateTime.fromObject(dateTimeish);
	  } else {
	    throw new InvalidArgumentError(
	      `Unknown datetime argument: ${dateTimeish}, of type ${typeof dateTimeish}`
	    );
	  }
	}

	var luxon = /*#__PURE__*/Object.freeze({
		__proto__: null,
		DateTime: DateTime,
		Duration: Duration,
		Interval: Interval,
		Info: Info,
		Zone: Zone,
		FixedOffsetZone: FixedOffsetZone,
		IANAZone: IANAZone,
		InvalidZone: InvalidZone,
		LocalZone: LocalZone,
		Settings: Settings
	});

	class CronJob {
	    constructor(cronManager, cronExpressionArg, jobFunction) {
	        this.status = 'initial';
	        this.cronInterval = parser.parseExpression('* * * * * *');
	        this.nextExecutionUnix = 0;
	        this.cronExpression = cronExpressionArg;
	        this.jobFunction = jobFunction;
	    }
	    /**
	     * checks wether the cronjob needs to be executed
	     */
	    checkExecution() {
	        if (this.nextExecutionUnix === 0) {
	            this.nextExecutionUnix = this.cronInterval.next().toDate().getTime();
	            return;
	        }
	        if (Date.now() > this.nextExecutionUnix) {
	            this.jobFunction();
	            this.nextExecutionUnix = this.cronInterval.next().toDate().getTime();
	        }
	    }
	    start() {
	        this.cronInterval = this.getCronInterval();
	        this.status = 'started';
	    }
	    stop() {
	        this.status = 'stopped';
	    }
	    getCronInterval() {
	        return parser.parseExpression(this.cronExpression);
	    }
	}

	class Interval$1 {
	    constructor(intervalMillisencondsArg) {
	        this.status = 'initial';
	        this.statusAuthorization = null;
	        this.intervalJobs = [];
	        this.intervalMilliseconds = intervalMillisencondsArg;
	    }
	    start() {
	        this.status = 'started';
	        const statusAuth = new Date();
	        this.statusAuthorization = statusAuth;
	        const runInterval = async () => {
	            while (this.status === 'started' && this.statusAuthorization === statusAuth) {
	                await dist_1$1(this.intervalMilliseconds);
	                this.executeIntervalJobs();
	            }
	        };
	        runInterval();
	    }
	    stop() {
	        this.status = 'stopped';
	        this.statusAuthorization = null;
	    }
	    addIntervalJob(funcArg) {
	        this.intervalJobs.push(funcArg);
	    }
	    executeIntervalJobs() {
	        for (const funcArg of this.intervalJobs) {
	            funcArg();
	        }
	    }
	}

	class CronManager {
	    constructor() {
	        this.cronInterval = new Interval$1(1000);
	        this.status = 'stopped';
	        this.cronjobs = [];
	        this.cronInterval.addIntervalJob(() => {
	            for (const cronJob of this.cronjobs) {
	                cronJob.checkExecution();
	            }
	        });
	    }
	    addCronjob(cronIdentifierArg, cronFunctionArg) {
	        const newCronJob = new CronJob(this, cronIdentifierArg, cronFunctionArg);
	        this.cronjobs.push(newCronJob);
	        if (this.status === 'started') {
	            newCronJob.start();
	        }
	    }
	    /**
	     * starts the cronjob
	     */
	    start() {
	        this.status = 'started';
	        for (const cron of this.cronjobs) {
	            cron.start();
	        }
	        this.cronInterval.start();
	    }
	    /**
	     * stops all cronjobs
	     */
	    stop() {
	        this.status = 'stopped';
	        for (const cron of this.cronjobs) {
	            cron.stop();
	        }
	        this.cronInterval.stop();
	    }
	}

	class ExtendedDate extends Date {
	    constructor(unixMilli) {
	        super(unixMilli);
	    }
	    // STATIC factories
	    static fromMillis(milliSeconds) {
	        return new ExtendedDate(milliSeconds);
	    }
	    static fromDate(dateArg) {
	        return new ExtendedDate(dateArg.getTime());
	    }
	    static fromEuropeanDate(europeanDate) {
	        const dateArray = /(.*)\.(.*)\.(.*)/.exec(europeanDate);
	        const luxonDate = DateTime.utc(parseFloat(dateArray[3]), // year
	        parseFloat(dateArray[2]), // month
	        parseFloat(dateArray[1]) // day
	        );
	        const unixMilli = luxonDate.toMillis();
	        return new ExtendedDate(unixMilli);
	    }
	    /**
	     * creates an Extended date from a hypedDate like "2018-03-28"
	     * @param dateString
	     */
	    static fromHyphedDate(dateString) {
	        // guards
	        // implementation
	        const dateMillis = new Date(dateString).getTime();
	        return new ExtendedDate(dateMillis);
	    }
	    /**
	     * Same as .fromEuropeanDate(), but accepts additional timeArg and zoneArg
	     */
	    static fromEuropeanDateAndTime(europeanDateArg, timeArg = '12:00:00', zoneArg = 'Europe/Berlin') {
	        // guards
	        // implementation
	        const dateArray = /(.*)\.(.*)\.(.*)/.exec(europeanDateArg);
	        const sliceDate = (dateString) => {
	            return `0${dateString}`.slice(-2);
	        };
	        const dateTimeString = `${dateArray[3]}-${sliceDate(dateArray[2])}-${sliceDate(dateArray[1])}T${timeArg}`;
	        const luxonDate = DateTime.fromISO(dateTimeString, {
	            zone: zoneArg
	        });
	        const unixMilli = luxonDate.toMillis();
	        return new ExtendedDate(unixMilli);
	    }
	    //
	    exportToEuropeanDate() {
	        const units = this.exportToUnits();
	        return `${units.dayString}.${units.monthString}.${units.yearString}`;
	    }
	    /**
	     * exports units
	     */
	    exportToUnits() {
	        const monthsArray = [
	            'January',
	            'February',
	            'March',
	            'April',
	            'May',
	            'June',
	            'July',
	            'August',
	            'September',
	            'October',
	            'November',
	            'December'
	        ];
	        const daysArray = [
	            'Monday',
	            'Tuesday',
	            'Wednesday',
	            'Thursday',
	            'Friday',
	            'Saturday',
	            'Sunday'
	        ];
	        return {
	            year: this.getFullYear(),
	            yearString: `${this.getFullYear()}`,
	            month: this.getMonth() + 1,
	            monthString: ("0" + (this.getMonth() + 1)).slice(-2),
	            monthName: monthsArray[this.getMonth()],
	            day: this.getDate(),
	            dayString: ("0" + this.getDate()).slice(-2),
	            dayOfTheWeek: this.getDay(),
	            dayOfTheWeekName: daysArray[this.getDay()]
	        };
	    }
	}

	/**
	 * easy high resolution time measurement
	 */
	class HrtMeasurement {
	    constructor() {
	        this.nanoSeconds = null;
	        this.milliSeconds = null;
	        this._hrTimeStart = null;
	        this._hrTimeStopDiff = null;
	        this._started = false;
	    }
	    /**
	     * start the measurement
	     */
	    start() {
	        this._started = true;
	        this._hrTimeStart = process.hrtime();
	    }
	    /**
	     * stop the measurement
	     */
	    stop() {
	        if (this._started === false) {
	            console.log("Hasn't started yet");
	            return;
	        }
	        this._hrTimeStopDiff = process.hrtime(this._hrTimeStart);
	        this.nanoSeconds = this._hrTimeStopDiff[0] * 1e9 + this._hrTimeStopDiff[1];
	        this.milliSeconds = this.nanoSeconds / 1000000;
	        return this;
	    }
	    /**
	     * reset the measurement
	     */
	    reset() {
	        this.nanoSeconds = null;
	        this.milliSeconds = null;
	        this._hrTimeStart = null;
	        this._hrTimeStopDiff = null;
	        this._started = false;
	    }
	}

	/**
	 * TimeStamp
	 * smart timestamp
	 */
	class TimeStamp {
	    constructor(creatorArg) {
	        /**
	         * if derived from another TimeStamp points out the change in milliseconds
	         */
	        this.change = null;
	        if (!creatorArg) {
	            this.date = new Date();
	        }
	        else if (typeof creatorArg === 'number') {
	            this.date = new Date(creatorArg);
	        }
	        this.milliSeconds = this.date.getTime();
	        this.epochtime = Math.floor(this.milliSeconds / 1000);
	    }
	    /**
	     * returns new TimeStamp from milliseconds
	     */
	    static fromMilliSeconds(milliSecondsArg) {
	        return new TimeStamp(milliSecondsArg);
	    }
	    /**
	     * returns new TimeStamp for now with change set
	     * @param timeStampArg
	     */
	    static fromTimeStamp(timeStampArg) {
	        const localTimeStamp = new TimeStamp();
	        localTimeStamp.change = localTimeStamp.milliSeconds - timeStampArg.milliSeconds;
	        return localTimeStamp;
	    }
	    /**
	     * Is the current instance older than the argument
	     * @param TimeStampArg
	     */
	    isOlderThan(TimeStampArg, tresholdTimeArg = 0) {
	        if (this.milliSeconds + tresholdTimeArg < TimeStampArg.milliSeconds) {
	            return true;
	        }
	        else {
	            return false;
	        }
	    }
	    /**
	     * returns a boolean for wether a timestamp is younger
	     * @param TimeStampArg
	     * @param tresholdTimeArg
	     */
	    isYoungerThanOtherTimeStamp(TimeStampArg, tresholdTimeArg = 0) {
	        if (this.milliSeconds > TimeStampArg.milliSeconds + tresholdTimeArg) {
	            return true;
	        }
	        else {
	            return false;
	        }
	    }
	    isYoungerThanMilliSeconds(millisecondArg) {
	        const nowTimeStamp = new TimeStamp();
	        const compareEpochTime = nowTimeStamp.epochtime - millisecondArg;
	        const compareTimeStamp = new TimeStamp(compareEpochTime);
	        return this.isYoungerThanOtherTimeStamp(compareTimeStamp);
	    }
	}

	class Timer {
	    constructor(timeInMillisecondsArg) {
	        /**
	         * the state of the timer
	         */
	        this.state = 'initiated';
	        // a deferred triggeted when Timer has completed
	        this.completedDeferred = dist_2();
	        this.timeInMilliseconds = timeInMillisecondsArg;
	        this.completed = this.completedDeferred.promise;
	    }
	    get timeLeft() {
	        return this.timeInMilliseconds - this.pausedAt.change;
	    }
	    /**
	     * starts the timer
	     */
	    start() {
	        if (!this.startedAt) {
	            this.currentTimeout = setTimeout(() => {
	                this.completedDeferred.resolve();
	            }, this.timeInMilliseconds);
	            this.startedAt = new TimeStamp();
	        }
	        else {
	            throw new Error('timer has been started before. Please use resume instead');
	        }
	    }
	    pause() {
	        if (this.startedAt) {
	            clearTimeout(this.currentTimeout);
	            this.currentTimeout = null;
	            this.pausedAt = TimeStamp.fromTimeStamp(this.startedAt);
	        }
	    }
	    resume() {
	        if (this.startedAt) {
	            this.currentTimeout = setTimeout(() => {
	                this.completedDeferred.resolve();
	            }, this.timeLeft);
	        }
	        else {
	            throw new Error('timer has NOT been started before. Please use .start() instead');
	        }
	    }
	    reset() {
	        this.pause();
	        this.startedAt = null;
	        this.pausedAt = null;
	    }
	}

	let units = {
	    years: (timesArg = 1) => {
	        return timesArg * 3.154e10;
	    },
	    months: (timesArg = 1) => {
	        return timesArg * 2.628e9;
	    },
	    weeks: (timesArg = 1) => {
	        return timesArg * 6.048e8;
	    },
	    days: (timesArg = 1) => {
	        return timesArg * 8.64e7;
	    },
	    hours: (timesArg = 1) => {
	        return timesArg * 3.6e6;
	    },
	    minutes: (timesArg = 1) => {
	        return timesArg * 60000;
	    }
	};
	let getMilliSecondsFromUnits = (combinationArg) => {
	    let timeInMilliseconds = 0;
	    let addMilliSeconds = milliSecondsArg => {
	        timeInMilliseconds = timeInMilliseconds + milliSecondsArg;
	    };
	    if (combinationArg.years) {
	        addMilliSeconds(units.years(combinationArg.years));
	    }
	    if (combinationArg.months) {
	        addMilliSeconds(units.months(combinationArg.months));
	    }
	    if (combinationArg.weeks) {
	        addMilliSeconds(units.weeks(combinationArg.weeks));
	    }
	    if (combinationArg.days) {
	        addMilliSeconds(units.days(combinationArg.days));
	    }
	    if (combinationArg.hours) {
	        addMilliSeconds(units.hours(combinationArg.hours));
	    }
	    if (combinationArg.minutes) {
	        addMilliSeconds(units.minutes(combinationArg.minutes));
	    }
	    return timeInMilliseconds;
	};

	exports.CronManager = CronManager;
	exports.ExtendedDate = ExtendedDate;
	exports.HrtMeasurement = HrtMeasurement;
	exports.TimeStamp = TimeStamp;
	exports.Timer = Timer;
	exports.getMilliSecondsFromUnits = getMilliSecondsFromUnits;
	exports.luxon = luxon;
	exports.units = units;

	return exports;

}({}, fs));
//# sourceMappingURL=bundle.js.map
