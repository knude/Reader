import "./AvatarCircle.css";
import defaultAvatar from "../../assets/default-avatar.png";

const AvatarCircle = ({ onClick }) => {
  return (
    <button className="avatar-circle round" onClick={onClick}>
      <img src={defaultAvatar} alt="Avatar" />
    </button>
  );
};

export default AvatarCircle;
