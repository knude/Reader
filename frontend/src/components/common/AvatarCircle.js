import "./AvatarCircle.css";
import defaultAvatar from "../../assets/default-avatar.png";

const AvatarCircle = ({ src, alt, onClick }) => {
  return (
    <div className="avatar-circle">
      <img src={defaultAvatar} alt="Avatar" onClick={onClick} />
    </div>
  );
};

export default AvatarCircle;
