import './SwitchBtn.scss';
import { switchBtnProps } from './SwitchBtn.types';
export const SwitchBtn = ({id , ChangeStataus ,status}:switchBtnProps) => {
  return (
    <label
      htmlFor={id}
      className="SwitchBtn"
    >
      <input
        type="checkbox"
        value=""
        checked={status === "done" ? true : false}
        id={id}
        className="SwitchBtn_input peer"
        onChange={(e) => ChangeStataus(e.target.checked , id)}
      />
      <div className="SwitchBtn_ring peer-focus:outline-none  peer  peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:bg-green-600"></div>
    </label>
  );
};
