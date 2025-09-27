import React, { useContext } from "react"
import "../../App.css";
import { RiImageAiFill } from "react-icons/ri";
import { LuImagePlus } from "react-icons/lu";
import { LuMessageSquareDashed } from "react-icons/lu";
import { FaArrowUp } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { IoAddOutline } from "react-icons/io5";
import { dataContext, prevUser, user } from "../../context/UserContext";
import Chatbox from "./chatbox";
import { generateResponse } from "../../gemini";
import { query } from "../../huggingFace";

function Home() {

    let { startRes, setStartRes, popUp, setPopUp, input, setInput, feature, setFeature, showResult, setShowResult,prevFeature,setPrevFeature,genImgUrl,setGenImgUrl} =useContext(dataContext)
    async function handleSubmit(e) {
        // console.log(feature);
        
        setStartRes(true)
        setPrevFeature(feature)
        
      setShowResult("")
        prevUser.data = user.data;
        prevUser.mime_type = user.mime_type;
        prevUser.imgUrl = user.imgUrl;
        prevUser.prompt = input;
        // user.data = null
        // user.mime_type = null
        // user.imgUrl=null
        setInput("")
        let result = await generateResponse()
        // console.log(result);
        setShowResult(result)
        setFeature("chat")
        user.data = null
        user.mime_type = null
        user.imgUrl=null
    }
    
    function handleImage(e) {
        setFeature("upimg")
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.onload = (event) => {
            let base64 = event.target.result.split(",")[1]
            user.data = base64;
            user.mime_type = file.type;
            user.imgUrl = `data:${user.mime_type};base64,${user.data}`
            // console.log(event);
            // prevUser.data = user.data;
            // prevUser.mime_type = user.mime_type;
            // prevUser.imgUrl = user.imgUrl;
            
        };
       
        reader.readAsDataURL(file)
    }
   
    async function handleGenerateImg() {
        setStartRes(true)
        setPrevFeature(feature)
        setGenImgUrl("")
         prevUser.prompt=input
        let result =await query().then((e) => {
            let url = URL.createObjectURL(e)
            setGenImgUrl(url)
        })
         setInput("")
            setFeature("chat")
    }




  return (
      <div className='home'>
          {/* Nav Bar  */}
          
              <nav>
              <div className="nav-img">
                  
          <a 
            href="https://ibb.co/7JR36Jb3" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <img 
              src="https://i.ibb.co/KjLt3jmt/Chat-GPT-Image-Sep-6-2025-05-21-18-PM.png" 
              alt="Chat-GPT-Image-Sep-6-2025-05-21-18-PM"
            />
                      </a>
                      
                  </div>
                  <h1 className='nav-heading'>ChaiBot</h1>
          </nav>
         
          
          {/* Hero Section  */}
          <input type="file" accept="image/*" hidden id="inputImg" onChange={handleImage}/>
          {!startRes ? <div className="hero-sec">
              <span className="hero-text">What can I help with ?</span>
              <div className="categories">
                  <div className="up-img" onClick={() => {
                      document.getElementById("inputImg").click();
                  }}>
                      <LuImagePlus className="icon" />
                      <span>Upload Image</span>
                  </div>
                  <div className="gen-img" onClick={()=>setFeature("genimg")}>
                      <RiImageAiFill className="icon" />
                      <span>Generate Image</span>
                  </div>
                  <div className="chat" onClick={()=>setFeature("chat")}>
                      <LuMessageSquareDashed className="icon" />
                      <span>Let's Chat </span>
                  </div>
                  
              </div>
        
          </div>
              :
              <Chatbox />
          }


          
          {/* form  */}
          <form className="input-box" onSubmit={(e) => {
              e.preventDefault()
              if (input) {
                  if (feature == "genimg"){
                      handleGenerateImg()
                  }
                  else {
                       handleSubmit(e)}
                  }
                 
            } 
          }>
              {popUp ? <div className="pop-up">
                  <div className="select-up-img" onClick={() => {
                      setPopUp(false)
                      setFeature("chat")
                      document.getElementById("inputImg").click();
                      }}>
                          <LuImagePlus className="icon" />
                          <span>Upload Image</span>
                      </div>
                  <div className="select-gen-img" onClick={() => {
                    setFeature("genimg")
                      setPopUp(false)
                     
                  }}>
                          <RiImageAiFill className="icon" />
                          <span>Generate Image</span>
                      </div>
                  </div> :null}
              <div id="add" onClick={() => {
                  setPopUp(prev=> !prev)
              }}> 
                  {feature=="gen-img"?<RiImageAiFill className="plus-gen-img" />: <IoAddOutline  id="add-icon" />}
                 
              </div>
             
                  <input id="input" type="text" placeholder="Ask Something..." onChange={(e)=>setInput(e.target.value)} value={input}/>
              {input?<button id="submit">
                      <FaArrowUp id="submit-icon" />
                  </button>:null}
             
          </form>

    </div>
  )
}

export default Home;