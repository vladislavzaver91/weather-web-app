import styled from "@emotion/styled";
import { Puff } from "react-loader-spinner";

export const Loader = ({visible}) => {
    return (
        <Spinner>
            <Puff
                height="100"
                width="100"
                radius={1}
                color="#00ced1"
                ariaLabel="puff-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={visible}
            />
        </Spinner>
    );
};

const Spinner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;