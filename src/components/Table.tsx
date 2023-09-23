import { useAppSelector } from "../app/hooks";
import { selectTable } from "../features/martingale/martingaleSlice";

export default function Table() {
  let table = useAppSelector(selectTable);
  const redRow = table.find((row) => row.red);
  if (!redRow) {
    table = table.slice(0, 100);
  }

  return (
    <table className="table mt-2">
      <thead>
        <tr>
          <th scope="col">Loss</th>
          <th scope="col" className="d-none d-md-table-cell">
            Bet Amount
          </th>
          <th scope="col">Total Bet</th>
          <th scope="col" className="d-none d-md-table-cell">
            Profit
          </th>
          <th scope="col" className="d-none d-md-table-cell">
            Net Profit
          </th>
          <th scope="col">Chance of losing (%)</th>
          <th scope="col">Odds</th>
        </tr>
      </thead>
      <tbody>
        {table.map((row) => (
          <tr key={row.loss} className={row.red ? "table-danger" : ""}>
            <th scope="row">{row.loss}</th>
            <td className="d-none d-md-table-cell">
              {row.betAmount.toFixed(8)}
            </td>
            <td>{row.totalBet.toFixed(8)}</td>
            <td className="d-none d-md-table-cell">{row.profit.toFixed(8)}</td>
            <td className="d-none d-md-table-cell">
              {row.netProfit.toFixed(8)}
            </td>
            <td>{chanceFormatter(row.chanceOfLoosing)}</td>
            <td>{oddsFormatter(row.odds)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function chanceFormatter(chance: number): string {
  if (chance < 0.00000001) {
    return "<0.000001%";
  } else {
    return (chance * 100).toFixed(8) + "%";
  }
}

function oddsFormatter(odds: number): string {
  const million = 1_000_000;
  const billion = 1000 * million;
  const trillion = 1000 * billion;
  const quadrillion = 1000 * trillion;

  if (odds < million) {
    return "1:" + odds.toFixed(4);
  } else if (odds < billion) {
    return "1:" + (odds / million).toFixed(2) + "M";
  } else if (odds < trillion) {
    return "1:" + (odds / billion).toFixed(2) + "B";
  } else if (odds < quadrillion) {
    return "1:" + (odds / trillion).toFixed(2) + "T";
  } else {
    return "1:" + (odds / quadrillion).toFixed(2) + "Q";
  }
}
