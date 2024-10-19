import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


const baseURL = "https://smart-office.onrender.com";

export const getLightData = createAsyncThunk("lights/getLightData", async (id:number) => {
 
  const response = await axios.get(`${baseURL}/lightstate/${id}`);
  return response.data;
});

export const postLightOnData = createAsyncThunk(
  "lights/postLightOnData",
  async () => {
    const response = await axios.post(`${baseURL}/light/on
`);
    return response.data;
  }
);

export const postLightOffData = createAsyncThunk(
  "lights/postLightOffData",
  async () => {
    const response = await axios.post(`${baseURL}/light/off
`);
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
      .addCase(postLightOnData.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        postLightOnData.fulfilled,
        (state) => {
          state.lights.push();
          state.loading = false;
        }
      )
      .addCase(postLightOnData.rejected, (state) => {
        state.loading = false;
      });

      builder
      .addCase(postLightOffData.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        postLightOffData.fulfilled,
        (state) => {
          state.lights.push();
          state.loading = false;
        }
      )
      .addCase(postLightOffData.rejected, (state) => {
        state.loading = false;
      });




    // builder
    //   .addCase(putLocData.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(
    //     putLocData.fulfilled,
    //     (state, action: PayloadAction<Location>) => {
    //       state.location = action.payload;
    //       state.loading = false;
    //     }
    //   )
    //   .addCase(putLocData.rejected, (state) => {
    //     state.loading = false;
    //   });
  },
});

export const {} = lightSlice.actions;

export default lightSlice.reducer;