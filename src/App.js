import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import background from "./assets/images/bg.jpg"
import fala1 from "./assets/images/fala1.png";
import fala2 from "./assets/images/fala2.png";
import nadaimg from "./assets/images/nada.png";
import personagemIdle from "./assets/images/personagemidle.gif"
import personagemRun from "./assets/images/personagemrun.gif"
import personagemJump from "./assets/images/personagemjump.gif"
import btnNext from "./assets/images/btnnext.png"
import SpeechRecognition from "./Components/SpeechRecognitionComponent";
import music from './assets/images/POL-net-bots-short.wav';

// Importing numbers...
import img0 from './assets/images/0.png';
import img1 from './assets/images/1.png';
import img2 from './assets/images/2.png';
import img3 from './assets/images/3.png';
import img4 from './assets/images/4.png';
import img5 from './assets/images/5.png';
import img6 from './assets/images/6.png';
import img7 from './assets/images/7.png';
import img8 from './assets/images/8.png';
import img9 from './assets/images/9.png';

import img0Lit from './assets/images/0_hover.png';
import img1Lit from './assets/images/1_hover.png';
import img2Lit from './assets/images/2_hover.png';
import img3Lit from './assets/images/3_hover.png';
import img4Lit from './assets/images/4_hover.png';
import img5Lit from './assets/images/5_hover.png';
import img6Lit from './assets/images/6_hover.png';
import img7Lit from './assets/images/7_hover.png';
import img8Lit from './assets/images/8_hover.png';
import img9Lit from './assets/images/9_hover.png';

let aux = 0;


