import React from "react";
import { IconButton, TextField, InputAdornment, Tooltip } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import useVoiceRecognition from "../../hooks/useVoiceRecognition";

const VoiceInput = ({ value, onChange, ...props }) => {
  const {
    isListening,
    startListening,
    stopListening,
    browserSupportsSpeechRecognition,
  } = useVoiceRecognition({
    onResult: (result) => {
      onChange({ target: { value: result } });
    },
  });

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <TextField
      {...props}
      value={value}
      onChange={onChange}
      InputProps={{
        endAdornment: browserSupportsSpeechRecognition && (
          <InputAdornment position="end">
            <Tooltip title={isListening ? "إيقاف التسجيل" : "التسجيل الصوتي"}>
              <IconButton
                onClick={handleMicClick}
                color={isListening ? "error" : "default"}
                edge="end"
              >
                {isListening ? <MicOffIcon /> : <MicIcon />}
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default VoiceInput;
