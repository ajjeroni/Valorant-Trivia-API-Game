import { useState } from "react";
import "./App.css";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CardGrid from "./CardGrid";


export default function App() {
  const [catagory, setCatagory] = useState("weapons");

  return (
    <Container
      sx={{
        maxWidth: "fit-content",
        display: "flex", // Use flexbox
        flexDirection: "column", // Stack elements vertically
        justifyContent: "flex-start", // Align items to the top
        height: "100vh", // Full height of the viewport
      }}
    >
      <Box sx={{ backgroundColor: "red" }}>
        <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
          Valorant Trivia
        </Typography>
      </Box>
      <Box>
        <Stack spacing={2} direction="row">
          <Button
            variant="contained"
            onClick={() => {
              console.log("click weapons");
              setCatagory("weapons");
              console.log(catagory);
            }}
          >
            Weapons
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              console.log("click maps");
              setCatagory("maps");
              console.log(catagory);
            }}
          >
            Maps
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              console.log("click agents");
              setCatagory("agents");
              console.log(catagory);
            }}
          >
            Agents
          </Button>
        </Stack>
      </Box>
      <CardGrid catagory={catagory} />
    </Container>
  );
}
