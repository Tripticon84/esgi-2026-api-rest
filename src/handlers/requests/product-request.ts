export interface CreateProductRequest {
    name: string
    price: number
}

export interface ProductIdRequest {
    id: number
}

export interface UpdateProductRequest {
    id: number
    price?: number
    name?: string
}

export interface ListProductRequest {
    page?: number
    size?: number
    priceMax?: number
}

