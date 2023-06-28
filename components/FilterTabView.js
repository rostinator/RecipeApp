import React, {useEffect, useState} from "react";
import {SceneMap, TabBar, TabView} from "react-native-tab-view";
import {Text, useWindowDimensions, View} from "react-native";
import RecipeService from "../service/RecipeService";
import CheckBoxList from "./CheckBoxList";

export default function FilterTabView({searchText, setSearchText, setSearchType}) {
    const [areaList, setAreaList] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [ingredientList, setIngredientList] = useState([])
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {key: 'category', title: 'Category'},
        {key: 'ingredient', title: 'Ingredient'},
        {key: 'area', title: 'Area'},
    ]);
    const layout = useWindowDimensions();

    useEffect(() => {
        RecipeService.getAllAreas()
            .then(result => {
                const data = result?.data?.meals?.map(item => item.strArea)
                setAreaList(data)
            })
        RecipeService.getAllIngredients()
            .then(result => {
                const data = result?.data?.meals?.map(item => item.strIngredient)
                setIngredientList(data)
            })
        RecipeService.getAllCategories()
            .then(result => {
                const data = result?.data?.meals?.map(item => item.strCategory)
                setCategoryList(data)
            })
    }, [])

    const CategoryTab = () => (
        <View className="flex-1">
            <CheckBoxList items={categoryList} listName='category' searchText={searchText} setSearchText={setSearchText} setSearchType={setSearchType}/>
        </View>
    );

    const IngredientTab = () => (
        <View className="flex-1">
            <CheckBoxList items={ingredientList} listName='ingredient' searchText={searchText} setSearchText={setSearchText} setSearchType={setSearchType}/>
        </View>
    );

    const AreaTab = () => (
        <View className="flex-1">
            <CheckBoxList items={areaList} listName='area' searchText={searchText} setSearchText={setSearchText} setSearchType={setSearchType}/>
        </View>
    );

    const tabBar = (props) => (
        <TabBar
            renderLabel={({route, color}) => (
                <Text className="text-black font-bold m-2">
                    {route.title}
                </Text>
            )}
            style={{backgroundColor: 'white'}}
            {...props}
    />
    )

    const renderScene = SceneMap({
        category: CategoryTab,
        ingredient: IngredientTab,
        area: AreaTab,
    });

    return (
        <View className="h-96">
            <TabView
                navigationState={{index, routes}}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{width: layout.width}}
                renderTabBar={props => tabBar(props)}
            />
        </View>
    )
}

