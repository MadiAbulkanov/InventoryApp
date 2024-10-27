import { AppBar, Box, Grid, styled, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)(() => ({
  color: 'inherit',
  textDecoration: 'none',
  padding: '5px',
  ['&:hover']: {
    color: 'inherit',
  },
}));

const AppToolbar = () => {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center',}} >
          <Typography variant='h6' component={StyledLink} to={'/'}>
            Inventory APP
          </Typography>
          <Grid >
            <Typography padding={2} component={StyledLink} to={'/'}>
            Items
          </Typography>
          <Typography padding={2} component={StyledLink} to={'/categories'}>
            Categories
          </Typography>
          <Typography padding={2} component={StyledLink} to={'/places'}>
            Places
          </Typography>
          </Grid>
          
        </Toolbar>
      </AppBar>
      <Box component={Toolbar} marginBottom={2} />
    </>
  );
};

export default AppToolbar;
