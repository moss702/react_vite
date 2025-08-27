import React from "react";

export default function Create(props) {
  return (
    <div>
      <h2>Create</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const content = e.target.content.value;
        console.log(title, content);
        props.onCreate(title, content);
      }}>
        <p><input name="title" placeholder="title" /></p>
        <p><textarea name="content" placeholder="content" /></p>
        <p><button>Create</button></p>
      </form>
    </div>
  );
}