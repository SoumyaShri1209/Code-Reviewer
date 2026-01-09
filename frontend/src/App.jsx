





import { useState, useEffect } from "react";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "prismjs/themes/prism-tomorrow.css";
import "highlight.js/styles/github-dark.css";

import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

import "./App.css";

function App() {

  const [code, setCode] = useState(() => {
    return localStorage.getItem("code") ?? "";
  });

  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    localStorage.setItem("code", code);
  }, [code]);

  async function reviewCode() {
    if (!code.trim()) {
      toast.warning("Please enter some code to review!", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    setIsLoading(true);
    
   
    const toastId = toast.loading("Analyzing your code...", {
      position: "top-center",
      autoClose: false,
      closeButton: false,
    });

    try {
      const response = await axios.post(
        "http://localhost:3000/ai/get-review",
        { code }
      );
      
      setReview(response.data);
      
    
      toast.update(toastId, {
        render: "Code analysis complete!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });
    } catch (error) {
      console.error("Error reviewing code:", error);
      
    
      toast.update(toastId, {
        render: error.response?.data?.message || "Failed to analyze code. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 4000,
        closeButton: true,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      
      <main>
       
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
              disabled={isLoading}
            />
          </div>

          <div 
            className="review" 
            onClick={reviewCode}
            style={{ 
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? "Analyzing..." : "Review"}
          </div>
        </div>

      
        <div className="right">
          <Markdown rehypePlugins={[rehypeHighlight]}>
            {review}
          </Markdown>
        </div>
      </main>
    </>
  );
}

export default App;