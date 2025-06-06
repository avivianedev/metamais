import { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

const Checkbox = () => {

    const [check, SetCheck] = useState(false)

    return (

        <TouchableOpacity
            style={ [styles.checkboxBase, check ? styles.unchecked : styles.checked]}
            onPress={() => SetCheck(!check)}></TouchableOpacity>
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