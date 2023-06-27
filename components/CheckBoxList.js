import React from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {FlatList} from "react-native";
import {themeColors} from "../theme";

export default function CheckBoxList({items, searchText, setSearchText, setSearchType, listName}) {
    return (
        <FlatList
            data={items}
            renderItem={({item}) =>
                <BouncyCheckbox
                    text={item}
                    style={{marginTop: 16}}
                    textStyle={{
                        textDecorationLine: "none",
                    }}
                    fillColor={themeColors.orange}
                    isChecked={searchText === item}
                    onPress={isChecked => {
                        if (isChecked) {
                            setSearchText(item)
                            setSearchType(listName)
                        }
                    }}
                />
            }
            keyExtractor={item => item}
        />
    )
}