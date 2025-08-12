import { StyleSheet, Text, View, TouchableOpacity, Animated, Alert } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useEffect, useRef, useState } from 'react';
import { deleteProduct } from "../../controllers/productsController";
import { useApp } from "../../context/AppContext";
import { purpleTheme, redTheme } from "../../context/theme";

type ModalProps = {
    texto: string;
    visible: boolean;
    data: any[]
    onClose: () => void;
};
export const ConfirmDiolag = ({ texto, visible, onClose, data }: ModalProps) => {



    const [parentName, setParentName] = useState('')
    const { setRefreshList , buttonSecondaryColor  } = useApp(); 

    const theme = buttonSecondaryColor ? redTheme : purpleTheme
    

    const handleDeleteProduct = async () => {
        try {
            const id = data[0].id
            await deleteProduct(id)
            Alert.alert('Produto Removido')
            onClose()
            setRefreshList(prev => !prev);
        } catch (error) {
            Alert.alert('Erro. Refaça a Operação ou Contate a Viviane')
        }
        
    }

    const slideAnim = useRef(new Animated.Value(300)).current;
    useEffect(() => {
        if (data && data.length > 0 && data[0]) {
            setParentName(data[0].name)
        }
        if (visible) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: 300,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    if (!visible) return null;
    return (

        <View style={styles.overlay}>
            <Animated.View style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }, {backgroundColor: theme.colors.accent.primary }]}>
                <View style={styles.modalDialogContent}>

                    <Text style={styles.textTitle}>{texto}</Text>
                    <Text style={styles.text}>Isso vai remover o produto</Text>
                    <Text style={[styles.textName , {color : theme.colors.text.third}]}>{parentName}</Text>
                    <Text style={styles.text}>E todas metas associadas se existir.</Text>

                    <View style={styles.btnContainer}>
                        <TouchableOpacity onPress={onClose} style={styles.buttonCancel} >
                            <Text style={styles.btnText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleDeleteProduct} style={[styles.buttonDel, {borderColor : theme.colors.accent.danger}]}>
                            <Text style={styles.btnText}>Excluir</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Animated.View>
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
    modalContainer: {
        backgroundColor: '#4B2E83',

        width: '80%',
        height: 250,
        padding: 20,
        borderRadius: 12,
        marginBottom: 60,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        position: 'absolute',
        top: '20%',

    },
    modalDialogContent: {
        gap: 10,
        //flexDirection: 'row'
    },
    textTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        alignSelf: 'center',
        textAlign: 'center'
    },
    text: {
        color: '#DDDDDD',
        fontWeight: '400',
        fontSize: 16,
        alignSelf: 'center',
        textAlign: 'center'
    },
    textName: {
        color: '#C792EA',
        fontWeight: '500',
        fontSize: 18,
        alignSelf: 'center'
    },
    close: {
        marginTop: 12,
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        alignSelf: 'flex-end',

    },
    btnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40

    },
    buttonCancel: {
        width: '35%',
        height: 35,
        borderWidth: 1,
        borderRadius: 8,
        //backgroundColor: '#8E7EFF',
        //borderColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        borderColor: '#C792EA',
        backgroundColor: 'transparent',
        color: '#C792EA'
    },
    buttonDel: {
        width: '35%',
        height: 35,
        borderWidth: 1,
        borderRadius: 8,
        //backgroundColor: '#8E7EFF',
        //borderColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        borderColor: '#FF4D4D',
        backgroundColor: 'transparent',
        color: '#FF4D4D'
    },
    btnText: {
        color: '#fff',
        fontWeight: '400',
        fontSize: 14,
        alignSelf: 'center'
    }
});