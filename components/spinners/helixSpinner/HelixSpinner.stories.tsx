import HelixSpinner from "./HelixSpinner";
import { Meta } from "@storybook/react";
import React from "react";


export default {
    title: 'HelixSpinner',
    component: HelixSpinner
} as Meta;


export const Main: React.FC = () => {
    return (
        <div style={{ width: 200, height: 200 }}>
            <HelixSpinner />
        </div>
    );
};
