import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import SplashCheckbox from "./SplashCheckbox";


export default {
    title: 'SplashCheckbox',
    component: SplashCheckbox,
    args: {
        label: 'Click Me!'
    }
} as ComponentMeta<typeof SplashCheckbox>;


export const Main: ComponentStory<typeof SplashCheckbox> = (props) => {
    return (
        <SplashCheckbox {...props} />
    );
}
