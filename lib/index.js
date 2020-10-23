"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
function useEffectExceptMount() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var isRunningOnMount = react_1.default.useRef(true);
    react_1.default.useEffect(function () {
        if (isRunningOnMount.current)
            isRunningOnMount.current = false;
        else
            return args[0]();
    }, args[1]);
}
exports.default = useEffectExceptMount;
