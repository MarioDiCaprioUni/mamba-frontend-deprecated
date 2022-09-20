import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import LoadingPanel from "./LoadingPanel";


export default {
    title: 'LoadingPanel',
    component: LoadingPanel
} as ComponentMeta<typeof LoadingPanel>;


export const Main: ComponentStory<typeof LoadingPanel> = (props) => {
    return (
        <LoadingPanel {...props} />
    );
}
