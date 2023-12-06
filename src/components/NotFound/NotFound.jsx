import React from "react";
import styled from "@emotion/styled";
import { Button } from '@mui/material';
import { muiIcons } from 'utils/icons';
import { useLocation } from "hooks/useLocation";

export const NotFound = () => {
    const { getUserLocation, setIsLoading, isLoading } = useLocation();

        const handleClick = () => {
        getUserLocation();
        setIsLoading(true);
    };

    return (
        <Container>
            <Title>404 - Not Found!</Title>
            <Text>Sorry, the page you are looking for does not exist.</Text>
            <BtnRefresh variant="contained" type="submit" loading={isLoading} onClick={handleClick}>
                <IconRefresh />
                Refresh
            </BtnRefresh>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    padding: 15px;
    @media screen and (min-width: 480px) {
    width: 480px;
}
@media screen and (min-width: 768px) {
    width: 768px;
}
@media screen and (min-width: 1200px) {
    padding: 94px;
    width: 1012px;
}
`; 

const Title = styled.h2`
    margin-bottom: 22px;
    color: #00CED1;
    font-weight: 900;
    font-size: 26px;
    line-height: 1.19;
@media screen and (min-width: 1200px) {
    font-size: 32px;
    line-height: 1.17;
}
`;

const Text = styled.p`
    margin-bottom: 22px;
    color: #ffffff;
    font-size: 20px;
    line-height: 1.17;
@media screen and (min-width: 768px) {
    font-size: 30px;
    line-height: 1.19;
}
`;

const BtnRefresh = styled(Button)`
    background-color: #AEB5B9;
    color: white; 
    @media screen and (max-width: 767px) {
        padding: 4px 8px;
        min-width: 50px;
        font-size: 12px;
    }
    &:hover,
    &:focus {
        background-color: #888c8f;
    }
    &:active {
        box-shadow: inset 0px 3px 1px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.08), 0px 2px 2px rgba(0, 0, 0, 0.12);
    }
`;

const IconRefresh = styled(muiIcons.RefreshIcon)`
    width: 18px;
    height: 18px;
    @media screen and (min-width: 768px) {
        width: 24px;
    height: 24px;
    }
`;

