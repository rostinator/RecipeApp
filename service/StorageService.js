import AsyncStorage from "@react-native-async-storage/async-storage";


const FAV_KEY = 'FAV_RECIPES'

class StorageService {

    async readRecipeData(id) {
        const data = await AsyncStorage.getItem(FAV_KEY + id)
        return data ? JSON.parse(data) : null
    }

    saveRecipe(recipe) {
        AsyncStorage.setItem(FAV_KEY + recipe.id, JSON.stringify(recipe))
    }

    removeRecipeFromFavourites(id) {
        AsyncStorage.removeItem(FAV_KEY + id)
    }

    async readAllFavourites() {
        const keys = await AsyncStorage.getAllKeys()
        let recipeKeys = keys.filter(k => k.startsWith(FAV_KEY))

        let recipes = []
        for (let i = 0; i < recipeKeys.length; i++) {
            const data = await AsyncStorage.getItem(recipeKeys[i])
            if (data)
                recipes.push(JSON.parse(data))
        }
        return recipes
    }

}

export default new StorageService()