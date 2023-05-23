"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllParameters = void 0;
const ssm_1 = __importDefault(require("aws-sdk/clients/ssm"));
const getAllParameters = async (searchPath) => {
    let parameters = [];
    const ssm = new ssm_1.default({ region: 'us-east-1' });
    let result = await ssm.getParametersByPath({ Path: searchPath, Recursive: true, MaxResults: 10 }).promise();
    while (result.NextToken) {
        for (const param of result.Parameters) {
            parameters.push(param.Name.replace(searchPath, ""));
            result = await ssm.getParametersByPath({ Path: searchPath, Recursive: true, NextToken: result.NextToken, MaxResults: 10 }).promise();
        }
    }
    return parameters;
};
exports.getAllParameters = getAllParameters;
