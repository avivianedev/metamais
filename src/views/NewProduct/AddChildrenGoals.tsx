import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import { formatCurrencyInput } from "../../utils/format/formatCurrency";
import uuid from 'react-native-uuid';

type typePropsModal = {
    onChange: (value: boolean) => void;
    value: boolean
    childData: React.Dispatch<React.SetStateAction<{ key : string , name: string; goal: number, produced: number }[]>>;
    title: string
    textBtn: string
    selectedChildGoal?: { key : string , name: string; goal: number, produced: number };
    producedModal: boolean,
    hasChildrenGoals: boolean,    
    editingChildIndex? : number
};



export const AddChildrenGoals = ({ onChange, value, childData, title, selectedChildGoal, textBtn, producedModal, editingChildIndex }: typePropsModal) => {
    

    const [nameProductChildren, SetNameProductChildren] = useState('')
    const [goalChildren, SetGoalChildren] = useState('')
    const [producedChildren, setProducedChildren] = useState('')
    const [newProduction, setNewProduction] = useState('')

    const handleChangeInput = (text: string) => {
        if (producedModal) {
            setProducedChildren(text);
            setNewProduction(text)
        } else {
            SetGoalChildren(text);

        }
    };

  
    useEffect(() => {

        if (selectedChildGoal) {

            SetNameProductChildren(selectedChildGoal.name);
            SetGoalChildren(formatCurrencyInput(selectedChildGoal.goal));
            if (selectedChildGoal.produced !== null) {
                setProducedChildren(formatCurrencyInput(selectedChildGoal.produced))
            }


        }
    }, [selectedChildGoal]);



    const ListChildren = () => {

        try {

            

            if (!nameProductChildren.trim() || !goalChildren.trim()) {
                Alert.alert('Campos obrigatórios', 'Preencha todos os campos antes de cadastrar.');
                return false

            }

            let goal = parseFloat(goalChildren.replace(/\./g, '').replace(',', '.'))
            let produced = parseFloat(producedChildren.replace(/\./g, '').replace(',', '.'))
            let newProducedValue = parseFloat(newProduction.replace(/\./g, '').replace(',', '.'))
            const previousProduced = selectedChildGoal?.produced || 0;
            const childProduced = previousProduced + newProducedValue;

            const newChild = {
                key : selectedChildGoal?.key? selectedChildGoal.key : uuid.v4(),
                name: nameProductChildren,
                goal: goal,
                produced: producedModal ? childProduced : produced
            }

            childData(prev => [...prev, newChild])       
                             
            producedModal ? Alert.alert('Produção Adicionada') : Alert.alert('Produto Adicionado')
            
            onChange(false)            
            return newChild

        } catch (error) {
            console.log('Erro ao adicionar meta vinculada')
            producedModal ? Alert.alert('Erro ao adicionar Produção') : Alert.alert('Erro ao adicionar meta vinculada')

        }


    }


    return (

        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity style={styles.iConClose} onPress={() => onChange(!value)} >
                <AntDesign name="close" size={24} color="white" />
            </TouchableOpacity>

            <TextInput
                placeholder="Nome do Produto"
                value={nameProductChildren}
                onChangeText={test => SetNameProductChildren(test)}
                style={styles.input}
                placeholderTextColor={'white'}
                focusable={true}
                cursorColor={'white'}
                editable={producedModal ? false : true}
            />

            <TextInput
                placeholder={producedModal ? 'Nova Produção em R$' : 'Meta em R$'}
                value={producedModal ? newProduction : goalChildren}
                onChangeText={handleChangeInput}
                style={styles.input}
                placeholderTextColor={'white'}
                //keyboardType="numeric"
                focusable={true}
                cursorColor={'white'}

            />

            <TouchableOpacity style={styles.button} onPress={() => ListChildren()}>
                <Text style={styles.buttonText}>{textBtn}</Text>
            </TouchableOpacity>

        </View>


    )
}


const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    container: {
        padding: 24,
        width: '100%',
        height: 'auto',
        alignItems: 'center',
        gap: 24,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor: '#6C5DD3',
        position: 'absolute',
        top: '15%',
        color: 'white',
        zIndex: 5

    },
    title: {
        fontSize: 18,
        fontFamily: 'Inter_400Regular',
        color: 'white',
        alignSelf: 'center'

    },
    input: {
        width: '90%',
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
        //alignItems: 'center',
        paddingLeft: 10,
        height: 44,
        fontWeight: '500',
        color: 'white',
        //backgroundColor: 'transparent',
        zIndex: 5,


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
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Inter_400Regular',
    },
    iConClose: {
        position: 'absolute',
        top: '10%',
        right: '5%'
    }

})