import Bayi from "../Image/Bayi.png";
import LoginForm from "../Component/LoginForm";
import "./Login.css";

function LoginPage() {
  return (
    <div class=" login-page screen">
      <div class="sisi-kiri">
        <p class="slogan valign-text-middle">Timbangan bayi masa kini</p>
        <h1 class="title valign-text-middle">ARTYCALE</h1>
        <img class="Baby" src={Bayi} alt="Bayi" />
      </div>
      <div class="sisi-kanan">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
