require('./sourcemap-register.js');/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 283:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
// import * as core from "@actions/core";
// import * as github from "@actions/github";
const fs_1 = __importDefault(__nccwpck_require__(747));
const path_1 = __importDefault(__nccwpck_require__(622));
// const token = core.getInput("token");
// const octokit = github.getOctokit(token);
// const repo = github.context.repo;
let repo_files = [];
const excluded_dirs = ["node_modules", "dist", ".git"];
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        let workspace = process.env.GITHUB_WORKSPACE || path_1.default.join(__dirname, "../");
        console.log('\nFiles in: %s\n', workspace);
        repo_files = getAllFiles(workspace, []);
        repo_files.forEach(file => {
            console.log(file);
        });
    });
}
const getAllFiles = function (dir, fileArray) {
    let entries = fs_1.default.readdirSync(dir);
    fileArray = fileArray || [];
    entries.forEach(entry => {
        let is_exluded_dir = excluded_dirs.find(dir => dir == entry);
        if (!is_exluded_dir) {
            if (fs_1.default.statSync(path_1.default.join(dir, entry)).isDirectory()) {
                fileArray = getAllFiles(path_1.default.join(dir, entry), fileArray);
            }
            else {
                fileArray.push(path_1.default.join(dir, entry));
            }
        }
    });
    return fileArray;
};
run();


/***/ }),

/***/ 747:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 622:
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(283);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map