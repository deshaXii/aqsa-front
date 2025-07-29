import React from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import VoiceInput from "../ui/VoiceInput";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth";
import { useSnackbar } from "notistack";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required("اسم المستخدم مطلوب")
    .min(4, "اسم المستخدم يجب أن يكون على الأقل 4 أحرف"),
  password: Yup.string()
    .required("كلمة المرور مطلوبة")
    .min(6, "كلمة المرور يجب أن تكون على الأقل 6 أحرف"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await login(values.username, values.password);
      enqueueSnackbar("تم تسجيل الدخول بنجاح", { variant: "success" });
      navigate("/");
    } catch (error) {
      setErrors({
        username: " ",
        password: "اسم المستخدم أو كلمة المرور غير صحيحة",
      });
      enqueueSnackbar("فشل تسجيل الدخول", { variant: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom sx={{ mb: 3 }}>
        تسجيل الدخول
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
            <Box sx={{ mb: 2 }}>
              <VoiceInput
                name="username"
                label="اسم المستخدم"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
                fullWidth
                autoFocus
              />
            </Box>

            <Box sx={{ mb: 3 }}>
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
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={isSubmitting}
              sx={{ py: 1.5 }}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "دخول"
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default LoginForm;
