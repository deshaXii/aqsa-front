import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff, Mic, MicOff } from "@mui/icons-material";

const PasswordInput = ({
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  fullWidth = true,
  disabled = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleVoiceInput = () => {
    if (!isListening) {
      // Start voice recognition
      setIsListening(true);
      if ('webkitSpeechRecognition' in window) {
        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = 'ar-SA';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          onChange({ target: { name, value: transcript } });
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
      } else {
        alert('متصفحك لا يدعم التعرف على الصوت');
        setIsListening(false);
      }
    }
  };

  return (
    <Box sx={{ position: "relative" }}>
      <TextField
        name={name}
        label={label}
        type={showPassword ? "text" : "password"}
        value={value || ""}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        helperText={helperText}
        fullWidth={fullWidth}
        disabled={disabled}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleTogglePasswordVisibility}
                edge="end"
                size="small"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
              <IconButton
                onClick={handleVoiceInput}
                edge="end"
                size="small"
                color={isListening ? "primary" : "default"}
              >
                {isListening ? <MicOff /> : <Mic />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...props}
      />
    </Box>
  );
};

export default PasswordInput; 