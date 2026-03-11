export interface CreateProductRequest {
    name: string
    price: number
}

export interface ProductIdRequest {
    id: number
}

export interface UpdateProductRequest {
    id: number
    name: string
    price: number
}
