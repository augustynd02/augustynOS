import { File } from "../types/File";
import { TextFile } from "../types/TextFile";

const isTextFile = (file: File): file is TextFile => {
  return file.type === "textfile" && "content" in file;
};

export default isTextFile;
