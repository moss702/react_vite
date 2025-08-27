import React, {useState} from "react";

export default function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [content, setContent] = useState(props.content);
  return (
      <div>
        <h2>Update</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          const _title = e.target.title.value;
          const _content = e.target.content.value;
          console.log(_title, _content);
          props.onUpdate(_title, _content);
        }}>
          <p><input name="title" value={title} onChange={(e) => {setTitle(e.target.value);}}/></p>
          <p><textarea name="content" value={content} onChange={(e) => {setContent(e.target.value);}}/></p>
          <p><button>Update</button> ID : {props.id} </p>
        </form>
      </div>
  );
}