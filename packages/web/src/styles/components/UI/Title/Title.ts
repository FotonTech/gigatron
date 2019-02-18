import styled from "styled-components";

interface TitleProps {
    fontSize?: number;
    color?: string;
    justifySelf?: string;
    alignSelf?: string;
}

const Title = styled.h1<TitleProps>`
    font-size: ${props => props.fontSize || 3}rem;
    font-family: "Inter UI Medium";
    color: #${props => props.color || "811CFC"};
    justify-self: ${props => props.justifySelf};
    align-self: ${props => props.alignSelf};
`;

export default Title;
