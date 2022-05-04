import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function Animations() {
  return (
    <Box sx={{ width: "40vw", margin: "auto", marginTop: "20vw" }}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
  );
}
