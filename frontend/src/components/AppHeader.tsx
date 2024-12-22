import { MIN_CURSOR_VALUE } from "../constants";
import "../App.css";

interface IAppHeaderProps {
  sceneCursor: number;
  amountOfFrames: number;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogOut: () => void;
}

export const AppHeader = ({
  amountOfFrames,
  sceneCursor,
  handleInputChange,
  handleLogOut,
}: IAppHeaderProps) => {
  return (
    <div className="appHeader">
      <div>
        <input
          type="range"
          min={MIN_CURSOR_VALUE}
          max={amountOfFrames - 1}
          value={sceneCursor}
          onChange={(e) => handleInputChange(e)}
          onFocus={(e) => e.stopPropagation()}
        />
        <p>Scene: {sceneCursor + 1}</p>
        <p>Hold f + Arrow Keys to Move</p>
      </div>
      <div>
        <button onClick={handleLogOut}>Logout</button>
      </div>
    </div>
  );
};

export default AppHeader;
