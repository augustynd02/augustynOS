import { File } from './File';

export type ImageFile = File & {
    type: "imagefile";
    src: string;
}
