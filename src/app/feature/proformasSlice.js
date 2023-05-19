import { createSlice } from "@reduxjs/toolkit";

export const proformasSlice = createSlice({
  name: "proformas",
  initialState: {
    proformas: [],
  },
  reducers: {
    setproformasData: (state, { payload }) => {
      state.proformas = payload;
    },
    addProforma: (state, { payload }) => {
      state.proformas.push(payload);
    },
    deleteProformaById: (state, { payload }) => {
      state.proformas = state.proformas.filter((item) => item.id !== payload);
    },
    editProforma: (state, { payload }) => {
      state.proformas = state.proformas.map((proforma) => {
        if (proforma.id === payload[1]) {
          proforma.uid = payload[0].uid;
          proforma.customerName = payload[0].customerName;
          proforma.customerContact = payload[0].customerContact;
          proforma.customerEmail = payload[0].customerEmail;
          proforma.customerAddress = payload[0].customerAddress;
          proforma.gps = payload[0].gps;
          proforma.total = payload[0].total;
          proforma.status = payload[0].status;
        }
        return proforma;
      });
    },
  },
});

export const { setproformasData, addProforma, deleteProformaById, editProforma } =
  proformasSlice.actions;
export default proformasSlice.reducer;
