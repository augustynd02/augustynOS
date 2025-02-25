import { File } from './File';

export type Folder = File & {
    type: "folder";
    children: File[];
}
