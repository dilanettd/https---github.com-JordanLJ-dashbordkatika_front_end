// React
import React, { useState, useEffect, useMemo } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "../../components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// import axios instance
import axiosInstance from "../../helpers/axios";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";

// @mui material components
import Icon from "@mui/material/Icon";

// Redux
import { addGps, deleteGpsById, editGps, setGpssData } from "../../app/feature/gpssSlice";
import { useDispatch, useSelector } from "react-redux";

// Toastyfy
import { toast } from "react-toastify";

import background from "../../assets/images/bg-sign-in-basic.jpeg";

function Gps() {
  const [modalText, setModalText] = useState("");

  const dispatch = useDispatch();

  const gpss = useSelector((state) => state.gpss.gpss);

  const [open, setOpen] = useState(false);

  const [id, setId] = useState("");

  const [type, setType] = useState("");

  const [name, setName] = useState("");

  const [priceMotorcycles, setPriceMotorcycles] = useState("");

  const [priceTaxis, setPriceTaxis] = useState("");

  const [priceTruck, setPriceTruck] = useState("");

  const [controller] = useMaterialUIController();

  const { darkMode } = controller;

  const handleEdit = (gps) => {
    setId(gps.id);
    setType(gps.type);
    setName(gps.name);
    setPriceTaxis(gps.priceTaxis);
    setPriceTruck(gps.priceTruck);
    setPriceMotorcycles(gps.priceMotorcycles);
    setModalText("Edit GPS");
    setOpen(true);
  };

  const handleDelete = (id) => {
    let confirm = confirm("Do you really want to delete this GPS");
    if (confirm) {
      axiosInstance
        .delete(`/gps/${id}`)
        .then(() => {
          dispatch(deleteGpsById(id));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("type", type);
    formData.append("priceMotorcycles", priceMotorcycles);
    formData.append("priceTricycles", priceMotorcycles);
    formData.append("priceTaxis", priceTaxis);
    formData.append("priceCarriages", priceTaxis);
    formData.append("priceTruck", priceTruck);
    if (modalText === "Add GPS") {
      axiosInstance
        .post("/gps", formData)
        .then((res) => {
          dispatch(addGps(res.data));
          setType("");
          setName("");
          setPriceTaxis("");
          setPriceTruck("");
          setPriceMotorcycles("");
          handleClose();
          toast.success("Add successfully !", {
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch(() => {
          toast.error("Something went wrong !", {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    } else {
      axiosInstance
        .post(`/gps/${id}`, formData)
        .then((res) => {
          dispatch(editGps([res.data, id]));
          setType("");
          setName("");
          setPriceTaxis("");
          setPriceTruck("");
          setPriceMotorcycles("");
          handleClose();
          toast.success("Update successfully !", {
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

  useEffect(() => {
    axiosInstance.get("/gpss").then((res) => {
      dispatch(setGpssData(res.data));
    });
  }, []);

  const handleClickOpen = () => {
    setModalText("Add GPS");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={2} pl={2}>
        <MDButton variant="gradient" color="info" onClick={handleClickOpen}>
          <Icon>add</Icon>
          &nbsp;Add GPS
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
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  GPS lists
                </MDTypography>
              </MDBox>
              <MDBox p={4}>
                <Grid
                  container
                  spacing={1}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {gpss.map((item, index) => (
                    <Grid xs={12} sm={8} md={5} key={item.id} margin={2}>
                      <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                          component="img"
                          alt="green iguana"
                          height="140"
                          image={background}
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            textAlign={"center"}
                          >
                            {item.type}
                          </Typography>
                          <MDBox pl={4}>
                            <Typography variant="body2" color={darkMode ? "white" : "dark"}>
                              <strong>Price for Motorcycles :</strong> {item.priceMotorcycles} FCFA
                            </Typography>
                            <Typography variant="body2">
                              <strong>Price for Tricycles :</strong> {item.priceTricycles} FCFA
                            </Typography>
                            <Typography variant="body2">
                              <strong>Price for Taxis :</strong> {item.priceTaxis} FCFA
                            </Typography>
                            <Typography variant="body2">
                              <strong> Price for Carriages :</strong> {item.priceCarriages} FCFA
                            </Typography>
                            <Typography variant="body2">
                              <strong>Price for Truck :</strong> {item.priceTruck} FCFA
                            </Typography>
                          </MDBox>
                        </CardContent>
                        <CardActions style={{ display: "flex", justifyContent: "center" }}>
                          <Box style={{ display: "flex", justifyContent: "center" }}>
                            <MDButton
                              variant="text"
                              onClick={() => handleEdit(item)}
                              color={darkMode ? "white" : "dark"}
                            >
                              <Icon>edit</Icon>&nbsp;edit
                            </MDButton>
                            <MDButton
                              variant="text"
                              color="error"
                              onClick={() => handleDelete(item.id)}
                            >
                              <Icon>delete</Icon>&nbsp;delete
                            </MDButton>
                          </Box>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Dialog open={open} onClose={handleClose} fullWidth={"sm"}>
        <DialogTitle>{modalText}</DialogTitle>
        <form onSubmit={handleSubmit}>
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
                <MDInput
                  label="Type"
                  type="text"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  fullWidth
                  required
                />
              </MDBox>
              <MDBox py={2} width>
                <MDInput
                  label="Prise for Motocycles and Tricycles"
                  type="number"
                  value={priceMotorcycles}
                  onChange={(e) => setPriceMotorcycles(e.target.value)}
                  fullWidth
                  required
                />
              </MDBox>
              <MDBox py={2} width>
                <MDInput
                  label="Prise for Taxis, Private Cars,Carriages & Touristic Cars"
                  type="number"
                  value={priceTaxis}
                  onChange={(e) => setPriceTaxis(e.target.value)}
                  fullWidth
                  required
                />
              </MDBox>
              <MDBox py={2} width>
                <MDInput
                  label="Prise for Buces & Trucks"
                  type="number"
                  value={priceTruck}
                  onChange={(e) => setPriceTruck(e.target.value)}
                  fullWidth
                  required
                />
              </MDBox>
            </MDBox>
          </DialogContent>
          <DialogActions>
            <MDButton variant="gradient" color="secondary" onClick={handleClose}>
              Cancel
            </MDButton>
            <MDButton variant="gradient" color="secondary" type="submit">
              {setGpssData === "Add GPS" ? "Add" : "Save"}
            </MDButton>
          </DialogActions>
        </form>
      </Dialog>
    </DashboardLayout>
  );
}

export default Gps;
