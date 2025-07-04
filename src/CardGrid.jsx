import { Button, Card, Grid } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";

function CardGrid({ catagory, score, setScore, setGameStage, tryCount, setTryCount }) {
  const [valStateData, setValStateData] = useState([]);
  const [correctElement, setCorrectElement] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min); // Ensure min is an integer
    max = Math.floor(max); // Ensure max is an integer
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    fetch(`https://valorant-api.com/v1/${catagory}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        let contentArr = [];
        let randomIntegerArr = [];
        let cardArr = [];
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
        for (let i = 0; i < 3; i++) {
          let randomInt = getRandomIntInclusive(0, contentArr.length - 1)
          while(randomIntegerArr.includes(randomInt)){
            randomInt = getRandomIntInclusive(0, contentArr.length - 1)
          }
          randomIntegerArr.push(randomInt)
        }
        for (let i = 0; i < 3; i++) {
          cardArr.push(contentArr[randomIntegerArr[i]]);
        }
        // let correctElement = getRandomIntInclusive(0, cardArr.length - 1);
        setCorrectElement(getRandomIntInclusive(0, cardArr.length - 1));
        console.log(correctElement);
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
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          {valStateData.length > 0 &&
          correctElement !== null &&
          valStateData[correctElement]
            ? `Which is ${valStateData[correctElement].name}?`
            : "Loading..."}
        </Typography>
      </Box>
      <Grid
        container
        direction="row"
        sx={{
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {valStateData.map((element, index) => (
          <Grid size={4}>
            <Card sx={{ maxWidth: 345 }} key={index}>
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
        <Typography>Score: {score}</Typography>
      </Box>
      <Button
        onClick={() => {
          setScore(0)
          setTryCount(1)
          setGameStage('choose')
        }}
      >
        Reset
      </Button>
    </Box>
  );
}

export default CardGrid;
