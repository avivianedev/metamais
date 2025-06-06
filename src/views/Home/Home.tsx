import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useFonts } from "expo-font";
import { Inter_400Regular, Inter_800ExtraBold } from '@expo-google-fonts/inter';
import Card from '../../components/Card/Card';
import { clearAllProducts, getData } from '../../controllers/productsController';
import { useCallback, useEffect, useState } from 'react';
import { Product } from '../../models/Product';
import { formatCurrency } from '../../utils/formatCurrency';
import { useFocusEffect } from '@react-navigation/native';




export default function Home() {

  const [products, setProducts] = useState<Product[]>([]);

  //clearAllProducts()

  useFocusEffect(
  useCallback(() => {

    const fetchData = async () => {
      const result = await getData();
      setProducts(result.sort());

    };

    fetchData()

  }, [])

)
  console.log('Valor de data', products)

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null
  }

  return (
    <View style={styles.container}>

      <FlatList

        data={products}
        style={styles.list}
        contentContainerStyle={{
          paddingBottom: 100,
          paddingHorizontal: 16,
          paddingTop: 16,
        }}

        renderItem={({ item }) => (
          (
            <Card
              isLarge={true}
              title={item.name}
              percent={item.percent}
              value={formatCurrency(item.goal)}
              missing={formatCurrency(item.remaining)}

            />
          )
        )}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9', // ou o tom que você quiser   
    padding: 24,
    gap: 24,
    width: '100%',

  },
  list: {
    marginTop: 20,
    width: '100%',



  },
  texto: {
    fontFamily: 'Inter_800ExtraBold',
    fontSize: 20,
    color: '#fff'
  }

});
