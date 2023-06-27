import React, {useState} from "react";
import {SafeAreaView, ScrollView, Text, TouchableHighlight, View} from "react-native";
import StorageService from "../service/StorageService";
import {themeColors} from "../theme";
import {HeartIcon} from "react-native-heroicons/solid";
import {useFocusEffect, useNavigation} from "@react-navigation/native";

export default function FavouriteScreen({route}) {
    const [favouriteList, setFavouriteList] = useState([])
    const navigation = useNavigation()

    const loadData = () => {
        StorageService.readAllFavourites().then(data =>
            setFavouriteList(data)
        )
    }

    useFocusEffect(() => {
        loadData()
    })

    return (
        <SafeAreaView>
            <Text
                className="font-bold text-3xl ml-5 my-3"
            >
                Favorites
            </Text>
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 15,
                    alignItems: "center",
                    paddingBottom: 80
                }}
            >
                {favouriteList.map(fav =>
                    <TouchableHighlight
                        key={fav.id}
                        onPress={() => {
                            navigation.navigate('recipe', fav)
                        }}
                        underlayColor={themeColors.lightBorder}
                        className="w-full rounded-3xl bg-white shadow-lg p-3 mb-3"
                        style={{shadowColor: themeColors.lightBorder, shadowRadius: 7}}
                    >
                        <>
                            <View
                                className="pl-2 pt-1 flex-row items-center"
                            >
                                <HeartIcon size={20} color={themeColors.red}/>
                                <Text className="flex-1 text-xl font-bold ml-2">{fav.name}</Text>
                            </View>
                            <View
                                className="pl-9"
                            >
                            <Text className="text-sm text-gray-500">{fav.note}</Text>
                            </View>
                        </>
                    </TouchableHighlight>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}