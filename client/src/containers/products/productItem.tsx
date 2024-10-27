import { Link } from 'react-router-dom';
import {
  Card,
  CardMedia,
  Button,
  Box,
  CardContent,
  Typography,
  CardActions,
} from '@mui/material';
import { Product } from '@/interfaces/product.interface';
import { apiURL } from '@/constants';
import SendIcon from '@mui/icons-material/Send';
import imageNotAvalable from "@/assets/image/nopic.png";

interface Props {
  item: Product;
}

export function ProductItem({ item }: Props) {
  const { id, title, image, } = item;
 
  const cardImage = image ? `${apiURL}/uploads/${image}` : imageNotAvalable;
  
  return (
      <Card sx={{  display: 'flex', width: 400, padding: 1 }} >
        <CardMedia
          component="img"
          image={cardImage}
          sx={{ objectFit: 'cover', objectPosition: 'center', width: '40%' }}
          alt={title}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }} >
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography gutterBottom variant="h5" component="div">{title}</Typography>
            <CardActions>
              <Button variant="contained" endIcon={<SendIcon />}  sx={{ padding: '5px 10px', margin: '5px' }} component={Link} to={`/items/${id}`} >
                Open
              </Button>
              <Button variant="contained" endIcon={<SendIcon />} sx={{ padding: '5px 10px', margin: '5px' }} component={Link} to={`/items/${id}/edit`}>
                Edit
              </Button>
            </CardActions>
          </CardContent>
        </Box>
      </Card>
  );
}
