export class EnsureError extends Error {
    constructor(
        message?: string
    ) {
        super(dedent(message));
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export function dedent (str: string): string {
    const lines = str.split(/\n/);
    const minWhipeSpace = lines.reduce((p, n) => {
        const whitespaceCount = n.search(/\S/);
        if (whitespaceCount <= 0) {
            return p;
        }
        return whitespaceCount < p ? whitespaceCount : p;
    }, Infinity);

    const newLines = lines.map(l => l.substr(minWhipeSpace));
    return newLines.join('\n');
}
