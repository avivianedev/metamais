import { StyleSheet, Text, TouchableOpacity } from "react-native"

type ButtonSize = 'sm' | 'lg';
type ButtonVariant = 'primary' | 'secondary' | 'third';

type buttonProps = {
    size?: ButtonSize
    variant?: ButtonVariant;
    title: string
    onPress: () => void | Promise<void>;

}

export const ButtonForm = ({ title, onPress, size = 'sm', variant = 'primary' }: buttonProps) => {

    const bgByVariant = {
        primary: '#8D7EFF',
        secondary: '#BF3865',
        third: '#6C5DD3',
    }[variant];

    const textByVariant = {
        primary: '#FFFFFF',
        secondary: '#5A31F4',
        third: '#5A31F4',
    }[variant];

    const sizeStyle =
        size === 'lg'
            ? { width: 250 }
            : { width: 150};

    return (
        <TouchableOpacity style={[styles.button, {backgroundColor: bgByVariant}, sizeStyle]} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    button: {
        width: '35%',
        height: 48,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#8E7EFF',
        borderColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Inter_400Regular',
    },
})