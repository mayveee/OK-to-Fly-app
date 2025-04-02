import React, { useState } from 'react';
import { View, Button, Image, Text, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function UploadScreen() {
    const [base64Data, setBase64Data] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [imageUri, setImageUri] = useState<string | null>(null);

    const [labels, setLabels] = useState<string[]>([]);
    const [objectNames, setObjectNames] = useState<string[]>([]);
    const [forbiddenItems1, setForbiddenItems1] = useState<string[]>([]);
    const [cautionItems1, setCautionItems1] = useState<string[]>([]);
    const [forbiddenItems2, setForbiddenItems2] = useState<string[]>([]);
    const [cautionItems2, setCautionItems2] = useState<string[]>([]);
    const [message1, setMessage1] = useState<string>('');
    const [message2, setMessage2] = useState<string>('');

    /**
     * 이미지 파일에서 고르는 기능
     */
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            quality: 0.9,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
            setBase64Data(result.assets[0].base64!);
            setLabels([]);
        }
    };

    /**
     * 촬영하는 기능
     */
    const takePhoto = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
            alert('카메라 접근 권한이 필요합니다!');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            base64: true,
            quality: 0.9,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
            setBase64Data(result.assets[0].base64!);
            setLabels([]);
        }
    };

    /**
     * 이미지 분석하기 버튼
     * 서버 호출하고 결과 받아와서 변수에 넣음
     */
    const analyzeImage = async () => {
        if (!base64Data) return;
        setLoading(true);
        try {
            const res = await axios.post('https://ok-to-fly-server.onrender.com/test-vision', {
                image: base64Data,
            });
            const {
                labels,
                objectNames,
                forbiddenItems1,
                cautionItems1,
                forbiddenItems2,
                cautionItems2,
                message1,
                message2,
            } = res.data;
            setLabels(labels);
            setObjectNames(objectNames);
            setForbiddenItems1(forbiddenItems1);
            setCautionItems1(cautionItems1);
            setForbiddenItems2(forbiddenItems2);
            setCautionItems2(cautionItems2);
            setMessage1(message1);
            setMessage2(message2);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ paddingVertical:100, paddingHorizontal: 20, backgroundColor: '#f9fafb', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>기내 반입 물품 분석</Text>

            <TouchableOpacity
                onPress={pickImage}
                style={{
                    backgroundColor: '#e5e7eb',
                    paddingVertical: 12,
                    paddingHorizontal: 20,
                    borderRadius: 999,
                    marginBottom: 10,
                }}
            >
                <Text style={{ fontWeight: '600' }}>🖼️ 이미지 선택하기</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={takePhoto}
                style={{
                    backgroundColor: '#e5e7eb',
                    paddingVertical: 12,
                    paddingHorizontal: 20,
                    borderRadius: 999,
                    marginBottom: 20,
                }}
            >
                <Text style={{ fontWeight: '600' }}>📷 사진 촬영하기</Text>
            </TouchableOpacity>

            {imageUri && (
                <>
                    <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, borderRadius: 16, marginBottom: 20 }} />
                    <TouchableOpacity
                        onPress={analyzeImage}
                        style={{
                            backgroundColor: '#111827',
                            paddingVertical: 12,
                            paddingHorizontal: 20,
                            borderRadius: 999,
                        }}
                    >
                        <Text style={{ color: 'white', fontWeight: '600' }}>분석 요청하기</Text>
                    </TouchableOpacity>
                </>
            )}

            {loading && <ActivityIndicator style={{ marginTop: 30 }} size="large" color="#4B5563" />}

            {labels.length > 0 && (
                <View style={{ marginTop: 30, width: '100%', backgroundColor: '#fff', padding: 20, borderRadius: 12 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>🔹 Label 기반 분석 결과 (1)</Text>
                    <Text>분석 결과: {labels.join(', ') || '없음'}</Text>
                    <Text>❌ 금지 물품: {forbiddenItems1.join(', ') || '없음'}</Text>
                    <Text>⚠️ 주의 물품: {cautionItems1.join(', ') || '없음'}</Text>
                    <Text style={{ marginTop: 4 }}>{message1}</Text>

                    <View style={{ height: 20 }} />

                    <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>🔸 Object 기반 분석 결과 (2)</Text>
                    <Text>분석 결과: {objectNames.join(', ') || '없음'}</Text>
                    <Text>❌ 금지 물품: {forbiddenItems2.join(', ') || '없음'}</Text>
                    <Text>⚠️ 주의 물품: {cautionItems2.join(', ') || '없음'}</Text>
                    <Text style={{ marginTop: 4 }}>{message2}</Text>
                </View>
            )}
        </ScrollView>
    );
}
