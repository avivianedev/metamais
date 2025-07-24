import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { Inter_400Regular, Inter_800ExtraBold } from '@expo-google-fonts/inter';
import { useEffect, useState } from "react";
import Checkbox from "../../components/Checkbox/Checkbox";
import uuid from 'react-native-uuid';
import { Product } from "../../models/Product";
import { storeData } from "../../controllers/productsController";
import { SucessMessage } from "../../components/Modal/SucessMessage";
import AntDesign from '@expo/vector-icons/AntDesign';
import { AddChildrenGoals } from "./AddChildrenGoals";
import { FormProduct } from "../../components/FormProduct/FormProduct";
import { formatCurrency, formatCurrencyInput, sanitizeCurrencyInput } from "../../utils/formatCurrency";


const NewProduct = () => {

    const [parentName, setParentName] = useState('')
    const [segment, setSegment] = useState('')
    const [parentGoal, setParentGoal] = useState('')
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [hasChildrenGoals, setHasChildrenGoals] = useState(false)
    const [showChildModal, setShowChildModal] = useState(false)
    const [dataChildGoals, setDataChildGoals] = useState<{ key : string , name: string; goal: number, produced: number }[]>([]);

    

    const clearForm = () => {

        setParentName('')
        setSegment('')
        setParentGoal('')
        setHasChildrenGoals(false)
        setDataChildGoals([])
    }

    const handleSubmit = async () => {

        const product: Product = {
            id: uuid.v4(),
            name: parentName,
            segment: segment,
            //goal: parseFloat(goal.replace(/\./g, '').replace(',', '.').replace(',', '')),
            goal: sanitizeCurrencyInput(parentGoal),
            produced: 0,
            //remaining: parseFloat(goal.replace(/\./g, '')),
            remaining: sanitizeCurrencyInput(parentGoal),
            percent: 0,
            hasChildren: hasChildrenGoals,
            goalAchieved: false,
            children: dataChildGoals
        };

        const result = await storeData(product);

        if (result) {
            clearForm()
            setSuccessModalVisible(true);
            setShowChildModal(false)
        }
    };

    useEffect(() => {
        if (dataChildGoals.length > 0) {
            const total = dataChildGoals.reduce((acc, item) => acc + item.goal, 0);
            setParentGoal(formatCurrencyInput(total))
        }
    }, [dataChildGoals]);

    return (
        <View style={styles.container}>

            <FormProduct
                title={'Cadastro de Produtos'}
                nameProduct={parentName}
                setNameProduct={setParentName}
                segment={segment}
                setSegment={setSegment}
                goal={parentGoal}
                setGoal={setParentGoal}
                hasChildrenGoals={hasChildrenGoals}
            />

            <SucessMessage
                texto="Cadastro realizado com sucesso!"
                visible={successModalVisible}
                onClose={() => setSuccessModalVisible(false)}
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
                    <TouchableOpacity onPress={() => setShowChildModal(!showChildModal)}>
                        <AntDesign name="pluscircleo" size={18} color="#3D3D3D" />
                    </TouchableOpacity>
                    <Text style={styles.TextchildrenGoals}>Adicionar a meta vinculada</Text>
                </View>}

            {showChildModal && <AddChildrenGoals
                onChange={setShowChildModal}
                value={showChildModal}
                childData={setDataChildGoals}
                title="Cadastrar Meta Vinculada"
                hasChildrenGoals={hasChildrenGoals}
                textBtn={'Cadastrar'}
                producedModal={false}
               
            />

            }

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"

            >


                {dataChildGoals.length > 0 && (
                    <View style={styles.renderDataChildContainer}>
                        {dataChildGoals.map((e, index: number) => (
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
        backgroundColor: '#6C5DD3',
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
        paddingBottom: 60, 
    }
})


