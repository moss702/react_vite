import React, {useState} from 'react';
import Header from './Header';
import Nav from './Nav';
import Article from './Article';
import Create from "./Create";
import Update from "./Update";

function Web (props) {
  const [mode, setMode] = useState("Welcome"); // 초기에 보여줄 값
  const [id, setId] = useState(0); // 글을 읽거나 수정할때 사용

  // 글을 등록할때 사용할 id. 자동증가시킬예정.
  // 처음에 texts.length+1을 생각했는데, 확실히 삭제후 등록시 id가 겹치게 될 듯..
  const [nextId, setNextId] = useState(4);

  const [texts, setTexts] = useState([
    {id:1 , title : "html", content: "html is ...",},
    {id:2 , title : "css", content: "css is ...",},
    {id:3 , title : "javascript", content: "javascript is ...",},
  ]);

  let content = null; // Article 컴포넌트 내용 저장 변수

  if(mode === "Welcome") {
    content = <Article title="Welcome!!" content="Hello, WEB!" />;
  }
  else if(mode === "Read") { // 리더보드 : 클릭한 내용 출력
    for ( let i = 0; i < texts.length; i++){
      if(texts[i].id === id){
        // content = <Article title={texts[i].title} content={texts[i].content} />
        content = <Article {...texts[i]} />
      }
    }
  }
  else if (mode === "Create") {
    content = <Create onCreate={(_title, _content) => {
      const newText = {id: nextId, title: _title, content: _content,}
      // useState로 만든 변수 texts에는 setTexts가 아니라면 값을 넣을 수 없기 때문에, 아래의 과정 진행
      const newTexts = [...texts];
      newTexts.push(newText);
      setTexts(newTexts);
      setNextId(nextId + 1);
      console.log(texts);
      setId(newText.id);
      setMode("Read");
    }}/>;
  }
  else if(mode === "Update") {
      // texts.id에 맞는 글 찾아서, 파라미터를 통해 Update에게 전달
      for ( let i = 0; i < texts.length; i++){
        if(texts[i].id === id){
          // content = <Article title={texts[i].title} content={texts[i].content} />
          content = <Update {...texts[i]} onUpdate={(_title, _content) => {
            // 위에서 이미 id 값 찾아왔으니까 그냥 호출해서 쓰면 됨!
            const updateText = {id : id, title: _title, content: _content};
            const updateTexts = [...texts];

            // id 같은 녀석을 찾아서 값 덮어쓰기
            for(let i = 0; i < updateTexts.length; i++) {
              if(updateTexts[i].id === id){
                updateTexts[i] = updateText;
                break; // 찾았는데 마저 for문 돌 필요없으니까 탈출
              }
            }
            setTexts(updateTexts);
            setMode("Read");
          }} />;
        }
      }
  }

  // Header
  // Nav
  // Article
  return (
      <div>
        {/*헤더에도 onChangeMode를 부여해서 클릭시 Welcome이 보이게 했다!*/}
        <Header title="WEB" onChangeMode1={() => { setMode("Welcome")}} />
        <Nav texts = {texts} onChangeMode={(_id) => { setMode( "Read"); setId(_id); }}  />
        {content}

        <ul>
          <li>
            <a href="/" onClick={(e) => {
            e.preventDefault();
            setMode("Create")}}>Create</a>
          </li>

          {mode === "Read" && // mode가 Read 일때만 update, delete 버튼 보이게
          <li>
            <a href="/" onClick={(e) => {
              e.preventDefault();
              setMode("Update")}}>Update</a>
          </li>
          }
          {mode === "Read" && // delete는 따로 상단에서 if() 모드 처리없이 여기서 바로 처리하자.
          <li>
            <a href="/" onClick={(e) => {
              e.preventDefault();
              const newTexts = [];
              for(let i = 0; i < texts.length; i ++) {
                if (texts[i].id !== id) {
                  newTexts.push(texts[i]);
                }
              }
              setTexts(newTexts);
              setMode("Welcome")}}>Delete</a>
          </li>
          }

        </ul>
      </div>
  );
}
export default Web;

// =================================================
// Web.jsx 원문. 이걸 쪼개서 파트별로 나눠봅시다.
// import React from "react";
// function Web(props) {
//   // Header
//   // Nav
//   // Article
//   return (
//       <div>
//         <div>
//           <h1><a href="/">WEB</a></h1>
//         </div>
//         <div>
//           <ol>
//             <li><a href="/">html</a></li>
//             <li><a href="/">css</a></li>
//             <li><a href="/">javascript</a></li>
//           </ol>
//         </div>
//         <div>
//           <h1>Welcome!!</h1>
//           <p>Hello, WEB.</p>
//         </div>
//       </div>
//   );
// }