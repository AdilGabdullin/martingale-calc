import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface MartingaleState {
  balance: string;
  baseBet: string;
  payout: string;
  winningChance: string;
  increaseOnLoss: string;
  houseEdge: string;
}

const initialState: MartingaleState = {
  balance: "0.002",
  baseBet: "0.00000001",
  payout: "2",
  winningChance: "49.5",
  increaseOnLoss: "100",
  houseEdge: "1",
};

function isNumeric(value: string) {
  return !isNaN(+value) && !isNaN(parseFloat(value));
}

const nameList: Array<keyof MartingaleState> = [
  "balance",
  "baseBet",
  "payout",
  "winningChance",
  "increaseOnLoss",
  "houseEdge",
];

export const martingaleSlice = createSlice({
  name: "martingale",
  initialState,
  reducers: {
    setValue: (
      state,
      action: PayloadAction<{ name: keyof MartingaleState; value: string }>
    ) => {
      const { name, value } = action.payload;

      switch (name) {
        case "payout":
          if (
            isNumeric(value) &&
            isNumeric(state.winningChance) &&
            isNumeric(state.houseEdge)
          ) {
            state.payout = value;
            const newValue =
              (100 - parseFloat(state.houseEdge)) / parseFloat(value);
            state.winningChance = newValue.toString();
          } else {
            state[name] = value;
          }
          break;
        case "winningChance":
          if (
            isNumeric(state.payout) &&
            isNumeric(value) &&
            isNumeric(state.houseEdge)
          ) {
            state.winningChance = value;
            const newValue =
              (100 - parseFloat(state.houseEdge)) / parseFloat(value);
            state.payout = newValue.toString();
          } else {
            state[name] = value;
          }
          break;
        case "houseEdge":
          if (
            isNumeric(state.payout) &&
            isNumeric(state.winningChance) &&
            isNumeric(value)
          ) {
            state.houseEdge = value;
            const newValue =
              (100 - parseFloat(value)) / parseFloat(state.payout);
            state.winningChance = newValue.toString();
          } else {
            state[name] = value;
          }

          break;
        default:
          state[name] = value;
      }
    },
  },
});

export const { setValue } = martingaleSlice.actions;

export const selectMartingale = (state: RootState) => {
  const martingale = state.martingale;

  const invalid: Array<keyof MartingaleState> = [];
  for (const name of nameList) {
    if (!isNumeric(martingale[name])) {
      invalid.push(name);
    }
  }

  return {
    ...state.martingale,
    invalid: invalid,
  };
};

export const selectTable = (state: RootState) => {
  const martingale = state.martingale;
  const balance = parseFloat(martingale.balance);
  const baseBet = parseFloat(martingale.baseBet);
  const payout = parseFloat(martingale.payout);
  const winningChance = parseFloat(martingale.winningChance);
  const increaseOnLoss = parseFloat(martingale.increaseOnLoss);

  let loss = 1;
  let betAmount = baseBet;
  let totalBet = baseBet;
  let profit = baseBet * payout - baseBet;
  let netProfit = profit;
  let chanceOfLoosing = (100 - winningChance) / 100;
  let odds = 1 / chanceOfLoosing;

  const table = [];
  for (let i = 1; i < 100; i++) {
    const row = {
      loss,
      betAmount,
      totalBet,
      profit,
      netProfit,
      chanceOfLoosing,
      odds,
      red:
        totalBet < balance &&
        totalBet + betAmount * (increaseOnLoss / 100 + 1) > balance,
    };
    loss++;
    betAmount = betAmount * (increaseOnLoss / 100 + 1);
    totalBet += betAmount;
    profit = betAmount * payout - betAmount;
    netProfit = profit - totalBet + betAmount;
    chanceOfLoosing = (chanceOfLoosing * (100 - winningChance)) / 100;
    odds = 1 / chanceOfLoosing;
    table.push(row);
  }
  return table;
};

export default martingaleSlice.reducer;
