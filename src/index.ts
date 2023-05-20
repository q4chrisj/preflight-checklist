import { SSM } from "aws-sdk"
import path from 'path';
import { findMatchesInFiles, getAllFiles } from "./files";
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

/*
 * For demo:
 * - Create an object that contains the app_name, path to the correspnding file
 * - Then loop through each set and call findMatchesInFiles with an array of one file (the one from above)
 * - Proceed as usual
 */
async function run(): Promise<void> {

  // const app_name = "platform-studio-eds"
  // let workspace: string = process.env.GITHUB_WORKSPACE || path.join(__dirname, "../");
  // let repo_files: Array<string> = getAllFiles(workspace, []);

  const param_search_path = "/dev/"
  const Tests: Map<string, string> = new Map();
  Tests.set("platform-studio-eds", path.join(__dirname, "../test_data/studio-eds-ssm.tf"));
  Tests.set("platform-shell", path.join(__dirname, "../test_data/platform-shell.tf"));
  Tests.set("platform-events-eds", path.join(__dirname, "../test_data/events-eds.tf"));

  for (let [key, value] of Tests) {
    let found_parameters: Array<string> = findMatchesInFiles([value], key);
    console.log('\nSSM parameters found in: %s\n', key);
    found_parameters.forEach(f => {
      console.log("\t - %s", f);
    })

    let aws_parameters = await getAllParameters(param_search_path);
    let missing = found_parameters.filter(item => aws_parameters.indexOf(item) < 0);

    console.log("\nThe following SSM parameters don't exist in the target AWS account.\n")
    missing.forEach(item => {
      console.warn("\t - %s", item);
    });

    console.log("");
  }

  return;
}

const getAllParameters = async (searchPath: string): Promise<Array<string>> => {
  let parameters: Array<string> = [];

  const ssm = new SSM({ region: 'us-east-1' });
  let result = await ssm.getParametersByPath({ Path: searchPath, Recursive: true, MaxResults: 10 }).promise()

  while (result.NextToken) {
    for (const param of result.Parameters!) {
      parameters.push(param.Name!.replace(searchPath, ""));
      result = await ssm.getParametersByPath({ Path: searchPath, Recursive: true, NextToken: result.NextToken, MaxResults: 10 }).promise()
    }
  }

  return parameters;
}

run()
