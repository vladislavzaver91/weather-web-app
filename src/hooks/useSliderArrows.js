import React from "react";
import { muiIcons } from "utils/icons";
import styled from "@emotion/styled";

const CustomArrow = ({ direction, onClick }) => (
    <div onClick={onClick}>
        {direction === 'left' ? (
            <ArrowLeftIcon />
        ) : (
            <ArrowRightIcon />
        )}
    </div>
);

const ArrowLeftIcon = styled(muiIcons.KeyboardDoubleArrowLeftOutlinedIcon)`
width: 24px;
height: 24px;
color: #00CED1;
cursor: pointer;
@media screen and (min-width: 768px) {
    width: 32px;
    height: 32px;
}
@media screen and (min-width: 1200px) {
    width: 40px;
height: 40px;
}
`;

const ArrowRightIcon = styled(muiIcons.KeyboardDoubleArrowRightRoundedIcon)`
width: 24px;
height: 24px;
color: #00CED1;
cursor: pointer;
@media screen and (min-width: 768px) {
    width: 32px;
    height: 32px;
}
@media screen and (min-width: 1200px) {
    width: 40px;
height: 40px;
}
`;

export const useSliderArrows = () => ({
    prevArrow: <CustomArrow direction="left" />,
    nextArrow: <CustomArrow direction="right" />,
});
