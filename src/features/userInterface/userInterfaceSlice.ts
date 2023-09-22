import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface UserInterfaceState {
  game: "dice" | "limbo";
}

const initialState: UserInterfaceState = {
  game: "dice",
};

export const martingaleSlice = createSlice({
  name: "userInterface",
  initialState,
  reducers: {
    setDice: (state) => {
      state.game = "dice";
    },
    setLimbo: (state) => {
      state.game = "limbo";
    },
  },
});

export const selectGame = (state: RootState) => state.userInterface.game;

export const { setDice, setLimbo } = martingaleSlice.actions;

export default martingaleSlice.reducer;
