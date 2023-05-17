import fs from 'fs';
import path from 'path';

const excluded_dirs = ["node_modules", "dist", ".git", ".github"];

export const getAllFiles = function(dir: string, fileArray: Array<string>): Array<string> {
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

export const findMatchesInFiles = function(files: string[], appName: string) {

  let found_parameters: Array<string> = [];
  for (const file of files) {
    let file_contents = fs.readFileSync(file, 'utf8');

    const pattern: RegExp = /name\s+=\s+"\/\$\{[^}]+\}\/([^"]+)"/g;
    found_parameters = found_parameters.concat(Array.from(file_contents.matchAll(pattern), (m) =>

      m[1].startsWith("$") ? appName + "/" + m[1].substring(m[1].indexOf("/") + 1) : m[1])
    );

    // const pattern: RegExp = /name\s*=\s*"([^"\r\n]*)"/g;
    //
    // let match;
    // while ((match = pattern.exec(file_contents)) !== null) {
    //   const extractedValue = match[0];
    //   found_parameters.push(extractedValue);
    // }
    //
    // for (const match of matches.) {
    //   console.log(match);
    //   found_parameters.concat(match[1])
    // }
    //

  }


  return found_parameters = found_parameters.filter((item, index) => found_parameters.indexOf(item) === index); // remove duplicates
  //return found_parameters;
}
