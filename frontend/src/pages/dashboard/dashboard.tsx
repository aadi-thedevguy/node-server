import React, {
  FC,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

import { format } from "date-fns";
import { Grid, Box, Drawer, Typography, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import HailIcon from "@mui/icons-material/Hail";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../../context/AppContext";
import { Sidebar } from "../../components/sidebar/sidebar";
import TaskArea from "../../components/taskArea/taskArea";

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
        component={"nav"}
        mt={2}
        mx={"auto"}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "90%",
        }}
      >
        <Typography variant="h5" color={"primary.main"}>
          Tasks Manager
        </Typography>
        <IconButton aria-label="open" onClick={() => setOpen(true)} title="Your Profile">
          <HailIcon color="primary" fontSize="large" />
        </IconButton>
      </Box>

      <Typography variant="h4" my={3} px={4}>
        Status Of Your Tasks As On {format(new Date(), "PPPP")}
      </Typography>
      <TaskArea />
      <Drawer
        variant="temporary"
        anchor="right"
        open={open}
        onClose={() => setOpen(!open)}
        sx={{
          "& .MuiDrawer-paper": { background: "#151515" },
        }}
      >
        <IconButton
          onClick={() => setOpen(false)}
          sx={{ position: "fixed", right: "1rem" }}
        >
          <ChevronRightIcon />
        </IconButton>
        <Sidebar setOpen={setOpen} />
      </Drawer>
    </Grid>
  );
};
