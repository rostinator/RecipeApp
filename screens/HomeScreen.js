import React, {useEffect, useState} from 'react'
import {
    View, SafeAreaView, TextInput, TouchableHighlight, ScrollView
} from 'react-native'
import {AdjustmentsVerticalIcon, MagnifyingGlassIcon} from "react-native-heroicons/outline";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";

export default function HomeScreen() {
    const [recipeList, setRecipeList] = useState([])

    return (
        <SafeAreaView>
            <SearchBar setRecipeList={setRecipeList}/>
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