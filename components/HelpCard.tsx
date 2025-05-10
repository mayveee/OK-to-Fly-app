import { View, Text, StyleSheet } from 'react-native';

interface InfoCardProps {
    title: string;
    description: string;
}

export default function HelpCard({ title, description }: InfoCardProps) {
    return (
        <View style={styles.topcard}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDesc}>{description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    topcard: {
        marginBottom: 10,
        backgroundColor: '#f1f5f9',
        padding: 16,
        borderRadius: 12,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 4,
    },
    cardDesc: {
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
    },
});
