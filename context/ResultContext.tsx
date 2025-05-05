import React, { createContext, useContext, useState } from 'react';

// DetectedItem 타입 정의
export type DetectedItem = {
  name: string;
  description: string;
  rule: {
    allowed_in_cabin: boolean;
    allowed_in_checked: boolean;
  };
};

// Context 타입 정의
export type ResultContextType = {
  result: {
    detectedItems: DetectedItem[];
    imageUri?: string;
  };
  setResult: (result: ResultContextType['result']) => void;
};

// Context 생성
const ResultContext = createContext<ResultContextType | undefined>(undefined);

// Provider 구현
export const ResultProvider = ({ children }: { children: React.ReactNode }) => {
  const [result, setResult] = useState<ResultContextType['result']>({
    detectedItems: [],
    imageUri: undefined,
  });

  return (
    <ResultContext.Provider value={{ result, setResult }}>
      {children}
    </ResultContext.Provider>
  );
};

// Custom hook
export const useResult = () => {
  const context = useContext(ResultContext);
  if (!context) {
    throw new Error('useResult must be used within a ResultProvider');
  }
  return context;
};
