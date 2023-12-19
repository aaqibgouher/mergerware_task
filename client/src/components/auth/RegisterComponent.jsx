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
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { registerAction } from "../../actions/userAction";

const RegisterComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rolesState = useSelector((state) => state.userReducer.roles);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const register = async (e) => {
    try {
      e.preventDefault();
      console.log(name, email, password, role, "from log");

      const res = await dispatch(
        registerAction({ name, email, password, role })
      );

      if (!res || res.status !== 200) throw "Something wrong";

      //   redirect to login
      navigate("/login");
    } catch (error) {
      console.log(error, "from register component");
    }
  };

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Register
          </Typography>
          <div>
            <TextField
              label="Name"
              type="text"
              name="name"
              fullWidth
              margin="normal"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel>Role</InputLabel>
              <Select
                label="Role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                {rolesState.map((role) => (
                  <MenuItem key={role.id} value={role.value}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              onClick={register}
            >
              Register
            </Button>
            <Typography variant="body2" style={{ marginTop: "1rem" }}>
              Already have an account? <Link to="/login">Login</Link>
            </Typography>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default RegisterComponent;
