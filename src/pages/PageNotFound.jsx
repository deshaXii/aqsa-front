import React from "react";
import { Box, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ mt: 8, textAlign: "center" }}>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 80, color: "error.main", mb: 2 }} />
        <Typography variant="h3" gutterBottom>
          404 - الصفحة غير موجودة
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/")}
          sx={{ px: 4 }}
        >
          العودة للصفحة الرئيسية
        </Button>
      </Box>
    </Container>
  );
};

export default PageNotFound;
