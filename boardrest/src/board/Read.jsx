import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import axios from "axios"; // 주소의 쿼리를 가져오기 위해 필요

export default function Read(props){
  const [dto, setDto] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    console.log(location);
    console.log(queryParams.toString());

    // 쿼리스트링에서 bno값 가져오기
    const bno = queryParams.get('bno');

    axios.get(`/boardrest/read?${queryParams.toString()}`)
        .then((res) => {
          console.log("data", res.data);// res : 리스폰스엔티티로 들어오는 값
        })
        .catch((e) => {
          console.log("에러! : ", e);
        });
  }, []);

  return (
    <div>
      {/*<h3>{dto.bno} | {dto.title}</h3>*/}
      {/*<p>{dto.writerName}</p>*/}
      {/*<p>{dto.content}</p>*/}
    </div>
  );
}