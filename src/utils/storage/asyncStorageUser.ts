import AsyncStorage from '@react-native-async-storage/async-storage';
import { use, useReducer } from 'react';
import { Alert } from 'react-native';


export const storeUser = async (name: string) => {
    try {
        if (!name.trim) {
            Alert.alert('Preencha corretamente com o Nome')
            return false
        }

        const user = JSON.stringify(name)
        await AsyncStorage.setItem('user', user)
        console.log('Nome salvo com sucesso!');
        Alert.alert('Nome salvo com sucesso')
        return user

    } catch (error) {
        Alert.alert('Erro ao salvar nome')
        console.log('Erro ao salvar nome')
    }
}

export const getUser = async (id: string) => {
    const user = await AsyncStorage.getItem(id)
    if (user) {
        return user
    } else {
        return false
    }


}

