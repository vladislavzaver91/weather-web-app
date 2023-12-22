import { createTheme } from '@mui/material/styles';
import { css } from '@emotion/react';

export const themeMui = createTheme({
    colors: {
        btnColor: '#AEB5B9',
        accentBtnColor: '#888c8f',
    },
})

export const theme = {
    colors: {
        white: '#ffffff',
        accentColor: '#00CED1',
        bgColor: '#8cb3e5',
    },
};

export const textMixin = (fontSize, fontWeight, lineHeight) => css`
    font-size: ${fontSize || '16px'};
    font-weight: ${fontWeight || '400'};
    line-height: ${lineHeight || '1.17'};
`;

export const mobileMixin = (styles) => css`
    @media screen and (min-width: 480px) {
        ${styles}
    }
`;

export const tabletMixin = (styles) => css`
    @media screen and (min-width: 768px) {
        ${styles}
    }
`;

export const desktopMixin = (styles) => css`
    @media screen and (min-width: 1200px) {
        ${styles}
    }
`;
