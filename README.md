# React + Vite + Zustand / Nodejs + Express
## 프론트에서 구글 로그인 후 백에서 검증
### .env
/api/.env
```
SESSION_SECRET="누구도 알 수 없는 나만의 무언가"
NODE_ENV="development" // 배포 시 production 으로 수정 필요

PORT="3000" // 서버가 열릴 포트

ORIGIN="https://timetable.seongjinemong.app" // 배포 시 서버의 주소 (개발 단계에선 불필요)
```
/react/.env
```
VITE_NODE_ENV="development" // 배포 시 production 으로 수정 필요

VITE_GOOGLE_CLIENT_ID="구글 클라우드에서 발급받은 클라이언트 ID"

VITE_SERVER_URL="https://timetableapi.seongjinemong.app" // 배포 시 웹 서버 주소 (개발 단계에선 불필요)
```