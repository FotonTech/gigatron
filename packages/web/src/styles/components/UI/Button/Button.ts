import { styled } from "../../../Theme/Theme";

interface ButtonProps {
    width?: number;
    height?: number;
    fontSize?: number;
    backgroundColor?: string;
}

const Button = styled.button<ButtonProps>`
    width: ${props => props.width || 180}px;
    height: ${props => props.height || 50}px;
    font-family: ${props => props.theme.font.fontFamily};
    font-size: ${props => props.fontSize || 1}rem;
    border: none;
    border-radius: 5px;
    background-color: ${props => props.theme.bgColor.primary};
    color: ${props => props.color || props.theme.color.secondary};
    cursor: pointer;
`;

export default Button;
