import { useState, ChangeEvent, FormEvent } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useNavigate } from 'react-router-dom';
import { createPlace } from '@/features/places/places.slice';


interface State {
  title: string;
  description: string;
}

const PlaceForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const errors = useAppSelector((state) => state.places.errors);
  const [state, setState] = useState<State>({
    title: '',
    description: '',
  });

  const submitFormHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: FormData = new FormData();
    Object.entries(state).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const resultAction = await dispatch(createPlace(formData));
    if (createPlace.fulfilled.match(resultAction)) {
      navigate('/places');
    }
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Box component={'form'} autoComplete="off" onSubmit={submitFormHandler} paddingY={2}>
      <Typography variant="h6" textAlign="center" margin="15px">
        Add place form
      </Typography>
      <Grid container direction="column" spacing={2}>
        <Grid item xs container direction="row" justifyContent="flex-start" alignItems="center">
          <Grid item>
            <Typography variant="h6" style={{ width: '150px' }}>
              Title
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              style={{ width: '300px' }}
              variant="outlined"
              id="title"
              label="Title"
              value={state.title}
              onChange={inputChangeHandler}
              name="title"
            />
          </Grid>
          {errors.map((error, index) => (
            <Grid item key={index}>
              {error.messages.map((message, msgIndex) => (
                <Typography p={1} color="error" key={msgIndex}>
                  {message}
                </Typography>
              ))}
            </Grid>
          ))}
        </Grid>
        <Grid item xs container direction="row" justifyContent="flex-start" alignItems="center">
          <Grid item>
            <Typography variant="h6" style={{ width: '150px' }}>
              Description
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              style={{ width: '300px' }}
              multiline
              rows={3}
              variant="outlined"
              id="description"
              label="Description"
              value={state.description}
              onChange={inputChangeHandler}
              name="description"
            />
          </Grid>
        </Grid>
        <Grid item xs>
          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlaceForm;
