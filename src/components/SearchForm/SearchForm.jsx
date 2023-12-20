import React from "react";
import { toast } from 'react-toastify';
import { styled, alpha } from '@mui/material/styles';
import {InputBase, Button} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useWeatherContext } from 'contexts';

export const SeacrhForm = () => {
    const { setSearchQuery } = useWeatherContext();

    const handleSubmit = evt => {
        evt.preventDefault();
        const query = evt.currentTarget.elements.query.value;
        if (!query) {
            return toast.info('Please, enter your request');
        }
        setSearchQuery(query);
        evt.currentTarget.reset();
    };

    return (
        <div>
            <SearchForm autoComplete="off" onSubmit={handleSubmit}>
                <SearchIconWrapper>
                    <IconSearch />
                </SearchIconWrapper>
                <StyledInputBase
                    name="query"
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search' }}
                />
                <BtnSubmit variant="contained" type="submit">Search</BtnSubmit>
            </SearchForm>
        </div>
    );
};

const SearchForm = styled('form')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down(768)]: {
        padding: theme.spacing(0, 1),
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        height: '18px',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '14ch',
            '&:focus': {
                width: '22ch',
            },
        },
        [theme.breakpoints.down(768)]: {
            paddingLeft: `calc(1em + ${theme.spacing(3)})`,
            fontSize: '12px',
            height: '10px', 
            width: '10ch',
            '&:focus': {
                width: '14ch',
            }, 
        },
    },
}));

const IconSearch = styled(SearchIcon)`
    width: 18px;
    height: 18px;
    @media screen and (min-width: 768px) {
        width: 24px;
    height: 24px;
    }
`;

const BtnSubmit = styled(Button)`
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
