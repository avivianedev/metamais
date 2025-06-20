import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Inter_400Regular } from '@expo-google-fonts/inter';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { use, useEffect, useState } from "react";
import { formatCurrency, formatCurrencyInput, sanitizeCurrencyInput } from "../../utils/formatCurrency";

import { useActionSheet } from '@expo/react-native-action-sheet';
import { EditProductModal } from "../Modal/EditProductModal";
import { getItem } from "../../controllers/productsController";
import { Product } from "../../models/Product";
import { calculateMissing, calculatePercentage } from "../../utils/metricsUtils";
import { useApp  } from "../context/AppContext";



const Card = ({ isLarge, id, title, percent, goal, missing, children, produced }: any) => {

    const [showChildrenGoals, setShowChildrenGoals] = useState(false);
    const { showActionSheetWithOptions } = useActionSheet();
    const [showEditModal, setShowEditModal] = useState(false)
    const [dataRecoverer, setDataRecoverer] = useState<any | null>(null)
    const [showNewProductionModal, setShowNewProductionModal] = useState(false)

    //const {setRefreshList } = useApp();

    let producedFormater = parseFloat(produced)
    let valueFormater = parseFloat(goal)

    const handleGetItem = async (id: string, type: 'edit' | 'production') => {
        const selectedProduct = await getItem(id)
        setDataRecoverer(selectedProduct)

        setTimeout(() => {
            if (type === 'edit') setShowEditModal(true);
            else setShowNewProductionModal(true);
        }, 0);
    }


    const showOptionsMenu = () => {
        const options = ['Alterar dados', 'Nova Produção', 'Excluir dados', 'Cancelar'];
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
                        handleGetItem(id, 'edit')

                        break;
                    case 1:
                        handleGetItem(id, 'production')
                        break;
                    case 2:
                        // nova meta
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
                    title='Atualizar Produto'
                    titleHeaderChild="Meta Final"
                    producedModal={false}
                    

                />
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={showNewProductionModal}
                onRequestClose={() => setShowNewProductionModal(false)}

            >
                <EditProductModal
                    onClose={() => setShowNewProductionModal(false)}
                    data={dataRecoverer}
                    title='Cadastrar Produção'
                    titleHeaderChild="Produção"
                    producedModal={true}

                />
            </Modal>

            <TouchableOpacity
                onLongPress={showOptionsMenu}
                style={[isLarge ? styles.largeCard : styles.smallCard]}


            >
                <View style={styles.cardHeader}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.title}>% {children?.length 
                    ? calculatePercentage(children, goal, children) 
                    : calculatePercentage(producedFormater, valueFormater) }</Text>
                </View>
                <Text style={styles.missing}>Falta: {
                    children?.length
                        ? formatCurrencyInput(calculateMissing(children, goal, children))
                        : formatCurrencyInput(calculateMissing(producedFormater, valueFormater))}</Text>
                <Text style={styles.value}>Meta: {formatCurrencyInput(goal)}

                </Text>

                {children?.length > 0 && (

                    <TouchableOpacity onPress={() => {
                        setShowChildrenGoals(!showChildrenGoals)

                    }} style={styles.BtnArrow}>

                        {showChildrenGoals
                            ?
                            <View style={styles.containerChildValue}>
                                <MaterialIcons name="keyboard-arrow-up" size={24} color="black" />

                                {children.map((child: { name: string, goal: number, produced: number }, index: number) => (
                                    <View style={styles.childContent} key={index}>

                                        <View style={styles.childValues} key={index}>
                                            <Text style={styles.childName}>{child.name}</Text>
                                            <Text style={styles.produced}>Prod: {formatCurrency(child.produced)}</Text>


                                        </View>
                                        <View style={styles.producedValues}>
                                            <Text style={styles.childMissing}>Falta: {formatCurrencyInput(calculateMissing(child.produced, child.goal))}</Text>
                                            <Text style={styles.childPercent}>{calculatePercentage(child.produced, child.goal)} %</Text>

                                        </View>
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
        //borderColor: '#003459',
        borderColor: '#6c72FF',
        borderWidth: 1,
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
        color: '#6c72FF',
        fontWeight: 700
    },

    missing: {
        fontFamily: 'Inter_400Regular',
        color: '#101935',
        fontSize: 24,
        fontWeight: 700,

    },
    value: {
        fontSize: 12,
        fontFamily: 'Inter_400Regular',
        color: '#212C4D'
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
        gap: 8,


    },
    childContent: {
        borderWidth: 1.5,
        borderColor: '#6c72FF',
        borderRadius: 10,
        padding: 10,
        //backgroundColor: '#D7C7FF'
    },
    childValues: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    childName: {
        fontFamily: 'Inter_400Regular',
        color: '#6c72FF',
        fontSize: 14,
        fontWeight: 700,
    },
    produced: {
        fontFamily: 'Inter_400Regular',
        color: '#101935',
        fontSize: 14,
        fontWeight: 700,
    },
    childPercent: {
        fontFamily: 'Inter_400Regular',
        color: 'black',
        fontSize: 14,
        fontWeight: 600,
    },
    childMissing: {
        fontSize: 12,
        fontWeight: 600,
        fontFamily: 'Inter_400Regular',
        color: '#101935'
    },
    producedValues: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})