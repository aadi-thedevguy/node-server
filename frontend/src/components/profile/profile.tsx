import { Avatar, Box, Button, Typography } from "@mui/material";
import React, { FC, ReactElement, useContext } from "react";
import { AppContext } from "../../context/AppContext";

const urls = ["Loki", "Felix","Pumpkin","Tigger","Boots","Muffin","Coco","Sassy","Shadow"]
const seed = urls[Math.floor(Math.random() * urls.length )]

export const Profile: FC = (): ReactElement => {
  const { user, logout } = useContext(AppContext);

  const handleClick = () => logout();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Avatar
        sx={{
          width: "96px",
          height: "96px",
          backgroundColor: "primary.main",
          marginBottom: "16px",
        }}
        src={`https://api.dicebear.com/5.x/fun-emoji/svg?seed=${seed}&backgroundColor=059ff2`}
        alt="avatar"
      />
      <Typography variant="h6" color="text.primary">
        {`Welcome, ${user && user.name && user.name.split(" ")[0]}`}
      </Typography>
      <Typography variant="body1" color="text.primary">
        This is your personal tasks manager
      </Typography>
      <Button
        sx={{ marginTop: ".8rem" }}
        onClick={handleClick}
        variant="contained"
        size="large"
      >
        Logout
      </Button>
    </Box>
  );
};
