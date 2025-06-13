import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { useEffect, useState } from "react"
import { formatCurrency, formatCurrencyInput, sanitizeCurrencyInput } from "../../utils/formatCurrency";
import { Product } from "../../models/Product";
import { getItem, storeData } from "../../controllers/productsController";
import { AddChildrenGoals } from "../../views/NewProduct/AddChildrenGoals";


type editProps = {
    onClose: () => void;
    data: any[]

}

export const EditProductModal = ({ onClose, data }: editProps) => {

    const [nameProduct, setNameProduct] = useState('')
    const [segment, setSegment] = useState('')
    const [goal, setGoal] = useState('')

    const [showEditChild, setShowEditChild] = useState(false)
    const [showListChild, setShowListChild] = useState(false)
    const [hasChildrenGoals, setHasChildrenGoals] = useState(false)

    const [editingChildIndex, setEditingChildIndex] = useState<number | null>(null);
    const [dataChild, setDataChild] = useState<{ name: string; goal: number }[]>([]);
    
    const handleUpdate = async () => {

        const sanitizedGoal = sanitizeCurrencyInput(goal);

        const updatedChildren = data[0].children.map(
            (item: { name: string; goal: number }, index: number) =>
                index === editingChildIndex ? dataChild[0] : item
        );     

        const product: Product = {
            id: data[0].id,
            name: nameProduct,
            segment: segment,
            goal: sanitizedGoal,
            produced: 0,
            remaining: parseFloat(goal.replace(/\./g, '')),
            percent: 0,
            hasChildren: hasChildrenGoals,
            children: updatedChildren

        };

        const result = await storeData(product);

        if (result) {
            Alert.alert('Produto Alterado com sucesso!')
            onClose()
        }

    }

    const handleEditChild = (id: number) => {
        console.log('Index a ser trabalhado:', id);
        setShowEditChild(true)
        setEditingChildIndex(id)

    }

    useEffect(() => {

        if (editingChildIndex !== null) {
            setShowEditChild(true);
            //console.log('Indice atualizado:', editingChildIndex)
        }
        // if (dataChild.length > 0) {
        //     console.log('Reconheco o valor true de data child.')
        //     //const result = data[0].children.map((item: any, index: number) => index === 0 ? dataChild : item)

        //     //console.log('Valor depois do MAP', result)
        // } else {
        //     console.log('NÂO Reconheco o valor true de data child')
        // }


        if (data && data.length > 0) {
            setNameProduct(data[0].name);
            setSegment(data[0].segment);
            setGoal(formatCurrencyInput(data[0].goal));



            if (data[0].children.length > 0) {
                setShowListChild(true)
                return

            } else {
                //Alert.alert('Esse Produto não possui meta associada')
                setShowEditChild(false)
                return
            }

        }

    }, [data]);

    return (

        <View style={styles.inputContainer}>


            <Text style={styles.title}>Atualizar Produto</Text>

            <TouchableOpacity style={styles.iConClose} accessibilityLabel="Fechar modal" onPress={onClose} >
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
            />


            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Alterar</Text>
            </TouchableOpacity>


            {showListChild && (

                <>
                    {data[0].children.map((e: any, index: number) =>
                    (
                        <View key={index} style={styles.renderDataChildContent}>

                            <View style={styles.containerChild}>
                                <Text style={styles.childText}>{e.name}</Text>
                            </View>

                            <View style={styles.containerChildValue}>
                                <Text style={styles.childText}>{formatCurrency(e.goal)}</Text>
                                <View style={styles.boxIcons}>
                                    <TouchableOpacity
                                        onPress={() => handleEditChild(index)} >
                                        <Feather name="edit" size={24} color="#FFCA3A" />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Feather name="trash" size={24} color="#FF595E" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>

                    )
                    )}

                    {editingChildIndex !== null && showEditChild &&(
                        <View style={styles.editingChildContainer}>
                            <AddChildrenGoals
                                value={true}
                                childData={setDataChild}
                                onChange={() => {
                                    setShowEditChild(!showEditChild)
                                    setShowListChild(showEditChild)
                                }}
                                title="Atualizar Metas Vinculadas"
                                textBtn = 'Atualizar'
                                initialChild={data[0].children[editingChildIndex]}
                            />
                        </View>
                    )}
                </>


            )}

        </View >



    )
}


const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        padding: 24,
        alignItems: 'center',
        backgroundColor: '#6C5DD3',
        gap: 24,
        borderRadius: 15,
    },
    title: {
        fontSize: 18,
        fontFamily: 'Inter_400Regular',
        color: '#fff',
    },
    input: {
        width: '90%',
        borderColor: '#8E7EFF',
        borderWidth: 2,
        borderRadius: 10,
        alignItems: 'center',
        paddingLeft: 10,
        height: 38,
        color: 'white',
        fontWeight: 700,

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
        top: 24,
        right: 24
    },
    renderDataChildContainer: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        gap: 10,


    },
    renderDataChildContent: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',


    },
    childText: {
        fontSize: 18,
        fontFamily: 'Inter_400Regular',
        color: '#fff',
        fontWeight: 700
    },
    containerChild: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative'
    },

    containerChildValue: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10

    },
    boxIcons: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15
    },
    scrollChildrenContainer: {
        maxHeight: 225,
        width: '100%',
        marginTop: 20,

    },

    scrollContent: {
        gap: 10,
        paddingBottom: 20,
    },
    editingChildContainer: {
        position: 'absolute',
        top: '25%',
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)', // se quiser um overlay escuro
        zIndex: 99,
    }

})