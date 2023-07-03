import "./AvatarCircle.css";
import defaultAvatar from "../../assets/default-avatar.png";

const AvatarCircle = ({ onClick }) => {
  return (
    <div className="avatar-circle">
      <img src={defaultAvatar} alt="Avatar" onClick={onClick} />
    </div>
  );
};

export default AvatarCircle;
