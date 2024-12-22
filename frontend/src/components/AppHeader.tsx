import { MIN_CURSOR_VALUE } from "../constants";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
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
      <div className="inputAndInfoIcon">
        <input
          type="range"
          min={MIN_CURSOR_VALUE}
          max={amountOfFrames - 1}
          value={sceneCursor}
          onChange={(e) => handleInputChange(e)}
          onFocus={(e) => e.stopPropagation()}
        />
        <div>
          <Tooltip title="Hold f + Arrow Keys to Move Between Frames" arrow>
            <IconButton>
              <InfoIcon sx={{ color: "white", cursor: "default" }} />
            </IconButton>
          </Tooltip>
        </div>
        <p>Scene: {sceneCursor + 1}</p>
      </div>
      <div>
        <button onClick={handleLogOut}>Logout</button>
      </div>
    </div>
  );
};

export default AppHeader;
