import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product } from "../models/Product";
import { Alert } from "react-native";


export const storeData = async (product: Product): Promise<boolean> => {  


    try {        

        if (!product.name.trim() || !product.segment.trim() || !product.goal) {
            Alert.alert('Campos obrigatórios', 'Preencha todos os campos antes de cadastrar.');
            return false
        }        

        const jsonValue = JSON.stringify(product);
        console.log('Valor recebido ao clicar em cadastrar Produto,' , jsonValue)
        await AsyncStorage.setItem(`product-${product.id}`, jsonValue);
        console.log('Produto salvo com sucesso!');
        return true


    } catch (e) {
        console.log('Erro ao cadastrar Produto', e)
        return false
    }
};

//export const storeListChildren = (product: string, goal: number) => {
//    const listChildren = []
//    listChildren.push(product)
//    listChildren.push(goal)
//
//    return listChildren
//
//}

export const getData = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const productKeys = keys.filter(key => key.startsWith('product-'))
        const stores = await AsyncStorage.multiGet(productKeys);

        const products = stores.map(([key, value]) => value && JSON.parse(value));

        return products
    } catch (e) {
        console.log('Erro ao ler o Produto', e)
        return [];
    }
};

export const getItem = async (key: string) => {

    try {
        const keys = await AsyncStorage.getAllKeys();
        const productKeys = keys.filter(key => key.startsWith('product-'))
        const filterKey = productKeys.filter(k => k === `product-${key}`)


        if (filterKey) {
            const stores = await AsyncStorage.multiGet(filterKey);
            const products = stores.map(([key, value]) => value && JSON.parse(value));            
            return products

        } else {
            console.log('O id não foi localizado')
        }

    } catch (error) {
        console.log('Erro ao ler o Produto', error)
        return [];
    }
}


export const clearAllProducts = async () => {
    await AsyncStorage.clear();
} 