import { useState, useEffect } from "react";
import "./App.css";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CardGrid from "./CardGrid";
import TextField from "@mui/material/TextField";

export default function App() {
  const [catagory, setCatagory] = useState("weapons");
  const [gameStage, setGameStage] = useState("start");
  const [score, setScore] = useState(0);
  const [tryCount, setTryCount] = useState(1);
  const [type, setType] = useState("");
  const [name, setName] = useState("");

  // useEffect(() => {
  //   console.log("Name updated:", name);
  // }, [name]);
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", 
        alignItems: "center", 
        background: "linear-gradient(135deg, #0f1923 0%, #1f4068 100%)",
        p: 0,
        m: 0,
      }}
    >
      <Box
        sx={{
          width: { xs: "95vw", sm: "80vw", md: "60vw", lg: "50vw" },
          background: "#ff4655",
          color: "white",
          borderRadius: 2,
          mb: 3,
          p: 2,
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: 900,
            letterSpacing: 2,
            fontSize: { xs: "2rem", md: "3rem" },
          }}
        >
          Valorant Trivia
        </Typography>
      </Box>
      {gameStage === "start" && (
        <Box>
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 700,
              mt: 2,
              textAlign: "center",
              fontSize: "1.3rem",
              letterSpacing: 2,
              textShadow: "1px 1px 8px #1f4068",
              mb: 1,
            }}
          >
            Let's see how well you know Valorant
          </Typography>
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 600,
              mt: 2,
              textAlign: "center",
              fontSize: "1.2rem",
              letterSpacing: 1,
            }}
          >
            Enter your name to start!
          </Typography>
          <Box
            component="form"
            sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="filled-basic"
              label="Name"
              variant="filled"
              value={type}
              onChange={(event) => {
                setType(event.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  setName(type);
                  setGameStage('choose');
                }
              }}
              sx={{
                input: {
                  color: "#fff",
                  fontWeight: 700,
                  background: "rgba(31,64,104,0.7)",
                  borderRadius: 2,
                  letterSpacing: 1,
                  padding: "12px",
                },
                label: {
                  color: "#ff4655",
                  fontWeight: 700,
                  letterSpacing: 1,
                },
                "& .MuiFilledInput-root": {
                  background: "rgba(31,64,104,0.7)",
                  borderRadius: 2,
                  border: "2px solid #ff4655",
                  color: "#fff",
                  fontWeight: 700,
                  "&:hover": {
                    background: "rgba(31,64,104,0.9)",
                    borderColor: "#ff6f91",
                  },
                  "&.Mui-focused": {
                    borderColor: "#ff4655",
                    background: "rgba(31,64,104,1)",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#ff4655",
                  fontWeight: 700,
                },
              }}
            />
          </Box>
        </Box>
      )}
      {gameStage === "choose" && (
        <Box>
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              sx={{
                mt: 3,
                background: "#ff4655",
                color: "white",
                fontWeight: "bold",
                borderRadius: 2,
                "&:hover": {
                  background: "#ff6f91",
                },
              }}
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
              sx={{
                mt: 3,
                background: "#ff4655",
                color: "white",
                fontWeight: "bold",
                borderRadius: 2,
                "&:hover": {
                  background: "#ff6f91",
                },
              }}
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
              sx={{
                mt: 3,
                background: "#ff4655",
                color: "white",
                fontWeight: "bold",
                borderRadius: 2,
                "&:hover": {
                  background: "#ff6f91",
                },
              }}
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
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 600,
              mt: 2,
              textAlign: "center",
              fontSize: "1.2rem",
              letterSpacing: 1,
            }}
          >
            Great Job {name}!
          </Typography>
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 600,
              mt: 2,
              textAlign: "center",
              fontSize: "1.2rem",
              letterSpacing: 1,
            }}
          >
            Your score was: {score}
          </Typography>
          <Button
            variant="contained"
            sx={{
              mt: 3,
              background: "#ff4655",
              color: "white",
              fontWeight: "bold",
              borderRadius: 2,
              "&:hover": {
                background: "#ff6f91",
              },
            }}
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
