# API Documentation

This documentation provides an overview of the API for managing categories, places, and items. The API supports creating, reading, updating, and deleting (CRUD) operations for these resources.

## Base URL

The base URL for the API is: `http://localhost:8000`

## Endpoints

### Categories

- **GET /categories**
  - Description: Retrieve a list of all categories. The response will include only the `id` and `title` fields.
  - Response:
    ```json
    [
      {
        "id": 1,
        "title": "Electronics"
      },
      {
        "id": 2,
        "title": "Books"
      }
    ]
    ```

- **GET /categories/:id**
  - Description: Retrieve a specific category by ID.
  - Response:
    ```json
    {
      "id": 1,
      "title": "Electronics",
      "description": "Devices and gadgets"
    }
    ```

- **POST /categories**
  - Description: Create a new category.
  - Request:
    ```json
    {
      "title": "New Category",
      "description": "Description of the new category"
    }
    ```
  - OR Request (multipart/form-data):
    ```
    title=New Category
    description=Description of the new category
    ```

  - Response:
    ```json
    {
      "id": 3,
      "title": "New Category",
      "description": "Description of the new category"
    }
    ```

- **DELETE /categories/:id**
  - Description: Delete a specific category by ID. If the category has related resources, deletion is prohibited.
  - Response:
    ```json
    {
      "message": "Category deleted successfully"
    }
    ```

- **PUT /categories/:id**
  - Description: Update a specific category by ID.
  - Request:
    ```json
    {
      "title": "Updated Category",
      "description": "Updated description of the category"
    }
    ```
  - OR Request (multipart/form-data):
    ```
    title=Updated Category
    description=Updated description of the category
    ```

  - Response:
    ```json
    {
      "id": 1,
      "title": "Updated Category",
      "description": "Updated description of the category"
    }
    ```

### Places

- **GET /places**
  - Description: Retrieve a list of all places. The response will include only the `id` and `title` fields.
  - Response:
    ```json
    [
      {
        "id": 1,
        "title": "Warehouse 1"
      },
      {
        "id": 2,
        "title": "Storefront"
      }
    ]
    ```

- **GET /places/:id**
  - Description: Retrieve a specific place by ID.
  - Response:
    ```json
    {
      "id": 1,
      "title": "Warehouse 1",
      "description": "Main storage facility"
    }
    ```

- **POST /places**
  - Description: Create a new place.
  - Request:
    ```json
    {
      "title": "New Place",
      "description": "Description of the new place"
    }
    ```
  - OR request (multipart/form-data):
    ```
    title=New Place
    description=Description of the new place
    ```

  - Response:
    ```json
    {
      "id": 3,
      "title": "New Place",
      "description": "Description of the new place"
    }
    ```

- **DELETE /places/:id**
  - Description: Delete a specific place by ID. If the place has related resources, deletion is prohibited.
  - Response:
    ```json
    {
      "message": "Place deleted successfully"
    }
    ```

- **PUT /places/:id**
  - Description: Update a specific place by ID.
  - Request:
    ```json
    {
      "title": "Updated Place",
      "description": "Updated description of the place"
    }
    ```
  - OR request (multipart/form-data):
    ```
    title=Updated Place
    description=Updated description of the place
    ```
    
  - Response:
    ```json
    {
      "id": 1,
      "title": "Updated Place",
      "description": "Updated description of the place"
    }
    ```

### Items

- **GET /items**
  - Description: Retrieve a list of all items. The response will include only the `id`, `title`, and `image` fields.
  - Response:
    ```json
    [
      {
        "id": 1,
        "title": "Laptop",
        "image": "laptop.jpg"
      },
      {
        "id": 2,
        "title": "Novel",
        "image": null
      }
    ]
    ```

- **GET /items/:id**
  - Description: Retrieve a specific item by ID.
  - Response:
    ```json
    {
      "id": 1,
      "title": "Laptop",
      "description": "15 inch gaming laptop",
      "image": "laptop.jpg",
      "categoryId": 1,
      "placeId": 1
    }
    ```

- **POST /items**
  - Description: Create a new item.
  - Request (multipart/form-data):
    ```
    title=Laptop
    description=15 inch gaming laptop
    categoryId=1
    placeId=1
    image=@laptop.jpg
    ```
  - Response:
    ```json
    {
      "id": 3,
      "title": "Laptop",
      "description": "15 inch gaming laptop",
      "image": "laptop.jpg",
      "categoryId": 1,
      "placeId": 1
    }
    ```

- **DELETE /items/:id**
  - Description: Delete a specific item by ID. If the item has related resources, deletion is prohibited.
  - Response:
    ```json
    {
      "message": "Item deleted successfully"
    }
    ```

- **PUT /items/:id**
  - Description: Update a specific item by ID.
  - Request (multipart/form-data):
    ```
    title=Updated Laptop
    description=Updated description
    categoryId=1
    placeId=1
    image=@updated_laptop.jpg
    ```
  - Response:
    ```json
    {
      "id": 1,
      "title": "Updated Laptop",
      "description": "Updated description",
      "image": "updated_laptop.jpg",
      "categoryId": 1,
      "placeId": 1
    }
    ```

## Error Handling

All errors are returned with an appropriate status code and a message explaining the error.