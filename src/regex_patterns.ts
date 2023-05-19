export const GeneralRegexPattern: RegExp = /(?<=\/)(.+?(?=\/)|.+?(?=(?:,|\})))/;

export const RegexPatterns: Map<string, RegExp> = new Map();
RegexPatterns.set("Terraform", /name\s+=\s+"\/\$\{[^}]+\}\/([^"]+)"/g);
