import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { Inter_400Regular, Inter_800ExtraBold } from '@expo-google-fonts/inter';
import { useState } from "react";
import Checkbox from "../../components/Checkbox/Checkbox";
import uuid from 'react-native-uuid';
import { Product } from "../../models/Product";
import { storeData } from "../../controllers/productsController";
import { SucessMessage } from "../../components/Modal/SucessMessage";

const NewProduct = () => {

    const [nameProduct, SetNameProduct] = useState('')
    const [segment, SetSegment] = useState('')
    const [goal, SetGoal] = useState('')
    const [modalVisible, setModalVisible] = useState(false);



    const handleSubmit = async () => {

        const product: Product = {
            id: uuid.v4(),
            name: nameProduct,
            segment: segment,
            goal: parseFloat(goal.replace(/\./g, '').replace(',', '.')),
            produced: 0,
            remaining: parseFloat(goal.replace(/\./g, '').replace(',', '.')),
            percent: 0,
        };
        const result = await storeData(product);

        if (result) {
            setModalVisible(true);
            SetNameProduct('')
            SetSegment('')
            SetGoal('')
            
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastrar Produto</Text>

            <TextInput
                placeholder="Nome do Produto"
                value={nameProduct}
                onChangeText={test => SetNameProduct(test)}
                style={styles.input}
                placeholderTextColor={'black'}
            />

            <TextInput
                placeholder="Nome do Segmento"
                value={segment}
                onChangeText={test => SetSegment(test)}
                style={styles.input}
                placeholderTextColor={'black'}

            />

            <TextInput
                placeholder="Meta em R$"
                value={goal}
                onChangeText={test => SetGoal(test)}
                style={styles.input}
                placeholderTextColor={'black'}
                keyboardType="numeric"
            />

            <SucessMessage
                texto="Cadastro realizado com sucesso!"
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
            />

            <View style={styles.checkbox}>
                <Checkbox />
                <Text>Esse produto possui metas vinculadas</Text>
            </View>



            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    )
}


export default NewProduct


const styles = StyleSheet.create({
    container: {
        padding: 24,
        width: '100%',
        height: '100%',
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
        marginTop: 40
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Inter_400Regular',
    },
    checkbox: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    }
})


