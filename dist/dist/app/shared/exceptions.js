"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenException = exports.BadRequestException = exports.UnauthorizedException = exports.HttpException = void 0;
class HttpException extends Error {
    constructor(message, status = 500) {
        super();
        this.statusCode = status;
        this.message = message;
    }
    getStatus() {
        return this.statusCode;
    }
}
exports.HttpException = HttpException;
class UnauthorizedException extends HttpException {
    constructor(message = "Acesso não autorizado", status = 401) {
        super(message, status);
    }
}
exports.UnauthorizedException = UnauthorizedException;
class BadRequestException extends HttpException {
    constructor(message = "Erro ao atender a requisição!", status = 400) {
        super(message, status);
    }
}
exports.BadRequestException = BadRequestException;
class ForbiddenException extends HttpException {
    constructor(message = "Você não tem permissão para acessar este conteúdo!", status = 403) {
        super(message, status);
    }
}
exports.ForbiddenException = ForbiddenException;
//# sourceMappingURL=exceptions.js.map