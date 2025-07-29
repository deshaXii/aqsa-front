import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Switch,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import VoiceInput from "../ui/VoiceInput";
import PasswordInput from "../ui/PasswordInput";
import { useSnackbar } from "notistack";

const TechnicianSchema = Yup.object().shape({
  name: Yup.string().required("اسم الفني مطلوب"),
  username: Yup.string()
    .required("اسم المستخدم مطلوب")
    .min(4, "يجب أن يكون اسم المستخدم على الأقل 4 أحرف")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "يمكن أن يحتوي فقط على أحرف وأرقام وشرطة سفلية"
    ),
  password: Yup.string().when("_id", {
    is: undefined,
    then: Yup.string()
      .required("كلمة المرور مطلوبة")
      .min(6, "يجب أن تكون كلمة المرور على الأقل 6 أحرف"),
    otherwise: Yup.string().notRequired(),
  }),
});

const TechnicianForm = ({ initialValues, onSubmit, onCancel }) => {
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        {initialValues._id ? "تعديل بيانات الفني" : "إضافة فني جديد"}
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={TechnicianSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await onSubmit(values);
            enqueueSnackbar(
              initialValues._id
                ? "تم تحديث بيانات الفني"
                : "تم إضافة الفني بنجاح",
              { variant: "success" }
            );
          } catch (error) {
            enqueueSnackbar(error.message, { variant: "error" });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
          setFieldValue,
        }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <VoiceInput
                  name="name"
                  label="اسم الفني"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <VoiceInput
                  name="username"
                  label="اسم المستخدم"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                  fullWidth
                  disabled={!!initialValues._id}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <PasswordInput
                  name="password"
                  label={
                    initialValues._id
                      ? "كلمة مرور جديدة (اختياري)"
                      : "كلمة المرور"
                  }
                  value={values.password || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <VoiceInput
                  name="specialization"
                  label="التخصص (اختياري)"
                  value={values.specialization || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  الصلاحيات:
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={4} md={3}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={values.canReceive || false}
                          onChange={(e) =>
                            setFieldValue("canReceive", e.target.checked)
                          }
                          name="canReceive"
                          color="primary"
                        />
                      }
                      label="استلام أجهزة"
                    />
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={values.canAdd || false}
                          onChange={(e) =>
                            setFieldValue("canAdd", e.target.checked)
                          }
                          name="canAdd"
                          color="primary"
                        />
                      }
                      label="إضافة صيانة"
                    />
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={values.canEdit || false}
                          onChange={(e) =>
                            setFieldValue("canEdit", e.target.checked)
                          }
                          name="canEdit"
                          color="primary"
                        />
                      }
                      label="تعديل صيانة"
                    />
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={values.canDelete || false}
                          onChange={(e) =>
                            setFieldValue("canDelete", e.target.checked)
                          }
                          name="canDelete"
                          color="primary"
                        />
                      }
                      label="حذف صيانة"
                    />
                  </Grid>
                  <Grid item xs={6} sm={4} md={3}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={values.isAdmin || false}
                          onChange={(e) =>
                            setFieldValue("isAdmin", e.target.checked)
                          }
                          name="isAdmin"
                          color="secondary"
                        />
                      }
                      label="مدير النظام"
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={values.active !== false}
                      onChange={(e) =>
                        setFieldValue("active", e.target.checked)
                      }
                      name="active"
                      color="primary"
                    />
                  }
                  label="الحساب مفعل"
                />
              </Grid>

              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                  mt: 2,
                }}
              >
                <Button variant="outlined" onClick={onCancel} sx={{ px: 4 }}>
                  إلغاء
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{ px: 4 }}
                >
                  {isSubmitting ? <CircularProgress size={24} /> : "حفظ"}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

TechnicianForm.defaultProps = {
  initialValues: {
    name: "",
    username: "",
    password: "",
    canReceive: false,
    canAdd: false,
    canEdit: false,
    canDelete: false,
    isAdmin: false,
    active: true,
    specialization: "",
  },
};

export default TechnicianForm;
