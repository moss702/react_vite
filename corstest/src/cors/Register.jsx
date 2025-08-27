import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";
import {decode} from "base-64";
import {useNavigate} from "react-router-dom";

export default function Register(props) {
  const navigate = useNavigate();

  const [noteDTO, setNoteDTO] = useState({
    title : "",
    content : "",
  });

  // 토큰에서 이메일 추출하는 함수(글 작성자 이메일 추출 목적)
  const getEmailFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const tokenParts = token.split(".");
      const payload = tokenParts[1];
      const decodedPayload = decode(payload);
      const payloadObj = JSON.parse(decodedPayload);
      return payloadObj.sub;
    } catch (e) {
      console.error("토큰 파싱 오류:", e);
      return null;
    }
  };

// 폼 입력시 내용 변경 이벤트
  const handleChange = (e) => {
    const {name, value} = e.target;
    setNoteDTO((prev) => ({
      ...prev, [name] : value
    }));
  };

// 폼 제출 (글 등록) 이벤트
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const email = getEmailFromToken();

    // 냉무 걸러내기
    if (!noteDTO.title.trim() || !noteDTO.content.trim()) {
      alert("제목과 내용을 모두 입력하십쇼.....");
      return;
    }

    if (!email) {
      alert("글 작성을 위해서는 로그인이 필요합니다...");
      navigate("/login");
      return;
    }

    axios.post(`http://localhost:8080/notes/`,  { ...noteDTO, writerEmail: email }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
        .then(res => {
          console.log("게시글 등록됨" + res.data);
          setNoteDTO(res.data);
          navigate("/list");
        })
        .catch(e => {
          console.log("게시글 등록 실패 e : ", e);
        })
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !getEmailFromToken()) {
      navigate("/login");
    } else {
      console.log("로그인 이메일:", getEmailFromToken());
    }
  }, [navigate]);
  //   // 세션 스토리지에 있는 토큰값 가져오기
  //   const token = localStorage.getItem("token");
  //
  //   // JWT에서 많이 쓰는 토큰 : Header, Payload, Signature
  //   console.log(token);
  //
  //   // 비로그인 상태라면 로그인 페이지로 보내버리기.
  //   if (token == null || token === "") {
  //     navigate("/login");
  //   } else { // 토큰을 갖고 파싱처리. 토큰 잘게 쪼개서 변수에 각 담기
  //     const tokenParts = token.split('.');
  //     const payload = tokenParts[1];
  //     const decodedPayload = decode(payload)
  //     const payloadObj = JSON.parse(decodedPayload);
  //
  //     const email = payloadObj.sub;
  //
  //     console.log(email);
  //   }
  // });

  return (
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" onChange={handleChange} placeholder="제목 입력"></input>
        <p></p>
        <textarea name="content" onChange={handleChange} placeholder="내용 입력"></textarea>
        <p></p>
        <p>작성자 : {getEmailFromToken()}</p>
        <button type="submit">등록</button>
      </form>

      // <div>
      //   <form onSubmit={handleSubmit}>
      //     <p>
      //       <input name="title" value={noteDTO.title} onChange={handleChange} />
      //     </p>
      //     <p>
      //       <textarea name="content" value={noteDTO.content} onChange={handleChange} />
      //     </p>
      //     <p>
      //       <input name="writerEmail" value={noteDTO.writerEmail} readOnly />
      //     </p>
      //     <p>
      //       <button>등록</button>
      //     </p>
      //   </form>
      // </div>
  );
}