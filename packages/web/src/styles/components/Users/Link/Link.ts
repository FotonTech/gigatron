import { styled } from "../../../Theme/Theme";

interface LinkProps {
    color?: string;
    fontSize?: number;
    fontWeight?: number;
    textTransform?: string;
}

const LinkWrapper = styled.h1<LinkProps>`
    color: ${props => props.color || props.theme.color.primary};
    font-family: ${props => props.theme.font.fontFamily};
    font-size: ${props => props.fontSize || 1}rem;
    font-weight: ${props => props.fontWeight || 500};
    cursor: pointer;
    text-transform: ${props => props.textTransform || "uppercase"};
    text-decoration: none;
`;

export default LinkWrapper;
