import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import ExternalLinkCard from "@/components/ExternalLinkCard";
import HelpCard from "@/components/HelpCard";
import { Text, StyleSheet, ScrollView, View } from "react-native";

export default function RegulationsLink() {
    return(
        <CustomSafeAreaView>
            <ScrollView style={styles.container}>
                <Text style={styles.header}>항공사 공식 사이트 바로가기</Text>
                <HelpCard
                    title = '공식 사이트에서 더 많은 규정을 확인 할 수 있어요'
                    description= {
                        '• 수하물 규정은 보통 국가/항공사 별로 다르기 때문에 참고해서 확인해주세요\n'+
                        '• 가방 별 무게 제한이나 추가 수하물 요금 정보도 확인 가능해요'
                    }
                />
                <View style={styles.linkContainer}>
                    <Text style={styles.linkTitle}>
                        대한민국
                    </Text>
                    <ExternalLinkCard
                    title="대한항공 홈페이지"
                    url="https://www.koreanair.com/contents/plan-your-travel/baggage"
                    />
                    <ExternalLinkCard
                        title="아시아나항공 홈페이지"
                        url="https://m.flyasiana.com/C/KR/KO/contents/user-guide"
                    />
                    <ExternalLinkCard
                        title="티웨이항공 홈페이지"
                        url="https://m.twayair.com/app/serviceInfo/contents/148"
                    />            
                    <ExternalLinkCard
                        title="제주항공 홈페이지"
                        url="https://www.jejuair.net/ko/linkService/boardingProcessGuide/baggageGuide.do"
                    />
                    <ExternalLinkCard
                        title="진에어 홈페이지"
                        url="https://www.jinair.com/ready/carryBaggage"
                    />
                </View>
                <View style={styles.linkContainer}>
                    <Text style={styles.linkTitle}>
                        일본
                    </Text>
                    <ExternalLinkCard
                    title="All Nippon Airways 홈페이지"
                    url="https://www.ana.co.jp/ja/jp/guide/boarding-procedures/baggage/domestic/"
                    />
                    <ExternalLinkCard
                        title="Japan Airlines 홈페이지"
                        url="https://www.jal.co.jp/jp/ja/inter/baggage/"
                    />
                </View>
            </ScrollView>
        </CustomSafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white', padding: 20 },
    header: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
    linkContainer: { padding: 5, marginBottom: 5 },
    linkTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 12
    }
})