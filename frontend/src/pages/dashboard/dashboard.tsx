import React, {
  FC,
  ReactElement,
  useContext,
  useEffect,
  useState,
  Suspense
} from "react";

import { format } from "date-fns";
import { Grid, Box, Drawer, CircularProgress } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from "react-router-dom";

import { AppContext } from "../../context/AppContext";
import { Sidebar } from "../../components/sidebar/sidebar";
import TaskArea from "../../components/taskArea/taskArea";
const CreateTaskForm = React.lazy(() => import("../../components/createTaskForm/createTaskForm"))
const Profile = React.lazy(() => import("../../components/profile/profile"))

export const Dashboard: FC = (): ReactElement => {
  const ctx = useContext(AppContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!ctx.user) navigate("/login");
  }, [ctx.user]);

  return (
    <Grid container minHeight="100vh" p={0} m={0}>
      <Box
      component={'nav'}
        mb={2}
        px={4}
        sx={{
          display: "flex",
          alignItems: "center",
          
        }}
      >
        <h2>Status Of Your Tasks As On {format(new Date(), "PPPP")}</h2>
        <IconButton
          aria-label="open"
          onClick={() => setOpen(true)}
          sx={{ position: "fixed", right: "1rem", display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      </Box>
      <TaskArea />
      <Sidebar />
      <Drawer
        variant="temporary"
        anchor="right"
        open={open}
        onClose={() => setOpen(!open)}
        sx={{
          
          display: {
            lg: "none",
          },
          '& .MuiDrawer-paper': { background: '#151515'}
        }}
      >
        <IconButton onClick={() => setOpen(false)}
          sx={{ position: "fixed", right: "1rem" }}
        >
            <ChevronRightIcon />
          </IconButton>
          <Suspense fallback={<CircularProgress />}>
      <Profile/>
      <CreateTaskForm setOpen={setOpen} />
    </Suspense>
      </Drawer>
    </Grid>
  );
};
