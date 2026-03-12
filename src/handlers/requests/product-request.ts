
/**
 * @openapi
 * components:
 *   schemas:
 *     CreateProduct:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           description: Le nom du produit
 *         price:
 *           type: number
 *           description: Le prix du produit
 *       example:
 *         name: Exemple de produit
 *         price: 10
 */
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

