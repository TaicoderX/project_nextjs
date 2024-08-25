type customOptions = Omit<RequestInit, 'method'> & {
    baseUrl?: string | undefined
}

const ENTITY_ERROR_STATUS = 422
const AUTHENTICATION_ERROR_STATUS = 401

type typeHttpErrorPayload = {
    message: string,
    [key: string]: any
}

type typeEntityErrorPayload = {
    message: string
    errors: {
        field: string
        message: string
    }[]
}

export class HttpError extends Error {
    status: number
    payload: typeHttpErrorPayload
    constructor({ status, payload, message = 'Http Error' }: { status: number, payload: typeHttpErrorPayload, message?: string }) {
        super(message)
        this.status = status
        this.payload = payload
    }
}

export class EntityError extends HttpError {
    status: typeof ENTITY_ERROR_STATUS
    payload: typeEntityErrorPayload
    constructor({ status, payload }: { status: typeof ENTITY_ERROR_STATUS, payload: typeEntityErrorPayload }) {
        super({ status, payload, message: 'Entity Error' })
        this.status = status
        this.payload = payload
    }
}