import type { Product } from "./Product"
import type { RecipeResponse } from "./RecipeResponse"

export type GeminiResponse = {
     recipeResponse : RecipeResponse,
     product : Product[]
}