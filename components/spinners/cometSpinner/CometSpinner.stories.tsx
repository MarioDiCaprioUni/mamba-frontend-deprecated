import CometSpinner from "./CometSpinner";
import { Meta } from "@storybook/react";
import React from "react";


export default {
    title: 'CometSpinner',
    component: CometSpinner
} as Meta;


export const Main: React.FC = () => {
    return (
        <div style={{ width: 200, height: 200 }}>
            <CometSpinner />
        </div>
    );
};
