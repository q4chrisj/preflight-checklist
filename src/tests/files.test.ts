import path from "path";
import { findMatchesInFiles } from "../files";

describe("File Tests", () => {

  test("findAllMatchesInFiles matches studio-eds", () => {
    let files = [path.join(__dirname, "../../test_data/studio-eds-ssm.tf")];
    const expected = 8
    const actual = findMatchesInFiles(files, "platform-studio-eds");

    expect(actual.length).toEqual(expected);
  });

  test("findAllMatchesInFiles matches events", () => {
    let files = [path.join(__dirname, "../../test_data/events-eds.tf")];
    const expected = 5
    const actual = findMatchesInFiles(files, "platform-events-eds");

    expect(actual.length).toEqual(expected);
  });

  test("findAllMatchesInFiles matches platform-shell", () => {
    let files = [path.join(__dirname, "../../test_data/platform-shell.tf")];
    const expected = 8
    const actual = findMatchesInFiles(files, "platform-shell");

    expect(actual.length).toEqual(expected);
  });
});
