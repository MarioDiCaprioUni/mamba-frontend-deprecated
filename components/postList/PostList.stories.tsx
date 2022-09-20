import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import PostList from "./PostList";
import { PostResponse, UserResponse } from "../../redux/models/responses";
import { SERVER_URL } from "../../variables";
import { Providers } from "../../pages/_app";


const user: Partial<UserResponse> = {
    userId: 'userId-TheUser',
    username: 'TheUser'
}

const posts: Partial<PostResponse>[] = [
    {
        postId: 'postId-0',
        title: 'Hello, World!',
        text: 'I just wanted to greet everybody, have a nice day!',
        owner: user.userId,
        dateCreated: '2022-06-28 21:51:35.485',
        type: 'POST'
    },
    {
        postId: 'postId-1',
        title: 'This is a test post',
        text: 'I honestly hope this works...',
        owner: user.userId,
        dateCreated: '2022-06-25 13:25:17.589',
        type: 'POST'
    }
];

///////////////////////////////////////////////////////////////////////

export default {
    title: 'PostList',
    component: PostList,
    argTypes: {
        isLoading: {
            options: [true, false],
            control: { type: 'boolean' }
        },
        isError: {
            options: [true, false],
            control: { type: 'boolean' }
        }
    },
    args: {
        isLoading: false,
        isError: false
    },
    parameters: {
        mockData: [
            {
                url: `${SERVER_URL}/user/like`,
                method: 'POST',
                status: 200,
                response: {}
            },
            {
                url: `${SERVER_URL}/user?userId=${user.userId}`,
                method: 'GET',
                status: 200,
                response: user
            }
        ]
    }
} as ComponentMeta<typeof PostList>;

///////////////////////////////////////////////////////////////////////

export const Main: ComponentStory<typeof PostList> = ({ isLoading, isError }) => {
    return (
        <Providers>
            <div style={{ width: 500 }}>
                <PostList
                    posts={posts as PostResponse[]}
                    isLoading={isLoading}
                    isError={isError}
                />
            </div>
        </Providers>
        
    );
}
