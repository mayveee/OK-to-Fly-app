import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Feather } from '@expo/vector-icons';

interface LinkCardProps {
    title: string;
    description?: string;
    url: string;
}

function getFavicon(url: string): string {
    try {
        const domain = new URL(url).hostname;
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch (e) {
        return '';
    }
}

export default function ExternalLinkCard({ title, description, url }: LinkCardProps) {
    const handlePress = async () => {
        await WebBrowser.openBrowserAsync(url);
    };
    
    const faviconUrl = getFavicon(url);

    return (
        <Pressable onPress={handlePress} style={({ pressed }) => [
            styles.card,
            pressed && { backgroundColor: '#e2e8f0' }
        ]}>
        <View style={styles.content}>
            {faviconUrl ? (
                <Image source={{ uri: faviconUrl }} style={styles.icon} />
            ) : null }
            <View style={{ flex: 1 }}>
            <Text style={styles.title}>{title}</Text>
            {description && <Text style={styles.description}>{description}</Text>}
            </View>
            <Feather name="external-link" size={20} color="#555" />
        </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        gap : 12,
    },
    icon: {
        width: 24,
        height: 24,
        borderRadius: 6,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
});