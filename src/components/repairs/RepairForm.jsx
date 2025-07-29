import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import VoiceInput from "../ui/VoiceInput";
import { getCustomers } from "../../services/api";
import { DatePicker } from "@mui/x-date-pickers";

const RepairSchema = Yup.object().shape({
  deviceType: Yup.string().required("نوع الجهاز مطلوب"),
  fault: Yup.string().required("وصف العطل مطلوب"),
  price: Yup.number()
    .required("السعر مطلوب")
    .min(0, "يجب أن يكون السعر موجبًا"),
  customer: Yup.string().required("العميل مطلوب"),
});

const RepairForm = ({
  initialValues = {
    customer: "",
    deviceType: "",
    fault: "",
    color: "",
    price: 0,
    wholesalePrice: 0,
    expectedCompletionDate: null,
  },
  onSubmit,
  onCancel,
}) => {
  const [customers, setCustomers] = useState([]);
  const [loadingCustomers, setLoadingCustomers] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getCustomers();
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoadingCustomers(false);
      }
    };
    fetchCustomers();
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        {initialValues._id ? "تعديل بيانات الصيانة" : "إضافة صيانة جديدة"}
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={RepairSchema}
        onSubmit={onSubmit}
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
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  select
                  name="customer"
                  label="العميل"
                  value={values.customer}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.customer && Boolean(errors.customer)}
                  helperText={touched.customer && errors.customer}
                  fullWidth
                  disabled={loadingCustomers}
                >
                  {loadingCustomers ? (
                    <MenuItem>جاري تحميل العملاء...</MenuItem>
                  ) : (
                    customers.map((customer) => (
                      <MenuItem key={customer._id} value={customer._id}>
                        {customer.name} - {customer.phone}
                      </MenuItem>
                    ))
                  )}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  name="deviceType"
                  label="نوع الجهاز"
                  value={values.deviceType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.deviceType && Boolean(errors.deviceType)}
                  helperText={touched.deviceType && errors.deviceType}
                  fullWidth
                >
                  <MenuItem value="mobile">موبايل</MenuItem>
                  <MenuItem value="laptop">لابتوب</MenuItem>
                  <MenuItem value="tablet">تابلت</MenuItem>
                  <MenuItem value="desktop">كمبيوتر</MenuItem>
                  <MenuItem value="other">أخرى</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <VoiceInput
                  name="color"
                  label="لون الجهاز"
                  value={values.color || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <VoiceInput
                  name="fault"
                  label="وصف العطل"
                  value={values.fault}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.fault && Boolean(errors.fault)}
                  helperText={touched.fault && errors.fault}
                  fullWidth
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <VoiceInput
                  name="price"
                  label="سعر الصيانة"
                  type="number"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.price && Boolean(errors.price)}
                  helperText={touched.price && errors.price}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <VoiceInput
                  name="wholesalePrice"
                  label="سعر الجملة (إن وجد)"
                  type="number"
                  value={values.wholesalePrice || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DatePicker
                  label="تاريخ التسليم المتوقع"
                  value={values.expectedCompletionDate || null}
                  onChange={(date) =>
                    setFieldValue("expectedCompletionDate", date)
                  }
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
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

export default RepairForm;
