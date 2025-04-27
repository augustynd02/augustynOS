import { File } from './File';

export type TextFile = File & {
    type: "textfile";
    content: string;
}
