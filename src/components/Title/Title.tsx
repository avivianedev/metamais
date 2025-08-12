import { StyleSheet, Text } from "react-native"
import { useApp } from "../../context/AppContext";
import { purpleTheme, redTheme } from "../../context/theme";

type TitleProps = {
    title: string,
}

export const Title = ({ title }: TitleProps) => {

    const { buttonSecondaryColor } = useApp();
    const labelColor = buttonSecondaryColor ? redTheme : purpleTheme;

    return (
        <Text style={[styles.title, { color: labelColor.colors.text.primary }]}>{title}</Text>
    )

}


const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontFamily: 'Inter_400Regular',
        fontWeight: '700',
    }
})