import { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

type CheckboxProps = {

    value: boolean
    onChange: (value: boolean) => void;
};

const Checkbox = ({value, onChange} : CheckboxProps)  => {

    return (

        <TouchableOpacity
            style={[styles.checkboxBase, value ? styles.unchecked : styles.checked]}
            onPress={() => onChange(!value)}>

        </TouchableOpacity>

    )

}

export default Checkbox


const styles = StyleSheet.create({

    checkboxBase: {
        width: 15,
        height: 15,
        borderRadius: 4,
        borderWidth: 2,
    },

    checked: {
        backgroundColor: 'transparent',
        borderColor: '#8E7EFF'
    },
    unchecked: {
        backgroundColor: '#8E7EFF',
        borderColor: '#8E7EFF'
    }
})