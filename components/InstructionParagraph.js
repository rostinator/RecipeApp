import React from "react";
import {Text, View} from "react-native";

export default function InstructionParagraph({index, instruction}) {

    return (
        <View className="flex-row mb-3">
            <View>
                <View className="border-2 border-amber-500 rounded-full py-2 px-4">
                    <Text className="font-bold text-amber-500 text-lg">
                        {index}
                    </Text>
                </View>
            </View>
            <Text
                className="flex-1 mx-2 mt-2.5 text-base">
                {instruction}
            </Text>
        </View>
    )
}