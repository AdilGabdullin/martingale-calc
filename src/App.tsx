import InputsPanel from "./components/InputsPanel";
import SummaryPanel from "./components/SummaryPanel";
import Table from "./components/Table";

function App() {
  return (
    <div
      style={{
        backgroundColor: "#eee",
        color: "#444",
        fontFamily: '"Arial", Sans-serif',
      }}
    >
      <div className="container">
        <h1 className="mcalc-heading pt-4 pb-2">
          Dice/Limbo Martingale Chance Calculator
        </h1>
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <InputsPanel />
          </div>
          <div className="col-sm-12 col-md-6">
            <SummaryPanel />
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row p-3">
          <Table />
        </div>
      </div>
    </div>
  );
}

export default App;
