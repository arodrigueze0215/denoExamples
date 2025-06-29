class ConsoleLogger {
    static instance: ConsoleLogger;
    logs: string [];
    constructor() {
        if (!ConsoleLogger.instance) {
            ConsoleLogger.instance = this;
        }
        this.logs = [];
        return ConsoleLogger.instance;
    }

    public log(message:string) {
        this.logs.push(`${new Date().toISOString()}: ${message}`)
    }
    
    public getLogs(){
        return this.logs
    }
}

export default ConsoleLogger