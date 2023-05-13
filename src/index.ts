// import * as core from "@actions/core";
// import * as github from "@actions/github";
import fs from 'fs';
import path from 'path';

// const token = core.getInput("token");
// const octokit = github.getOctokit(token);
// const repo = github.context.repo;

let repo_files: Array<string> = [];
const excluded_dirs = ["node_modules", "dist", ".git"];
async function run(): Promise<void> {

  let workspace: string = process.env.GITHUB_WORKSPACE || path.join(__dirname, "../");

  console.log('\nFiles in: %s\n', workspace);

  repo_files = getAllFiles(workspace, []);

  repo_files.forEach(file => {
    console.log(file);
  })
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
