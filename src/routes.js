// import Dashboard from "layouts/dashboard";
import Posts from "layouts/posts";
import Users from "layouts/users";
import Comments from "layouts/comments";
import Gps from "layouts/gps";

// import isAuthenticate from "./helpers/isAuthenticate";

// @mui icons
import Icon from "@mui/material/Icon";
import Proformas from "./layouts/proforma";
import Visitors from "./layouts/visitors";
import IsAuthenticate from "./helpers/isAuthenticate";

const routes = [
  {
    type: "collapse",
    name: "Posts",
    key: "posts",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/posts",
    component: (
      <IsAuthenticate>
        <Posts />
      </IsAuthenticate>
    ),
  },
  {
    type: "collapse",
    name: "Comments",
    key: "comments",
    icon: <Icon fontSize="small">message</Icon>,
    route: "/comments",
    component: (
      <IsAuthenticate>
        <Comments />
      </IsAuthenticate>
    ),
  },

  // {
  //   type: "collapse",
  //   name: "GPS",
  //   key: "gps",
  //   icon: <Icon fontSize="small">public</Icon>,
  //   route: "/gps",
  //   component: (
  //     <IsAuthenticate>
  //       <Gps />
  //     </IsAuthenticate>
  //   ),
  // },
  {
    type: "collapse",
    name: "Proforma",
    key: "proforma",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/proforma",
    component: (
      <IsAuthenticate>
        <Proformas />
      </IsAuthenticate>
    ),
  },
  {
    type: "collapse",
    name: "Visitors",
    key: "visitors",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/visitors",
    component: (
      <IsAuthenticate>
        <Visitors />
      </IsAuthenticate>
    ),
  },

  {
    type: "collapse",
    name: "Users",
    key: "users",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/users",
    component: (
      <IsAuthenticate>
        <Users />
      </IsAuthenticate>
    ),
  },
];

export default routes;
