import * as core from "@actions/core";
import * as github from "@actions/github";

const token = core.getInput("token");
const octokit = github.getOctokit(token);
const repo = github.context.repo;

async function run(): Promise<void> {

}

run()
