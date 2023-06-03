import "./Button.css";

const Button = ({ title, onClick, style }) => {
  return (
    <button className="button" onClick={onClick} style={style}>
      {title}
    </button>
  );
};

export default Button;
