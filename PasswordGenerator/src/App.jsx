import { useCallback, useEffect, useState,useRef } from 'react'
import './index.css'

function App() {
  const [length, setLength] = useState(8)
  const [numbersAllowed, setNumbersAllowed]=useState(false)
  const [charactersAllowed, setCharactersAllowed]=useState(false)
  const [password , setPassword]=useState("");

  //useRef Hook
  const passwordRef=useRef(null)

  const passwordGenerator= useCallback(()=>
    {
      let pass="";
      let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      if(numbersAllowed){
        str+="0123456789"
      }
      if(charactersAllowed){
        str+="!@#$%^&*()-_+={}[]"
      }   
      for(let i=1;i<=length;i++)
      {
        let char=Math.floor(Math.random()*str.length+1)
        pass+=str.charAt(char);
      }
      setPassword(pass);
    },[length,numbersAllowed,charactersAllowed,setPassword])

    useEffect(()=>{
      passwordGenerator();
    },[length,numbersAllowed,charactersAllowed,setPassword])

    const copyPasswordToClipboard=useCallback(()=>{
      passwordRef.current?.select();
      // passwordRef.current?.setSelectionRange(0,51)
      window.navigator.clipboard.writeText(password)
    },[password])
  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
    <h1 className=' text-center text-white my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
              type="text" 
              value={password} 
              className='outline-none w-full py-1 px-3 text-orange-500 bg-white' 
              placeholder='Password' 
              readOnly
              ref={passwordRef}/>
      <button onClick={copyPasswordToClipboard} className='cursor-pointer 
      hover:bg-orange-500 
      active:bg-green-500 
      outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
      </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-centre gap-x-1'>
        <input type="range" name="" id="lengthInput" min={8} max={50} value={length} className='cursor-pointer' onChange={(e)=>{
          setLength(e.target.value)
        }} />
        <label className='text-white-500'>Length : {length}</label>
      </div>
    <div className='flex items-centre gap-x-1'>
      <input type="checkbox" name="" id="numberInput" defaultChecked={numbersAllowed} onChange={() => {
        setNumbersAllowed((prev)=>!prev)
      }}/>
      <label htmlFor="Numbers">Numbers</label>
    </div>
    <div className='flex items-centre gap-x-1'>
      <input type="checkbox" name="" id="characterInput" defaultChecked={charactersAllowed} onChange={() => {
        setCharactersAllowed((prev)=>!prev)
      }}/>
      <label htmlFor="Numbers">Characters</label>
    </div>
    </div>
    </div>
    </>
  )
}

export default App
