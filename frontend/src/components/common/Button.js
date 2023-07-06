import "./Button.css";

const Button = ({ title, className, onClick }) => {
  return (
    <button className={`button ${className || ""}`} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
