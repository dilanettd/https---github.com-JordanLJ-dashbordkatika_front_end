//import React
import React, { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TablePagination from "@mui/material/TablePagination";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "../../components/MDButton";
import MDBadge from "components/MDBadge";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// @mui material components
import Icon from "@mui/material/Icon";

// import axios instance
import axiosInstance from "../../helpers/axios";

// Toastyfy
import { toast } from "react-toastify";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  editProforma,
  setproformasData,
} from "../../app/feature/proformasSlice";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Row(props) {
  const dispatch = useDispatch();

  const { row } = props;

  const [open, setOpen] = useState(false);

  const [status, setStatus] = useState("");

  const [id, setId] = useState("");

  const [controller] = useMaterialUIController();

  const { darkMode } = controller;

  const [openEdit, setOpenEdit] = useState(false);

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const handleEdit = () => {
    setStatus(row.status);
    setId(row.id);
    setOpenEdit(true);
  };

  const handleSubmitEdit = () => {
    axiosInstance
      .post(`/proforma/category/${id}`, { status: status })
      .then((res) => {
        dispatch(editProforma([res.data, id]));
        toast.success("Update successfully !", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setOpenEdit(false);
        setStatus("");
        setId("");
      })
      .catch(() => {
        toast.error("Something went wrong !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.uid}
        </TableCell>
        <TableCell>{row.created_at.split("T")[0]}</TableCell>
        <TableCell>{row.customerName}</TableCell>
        <TableCell>{row.customerContact}</TableCell>
        <TableCell>{row.customerEmail}</TableCell>
        <TableCell>{row.customerAddress}</TableCell>
        <TableCell>{row.total} FCFA</TableCell>
        <TableCell>
          <MDBox ml={-1}>
            <MDBadge
              badgeContent={row.status}
              color={"success"}
              variant="gradient"
              size="sm"
            />
          </MDBox>
        </TableCell>
        <TableCell align="right">
          <MDButton
            variant="text"
            color={darkMode ? "white" : "dark"}
            onClick={() => handleEdit()}>
            <Icon>edit</Icon>
          </MDButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                GPS
              </Typography>
              <Table aria-label="GPS">
                <TableHead style={{ display: "contents" }}>
                  <TableRow>
                    <TableCell>Type of vehicle</TableCell>
                    <TableCell>Type of GPS</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Unit price</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.gps.map((gpsRow, index) => (
                    <TableRow key={index}>
                      <TableCell>{gpsRow.name}</TableCell>
                      <TableCell>{gpsRow.typeGPS}</TableCell>
                      <TableCell>{gpsRow.quantity}</TableCell>
                      <TableCell>{gpsRow.unitPrice}</TableCell>
                      <TableCell>{gpsRow.total} FCFA</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <Dialog
        open={openEdit}
        onClose={handleEditClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>Edit Proforma status</DialogTitle>
        <DialogContent>
          <MDBox>
            <MDBox py={2} width>
              <FormControl fullWidth>
                <InputLabel id="status">Change status *</InputLabel>
                <Select
                  style={{ height: 40 }}
                  labelId="status"
                  value={status}
                  label="status"
                  onChange={(e) => setStatus(e.target.value)}
                  required>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Pay">Pay</MenuItem>
                </Select>
              </FormControl>
            </MDBox>
          </MDBox>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleSubmitEdit}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

function Proformas() {
  const dispatch = useDispatch();

  const proformas = useSelector((state) => state.proformas.proformas);

  const rows = proformas;

  const [value, setValue] = React.useState(0);

  const [customers, setCustomers] = useState([]);

  const columns = [
    { id: "name", label: "Name", minWidth: 170 },
    {
      id: "email",
      label: "Email",
      minWidth: 170,
    },
    { id: "phone", label: "Phone", minWidth: 170 },
    {
      id: "address",
      label: "Address",
      minWidth: 170,
      align: "right",
    },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    axiosInstance
      .get("/proformas")
      .then((res) => {
        dispatch(setproformasData(res.data));
      })
      .catch(() => {
        toast.error("Something went wrong !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
    axiosInstance.get("/customers").then((res) => {
      setCustomers(res.data);
    });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example">
            <Tab label="Proforma" {...a11yProps(0)} />
            <Tab label="Customer" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
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
                      Proforma lists
                    </MDTypography>
                  </MDBox>
                  <MDBox pt={3}>
                    <TableContainer component={Paper}>
                      <Table aria-label="collapsible table">
                        <TableHead style={{ display: "contents" }}>
                          <TableRow>
                            <TableCell />
                            <TableCell>Raffle number</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Contact</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Edit</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <Row key={row.id} row={row} />
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </MDBox>
                </Card>
              </Grid>
            </Grid>
          </MDBox>
        </TabPanel>
        <TabPanel value={value} index={1}>
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
                      Customers Table
                    </MDTypography>
                  </MDBox>
                  <MDBox pt={3}>
                    <Paper sx={{ width: "100%", overflow: "hidden" }}>
                      <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                          <TableHead style={{ display: "contents" }}>
                            <TableRow>
                              {columns.map((column) => (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{ minWidth: column.minWidth }}>
                                  {column.label}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {customers
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map((customer) => (
                                <TableRow
                                  hover
                                  role="checkbox"
                                  tabIndex={-1}
                                  key={customer.id}>
                                  {columns.map((column) => {
                                    const value = customer[column.id];
                                    return (
                                      <TableCell
                                        key={column.id}
                                        align={column.align}>
                                        {value}
                                      </TableCell>
                                    );
                                  })}
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={customers.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </Paper>
                  </MDBox>
                </Card>
              </Grid>
            </Grid>
          </MDBox>
        </TabPanel>
      </Box>
    </DashboardLayout>
  );
}

export default Proformas;
