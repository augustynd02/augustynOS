import { Browser } from "../types/Browser";
import { File } from "../types/File";

const isBrowserFile = (file: File): file is Browser => {
  return file.type === "browser" && "initialUrl" in file;
};

export default isBrowserFile;
