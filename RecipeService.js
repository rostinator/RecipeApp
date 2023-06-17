import axios from "axios";

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/'

class RecipeService {

    searchRecipeByName(name) {
        return axios.get(BASE_URL + 'search.php?s=' + name)
    }
}

export default new RecipeService()