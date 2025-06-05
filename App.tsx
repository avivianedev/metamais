import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './src/components/Header/Header';
import { useFonts } from "expo-font";
import { Inter_400Regular, Inter_800ExtraBold } from '@expo-google-fonts/inter';
import Card from './src/components/Card/Card';
import Home from './src/views/Home/Home';
import { AppRoutes } from './src/routes/app.routes';



export default function App() {

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null
  }



  return (
    <View style={styles.container}>
      <Header />
      

      <StatusBar style="auto" />
      <AppRoutes/>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',   


  },
 

});
