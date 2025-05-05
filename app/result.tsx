import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { useResult } from '../context/ResultContext';

export default function Result() {
    const { result } = useResult();
    const { detectedItems, imageUri } = result;
    const hasDangerousItems = detectedItems.length > 0;
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggleExpand = (index: number) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    };

    const parseDescription = (desc: string) => {
        const result: { tag: string; text: string }[] = [];
        const blocks = desc.split(/(?=규정:|예외:|특별:)/g);
      
        for (const block of blocks) {
          const match = block.match(/^(규정|예외|특별):(.+)/);
          if (match) {
            const [, tag, text] = match;
            result.push({ tag, text: text.trim() });
          }
        }
      
        return result;
    };

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

        <Text style={styles.sectionTitle}>감지된 주의 물품</Text>

        {hasDangerousItems ? (
          detectedItems.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => toggleExpand(index)} style={styles.itemCard}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemName}>{item.name}</Text>
                <View style={styles.ruleFlags}>
                  <Text style={{ color: item.rule.allowed_in_cabin ? '#10b981' : '#ef4444' }}>
                    {item.rule.allowed_in_cabin ? '✅ 기내 반입 가능' : '❌ 기내 반입 금지'}
                  </Text>
                  <Text style={{ color: item.rule.allowed_in_checked ? '#10b981' : '#ef4444' }}>
                    {item.rule.allowed_in_checked ? '✅ 위탁수하물 가능' : '❌ 위탁수하물 금지'}
                  </Text>
                </View>
              </View>

              {expandedIndex === index ? (
                <View style={styles.descriptionBox}>
                    {parseDescription(item.description).map((entry, i) => (
                    <View key={i} style={{ marginBottom: 6 }}>
                        <Text style={{ fontWeight: '600' }}>
                        {entry.tag === '규정' && '📝 규정'}
                        {entry.tag === '예외' && '⚠️ 예외'}
                        {entry.tag === '특별' && '📌 특별'}
                        </Text>
                        <Text style={styles.description}>{entry.text}</Text>
                    </View>
                    ))}
                </View>
                ) : (
                <View style={styles.summaryWrapper}>
                    <Text style={styles.summary}>
                    {(() => {
                        const parsed = parseDescription(item.description);
                        const counts = { 규정: 0, 예외: 0, 특별: 0 };
                        parsed.forEach(p => counts[p.tag as keyof typeof counts]++);

                        const parts = [];
                        if (counts.규정 > 0) parts.push(`관련 규정 ${counts.규정}`);
                        if (counts.예외 > 0) parts.push(`관련 예외 ${counts.예외}`);
                        if (counts.특별 > 0) parts.push(`관련 특별 ${counts.특별}`);
                        return parts.join(', ');
                    })()}
                    </Text>
                </View>
                )}
            </TouchableOpacity>
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
    sectionTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 12 },
    itemCard: {
        padding: 14,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        marginBottom: 12,
        backgroundColor: '#f9f9f9',
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111',
    },
    ruleFlags: {
        alignItems: 'flex-end',
    },
    description: {
        marginTop: 8,
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
    },
    flagIcon: {
        fontSize: 16,
    },
    descriptionBox: {
        marginTop: 8,
    },
    summary: {
        marginTop: 8,
        fontSize: 13,
        color: '#888',
        fontStyle: 'italic',
    },
    summaryWrapper: {
        alignItems: 'flex-end',
        marginTop: 6,
    },
  });
  
