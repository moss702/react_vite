import React from "react";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom"; // 비로그인시 로그인페이지로 보내기위해서 사용
import {decode} from "base-64";
import axios from "axios";


export default function List(props) {
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  let email = "";
  let token = "";

  useEffect(() => {
    // 로컬 스토리지에 있는 토큰값 가져오기
    // 로그인 데이터는 로컬/세션 둘 중 하나의 스토리지에 저장
    token = localStorage.getItem("token");

    if(token) {
      console.log(token);
      const tokenParts = token.split('.');
      const payload = tokenParts[1];
      const decodedPayload = decode(payload)
      const payloadObj = JSON.parse(decodedPayload);

      email = payloadObj.sub;

      console.log(email);
      console.log(token);

      if (email === "") { // 이메일이 없을때 로그인 페이지로 이동
        navigate("/");
      }
    }
    else { // 토큰이 없을때 로그인 페이지로 이동
      navigate("/");
    }
  }, [])

  useEffect(() => {
      axios.get(`http://localhost:8080/notes/all?email=${email}`, {
        headers: {
          // 인증 토큰을 함께 전달
          'Authorization': `Bearer ${token}`,
        }
      })
          .then(res => {
            console.log(res.data);
            setList(res.data);
          })
          .catch(e => {
            console.log("e : ", e);
          })
  }, []);

  return (
      <div>
        <table>

          <thead>
            <tr>
              <th>글번호</th>
              <th>글제목</th>
              <th>작성자</th>
            </tr>
          </thead>

          <tbody>
          {list.map((item) => (
              <tr key={item.num} onClick={() => navigate(`/read/${item.num}`)} style={{cursor:"pointer"}}>
                <td> {item.num}</td>
                <td> {item.title}</td>
                <td> {item.writerEmail}</td>
              </tr>
          ))}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan="3">
                <button onClick={() => navigate("/register")}>글작성</button>
              </td>
            </tr>
          </tfoot>

        </table>
      </div>
  );
}
