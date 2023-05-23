import SSM from "aws-sdk/clients/ssm";

export const getAllParameters = async (searchPath: string): Promise<Array<string>> => {
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
