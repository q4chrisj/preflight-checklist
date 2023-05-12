import * as core from "@actions/core";
import * as github from "@actions/github";
import fs from 'fs';
import path from 'path';

// const token = core.getInput("token");
// const octokit = github.getOctokit(token);
// const repo = github.context.repo;

async function run(): Promise<void> {

  let workspace: string = process.env.GITHUB_WORKSPACE || "";
  console.log(workspace);
  const workspace_files = fs.readdir(workspace, (err, files) => {
    if (err) {
      console.error(err);
    }

    files.forEach(element => {
      console.log(element);
    });


  });
}

run()
