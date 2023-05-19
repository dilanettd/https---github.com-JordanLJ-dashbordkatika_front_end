// react
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Toastyfy
import { toast } from "react-toastify";

// Images
import bgImage from "assets/images/bg-reset-cover.jpeg";

// axios
import axiosInstance from "../../../../helpers/axios";

const ResetPassword = () => {
  const navigate = useNavigate();

  const { code } = useParams();

  const [password, setPassowrd] = useState("");

  const [passwordMatch, setPasswordMatch] = useState(false);

  const validate = (value) => {
    if (password == value) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  };

  const sendEmail = () => {
    axiosInstance
      .post("/user/reset-password", { code, password })
      .then(() => {
        setPassowrd("");
        navigate("/login");
        toast.success("We have sent you an email. Please check your email.", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/login");
      })
      .catch(() => {
        toast.error("Something went wrong !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  useEffect(() => {
    if (typeof code === "undefined") {
      navigate("/login");
    }
  }, []);

  return (
    <CoverLayout coverHeight="50vh" image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
            Reset Password
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Please enter your new password
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={4}>
              <MDBox p={1} width>
                <MDInput
                  type="password"
                  label="Password"
                  onChange={(e) => setPassowrd(e.target.value)}
                  variant="standard"
                  fullWidth
                  required
                />
              </MDBox>
              <MDBox p={1} width>
                <MDInput
                  type="password"
                  label="Confirm Password"
                  onChange={(e) => validate(e.target.value)}
                  variant="standard"
                  fullWidth
                  required
                />
                {passwordMatch && (
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "red",
                    }}
                  >
                    Password not match
                  </span>
                )}
              </MDBox>
            </MDBox>
            <MDBox mt={6} mb={1}>
              <MDButton variant="gradient" color="info" onClick={() => sendEmail()} fullWidth>
                Reset
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
};

export default ResetPassword;
