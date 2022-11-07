import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import feriaApi from "../interceptors/feriaInterceptor";

const initialState = {
  sales: [],
  saleActive: null,
  auctions: null,
  error: null,
  loading: true,
  loadingActive: true,
  loadingAction: false,
  loadingAuctions: true,
};

export const getAllSales = createAsyncThunk(
  "sales/getAll",
  async ({}, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await feriaApi.get("/admin/sales");
      return data.sales;
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

export const getMySales = createAsyncThunk(
  "sales/getMySales",
  async ({}, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await feriaApi.get("/clients/sales");

      return data.sales;
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

export const getAuctionsBySale = createAsyncThunk(
  "sales/getAuctions",
  async ({ idSale }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await feriaApi.get(`/admin/sales/${idSale}/auctions`);

      return data.auctions;
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

export const getSalesByProducer = createAsyncThunk(
  "sales/getSalesForProducer",
  async ({}, { rejectWithValue, disaptch }) => {
    try {
      const { data } = await feriaApi.get("/producers/auctions");
      return data.sales;
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

export const getOrdersForTransportist = createAsyncThunk(
  "sales/getOrdersForTransportist",
  async ({}, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await feriaApi.get(`/transportists/auctions`);

      return data.sales;
    } catch (error) {
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

export const getResultAuctionProducers = createAsyncThunk(
  "sales/getResultAuctionProducers",
  async ({ idSale }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await feriaApi.get(
        `/clients/sales/${idSale}/auctions-producer`
      );
      console.log({ data });

      return data.result;
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

export const getOrdersByTransportist = createAsyncThunk(
  "sales/getOrdersByTransportist",
  async ({}, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await feriaApi.get(
        `/transportists/auctions/orders-transportist`
      );

      return data.orders;
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

export const createSale = createAsyncThunk(
  "sales/create",
  async ({ sale }, { rejectWithValue, dispatch }) => {
    try {
      await feriaApi.post("/clients/sales", { ...sale });
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

export const addAuctionConfirm = createAsyncThunk(
  "sales/addAuctionConfirm",
  async ({ data }, { rejectWithValue }) => {
    try {
      const { data: d } = await feriaApi.post(
        `/admin/sales/${data.sale_id}/auctions/add-confirm`,
        { data }
      );

      return true;
    } catch (e) {
      console.log({ e });
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

export const activeSale = createAsyncThunk(
  "sales/active",
  async ({ idSale, roleUser }, { rejectWithValue, dispatch }) => {
    try {
      let endpoint = "";
      switch (roleUser) {
        case 1:
          endpoint = `/admin/sales/${idSale}`;
          break;
        case 2:
        case 3:
          endpoint = `/clients/sales/${idSale}`;
          break;
        case 4:
          endpoint = `/producers/auctions/${idSale}`;
          break;
        case 5:
          endpoint = `/transportists/auctions/${idSale}`;
          break;

        default:
          break;
      }

      const { data } = await feriaApi.get(endpoint);

      return data.sale;
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

export const acceptAdminSale = createAsyncThunk(
  "sales/acceptAdminSale",
  async ({ saleId, auctionDuration }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await feriaApi.patch(`/admin/sales/${saleId}/accept`, {
        auction_duration: auctionDuration,
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

export const startAuctionTransportist = createAsyncThunk(
  "sales/startAuctionTransportist",
  async ({ saleId, auctionDuration }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await feriaApi.patch(
        `/admin/sales/${saleId}/auctions/transportist/start`,
        {
          auction_duration: auctionDuration,
        }
      );

      return true;
    } catch (e) {
      console.log({ e });
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

export const getAuctionsForTransportist = createAsyncThunk(
  "sales/getAuctionsForTransportist",
  async ({ saleId }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await feriaApi.get(
        `/admin/sales/${saleId}/auctions/producer`
      );

      return data.auctions;
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

export const acceptAuctionProducer = createAsyncThunk(
  "sales/acceptAuctionProducer",
  async ({ saleId }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await feriaApi.patch(
        `/clients/sales/${saleId}/auctions-producer/accept`
      );
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

export const acceptAuctionTransportist = createAsyncThunk(
  "sales/acceptAuctionProducer",
  async ({ saleId }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await feriaApi.patch(
        `/clients/sales/${saleId}/auctions-transportist/accept`
      );
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

export const cancelSale = createAsyncThunk(
  "sales/cancel",
  async (
    { roleUser, saleId, statusId, observations },
    { rejectWithValue, dispatch }
  ) => {
    const endpoint = roleUser == 1 ? "admin" : "clients";
    try {
      await feriaApi.patch(`/${endpoint}/sales/${saleId}/cancel`, {
        status_id: statusId,
        observations,
      });
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

export const addAuctionProducer = createAsyncThunk(
  "sales/addAuctionProducer",
  async ({ auction }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await feriaApi.post("/producers/auctions", auction);

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
export const addAuctionTransportist = createAsyncThunk(
  "sales/addAuctionTransportist",
  async ({ saleId, message, price }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await feriaApi.post(
        `/transportists/auctions/${saleId}/auctions`,
        { message, price }
      );

      return true;
    } catch (e) {
      console.log({ e });

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

export const confirmOptionAuctionTransportist = createAsyncThunk(
  "",
  async ({ saleId, confirmId }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await feriaApi.patch(
        `/admin/sales/${saleId}/auctions/transportist/confirm`,
        { confirm_id: confirmId }
      );

      console.log({ data });

      return true;
    } catch (e) {
      console.log({ e });

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

export const changeStatusOrder = createAsyncThunk(
  "sales/changeStatusOrder",
  async ({ statusId, saleId }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await feriaApi.patch(
        `/transportists/auctions/orders-transportist/${saleId}`,
        { status_id: statusId }
      );

      return statusId;
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

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    onActiveSale: (state, action) => {
      state.saleActive = action.payload;
      state.loadingActive = false;
    },
    onClearActive: (state) => {
      state.saleActive = null;
      state.loadingActive = true;
      state.auctions = null;
      state.loadingAuctions = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllSales.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllSales.fulfilled, (state, action) => {
      state.loading = false;
      state.sales = action.payload;
      state.error = null;
    });
    builder.addCase(getAllSales.rejected, (state, action) => {
      state.loading = false;
      state.sales = [];
      state.error = action.payload;
    });

    builder.addCase(getMySales.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getMySales.fulfilled, (state, action) => {
      state.loading = false;
      state.sales = action.payload;
      state.error = null;
    });
    builder.addCase(getMySales.rejected, (state, action) => {
      state.loading = false;
      state.sales = [];
      state.error = action.payload;
    });

    builder.addCase(getOrdersByTransportist.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getOrdersByTransportist.fulfilled, (state, action) => {
      state.loading = false;
      state.sales = action.payload;
      state.error = null;
    });
    builder.addCase(getOrdersByTransportist.rejected, (state, action) => {
      state.loading = false;
      state.sales = [];
      state.error = action.payload;
    });

    builder.addCase(getOrdersForTransportist.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getOrdersForTransportist.fulfilled, (state, action) => {
      state.loading = false;
      state.sales = action.payload;
      state.error = null;
    });
    builder.addCase(getOrdersForTransportist.rejected, (state, action) => {
      state.loading = false;
      state.sales = [];
      state.error = action.payload;
    });

    builder.addCase(getSalesByProducer.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSalesByProducer.fulfilled, (state, action) => {
      state.loading = false;
      state.sales = action.payload;
      state.error = null;
    });
    builder.addCase(getSalesByProducer.rejected, (state, action) => {
      state.loading = false;
      state.sales = [];
      state.error = action.payload;
    });

    builder.addCase(createSale.pending, (state, action) => {
      state.error = null;
      state.loadingAction = true;
    });
    builder.addCase(createSale.fulfilled, (state, action) => {
      state.loadingAction = false;
    });
    builder.addCase(createSale.rejected, (state, action) => {
      state.error = action.payload;
      state.loadingAction = false;
    });

    builder.addCase(activeSale.pending, (state) => {
      state.loadingActive = true;
    });
    builder.addCase(activeSale.fulfilled, (state, action) => {
      state.saleActive = action.payload;
      state.loadingActive = false;
    });
    builder.addCase(activeSale.rejected, (state, action) => {
      state.saleActive = null;
      state.error = action.payload;
      state.loadingActive = false;
    });

    builder.addCase(cancelSale.pending, (state, action) => {
      state.error = null;
      state.loadingAction = true;
    });
    builder.addCase(cancelSale.fulfilled, (state, action) => {
      state.loadingAction = false;
    });
    builder.addCase(cancelSale.rejected, (state, action) => {
      state.error = action.payload;
      state.loadingAction = false;
    });

    builder.addCase(addAuctionProducer.pending, (state, action) => {
      state.error = null;
      state.loadingAction = true;
    });
    builder.addCase(addAuctionProducer.fulfilled, (state, action) => {
      state.loadingAction = false;
    });
    builder.addCase(addAuctionProducer.rejected, (state, action) => {
      state.error = action.payload;
      state.loadingAction = false;
    });

    builder.addCase(addAuctionTransportist.pending, (state, action) => {
      state.error = null;
      state.loadingAction = true;
    });
    builder.addCase(addAuctionTransportist.fulfilled, (state, action) => {
      state.loadingAction = false;
    });
    builder.addCase(addAuctionTransportist.rejected, (state, action) => {
      state.error = action.payload;
      state.loadingAction = false;
    });

    builder.addCase(acceptAdminSale.pending, (state, action) => {
      state.error = null;
      state.loadingAction = true;
    });
    builder.addCase(acceptAdminSale.fulfilled, (state, action) => {
      state.loadingAction = false;
    });
    builder.addCase(acceptAdminSale.rejected, (state, action) => {
      state.error = action.payload;
      state.loadingAction = false;
    });

    builder.addCase(startAuctionTransportist.pending, (state, action) => {
      state.error = null;
      state.loadingAction = true;
    });
    builder.addCase(startAuctionTransportist.fulfilled, (state, action) => {
      state.loadingAction = false;
    });
    builder.addCase(startAuctionTransportist.rejected, (state, action) => {
      state.error = action.payload;
      state.loadingAction = false;
    });

    builder.addCase(getAuctionsBySale.pending, (state, action) => {
      state.loadingAuctions = true;
    });
    builder.addCase(getAuctionsBySale.fulfilled, (state, action) => {
      state.loadingAuctions = false;
      state.auctions = action.payload;
      state.error = null;
    });
    builder.addCase(getAuctionsBySale.rejected, (state, action) => {
      state.loadingAuctions = false;
      state.auctions = [];
      state.error = action.payload;
    });

    builder.addCase(getResultAuctionProducers.pending, (state, action) => {
      state.loadingAuctions = true;
    });
    builder.addCase(getResultAuctionProducers.fulfilled, (state, action) => {
      state.loadingAuctions = false;
      state.auctions = action.payload;
      state.error = null;
    });
    builder.addCase(getResultAuctionProducers.rejected, (state, action) => {
      state.loadingAuctions = false;
      state.auctions = [];
      state.error = action.payload;
    });

    builder.addCase(getAuctionsForTransportist.pending, (state, action) => {
      state.loadingAuctions = true;
    });
    builder.addCase(getAuctionsForTransportist.fulfilled, (state, action) => {
      state.loadingAuctions = false;
      state.auctions = action.payload;
      state.error = null;
    });
    builder.addCase(getAuctionsForTransportist.rejected, (state, action) => {
      state.loadingAuctions = false;
      state.auctions = [];
      state.error = action.payload;
    });

    builder.addCase(addAuctionConfirm.pending, (state, action) => {
      state.error = null;
      state.loadingAction = true;
    });
    builder.addCase(addAuctionConfirm.fulfilled, (state, action) => {
      state.loadingAction = false;
    });
    builder.addCase(addAuctionConfirm.rejected, (state, action) => {
      state.error = action.payload;
      state.loadingAction = false;
    });

    builder.addCase(changeStatusOrder.pending, (state, action) => {
      state.error = null;
      state.loadingAction = true;
    });
    builder.addCase(changeStatusOrder.fulfilled, (state, action) => {
      state.loadingAction = false;
      state.saleActive = { ...state.saleActive, status_id: action.payload };
    });
    builder.addCase(changeStatusOrder.rejected, (state, action) => {
      state.error = action.payload;
      state.loadingAction = false;
    });
  },
});

export default salesSlice.reducer;
export const { onActiveSale, onClearActive } = salesSlice.actions;
