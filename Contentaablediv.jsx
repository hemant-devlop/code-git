//main page ui
'use client'
import { addToCart, clearCart } from '@/features/cartSlice';
import { useGetProductsQuery } from '@/services/productApi';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  // Fetch products via RTK Query
  const { data: products, error, isLoading } = useGetProductsQuery();
  // Read cart state via standard Redux selector
  const cartItems = useSelector((state) => state.cart.items);

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products.</p>;

  return (
    <div style={{ padding: '20px' }}>
      <header>
        <h1>My Store</h1>
        <p>
          <strong>Cart Items: {cartItems.length}</strong>
        </p>
        <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
      </header>
      
      <hr />

      <div style={{ display: 'grid', gap: '10px' }}>
        {products?.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <button onClick={() => dispatch(addToCart(product))}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

//productapi.js==================================


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }), // Using a free fake API
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => 'products',
    }),
  }),
});

// RTK Query automatically generates a hook for the endpoint
export const { useGetProductsQuery } = productApi;

//store persisting=============================

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { 
  persistStore, 
  persistReducer,
  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER 
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import { productApi } from './services/productApi';
import cartReducer from './features/cartSlice';

// 1. Combine reducers so we can whitelist specific ones
const rootReducer = combineReducers({
  [productApi.reducerPath]: productApi.reducer,
  cart: cartReducer,
});

// 2. Configure persistence
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'], // ONLY persist the cart slice. Ignore the API cache.
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 3. Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore persist actions from the serializable check
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(productApi.middleware),
});

export const persistor = persistStore(store);

//wrapper persisting ============================
'use client'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

const ReduxProvider = ({ children }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={<div>Loading saved data...</div>} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}
export default ReduxProvider;

//cart slice ============================

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // In a real app, you'd check if the item already exists and update quantity.
      // Keeping it minimal here:
      state.items.push(action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;