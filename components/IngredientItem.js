import React from "react";
import {Text, View} from "react-native";
import {CheckIcon} from "react-native-heroicons/mini";
import {themeColors} from "../theme";

export default function IngredientItem({measure, name}){
    return(
        <View
            className="flex-row items-center my-1"
        >
            <CheckIcon size={20} color={themeColors.red}/>
            <Text
                className="ml-1 text-sm"
            >
                {measure + ' ' + name}
            </Text>
        </View>
    )
}