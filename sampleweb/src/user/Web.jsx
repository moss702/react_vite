import React from 'react';
import Header from './Header';
import Nav from './Nav';
import Article from './Article';

function Web (props) {
  // Header
  // Nav
  // Article
  return (
      <div>
        <Header />
        <Nav />
        <Article />
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