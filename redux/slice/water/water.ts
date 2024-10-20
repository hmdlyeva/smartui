import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "https://smart-office.onrender.com";

export const getWaterData = createAsyncThunk(
  "waters/getWaterData",
  async () => {
    const response = await axios.get(`${baseURL}/waterstates`);
    return response.data;
  }
);

export const getWaterDataById = createAsyncThunk(
  "waters/getWaterDataById",
  async (id: number) => {
    const response = await axios.get(`${baseURL}/waterstate/${id}`);
    return response.data;
  }
);

export const patchWaterData = createAsyncThunk(
  "waters/patchWaterData",
  async ({ id, newData }: { id: number; newData: Partial<Water> }) => {
    const response = await axios.patch(
      `${baseURL}/waterstates/${id}
`,
      newData
    );
    return response.data;
  }
);

export interface Water {
  id: number;
  status: string;
}

export interface WaterState {
  water: Water;
  waters: Water[];
  loading: boolean;
}

const initialState: WaterState = {
  water: {
    id: 0,
    status: "",
  },
  waters: [],
  loading: false,
};

export const waterSlice = createSlice({
  name: "water",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWaterData.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getWaterData.fulfilled,
        (state, action: PayloadAction<Water[]>) => {
          state.waters = action.payload;
          state.loading = false;
        }
      )
      .addCase(getWaterData.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(getWaterDataById.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getWaterDataById.fulfilled,
        (state, action: PayloadAction<Water>) => {
          state.water = action.payload;
          state.loading = false;
        }
      )
      .addCase(getWaterDataById.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(patchWaterData.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        patchWaterData.fulfilled,
        (state, action: PayloadAction<Water>) => {
          state.water = action.payload;
          state.loading = false;
        }
      )
      .addCase(patchWaterData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {} = waterSlice.actions;

export default waterSlice.reducer;
