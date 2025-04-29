import { File } from "../types/File";
import { ImageFile } from "../types/ImageFile";

const isImageFile = (file: File): file is ImageFile => {
  return file.type === "imagefile" && "src" in file;
};

export default isImageFile;
