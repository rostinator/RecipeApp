import axios from "axios";

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/'

class RecipeService {

    searchRecipeByFirstLetter(letter) {
        return axios.get(BASE_URL + '/search.php?f=' + letter)
    }

    searchRecipeById(id) {
        return axios.get(BASE_URL + 'lookup.php?i=' + id)
    }

    searchRecipeByName(name) {
        return axios.get(BASE_URL + 'search.php?s=' + name)
    }

    filterRecipeByCategory(category) {
        return axios.get(BASE_URL + 'filter.php?c=' + category)
    }

    filterRecipeByMainIngredient(ingredient) {
        return axios.get(BASE_URL + 'filter.php?i=' + ingredient)
    }

    filterRecipeByArea(area) {
        return axios.get(BASE_URL + 'filter.php?a=' + area)
    }

    getAllCategories() {
        return axios.get(BASE_URL + 'list.php?c=list')
    }

    getAllAreas() {
        return axios.get(BASE_URL + 'list.php?a=list')
    }

    getAllIngredients() {
        return axios.get(BASE_URL + 'list.php?i=list')
    }

    isoCodeToCountryName(isoCode) {
        switch (isoCode) {
            case 'US':
                return 'American'
            case 'GB':
                return 'British'
            case 'CA':
                return 'Canadian'
            case 'CN':
                return 'Chinese'
            case 'HR':
                return 'Croatian'
            case 'SX':
                return 'Dutch'
            case 'EG':
                return 'Egyptian'
            case 'PH':
                return 'Filipino'
            case 'FR':
                return 'French'
            case 'GR':
                return 'Greek'
            case 'IN':
                return 'Indian'
            case 'IE':
                return 'Irish'
            case 'IT':
                return 'Italian'
            case 'JM':
                return 'Jamaican'
            case 'JP':
                return 'Japanese'
            case 'KE':
                return 'Kenyan'
            case 'MY':
                return 'Malaysian'
            case 'MX':
                return 'Mexican'
            case 'MA':
                return 'Moroccan'
            case 'PL':
                return 'Polish'
            case 'PT':
                return 'Portuguese'
            case 'RU':
                return 'Russian'
            case 'ES':
                return 'Spanish'
            case 'TH':
                return 'Thai'
            case 'TN':
                return 'Tunisian'
            case 'TR':
                return 'Turkish'
            case 'VN':
                return 'Vietnamese'
            default:
                return 'Unknown'
        }
    }
}

export default new RecipeService()