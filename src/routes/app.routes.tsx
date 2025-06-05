import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native'

const { Navigator, Screen } = createBottomTabNavigator();

import Home from '../views/Home/Home';
import NewProduct from '../views/NewProduct/NewProduct';
import NewProduction from '../views/NewProduction/NewProduction';
import History from '../views/History/History';
import { StyleSheet, View } from 'react-native';

import { Feather } from '@expo/vector-icons'
import Entypo from '@expo/vector-icons/Entypo';


export function AppRoutes() {
    return (

        <NavigationContainer >
            <Navigator screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#6C5DD3',
                    //borderTopLeftRadius: 24,
                    //borderTopRightRadius: 24,
                    //borderBottomRightRadius: 24,
                    //borderBottomLeftRadius: 24,
                    //height: 60,
                    //paddingBottom: 6,
                    //paddingTop: 6,
                    //marginBottom: 20
                },
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: '#ccc',
                
            }}

            >
                <Screen name='Home' component={Home} options={{
                    tabBarIcon: () => {

                        return  <Feather name='home' color={'white'} size={25} /> 
                    }                        
                            
                }} />
                <Screen name='Produção' component={NewProduction} options={{
                    tabBarIcon: () => {
                        return <Feather name='plus-circle' color={'white'} size={25} />
                    }
                }}/>
                <Screen name='Histórico' component={History} 
                options={{
                    tabBarIcon: () => {
                        return <Feather name='archive' color={'white'} size={25} />
                    }
                }}/>
                <Screen name='Dashboard' component={NewProduct} 
                options={{
                    tabBarIcon: () => {
                        return <Feather name='bar-chart-2' color={'white'} size={25} />
                    }
                }}/>
            </Navigator>
        </NavigationContainer>

    )
}


const style = StyleSheet.create({

    container: {
        flex: 1,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        backgroundColor: '#6C5DD3'

    },
    active:{
       
        
        
    }

})