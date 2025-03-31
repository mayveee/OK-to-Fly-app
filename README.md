## 물건 찍으면 기내 반입 금지 물품 알려주는 서비스
+ app
1. 사진찍거나 앨범에서 업로드
2. base64Image 형태로 이미지 전송
3. 서버에서 라벨과 메시지 던져주면 출력

### install package
```
npm install
```
### run dev
```
npx expo start
```

#### 스택

| 분야             | 사용 기술                                     |
|------------------|-----------------------------------------------|
| **앱 프레임워크** | React Native                                  |
| **런타임 환경**   | Expo                                           |
| **언어**          | JavaScript                                     |
| **라우팅**        | expo-router (Tabs 기반)                      |
| **이미지 처리**   | expo-image-picker (갤러리, 카메라)            |
| **API 통신**      | Axios (`POST` 방식, base64 이미지 전송)        |
| **기기 테스트**   | 실기기(USB or QR 코드) 테스트                 |
