import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";

interface ChartState {
  series: number[];
  label: string[];
}

const initialState: ChartState = {
  series: [],
  label: [],
};

const chartSlice = createSlice({
  name: "Chart Slice",
  initialState: initialState,
  reducers: {
    addData: (state, action: PayloadAction<number>) => {
      if(state.series.length > 10){
        state.series.splice(0, 1);
      }
      state.series.push(action.payload);
    },
    addTimestamp: (state, action: PayloadAction<number>) => {
      if(state.label.length > 10){
        state.label.splice(0, 1);
      }
      state.label.push(moment(action.payload).format("hh:mm A"));
    }
  },
});

export default chartSlice.reducer;
export const { addData, addTimestamp } = chartSlice.actions;
