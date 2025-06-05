import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from "expo-font";
import { Inter_400Regular, Inter_800ExtraBold } from '@expo-google-fonts/inter';
import Card from '../../components/Card/Card';




export default function Home() {

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null
  }



  return (
    <View style={styles.container}>
     
      <Card
        isLarge={true}
        title="Crédito Total"
        percent={74}
        value={246000}
        missing={1200.08}

      />
      <Card
        isLarge={true}
        title="Consórcio Total"
        percent={63}
        value={162000}
        missing={8064.03} />

      <Card
        isLarge={true}
        title="Imobiliário"
        percent={83}
        value={162000}
        missing={8064.03} />

      


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    //backgroundColor: '#fff',
    justifyContent:'center',
    alignItems: 'center',
    gap: 24,
    


  },
  texto: {
    fontFamily: 'Inter_800ExtraBold',
    fontSize: 20,
    color: '#fff'
  }

});
