import { useState } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"

type FormProductProps = {
    title: string;
    nameProduct: string;
    setNameProduct: (value: string) => void;
    segment: string;
    setSegment: (value: string) => void;
    goal: string;
    setGoal: (value: string) => void;
};

export const FormProduct = ({
    title,
    nameProduct,
    setNameProduct,
    segment,
    setSegment,
    goal,
    setGoal,
} : FormProductProps
    
) => {    

    return (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>{title}</Text>

            <TextInput
                placeholder="Nome do Produto"
                value={nameProduct}
                onChangeText={setNameProduct}
                style={styles.input}
                placeholderTextColor={'black'}
            />

            <TextInput
                placeholder="Nome do Segmento"
                value={segment}
                onChangeText={setSegment}
                style={styles.input}
                placeholderTextColor={'black'}

            />

            <TextInput
                placeholder="Meta em R$"
                value={goal}
                onChangeText={setGoal}
                style={styles.input}
                placeholderTextColor={'black'}
                keyboardType="numeric"
            />
        </View>
    )
}


const styles = StyleSheet.create({
    inputContainer: {
        padding: 24,
        width: '100%',
        height: 'auto',
        //justifyContent: 'center',
        alignItems: 'center',
        gap: 24,
    },
    title: {
        fontSize: 18,
        fontFamily: 'Inter_400Regular',
        color: '#3D3D3D',

    },
    input: {
        width: '90%',
        borderColor: '#8E7EFF',
        //backgroundColor: "transparente",
        borderWidth: 2,
        borderRadius: 10,
        alignItems: 'center',
        paddingLeft: 10,
        height: 38,
        opacity: .5,
        //marginTop: 25
        fontWeight: 700

    },


})