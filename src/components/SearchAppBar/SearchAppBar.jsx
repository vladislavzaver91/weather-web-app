import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { themeMui } from 'constans';
import styled from "@emotion/styled";
import { AppBar, Toolbar, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { muiIcons } from 'utils/icons';
import { SeacrhForm } from 'components/SearchForm'; 

export const SearchAppBar = ({ searchQuery, setIsLoading, isLoading }) => {
    const handleClick = () => {
        setIsLoading(true);
        window.location.reload();
    };

    return (
        <ThemeProvider theme={themeMui}>
        <Box>
            <AppBarWrap position='static'>
                <ToolBarWrap>
                    <Box flexGrow={1}>
                        <BtnRefresh onClick={handleClick}
                            loading={isLoading}
                            loadingPosition="center"
                            variant="contained" >
                            <muiIcons.RefreshIcon />
                        </BtnRefresh>
                    </Box>
                    <SeacrhForm onSubmit={searchQuery} />
                </ToolBarWrap>
            </AppBarWrap>
            </Box>
            </ThemeProvider>
    );
};

const AppBarWrap = styled(AppBar)`
    background: transparent;
`;

const ToolBarWrap = styled(Toolbar)`
    display: flex;
    justify-content: space-between;
`;

const BtnRefresh = styled(LoadingButton)`
    background-color: ${props => props.theme.colors.btnColor};
    color: ${props => props.theme.colors.white};
    @media screen and (max-width: 767px) {
        padding: 4px 8px;
        min-width: 50px;
    }
    &:hover,
    &:focus {
        background-color: ${props => props.theme.colors.accentBtnColor};
    }
    &:active {
        box-shadow: inset 0px 3px 1px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.08), 0px 2px 2px rgba(0, 0, 0, 0.12);
    }
    `;