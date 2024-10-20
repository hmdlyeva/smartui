import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "https://smart-office.onrender.com";

export const getLightData = createAsyncThunk(
  "lights/getLightData",
  async () => {
    const response = await axios.get(`${baseURL}/lightstates`);
    return response.data;
  }
);

export const getLightDataById = createAsyncThunk(
  "lights/getLightDataById",
  async (id: number) => {
    const response = await axios.get(`${baseURL}/lightstate/${id}`);
    return response.data;
  }
);

export const patchLightData = createAsyncThunk(
  "lights/patchLightData",
  async ({ id, newData }: { id: number; newData: Partial<Light> }) => {
    const response = await axios.patch(
      `${baseURL}/lightstates/${id}
`,
      newData
    );
    return response.data;
  }
);

export interface Light {
  id: number;
  status: string;
}

export interface LightState {
  light: Light;
  lights: Light[];
  loading: boolean;
}

const initialState: LightState = {
  light: {
    id: 0,
    status: "",
  },
  lights: [],
  loading: false,
};

export const lightSlice = createSlice({
  name: "light",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLightData.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getLightData.fulfilled,
        (state, action: PayloadAction<Light[]>) => {
          state.lights = action.payload;
          state.loading = false;
        }
      )
      .addCase(getLightData.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(getLightDataById.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getLightDataById.fulfilled,
        (state, action: PayloadAction<Light>) => {
          state.light = action.payload;
          state.loading = false;
        }
      )
      .addCase(getLightDataById.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(patchLightData.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        patchLightData.fulfilled,
        (state, action: PayloadAction<Light>) => {
          state.light = action.payload;
          state.loading = false;
        }
      )
      .addCase(patchLightData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {} = lightSlice.actions;

export default lightSlice.reducer;
