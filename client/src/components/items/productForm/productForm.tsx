import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import FileInput from '@/components/UI/Form/FileInput';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchCategories } from '@/features/categories/categories.slice';
import { fetchPlaces } from '@/features/places/places.slice';
import { createProduct } from '@/features/products/prdoucts.slice';
import { useNavigate } from 'react-router-dom';

interface State {
  title: string;
  description: string;
  image: string;
  categoryId: string | number;
  placeId: string | number;
}

const ProductForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { categories } = useAppSelector((state) => state.categories);
  const { places } = useAppSelector((state) => state.places);
  const { errors: productErrors } = useAppSelector((state) => state.items);

  const [state, setState] = useState<State>({
    title: '',
    description: '',
    image: '',
    categoryId: '',
    placeId: '',
  });

  useEffect(() => {
    dispatch(fetchCategories()).unwrap().catch((error) => {
      console.error(error.message || 'Error while fetching categories');
    });
    dispatch(fetchPlaces()).unwrap().catch((error) => {
      console.error(error.message || 'Error while fetching places');
    });
  }, [dispatch]);


  const submitFormItem = async (formData: FormData) => {
    const resultAction = await dispatch(createProduct(formData));
    if (createProduct.fulfilled.match(resultAction)) {
      navigate('/');
    } else {
      console.error(resultAction.error.message || 'Error while creating product');
    }
  };

  const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: FormData = new FormData();
    Object.entries(state).forEach(([key, value]) => {
      if (typeof value === 'object') {
        formData.append(key, value);
      } else {
        formData.append(key, `${value}`);
      }
    });
    submitFormItem(formData);
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) {
      const { name } = e.target;
      setState((prevState) => ({ ...prevState, [name]: file }));
    }
  };

  const selectChangeHandler = (e: SelectChangeEvent<string | number>) => {
    const { name, value } = e.target;

    setState((prevState) => ({
      ...prevState,
      [name === 'category' ? 'categoryId' : 'placeId']: value,
    }));
  };

  const getErrorMessages = (type: string) => {
    const error = productErrors.find((err) => err.type === type);
    return error ? error.messages.join(', ') : '';
  };

  return (
    <Box component={'form'} autoComplete="off" onSubmit={submitFormHandler} paddingY={2}>
      <Typography variant="h6" textAlign="center" margin="15px">
        Add item form
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
              error={!!getErrorMessages('title')}
              helperText={getErrorMessages('title')}
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
        <Grid item xs container direction="row" justifyContent="flex-start" alignItems="center">
          <Grid item>
            <Typography variant="h6" style={{ width: '150px' }}>
              Image
            </Typography>
          </Grid>
          <Grid item>
            <FileInput label="Image" name="image" onChange={fileChangeHandler} />
          </Grid>
        </Grid>
        <Grid item xs container direction="row" justifyContent="flex-start" alignItems="center">
          <Grid item>
            <Typography variant="h6" style={{ width: '150px' }}>
              Category
            </Typography>
          </Grid>
          <FormControl variant="outlined" style={{ width: '300px' }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category-select"
              value={state.categoryId || ''}
              onChange={selectChangeHandler}
              label="Category"
              name="category"
              error={!!getErrorMessages('categoryId')}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.title}
                </MenuItem>
              ))}
            </Select>
            {getErrorMessages('categoryId') && (
              <Typography p={1} color="error">
                {getErrorMessages('categoryId')}
              </Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs container direction="row" justifyContent="flex-start" alignItems="center">
          <Grid item>
            <Typography variant="h6" style={{ width: '150px' }}>
              Place
            </Typography>
          </Grid>
          <FormControl variant="outlined" style={{ width: '300px' }}>
            <InputLabel id="place-label">Place</InputLabel>
            <Select
              labelId="place-label"
              id="place-select"
              value={state.placeId || ''}
              onChange={selectChangeHandler}
              label="Place"
              name="place"
              error={!!getErrorMessages('placeId')}
            >
              {places.map((place) => (
                <MenuItem key={place.id} value={place.id}>
                  {place.title}
                </MenuItem>
              ))}
            </Select>
            {getErrorMessages('placeId') && (
              <Typography p={1} color="error">
                {getErrorMessages('placeId')}
              </Typography>
            )}
          </FormControl>
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

export default ProductForm;