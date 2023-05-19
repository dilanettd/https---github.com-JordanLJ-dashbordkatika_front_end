// React
import React, { useState, useRef, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

// Material UI
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

// JoditEditor
import JoditEditor from "jodit-react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  addPost,
  deletePostById,
  setpostsData,
} from "../../app/feature/postsSlice";

// Toastyfy
import { toast } from "react-toastify";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import MDButton from "../../components/MDButton";

// Material Icon
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";

// import axios instance
import axiosInstance from "../../helpers/axios";
const baseURL = `${process.env.REACT_APP_BACKEND_URL}/api`;

function Posts() {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.posts);

  const editor = useRef(null);

  const [content, setContent] = useState("");

  const [title, setTitle] = useState("");

  const [summary, setSummary] = useState("");

  const [cover, setCover] = useState("");

  const [category, setCategory] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [controller] = useMaterialUIController();

  const { darkMode } = controller;

  const config = useMemo(
    () => ({
      readonly: false,
      uploader: {
        insertImageAsBase64URI: true,
      },
    }),
    []
  );

  const Author = ({ cover, title }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={cover} name={title} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button">
          {title}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const Action = ({ id, index }) => (
    <div key={id}>
      <Link to={`/post/edit/${id}`}>
        <MDButton variant="text" color={darkMode ? "white" : "dark"}>
          <Icon>edit</Icon>&nbsp;edit
        </MDButton>
      </Link>
      <MDButton
        variant="text"
        color="error"
        onClick={() => handleDeletePost(id)}>
        <Icon>delete</Icon>&nbsp;delete
      </MDButton>
    </div>
  );

  const handleDeletePost = (id) => {
    let confirm = confirm("Do you really want to delete this Post");
    if (confirm) {
      axiosInstance
        .delete(`/post/${id}`)
        .then(() => {
          dispatch(deletePostById(id));
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

  useEffect(() => {
    axiosInstance
      .get("/posts")
      .then((res) => {
        dispatch(setpostsData(res.data));
      })
      .catch(() => {
        toast.error("Something went wrong !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("category", category);
    formData.append("file", cover);
    formData.append("content", content);
    axiosInstance
      .post("/post", formData)
      .then((res) => {
        dispatch(addPost(res.data));
        setIsLoading(false);
        setTitle("");
        setSummary("");
        setCategory("");
        setContent("");
        setCover("");
        toast.success("Add successfully !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch(() => {
        setIsLoading(false);
        alert("Try again!");
      });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
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
                  Posts Table
                </MDTypography>
              </MDBox>

              <MDBox pt={3}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead style={{ display: "contents" }}>
                      <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {posts.map((row, index) => (
                        <TableRow key={row.id}>
                          <TableCell>
                            <Author
                              cover={`${baseURL}/post/image/${row.cover}`}
                              title={row.title}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Action id={row.id} index={index} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <MDTypography variant="h5" color="black" p={2}>
        Add Post
      </MDTypography>
      <form onSubmit={submitForm}>
        <Card>
          <MDBox p={4}>
            <MDBox>
              <MDBox py={2} width>
                <MDInput
                  label="Title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  fullWidth
                  required
                />
              </MDBox>
              <MDBox py={2} width>
                <FormControl fullWidth>
                  <InputLabel id="category">Category *</InputLabel>
                  <Select
                    style={{ height: 40 }}
                    labelId="category"
                    value={category}
                    label="Category"
                    onChange={(e) => setCategory(e.target.value)}
                    required>
                    <MenuItem value={"Blockchain"}>Blockchain</MenuItem>
                    <MenuItem value={"IoT"}>IoT</MenuItem>
                    <MenuItem value={"Katika Wallet"}>Katika Wallet</MenuItem>
                    <MenuItem value={"Geolocalisation"}>
                      Geolocalisation
                    </MenuItem>
                    <MenuItem value={"Ludokin"}>Ludokin</MenuItem>
                  </Select>
                </FormControl>
              </MDBox>
              <MDBox py={2}>
                <MDInput
                  label="Cover"
                  type="file"
                  onChange={(e) => setCover(e.target.files[0])}
                  fullWidth
                  required
                />
              </MDBox>
              <MDBox py={2}>
                <MDInput
                  label="Summary"
                  type="text"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  fullWidth
                  required
                />
              </MDBox>
            </MDBox>
            <MDBox py={2}>
              <JoditEditor
                ref={editor}
                value={content}
                onBlur={(newContent) => setContent(newContent)}
                config={config}
                tabIndex={1} // tabIndex of textarea
                onChange={(newContent) => {
                  setContent(newContent);
                }}
              />
            </MDBox>
            <MDBox py={2}>
              <MDButton
                variant="gradient"
                color="info"
                type="submit"
                disabled={isLoading}>
                Submit
              </MDButton>
            </MDBox>
          </MDBox>
        </Card>
      </form>
    </DashboardLayout>
  );
}

export default Posts;
