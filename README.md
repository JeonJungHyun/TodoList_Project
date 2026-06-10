# TodoList

React와 Vite로 만든 프론트엔드와 Node.js Express 백엔드로 구성된 간단한 TodoList 애플리케이션입니다. 할 일을 추가하고, 완료 상태를 변경하고, 삭제할 수 있습니다.

## 주요 기능

- Todo 목록 조회
- 새 Todo 추가
- Todo 완료/미완료 상태 전환
- Todo 삭제
- 프론트엔드와 백엔드 분리 구조

## 기술 스택

### Frontend

- React
- Vite
- JavaScript
- ESLint

### Backend

- Node.js
- Express
- CORS

## 프로젝트 구조

```text
TodoList/
├── backend/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

## 실행 방법

### 1. 백엔드 실행

```bash
cd backend
npm install
node server.js
```

백엔드 서버는 기본적으로 아래 주소에서 실행됩니다.

```text
http://localhost:5000
```

### 2. 프론트엔드 실행

새 터미널을 열고 실행합니다.

```bash
cd frontend
npm install
npm run dev
```

Vite 개발 서버가 표시하는 로컬 주소로 접속하면 앱을 확인할 수 있습니다. 기본 주소는 보통 다음과 같습니다.

```text
http://localhost:5173
```

## API 엔드포인트

| Method | Endpoint | 설명 |
| --- | --- | --- |
| GET | `/api/todos` | Todo 목록 조회 |
| POST | `/api/todos` | 새 Todo 추가 |
| PUT | `/api/todos/:id` | Todo 완료 상태 변경 |
| DELETE | `/api/todos/:id` | Todo 삭제 |

### Todo 추가 요청 예시

```json
{
  "text": "새 할 일"
}
```

## 참고 사항

- 현재 Todo 데이터는 백엔드 서버의 메모리 배열에 저장됩니다.
- 서버를 재시작하면 등록한 Todo 데이터는 초기화됩니다.
- 프론트엔드는 `http://localhost:5000/api/todos`로 백엔드 API를 호출합니다.

## 유용한 명령어

### 프론트엔드 빌드

```bash
cd frontend
npm run build
```

### 프론트엔드 린트

```bash
cd frontend
npm run lint
```
