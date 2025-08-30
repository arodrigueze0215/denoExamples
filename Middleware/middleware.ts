type executeMiddlewares = {
    req: Request;
    res: Response;
    middlewareList: ((req: Request, res: Response, next: () => void) => void)[];
}
const authMiddleware = (req: Request, res: Response, next: () => void) => {
    console.log("Auth middleware", req.method, res.status); 
    next();
};

const validateMiddleware = (req: Request, res: Response, next: () => void) => {
    console.log("Validate middleware"   , req.method, res.status); 
    next();
};  

const createUserMiddleware = (req: Request, res: Response, next: () => void) => {
    console.log("Create user middleware", req.method, res.status);
    next();
};  

const executeMiddlewares = ({req, res, middlewareList}: executeMiddlewares) => {
    let index = 0;    
    const next = () => {
        if (index < middlewareList.length) {
            const middleware = middlewareList[index];
            index++;
            middleware(req, res, next);
        }
    };
    next();
};  

export { authMiddleware, validateMiddleware, createUserMiddleware, executeMiddlewares };
