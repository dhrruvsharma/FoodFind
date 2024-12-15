# Food Product List Application Solution

## Overview
This project is a web application that displays food products fetched from the [OpenFoodFacts API](https://world.openfoodfacts.org/). The solution includes several features to enhance the user experience, such as searching, filtering, sorting, and viewing product details. It also ensures a responsive design that works seamlessly on both mobile and desktop devices.

## Features Implemented

### 1. **Product List Display**
   - The app fetches a list of food products from the OpenFoodFacts API.
   - Each product displays the following key information:
     - **Product Name**
     - **Product Image**
   - The product list supports **pagination** using infinite scroll.

### 2. **Search Functionality**
   - A search bar on the homepage allows users to search for food products by name and dropdown menus for filters. 
   - As the user types, new product list is fetched and debouncing is implemented on this search.

### 3. **Barcode Search**
   - A second search bar is available to search food products by their **Barcode**.
   - When a barcode is entered, the user is redirected to the item with the code.

### 4. **Category Filter**
   - A filter dropdown or sidebar allows users to filter products by category (e.g., beverages, dairy, snacks).

### 5. **Sort Functionality**
   - Users can sort the displayed food products by:
     - **Product Name**
     - **Nutrition Grade**
   - The sorting is done through the API for efficient data retrieval.

### 6. **Product Detail Page**
   - Clicking on a product redirects users to a detailed product page, where the following information is displayed:
     - **Product Image**
     - **Full list of ingredients**
     - **Nutritional values**
     - **Labels** 

### 7. **Responsive Design**
   - The entire application is designed to be fully **responsive** and adapts well to both **mobile** and **desktop** screen sizes.
   - The layout is optimized for smooth usability across devices.

## Technical Details

- **API Integration:** The OpenFoodFacts API is integrated using `axios` to fetch product data.
- **State Management:** The application’s state is managed using the `useContext` hook to handle global states such as the list of products, search results, and filters.
- **Styling:** The UI is designed using **CSS** with a focus on simplicity and responsiveness. No CSS frameworks like Bootstrap are used.
- **Routing:** **React Router DOM** is used to handle navigation between the product list and product detail pages.
- **Sorting:** Sorting of the product list is handled by making requests to the OpenFoodFacts API with the required parameters.
