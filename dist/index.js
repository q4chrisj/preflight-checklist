require('./sourcemap-register.js');/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 283:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


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
let workspace = process.env.GITHUB_WORKSPACE || path_1.default.join(__dirname, "../");
let repo_files = [];
let found_parameters = [];
const excluded_dirs = ["node_modules", "dist", ".git", ".github"];
async function run() {
    repo_files = getAllFiles(workspace, []);
    for (const file of repo_files) {
        let file_contents = fs_1.default.readFileSync(file, 'utf8');
        const pattern = /name\s+=\s+"\/\$\{[^}]+\}\/([^"]+)"/g;
        found_parameters = found_parameters.concat(Array.from(file_contents.matchAll(pattern), (m) => m[1]));
    }
    console.log('\nSSM parameters found in: %s\n', workspace);
    found_parameters.forEach(f => {
        console.log(f);
    });
    // now we have to
    // 1. Figure out what the branch we are merging into is
    // 2. Get the secrets for the branch we are merging into 
    // 3. Connect to aws using the credentials from 2
    // 4. Get all the SSM params and see if any are missing (based on what found_parameters contains)
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