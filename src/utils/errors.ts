import { GraphQLError } from "graphql";
import { StatusCodes } from "http-status-codes";



export class ConflictException extends GraphQLError {
    constructor(message: string) {
        super(message, {
            extensions: {
                code: 'CONFLICT',
                http: {
                    status: StatusCodes.CONFLICT,
                },
            },
        });
        this.name = 'ConflictException';
    }
}

export class UnauthorizedException extends GraphQLError {
    constructor(message: string) {
        super(message, {
            extensions: {
                code: 'UNAUTHORIZED',
                http: {
                    status: StatusCodes.UNAUTHORIZED,
                },
            },
        });
        this.name = 'UnauthorizedException';
    }
}

export class NotFoundException extends GraphQLError {
    constructor(message: string) {
        super(message, {
            extensions: {
                code: 'NOT_FOUND',
                http: {
                    status: StatusCodes.NOT_FOUND,
                },
            },
        });
        this.name = 'NotFoundException';
    }
}
