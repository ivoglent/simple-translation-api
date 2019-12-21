export class TranslateOptions {
    public source: string = 'en';
    public target: string = 'vi';
    public format: string = 'text';

    constructor(options? : any) {
        if (options && options.source) {
            this.source = options.source;
        }
        if (options && options.target) {
            this.target = options.target;
        }
        if (options && options.format) {
            this.format = options.format;
        }
    }
}