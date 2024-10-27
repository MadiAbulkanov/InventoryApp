import CategoryForm from '@/components/categories/categoryForm/categoryForm';
import { CategoryPage } from '@/components/categories/categoryPage/categoryPage';
import EditCategory from '@/components/categories/editCategory/editCategory';
import EditProduct from '@/components/items/editProduct/editProduct';
import ProductForm from '@/components/items/productForm/productForm';
import { ProductInformation } from '@/components/items/productInformation/productInformation';
import EditPlace from '@/components/places/editPlace/editPlace';
import PlaceForm from '@/components/places/placeForm/placeForm';
import { PlacePage } from '@/components/places/placePage/placePage';
import AppToolbar from '@/components/UI/AppToolbar/AppToolbar';
import { Products } from '@/containers/products/products';
import { Container, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <CssBaseline />
      <header>
        <AppToolbar />
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/items/new" element={<ProductForm />} />
            <Route path="/items/:id" element={<ProductInformation />} />
            <Route path="/items/:id/edit" element={<EditProduct />} />
            <Route path="/categories" element={<CategoryPage />} />
            <Route path="/categories/new" element={<CategoryForm />} />
            <Route path="/categories/:id/edit" element={<EditCategory />} />
            <Route path="/places" element={<PlacePage />} />
            <Route path="/places/new" element={<PlaceForm />} />
            <Route path="/places/:id/edit" element={<EditPlace />} />
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;