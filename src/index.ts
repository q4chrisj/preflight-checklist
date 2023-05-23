import path from 'path';
import { findMatchesInFiles, getAllFiles } from "./files";
import { getAllParameters } from './parameters'
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

async function run(): Promise<void> {

  // this block is to demonstrate collecting files from an entire project:

  // const app_name = "platform-studio-eds"
  // let workspace: string = process.env.GITHUB_WORKSPACE || path.join(__dirname, "../");
  // let repo_files: Array<string> = getAllFiles(workspace, []);

  const param_search_path = "/dev/";
  const Tests: Map<string, string> = new Map();
  Tests.set("platform-studio-eds", path.join(__dirname, "../test_data/studio-eds-ssm.tf"));
  // Tests.set("platform-shell", path.join(__dirname, "../test_data/platform-shell.tf"));
  // Tests.set("platform-events-eds", path.join(__dirname, "../test_data/events-eds.tf"));

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


run()
