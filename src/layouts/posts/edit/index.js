// React
import React, { useState, useRef, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";

// JoditEditor
import JoditEditor from "jodit-react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDInput from "components/MDInput";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import MDButton from "../../../components/MDButton";

// @mui material components
import Icon from "@mui/material/Icon";

// import axios instance
import axiosInstance from "../../../helpers/axios";

// Material UI
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// Redux
import { useDispatch } from "react-redux";
import { editPost } from "../../../app/feature/postsSlice";

// Toastyfy
import { toast } from "react-toastify";

function EditPost() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { id } = useParams();

  const editor = useRef(null);

  const [content, setContent] = useState("");

  const [title, setTitle] = useState("");

  const [summary, setSummary] = useState("");

  const [cover, setCover] = useState("");

  const [category, setCategory] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const config = useMemo(
    () => ({
      readonly: false,
      uploader: {
        insertImageAsBase64URI: true,
      },
    }),
    []
  );

  useEffect(() => {
    axiosInstance
      .get(`/post/${id}`)
      .then((data) => {
        setContent(data.data.content);
        setTitle(data.data.title);
        setSummary(data.data.summary);
        setCategory(data.data.category);
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
      .post(`/post/${id}`, formData)
      .then((res) => {
        dispatch(editPost([res.data, id]));
        setTitle("");
        setSummary("");
        setCategory("");
        setContent("");
        setCover("");
        toast.success("Update successfully !", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsLoading(false);
        navigate("/posts");
      })
      .catch(() => {
        setIsLoading(false);
        toast.error("Something went wrong !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={2}>
        <MDButton variant="gradient" color="secondary" onClick={() => navigate("/posts")}>
          <Icon>arrow_back</Icon>
          &nbsp;Back
        </MDButton>
      </MDBox>
      <form onSubmit={submitForm} style={{ padding: 10 }}>
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
                required
              >
                <MenuItem value={"Blockchain"}>Blockchain</MenuItem>
                <MenuItem value={"IoT"}>IoT</MenuItem>
                <MenuItem value={"Katika Wallet"}>Katika Wallet</MenuItem>
                <MenuItem value={"Geolocalisation"}>Geolocalisation</MenuItem>
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
          <MDButton variant="gradient" color="info" type="submit" disabled={isLoading}>
            Save
          </MDButton>
        </MDBox>
      </form>
    </DashboardLayout>
  );
}

export default EditPost;
