
/**
    * @openapi
    * components:
    *   schemas:
    *     Product:
    *       type: object
    *       properties:
    *         id:
    *           type: string
    *           description: L'identifiant unique du produit
    *         name:
    *           type: string
    *           description: Le nom du produit
    *         price:
    *           type: number
    *           description: Le prix du produit
    *         createdAt:
    *           type: string
    *           format: date-time
    *           description: La date de création du produit
    *         updatedAt:
    *           type: string
    *           format: date-time
    *           description: La date de mise à jour du produit
    *         deletedAt:
    *           type: string
    *           format: date-time
    *           description: La date de suppression du produit
    *       example:
    *         id: '1'
    *         name: Exemple de produit
    *         price: 10
    *         createdAt: '2024-01-01T00:00:00.000Z'
    *         updatedAt: '2024-01-01T00:00:00.000Z'
    *         deletedAt: null
    */
export interface ProductResponse {
    id: number
    name: string
    price: number
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
}
