import React, {useState, useEffect} from "react";
import axios from "axios"; // 서버에서 데이터만 가져올때 사용하는 객체
import {useNavigate} from "react-router-dom";

export default function List(props){
  const [list, setList] = useState(null);
  const navigate = useNavigate();

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
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>글번호</th>
              <th>제목</th>
              <th>작성자</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(list?.list) && list.list.map((dto) => {
              return <tr onClick={((e) => {
                navigate(`/read?bno=${dto.bno}`);
              })} className="clickpoint">
                <td>{dto.bno}</td>
                <td>{dto.title}</td>
                <td>{dto.writerEmail}</td>
              </tr>
            })}
          </tbody>
        </table>
        <button type="button" className="btn btn-primary" onClick={((e) => {
          navigate(`/register`);
        })}>Register</button>
      </div>
  );
}