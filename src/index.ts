// import * as core from "@actions/core";
// import * as github from "@actions/github";
import fs from 'fs';
import path from 'path';

// const token = core.getInput("token");
// const octokit = github.getOctokit(token);
// const repo = github.context.repo;

let workspace: string = process.env.GITHUB_WORKSPACE || path.join(__dirname, "../");
let repo_files: Array<string> = [];
let found_parameters: Array<string> = [];
const excluded_dirs = ["node_modules", "dist", ".git", ".github"];

async function run(): Promise<void> {

  repo_files = getAllFiles(workspace, []);
  for (const file of repo_files) {
    let file_contents = fs.readFileSync(file, 'utf8');

    const pattern: RegExp = /name\s+=\s+"\/\$\{[^}]+\}\/([^"]+)"/g;
    found_parameters = found_parameters.concat(Array.from(file_contents.matchAll(pattern), (m) => m[1]));
  }

  console.log('\nSSM parameters found in: %s\n', workspace);
  found_parameters.forEach(f => {
    console.log(f);
  })


  // now we have to
  // 1. Figure out what the branch we are merging into is
  // 2. Get the secrets for the branch we are merging into 
  // 3. Connect to aws using the credentials from 2
  // 4. Get all the SSM params and see if any are missing (based on what found_parameters contains)

}

const getAllFiles = function(dir: string, fileArray: Array<string>): Array<string> {
  let entries = fs.readdirSync(dir);
  fileArray = fileArray || [];

  entries.forEach(entry => {
    let is_exluded_dir = excluded_dirs.find(dir => dir == entry);

    if (!is_exluded_dir) {
      if (fs.statSync(path.join(dir, entry)).isDirectory()) {
        fileArray = getAllFiles(path.join(dir, entry), fileArray);
      } else {
        fileArray.push(path.join(dir, entry));
      }
    }
  });


  return fileArray;
}

run()
