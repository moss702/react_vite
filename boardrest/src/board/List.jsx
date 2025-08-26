import React, {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function List(props){
  const [list, setList] = useState(null);

  // list 컴포넌트가 생성될때 한번만 호출하도록 하기위해 useEffect 로 감싸준다!
  useEffect(() => {
    axios.get('/boardrest/list')
        .then((res) => {
          console.log("data", res.data);// res : 리스폰스엔티티로 들어오는 값
          setList(res.data);
        })
        .catch((e) => {
          console.log("에러! : ", e);
        });
  }, []);

  return (
      <table className="table">
        <thead>
          <tr>
            <th>글번호</th>
            <th>제목</th>
            <th>작성자</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(list?.list) && list.list.map((dto) => {
            return <tr>
              <td>{dto.bno}</td>
              <td>{dto.title}</td>
              <td>{dto.writerName}</td>
            </tr>
          })}
        </tbody>
      </table>
  );
}