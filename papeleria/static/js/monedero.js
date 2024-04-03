/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 816:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Monedero = void 0;
var binderService_1 = __webpack_require__(840);
var toShortDate_1 = __webpack_require__(795);
var toShortMonth_1 = __webpack_require__(297);
var toCurrency_1 = __webpack_require__(646);
var Monedero = /** @class */ (function () {
    function Monedero() {
        var self = this;
        this.init = ko.observable(false);
        this.miembroDesde = ko.computed(function () {
            if (self.init() === false)
                return "";
            return (0, toShortMonth_1.default)(self.data.cliente.fechaCreado);
        }, self);
        this.dineroDisponible = ko.computed(function () {
            if (self.init() === false)
                return 0;
            return self.data.ventaMonederos.reduce(function (prev, it) {
                return prev + it.dineroDigitalDisponible;
            }, 0);
        }, self);
    }
    Monedero.prototype.loadData = function (data) {
        var self = this;
        self.data = data;
        self.init(true);
    };
    Monedero.prototype.toShortDate = function (date) {
        var self = this;
        return (0, toShortDate_1.default)(date);
    };
    Monedero.prototype.toCurrency = function (amt) {
        var self = this;
        return (0, toCurrency_1.default)(amt);
    };
    return Monedero;
}());
exports.Monedero = Monedero;
var monedero = $("#monedero");
var monederoAttr = "data-cliente-id";
var getId = function () { return monedero.attr(monederoAttr); };
document.addEventListener('DOMContentLoaded', function () { return __awaiter(void 0, void 0, void 0, function () {
    var id, url, resp, data, d, page, visita;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = getId();
                url = "/app/getdata?clienteId=".concat(id);
                return [4 /*yield*/, fetch(url)];
            case 1:
                resp = _a.sent();
                return [4 /*yield*/, resp.json()];
            case 2:
                data = _a.sent();
                d = data;
                if (d && d.cliente && d.cliente.id) {
                    monedero.attr(monederoAttr, d.cliente.id);
                    page = new Monedero();
                    page.loadData(d);
                    binderService_1.BinderService.bind(page, "#monederoPage");
                    console.log("binding ko");
                }
                else {
                    visita = "<p>Visita la papeler\u00EDa para obtener la applicaci\u00F3n m\u00F3vil</p>";
                    $("#monedero-data").contents();
                }
                return [2 /*return*/];
        }
    });
}); }, false);
// Registering Service Worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("/app/sw.js")
        .then(function (registration) {
        console.log("Service Worker Registered");
        console.log(registration);
    }).catch(function (err) {
        console.log("Fail registering Service Worker");
        console.log(err);
    });
}
else {
}


/***/ }),

/***/ 840:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BinderService = void 0;
/** Helper class that binds one Knockout models to a DOM object */
var BinderService = /** @class */ (function () {
    function BinderService() {
    }
    /**
     * Binds a Knockout model to a DOM object.
     * @param model Knockout model object.
     * @param selector Selector of the DOM to apply bindings.
     */
    BinderService.bind = function (model, selector) {
        var jqObj = $(selector);
        if (jqObj.length === 0) {
            return;
        }
        var domObj = jqObj[0];
        ko.cleanNode(domObj);
        ko.applyBindings(model, domObj);
    };
    BinderService.isBound = function (selector) {
        var jqObj = $(selector);
        return !!ko.dataFor(jqObj[0]);
    };
    return BinderService;
}());
exports.BinderService = BinderService;


/***/ }),

/***/ 646:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var intl = new Intl.NumberFormat('es-MX', {
    style: "currency",
    currency: "USD",
    currencyDisplay: "narrowSymbol"
});
exports["default"] = (function (val) {
    return intl.format(val);
});


/***/ }),

/***/ 795:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = (function (fechaAjuste) {
    var d = new Date(fechaAjuste);
    var m = d.getMonth();
    var month = "";
    switch (m) {
        case 0:
            month = "Ene";
            break;
        case 1:
            month = "Feb";
            break;
        case 2:
            month = "Mzo";
            break;
        case 3:
            month = "Abr";
            break;
        case 4:
            month = "May";
            break;
        case 5:
            month = "Jun";
            break;
        case 6:
            month = "Jul";
            break;
        case 7:
            month = "Ago";
            break;
        case 8:
            month = "Sep";
            break;
        case 9:
            month = "Oct";
            break;
        case 10:
            month = "Nov";
            break;
        case 11:
            month = "Dic";
            break;
        default:
            month = "";
            break;
    }
    return "".concat(d.getDate(), " de ").concat(month, " / ").concat(d.getFullYear());
});


/***/ }),

/***/ 297:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = (function (fechaAjuste) {
    var d = new Date(fechaAjuste);
    var m = d.getMonth();
    var month = "";
    switch (m) {
        case 0:
            month = "Ene";
            break;
        case 1:
            month = "Feb";
            break;
        case 2:
            month = "Mzo";
            break;
        case 3:
            month = "Abr";
            break;
        case 4:
            month = "May";
            break;
        case 5:
            month = "Jun";
            break;
        case 6:
            month = "Jul";
            break;
        case 7:
            month = "Ago";
            break;
        case 8:
            month = "Sep";
            break;
        case 9:
            month = "Oct";
            break;
        case 10:
            month = "Nov";
            break;
        case 11:
            month = "Dic";
            break;
        default:
            month = "";
            break;
    }
    return "".concat(month, " - ").concat(d.getFullYear());
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(816);
/******/ 	
/******/ })()
;