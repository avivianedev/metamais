import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { getData } from "../../controllers/productsController";
import { useEffect, useState } from "react";
import { Product } from "../../models/Product";
import { getFormattedDateTime } from "../../utils/format/formatDate";
import { formatCurrencyInput } from "../../utils/format/formatCurrency";



const History = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [activeProductId, setActiveProductId] = useState<string | null>(null);

    const produtosAlterados = products.filter(item => item.created || item.updated)
    const fetchData = async () => {
        const result = await getData();
        setProducts(result.sort());

    };

    useEffect(() => {
        fetchData()
    }, [products])

    const toggleDetails = (id: string) => {
        setActiveProductId(prevId => (prevId === id ? null : id));

    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Histórico de Atividades</Text>


            <FlatList

                data={produtosAlterados}
                style={styles.listContainer}
                contentContainerStyle={{
                    paddingBottom: 100,
                    paddingHorizontal: 16,
                    paddingTop: 16,
                }}
                renderItem={({ item }) => {
                    const isExpanded = activeProductId === item.id
                    const actionLabel = item.created ? 'Produto Adicionado' : "Produto Atualizado"
                    const date = item.created ?? item.updated;

                    return (
                        <View style={styles.activityCardContainer}>
                            <View style={styles.activityCard}>
                                <View style={styles.activityHeader}>
                                    <Text style={styles.textLabel}>{actionLabel} </Text>
                                    <Text>{item.name}</Text>
                                </View>
                                <View style={styles.activityHeader}>
                                    <Text style={styles.textLabel}>Data</Text>
                                    <Text>{date && getFormattedDateTime(new Date(date))}</Text>
                                </View>

                                {isExpanded && (
                                    <View style={styles.activityDetails}>
                                        <View style={styles.detailsContainer}>
                                            <Text style={styles.textLabel}>Segmento</Text>
                                            <Text>{item.segment}</Text>
                                        </View>
                                        <View style={styles.detailsContainer}>
                                            <Text style={styles.textLabel}>Meta</Text>
                                            <Text>{formatCurrencyInput(item.goal)}</Text>
                                        </View>

                                    </View>
                                )}

                                <TouchableOpacity onPress={() => toggleDetails(item.id)}>
                                    <Text>{isExpanded ? "Ver menos" : "Ver mais"}</Text>

                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }}

            />









        </View>
    )
}


export default History


const styles = StyleSheet.create({
    container: {
        padding: 24,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        gap: 10,
        flex: 1
    },
    listContainer: {
        width: '100%',
        marginTop: 10
    },

    title: {
        fontSize: 20,
        fontFamily: 'Inter_400Regular',        
        fontWeight: '700',
        color: '#5A31F4'

    },
    activityCardContainer: {
        width: '100%',
        marginBottom: 12,
    },

    activityCard: {
        width: '100%',
        padding: 8,
        borderWidth: .8,
        borderRadius: 10,
    },
    textLabel: {
        fontWeight: 800,
        fontFamily: 'Inter_400Regular',
        color: '#3D3D3D',
    },
    activityHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    activityDetails: {

    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
}
)