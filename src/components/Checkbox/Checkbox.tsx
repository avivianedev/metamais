import { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"


type BgCheckVariant = 'primary' | 'secondary' | 'third';
type ColorBorderByVariant = 'primary' | 'secondary' | 'third';

type CheckboxProps = {
    variant?: BgCheckVariant
    colorBorder?: ColorBorderByVariant
    value: boolean
    onChange: (value: boolean) => void;
};

const Checkbox = ({ value, onChange, variant = 'primary', colorBorder = 'primary' }: CheckboxProps) => {

    const BgByVariant = {
        primary: '#8E7EFF',
        secondary: '#B82254',
        third: '#6C5DD3',
    }[variant];

    const BgByVariantTransparent = {
        primary: 'transparent',
        secondary: 'transparent',
        third: '#6C5DD3',
    }[variant];   

    const colorBorderCheck =
        colorBorder === 'primary'
            ? { borderColor: '#8E7EFF' }
            : { borderColor: '#B82254' };



    return (

        <TouchableOpacity
            style={[styles.checkboxBase, value ? {backgroundColor: BgByVariant} : {backgroundColor: BgByVariantTransparent}, colorBorderCheck]}
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
        borderColor: '#8E7EFF'
    },

    checked: {
        backgroundColor: 'transparent',

    },
    unchecked: {
        backgroundColor: '#8E7EFF',

    }
})