import { useLocation } from "react-router-dom";
import RegisterComponent from "../components/auth/RegisterComponent";
import AuthLayout from "../layouts/AuthLayout";
import LoginComponent from "../components/auth/LoginComponent";

const AuthPage = () => {
  const location = useLocation();
  const current = location.pathname.split("/")[1];

  const componentMapping = {
    register: RegisterComponent,
    login: LoginComponent,
  };

  const MyComponent = componentMapping[current];

  return (
    <AuthLayout>
      <MyComponent />
    </AuthLayout>
  );
};

export default AuthPage;
