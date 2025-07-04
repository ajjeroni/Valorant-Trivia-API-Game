import { Card, Grid } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";

function CardGrid({ catagory }) {
  const [valStateData, setValStateData] = useState([]);
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
          let randomInteger = getRandomIntInclusive(0, contentArr.length - 1);
          randomIntegerArr.push(randomInteger);
        }
        for (let i = 0; i < 3; i++) {
          cardArr.push(contentArr[randomIntegerArr[i]]);
        }
        console.log(cardArr);

        setValStateData(cardArr);
      })
      .catch((error) => console.error(error));
  }, [catagory]);
  return (
    <Box>
      <Box>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          Question
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
              <CardActionArea>
                <CardMedia component="img" height="140" image={element.img} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {element.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CardGrid;
