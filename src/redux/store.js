import {configureStore} from "@reduxjs/toolkit";
import {rowApi} from "./rowApi";

export const store = configureStore({
  reducer:{
      [rowApi.reducerPath]: rowApi.reducer,
  },
  middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(rowApi.middleware)
})