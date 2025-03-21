import { File } from './File';

export type Browser = File & {
    type: "browser";
    initialUrl?: string;
}
