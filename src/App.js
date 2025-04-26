 import {useState,useEffect} from 'react';
 import './App.css';

function App() {
  const [timeLeft,setTimeLeft]=useState(60);
  const [isRunning,setIsRunning]=useState(false);
  const [inputTime,setInputTime]=useState('');


  useEffect(()=>{
    let timer;
    if(isRunning && timeLeft >0){
      timer=setTimeout(()=>{
        setTimeLeft(prev=>prev-1);
      },1000)
    }else if(timeLeft===0){
      setIsRunning(false);
      playSound();
    }
    return()=>clearTimeout(timer);
  },[isRunning,timeLeft]);

  const startPauseTimer =()=>setIsRunning(!isRunning);
  const resetTimer=()=>{
    setIsRunning(false);
    setTimeLeft(60);
  };
  const handleInputChange=(e)=>{
    setInputTime(e.target.value);
  }
  const setCustomTime=()=>{
    const seconds=parseInt(inputTime);
    if(!isNaN(seconds) && seconds >0){
      setTimeLeft(seconds);
      setIsRunning(false);
      setInputTime('');
    }
  }
  const playSound = () => {
    const audio = new Audio('notification-alert.mp3'); // You need a small mp3 file in public folder
    audio.play();
  };
  return (
    <div className="app">
      <h1>Countdown Timer</h1>
      
      <div className="timer" style={{ transform: `scale(${1 + timeLeft/100})` }}>
        {timeLeft}s
      </div>

      <div className="input-area">
        <input 
          type="number" 
          placeholder="Enter seconds"
          value={inputTime}
          onChange={handleInputChange}
        />
        <button onClick={setCustomTime}>Set Time</button>
      </div>

      <div className="buttons">
        <button onClick={startPauseTimer}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  ); 
   
}

export default App;
