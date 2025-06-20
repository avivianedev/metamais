import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { clearAllProducts } from "../../controllers/productsController"

const Settings = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Configurações</Text>

            <View style={styles.optionsSettings}>
                <Text style={styles.subtitle}>Limpar dados</Text>
                <TouchableOpacity style={styles.button} onPress={clearAllProducts}>
                    <Text style={styles.buttonText}>Limpar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


export default Settings

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1,
        alignItems: 'center',
        gap: 24
    },
    title: {
        fontSize: 18,
        fontFamily: 'Inter_400Regular',
        color: '#3D3D3D',
    },
    subtitle: {
        fontSize: 14,
        fontWeight: 700
    },
    optionsSettings: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    button: {
        width: '25%',
        height: 38,
        borderWidth: .5,
        borderRadius: 10,
        backgroundColor: '#ced4da',
        borderColor: 'black',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',       
        color: '#fff'
    },
    buttonText: {
        color: 'black',
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
    }
})