import { Link, useNavigate, useParams } from 'react-router-dom';
import { Typography, Grid, Button, CardMedia, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useEffect } from 'react';
import { deleteProduct, fetchProductById } from '@/features/products/prdoucts.slice';
import { apiURL } from '@/constants';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import imageNotAvalable from "@/assets/image/nopic.png";

export function ProductInformation() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { selectedItem, errors } = useAppSelector((state) => state.items);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  const itemDelet = async (id: string) => {
    const resultAction = await dispatch(deleteProduct(id));
    if (deleteProduct.fulfilled.match(resultAction)) {
      navigate('/');
    } else {
      console.error(resultAction.error.message || 'Error while deleting product');
    }
  };

  const cardImage = !selectedItem?.image ? imageNotAvalable : `${apiURL}/uploads/${selectedItem.image}`;

  return (
    <Box>
      <Grid item container direction="column" justifyContent="space-between" alignItems="center">
        <Grid item container direction="row" justifyContent="flex-end">
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            sx={{ padding: '5px 10px', margin: '5px' }}
            component={Link}
            to={`/items/${id}/edit`}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            endIcon={<DeleteIcon />}
            sx={{ padding: '5px 10px', margin: '5px' }}
            onClick={() => {
              if (typeof id === 'string') {
                itemDelet(id);
              }
            }}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
      <Typography variant="h4" textAlign="center" margin="15px">
        {selectedItem?.title}
      </Typography>
      <Grid container spacing={4} justifyContent="center" marginTop="1px">
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            image={cardImage}
            sx={{ objectFit: 'cover', objectPosition: 'center', width: '50%' }}
            alt={selectedItem?.title}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5">{selectedItem?.description}</Typography>
        </Grid>
      </Grid>
      <Box mt={4}>
        <Typography variant="h6" margin="15px">
          Category title: {selectedItem?.category?.title}
        </Typography>
        <Typography variant="h6" margin="15px">
          Place title: {selectedItem?.place?.title}
        </Typography>
      </Box>
      {errors && errors.length > 0 && (
        <Box mt={4}>
          {errors.map((error) => (
            <Typography key={error.type} color="error" variant="body1">
              {error.messages.join(', ')}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
}