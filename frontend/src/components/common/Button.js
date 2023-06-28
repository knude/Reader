import "./Button.css";

const Button = ({ title, className, onClick, style }) => {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
