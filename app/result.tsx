import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { Stack } from 'expo-router';
import { useResult } from '../context/ResultContext';

export default function Result() {
  const { result } = useResult();
  const { detectedItems, imageUri } = result;
  const hasDangerousItems = detectedItems.length > 0;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Stack.Screen 
        options={{ 
            title: 'AI 분석 결과',
            headerBackTitle: '홈'
            }} 
        />

        <View style={styles.imageBox}>
            {imageUri ? (
                <Image
                source={{ uri: imageUri }}
                style={styles.image}
                resizeMode="cover"
                />
            ) : (
                <Text>이미지를 불러올 수 없습니다</Text>
            )}
        </View>

        <Text style={styles.sectionTitle}>Regulation Information</Text>

        {hasDangerousItems ? (
          detectedItems.map((item, index) => (
            <View key={index} style={styles.regulationBox}>
              <View style={{ flex: 1 }}>
                <Text style={styles.guidelineTitle}>{item.name}</Text>
                <Text style={styles.guidelineDesc}>
                  기내 반입: {item.rule.allowed_in_cabin ? '가능 ✅' : '불가 ❌'}
                </Text>
                <Text style={styles.guidelineDesc}>
                  위탁 수하물: {item.rule.allowed_in_checked ? '가능 ✅' : '불가 ❌'}
                </Text>
                <Text style={styles.guidelineDesc}>{item.description}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={{ color: '#10b981', fontWeight: '500' }}>
            반입 금지 물품이 없습니다 ✅
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    backgroundColor: 'white',
    flexGrow: 1,
  },
  container: { flex: 1 },
  imageBox: {
    width: '100%',
    height: 500,
    backgroundColor: '#eee',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 30,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  sectionTitle: { fontWeight: 'bold', marginBottom: 10 },
  regulationBox: {
    marginBottom: 20,
  },
  guidelineTitle: { fontWeight: '600', fontSize: 15, marginBottom: 4 },
  guidelineDesc: { color: '#444', fontSize: 13, marginBottom: 2 },
});
