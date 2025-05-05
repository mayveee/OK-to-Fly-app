import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function SettingsScreen() {
    return (
        <ScrollView style={styles.container}>
        <Text style={styles.header}>Settings</Text>

        <Text style={styles.sectionTitle}>Language Setting</Text>
        <View style={styles.chipRow}>
            <Text style={styles.chip}>한국어</Text>
            <Text style={styles.chip}>English</Text>
            <Text style={styles.chip}>日本語</Text>
        </View>

        <Text style={styles.sectionTitle}>Privacy Policy and Customer Service</Text>

        <View style={styles.card}>
            <View style={styles.iconPlaceholder} />
            <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Privacy Policy</Text>
            <Text style={styles.cardDesc}>
                Information regarding how user data is handled and protected
            </Text>
            </View>
        </View>

        <View style={styles.card}>
            <View style={styles.iconPlaceholder} />
            <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Feedback & Reports</Text>
            <Text style={styles.cardDesc}>
                Support contact and feedback options are available here.
            </Text>
            </View>
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white', padding: 20 },
    header: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
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
