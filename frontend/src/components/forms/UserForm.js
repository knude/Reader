import { useEffect, useState } from "react";
import loginService from "../../services/login";
import userService from "../../services/user";
import Form from "./Form";
import Button from "../common/Button";
import "./UserForm.css";

const UserForm = ({ user }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  const fields = [
    { name: "username", type: "text", placeholder: "Username" },
    { name: "password", type: "password", placeholder: "Password" },
  ];

  const alert = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const handleSubmit = async (formData) => {
    const { username, password } = formData;

    if (!username || !password) {
      alert("Both username and password are required");
      return;
    }

    try {
      if (isLogin) {
        const user = await loginService.login(username, password);
        window.localStorage.setItem("loggedUser", JSON.stringify(user));
        alert(`Logged in as ${user.username}`);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        const user = await userService.register(username, password);
      }
    } catch {
      if (isLogin) {
        alert("Invalid username or password");
        return;
      }
      alert("Username already exists");
    }
  };

  const description = isLogin
    ? "Log in to your account"
    : "Register a new user";
  const buttonText = isLogin ? "Login" : "Register";
  const loginClass = isLogin ? "switcher-active" : "";
  const registerClass = isLogin ? "" : "switcher-active";

  const logOut = () => {
    localStorage.removeItem("loggedUser");
    window.location.reload();
  };

  return (
    <div className="user-form">
      {(user && (
        <>
          <span>Logged in as {user.username}</span>
          <Button title="Log Out" onClick={logOut} />
        </>
      )) || (
        <>
          <div className="user-form-button-switcher">
            <Button
              title="Login"
              onClick={() => setIsLogin(true)}
              className={loginClass}
            />
            <Button
              title="Register"
              onClick={() => setIsLogin(false)}
              className={registerClass}
            />
          </div>

          <div className="description">
            {errorMessage ? (
              <div>{errorMessage}</div>
            ) : (
              <div>{description}</div>
            )}
          </div>
          <Form
            fields={fields}
            onSubmit={handleSubmit}
            buttonText={buttonText}
          />
        </>
      )}
    </div>
  );
};

export default UserForm;
