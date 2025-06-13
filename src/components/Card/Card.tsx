import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Inter_400Regular } from '@expo-google-fonts/inter';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from "react";
import { formatCurrency } from "../../utils/formatCurrency";

import { useActionSheet } from '@expo/react-native-action-sheet';
import { EditProductModal } from "../Modal/EditProductModal";
import { getItem } from "../../controllers/productsController";
import { Product } from "../../models/Product";



const Card = ({ isLarge, id, title, percent, value, missing, children }: any) => {

    const [showChildrenGoals, setShowChildrenGoals] = useState(false);
    const { showActionSheetWithOptions } = useActionSheet();
    const [showEditModal, setShowEditModal] = useState(false)
    const [dataRecoverer, setDataRecoverer] = useState<any | null>(null)
    const [refreshList, setRefreshList] = useState(false);

    const handleGetItem = async (id: string) => {
        const selectedProduct = await getItem(id)
        //console.log('Retorno do selectedProduct que pega o ID', selectedProduct)
        setDataRecoverer(selectedProduct)
    }

    const openOptions = () => {
        const options = ['Alterar dados', 'Excluir dados', 'Nova meta', 'Cancelar'];
        const cancelButtonIndex = 3;

        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
                title: 'Ações disponíveis',
            },
            (selectedIndex) => {
                switch (selectedIndex) {
                    case 0:
                        setShowEditModal(true)
                        handleGetItem(id)

                        break;
                    case 1:
                        // Excluir dados
                        break;
                    case 2:
                        // Inserir nova meta
                        break;
                }
            }
        );
    };



    return (
        <View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={showEditModal}
                onRequestClose={() => setShowEditModal(false)}
            >
                <EditProductModal
                    onClose={() => setShowEditModal(false)}
                    data={dataRecoverer}

                />
            </Modal>

            <TouchableOpacity
                onLongPress={openOptions}
                style={[isLarge ? styles.largeCard : styles.smallCard]}


            >
                <View style={styles.cardHeader}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.title}>% {percent}</Text>
                </View>
                <Text style={styles.value}>{value}</Text>
                <Text style={styles.missing}>Falta: {missing}</Text>

                {children?.length > 0 && (

                    <TouchableOpacity onPress={() => {
                        setShowChildrenGoals(!showChildrenGoals)

                    }} style={styles.BtnArrow}>

                        {showChildrenGoals
                            ?
                            <View style={styles.containerChildValue}>
                                <MaterialIcons name="keyboard-arrow-up" size={24} color="black" />

                                {children.map((child: { name: string, goal: number }, index: number) => (

                                    <View style={styles.childValues} key={index}>
                                        <Text style={styles.childName}>{child.name}</Text>
                                        <Text style={styles.childGoal}>{formatCurrency(child.goal)}</Text>

                                    </View>
                                ))}
                            </View>
                            :

                            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                        }
                    </TouchableOpacity>
                )}
            </TouchableOpacity>



        </View>

    )
}


export default Card
const styles = StyleSheet.create({


    largeCard: {
        padding: 10,
        width: '100%',
        height: 'auto',
        borderRadius: 16,
        borderColor: '#003459',
        borderWidth: .8,
        marginBottom: 16


    },
    smallCard: {
        width: '48%',
        height: 100,
        borderRadius: 10,
        opacity: .5,
        borderColor: 'white',
        backgroundColor: 'rgba(142, 126, 255, .8)',
        borderWidth: .5,
        padding: 10
    },
    cardHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 18,
        fontFamily: 'Inter_400Regular',
        color: '#3D3D3D',
    },

    value: {
        fontFamily: 'Inter_400Regular',
        color: '#3D3D3D',
        fontSize: 24,
        fontWeight: 700,

    },
    missing: {
        fontSize: 12,
        fontFamily: 'Inter_400Regular',
        color: '#003459'
    },
    BtnArrow: {
        width: '100%',
        display: 'flex',
        alignItems: 'center'

    },
    containerChildValue: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5
    },
    childValues: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    childName: {
        fontFamily: 'Inter_400Regular',
        color: '#3D3D3D',
        fontSize: 14,
        fontWeight: 700,
    },
    childGoal: {
        fontFamily: 'Inter_400Regular',
        color: '#3D3D3D',
        fontSize: 14,
        fontWeight: 700,
    }
})