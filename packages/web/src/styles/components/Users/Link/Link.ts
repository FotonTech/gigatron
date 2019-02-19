import styled from "styled-components";

interface LinkProps {
    color?: string;
    fontSize?: number;
    fontWeight?: number;
    textTransform?: string;
}

const LinkWrapper = styled.h1<LinkProps>`
    color: #${props => props.color || "811CFC"};
    font-family: "Inter";
    font-size: ${props => props.fontSize || 1}rem;
    font-weight: ${props => props.fontWeight || 500};
    cursor: pointer;
    text-transform: ${props => props.textTransform || "uppercase"};
    text-decoration: none;
`;

export default LinkWrapper;
