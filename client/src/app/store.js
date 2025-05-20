import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import animalReducer from "./features/animalSlice";
import feedStockReducer from "./features/feedStockSlice";
import flockReducer from "./features/flockSlice";
import feedReducer from "./features/feedSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    animal: animalReducer,
    feedStock: feedStockReducer,
    flock: flockReducer,
    feed: feedReducer,
  },
});

export default store;
