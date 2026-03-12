export interface CreateUserRequest {
    email: string
    password: string
}

export interface UserIdRequest {
    id: number
}

export interface ListUserRequest {
    page?: number
    size?: number
    priceMax?: number
}

export interface ListUserFilter {
    page: number
    size: number
    email?: string
}
