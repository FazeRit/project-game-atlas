export const range = (start: number, end: number): Array<number> => {
    let length = end - start + 1;

    return Array.from({ length }, (_, i) => start + i);
};