import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import AccountPanel from "./AccountPanel";
import { UserResponse } from "../../../redux/models/responses";


const user = {
    username: 'TheUser',
    followers: ['AnotherUser'],
    following: ['AnotherUser', 'OneMoreUser']
} as UserResponse;

//////////////////////////////////////////////////////////////

export default {
    title: 'AccountPanel',
    component: AccountPanel
} as ComponentMeta<typeof AccountPanel>;

//////////////////////////////////////////////////////////////

export const Main: ComponentStory<typeof AccountPanel> = () => {
    return (
        <AccountPanel user={user} />
    );
}