function App() {


  const [curState, setCurState] = useState(0);

  const [gameState, setGameState] = useState(0);

  const falas = [fala1, fala2, nadaimg, nadaimg];
  const bgnum = [img0, img1, img2, img3, img4, img5, img6, img7, img8, img9];
  const bgnumcol = [img0Lit, img1Lit, img2Lit, img3Lit, img4Lit, img5Lit, img6Lit, img7Lit, img8Lit, img9Lit];

  const achar = [['zero', '0'], ['um', '1'], ['dois', '2'], ['tres', '3'], ['quatro', '4'], ['cinco', '5'],
  ['seis', '6'], ['sete', '7'], ['oito', '8'], ['nove', '9']];

  const personagem = [personagemIdle, personagemIdle, personagemRun, personagemJump];
  
  const chao = ['chao', 'chao', 'chao2', 'chao2'];

  const [numberState, setNumberState] = useState(0);

  const divClasses = ['', '', 'hidden', 'hidden'];

  const buttonClasses = ['btn-next', 'btn-next-gamb', 'hidden', 'hidden'];

  const [teste, setTeste] = useState('')

  
  


  let numAux = 0;

  const pegaDados = (dados) => {
    setTeste(dados)
    console.log(dados);
  }

  const turnOnNumbers = (startPoint) => {
      console.log("Turning on all the numbers");
        if (startPoint > 9) {
          return;
        }
        setTimeout(() => {
          setNumberState(startPoint)  
          console.log(`Current number ${startPoint}`)
          turnOnNumbers(startPoint + 1)
        }, 500);
    
  }

  useEffect(() => {
    let numero = document.getElementById("num");
    if(numero && numero.style.marginLeft == "44%"){
      if(teste.indexOf(achar[numAux][0])!=-1 || teste.indexOf(achar[numAux][1])!=-1){
        console.log("acertoou1");
        numero.style.backgroundImage = "url("+bgnumcol[numAux]+")";
        numAux++;
      }
    }
  }, [teste])

  const spawnaObstaculo = (point, num) => {
    //console.log("teste: ", teste, achar, num);
    let numero = document.getElementById("num");
    if(numero)
      numero.style.marginLeft = "44%";
    //console.log("teste", teste);

    if(point == 35){
      let perso = document.getElementById("personagem");
      perso.src = personagemJump;
      
    }
    if(point<=35 && point >= 0){
      let perso = document.getElementById("personagem");
      let x = 35 - point;
      perso.style.marginTop = 20 - ((- Math.pow(x/4.18, 2) + 2*x)*5) + '%';
    }
    if(point == 0){
      let perso = document.getElementById("personagem");
      perso.src = personagemRun;
    }
    if(point<=-15){
      numero.style.backgroundImage = "url("+bgnum[num+1]+")";
      numero.style.marginLeft = "100%";
      return
    }
    setTimeout(() => {  
      //console.log("teste: ", teste);
      let obs = document.getElementById("obs");
      if(obs)
        obs.style.marginLeft = point + "%";
      spawnaObstaculo(point-1, num);
      //if(point<=-14){
        //num.style.backgroundImage = "url("+bgnum[num+1]+")";
      //}
    }, 50);

  }

  const sorteiaObstaculo = (num) => {
      if(num==10){
        return;
      }
      let tempo = (Math.random()*2000)+7000;
      console.log(tempo)
      setTimeout(() => {  
        sorteiaObstaculo(num+1);
        numAux = num+1;
        spawnaObstaculo(100, num);
      }, tempo);
    
  }
  useEffect(() => {
    if (aux){
      sorteiaObstaculo(0)
    }
  }, [gameState])  

  useEffect(() => {
    if (aux){
      turnOnNumbers(0)
    }else{
      aux++
    }
    console.log(aux)
  }, [curState])  

  return (
    <div className="App">
      
      

      <img  src={falas[curState]} className={`fala ${divClasses[curState]}`}>        
      </img>
      <div style={ curState == 1 ? {} : { display : 'none' }} className='display-numeros-grid'>
        <div className={numberState == 0 ? "numeros-0-hover" : "numeros-0" }></div>      
        <div className={numberState == 1 ? "numeros-1-hover" : "numeros-1" }></div>      
        <div className={numberState == 2 ? "numeros-2-hover" : "numeros-2" }></div>      
        <div className={numberState == 3 ? "numeros-3-hover" : "numeros-3" }></div>      
        <div className={numberState == 4 ? "numeros-4-hover" : "numeros-4" }></div>      
        <div className={numberState == 5 ? "numeros-5-hover" : "numeros-5" }></div>      
        <div className={numberState == 6 ? "numeros-6-hover" : "numeros-6" }></div>      
        <div className={numberState == 7 ? "numeros-7-hover" : "numeros-7" }></div>      
        <div className={numberState == 8 ? "numeros-8-hover" : "numeros-8" }></div>      
        <div className={numberState == 9 ? "numeros-9-hover" : "numeros-9" }></div>      
      </div>
      <br></br>


      <div onClick={() => {
        let aux = curState;
        aux++;
        setCurState(aux);
        if(aux==2){
          aux = 1;
          //sound.play('./assets/images/POL-net-bots-short.wav')
          setGameState(aux);
          var soundPlayer = {
            audio: null,
            muted: false,
            playing: false,
            _ppromis: null,
            loop: true,
            puse: function () {
                this.audio.pause();
            },
            play: function (file) {
                if (this.muted) {
                    return false;
                }
                if (!this.audio && this.playing === false) {
                    this.audio = new Audio(file);
                    this._ppromis = this.audio.play();
                    this.playing = true;
                    this.audio.loop = true;
          
                    if (this._ppromis !== undefined) {
                        this._ppromis.then(function () {
                            soundPlayer.playing = false;
                        });
                    }
          
                } else if (!this.playing) {
          
                    this.playing = true;
                    this.audio.src = file;
                    this._ppromis = soundPlayer.audio.play();
                    this._ppromis.then(function () {
                        soundPlayer.playing = false;
                    });
                }
            }
          };
          
          soundPlayer.play(music);
          
        }
      }} className={buttonClasses[curState]}></div>

      <div className='personagem-idle'>
        <img id='personagem' src={personagem[curState]} className='personagem-idle-img' ></img>

      </div>

      <div className={chao[curState]}>

      </div>
      <div id='num' className='numero'>
      </div>
      <br></br>
      <div id='obs' className='obstaculo'>

      </div>
      
      {<SpeechRecognition getTranscript={pegaDados} ></SpeechRecognition>}
      
      
    </div>
    
  );
}

export default App;
