import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";


const options = { 
    // continuous : false,
}

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  finalTranscript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool,
};

const Dictaphone = ({
  transcript,
  finalTranscript,
  resetTranscript,
  browserSupportsSpeechRecognition,
  getTranscript
}) => {

  const [finalWord, setfinalWord] = useState('');
  

  useEffect(() => {
      
    // setfinalWord([...finalWord, finalTranscript.substr(transcript.length)])
    if (finalTranscript){
        setfinalWord(/^(?:.* )?([^ ]*)/.exec(finalTranscript)[1]);
        //console.log("Transcript", /^(?:.* )?([^ ]*)/.exec(finalTranscript)[1]);
        
        
        //resetTranscript()
    }
    getTranscript(finalTranscript)
  }, [finalTranscript])

  

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  // console.log("Transcript:", transcript);
  // console.log("Final:", finalTranscript);
  return (
      <>
        {/* <div> */}
      {/* <button onClick={resetTranscript}>Reset</button>
      <span >{transcript}</span> */}
        {/* </div> */}
    </>
  );
};

Dictaphone.propTypes = propTypes;

export default SpeechRecognition(options)(Dictaphone);