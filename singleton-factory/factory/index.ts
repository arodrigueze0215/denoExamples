import ConsoleLogger from "../singleton/ConsoleLogger.ts";
import FileLogger from "../singleton/FileLogger.ts";

class Factory {
    static Logger(type: string) {
        switch (type) {
            case 'log':
                return new ConsoleLogger();
            case 'file':
                return new FileLogger();

            default:
                break;
        }

    }
}

export default Factory;