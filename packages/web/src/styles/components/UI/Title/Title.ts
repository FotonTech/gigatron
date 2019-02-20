import { styled } from "../../../Theme/Theme";

interface TitleProps {
    fontSize?: number;
    fontWeight?: number;
    color?: string;
    justifySelf?: string;
    alignSelf?: string;
    textTransform?: string;
}

const Title = styled.h1<TitleProps>`
    font-size: ${props => props.fontSize || 3}rem;
    font-weight: ${props => props.fontWeight || 400};
    font-family: ${props => props.theme.font.fontFamily};
    text-transform: ${props => props.textTransform || "lowercase"};
    color: ${props => props.color || props.theme.color.primary};
    justify-self: ${props => props.justifySelf};
    align-self: ${props => props.alignSelf};
`;

export default Title;
