import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import feriaApi from "../interceptors/feriaInterceptor";

const initialState = {
  fruitsVegetables: [],
  fruitVegetableActive: null,
  error: null,
  loading: true,
  loadingActive: true,
  loadingAction: false,
};

export const getFruitsAndVegetables = createAsyncThunk(
  "fruitsVegetables/getAll",
  async ({}, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await feriaApi.get("/admin/fruits_vegetables");

      return data.fruitsVegetables;
    } catch (e) {
      return rejectWithValue(
        e.response.data?.err
          ? e.response.data.err.fields
            ? { ...e.response.data.err, message: "Verifica los campos" }
            : e.response.data.err
          : {
              message: "Ha ocurrido un error, intenta más tarde",
            }
      );
    }
  }
);

export const createFruitVegetable = createAsyncThunk(
  "fruitsVegetables/create",
  async ({ fruitVegetable }, { rejectWithValue, dispatch }) => {
    try {
      await feriaApi.post("/admin/fruits_vegetables", { ...fruitVegetable });
    } catch (e) {
      return rejectWithValue(
        e.response.data?.err
          ? {
              ...e.response.data.err,
              message: { type: "error", message: "Verifica los campos" },
            }
          : {
              message: {
                type: "error",
                message: "Ha ocurrido un error, intenta más tarde",
              },
            }
      );
    }
  }
);

export const activeFruitVegetable = createAsyncThunk(
  "fruitsVegetables/active",
  async ({ fruit_vegetable_id }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await feriaApi.get(
        "/admin/fruits_vegetables/" + fruit_vegetable_id
      );

      return data.fruitVegetable;
    } catch (e) {
      return rejectWithValue(
        e.response.data?.err
          ? e.response.data.err.fields
            ? { ...e.response.data.err, message: "Verifica los campos" }
            : e.response.data.err
          : {
              message: "Ha ocurrido un error, intenta más tarde",
            }
      );
    }
  }
);

export const updateFruitVegetable = createAsyncThunk(
  "fruitsVegetables/update",
  async ({ fruitVegetable }, { rejectWithValue, dispatch }) => {
    try {
      await feriaApi.put(`/admin/fruits_vegetables/${fruitVegetable.id}`, {
        ...fruitVegetable,
      });

      return true;
    } catch (e) {
      return rejectWithValue(
        e.response.data?.err
          ? {
              ...e.response.data.err,
              message: { type: "error", message: "Verifica los campos" },
            }
          : {
              message: {
                type: "error",
                message: "Ha ocurrido un error, intenta más tarde",
              },
            }
      );
    }
  }
);

const fruitsVegetablesSlice = createSlice({
  name: "fruitsVegetables",
  initialState,
  reducers: {
    onActiveFruitVegetable: (state, action) => {
      state.fruitVegetableActive = action.payload;
      state.loadingActive = false;
    },
    onClearActive: (state) => {
      (state.fruitVegetableActive = null), (state.loadingActive = true);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFruitsAndVegetables.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFruitsAndVegetables.fulfilled, (state, action) => {
      state.loading = false;
      state.fruitsVegetables = action.payload;
      state.error = null;
    });
    builder.addCase(getFruitsAndVegetables.rejected, (state, action) => {
      state.loading = false;
      state.fruitsVegetables = [];
      state.error = action.payload;
    });

    builder.addCase(createFruitVegetable.pending, (state, action) => {
      state.error = null;
      state.loadingAction = true;
    });
    builder.addCase(createFruitVegetable.fulfilled, (state, action) => {
      state.loadingAction = false;
    });
    builder.addCase(createFruitVegetable.rejected, (state, action) => {
      state.error = action.payload;
      state.loadingAction = false;
    });

    builder.addCase(activeFruitVegetable.pending, (state) => {
      state.loadingActive = true;
    });
    builder.addCase(activeFruitVegetable.fulfilled, (state, action) => {
      state.fruitVegetableActive = action.payload;
      state.loadingActive = false;
    });
    builder.addCase(activeFruitVegetable.rejected, (state, action) => {
      state.fruitVegetableActive = null;
      state.error = action.payload;
      state.loadingActive = false;
    });

    builder.addCase(updateFruitVegetable.pending, (state) => {
      state.loadingAction = true;
    });
    builder.addCase(updateFruitVegetable.fulfilled, (state) => {
      state.loadingAction = false;
    });
    builder.addCase(updateFruitVegetable.rejected, (state, action) => {
      state.error = action.payload;
      state.loadingAction = false;
    });
  },
});

export default fruitsVegetablesSlice.reducer;
export const { onActiveFruitVegetable, onClearActive } =
  fruitsVegetablesSlice.actions;
