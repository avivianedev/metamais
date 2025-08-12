import { useState } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"
import { useApp } from "../../context/AppContext";
import { Title } from "../Title/Title";

type FormProductProps = {
    //title: string;
    nameProduct: string;
    setNameProduct: (value: string) => void;
    segment: string;
    setSegment: (value: string) => void;
    goal: string;
    setGoal: (value: string) => void;
    hasChildrenGoals: boolean
};

export const FormProduct = ({
    //title,
    nameProduct,
    setNameProduct,
    segment,
    setSegment,
    goal,
    setGoal,
    hasChildrenGoals,
} : FormProductProps
    
) => {    

    const { buttonSecondaryColor } = useApp();

    const colorBorder =
        buttonSecondaryColor
            ? { borderColor: '#B82254', }
            : { borderColor: '#5A31F4', }
    

    return (
        <View style={styles.inputContainer}>
            <Title 
                title="Cadastro de Produtos"
            />

            <TextInput
                placeholder="Nome do Produto"
                value={nameProduct}
                onChangeText={setNameProduct}
                style={[styles.input, colorBorder]}
                placeholderTextColor={'#9E9E9E'}
                
            />

            <TextInput
                placeholder="Nome do Segmento"
                value={segment}
                onChangeText={setSegment}
                style={[styles.input, colorBorder]}
                placeholderTextColor={'#9E9E9E'}

            />

            <TextInput
                placeholder="Meta em R$"
                value={goal}
                onChangeText={setGoal}
                style={[styles.input, colorBorder]}
                placeholderTextColor={'#9E9E9E'}
                editable={!hasChildrenGoals}
                //keyboardType="numeric"
            />
        </View>
    )
}


const styles = StyleSheet.create({
    inputContainer: {
        //padding: 20,
        width: '100%',
        height: 'auto',
        //justifyContent: 'center',
        alignItems: 'center',
        gap: 24,        
        borderRadius: 16,       
        margin: 16,
    },
    title: {
        fontSize: 20,
        fontFamily: 'Inter_400Regular',        
        fontWeight: '500',
        color: '#5A31F4'

    },
    input: {
        width: '90%',
        borderColor: '#5A31F4',
        //backgroundColor: "transparente",
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        height: 44,
        //opacity: .5,
        //marginTop: 25
        fontWeight: 700,
        

    },


})