import { TextInput, StyleSheet } from 'react-native'
import React from 'react'

type CustomInputType = {
    placeholder?: string,
    tiStyles?:any,
    onChangeText?:any,
    placeholderTextColor?:string,
    value?:any,
    multiline?:boolean

}
const CustomInput = (
    {
        placeholder,
        tiStyles,
        onChangeText,
        placeholderTextColor,
        value,
        multiline
    }:CustomInputType
) => {
    // console.log("input rendered")
    return (

        <TextInput
            placeholder={placeholder}
            style={[styles.textinput, tiStyles]}
            onChangeText={onChangeText}
            placeholderTextColor={placeholderTextColor}
            value={value}
            multiline={multiline}
        />

    )
}

const styles = StyleSheet.create({
    textinput: {
        borderWidth: 1,
        borderColor: "grey",
        padding: 10,
        // marginHorizontal: 10,
        borderRadius: 5,
        color: 'black'

    }
})
export default CustomInput