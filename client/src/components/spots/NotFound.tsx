import { Card, CardContent, Typography } from "@mui/material";
import { FC } from "react";

interface errorMessage {
  message: string;
}

export const NotFound: FC<errorMessage> = ({ message }) => {
  return (
    <>
      <Card
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "column",
          mx: "auto",
          width: "60%",
          height: "100%",
          backgroundColor: "#F8C1C1",
        }}
      >
        <CardContent>
          <Typography variant="h3" color="error">
            Something went wrong!
          </Typography>
          <Typography variant="h5" color="error">
            Error: {message}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};
