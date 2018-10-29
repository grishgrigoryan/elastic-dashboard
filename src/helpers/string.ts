export const slugify = (str:string) => {
    const parts = str
        .toLowerCase()
        .replace(/[-]+/g, ' ')
        .replace(/[^\w^\s]+/g, '')
        .replace(/ +/g, ' ').split(' ');
    return parts.join('-');
};
