import { ImageFile } from "../types/ImageFile";

const createImageFile = (id: string, name: string, src: string = ''): ImageFile => {
    return {
        id: id,
        name: name,
        theme: 'dark',
        type: "imagefile",
        iconURL: src,
        src: src,
    }
}

export default createImageFile;
