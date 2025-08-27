import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom"; // useLocation : 주소창의 값을 가져올때 사용하는 hook
import axios from "axios"; // 주소의 쿼리를 가져오기 위해 필요
import dayjs from "dayjs";

export default function Read(props) {
  const [dto, setDto] = useState({
    bno: '', title : '', content : '', writerEmail : '', modDate : '', regDate : '',
  });
  const location = useLocation();
  const navigate = useNavigate();

  // 날짜 포맷 변경을 위한 함수
  const formatDate = (dataString) => {
    if(!dataString) return '';
    const date = new Date(dataString);
    // 유효한 날짜인지 확인(날짜라면 날짜를 리턴, 아니라면 NaN 리턴)
    if(isNaN(date.getTime())) return '';

    const year = date.getFullYear(); // 년도 4자리 리턴
    const month = String(date.getMonth() + 1).padStart(2, '0'); // js에서 month는 0~11로 리턴되니까 +1 해준다. (padStart : 2자리 숫자 보여주되, 한자리수라면 0으로 채워라)
    const day = String(date.getDate()).padStart(2,'0'); // date는 또 1~31로 리턴됨.
    const hour = String(date.getHours()).padStart(2,'0');
    const min = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hour}:${min}`;
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    console.log(location);
    console.log(queryParams.toString());

    // 쿼리스트링에서 bno값 가져오기
    const bno = queryParams.get('bno');

    axios.get(`/boardrest/read?${queryParams.toString()}`)
        .then((res) => {
          console.log("data", res.data);// res : 리스폰스엔티티로 들어오는 값
          // 댓글을 불러오고 싶다면? 여기두~
          setDto(res.data);
        })
        .catch((e) => {
          console.log("에러! : ", e);
        });
  }, []);

  const handleClickDelete = () => {
    const confirmed = window.confirm("삭제하시겠습니까?");
    if(!confirmed) return;
    axios.post(`/boardrest/remove`, dto.bno, {
      headers: {'Content-Type' : 'application/json'}
    })
        .then((res) => {
          alert(res.data);
          navigate('/');
        })
        .catch((e) => {
          console.log("에러 : ", e)});
  };

  return (
      <div>
        <div>
              <h1 className="my-3">Guestbook Read Page</h1>
              <div className="form-group">
                <label htmlFor="bno">bno</label>
                <input type="text" className="form-control" id="bno" name="bno" placeholder="bno" value={dto.bno}
                       readOnly/>
              </div>

              <div className="form-group">
                <label htmlFor="title">title</label>
                <input type="text" className="form-control" id="title" name="title" placeholder="Title"
                       value={dto.title}
                       readOnly/>
              </div>

              <div className="form-group">
                <label htmlFor="content">content</label>
                <textarea className="form-control" id="content" name="content" placeholder="Content"
                          readOnly value={dto.content}></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="writer">writer</label>
                <input type="text" className="form-control" id="writer" name="writer" placeholder="Writer"
                       value={dto.writerEmail}
                       readOnly/>
              </div>

              <div className="form-group mt-4">
                <label htmlFor="regDate">regDate</label>
                <input type="text" className="form-control" id="regDate" name="regDate" placeholder="regDate"
                       value={dayjs(dto.regDate).format('YYYY-MM-DD HH:mm')}
                       readOnly/>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="modDate">modDate</label>
                <input type="text" className="form-control" id="modDate" name="modDate" placeholder="modDate"
                       value={formatDate(dto.modDate)}
                       readOnly/>
              </div>
            </div>

        <div className="d-flex">
          <button type="button" className="btn btn-primary me-3" onClick={() =>{
            navigate(`/modify?bno=${dto.bno}`);
          }}>Edit</button>
          <button type="button" className="btn btn-danger me-3" onClick={handleClickDelete}>Delete</button>

          <button type="button" onClick={((e) => {
            navigate(`/`);
          })} className="btn btn-secondary ms-auto">to list</button>
        </div>
      </div>
  )
}