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
  const [gameStage, setGameStage] = useState("start");
  const [score, setScore] = useState(0);
  const [tryCount, setTryCount] = useState(1);

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
      {gameStage === "start" && (
        <Box>
          <Typography>Let's see how well you know Valorant!</Typography>
          <Button onClick={() => setGameStage("choose")}>Start</Button>
        </Box>
      )}
      {gameStage === "choose" && (
        <Box>
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              onClick={() => {
                console.log("click weapons");
                setCatagory("weapons");
                console.log(catagory);
                setGameStage("play");
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
                setGameStage("play");
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
                setGameStage("play");
              }}
            >
              Agents
            </Button>
          </Stack>
        </Box>
      )}
      {gameStage === "play" && (
        <CardGrid
          catagory={catagory}
          score={score}
          setScore={setScore}
          setGameStage={setGameStage}
          tryCount={tryCount}
          setTryCount={setTryCount}
        />
      )}
      {gameStage === "over" && (
        <Box>
          <Typography>Great Job!</Typography>
          <Typography>Your score was: {score}</Typography>
          <Button
            onClick={() => {
              setScore(0);
              setTryCount(1);
              setGameStage("choose");
            }}
          >
            Play Again
          </Button>
        </Box>
      )}
    </Container>
  );
}
