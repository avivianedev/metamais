import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from "react"
import { formatCurrency, formatCurrencyInput, sanitizeCurrencyInput } from "../../utils/formatCurrency";
import { Product } from "../../models/Product";
import { getItem, storeData } from "../../controllers/productsController";
import { AddChildrenGoals } from "../../views/NewProduct/AddChildrenGoals";
import { useApp } from "../context/AppContext";



type editProps = {
    onClose: () => void;
    data: any[]
    title: string
    titleHeaderChild: string
    producedModal: boolean,


}

export const EditProductModal = ({ onClose, data, title, titleHeaderChild, producedModal, }: editProps) => {

    const { setRefreshList  } = useApp (); 

    if (!data || data.length === 0 || !data[0]) {
        return null;
    }

    const [nameProduct, setNameProduct] = useState('')
    const [segment, setSegment] = useState('')
    const [goal, setGoal] = useState('')
    const [produced, setProduced] = useState('')
    const [showEditChild, setShowEditChild] = useState(false)
    const [showListChild, setShowListChild] = useState(false)
    const [hasChildrenGoals, setHasChildrenGoals] = useState(data[0].hasChildren)
    const [editingChildIndex, setEditingChildIndex] = useState<number | null>(null);
    const [dataChild, setDataChild] = useState<{ name: string; goal: number, produced: number }[]>([]);
    const [updatedChildren, setUpdatedChildren] = useState(data[0].children);
    const previousProduced = parseFloat(data[0].produced || 0);
    const newProduced = parseFloat(produced.replace(/\./g, ''));

    const handleUpdate = async () => {

        const updatedChildren = data[0].children.map(
            (item: { name: string; goal: number }, index: number) =>
                index === editingChildIndex ? dataChild[0] : item
        );

        const product: Product = {
            id: data[0].id,
            name: nameProduct,
            segment: segment,
            goal: hasChildrenGoals
                ? updatedChildren.reduce((acc: any, child: any) => acc + (child.goal || 0), 0)
                : sanitizeCurrencyInput(goal),
            produced: producedModal ? previousProduced + newProduced : newProduced,
            remaining: parseFloat(goal.replace(/\./g, '')),
            percent: 0,
            hasChildren: hasChildrenGoals,
            children: updatedChildren

        };

        const result = await storeData(product);

        if (result) {
            Alert.alert('Produto Alterado com sucesso!')
            onClose()
            setRefreshList(prev => !prev); 
        }

    }



    const handleEditChild = (id: number) => {
        setShowEditChild(true)
        setEditingChildIndex(id)
    }

    const handleAddPrd = (id: number) => {
        setShowEditChild(true)
        setEditingChildIndex(id)

    }

    useEffect(() => {


        if (editingChildIndex !== null) {
            setShowEditChild(true);
        }

        if (data && data.length > 0 && data[0]) {
            setNameProduct(data[0].name);
            setSegment(data[0].segment);
            setGoal(formatCurrencyInput(data[0].goal));
            setUpdatedChildren(data[0].children);


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

    useEffect(() => {
        if (editingChildIndex !== null && dataChild[0]) {
            const newList = updatedChildren.map((item: string, index: number) =>
                index === editingChildIndex ? dataChild[0] : item
            );
            setUpdatedChildren(newList);

            const totalChildrenGoals = newList.reduce((acc : any, child : any) => acc + (child.goal || 0), 0);
            setGoal(formatCurrencyInput(totalChildrenGoals));
        }
    }, [dataChild]);

    return (

        <View style={styles.inputContainer}>


            <Text style={styles.title}>{title}</Text>

            <TouchableOpacity style={styles.iConClose} accessibilityLabel="Fechar modal" onPress={onClose} >
                <AntDesign name="close" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.inputLabel}>Nome do Produto</Text>
            <TextInput
                placeholder="Nome do Produto"
                value={nameProduct}
                onChangeText={setNameProduct}
                style={styles.input}
                placeholderTextColor={'white'}
                editable={producedModal ? false : true}
            />
            <Text style={styles.inputLabel}>Nome do Segmento</Text>
            <TextInput
                placeholder="Nome do Segmento"
                value={segment}
                onChangeText={setSegment}
                style={styles.input}
                placeholderTextColor={'white'}
                editable={producedModal ? false : true}

            />
            <Text style={styles.inputLabel}>Meta Final</Text>

            <TextInput
                placeholder="Meta em R$"
                value={goal}
                onChangeText={setGoal}
                style={styles.input}
                placeholderTextColor={'white'}
                editable={producedModal ? false : true}

            />

            {!hasChildrenGoals && producedModal &&
                <>
                    <Text style={styles.inputLabel}>Nova Produção</Text>

                    <TextInput
                        placeholder="Valor em R$"
                        value={produced}
                        onChangeText={setProduced}
                        style={styles.input}
                        placeholderTextColor={'white'}
                        editable={true}


                    />
                </>
            }

            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Alterar</Text>
            </TouchableOpacity>



            {showListChild && (

                <>

                    <View style={styles.containerTextHeader}>
                        <Text style={styles.containerText}>Produto</Text>
                        <Text style={styles.containerText}>{titleHeaderChild}</Text>
                        <Text style={styles.containerText}>Ação</Text>
                    </View>
                    {updatedChildren.map((e: any, index: number) =>

                    (

                        <View key={index} style={styles.renderDataChildContent}>

                            <View style={styles.containerChild}>
                                <Text style={styles.childText}>{e.name}</Text>
                            </View>

                            <View style={styles.containerChildValue}>
                                <Text style={styles.childText}>{producedModal ? formatCurrency(e.produced) : formatCurrency(e.goal)}</Text>
                                {producedModal ?

                                    <View style={styles.boxIcons}>
                                        <TouchableOpacity
                                            onPress={() => handleAddPrd(index)} >
                                            <Ionicons name="add-circle-outline" size={24} color="#57C3FF" />
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <View style={styles.boxIcons}>
                                        <TouchableOpacity
                                            onPress={() => handleEditChild(index)} >
                                            <Feather name="edit" size={20} color="#FFCA3A" />
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <Feather name="trash" size={20} color="#FF595E" />
                                        </TouchableOpacity>
                                    </View>
                                }

                            </View>

                        </View>

                    )
                    )}

                    {editingChildIndex !== null && showEditChild && (
                        <View style={styles.editingChildContainer}>
                            <AddChildrenGoals
                                value={true}
                                childData={setDataChild}
                                onChange={() => {
                                    setShowEditChild(!showEditChild)
                                    setShowListChild(showEditChild)
                                }}
                                hasChildrenGoals={hasChildrenGoals}
                                producedModal={producedModal}
                                title="Atualizar Metas Vinculadas"
                                textBtn='Atualizar'
                                initialChild={data[0].children[editingChildIndex]

                                }
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
        gap: 10,
        borderRadius: 15,
    },
    containerTextHeader: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    containerText: {
        fontSize: 14,
        fontWeight: 700,
        fontFamily: 'Inter_400Regular',
        color: '#343B4F',
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
    inputLabel: {
        alignSelf: 'flex-start',
        fontFamily: 'Inter_400Regular',
        paddingLeft: 10,
        color: '#343B4F'
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
        //alignItems: 'center',


    },
    childText: {
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        color: '#fff',
        fontWeight: 700
    },
    containerChild: {
        //display: 'flex',
        //flexDirection: 'row',
        //alignItems: 'center',
        width: '50%',
        position: 'relative',
        alignSelf: 'flex-start'
    },

    containerChildValue: {
        width: '50%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        //alignSelf: 'flex-end',
        gap: 5

    },
    boxIcons: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 5
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
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: 99,
    }

})