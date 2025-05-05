import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useResult } from '../../context/ResultContext';

export default function Home() {
    const router = useRouter();
    const { setResult } = useResult();

    const [imageUri, setImageUri] = useState<string | null>(null);
    const [base64Data, setBase64Data] = useState<string | null>(null);

    const takePhoto = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
        Alert.alert('카메라 권한이 필요합니다.');
        return;
        }

        const result = await ImagePicker.launchCameraAsync({ base64: true });
        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
            setBase64Data(`data:image/jpeg;base64,${result.assets[0].base64}`);
        }
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({ base64: true });
        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
            setBase64Data(`data:image/jpeg;base64,${result.assets[0].base64}`);
        }
    };

    const analyzeImage = async () => {
        if (!base64Data) {
        Alert.alert('이미지를 먼저 선택하세요.');
        return;
        }

        try {
            const response = await axios.post('https://ok-to-fly-server-python.onrender.com/analysis', {
            image: base64Data,
            });
            console.log('✅ 서버 응답 (깊이까지):', JSON.stringify(response.data, null, 2));
            const { detected_items } = response.data;
            setResult({
                detectedItems: detected_items,
                imageUri: imageUri ?? undefined,
            });
            router.push('/result');
        } catch (err) {
            console.error(err);
            Alert.alert('서버 요청 실패', '분석 중 오류가 발생했습니다.');
        }
    };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
            <Text style={styles.title}>Flycheck</Text>

            <TouchableOpacity style={styles.button} onPress={takePhoto}>
                <Text style={styles.buttonText}>Take a photo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text style={styles.buttonText}>Load from Gallery</Text>
            </TouchableOpacity>

            <View style={styles.thumbnail}>
                {imageUri ? (
                    <Image
                    source={{ uri: imageUri }}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="contain"
                    />
                ) : (
                    <Text style={styles.thumbnailText}>이미지를 선택해주세요</Text>
                )}
            </View>

            <TouchableOpacity style={styles.analysisButton} onPress={analyzeImage}>
                <Text style={styles.analysisText}>Analysis</Text>
            </TouchableOpacity>

            <Text style={styles.subTitle}>Recent Recognized Items</Text>

            <View style={styles.itemRow}>
                <Text style={styles.dateOnly}>June 12, 2021</Text>
            </View>
            <View style={styles.itemRow}>
                <Text style={styles.dateOnly}>June 10, 2021</Text>
            </View>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: 'white', flex: 1 },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
    button: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 6,
        paddingVertical: 12,
        marginBottom: 10,
        alignItems: 'center',
    },
    scrollContainer: {
        backgroundColor: 'white',
        paddingBottom: 80,
        flexGrow: 1,
    },
    buttonText: { fontWeight: '500' },
    imageBox: { marginTop: 20, marginBottom: 20 },
    label: { fontSize: 12, marginBottom: 5 },
    thumbnail: {
        backgroundColor: '#eee',
        height: 520,
        borderWidth: 1,
        borderColor: '#999',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: 8,
        paddingLeft: 5,
        paddingRight: 5
    },
    thumbnailText: { color: '#333' },
    analysisButton: {
        marginTop: 10,
        backgroundColor: 'black',
        borderRadius: 6,
        paddingVertical: 12,
        alignItems: 'center',
        marginBottom: 30,
    },
    analysisText: { color: 'white', fontWeight: '600' },
    subTitle: { fontWeight: '600', marginBottom: 10 },
    itemRow: { marginBottom: 10 },
    dateOnly: { fontSize: 14, color: '#333' },
});
