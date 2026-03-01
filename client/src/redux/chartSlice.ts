import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ChartState {
  series: number[];
}

const initialState: ChartState = {
  series: [1, 9, 3, 6, 8, 3, 4],
};

const chartSlice = createSlice({
  name: "Chart Slice",
  initialState: initialState,
  reducers: {
    addData: (state, action: PayloadAction<number>) => {
      state.series.splice(0, 1);
      state.series.push(action.payload);
    },
  },
});

export default chartSlice.reducer;
export const { addData } = chartSlice.actions;
