import * as core from "@actions/core";
import * as github from "@actions/github";
import path from 'path';
import { findMatchesInFiles, getAllFiles } from "./files";

// const repo = github.context.repo;


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

  if (github.context.action) {
    console.log("Running on github.com\n");
    console.log('Process token: ' + process.env['INPUT_TOKEN']);
    const token: string = core.getInput('token');
    const target_awskey: string = core.getInput('target-aws-key-id');
    const target_awssecret: string = core.getInput('target-aws-secret-access-key');
    const octokit = github.getOctokit(token);

    console.log("Token: %i", token);
    console.log("Target AWS Access Key: %i", target_awskey);
    console.log("Target AWS Secret Access Key: %i\n", target_awssecret);



    console.log("Payload: \n");
    console.log(github.context.payload);
  }

  // now we have to
  // 1. Figure out what the branch we are merging into is
  // 2. Get the secrets for the branch we are merging into 
  // 3. Connect to aws using the credentials from 2
  // 4. Get all the SSM params and see if any are missing (based on what found_parameters contains)
  //


}


run()
