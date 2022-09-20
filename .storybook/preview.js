import { Buffer } from "buffer";

window.Buffer = Buffer;

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /\d{4}-\d{2}-\d{2} (\d{2}:\d{2}:\d{2}:\d{4})?$/,
        },
    },
    layout: 'centered',
}
