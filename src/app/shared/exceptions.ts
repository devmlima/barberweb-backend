export class HttpException extends Error {
    statusCode: number;
    constructor(message, status = 500){
        super();
        this.statusCode = status;
        this.message = message;
    }
    getStatus() {
        return this.statusCode;
    }
}

export class UnauthorizedException extends HttpException{
    constructor(message = "Acesso não autorizado", status = 401){
        super(message, status);
    }
}

export class BadRequestException extends HttpException{
    constructor(message = "Erro ao atender a requisição!", status = 400){
        super(message, status);
    }
}


export class ForbiddenException extends HttpException{
    constructor(message = "Você não tem permissão para acessar este conteúdo!", status = 403){
        super(message, status);
    }
}