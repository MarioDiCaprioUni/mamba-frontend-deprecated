import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Topbar from "./Topbar";


export default {
    title: 'Topbar',
    component: Topbar
} as ComponentMeta<typeof Topbar>;


export const Main: ComponentStory<typeof Topbar> = (props) => {
    return (
        <div style={{ width: 800 }}>
            <Topbar {...props} />
        </div>
        
    );
}
