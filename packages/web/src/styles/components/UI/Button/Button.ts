import styled from "styled-components";

interface ButtonProps {
    width?: number;
    height?: number;
    fontSize?: number;
    backgroundColor?: string;
}

const Button = styled.button<ButtonProps>`
    width: ${props => props.width || 180}px;
    height: ${props => props.height || 50}px;
    font-family: "Inter";
    font-size: ${props => props.fontSize || 1}rem;
    border: none;
    border-radius: 5px;
    background-color: #${props => props.backgroundColor || "811CFC"};
    color: #${props => props.color || "FFFFFF"};
    cursor: pointer;
`;

export default Button;
