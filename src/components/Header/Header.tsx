import { StyleSheet, Text, TextInput, View } from "react-native"
import { Inter_400Regular } from '@expo-google-fonts/inter';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';



const Header = () => {

    return (
        <LinearGradient
            colors={['#6C5DD3', '#8E7EFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 2 }}
            style={styles.headerContainer}>

            <View style={styles.introContainer}>
                <Text style={styles.title}>Olá, Gabi</Text>
                <Text style={styles.subtitle}>Uma meta por vez. Você chega lá!</Text>
            </View>
            <View style={styles.inputContainer}>
                <AntDesign name="search1" size={18} color="white" />
                <TextInput style={styles.input}></TextInput>
            </View>
        </LinearGradient>
    )
}


export default Header

const styles = StyleSheet.create({
    headerContainer: {
        height: '25%',
        display: 'flex',
        padding: 32,
        width: '100%',
        //backgroundColor: '#6C5DD3',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        gap: 10,


    },
    introContainer: {
        marginTop: 30,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',

    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        fontFamily: 'Inter_400Regular'
    },
    subtitle: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Inter_400Regular'
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        borderColor: 'white',
        backgroundColor: "#adb5bd",
        borderWidth: .5,
        borderRadius: 10,
        alignItems: 'center',
        paddingLeft: 10,
        height: 38,
        opacity: .5,
        marginTop: 25

    },
    input: {
        width: '100%',


    }

})