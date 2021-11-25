import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

export default function ImageCard({ image }) {
  return (
    <Card
      sx={{
        maxWidth: 3450,
        
        boxShadow: "0 0 0.6rem rgba(255,255,255,0.5)",
        cursor: "pointer",
      }}
      onClick={() => window.open(image, "_blank")}
    >
      <CardMedia component="img" image={image} alt="green iguana"  />
    </Card>
  );
}
