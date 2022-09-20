import React from "react";
import { ComponentStory, Meta } from "@storybook/react";
import * as parts from "./useMedia";


export default {

} as Meta;

/////////////////////////////////////////////////////////////////////////////////

export const MediaChooser: ComponentStory<typeof parts.MediaChooser> = () => {
    return (
        <div style={{ width: 600, height: 400 }}>
            <parts.MediaChooser />
        </div>
    );
}

/////////////////////////////////////////////////////////////////////////////////

export const ImageViewer: ComponentStory<typeof parts.ImageViewer> = () => {
    return (
        <div style={{ width: 600, height: 400 }}>
            <parts.ImageViewer src="/tests/test.jpg" />
        </div>
    );
}

/////////////////////////////////////////////////////////////////////////////////

export const VideoPlayer: ComponentStory<typeof parts.VideoPlayer> = () => {
    return (
        <div style={{ width: 600, height: 400 }}>
            <parts.VideoPlayer src="/tests/test.mp4" />
        </div>
    );
}

/////////////////////////////////////////////////////////////////////////////////

export const Media: ComponentStory<typeof parts.Media> = (props) => {
    const src = (props.src === 'Image')? '/tests/test.jpg' : '/tests/test.mp4';
    return (
        <div style={{ width: 600, height: 400 }}>
            <parts.Media src={src} />
        </div>
    );
}

Media.argTypes = {
    src: {
        control: {
            type: 'radio',
            options: ['Image', 'Video'],
        }
    }
}

Media.args = {
    src: 'Image'
}
