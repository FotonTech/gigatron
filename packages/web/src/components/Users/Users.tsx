import React, { useState } from "react";
import { History } from "history";
import { graphql } from "react-apollo";

import User from "./User/User";

import Wrapper from "../../styles/components/Users/Wrapper";
import UserWrapper from "../../styles/components/Users/User/User";
import LinkWrapper from "../../styles/components/Users/Link/Link";

import Button from "../../styles/components/UI/Button/Button";

import { users } from "../../graphql/queries";

interface UsersProps {
    history?: any;
}

const UsersTest = ({ history }: UsersProps) => {
    const [size, setSize] = useState<number>(10);
    const [page, setPage] = useState<number>(0);

    const handleLogout = () => {
        localStorage.removeItem("token");
        history.push("/signin");
    };

    return (
        <Wrapper>
            <LinkWrapper onClick={handleLogout} fontWeight={600} fontSize={0.8}>
                Logout
            </LinkWrapper>
            <UserWrapper>UsersTest</UserWrapper>
        </Wrapper>
    );
};

export default UsersTest;
