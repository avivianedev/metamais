import { StyleSheet, Text, View } from "react-native"
import { Inter_400Regular } from '@expo-google-fonts/inter';



const Card = ({isLarge, title, percent, value, missing} : any) => {

    

    return (
        <View style={[isLarge ? styles.largeCard : styles.smallCard]}>
            <View style={styles.cardHeader}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.title}>% {percent}</Text>
            </View>
            <Text style={styles.value}>{value}</Text>
            <Text style={styles.missing}>Falta: {missing}</Text>
        </View>
    )
}


export default Card
const styles = StyleSheet.create({

    
    largeCard: {
        padding: 10,
        width: '100%',
        height: 100,
        borderRadius: 16,
        //opacity: .5,
        borderColor: '#003459',
        //backgroundColor: "#8E7EFF",
        //backgroundColor: '#E5E6F0',
        borderWidth: .8,
        marginBottom: 16


    },
    smallCard: {
        width: '48%',
        height: 100,
        borderRadius: 10,
        opacity: .5,
        borderColor: 'white',
        backgroundColor: 'rgba(142, 126, 255, .8)',
        borderWidth: .5,
        padding: 10
    },
    cardHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 18,
        fontFamily: 'Inter_400Regular',
        color: '#3D3D3D',
    },

    value: {
        fontFamily: 'Inter_400Regular',
        color: '#3D3D3D',
        fontSize: 24,
        fontWeight: 700,

    },
    missing: {
        fontSize: 12,
        fontFamily: 'Inter_400Regular',
        color: '#003459'
    }
})