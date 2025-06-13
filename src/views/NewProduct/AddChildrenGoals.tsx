import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import { formatCurrencyInput } from "../../utils/formatCurrency";
//import { storeListChildren } from "../../controllers/productsController";

type typePropsModal = {
    onChange: (value: boolean) => void;
    value: boolean
    childData: React.Dispatch<React.SetStateAction<{ name: string; goal: number }[]>>;
    title: string
    textBtn : string
    initialChild?: { name: string; goal: number }; //
    
};

export const AddChildrenGoals = ({ onChange, value, childData, title, initialChild, textBtn }: typePropsModal) => {

    const [nameProductChildren, SetNameProductChildren] = useState('')
    const [goalChildren, SetGoalChildren] = useState('')

    
    useEffect(() => {
        if (initialChild) {
            SetNameProductChildren(initialChild.name);
            SetGoalChildren(formatCurrencyInput(initialChild.goal)); 
        }
    }, [initialChild]);

    const ListChildren = () => {

        try {

            if (!nameProductChildren.trim() || !goalChildren.trim()) {
                Alert.alert('Campos obrigatórios', 'Preencha todos os campos antes de cadastrar.');
                return false
            }
            
            let goal = parseFloat(goalChildren.replace(/\./g, '').replace(',', '.'))
            const listChildren = []
            listChildren.push(nameProductChildren)
            listChildren.push(goal)           

            const newChild = {
                name: nameProductChildren,
                goal: goal
            }

            //SetNameProductChildren('')
            //SetGoalChildren('')
            childData(prev => [...prev, newChild])
            Alert.alert('Produto Adicionado')
            onChange(false)

            //console.log('Retorno ao clicar no Modal de ADD tarefas adicionar', newChild)
            return newChild

        } catch (error) {
            console.log('Erro ao adicionar meta vinculada')
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
            />

            <TextInput
                placeholder="Meta em R$"
                value={goalChildren}
                onChangeText={test => SetGoalChildren(test)}
                style={styles.input}
                placeholderTextColor={'white'}
                keyboardType="numeric"
            />

            <TouchableOpacity style={styles.button} onPress={() => ListChildren()}>
                <Text style={styles.buttonText}>{textBtn}</Text>
            </TouchableOpacity>

        </View>


    )
}


const styles = StyleSheet.create({
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
        zIndex: 2,

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
        alignItems: 'center',
        paddingLeft: 10,
        height: 38,
        fontWeight: '500',
        color: 'white'

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
        top: '10%',
        right: '5%'
    }

})