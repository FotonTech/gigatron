import React from "react";
import styled from "styled-components";
import UserItem from "../components/UserItem";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Button from "../components/Button";

const users = gql`
    query users($size: Int!, $page: Int!) {
        users(size: $size, page: $page) {
            edges {
                name
                email
            }
            hasNextPage
        }
        me {
            name
        }
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Card = styled.div`
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 800px;
    margin: 40px;
    border-radius: 20px;
    overflow: hidden;
`;

const Text = styled.p`
    position: absolute;
    right: 0;
    top: 0;
    margin: 0;
`;

interface data {
    name: string;
    email: string;
}

class Users extends React.Component<any> {
    state = {
        size: 10,
        page: 0
    };
    handleLogout = async () => {
        const { history } = this.props;
        await localStorage.removeItem("token");
        await history.push("/signin");
    };

    handleLoadMore = () => {
        const { data } = this.props;
        data.fetchMore({
            variables: { size: data.users.edges.length + 10 },
            updateQuery: (previousResult: any, { fetchMoreResult }: any) => {
                return {
                    ...previousResult,
                    users: fetchMoreResult.users
                };
            }
        });
    };

    render() {
        const { data } = this.props;
        console.log("this.props", this.props);
        if (data.loading) {
            return null;
        }
        return (
            <Wrapper>
                <Text onClick={this.handleLogout}>Logout</Text>
                <Card>
                    {data &&
                        data.users &&
                        data.users.edges.map((user: data, index: Number) => (
                            <UserItem
                                key={`UserItem_${index}`}
                                first={index === 0}
                                name={user.name}
                                email={user.email}
                            />
                        ))}
                </Card>
                {data && data.users && data.users.hasNextPage && (
                    <Button text="Load more" onClick={this.handleLoadMore} />
                )}
            </Wrapper>
        );
    }
}

// @ts-ignore
export default graphql(users, {
    options: props => ({
        variables: {
            size: 10,
            page: 0
        }
    })
})(Users);
