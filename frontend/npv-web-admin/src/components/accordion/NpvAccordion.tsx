import {
  Accordion,
  AccordionSummary,
  IconButton,
  AccordionDetails
} from "@mui/material";
import { FaChevronRight } from "react-icons/fa6";

export const NpvAccordion = ({ title, content }: INpvAccordionProps) => {
  return (
    <section>
      <Accordion
        className="!p-1 lg:!p-6 !rounded-[18px] !shadow-[0px_5px_16px_0px_rgba(8,15,52,0.06)]"
        sx={{
          "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
            transform: "rotate(90deg)",
            "& button": {
              backgroundColor: "#800080",
              color: "white"
            }
          },
          "& .MuiAccordionSummary-expandIconWrapper": {
            "& button": {
              backgroundColor: "white",
              color: "#800080",
              boxShadow: "0px 5px 16px 0px #080F340F"
            }
          }
        }}>
        <AccordionSummary
          className="!gap-10"
          expandIcon={
            <IconButton
              className="!w-8 !h-8 md:!w-12 lg:!h-12 !text-[10px] lg:!text-[24px] !shadow-purple-500"
              disableRipple>
              <FaChevronRight className="!text-[14px] lg:!text-[20px]" />
            </IconButton>
          }
          aria-controls="panel1-content"
          id="panel1-header">
          <p className="text-[15px] lg:text-[20px] text-[#170F49] font-medium">
            {title}
          </p>
        </AccordionSummary>
        <AccordionDetails>
          <p className="text-[13px] lg:text-[16px] font-normal text-[#6F6C90]">
            {content}
          </p>
        </AccordionDetails>
      </Accordion>
    </section>
  );
};

interface INpvAccordionProps {
  title: string;
  content: string;
}
