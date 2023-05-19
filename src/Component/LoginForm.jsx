import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
function LoginForm() {
  const navigate = useNavigate();

  const Checklogin = () => {
    // 👇️
    navigate("/dfd");
  };
  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form>
        <label>
          <p>Username</p>
          <input type="text" />
        </label>
        <label>
          <p>Password</p>
          <input type="password" />
        </label>
        <div>
          <button type="submit" onClick={Checklogin}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
