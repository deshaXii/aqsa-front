import { useEffect } from "react";
import { useSpeechRecognition } from "react-speech-recognition";

const useVoiceRecognition = (onResult) => {
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript,
  } = useSpeechRecognition();

  const startListening = () => {
    if (browserSupportsSpeechRecognition) {
      resetTranscript();
      const recognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();
      recognition.lang = "ar-EG";
      recognition.interimResults = true;
      recognition.start();
    }
  };

  const stopListening = () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.stop();
  };

  useEffect(() => {
    if (transcript) {
      onResult(transcript);
    }
  }, [transcript, onResult]);

  return {
    isListening: listening,
    transcript,
    startListening,
    stopListening,
    browserSupportsSpeechRecognition,
  };
};

export default useVoiceRecognition;
