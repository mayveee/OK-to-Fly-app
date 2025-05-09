import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ScrollView, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useResult } from '../../context/ResultContext';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function Upload() {
    const router = useRouter();
    const { result, setResult } = useResult();
    const hasPreviousResult = result.detectedItems.length > 0;

    const [isLoading, setIsLoading] = useState(false);
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
            setIsLoading(true);
            const response = await axios.post('https://ok-to-fly-server-python.onrender.com/analysis', {
            image: base64Data,
            });
            console.log('서버 응답:', JSON.stringify(response.data, null, 2));
            const { detected_items } = response.data;
            setResult({
                detectedItems: detected_items,
                imageUri: imageUri ?? undefined,
            });
            router.push('/result');
        } catch (err) {
            console.error(err);
            Alert.alert('서버 요청 실패', '분석 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <>
        {isLoading && (
        <View style={styles.loadingOverlay}>
            <View style={styles.loadingPopup}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>분석 요청 중입니다...</Text>
            </View>
        </View>
        )}
    <ScrollView style={styles.container}>
        <View style={styles.cardRow}>
            <TouchableOpacity style={styles.card} onPress={takePhoto}>
                <IconSymbol name="camera.fill" size={32} color="#333" />
                <Text style={styles.cardText}>사진 촬영하기</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={pickImage}>
                <IconSymbol name="photo.fill" size={32} color="#333" />
                <Text style={styles.cardText}>앨범에서 선택하기</Text>
            </TouchableOpacity>
        </View>
        {imageUri ?(
            <>
            <View style={styles.thumbnail}>
                {imageUri ? (
                    <Image
                    source={{ uri: imageUri }}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="contain"
                    />
                ) : (
                    <Text style={styles.thumbnailText}>이미지를 업로드해주세요</Text>
                )}
            </View>

            <TouchableOpacity
                style={[styles.analysisButton, isLoading && styles.disabledButton]}
                onPress={analyzeImage}
                disabled={isLoading}
                >
                <Text style={styles.analysisText}>
                    {isLoading ? '분석 중...' : '분석 요청'}
                </Text>
            </TouchableOpacity>
            </>
        ) : (
            <View style={styles.topcard}>
                <Text style={styles.cardTitle}>짐을 촬영해주세요</Text>
                <Text style={styles.cardDesc}>
                    짐 전체가 나와도 괜찮아요! 다양한 물품을 한 번에 분석할 수 있어요.
                </Text>
            </View>
        )}

        {hasPreviousResult && (
            <TouchableOpacity
                style={styles.recentButton}
                onPress={() => router.push('/result')}
            >
                <Text style={styles.recentButtonText}>최근 인식 결과 보기 →</Text>
            </TouchableOpacity>
        )}
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 50, 
        backgroundColor: 'white', 
        flex: 1 
    },
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
    cardRow: {
        flexDirection: 'row',
        gap: 12,
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    card: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        paddingVertical: 20,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,            
        borderColor: '#ccc',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    cardText: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    
    imageBox: { marginTop: 20, marginBottom: 20, borderColor: '#ccc'},
    label: { fontSize: 12, marginBottom: 5 },
    thumbnail: {
        backgroundColor: '#eee',
        height: 480,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: 8,
        paddingTop: 10,
        paddingBottom: 10,
    },
    thumbnailText: { color: '#333' },
    analysisButton: {
        marginTop: 10,
        backgroundColor: 'black',
        borderRadius: 6,
        paddingVertical: 12,
        alignItems: 'center',
    },
    disabledButton: {
        opacity: 0.5,
    },
    analysisText: { color: 'white', fontWeight: '600' },
    recentButton: {
        marginTop: 10,
        backgroundColor: '#f0f0f0',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderColor: '#ccc',
        alignItems: 'center',
    },
    recentButtonText: {
        fontWeight: '600',
        color: '#333',
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
    loadingPopup: {
        backgroundColor: '#333',
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderRadius: 12,
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        color: '#fff',
        fontSize: 15,
    },      
});
