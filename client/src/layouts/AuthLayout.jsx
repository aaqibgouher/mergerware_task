import { Grid } from "@mui/material";

const AuthLayout = ({ children }) => {
  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Grid item xs={4}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default AuthLayout;
