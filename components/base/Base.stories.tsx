import React from "react";
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Base from "./Base";
import { Providers } from "../../pages/_app";
import withMock from "storybook-addon-mock";
import { SERVER_URL } from "../../variables";
import { UserResponse } from "../../redux/models/responses";


const user = {
    username: 'TheUser',
    followers: ['AnotherUser'],
    following: ['AnotherUser', 'OneMoreUser']
} as UserResponse;


export default {
    title: 'Base',
    component: Base,
    decorators: [withMock],
    parameters: {
        mockData: [
            {
                url: `${SERVER_URL}/user/byUsername?username=null`,
                method: 'GET',
                status: 200,
                response: user
            }
        ]
    }
} as ComponentMeta<typeof Base>;


export const Main: ComponentStory<typeof Base> = (props) => {
    return (
        <Providers>
            <Base activeLink={props.activeLink} />
        </Providers>
    );
}
