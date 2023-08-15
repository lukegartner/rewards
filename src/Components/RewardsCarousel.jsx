import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
// MUI
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views-react-18-fix";
import Card from "@mui/material/Card";
import { autoPlay } from "react-swipeable-views-utils-react-18-fix";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function RewardsCarousel({ rewards, category }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = rewards.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <>
      <Typography variant="h5" sx={{ ml: "2.5%" }}>
        {category.reward_category}
      </Typography>
      <Card
        sx={{
          width: "95%",
          mx: "auto",
          mb: 1,
          py: 0.5,
          px: 1,
          backgroundImage: "none",
        }}
      >
        <Box sx={{ maxWidth: 300, flexGrow: 1, mx: "auto" }}>
          <Box
            component={Link}
            to={`/user/reward/${rewards[activeStep].id}`}
            sx={{ textDecoration: "none" }}
          >
            <Paper
              square
              elevation={0}
              sx={{
                display: "flex",
                alignItems: "center",
                height: 50,
                pl: 2,
                pr: 2,
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6">
                {rewards[activeStep].reward_title}
              </Typography>
              <Typography>{rewards[activeStep].reward_value} points</Typography>
            </Paper>
            <AutoPlaySwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {rewards.map((step, index) => {
                return (
                  <div key={step.id}>
                    {Math.abs(activeStep - index) <= 2 ? (
                      <Box
                        component="img"
                        sx={{
                          height: 150,
                          display: "block",
                          maxWidth: 400,
                          overflow: "hidden",
                          mx: "auto",
                          //   width: "100%",
                        }}
                        src={step.reward_image}
                        alt={step.reward_title}
                      />
                    ) : null}
                  </div>
                );
              })}
            </AutoPlaySwipeableViews>
          </Box>
          <MobileStepper
            sx={{ bgcolor: "background.paper" }}
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </Box>
      </Card>
    </>
  );
}

export default RewardsCarousel;
