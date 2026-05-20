import { useState, useEffect } from 'react';

function App() {
  // 상태(State) 정의: 화면을 다시 그려야 하는 가변 데이터들
  const [todos, setTodos] = useState([]); // 할 일 목록 배열
  const [inputValue, setInputValue] = useState(''); // 입력창의 텍스트

  const API_URL = 'http://localhost:5000/api/todos';

  // [조회] 컴포넌트가 처음 화면에 켜질 때(Mount) 서버에서 데이터를 가져옵니다.
  useEffect(() => {
    fetchTodos();
  }, []);

  // [조회 함수] 서버에 GET 요청을 보내 데이터를 받아옴
  const fetchTodos = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json(); // 응답을 JSON 형태로 변환
      setTodos(data); // 받아온 데이터로 상태 업데이트 -> 화면이 자동으로 다시 그려짐
    } catch (error) {
      console.error('데이터를 가져오는데 실패했습니다:', error);
    }
  };

  // [추가 함수] 서버에 POST 요청을 보냄
  const handleAddTodo = async (e) => {
    e.preventDefault(); // submit 이벤트의 페이지 새로고침 방지
    if (!inputValue.trim()) return; // 빈 입력값 차단

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputValue }) // 객체를 JSON 문자열로 변환하여 전송
      });

      if (response.ok) {
        setInputValue(''); // 입력창 비우기
        fetchTodos(); // 최신 목록을 반영하기 위해 서버에서 다시 조회
      }
    } catch (error) {
      console.error('추가 실패:', error);
    }
  };

  // [토글/수정 함수] 서버에 PUT 요청을 보내 상태를 변경
  const handleToggleTodo = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT'
      });

      if (response.ok) {
        fetchTodos(); // 변경된 상태 반영을 위해 다시 조회
      }
    } catch (error) {
      console.error('상태 변경 실패:', error);
    }
  };

  // [삭제 함수] 서버에 DELETE 요청을 보냄
  const handleDeleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchTodos(); // 삭제된 후의 상태 반영을 위해 다시 조회
      }
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  };

  // 화면 UI 렌더링
  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>📝 나의 TodoList</h2>
      
      {/* 입력 폼 */}
      <form onSubmit={handleAddTodo} style={{ display: 'flex', marginBottom: '20px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} // 사용자가 타이핑할 때마다 상태 업데이트
          placeholder="할 일을 입력하세요..."
          style={{ flexGrow: 1, padding: '8px', marginRight: '5px' }}
        />
        <button type="submit" style={{ padding: '8px 15px' }}>추가</button>
      </form>

      {/* 목록 출력 */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id} // 리스트 형태의 원소에는 반드시 고유의 key가 필요합니다
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px',
              borderBottom: '1px solid #eee',
            }}
          >
            {/* 할 일 텍스트 클릭 시 완료 상태 토글 */}
            <span
              onClick={() => handleToggleTodo(todo.id)}
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none', // 완료 시 취소선 표시
                color: todo.completed ? '#aaa' : '#000',
                cursor: 'pointer',
                flexGrow: 1
              }}
            >
              {todo.text}
            </span>
            
            {/* 삭제 버튼 */}
            <button 
              onClick={() => handleDeleteTodo(todo.id)}
              style={{ background: '#ff8484', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
      
      {todos.length === 0 && <p style={{ color: '#e06161', textAlign: 'center' }}>할 일이 없습니다. 새로 등록해보세요!</p>}
    </div>
  );
}

export default App;