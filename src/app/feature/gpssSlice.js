import { createSlice } from "@reduxjs/toolkit";

export const gpssSlice = createSlice({
  name: "gpss",
  initialState: {
    gpss: [],
  },
  reducers: {
    setGpssData: (state, { payload }) => {
      state.gpss = payload;
    },
    addGps: (state, { payload }) => {
      state.gpss.push(payload);
    },
    deleteGpsById: (state, { payload }) => {
      state.gpss = state.gpss.filter((item) => item.id !== payload);
    },
    editGps: (state, { payload }) => {
      state.gpss = state.gpss.map((gps) => {
        if (gps.id === payload[1]) {
          gps.name = payload[0].name;
          gps.type = payload[0].type;
          gps.priceMotorcycles = payload[0].priceMotorcycles;
          gps.priceTricycles = payload[0].priceTricycles;
          gps.priceTaxis = payload[0].priceTaxis;
          gps.priceCarriages = payload[0].priceCarriages;
          gps.priceTruck = payload[0].priceTruck;
        }
        return gps;
      });
    },
  },
});

export const { setGpssData, addGps, deleteGpsById, editGps } = gpssSlice.actions;
export default gpssSlice.reducer;
