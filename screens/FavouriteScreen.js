import React, {useEffect, useState} from "react";
import {SafeAreaView, ScrollView, Text, TouchableHighlight, View} from "react-native";
import StorageService from "../service/StorageService";
import {themeColors} from "../theme";

export default function FavouriteScreen({route}) {
    const [favouriteList, setFavouriteList] = useState([])

    const loadData = () => {
        StorageService.readAllFavourites().then(data =>
            setFavouriteList(data)
        )
    }

    useEffect(() => {
        loadData()
    }, [route])

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
                    height: "100%"
                }}
            >
                {favouriteList.map(fav =>
                    <TouchableHighlight
                        key={fav.id}
                        onPress={() => {
                        }}
                        underlayColor={themeColors.lightBorder}
                        className="w-full rounded-3xl bg-white shadow-lg p-3 mb-3"
                        style={{shadowColor: themeColors.lightBorder, shadowRadius: 7}}
                    >
                        <>
                            <Text className="text-lg font-bold ml-2">{fav.name}</Text>
                            <Text className="text-sm text-gray-500">{fav.note}</Text>
                        </>
                    </TouchableHighlight>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}