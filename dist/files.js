"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMatchesInFiles = exports.getAllFiles = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
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
const findMatchesInFiles = function (files) {
    let found_parameters = [];
    for (const file of files) {
        let file_contents = fs_1.default.readFileSync(file, 'utf8');
        const pattern = /name\s+=\s+"\/\$\{[^}]+\}\/([^"]+)"/g;
        found_parameters = found_parameters.concat(Array.from(file_contents.matchAll(pattern), (m) => m[1]));
    }
    return found_parameters;
};
exports.findMatchesInFiles = findMatchesInFiles;
