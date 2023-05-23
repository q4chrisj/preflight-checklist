"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMatchesInFiles = exports.getAllFiles = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const regex_patterns_1 = require("./regex_patterns");
const excluded_dirs = ["node_modules", "dist", ".git", ".github"];
const getAllFiles = function (dir, fileArray) {
    let entries = fs_1.default.readdirSync(dir);
    fileArray = fileArray || [];
    entries.forEach(entry => {
        let is_exluded_dir = excluded_dirs.find(dir => dir == entry);
        if (!is_exluded_dir) {
            if (fs_1.default.statSync(path_1.default.join(dir, entry)).isDirectory()) {
                fileArray = (0, exports.getAllFiles)(path_1.default.join(dir, entry), fileArray);
            }
            else {
                fileArray.push(path_1.default.join(dir, entry));
            }
        }
    });
    return fileArray;
};
exports.getAllFiles = getAllFiles;
const findMatchesInFiles = function (files, appName) {
    let found_parameters = [];
    for (const file of files) {
        let file_contents = fs_1.default.readFileSync(file, 'utf8');
        const file_contents_array = file_contents.split(/\r?\n/);
        const pattern = regex_patterns_1.RegexPatterns.get("Terraform");
        file_contents_array.forEach((line) => {
            found_parameters = found_parameters.concat(Array.from(line.matchAll(pattern), (m) => m[1].startsWith("$") || m[1].indexOf("/") < 0 ? appName + "/" + m[1].substring(m[1].indexOf("/") + 1) : m[1]));
        });
    }
    return found_parameters = found_parameters.filter((item, index) => found_parameters.indexOf(item) === index); // remove duplicates
};
exports.findMatchesInFiles = findMatchesInFiles;
