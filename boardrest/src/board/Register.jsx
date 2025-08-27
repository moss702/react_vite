import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function Register(props){

  const [form, setForm] = useState({
    title: '', content : '', writerEmail: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    // 기존 폼에 있던 데이터 복제 후 값 변경하기
    // 새 폼에서 변경된 전체 데이터를 setForm을 통해 기존폼에 덮어쓰기
    setForm((prevForm) => ({
      ...prevForm, [name] : value
    }))
  }

  const handleSubmit = (e) => {
    // react에서는 form의 action으로 이동하지않고, react-router-dom을 통해 페이지 이동
    e.preventDefault();

    // 데이터가 있는지 검사.
    if(!form.title || !form.content || !form.writerEmail) {
      alert("모든 항목을 입력하세요.");
      return;
    }

    // 데이터 전송
    axios.post('/boardrest/register', form)
        .then((res) => {
          console.log("받은 데이터 : " , res.data);
        })
        .catch((e) => {
          console.log("erro~~~r :  ", e);
       });
    // 글 등록 후 다시 리스트로 이동시키기
    navigate(`/`);
  }

  return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">title</label>
            <input type="text" className="form-control"
                   onChange={handleChange} value={form.title}
                   id="title" name="title" placeholder="Title"/>
          </div>
          <div className="form-group">
            <label htmlFor="content">content</label>
            <textarea className="form-control" id="content"
                      onChange={handleChange} value={form.content}
                      name="content" placeholder="Content"></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="title">writer</label>
            <input type="text" className="form-control"
                   onChange={handleChange} value={form.writerEmail}
                   id="writerEmail" name="writerEmail" placeholder="Writer"/>
          </div>

          <div className="d-flex">
            <button type="submit" className="btn btn-primary my-3">Submit</button>
            <button type="button" onClick={((e) => {
              navigate(`/`);
            })} className="btn btn-secondary ms-auto my-3">Cancle</button>
          </div>
        </form>
      </div>
  );
}