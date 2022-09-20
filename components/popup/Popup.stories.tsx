import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Popup from "./Popup";


export default {
    title: 'Popup',
    component: Popup,
    argTypes: {
        open: {
            options: [true, false],
            control: { type: 'boolean' }
        }
    },
    args: {
        open: true
    }
} as ComponentMeta<typeof Popup>;


export const Main: ComponentStory<typeof Popup> = ({ open, onOutsideClick }) => {
    return (
        <Popup open={open}>
            <div style={{ background: 'white', borderRadius: '14px', padding: '20px' }}>
                This is an example popup!
            </div>
        </Popup>
    );
}
