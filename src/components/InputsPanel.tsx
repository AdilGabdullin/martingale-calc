import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  MartingaleState,
  selectMartingale,
  setValue,
} from "../features/martingale/martingaleSlice";
import {
  selectGame,
  setDice,
  setLimbo,
} from "../features/userInterface/userInterfaceSlice";

export default function InputsPanel() {
  const game = useAppSelector(selectGame);

  return (
    <div>
      <ButtonsRow />
      <InputGroup label="Balance" name="balance" step={0.001} />
      <InputGroup label="Base Bet" name="baseBet" step={0.00000001} />
      <InputGroup label="Payout" name="payout" step={1} />
      {game == "dice" && (
        <InputGroup label="Chance (%)" name="winningChance" step={1} />
      )}
      <InputGroup label="Increase on loss (%)" name="increaseOnLoss" step={1} />
      <InputGroup label="House edge (%)" name="houseEdge" step={1} />
    </div>
  );
}

function ButtonsRow() {
  const dispatch = useAppDispatch();
  const game = useAppSelector(selectGame);
  const diceBtnClass =
    (game === "dice" ? "btn-primary" : "btn-secondary") + " btn w-100";
  const limboBtnClass =
    (game === "limbo" ? "btn-primary" : "btn-secondary") + " btn w-100";

  return (
    <div className="row mb-2">
      <div className="col"></div>
      <div className="col"></div>
      <div className="col">
        <button className={diceBtnClass} onClick={() => dispatch(setDice())}>
          Dice
        </button>
      </div>
      <div className="col">
        <button className={limboBtnClass} onClick={() => dispatch(setLimbo())}>
          Limbo
        </button>
      </div>
    </div>
  );
}

function InputGroup(props: {
  name: keyof MartingaleState;
  label: string;
  step: number;
}) {
  const dispatch = useAppDispatch();
  const martingale = useAppSelector(selectMartingale);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    if (props.name === "baseBet" && value.match(/e/)) {
      value = Number(value).toFixed(8);
    }
    dispatch(
      setValue({
        name: props.name,
        value: value,
      })
    );
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  const inputStyle: React.CSSProperties = {};
  if (martingale.invalid.includes(props.name)) {
    inputStyle.backgroundColor = "rgba(255, 0, 0, 0.5)";
  }

  return (
    <div className="row mb-2">
      <div className="col">
        <label className="form-label" htmlFor={props.name}>
          {props.label}:
        </label>
      </div>
      <div className="col">
        <input
          className="form-control"
          id={props.name}
          type="number"
          value={martingale[props.name]}
          step={props.step}
          style={inputStyle}
          onChange={handleChange}
          onFocus={handleFocus}
        />
      </div>
    </div>
  );
}
