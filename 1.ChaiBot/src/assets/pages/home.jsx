import React, { useContext } from "react"
import "../../App.css";
import { RiImageAiFill } from "react-icons/ri";
import { LuImagePlus } from "react-icons/lu";
import { LuMessageSquareDashed } from "react-icons/lu";
import { FaArrowUp } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { IoAddOutline } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { dataContext } from "../../context/UserContext";
import Chatbox from "./chatbox";

function Home() {

    const {startRes, setStartRes, popUp, setPopUp, input, setInput, feature,setFeature,prevInput,setPrevInput} =useContext(dataContext)
    async function handleSubmit(e) {
        // e.preventDefault()
        setStartRes(true)
        setPrevInput(input)
        setInput("")
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
          <input type="file" accept="image/"/>
          
          {/* Hero Section  */}
          {!startRes ? <div className="hero-sec">
              <span className="hero-text">What can I help with ?</span>
              <div className="categories">
                  <div className="up-img">
                      <LuImagePlus className="icon" />
                      <span>Upload Image</span>
                  </div>
                  <div className="gen-img" onClick={()=>setFeature("gen-img")}>
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
                  handleSubmit(e)}
            } 
          }>
              {popUp ? <div className="pop-up">
                      <div className="select-up-img">
                          <LuImagePlus className="icon" />
                          <span>Upload Image</span>
                      </div>
                      <div className="select-gen-img" onClick={()=>setFeature("gen-img")}>
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

              <button id="dark">
                  <MdDarkMode id="dark-icon"/>
              </button>
              <button id="light">
                  <MdLightMode id="light-icon" />
             </button>
          </form>

    </div>
  )
}

export default Home;