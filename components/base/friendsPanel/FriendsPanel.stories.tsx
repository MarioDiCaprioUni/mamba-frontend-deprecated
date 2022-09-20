import React from 'react';
import { ComponentMeta, ComponentStory } from "@storybook/react";
import FriendsPanel from "./FriendsPanel";
import withMock from "storybook-addon-mock";
import {SERVER_URL} from "../../../variables";
import {Providers} from "../../../pages/_app";
import {UserResponse} from "../../../redux/models/responses";


////////////////////////////////////////////////////////////////////

/* This user's friends as a list */
const friends: Partial<UserResponse>[] = [];
for (let i=0; i<5; i++) {
    friends.push({
        userId: 'friendId' + i,
        username: 'Friend #' + i
    });
}

/* Finds a friend by their ID, or undefined if none was found. */
function friendById(id: string) {
    for (let friend of friends) {
        if (friend.userId === id)
            return friend;
    }
}

/* The current user */
const user: Partial<UserResponse> = {
    username: 'TheUser',
    friends: friends.map(obj => obj.userId as string)
}

////////////////////////////////////////////////////////////////////

export default {
    title: 'FriendsPanel',
    component: FriendsPanel,
    decorators: [withMock],
    parameters: {
        mockData: [
            {
                url: `${SERVER_URL}/user/byUsername?username=null`,
                method: 'GET',
                status: 200,
                response: user
            },
            {
                url: `${SERVER_URL}/user/basicData?userId=friendId0`,
                method: 'GET',
                status: 200,
                response: (request: any) => friendById(request.searchParams.userId)
            }
        ]
    }
} as ComponentMeta<typeof FriendsPanel>;


export const Main: ComponentStory<typeof FriendsPanel> = () => {
    return (
        <Providers>
            <FriendsPanel />
        </Providers>
    );
}
