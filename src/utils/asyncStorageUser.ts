import AsyncStorage from '@react-native-async-storage/async-storage';
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
        return true

    } catch (error) {
        Alert.alert('Erro ao salvar nome')
        console.log('Erro ao salvar nome')
    }
}