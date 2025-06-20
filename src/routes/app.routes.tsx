import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native'

const { Navigator, Screen } = createBottomTabNavigator();

import Home from '../views/Home/Home';
import NewProduct from '../views/NewProduct/NewProduct';
import History from '../views/History/History';
import { StyleSheet, View } from 'react-native';

import { Feather } from '@expo/vector-icons'
import Entypo from '@expo/vector-icons/Entypo';
import Settings from '../views/Settings/Settings';


export function AppRoutes() {
    return (

        <NavigationContainer >
            <Navigator screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#6C5DD3',
                    
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
                <Screen name='Novo' component={NewProduct} 
                options={{
                    tabBarIcon: () => {
                        return <Feather name='edit' color={'white'} size={25} />
                    }
                }}/>
                
                <Screen name='Histórico' component={History} 
                options={{
                    tabBarIcon: () => {
                        return <Feather name='archive' color={'white'} size={25} />
                    }
                }}/>
                <Screen name='Configuração' component={Settings} options={{
                    tabBarIcon: () => {
                        return <Feather name="settings" size={24} color={'white'} />
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