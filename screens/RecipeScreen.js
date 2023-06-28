import React, {useEffect, useRef, useState} from 'react'
import {View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput} from 'react-native';
import {ArrowLeftIcon, BookmarkIcon, MapPinIcon, HeartIcon as HeartIconOutline} from "react-native-heroicons/outline";
import {HeartIcon as HeartIconSolid} from "react-native-heroicons/solid";
import {useNavigation} from "@react-navigation/native";
import {themeColors} from "../theme";
import IngredientItem from "../components/IngredientItem";
import InstructionParagraph from "../components/InstructionParagraph";
import StorageService from "../service/StorageService";
import RecipeService from "../service/RecipeService";

export default function RecipeScreen({route}) {
    const navigation = useNavigation()
    const scrollRef = useRef();
    const [storedRecipe, setStoredRecipe] = useState(null);
    const [note, setNote] = useState('')
    const [recipe, setRecipe] = useState(null)

    const searchRecipeById = (id) => {
        RecipeService.searchRecipeById(id)
            .then(result => {
                setRecipe(result?.data?.meals[0])
            })
    }

    useEffect(() => {
        scrollRef.current?.scrollTo({
            y: 0,
            animated: false
        })

        if (route.params.id) {
            searchRecipeById(route.params.id)
            setStoredRecipe(route.params)
            setNote(route.params.note)
        } else {
            if (!route.params.strArea || route.params.strCategory) {
                searchRecipeById(route.params.idMeal)
            } else {

            }
            StorageService.readRecipeData(route.params?.idMeal)
                .then(data => {
                    if (data) {
                        setStoredRecipe({id: data.id, name: data.name, note: data.note})
                        setNote(data.note)
                    }
                })
        }
    }, [route.params])

    const changeFavStatus = () => {
        if (storedRecipe) {
            StorageService.removeRecipeFromFavourites(storedRecipe.id)
            setStoredRecipe(null)
        } else {
            let actualRecipe = {id: recipe.idMeal, name: recipe.strMeal, note: ''}
            StorageService.saveRecipe(actualRecipe)
            setStoredRecipe(actualRecipe)
        }
    }

    const saveNote = (text) => {
        storedRecipe.note = note
        setNote(text)
        StorageService.saveRecipe(storedRecipe)
    }

    const parseIngredient = () => {
        const ingredients = []
        if (!recipe)
            return ingredients

        for (let i = 1; i <= 20; i++) {
            const name = recipe['strIngredient' + i]
            if (name) {
                ingredients[i - 1] = {name: name, measure: recipe['strMeasure' + i]}
            } else {
                break
            }
        }
        return ingredients;
    }

    const parseInstructions = () => {
        return recipe?.strInstructions?.split('\r\n').filter(n => n)
    }

    return (
        <SafeAreaView>
            <View className="flex-row items-center justify-between pb-3">
                <TouchableOpacity
                    onPress={event => navigation.goBack()}
                    style={{backgroundColor: themeColors.orange}}
                    className="rounded-full p-2 left-2"
                >
                    <ArrowLeftIcon color='white'/>
                </TouchableOpacity>
                <Text className="text-2xl font-bold overflow-clip max-w-xs">
                    {recipe?.strMeal}
                </Text>

                <TouchableOpacity
                    onPress={event => changeFavStatus()}
                    style={{backgroundColor: themeColors.orange}}
                    className="rounded-full p-2 right-2"
                >
                    {storedRecipe ?
                        <HeartIconSolid color='white'/> : <HeartIconOutline color='white'/>
                    }
                </TouchableOpacity>
            </View>
            <ScrollView
                contentContainerStyle={{
                    paddingTop: 10,
                    paddingHorizontal: 10,
                    alignItems: "center",
                    paddingBottom: 100
                }}
                ref={scrollRef}
            >
                <Image
                    className="h-64 w-full rounded-xl"
                    source={{uri: recipe?.strMealThumb}}
                />
                <View className="w-full flex-row items-center my-4">
                    {recipe?.strTags &&
                        <>
                            <BookmarkIcon color={themeColors.border}/>
                            <Text className="text-gray-500 ml-1">
                                {recipe?.strTags?.replaceAll(',', ', ')}
                            </Text>
                        </>
                    }

                    {recipe?.strArea &&
                        <View className="flex-1 flex-row items-center justify-end ">
                            <MapPinIcon color={themeColors.border}/>
                            <Text className="text-gray-500 font-bold p-1">{recipe?.strArea}</Text>
                        </View>
                    }
                </View>
                <View className="w-full flex-row-reverse">
                    <View style={{backgroundColor: themeColors.red}} className="rounded-lg">
                        <Text className="text-white font-bold p-2 ">{recipe?.strCategory}</Text>
                    </View>
                </View>

                <Text className="w-full mb-1 ml-1 text-lg font-bold">
                    Ingredients
                </Text>
                <View className="w-full border rounded-lg border-gray-500 p-2">
                    {parseIngredient()?.map((ingredient, index) =>
                        <IngredientItem key={index} name={ingredient.name} measure={ingredient.measure}/>
                    )}
                </View>

                <Text className="w-full mb-1 ml-1 mt-3 text-lg font-bold">
                    Instructions
                </Text>

                <View className="w-full my-2 mx-1">
                    {parseInstructions()?.map((paragraph, index) =>
                        <InstructionParagraph key={index} index={index + 1} instruction={paragraph}/>
                    )}
                </View>

                {
                    storedRecipe &&
                    <>
                        <Text className="w-full text-lg font-bold mb-2">
                            Note
                        </Text>
                        <View className="w-full border rounded-lg border-gray-500 p-2 mb-10">
                            <TextInput
                                multiline={true}
                                numberOfLines={8}
                                placeholder='...'
                                className="w-full min-h-full"
                                style={{minHeight: 200}}
                                value={note}
                                onChangeText={text => saveNote(text)}
                                // onEndEditing={saveNote}
                            />
                        </View>
                    </>
                }

            </ScrollView>
        </SafeAreaView>
    )
}