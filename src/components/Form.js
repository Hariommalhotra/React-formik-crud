import React, { useEffect } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  FormControl,
  FormLabel,
  Grid,
  FormHelperText,
  Container,
  InputLabel
} from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const MyForm = ({ onSubmit, isEditing, editingRow }) => {
  const validateForm = (values) => {
    const errors = {};
    if (!values.name) errors.name = 'Required';
    if (!values.age) errors.age = 'Required';
    if (!values.country) errors.country = 'Required';
    if (!values.email) errors.email = 'Required';
    if (!values.phoneNumber) errors.phoneNumber = 'Required';
    if (!values.favoriteColor) errors.favoriteColor = 'Required';
    return errors;
  };


  const errorMessageStyle = {
    color: 'red',
  };
  var initialValues = isEditing ? editingRow : {
      name: '',
      age: '',
      gender: 'male',
      country: '',
      email: '',
      phoneNumber: '',
      favoriteColor: '',
    };
  console.log(initialValues,'iValues');

  console.log(isEditing,editingRow,'editingRow in form');
  
  
  return (
    <Formik  enableReinitialize initialValues = {initialValues} onSubmit={onSubmit} validate={validateForm}>
      {({ values , handleChange }) => (
        console.log(values,'values'),
        <Form id='myForm'>
          <Container>
            <Grid container spacing={2}> 
            <Grid item xs={12} sm={12}><h2>Form for CRUD</h2></Grid>
              <Grid item xs={12} sm={4}>
                <Field
                  as={TextField}
                  label="Name"
                  name="name"
                  fullWidth
                  margin="normal"
                  size="small"
                />
                <ErrorMessage style={errorMessageStyle} name="name" component={FormHelperText} />
              </Grid>
            <Grid item xs={12} sm={4}>
              <Field
                as={TextField}
                label="Age"
                name="age"
                type="number"
                fullWidth
                margin="normal"
                size="small"
              />
              <ErrorMessage style={errorMessageStyle} name="age" component={FormHelperText} />
            </Grid>
            <Grid item xs={12} sm={4} sx={{ mt: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="country-label">Country</InputLabel>
                <Field
                  as={Select}
                  labelId="country-label"
                  id="country"
                  name="country"
                  value={values.country}
                  onChange={handleChange}
                  size="small"
                >
                  <MenuItem value="india">India</MenuItem>
                  <MenuItem value="japan">Japan</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Field>
                <ErrorMessage  style={errorMessageStyle} name="country" component={FormHelperText} />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Field
                as={TextField}
                label="Email"
                name="email"
                type="email"
                fullWidth
                margin="normal"
                size="small"
              />
              <ErrorMessage  style={errorMessageStyle} name="email" component={FormHelperText} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Field
                as={TextField}
                label="Phone Number"
                name="phoneNumber"
                type="tel"
                fullWidth
                margin="normal"
                size="small"
              />
              <ErrorMessage  style={errorMessageStyle} name="phoneNumber" component={FormHelperText} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Field
                as={TextField}
                label="Favorite Color"
                name="favoriteColor"
                fullWidth
                margin="normal"
                size="small"
              />
               <ErrorMessage  style={errorMessageStyle} name="favoriteColor" component={FormHelperText} />
            </Grid>
          </Grid>
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Gender</FormLabel>
            <Field as={RadioGroup} name="gender" row>
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </Field>
          </FormControl>
          <Grid item xs={12} sm={4}>
            { isEditing?<Button type="submit"  variant="contained" color="primary">
              Update
            </Button>
            :
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
        }        </Grid>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
