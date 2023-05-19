"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegexPatterns = exports.GeneralRegexPattern = void 0;
exports.GeneralRegexPattern = /(?<=\/)(.+?(?=\/)|.+?(?=(?:,|\})))/;
exports.RegexPatterns = new Map();
exports.RegexPatterns.set("Terraform", /name\s+=\s+"\/\$\{[^}]+\}\/([^"]+)"/g);
