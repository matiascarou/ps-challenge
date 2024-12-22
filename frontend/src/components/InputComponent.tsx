interface IInputComponentProps {
  value: string;
  setStateFn: (value: string) => void;
  type: string;
  label: string;
}

const InputComponent = ({
  value,
  setStateFn,
  type,
  label,
}: IInputComponentProps) => {
  return (
    <div>
      <label style={{ display: "flex", flexDirection: "row", gap: 4 }}>
        {label}
        <input
          type={type}
          value={value}
          onChange={(e) => setStateFn(e.target.value)}
          autoFocus
          style={{ flex: 1 }}
        />
      </label>
    </div>
  );
};

export default InputComponent;
