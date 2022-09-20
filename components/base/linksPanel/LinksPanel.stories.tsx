import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import LinksPanel from "./LinksPanel";


export default {
    title: 'LinksPanel',
    component: LinksPanel,
    args: {
        activeLink: 'activity'
    }
} as ComponentMeta<typeof LinksPanel>;


export const Main: ComponentStory<typeof LinksPanel> = (props) => {
    return (
        <div style={{ width: 300, height: 200 }}>
            <LinksPanel {...props} />
        </div>
    );
}
