import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Grid, Typography, Select, MenuItem } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

export default function EmailForm(props) {
  let location = useLocation();
  const defaultValues = {
    relationship: "",

  };
  const { register, handleSubmit, errors, control } = useForm({defaultValues});
  const onSubmit = data => {
    data.idocData = location.state;
    console.log(data);
  }

  return (
    <div className="App">
      <div className="idocForm">
        <h1>Freedom Generator</h1>
        <h5>Email Form</h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            justify="flex-start"
            direction="column"
            alignItems="flex-start"
            spacing={3}>
            <Grid
              item
              container
              direction="row"
              spacing={3}
            >
              <Grid item xs={6}>
                <Typography>
                  Email Address:
              </Typography>
              </Grid>
              <Grid item>
                <TextField
                  name="emailAddress"
                  size="small"
                  variant="outlined"
                  inputRef={register({
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "invalid",
                    }
                  })}
                />
                {errors.emailAddress && errors.emailAddress.type === "required" && <p className="error">Email address is required.</p>}
                {errors.emailAddress && errors.emailAddress.type === "pattern" && <p className="error">Invalid Email Address.</p>}
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction="row"
              spacing={3}
            >
              <Grid item xs={6}>
                <Typography>
                  What shelter will you provide for this individual?
              </Typography>
              </Grid>
              <Grid item>
                <TextField
                  name="shelter"
                  multiline={true}
                  inputRef={register({
                    required: true
                  })}
                  rows={4}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction="row"
              spacing={3}
            >
              <Grid item xs={6}>
                <Typography>
                  What is your relationship to this individual?
              </Typography>
              </Grid>
              <Grid item>
                <Controller 
                  as = {
                  <Select>
                    <MenuItem value="Mother">Mother</MenuItem>
                    <MenuItem value="Father">Father</MenuItem>
                  </Select>
                  }
                  name="relationship"
                  control={control}
                />
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction="row"
              spacing={3}
            >
              <Grid item xs={6}>
                <Typography>
                  What can you say to vouch for this person's character?
              </Typography>
              </Grid>
              <Grid item>
                <TextField
                  name="character"
                  multiline={true}
                  inputRef={register({
                    required: true
                  })}
                  rows={4}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Grid>
          <br />
          <br />
          <Button type="submit" variant="contained" >Preview Email</Button>
        </form>
      </div>
    </div>
  );
}