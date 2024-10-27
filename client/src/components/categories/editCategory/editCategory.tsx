import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { editCategory, fetchCategoryById } from '@/features/categories/categories.slice';
import { useNavigate, useParams } from 'react-router-dom';

interface State {
  title: string;
  description: string;
}

const EditCategory = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { selectedCategory, errors } = useAppSelector((state) => state.categories);

  const [state, setState] = useState<State>({
    title: '',
    description: '',
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchCategoryById(id)).unwrap().catch((error) => {
        console.error(error.message || 'Error while fetching categories by ID');
      });
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedCategory) {
      setState({
        title: selectedCategory.title,
        description: selectedCategory.description || '',
      });
    }
  }, [selectedCategory]);

  const submitFormItem = async (formData: FormData) => {
    if (id) {
      const resultAction = await dispatch(editCategory({ id, formData }));
      if (editCategory.fulfilled.match(resultAction)) {
        navigate('/categories');
      } else {
        console.error(resultAction.error.message || 'Error while editing category');
      }
    }
  };

  const submitFormHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: FormData = new FormData();
    Object.entries(state).forEach(([key, value]) => {
      formData.append(key, `${value}`);
    });
    submitFormItem(formData);
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Box component={'form'} autoComplete="off" onSubmit={submitFormHandler} paddingY={2}>
      <Typography variant="h6" textAlign="center" margin="15px">
        Edit category form
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
          {errors && errors.length > 0 && errors[0].messages.map((msg, index) => (
            <Grid item key={index}>
              <Typography p={1} color="error">
                {msg}
              </Typography>
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

export default EditCategory;