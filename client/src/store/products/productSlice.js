import { createSlice } from "@reduxjs/toolkit";
import { getNewProducts } from "./asyncActions";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    newProducts: null,
    errorMessage: "",
    dealDaily: null,
  },
  reducers: {
    getDealDaily: (state, action) => {
      state.dealDaily = action.payload;
    },
  },
  //Code logic xử lý async action
  extraReducers: (builder) => {
    // Bắt đầu thực hiện action (Promise pending)
    builder.addCase(getNewProducts.pending, (state) => {
      state.isLoading = true;
    });
    // Khi thực hiện action thành công (Promise fulfilled)
    builder.addCase(getNewProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.newProducts = action.payload;
    });
    // Khi thực hiện action thất bại (Promise rejected)
    builder.addCase(getNewProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });
  },
});

export const { getDealDaily } = productSlice.actions;

export default productSlice.reducer;
