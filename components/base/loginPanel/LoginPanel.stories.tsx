import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import LoginPanel from "./LoginPanel";
import { Providers } from "../../../pages/_app";
import { SERVER_URL } from "../../../variables";
import withMock from "storybook-addon-mock";


export default {
    title: 'LoginPanel',
    component: LoginPanel,
    decorators: [withMock],
    parameters: {
        mockData: [
            {
                url: `${SERVER_URL}/login`,
                method: 'POST',
                status: 200,
                response: {
                    valid: false
                }
            }
        ]
    }
} as ComponentMeta<typeof LoginPanel>;


export const Main: ComponentStory<typeof LoginPanel> = (props) => {
    return (
        <Providers>
            <LoginPanel {...props} />
        </Providers>
    );
}
