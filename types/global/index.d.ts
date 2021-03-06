declare module '*.yaml' {
    const content: string;
    export default content;
}

declare module '*.yml' {
    const content: string;
    export default content;
}

declare module '*.less' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.css' {
    const classes: { [key: string]: string };
    export default classes;
}
