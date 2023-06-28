import React, {useEffect, useRef, useState} from 'react'
import {View, SafeAreaView, ScrollView} from 'react-native'
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";

export default function HomeScreen() {
    const [recipeList, setRecipeList] = useState([])
    const scrollRef = useRef()

    const setRecipe = (recipe) => {
        scrollRef.current?.scrollTo({
            y: 0,
            animated: true
        })
        setRecipeList(recipe)
    }

    return (
        <SafeAreaView>
            <SearchBar setRecipeList={setRecipe}/>
            <View>
                <ScrollView
                    contentContainerStyle={{
                        paddingTop: 20,
                        paddingHorizontal: 15,
                        alignItems: "center",
                        paddingBottom: 100
                    }}
                    ref={scrollRef}
                >
                    {recipeList?.map(recipe =>
                        <RecipeCard key={recipe.idMeal} item={recipe}/>
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}