import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// class Hello extends React.Component{
//   render() {
//     return <div>Hello {this.props.toWhat}</div>
//   }
// }

// const name = '소플';
// -------- 아래 2개의 코드는 동일내용 (JSX와 creatElement의 차이)
// const element = <h1>안녕, {name}</h1> 
// const element = React.createElement('h1', {name}, `안녕, ${name}`);

function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'HyunJ',
  lastName: 'Park'
}

function getGreeting(user){
  if(user) {
    return <h1>Hello, {formatName(user)}</h1>
  }
  return <h1>Hello, Stranger</h1>
}

const element
 = (
  // <h1>Hello, {formatName(user)}</h1>
    <div>{getGreeting()}</div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(element);

// // root.render(<Hello toWhat={"World"} />);
// root.render(React.createElement(Hello, {toWhat: "world" , name: "lee"}, null))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
