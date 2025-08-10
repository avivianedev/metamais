import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useFonts } from "expo-font";
import { Inter_400Regular, Inter_800ExtraBold } from '@expo-google-fonts/inter';
import Card from '../../components/Card/Card';
import { clearAllProducts, getData, getItem } from '../../controllers/productsController';
import { useCallback, useEffect, useState } from 'react';
import { Product } from '../../models/Product';
import { formatCurrency } from '../../utils/format/formatCurrency';
import { useFocusEffect } from '@react-navigation/native';
import { useApp } from '../../context/AppContext';



export default function Home() {

  const [products, setProducts] = useState<Product[]>([]);
  const { search, refreshList  } = useApp (); 

  const searchResult = search ? products.filter(item => {
    return item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.children?.[0]?.name.toLowerCase().includes(search.toLowerCase())
  }

  ) : products   

  useFocusEffect(
    useCallback(() => {

      const fetchData = async () => {
        const result = await getData();
        setProducts(result.sort());

      };

      fetchData()

    }, [refreshList])

  )

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

        data={searchResult}
        style={styles.list}
        contentContainerStyle={{
          paddingBottom: 100,
          paddingHorizontal: 16,
          paddingTop: 16,
        }}
        
        renderItem={({ item }) => (
          (
            <TouchableOpacity >
              
              <Card              
                isLarge={true}
                title={item.name}
                percent={item.percent}
                goal={item.goal}
                missing={formatCurrency(item.goal)}
                produced={item.produced}
                children={item.children}
                id={item.id}
                //onUpdated={() => setRefreshList(prev => !prev)}
                

              />

            </TouchableOpacity>
            
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
    backgroundColor: '#F9F9F9',   
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
