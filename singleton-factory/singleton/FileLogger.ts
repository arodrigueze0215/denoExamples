class FileLogger {
    static instance: FileLogger;
    fileName: string;
    constructor() {
        this.fileName = "log.txt";
        if (!FileLogger.instance) {
            FileLogger.instance = this;
        }
        return FileLogger.instance;
    }
    
    public log(message:string) {
        const file = Deno.openSync(this.fileName, {write:true, append:true, create:true});
        const encoder = new TextEncoder()
        file?.writeSync(encoder.encode(`${new Date().toISOString()}: ${message} \n`));
        file?.close();
        
    }
    
    public getLogs(): string[] {
        const content = Deno.readTextFileSync(this.fileName);
        const lines = content.split("\n");
        return lines
    }
}

export default FileLogger