import React from "react";
import styled from "@emotion/styled";

export const NotFound = () => {
    return (
        <Container>
            <Title>404 - Not Found!</Title>
            <Text>Sorry, the page you are looking for does not exist.</Text>
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

