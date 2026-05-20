const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// 미들웨어 설정
app.use(cors()); // 프론트엔드(5173포트)에서 백엔드(5000포트)로 안전하게 요청을 보낼 수 있게 허용 (CORS 에러 방지)
app.use(express.json()); // 프론트엔드가 JSON 형식으로 보낸 데이터를 body로 읽을 수 있게 함

// 데이터베이스 대신 사용할 메모리 배열 (서버를 재시작하면 초기화됩니다)
let todos = [
  { id: 1, text: 'Vite + React로 프론트 구축하기', completed: false },
  { id: 2, text: 'Node.js + Express로 서버 만들기', completed: false }
];

// 1. 목록 조회 (Read)
app.get('/api/todos', (req, res) => {
  // 현재 저장된 모든 할 일 목록을 JSON 형태로 응답합니다.
  res.json(todos);
});

// 2. 항목 추가 (Create)
app.post('/api/todos', (req, res) => {
  const { text } = req.body; // 프론트에서 보낸 text 데이터 추출
  
  if (!text) {
    return res.status(400).json({ message: '할 일 내용을 입력해주세요.' });
  }

  // 새로운 할 일 객체 생성
  const newTodo = {
    id: Date.now(), // 고유한 ID를 생성하기 위해 현재 시간을 타임스탬프 숫자로 활용
    text: text,
    completed: false // 처음 생성 시에는 완료되지 않은 상태
  };

  todos.push(newTodo); // 배열에 추가
  res.status(201).json(newTodo); // 생성된 데이터를 성공 상태코드(201)와 함께 응답
});

// 3. 완료 상태 변경 (Update)
app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params; // URL 경로에 포함된 id 값 추출 (예: /api/todos/1 -> id는 "1")
  
  // 배열을 순회하며 id가 일치하는 항목의 completed 상태를 반전(!)시킴
  todos = todos.map(todo => 
    todo.id === parseInt(id) ? { ...todo, completed: !todo.completed } : todo
  );

  res.json({ message: '상태가 업데이트되었습니다.' });
});

// 4. 항목 삭제 (Delete)
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  
  // 해당 id를 제외한 나머지 항목들로만 배열을 다시 구성 (필터링)
  todos = todos.filter(todo => todo.id !== parseInt(id));

  res.json({ message: '삭제 완료되었습니다.' });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`백엔드 서버가 http://localhost:${PORT}/api/todos 에서 달리고 있습니다!`);
});