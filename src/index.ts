// import * as core from "@actions/core";
// import * as github from "@actions/github";
import { SSM } from "aws-sdk"
import path from 'path';
import { findMatchesInFiles, getAllFiles } from "./files";

async function run(): Promise<void> {

  let workspace: string = process.env.GITHUB_WORKSPACE || path.join(__dirname, "../");
  let repo_files: Array<string> = [];
  let found_parameters: Array<string> = [];

  repo_files = getAllFiles(workspace, []);
  found_parameters = findMatchesInFiles(repo_files);

  console.log('\nSSM parameters found in: %s\n', workspace);
  found_parameters.forEach(f => {
    console.log(f);
  })

  let aws_parameters = await getAllParameters();
  let missing = found_parameters.filter(item => aws_parameters.indexOf(item) < 0);
  // let missing = aws_parameters.filter(item => found_parameters.indexOf(item.replace) < 0);

  console.log(missing);

  // for (const param of aws_parameters) {
  //   console.log(param);
  // }

}

const getAllParameters = async (): Promise<Array<string>> => {

  let parameters: Array<string> = [];

  const ssm = new SSM({ region: 'us-east-1' });
  let result = await ssm.getParametersByPath({ Path: "/dev/", Recursive: true, MaxResults: 10 }).promise()

  while (result.NextToken) {
    for (const param of result.Parameters!)
      parameters.push(param.Name!.replace("/dev/", "") || "");
    result = await ssm.getParametersByPath({ Path: "/dev/", Recursive: true, NextToken: result.NextToken, MaxResults: 10 }).promise()
  }


  return parameters;
}

run()
