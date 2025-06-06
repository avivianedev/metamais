import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product } from "../models/Product";

export const storeData = async (product: Product) => {

    try {
        const jsonValue = JSON.stringify(product);
        await AsyncStorage.setItem(`product-${product.id}`, jsonValue);
        console.log('Produto salvo com sucesso!');

    } catch (e) {
        console.log('Erro ao cadastrar Produto', e)
    }
};



export const getData = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const productKeys = keys.filter(key => key.startsWith('product-'))
        const stores = await AsyncStorage.multiGet(productKeys);

        const products = stores.map(([key, value]) => value && JSON.parse(value));

        //const jsonValue = await AsyncStorage.getItem(`product-`);
        console.log(products)
    } catch (e) {
        console.log('Erro ao ler o Produto', e)
    }
};