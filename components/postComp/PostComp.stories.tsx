import React, { JSXElementConstructor } from "react";
import { Meta, ComponentStory } from "@storybook/react";
import PostComp from "./PostComp";
import { Providers } from "../../pages/_app";
import { PostResponse, PostType, UserResponse } from "../../redux/models/responses";
import withMock from 'storybook-addon-mock';
import { SERVER_URL } from "../../variables";


const user: Partial<UserResponse> = {
    userId: 'userId-TheUser',
    username: 'TheUser',
    firstName: 'John',
    lastName: 'Doe',
    likes: [],
}

////////////////////////////////////////////////////////

export default {
    title: 'PostComp',
    decorators: [withMock],
    argTypes: {
        type: {
            options: ['TEXT', 'PICTURE'],
            control: { type: 'select' }
        },
        dateCreated: {
            control: { type: 'date' }
        }
    },
    parameters: {
        mockData: [
            {
                url: `${SERVER_URL}/user/like`,
                method: 'POST',
                status: 200,
                response: () => {
                    if (user.likes?.includes('postId-ThePost'))
                        user.likes?.pop();
                    else
                        user.likes?.push('postId-ThePost');
                    return {};
                }
            },
            {
                url: `${SERVER_URL}/user?userId=${user.userId}`,
                method: 'GET',
                status: 200,
                response: user
            },
            {
                url: `${SERVER_URL}/user/byUsername?username=null`,
                method: 'GET',
                status: 200,
                response: user
            }
        ]
    }
} as Meta;

////////////////////////////////////////////////////////

interface StoryProps {
    title: string;
    text: string;
    dateCreated: string;
    type: PostType;
}

const Template: ComponentStory<JSXElementConstructor<StoryProps>> = (props) => {
    const post: Partial<PostResponse> = {
        ...props,
        postId: 'postId-ThePost',
        owner: user.userId
    }
    return (
        <Providers>
            <PostComp post={post as PostResponse} />
        </Providers>
    );
};

///////////////////////////////////////////////////////

export const TextPost = Template.bind({});

TextPost.args = {
    title: 'This is a textual post',
    text: 'This post is very basic and can only contain textual data.',
    type: 'POST'
}
