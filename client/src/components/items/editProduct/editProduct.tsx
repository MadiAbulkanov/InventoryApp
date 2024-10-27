import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Box, Button, CardMedia, Grid, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import FileInput from '@/components/UI/Form/FileInput';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchCategories } from '@/features/categories/categories.slice';
import { fetchPlaces } from '@/features/places/places.slice';
import { editProduct, fetchProductById } from '@/features/products/prdoucts.slice';
import { useNavigate, useParams } from 'react-router-dom';
import { apiURL } from '@/constants';
import imageNotAvalable from "@/assets/image/nopic.png";

interface State {
  title: string;
  description: string;
  image: string | File;
  categoryId: string | number;
  placeId: string | number;
}

const EditProduct = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { selectedItem, errors } = useAppSelector((state) => state.items);
  const { categories } = useAppSelector((state) => state.categories);
  const { places } = useAppSelector((state) => state.places);

  const [state, setState] = useState<State>({
    title: '',
    description: '',
    image: '',
    categoryId: '',
    placeId: '',
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id)).unwrap().catch((error) => {
        console.error(error.message || 'Error while fetching product by ID');
      });
      dispatch(fetchCategories()).unwrap().catch((error) => {
        console.error(error.message || 'Error while fetching categories by ID');
      });
      dispatch(fetchPlaces()).unwrap().catch((error) => {
        console.error(error.message || 'Error while fetching places by ID');
      });
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedItem) {
      const cardImage = selectedItem.image ? `${apiURL}/uploads/${selectedItem.image}` : imageNotAvalable;

      setState({
        title: selectedItem.title,
        description: selectedItem.description || '',
        image: cardImage,
        categoryId: selectedItem.categoryId || '',
        placeId: selectedItem.placeId || '',
      });
    }
  }, [selectedItem]);

  const submitFormItem = async (formData: FormData) => {
    if (id) {
      const resultAction = await dispatch(editProduct({ id, formData }));
      if (editProduct.fulfilled.match(resultAction)) {
        navigate('/');
      } else {
        console.error(resultAction.error.message || 'Error while editing product');
      }
    }
  };

  const submitFormHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(state).forEach(([key, value]) => {
      if (key === 'image') {
        if (value instanceof File) {
          formData.append(key, value);
        }
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

  return (
    <Box component={'form'} autoComplete="off" onSubmit={submitFormHandler} paddingY={2}>
      <Typography variant="h6" textAlign="center" margin="15px">
        Edit item form
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
              error={!!errors.length}
              helperText={errors.map((error) => error.messages.join(', ')).join(', ')}
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
              Image preview
            </Typography>
          </Grid>
          <Grid item>
            <CardMedia
              component="img"
              height={'100%'}
              width={'100%'}
              image={state.image instanceof File ? URL.createObjectURL(state.image) : state.image}
              sx={{ objectFit: 'cover', objectPosition: 'center' }}
              alt={state.title}
            />
          </Grid>
        </Grid>
        <Grid item xs container direction="row" justifyContent="flex-start" alignItems="center">
          <Grid item>
            <Typography variant="h6" style={{ width: '150px' }}>
              Category
            </Typography>
          </Grid>
          <Grid item>
            <Select
              variant="outlined"
              value={state.categoryId || ''}
              onChange={selectChangeHandler}
              name="category"
              style={{ width: '300px' }}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.title}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <Grid item xs container direction="row" justifyContent="flex-start" alignItems="center">
          <Grid item>
            <Typography variant="h6" style={{ width: '150px' }}>
              Place
            </Typography>
          </Grid>
          <Grid item>
            <Select
              variant="outlined"
              value={state.placeId || ''}
              onChange={selectChangeHandler}
              name="place"
              style={{ width: '300px' }}
            >
              {places.map((place) => (
                <MenuItem key={place.id} value={place.id}>
                  {place.title}
                </MenuItem>
              ))}
            </Select>
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

export default EditProduct;