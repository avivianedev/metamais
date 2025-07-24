import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { clearAllProducts } from "../../controllers/productsController"
import { useApp } from "../../context/AppContext"
import { formatSize, getAsyncStorageSize } from "../../utils/asyncStorage"
import { storeUser } from "../../utils/asyncStorageUser"
import { useEffect, useState } from "react"

const Settings = () => {

    
    const { userName, setUsername } = useApp()
    const [nameInput, setNameInput] = useState('');
    const [totalStorage, setTotalStorage] = useState<string>('...');       

    const saveUserName = async () => {

        storeUser(nameInput)
        setUsername(nameInput)
    }

    useEffect(() => {
        setNameInput(userName)
        const formatedBytes = async () => {
        const bytesTotal = await getAsyncStorageSize()
        const formatted = formatSize(bytesTotal);
        setTotalStorage(formatted);
    }
    formatedBytes();
    }, []) 
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Configurações</Text>

            <View style={styles.optionsSettings}>
                <Text style={styles.subtitle}>Total Armazenado</Text>
                <Text style={styles.subtitle}>{totalStorage}</Text>
            </View>
            <View style={styles.optionsSettings}>
                <Text style={styles.subtitle}>Limpar dados</Text>
                <TouchableOpacity style={styles.button} onPress={clearAllProducts}>
                    <Text style={styles.buttonText}>Limpar</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.optionsSettings}>
                <Text style={styles.subtitle}>Nome</Text>
                <TextInput style={styles.input}                    
                    onChangeText={setNameInput}
                    value={nameInput}
                    autoFocus={true}
                    
                ></TextInput>

                <TouchableOpacity style={styles.button} onPress={saveUserName}>
                    <Text style={styles.buttonText}>Salvar</Text>
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
    input: {
        width: '50%',
        //backgroundColor: '#ced4da',
        borderColor: 'black',
        borderWidth: .5,
        borderRadius: .8,
        alignItems: 'center',
        paddingLeft: 10,
        height: 38,



    },
    button: {
        width: '25%',
        height: 28,
        borderWidth: .5,
        borderRadius: .8,
        backgroundColor: '#ced4da',
        borderColor: 'black',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',

    },
    buttonText: {
        color: 'black',
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
    }
})