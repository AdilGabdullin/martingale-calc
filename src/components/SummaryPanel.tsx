import { useAppSelector } from "../app/hooks";
import {
  selectMartingale,
  selectTable,
} from "../features/martingale/martingaleSlice";

export default function SummaryPanel() {
  const martingale = useAppSelector(selectMartingale);
  const table = useAppSelector(selectTable);

  const redRow = table.find((row) => row.red);

  if (martingale.invalid.length > 0) {
    return (
      <div style={{ color: "red" }}>
        Please fill all the inputs with numeric values
      </div>
    );
  }

  return (
    <div>
      <p>
        With a balance of <strong>{martingale.balance}</strong>, a base bet of{" "}
        <strong>{martingale.baseBet}</strong>, a{" "}
        <strong>{martingale.winningChance}%</strong> chance and an increase on
        loss of <strong>{martingale.increaseOnLoss}%</strong>, you can support a
        loss streak of <strong>{(redRow && redRow.loss) || "???"} rolls</strong>{" "}
        before bust. You have a{" "}
        <strong>
          {(redRow && (redRow.chanceOfLoosing * 100).toFixed(8)) || "???"}%
        </strong>{" "}
        chance of bust.
      </p>
      <p>
        For your{" "}
        <strong>{parseFloat(martingale.winningChance).toFixed(2)}%</strong>{" "}
        chance (<strong>{parseFloat(martingale.payout).toFixed(2)}×</strong>
        payout) you have to use a minimum increase on loss of{" "}
        <strong>
          {(100 / (parseFloat(martingale.payout) - 1)).toFixed(2)}%
        </strong>{" "}
        to recover your losses on every win.
      </p>

      <p style={{ fontSize: "14px" }}>
        These numbers are purely just the probabilities. I am not responsible
        for any losses you may get while using this calculator. Only gamble with
        money that you can afford to lose.
      </p>
    </div>
  );
}
