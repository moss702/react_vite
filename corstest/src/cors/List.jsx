import React from "react";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom"; // 비로그인시 로그인페이지로 보내기위해서 사용
import {decode} from "base-64";
import axios from "axios";


export default function List(props) {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 세션 스토리지에 있는 토큰값 가져오기
    const token = sessionStorage.getItem("token");

    // JWT에서 많이 쓰는 토큰 : Header, Payload, Signature
    console.log(token);

    // 비로그인 상태라면 로그인 페이지로 보내버리기.
    if (token == null || token === "") {
      navigate("/login");
    } else { // 토큰을 갖고 파싱처리. 토큰 잘게 쪼개서 변수에 각 담기
      const tokenParts = token.split('.');
      const payload = tokenParts[1];
      const decodedPayload = decode(payload)
      const payloadObj = JSON.parse(decodedPayload);

      const email = payloadObj.sub;

      console.log(email);

      axios.get(`http://localhost:8080/notes/all?email=${email}`, {
        headers: {
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
    }
  },[]);

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
          {list.map((list) => (
              <tr key={list.num}>
                <td>　{list.num}</td>
                <td>　{list.title}</td>
                <td>　{list.writerEmail}</td>
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
