import Factory from "./factory/index.ts";

console.log('Log')
const consoleLogger = Factory.Logger('log')
consoleLogger?.log('Andres')
consoleLogger?.log('Daniela')
consoleLogger?.log('Rafael')
consoleLogger?.log('Amelia')
consoleLogger?.getLogs().forEach((log:string) => {
    console.log(log)
});
console.log('File')
const fileLogger = Factory.Logger('file')
fileLogger?.log('Andres')
fileLogger?.log('Daniela')
fileLogger?.log('Rafael')
fileLogger?.log('Amelia')
fileLogger?.getLogs().forEach((log:string) => {
    console.log(log)
});