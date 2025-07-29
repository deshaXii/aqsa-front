import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const useVoiceRecognition = (language = "ar-EG") => {
  const [isListening, setIsListening] = useState(false);
  const [result, setResult] = useState("");
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript,
  } = useSpeechRecognition();

  const startListening = () => {
    setIsListening(true);
    SpeechRecognition.startListening({
      continuous: true,
      language: language,
    });
  };

  const stopListening = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  useEffect(() => {
    if (transcript) {
      setResult(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    if (!listening && isListening) {
      setIsListening(false);
    }
  }, [listening, isListening]);

  return {
    result,
    setResult,
    isListening,
    startListening,
    stopListening,
    toggleListening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  };
};

export default useVoiceRecognition;
