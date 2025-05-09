import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function SettingsScreen() {
    return (
        <ScrollView style={styles.container}>
        <Text style={styles.header}>Settings</Text>
        
        <Text style={styles.description}>곧 서비스가 제공될 예정입니다</Text>
        <Text style={styles.sectionTitle}>Language Setting</Text>
        <View style={styles.chipRow}>
            <Text style={styles.chip}>한국어</Text>
            <Text style={styles.chip}>English</Text>
            <Text style={styles.chip}>日本語</Text>
        </View>

        <Text style={styles.sectionTitle}>개인정보 처리방침 & 고객지원</Text>

        <View style={styles.card}>
            <View style={styles.iconPlaceholder} />
            <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>개인정보 처리방침</Text>
            <Text style={styles.cardDesc}>
                사용자 데이터가 어떻게 처리되고 보호되는지에 대한 정보 확인은 여기서
            </Text>
            </View>
        </View>

        <View style={styles.card}>
            <View style={styles.iconPlaceholder} />
            <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>피드백 및 문의</Text>
            <Text style={styles.cardDesc}>
                물품 인식에 관한 피드백이나 문의는 여기서
            </Text>
            </View>
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white', padding: 20 },
    header: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
    description: { fontSize: 15, color: '#555', marginBottom: 20 },
    sectionTitle: { fontWeight: '600', marginTop: 20, marginBottom: 10 },
    chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    chip: {
        backgroundColor: '#f1f1f1',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
        marginRight: 8,
        marginBottom: 8,
        fontSize: 14,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: '#eee',
        gap: 10,
    },
    iconPlaceholder: {
        width: 48,
        height: 48,
        backgroundColor: '#ddd',
        borderRadius: 8,
    },
    cardTitle: {
        fontWeight: '600',
        marginBottom: 4,
    },
    cardDesc: {
        color: '#555',
        fontSize: 13,
    },
});
