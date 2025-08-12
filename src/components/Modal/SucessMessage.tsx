import { StyleSheet, Text, View, TouchableOpacity, Animated } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useEffect, useRef } from 'react';
import { useApp } from "../../context/AppContext";
import { purpleTheme, redTheme } from "../../context/theme";

type ModalProps = {
    texto: string;
    visible: boolean;
    onClose: () => void;
};
export const SucessMessage = ({ texto, visible, onClose }: ModalProps) => {


    const { buttonSecondaryColor } = useApp();
    const colorTheme = buttonSecondaryColor ? redTheme : purpleTheme

    const slideAnim = useRef(new Animated.Value(300)).current;
    useEffect(() => {
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
            <Animated.View style={[styles.modalContainer, { transform: [{ translateY: slideAnim }]  }, {backgroundColor : colorTheme.colors.bg.primary}]}>
                <Text style={styles.text}>{texto}</Text>
                <TouchableOpacity onPress={onClose}>
                    <Text style={styles.close}>X</Text>
                </TouchableOpacity>
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
        backgroundColor: '#6C5DD3',
        width: '80%',
        height: 200,
        padding: 20,
        borderRadius: 12,
        marginBottom: 60,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        position: 'absolute',
        top: '20%'
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    close: {
        marginTop: 12,
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18
    },
});