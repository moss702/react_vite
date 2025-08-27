import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Modify() {
  const { num } = useParams();
  const navigate = useNavigate();
  const [noteDTO, setNoteDTO] = useState({ num: '', title: "", content: "", writerEmail: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get(`http://localhost:8080/notes/${num}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
        .then(res => {
          setNoteDTO(res.data);   // 기존 데이터 불러오기
        })
        .catch(e => console.log("불러오기 실패:", e));
  }, [num]);

  // 수정 내용 반영
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoteDTO(prev => ({ ...prev, [name]: value }));
  };

  // 서버로 수정 데이터를 전송하고 확인
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    // .put (요청을 보낼 URL(어디로), 서버에 보낼 데이터(payload)(무엇을), 추가 설정 객체(config)(어떻게, 옵션))
    axios.put(`http://localhost:8080/notes/${num}`,
        noteDTO,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
    )
        .then(res => {
          console.log(res.data);
          alert(`${num}번 게시글 수정 완료!`);
          navigate(`/read/${num}`);
        })
        .catch(e => console.log("수정 실패:", e));
  };

  return (
      <form onSubmit={handleSubmit}>
        <h3>{noteDTO.num}번 게시글 수정</h3>
        <input
            type="text"
            name="title"
            value={noteDTO.title}
            onChange={handleChange}
            placeholder="제목 입력"
        />
        <p></p>
        <textarea
            name="content"
            value={noteDTO.content}
            onChange={handleChange}
            placeholder="내용 입력"
        />
        <p>작성자: {noteDTO.writerEmail}</p>
        <button type="submit">저장</button>
        <button type="button" onClick={() => navigate(`/read/${num}`)}>취소</button>
      </form>
  );
}
