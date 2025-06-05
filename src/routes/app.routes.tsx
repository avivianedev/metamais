import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native'

const {Navigator, Screen} = createBottomTabNavigator();

import Home from '../views/Home/Home';
import NewProduct from '../views/NewProduct/NewProduct';
import NewProduction from '../views/NewProduction/NewProduction';
import History from '../views/History/History';

export function AppRoutes(){
    return(
        <NavigationContainer>
        <Navigator> 
            <Screen name='Home' component={Home}/>
            <Screen name='NewProduct' component={NewProduct}/>
            <Screen name='NewProduction' component={NewProduction}/>
            <Screen name='History' component={History}/>
        </Navigator>
        </NavigationContainer>
    )
}