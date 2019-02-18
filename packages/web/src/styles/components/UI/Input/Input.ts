import styled from "styled-components";

interface InputProps {
    width?: number;
    maxWidth?: number;
    height?: number;
    maxHeight?: number;
    marginLeft?: number;
}

const Input = styled.input<InputProps>`
    width: ${props => props.width || 100}%;
    max-width: ${props => props.maxWidth};
    height: ${props => props.height || 50}px;
    background-color: rgba(246, 246, 246, 0.3);
    border: 1px solid #d8dde6;
    border-radius: 4px;
    text-indent: 20px;
    font-size: 14px;
    font-family: "Inter";
    font-weight: 500;
    transition: border-color 0.2s ease, background-color 0.2s ease;
    cursor: pointer;
    margin-left: ${props => props.marginLeft};

    ::-webkit-input-placeholder {
        opacity: 0.4;
        font-size: inherit;
        color: inherit;
        transition: opacity 0.2s ease, transform 0.2s ease;
    }

    &:hover {
        border: 1px solid #a3afc4;
    }

    &:focus {
        border: 1px solid #d8dde6;
        background-color: rgba(246, 246, 246, 0.2);
    }

    :focus::-webkit-input-placeholder {
        opacity: 0;
        transform: translateX(10px);
    }
`;

export default Input;
