import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";

export default function Score({
  name,
  score,
  setScore,
  setTryCount,
  setGameStage,
}) {
  const [valRankData, setValRankData] = useState([]);
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  useEffect(() => {
    fetch(
      "https://valorant-api.com/v1/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        let ranksNameArray = new Set();
        for (let i = 3; i < result.data.tiers.length; i++) {
          ranksNameArray.add(result.data.tiers[i].divisionName);
        }
        ranksNameArray = Array.from(ranksNameArray);
        setValRankData(ranksNameArray);
      })
      .catch((error) => console.error(error));
  }, []);

  function calculateRank(score) {
    let i = score / 10
    return valRankData[i]
  }
  function rankImg(score){
    if (score == 80) {
      return 27;
    } else if (score >= 70) {
      return 26;
    } else if (score >= 60) {
      return 23;
    } else if (score >= 50) {
      return 20;
    } else if (score >= 40) {
      return 17;
    } else if (score >= 30) {
      return 14;
    } else if (score >= 20) {
      return 11;
    } else if (score >= 10) {
      return 8;
    } else if (score >= 0) {
      return 5;
    }
  }
  return (
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
        Your Rank in Valorant would be: {calculateRank(score)}
      </Typography>
      <Box
        component="img"
        src={`https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/${rankImg(score)}/largeicon.png`}
        sx={{
          display: "block",
          margin: "20px auto",
          width: 100,
          height: 100,
          objectFit: "contain",
        }}
        alt="Valorant Rank Icon"
      />
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
  );
}
