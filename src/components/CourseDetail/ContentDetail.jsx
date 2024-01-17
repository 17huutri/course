import React, { useState } from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SmallContent from "./SmallContent";
import { Rate, Typography } from "antd";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";

import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { PiClockClockwiseBold } from "react-icons/pi";
import { BsCameraVideo } from "react-icons/bs";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: "none",
  "&:not(:last-child)": {
    borderBottom: "1px solid #d7d7d7",
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon sx={{ color: "black", fontSize: "1rem" }} />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "white",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));
export default function ContentDetail() {
  const { courseDetail } = useSelector((state) => state.courseReducer);

  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [panel]: newExpanded,
    }));
  };

  return (
    <div className=" mx-36 relative px-10 py-10 bg-white  z-10">
      <h1 className="text-5xl pb-10 font-semibold text-black">
        What will you learn ?
      </h1>
      {courseDetail &&
        courseDetail.sections.map((sections, index) => {
          const panel = `panel${index + 1}`;
          return (
            <Accordion
              key={panel}
              expanded={expanded[panel]}
              onChange={handleChange(panel)}
            >
              <AccordionSummary
                aria-controls={`${panel}-content`}
                id={`${panel}-header`}
              >
                <div className="flex justify-between w-full py-2">
                  <Typography className="text-xl">{sections.name}</Typography>
                  <div className="flex items-center relative ">
                    <BsCameraVideo className="text-[14px] text-[#0000008f]" />
                    <p className="pl-2 text-[14px] text-[#0000008f]">
                      28 Lectures
                    </p>
                    <span className="px-4">/</span>
                    <PiClockClockwiseBold className="text-[14px]" />
                    <p className="pl-1 text-[14px]"> 12 Mins</p>
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
    </div>
  );
}
