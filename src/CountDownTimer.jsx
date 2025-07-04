import {
  Box,
  CircularProgress,
  Typography
} from "@mui/material";
import { styled } from "@mui/material";
import { useEffect, useState, useMemo } from "react";

const useStylesCountDown = styled((theme) => ({
  container: {
    position: "relative",
    width: "200px",
    height: "auto",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  root: {
    position: "relative"
  },
  bottom: {
    color: "#b2b2b2"
  },
  top: {
    animationDuration: "100ms",
    position: "absolute",
    left: 0
  },
  circle: {
    strokeLinecap: "round"
  },
  text: {
    fontWeight: "bold",
    fontSize: "1.35em",
    marginTop: "1em"
  }
}));

const CountDownTimer = (props) => {
  const classes = useStylesCountDown();
  const { duration, colors = [], colorValues = [], onComplete } = props;

  const [timeDuration, setTimeDuration] = useState(duration);
  const [countdownText, setCountdownText] = useState();
  const [countdownPercentage, setCountdownPercentage] = useState(100);
  const [countdownColor, setCountdownColor] = useState("#004082");

  useEffect(() => {
    let intervalId = setInterval(() => {
      setTimeDuration((prev) => {
        const newTimeDuration = prev - 1;
        const percentage = Math.ceil((newTimeDuration / timeDuration) * 100);
        setCountdownPercentage(percentage);

        if (newTimeDuration === 0) {
          clearInterval(intervalId);
          intervalId = null;
          onComplete();
        }

        return newTimeDuration;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
      intervalId = null;
    };
  }, []);

  useEffect(() => {
    const minutes = Math.floor(timeDuration / 60);
    const seconds = timeDuration % 60;
    setCountdownText(`${minutes}:${seconds < 10 ? "0" + seconds : seconds}`);
  }, [timeDuration]);

  useEffect(() => {
    for (let i = 0; i < colorValues.length; i++) {
      const item = colorValues[i];
      if (timeDuration === item) {
        setCountdownColor(colors[i]);
        break;
      }
    }
  }, [timeDuration]);

  return (
    <>
      <Box className={classes.container}>
        <Box className={classes.root}>
          {/* <CircularProgress
            variant="determine"
            className={classes.bottom}
            size={80}
            thickness={4}
            value={100}
          /> */}
          <CircularProgress
            className={classes.top}
            classes={{
              circle: classes.circle
            }}
            variant="determinate"
            size={80}
            thickness={4}
            value={countdownPercentage}
            style={{
              transform: "scaleX(-1) rotate(-90deg)",
              color: countdownColor
            }}
          />
        </Box>
        <Typography className={classes.text}>{countdownText}</Typography>
      </Box>
    </>
  );
};

export default CountDownTimer;

  // const handleOnComplete = () => {
  //   console.log("Completed");
  // };

        {/* <CountDownTimer
        duration={40}
        colors={["#ff9248", "#a20000"]}
        colorValues={[20, 10]}
        onComplete={handleOnComplete}
      /> */}