import { styled } from "../../../Theme/Theme";

const UserWrapper = styled.div`
    background-color: ${props => props.theme.bgColor.secondary};
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 800px;
    margin: 40px;
    border-radius: 5px;
    overflow: hidden;
`;

export default UserWrapper;
