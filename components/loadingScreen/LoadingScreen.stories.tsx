import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import LoadingScreen from "./LoadingScreen";


export default {
    title: 'LoadingScreen',
    component: LoadingScreen,
    argTypes: {
        open: {
            options: [true, false],
            control: { type: 'boolean' }
        }
    },
    args: {
        open: true
    }
} as ComponentMeta<typeof LoadingScreen>;


export const Main: ComponentStory<typeof LoadingScreen> = ({ open }) => {
    return (
        <LoadingScreen open={open} />
    );
}
