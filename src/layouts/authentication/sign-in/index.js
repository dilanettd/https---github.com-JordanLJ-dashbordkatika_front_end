// react-router-dom components
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

// Axios
import axios from "axios";
import axiosInstance from "../../../helpers/axios";

function Basic() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [alert, setAlert] = useState("Bad credentials, Please login again!");

  const handleSubmit = () => {
    if (email.length > 0 && password.length > 0) {
      setIsLoading(true);
      axiosInstance
        .post(`/user/login`, {
          email,
          password,
        })
        .then((res) => {
          setIsLoading(false);
          localStorage.setItem(
            "access_token",
            JSON.stringify(res.data.access_token)
          );
          localStorage.setItem("user", JSON.stringify(res.data.user));
          navigate("/posts");
        })
        .catch((err) => {
          setIsLoading(false);
          setError(true);
          if (!err.request.status === 401) {
            setAlert("Something's wrong!");
          }
        });
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center">
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          {error && (
            <MDAlert color="error" dismissible="true">
              <p style={{ fontSize: 12 }}>{alert}</p>
            </MDAlert>
          )}
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                fullWidth
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                require
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                onClick={handleSubmit}
                disabled={isLoading}
                fullWidth>
                sign in
              </MDButton>
            </MDBox>
          </MDBox>
          <MDBox mt={3} mb={1} textAlign="center">
            <MDTypography variant="button" color="text">
              Forgot your password?{" "}
              <MDTypography
                component={Link}
                to="/reset/email"
                variant="button"
                color="info"
                fontWeight="medium"
                textGradient>
                Reset Password
              </MDTypography>
            </MDTypography>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
