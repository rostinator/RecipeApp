import React from "react";
import {Image, Text, TouchableHighlight, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {themeColors} from "../theme";
import {MapPinIcon} from "react-native-heroicons/outline";

export default function RecipeCard({item}) {
    const navigation = useNavigation()

    return (
        <TouchableHighlight
            onPress={() => {
                navigation.navigate('recipe', item)
            }}
            underlayColor={themeColors.lightBorder}
            className="mb-5 rounded-3xl bg-white shadow-lg"
            style={{shadowColor: themeColors.lightBorder, shadowRadius: 7}}
        >
            <View>
                <Image
                    className="h-56 w-96 rounded-t-xl"
                    source={{uri: item.strMealThumb}}/>
                <View className="px-3 py-1">
                    <Text className="text-lg font-bold pt-2 pb-3">{item.strMeal}</Text>
                    {(item.strArea || item.strCategory) &&
                        <View className="flex-row items-center space-x-1 pb-3 pr-2">
                            {item.strArea &&
                                <>
                                    <MapPinIcon color={themeColors.border}/>
                                    <Text className="text-gray-500 text-sm">{item.strArea}</Text>
                                </>
                            }

                            {item.strCategory &&
                                <View className="flex-1 flex-row-reverse">
                                    <View style={{backgroundColor: themeColors.orange}} className="rounded-lg">
                                        <Text className="text-white font-bold p-2 ">{item.strCategory}</Text>
                                    </View>
                                </View>
                            }
                        </View>
                    }
                </View>
            </View>
        </TouchableHighlight>
    )
}