import React from 'react';
import { ViewStyle, StyleProp } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function CustomSafeAreaView({ children, style }: Props) {
  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: 'white' }, style]}>
      {children}
    </SafeAreaView>
  );
}