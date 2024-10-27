import { Link } from 'react-router-dom';
import { Typography, Grid, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useEffect } from 'react';
import { fetchProducts } from '@/features/products/prdoucts.slice';
import { ProductItem } from '@/containers/products/productItem';

export function Products() {
  const dispatch = useAppDispatch();

  const { items, errors } = useAppSelector((state) => state.items);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container direction="row" justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h5">All items</Typography>
        </Grid>
        <Grid item>
          <Button variant="outlined" sx={{ border: '1px solid #ccc', padding: '7px 40px'}} component={Link} to={'/items/new'}>
            Add
          </Button>
        </Grid>
      </Grid>
      {errors && errors.length > 0 && (
        <Grid item>
          <Typography color="error" variant="body1">
            {errors.map((error) => error.messages.join(', ')).join(', ')}
          </Typography>
        </Grid>
      )}
      <Grid container item direction="row" spacing={4} marginTop= "1px">
        {items?.map((productItem) => (
          <Grid item xs={12} sm={6 } key={productItem.id} container justifyContent="center">
            <ProductItem item={productItem} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
