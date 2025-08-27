import React, {useState} from "react";

export default function Nav(props) {

  // const [arti, setArti] = useState({props.arti.id === 0});
  // const handleClick = (e) => {
  //   setArti(e.target.value);
  // }



  const textList = props.texts;
  // for문 돌린다면?
  // 객체선언 : 주소가 들어감. const(상수)여도 주소는 불변. 주소는 값 추가해도 상관없음.
  const lis = [];
  for( let i = 0; i < textList.length; i++ ){
    let tf = textList[i];
    lis.push(
        <li key={tf.id}>
          <a id={tf.id} href="/" onClick={(e) => {
            e.preventDefault();
            // 모드가 바뀌면 클릭한 녀석을 알 수 있게. 숫자로 받아오는 Number()
            props.onChangeMode(Number(e.target.id));
          }}>{tf.title}</a>
        </li>)
  }

  // list.map 함수 사용한다면?
  // const textList = props.texts;
  // const listItems = props.texts.map((t) =>
  //     <li key = {t.text}> <a href={"/"}> {t.text}</a></li>)

  return (
      <div>
        <ol>
          {lis}
        </ol>
      </div>
  )
}