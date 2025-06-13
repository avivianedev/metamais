import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { Inter_400Regular, Inter_800ExtraBold } from '@expo-google-fonts/inter';
import { useState } from "react";
import Checkbox from "../../components/Checkbox/Checkbox";
import uuid from 'react-native-uuid';
import { Product } from "../../models/Product";
import { storeData } from "../../controllers/productsController";
import { SucessMessage } from "../../components/Modal/SucessMessage";
import AntDesign from '@expo/vector-icons/AntDesign';
import { AddChildrenGoals } from "./AddChildrenGoals";
import { FormProduct } from "../../components/FormProduct/FormProduct";
import { formatCurrency } from "../../utils/formatCurrency";


const NewProduct = () => {

    const [nameProduct, setNameProduct] = useState('')
    const [segment, setSegment] = useState('')
    const [goal, setGoal] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [hasChildrenGoals, setHasChildrenGoals] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [data, setData] = useState<{ name: string; goal: number }[]>([]);


    console.log('O valor de data dentro do NewProduct', data)

    const handleSubmit = async () => {

        const product: Product = {
            id: uuid.v4(),
            name: nameProduct,
            segment: segment,
            goal: parseFloat(goal.replace(/\./g, '').replace(',', '.').replace(',', '')),
            //goal : sanitizeCurrencyInput(goal),
            produced: 0,
            remaining: parseFloat(goal.replace(/\./g, '')),
            percent: 0,
            hasChildren: hasChildrenGoals,
            children: data
        };

        const result = await storeData(product);

        if (result) {
            setModalVisible(true);
            setNameProduct('')
            setSegment('')
            setGoal('')
            setHasChildrenGoals(false)
            setShowModal(false)
            setData([])
        }
    };

    return (
        <View style={styles.container}>

            <FormProduct
                title={'Cadastro de Produtos'}
                nameProduct={nameProduct}
                setNameProduct={setNameProduct}
                segment={segment}
                setSegment={setSegment}
                goal={goal}
                setGoal={setGoal}
            />

            <SucessMessage
                texto="Cadastro realizado com sucesso!"
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
            />


            <View style={styles.checkbox}>
                <Checkbox
                    value={hasChildrenGoals}
                    onChange={setHasChildrenGoals}
                />
                <Text >Esse produto possui metas vinculadas</Text>
            </View>


            {hasChildrenGoals &&

                <View style={styles.childrenGoals}>
                    <TouchableOpacity onPress={() => setShowModal(!showModal)}>
                        <AntDesign name="pluscircleo" size={18} color="#3D3D3D" />
                    </TouchableOpacity>
                    <Text style={styles.TextchildrenGoals}>Adicionar a meta vinculada</Text>
                </View>}

            {showModal && <AddChildrenGoals
                onChange={setShowModal}
                value={showModal}
                childData={setData}
                title="Cadastrar Meta Vinculada"
            />

            }

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
               

                {data.length > 0 && (
                <View style={styles.renderDataChildContainer}>
                    {data.map((e, index: number) => (
                        <View key={index} style={styles.renderDataChildContent}>
                            <Text>{e.name}</Text>
                            <Text>{formatCurrency(e.goal)}</Text>
                        </View>

                    ))}

                </View>
            )}
            </ScrollView>

            

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    )
}


export default NewProduct


const styles = StyleSheet.create({
    container: {
        padding: 15,
        width: '100%',
        height: '100%',
        //justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
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
    checkbox: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        color: '#3D3D3D'
    },
    childrenGoals: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 14,
    },
    TextchildrenGoals: {
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        textAlign: 'left',
        color: '#3D3D3D',
        gap: 0,
    },
    renderDataChildContainer: {
        width: '80%',
        gap: 10
    },
    renderDataChildContent: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: 'black',
        //borderWidth: .5,
        padding: 2
    }, scrollContainer: {
        padding: 20,
        paddingBottom: 60, // ou mais, pra garantir espaço abaixo do botão
    }
})


