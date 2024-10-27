import { Link } from 'react-router-dom';
import { Typography, Grid, Button, TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useEffect } from 'react';
import { deletePlace, fetchPlaces } from '@/features/places/places.slice';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

export function PlacePage() {
  const dispatch = useAppDispatch();
  const places = useAppSelector((state) => state.places.places);
  const errors = useAppSelector((state) => state.places.errors);
  const message = useAppSelector((state) => state.places.message);

  useEffect(() => {
    dispatch(fetchPlaces()).unwrap().catch((error) => {
      console.error(error.message || 'Error while fetching places');
    });
  }, [dispatch]);

  const placeDelete = async (id: string) => {
    const resultAction = await dispatch(deletePlace(id));
    if (!deletePlace.fulfilled.match(resultAction)) {
      console.error(resultAction.error.message || 'Error while deleting place');
    } else {
      dispatch(fetchPlaces());
    }
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container direction="row" justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h5">Places</Typography>
        </Grid>
        <Grid item>
          <Button sx={{ border: '1px solid #ccc', padding: '7px 40px' }} component={Link} to={'/places/new'}>
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
              {places?.map((place) => (
                <TableRow key={place.id}>
                  <TableCell>{place.id}</TableCell>
                  <TableCell>{place.title}</TableCell>
                  <TableCell>
                    <Grid item>
                      <Button variant="contained" endIcon={<SendIcon />}
                        sx={{ padding: '5px 10px', margin: '5px' }}
                        component={Link}
                        to={`/places/${place.id}/edit`}
                      >
                        Edit
                      </Button>
                      <Button variant="contained" endIcon={<DeleteIcon />}
                        sx={{ padding: '5px 10px', margin: '5px' }}
                        onClick={() => placeDelete(place.id.toString())}
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
