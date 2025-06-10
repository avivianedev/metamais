import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { FormProduct } from "../FormProduct/FormProduct"
import AntDesign from '@expo/vector-icons/AntDesign';

import { useState } from "react"

type editProps = {
    onChange: (value: boolean) => void;
}

export const EditProductModal = ({onChange} : editProps) => {

    const [nameProduct, setNameProduct] = useState('')
    const [segment, setSegment] = useState('')
    const [goal, setGoal] = useState('')


    return (
        <View style={styles.inputContainer}>

            <Text style={styles.title}>Atualizar Produto</Text>

            <TouchableOpacity style={styles.iConClose} onPress={() => onChange(!onChange)} >
                <AntDesign name="close" size={24} color="white" />
            </TouchableOpacity>

            <TextInput
                placeholder="Nome do Produto"
                value={nameProduct}
                onChangeText={setNameProduct}
                style={styles.input}
                placeholderTextColor={'white'}
            />

            <TextInput
                placeholder="Nome do Segmento"
                value={segment}
                onChangeText={setSegment}
                style={styles.input}
                placeholderTextColor={'white'}

            />

            <TextInput
                placeholder="Meta em R$"
                value={goal}
                onChangeText={setGoal}
                style={styles.input}
                placeholderTextColor={'white'}
                keyboardType="numeric"
            />


            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Alterar</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    inputContainer: {
        padding: 24,
        width: '100%',
        height: 'auto',
        alignItems: 'center',
        gap: 24,
        backgroundColor: '#6C5DD3',
        borderRadius: 15,
        position: 'absolute',
        top: 0,
        zIndex: 2
        
    },
    title: {
        fontSize: 18,
        fontFamily: 'Inter_400Regular',
        color: '#fff',

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
    button: {
        width: '70%',
        height: 48,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#8E7EFF',
        borderColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Inter_400Regular',
    },
    iConClose: {
        position: 'absolute',
        top: 24,
        right: 24
    }


})