export type Action = {
    name: string;
    cb: () => void;
    iconURL?: string;
    options?: Action[];
}
