import React from "react";
import { Box, Grid, Typography, Button, MenuItem } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import VoiceInput from "../ui/VoiceInput";

const CustomerSchema = Yup.object().shape({
  name: Yup.string().required("اسم العميل مطلوب"),
  phone: Yup.string()
    .required("رقم الهاتف مطلوب")
    .matches(/^01[0125][0-9]{8}$/, "رقم هاتف غير صحيح"),
  customerType: Yup.string().required("نوع العميل مطلوب"),
});

const CustomerForm = ({ initialValues, onSubmit, onCancel }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        {initialValues._id ? "تعديل بيانات العميل" : "عميل جديد"}
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={CustomerSchema}
        onSubmit={onSubmit}
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
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <VoiceInput
                  name="name"
                  label="اسم العميل"
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
                  name="phone"
                  label="رقم الهاتف"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.phone && Boolean(errors.phone)}
                  helperText={touched.phone && errors.phone}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <VoiceInput
                  name="address"
                  label="العنوان"
                  value={values.address || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  multiline
                  rows={2}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  name="customerType"
                  label="نوع العميل"
                  value={values.customerType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.customerType && Boolean(errors.customerType)}
                  helperText={touched.customerType && errors.customerType}
                  fullWidth
                >
                  <MenuItem value="normal">عميل عادي</MenuItem>
                  <MenuItem value="wholesale">موزع</MenuItem>
                  <MenuItem value="company">شركة</MenuItem>
                </TextField>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 1,
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

CustomerForm.defaultProps = {
  initialValues: {
    name: "",
    phone: "",
    address: "",
    customerType: "normal",
  },
};

export default CustomerForm;
