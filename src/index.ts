import * as core from "@actions/core";
import * as github from "@actions/github";
import path from 'path';
import { findMatchesInFiles, getAllFiles } from "./files";

const token = core.getInput("token");
// const octokit = github.getOctokit(token);
// const repo = github.context.repo;

let workspace: string = process.env.GITHUB_WORKSPACE || path.join(__dirname, "../");
let repo_files: Array<string> = [];
let found_parameters: Array<string> = [];

async function run(): Promise<void> {

  repo_files = getAllFiles(workspace, []);
  found_parameters = findMatchesInFiles(repo_files);

  console.log('\nSSM parameters found in: %s\n', workspace);
  found_parameters.forEach(f => {
    console.log(f);
  })

  if (github.context.action) {
    console.log("Running on github.com");
  }

  // now we have to
  // 1. Figure out what the branch we are merging into is
  // 2. Get the secrets for the branch we are merging into 
  // 3. Connect to aws using the credentials from 2
  // 4. Get all the SSM params and see if any are missing (based on what found_parameters contains)
  //


}


run()
