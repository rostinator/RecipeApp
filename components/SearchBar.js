import React, {useEffect, useRef, useState} from "react";
import {Modal, Text, TextInput, TouchableHighlight, View} from "react-native";
import {AdjustmentsVerticalIcon, MagnifyingGlassIcon, MapPinIcon} from "react-native-heroicons/outline";
import {themeColors} from "../theme";
import RecipeService from "../service/RecipeService";
import {XMarkIcon} from "react-native-heroicons/solid";
import FilterTabView from "./FilterTabView";
import * as Location from 'expo-location';


export default function SearchBar({setRecipeList}) {

    const [searchText, setSearchText] = useState('')
    const [searchType, setSearchType] = useState('fulltext')
    const [location, setLocation] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)
    const [address, setAddress] = useState(null)
    const [showFilter, setShowFilter] = useState(false)

    useEffect(() => {
        RecipeService.searchRecipeByFirstLetter('a')
            .then(result => setRecipeList(result?.data?.meals))
    }, [])

    const searchByPosition = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setSearchType('actualPosition')

        const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
            longitude: location.coords.longitude,
            latitude: location.coords.latitude
        });

        setAddress(reverseGeocodedAddress[0])
        setSearchText(RecipeService.isoCodeToCountryName(reverseGeocodedAddress[0]?.isoCountryCode))
    }

    const fullTextSearch = (text) => {
        if (searchText === text) {
            return
        }
        setSearchText(text)
        setSearchType('fulltext')
        searchRecipes()
    }

    const openFilterModal = () => {
        setShowFilter(true)
    }

    const closeFilterModal = () => {
        setShowFilter(false)
    }

    const clearFilters = () => {
        setSearchText('')
        setSearchType('fulltext')
    }

    const searchRecipes = () => {
        let searchFunction;
        switch (searchType) {
            case 'area':
            case 'actualPosition':
                searchFunction = RecipeService.filterRecipeByArea
                break
            case 'category':
                searchFunction = RecipeService.filterRecipeByCategory
                break
            case 'ingredient':
                searchFunction = RecipeService.filterRecipeByMainIngredient
                break
            case 'fulltext':
                searchFunction = RecipeService.searchRecipeByName
                break
        }
        searchFunction(searchText).then(result => setRecipeList(result?.data?.meals))

        setShowFilter(false)
    }

    return (
        <>
            <View
                style={{flex: 1}}
            >
                <Modal
                    visible={showFilter}
                    animationType="fade"
                    transparent={true}
                >
                    <View
                        className="flex-1 justify-end items-center"
                        style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
                    >
                        <View className="bg-white amber-100 w-full pb-10 px-4 rounded-t-3xl shadow-lg">
                            <View className="flex-row items-center my-2">
                                <Text className="text-3xl font-bold flex-1">
                                    Filters
                                </Text>
                                <TouchableHighlight
                                    onPress={event => closeFilterModal()}
                                    className="rounded-full p-2"
                                    underlayColor={themeColors.lightBorder}
                                >
                                    <XMarkIcon size={30} color={themeColors.border}/>
                                </TouchableHighlight>
                            </View>
                            <View className="flex-row items-center">
                                <TouchableHighlight
                                    onPress={event => searchByPosition()}
                                    style={{backgroundColor: (searchType === 'actualPosition' ? themeColors.orange : 'white')}}
                                    className="rounded-full border border-amber-500 p-2"
                                    underlayColor={themeColors.lightBorder}
                                >
                                    <MapPinIcon size={25}
                                                color={(searchType === 'actualPosition' ? 'white' : themeColors.orange)}/>
                                </TouchableHighlight>
                                {errorMsg && <Text className="ml-2">{errorMsg}</Text>}
                                {
                                    (address && searchType === 'actualPosition')
                                    &&
                                    <View className="flex-row ml-2">
                                        <Text className=" text-lg">
                                            {address?.isoCountryCode} - {searchText}
                                        </Text>
                                    </View>
                                }
                            </View>

                            <FilterTabView searchText={searchText} setSearchText={setSearchText}
                                           setSearchType={setSearchType}/>

                            <View className="mt-5">
                                <TouchableHighlight
                                    onPress={event => searchRecipes()}
                                    style={{backgroundColor: themeColors.orange}}
                                    className="w-full rounded-2xl p-2"
                                    underlayColor={themeColors.lightBg}
                                    disabled={!searchText}
                                >
                                    <Text className="text-xl font-bold text-white text-center">Search</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
            <View className="flex-row space-x-3 px-5 mb-3">
                <View className="flex-row flex-1 items-center p-2 rounded-full border border-gray-500">
                    <MagnifyingGlassIcon size='30' color={themeColors.border}/>
                    {(searchType !== 'fulltext' && searchText) ?
                        <View className="ml-2 flex-1 flex-row items-center">
                            <View
                                className="rounded-xl py-1 px-2 bg-gray-400"
                            >
                                <Text
                                    className="text-sm text-white"
                                >
                                    {searchText}
                                </Text>
                            </View>
                            <TouchableHighlight
                                onPress={event => clearFilters()}
                                className="rounded-full p-1"
                                underlayColor={themeColors.lightBorder}
                            >
                                <XMarkIcon size={17} color={themeColors.border}/>
                            </TouchableHighlight>
                        </View>
                        :
                        <TextInput
                            autoComplete='off'
                            className="ml-2 flex-1 w-2 font-bold"
                            placeholder='Recipes'
                            value={searchText}
                            onChangeText={newText => fullTextSearch(newText)}
                        />
                    }
                </View>
                <TouchableHighlight
                    onPress={event => openFilterModal()}
                    style={{backgroundColor: themeColors.orange}} className="rounded-full p-2"
                    underlayColor={themeColors.lightBg}
                >
                    <AdjustmentsVerticalIcon size='30' color='white'/>
                </TouchableHighlight>
            </View>
        </>
    )
}