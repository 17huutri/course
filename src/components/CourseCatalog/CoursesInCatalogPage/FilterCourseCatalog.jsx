import React, { useState } from "react";
import { BsArrowLeft, BsFilter } from "react-icons/bs";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { Radio, Rate, Slider } from "antd";

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

export default function FilterCourseCatalog({
  showFilterPanel,
  onClose,
  filterPrice,
  onFilterPriceChange,
}) {
  const [expandedTopRate, setExpandedTopRate] = useState(false);
  const [expandedPrices, setExpandedPrices] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [filterRate, setFilterRate] = useState(1);

  const marks = {
    0: {
      style: {
        color: "black",
      },
      label: <strong>0$</strong>,
    },

    1000: {
      style: {
        color: "black",
      },
      label: <strong>1000$</strong>,
    },
  };

  const toggleFilterPanel = () => {
    setExpandedTopRate(false);

    if (onClose && showFilterPanel) {
      onClose();
    }
  };
  const handlePricesAccordionChange = () => {
    setExpandedPrices(!expandedPrices);
    setShowTooltip(!showTooltip);
  };

  const handleFilterRate = (e) => {
    setFilterRate(e.target.value);
  };

  const handleFilterPrice = (value) => {

    onFilterPriceChange(value);
  };
  return (
    <div className="w-1/2 border-r border-solid border-gray-200 pr-4 transform  transition-transform ease-in-out duration-500">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <p className="text-[20] font-medium">Filter</p>
          <button className="flex items-center" onClick={toggleFilterPanel}>
            |<BsArrowLeft />
          </button>
        </div>

        <Accordion
          expanded={expandedTopRate}
          onChange={() => setExpandedTopRate(!expandedTopRate)}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <h1 className="text-[20px] font-semibold">Top Rate</h1>
          </AccordionSummary>
          <AccordionDetails>
            <Radio.Group
              onChange={handleFilterRate}
              className="gap-2 flex flex-col"
              value={filterRate}
            >
              <Radio className="flex items-center w-full" value={1}>
                <div className="flex items-center gap-4">
                  <Rate
                    className="text-[#ffbf23] text-[12px]"
                    disabled
                    allowHalf
                    defaultValue={2.5}
                  />
                  <p className="text-[13px]">From 4.5 and above</p>{" "}
                </div>
              </Radio>
              <Radio className="flex items-center " value={2}>
                <div className="flex items-center gap-4">
                  <Rate
                    className="text-[#ffbf23] text-[12px]"
                    disabled
                    allowHalf
                    defaultValue={2.5}
                  />
                  <p className="text-[13px]">From 4.0 and above</p>{" "}
                </div>
              </Radio>
              <Radio className="flex items-center " value={3}>
                <div className="flex items-center gap-4">
                  <Rate
                    className="text-[#ffbf23] text-[12px]"
                    disabled
                    allowHalf
                    defaultValue={2.5}
                  />
                  <p className="text-[13px]">From 3.5 and above</p>{" "}
                </div>
              </Radio>
              <Radio className="flex items-center " value={4}>
                <div className="flex items-center gap-4">
                  <Rate
                    className="text-[#ffbf23] text-[12px]"
                    disabled
                    allowHalf
                    defaultValue={2.5}
                  />
                  <p className="text-[13px]">From 3.0 and above</p>{" "}
                </div>
              </Radio>
            </Radio.Group>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expandedPrices}
          onChange={handlePricesAccordionChange}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <h1 className="text-[20px] font-semibold">Prices</h1>
          </AccordionSummary>
          <AccordionDetails>
            <Slider
              min={0}
              max={1000}
              tooltip={{
                open: !showTooltip,
              }}
              range
              marks={marks}
              onAfterChange={handleFilterPrice}
              defaultValue={filterPrice}
            />
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}
