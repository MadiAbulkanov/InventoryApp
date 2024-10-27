import { useState, ChangeEvent, FormEvent } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useNavigate } from 'react-router-dom';
import { createCategory } from '@/features/categories/categories.slice';

interface CategoryState {
  title: string;
  description: string;
}

const CategoryForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const errors = useAppSelector((state) => state.categories.errors);
  const [state, setState] = useState<CategoryState>({
    title: '',
    description: '',
  });

  const submitFormHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: FormData = new FormData();
    Object.entries(state).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const resultAction = await dispatch(createCategory(formData));
    if (createCategory.fulfilled.match(resultAction)) {
      navigate('/categories');
    }
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Box component="form" autoComplete="off" onSubmit={submitFormHandler} paddingY={2}>
      <Typography variant="h6" textAlign="center" margin="15px">
        Add Category Form
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
        {errors.map((error, index) => (
          <Grid item key={index}>
            {error.messages.map((message, msgIndex) => (
              <Typography p={1} color="error" key={msgIndex}>
                {message}
              </Typography>
            ))}
          </Grid>
        ))}
        <Grid item xs>
          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CategoryForm;