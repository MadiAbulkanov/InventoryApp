import { Link } from 'react-router-dom';
import { Typography, Grid, Button, TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useEffect } from 'react';
import { deleteCategory, fetchCategories } from '@/features/categories/categories.slice';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

export function CategoryPage() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categories);
  const errors = useAppSelector((state) => state.categories.errors);
  const message = useAppSelector((state) => state.categories.message);

  useEffect(() => {
    dispatch(fetchCategories()).unwrap().catch((error) => {
      console.error(error.message || 'Error while fetching categories');
    });
  }, [dispatch]);

  const categoryDelete = async (id: string) => {
    const resultAction = await dispatch(deleteCategory(id));
    if (!deleteCategory.fulfilled.match(resultAction)) {
      console.error(resultAction.error.message || 'Error while deleting category');
    } else {
      dispatch(fetchCategories());
    }
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container direction="row" justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h5">Categories</Typography>
        </Grid>
        <Grid item>
          <Button sx={{ border: '1px solid #ccc', padding: '7px 40px' }} component={Link} to={'/categories/new'}>
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
      {message && message.length > 0 && (
        <Grid item>
          <Typography color="error" variant="body1">
            {message.join(', ')}
          </Typography>
        </Grid>
      )}
      <Grid container item direction="row" spacing={4} justifyContent="center" marginTop="1px">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories?.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.id}</TableCell>
                  <TableCell>{category.title}</TableCell>
                  <TableCell>
                    <Grid item>
                      <Button
                        variant="contained"
                        endIcon={<SendIcon />}
                        sx={{ padding: '5px 10px', margin: '5px' }}
                        component={Link}
                        to={`/categories/${category.id}/edit`}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        endIcon={<DeleteIcon />}
                        sx={{ padding: '5px 10px', margin: '5px' }}
                        onClick={() => categoryDelete(category.id.toString())}
                      >
                        Delete
                      </Button>
                    </Grid>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}