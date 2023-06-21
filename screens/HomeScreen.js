import React, {useEffect, useState} from 'react'
import {
    View, SafeAreaView, TextInput, TouchableHighlight, ScrollView
} from 'react-native'
import {AdjustmentsVerticalIcon, MagnifyingGlassIcon} from "react-native-heroicons/outline";
import {themeColors} from "../theme"
import RecipeCard from "../components/RecipeCard";
import RecipeService from "../service/RecipeService";

export default function HomeScreen() {
    const [recipeList, setRecipeList] = useState([])
    const [searchText, setSearchText] = useState('chicken')

    useEffect(() => {
        RecipeService.searchRecipeByName(searchText)
            .then(result => setRecipeList(result?.data?.meals))
    }, [searchText])

    return (
        <SafeAreaView>
            <View className="flex-row items-center space-x-3 px-5 mb-3">
                <View className="flex-row flex-1 items-center p-2 rounded-full border border-gray-500">
                    <MagnifyingGlassIcon size='30' color={themeColors.border}/>
                    <TextInput
                        className="ml-2 flex-1 w-2 font-bold"
                        placeholder='Recipes'
                        onChangeText={newText => setSearchText(newText)}
                    />
                </View>
                <TouchableHighlight
                    onPress={event => {
                    }}
                    style={{backgroundColor: themeColors.orange}} className="rounded-full p-2"
                    underlayColor={themeColors.lightBg}
                >
                    <AdjustmentsVerticalIcon size='30' color='white'/>
                </TouchableHighlight>
            </View>
            <View>
                <ScrollView
                    contentContainerStyle={{
                        paddingTop: 20,
                        paddingHorizontal: 15,
                        alignItems: "center",
                        paddingBottom: 100
                    }}
                >
                    {recipeList?.map(recipe =>
                        <RecipeCard key={recipe.idMeal} item={recipe}/>
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}