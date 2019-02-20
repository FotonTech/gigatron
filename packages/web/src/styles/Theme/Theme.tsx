import baseStyled, { ThemedStyledInterface } from "styled-components";

export const theme = {
    bgColor: {
        primary: "#811CFC",
        secondary: "#FFFFFF"
    },
    color: {
        primary: "#811CFC",
        secondary: "#FFFFFF",
        label: "#737373"
    },
    font: {
        fontFamily: "Inter"
    },
    error: {
        bgColor: "rgba(254, 0, 0, 0.2)",
        border: "1px solid #FE0000",
        color: "#FE0000"
    },
    input: {
        color: "#d8dde6",
        border: "1px solid #d8dde6",
        hoverBorder: "#a3afc4",
        bgColor: "rgba(246, 246, 246, 0.3)"
    }
};

export type Theme = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
