import React, {useState, useEffect, useRef} from "react"; //useRef 초기값 저장을 위해 사용. 렌더링 시에도 값 변하지않음.
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";

export default function Modify(props){

  const [dto, setDto] = useState({
      bno: '', title : '', content : '', writerEmail : '', modDate : '', regDate : '',
  });

  const location = useLocation();
  const navigate = useNavigate();
  const initDto = useRef(null);

  // 폼의 값이 변할때
  const handleChange = (e) => {
    const {name, value} = e.target;
    setDto((prevForm) => ({
      ...prevForm, [name] : value
    }))
  }

  // 수정 버튼을 클릭했을때
  const handleClick = (e) => {
    // 데이터가 있는지 검사.
    if(!dto?.title || !dto?.content) {
      alert("모든 항목을 입력하세요.");
      return;
    }

    axios.post(`/boardrest/modify`, dto)
        .then((res) => {
          console.log("받은 데이터 : " , res.data);
          // 글 수정 후 다시 리스트로 이동시키기
          navigate(`/read?bno=${dto.bno}`);
        })
        .catch((e) => {
          console.log("erro~~~r :  ", e);
        });
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
          setDto(res.data);
          // Reset버튼을 위한 initDto
          if(initDto.current == null) {initDto.current = JSON.parse(JSON.stringify(res.data));}
        })
        .catch((e) => {
          console.log("에러! : ", e);
        });
  }, []);

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

  return (
      <div>
        <div>
          <h1 className="my-3">Guestbook Modify Page</h1>
          <div className="form-group">
            <label htmlFor="bno">bno</label>
            <input type="text" className="form-control" id="bno" name="bno" placeholder="bno" value={dto.bno}
                   readOnly/>
          </div>

          <div className="form-group">
            <label htmlFor="title">title</label>
            <input onChange={handleChange} type="text" className="form-control" id="title" name="title" placeholder="Title"
                   value={dto?.title || ''}
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">content</label>
            <textarea onChange={handleChange} value={dto?.content || ''}  className="form-control" id="content" name="content" placeholder="Content"
            >{dto.content}</textarea>
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
                   value={formatDate(dto.regDate)}
                   readOnly/>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="modDate">modDate</label>
            <input type="text" className="form-control" id="modDate" name="modDate" placeholder="modDate"
                   value={formatDate(dto.modDate)}
                   readOnly/>
          </div>
        </div>
        <div className="d-flex my-3">
          <button type="button" className="btn btn-primary me-3" onClick={handleClick}>Save</button>
          <button type="button" className="btn btn-danger ms-auto" onClick={() => {setDto(initDto.current);}}>Reset</button>
          <button type="button" onClick={(e)=> navigate(`/read?bno=${dto.bno}`)} className="btn btn-secondary">cancle</button>
        </div>
      </div>
  );
}