import React from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import VoiceInput from "../components/ui/VoiceInput";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("اسم المستخدم مطلوب"),
  password: Yup.string().required("كلمة المرور مطلوبة"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      console.log("Submitting login form:", values);
      await login(values.username, values.password);
      console.log("Login successful, navigating to dashboard");
      navigate("/"); // Redirect on success
    } catch (error) {
      console.error("Login form error:", error);
      setErrors({ username: " ", password: "بيانات الدخول غير صحيحة" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #2E7D32 0%, #1565C0 100%)",
      }}
    >
      <Paper
        sx={{
          p: 4,
          width: "90%",
          maxWidth: 400,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom sx={{ mb: 3 }}>
          تسجيل الدخول - نظام الأقصى
        </Typography>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
          }) => (
            <Form>
              <VoiceInput
                name="username"
                label="اسم المستخدم"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
                fullWidth
                margin="normal"
                autoComplete="username"
              />
              <VoiceInput
                name="password"
                label="كلمة المرور"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                fullWidth
                margin="normal"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting}
                sx={{ mt: 2, py: 1.5 }}
              >
                {isSubmitting ? <CircularProgress size={24} /> : "دخول"}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default LoginPage;
