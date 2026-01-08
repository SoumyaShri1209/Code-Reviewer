// import { useState } from 'react'
// import "prismjs/themes/prism-tomorrow.css";
// import Editor from 'react-simple-code-editor'
// import prism from 'prismjs';
// import axios from 'axios';
// import './App.css'
// import { useEffect } from 'react';
// import Markdown from "react-markdown";
// import rehypeHighlight from "rehype-highlight";
// import "highlight.js/styles/github-dark.css";

// function App() {
//   const [count, setCount] = useState(0)
//   const [code ,setcode] = useState(` Paste your code here...`)


// const [review, setreview] = useState(``)
//   useEffect(()=>{
//     prism.highlightAll();
//   })

//  async function reviewCode(){
//     try {
//       const response = await axios.post('http://localhost:3000/ai/get-review', { code });
//       // console.log(response.data);
//       setreview(response.data);
//     } catch (error) {
//       console.error("Error reviewing code:", error);
//     }
//   }


//   return (
//     <>
//    <main>
//     <div className="left">
//       <div className='code'>
//        <Editor
//         value={code}
//         onValueChange={code => setcode(code)}
//         highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
//         padding={10}
//         style={{
//           fontFamily: '"Fira code", "Fira Mono" , monospace',
//           fontSize: 16,
//           height: "100%",
//           width: "100%",
//           border: "none",
//         }}
//        />

//       </div>
//       <div 
//       onClick={reviewCode}
//       className='review'>Review</div>
//     </div>

//     <div className='right'>
//      <Markdown
//      rehypePlugins={[rehypeHighlight]}
//      >{review}</Markdown>
     
//     </div>
//     </main>

//     </>
//   )
     
//       }


// export default App
   











import { useState, useEffect } from "react";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import axios from "axios";

import "prismjs/themes/prism-tomorrow.css";
import "highlight.js/styles/github-dark.css";

import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

import "./App.css";

function App() {
  // Load saved code OR empty string (not placeholder)
  const [code, setCode] = useState(() => {
    return localStorage.getItem("code") ?? "";
  });

  const [review, setReview] = useState("");

  // Persist code exactly as user leaves it
  useEffect(() => {
    localStorage.setItem("code", code);
  }, [code]);

  async function reviewCode() {
    try {
      const response = await axios.post(
        "http://localhost:3000/ai/get-review",
        { code }
      );
      setReview(response.data);
    } catch (error) {
      console.error("Error reviewing code:", error);
    }
  }

  return (
    <main>
      {/* LEFT PANEL */}
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={(code) =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={10}
            placeholder="Paste your code here..."
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: 16,
              height: "100%",
              width: "100%",
              border: "none",
            }}
          />
        </div>

        <div className="review" onClick={reviewCode}>
          Review
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="right">
        <Markdown rehypePlugins={[rehypeHighlight]}>
          {review}
        </Markdown>
      </div>
    </main>
  );
}

export default App;
