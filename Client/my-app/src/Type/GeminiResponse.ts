import type { ProductDataDTO } from "./ProductDataDTO"

export interface RecipeResponseDTO {
  recipe: string
  ingredients: string[]
}

export interface GeminiResponse {
  recipeResponse: RecipeResponseDTO
  product: ProductDataDTO[]
}
