import React, { useContext } from 'react'
import { dataContext } from '../../context/UserContext'

function Chatbox() {
    let{input,setInput,prevInput,setPrevInput}=useContext(dataContext)
  return (
      <div className='chat-page'>
          <div className="user">
              <img src="" alt="" />
              <span>{prevInput}</span>
          </div>

          <div className="ai">
              <img src="" alt="" />
              <span>AI</span>
          </div>
      
    </div>
  )
}

export default Chatbox
