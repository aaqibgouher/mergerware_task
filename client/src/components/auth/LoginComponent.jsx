import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginAction } from "../../actions/userAction";
import { useDispatch } from "react-redux";

const LoginComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    try {
      e.preventDefault();
      console.log(email, password, "from log");

      const res = await dispatch(loginAction({ email, password }));

      if (!res || res.status !== 200) throw "Something wrong";

      // redirect to dashboard
      navigate("/");
    } catch (error) {
      console.log(error, "from register component");
    }
  };

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <div>
            <TextField
              label="Email"
              type="email"
              name="email"
              fullWidth
              margin="normal"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              fullWidth
              margin="normal"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              onClick={login}
            >
              Login
            </Button>
            <Typography variant="body2" style={{ marginTop: "1rem" }}>
              Already have an account? <Link to="/register">Register</Link>
            </Typography>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default LoginComponent;
