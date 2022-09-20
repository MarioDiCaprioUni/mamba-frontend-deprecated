import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import LikeButton from "./LikeButton";


export default {
    title: 'LikeButton',
    component: LikeButton,
    args: {
        checked: false,
        id: 'LikeButtonId'
    }
} as ComponentMeta<typeof LikeButton>;


export const Main: ComponentStory<typeof LikeButton> = (props) => {
    return (
        <LikeButton {...props} />
    );
}
