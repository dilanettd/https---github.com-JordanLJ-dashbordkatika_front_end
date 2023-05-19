// React
import React, { useState, useEffect, useMemo } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "../../components/MDButton";
import MDBadge from "components/MDBadge";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// import axios instance
import axiosInstance from "../../helpers/axios";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";

// Toastyfy
import { toast } from "react-toastify";

// Validator
import validator from "validator";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  deleteUserById,
  editUser,
  setUsersData,
} from "../../app/feature/usersSlice";

function Users() {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users.users);

  const [openEdit, setOpenEdit] = useState(false);

  const [openAdd, setOpenAdd] = useState(false);

  const [name, setName] = useState("");

  const [id, setId] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [passwordMatch, setPasswordMatch] = useState(false);

  const [blocked, setBlocked] = useState("");

  const [role, setRole] = useState("");

  const [controller] = useMaterialUIController();

  const { darkMode } = controller;

  const handleAddSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/user/add", { name, role, email, password })
      .then((res) => {
        dispatch(addUser(res.data));
        setEmail("");
        setName("");
        setPassword("");
        setRole("");
        handleAddClose();
        toast.success("Add successfully !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch(() => {
        toast.error("Something went wrong !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const validate = (value) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setPasswordMatch(false);
      setPassword(value);
    } else {
      setPasswordMatch(true);
    }
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const handleClickAddOpen = () => {
    setOpenAdd(true);
  };

  const handleAddClose = () => {
    setOpenAdd(false);
  };

  const handleDeleteUser = (id) => {
    let confirm = confirm("Do you really want to delete this User");
    if (confirm) {
      axiosInstance
        .delete(`/user/${id}`)
        .then(() => {
          dispatch(deleteUserById(id));
          toast.success("Delete successfully !", {
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch(() => {
          toast.error("Something went wrong !", {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .put(`/user/${id}`, { blocked, role })
      .then((res) => {
        dispatch(editUser([res.data, id]));
        toast.success("Update successfully !", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setRole("");
        setBlocked("");
        handleEditClose();
      })
      .catch(() => {
        toast.error("Something went wrong !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  const handleEditUser = (user) => {
    setOpenEdit(true);
    setBlocked(user.blocked);
    setRole(user.role);
    setId(user.id);
  };

  useEffect(() => {
    axiosInstance.get("/users").then((res) => {
      dispatch(setUsersData(res.data));
    });
  }, []);

  const Action = ({ user }) => (
    <div key={user.id}>
      <MDButton
        variant="text"
        color={darkMode ? "white" : "dark"}
        onClick={() => handleEditUser(user)}>
        <Icon>edit</Icon>&nbsp;edit
      </MDButton>
      <MDButton
        variant="text"
        color="error"
        onClick={() => handleDeleteUser(user.id)}>
        <Icon>delete</Icon>&nbsp;delete
      </MDButton>
    </div>
  );

  const Rows = ({ row }) => {
    return (
      <>
        <TableRow key={row.id}>
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.email}</TableCell>
          <TableCell>{row.role}</TableCell>
          <TableCell>
            <MDBox ml={-1}>
              <MDBadge
                badgeContent={row.blocked ? "Blocked" : "Allow"}
                color={row.blocked ? "error" : "success"}
                variant="gradient"
                size="sm"
              />
            </MDBox>
          </TableCell>
          <TableCell>
            <Action user={row} />
          </TableCell>
        </TableRow>
      </>
    );
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={2} pl={2}>
        <MDButton variant="gradient" color="info" onClick={handleClickAddOpen}>
          <Icon>add</Icon>
          &nbsp;Add User
        </MDButton>
      </MDBox>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info">
                <MDTypography variant="h6" color="white">
                  Users list
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead style={{ display: "contents" }}>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users.map((row) => (
                        <Rows row={row} />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Dialog open={openAdd} onClose={handleAddClose} fullWidth>
        <DialogTitle>Add User</DialogTitle>
        <form onSubmit={handleAddSubmit}>
          <DialogContent>
            <MDBox>
              <MDBox py={2} width>
                <MDInput
                  label="Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  required
                />
              </MDBox>
              <MDBox py={2} width>
                <FormControl fullWidth>
                  <InputLabel id="role">Role *</InputLabel>
                  <Select
                    style={{ height: 40 }}
                    labelId="role"
                    value={role}
                    label="Role"
                    onChange={(e) => setRole(e.target.value)}
                    required>
                    <MenuItem value={"user"}>User</MenuItem>
                    <MenuItem value={"administrator"}>Administrator</MenuItem>
                  </Select>
                </FormControl>
              </MDBox>
              <MDBox py={2} width>
                <MDInput
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  required
                />
              </MDBox>
              <MDBox py={2} width>
                <MDInput
                  label="Password"
                  type="text"
                  onChange={(e) => validate(e.target.value)}
                  fullWidth
                  required
                />
                {passwordMatch && (
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "red",
                    }}>
                    Password is not strong
                  </span>
                )}
              </MDBox>
            </MDBox>
          </DialogContent>
          <DialogActions>
            <Button
              variant="gradient"
              color="secondary"
              onClick={handleAddClose}>
              Cancel
            </Button>
            <Button
              variant="gradient"
              color="secondary"
              type="submit"
              disabled={passwordMatch}>
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Dialog open={openEdit} onClose={handleEditClose}>
        <DialogTitle>Edit User</DialogTitle>
        <form onSubmit={handleEditSubmit}>
          <DialogContent>
            <MDBox>
              <MDBox py={2} width>
                <FormControlLabel
                  control={
                    <Switch
                      color="secondary"
                      checked={blocked == 1 ? true : false}
                      onChange={() => setBlocked(!blocked)}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  color="secondary"
                  label="Block"
                />
              </MDBox>
              <MDBox py={2} width>
                <FormControl fullWidth>
                  <InputLabel id="role">Role *</InputLabel>
                  <Select
                    style={{ height: 40 }}
                    labelId="role"
                    value={role}
                    label="Role"
                    onChange={(e) => setRole(e.target.value)}
                    required>
                    <MenuItem value={"user"}>User</MenuItem>
                    <MenuItem value={"administrator"}>Administrator</MenuItem>
                  </Select>
                </FormControl>
              </MDBox>
            </MDBox>
          </DialogContent>
          <DialogActions>
            <Button
              variant="gradient"
              color="secondary"
              onClick={handleEditClose}>
              Cancel
            </Button>
            <Button variant="gradient" color="secondary" type="submit">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </DashboardLayout>
  );
}

export default Users;
