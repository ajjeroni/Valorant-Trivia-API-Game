import { Button, Card, Grid } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";

export default function CardGrid({ catagory, score, setScore, setGameStage, tryCount, setTryCount }) {
  const [valStateData, setValStateData] = useState([]);
  const [correctElement, setCorrectElement] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    fetch(`https://valorant-api.com/v1/${catagory}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        let contentArr = [];
        for (let i = 0; i < result.data.length; i++) {
          let contentName = result.data[i].displayName;
          let contentImg = "";
          if (catagory == "maps") {
            contentImg = result.data[i].splash;
          } else {
            contentImg = result.data[i].displayIcon;
          }
          let contentObj = { name: contentName, img: contentImg };
          contentArr.push(contentObj);
        }

        const shuffled = contentArr.sort(() => 0.5 - Math.random());
        const cardArr = shuffled.slice(0, 3);

        setCorrectElement(getRandomIntInclusive(0, cardArr.length - 1));
        setValStateData(cardArr);
      })
      .catch((error) => console.error(error));
  }, [catagory, refreshKey]);
  function updateScore() {
    let newScore = score + 10;
    setScore(newScore);
  }
  function checkCorrectCard(card) {
    if(tryCount === 5){
      setGameStage('over')
    }
    if (card.name == valStateData[correctElement].name) {
      updateScore();
      console.log('Correct!')
    }else{
      console.log('Not Correct!')
    }
    setRefreshKey((prev) => prev + 1);
  }

  return (
    <Box>
      <Box>
        <Typography
          variant="h4"
          component="div"
          sx={{
            flexGrow: 1,
            color: "#ff4655",
            fontWeight: 700,
            mb: 2,
            textAlign: "center",
            textShadow: "1px 1px 8px #1f4068",
          }}
        >
          {valStateData.length > 0 &&
          correctElement !== null &&
          valStateData[correctElement]
            ? `Which is ${valStateData[correctElement].name}?`
            : "Loading..."}
        </Typography>
      </Box>
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "40vh", mt: 2, mb: 2 }}
      >
        {valStateData.map((element, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                maxWidth: 345,
                margin: "0 auto",
                borderRadius: 3,
                boxShadow: 6,
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 12,
                },
                background: "rgba(255,255,255,0.07)",
                border: "2px solid #ff4655",
              }}
            >
              <CardActionArea
                onClick={() => {
                  console.log(element.name);
                  setTryCount(tryCount + 1);
                  checkCorrectCard(element);
                }}
              >
                <CardMedia component="img" height="140" image={element.img} />
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
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
          Score: {score}
        </Typography>
      </Box>
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
          setGameStage('choose');
        }}
      >
        Reset
      </Button>
    </Box>
  );
}

