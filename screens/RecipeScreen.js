import React, {useEffect, useRef} from 'react'
import {View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image} from 'react-native';
import {ArrowLeftIcon, BookmarkIcon, MapPinIcon} from "react-native-heroicons/outline";
import {useNavigation} from "@react-navigation/native";
import {themeColors} from "../theme";
import IngredientItem from "../components/IngredientItem";
import InstructionParagraph from "../components/InstructionParagraph";

export default function RecipeScreen({route}) {
    const navigation = useNavigation()
    const scrollRef = useRef();
    const recipe = route.params

    useEffect(() => {
        scrollRef.current?.scrollTo({
            y : 0,
            animated : false
        })
    }, [route.params])
    
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
        return recipe?.strInstructions.split('\r\n').filter(n => n)
    }

    return (
        <SafeAreaView>
            <View className="flex-row items-center pb-3">
                <TouchableOpacity
                    onPress={event => navigation.goBack()}
                    style={{backgroundColor: themeColors.orange}}
                    className="rounded-full p-2 left-2"
                >
                    <ArrowLeftIcon color='white'/>
                </TouchableOpacity>
                <View className="grow flex-row justify-center">
                    <Text className="text-2xl font-bold">
                        {recipe?.strMeal}
                    </Text>
                </View>
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

            </ScrollView>
        </SafeAreaView>
    )
}