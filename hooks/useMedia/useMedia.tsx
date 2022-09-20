import $ from 'jquery';
import React, { useState, useRef, useEffect } from "react";
import {
    BsFillPlayFill as PlayIcon,
    BsPauseFill as PauseIcon,
    BsFillVolumeUpFill as VolumeOn,
    BsFillVolumeMuteFill as VolumeOff
} from "react-icons/bs";
import { MediaResponse } from '../../redux/models/responses';
import styles from "./useMedia.module.scss";


//////////////////////////////////////////////////////////////////


/**
 * This component is a video player. It showcases a given video and contains
 * options to play, mute and change the playback speed of the given video.
 * @param src The source of the video file 
 * @returns This component
 */
export const VideoPlayer: React.FC<{ src: string }> = ({ src }) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [speed, setSpeed] = useState<number>(1);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (isPlaying)
            videoRef.current?.play();
        else
            videoRef.current?.pause();
    }, [isPlaying, src]);

    useEffect(() => {
        if (videoRef.current)
            videoRef.current.muted = isMuted;
    }, [isMuted, src]);

    function handleTogglePlay() {
        setIsPlaying(!isPlaying);
    }

    function handleToggleMute() {
        setIsMuted(!isMuted);
    }

    function handleOnTimeUpdate() {
        if (videoRef.current === null) return;
        const { currentTime, duration } = videoRef.current;
        setProgress(currentTime / duration * 100);
    }

    function handleVideoProgress(event: React.ChangeEvent<HTMLInputElement>) {
        if (videoRef.current === null) return;
        const manualChange = Number(event.target.value);
        videoRef.current.currentTime = (videoRef.current.duration / 100) * manualChange;
        setProgress(manualChange);
    }

    function handleVideoSpeed(event: React.ChangeEvent<HTMLSelectElement>) {
        if (videoRef.current === null) return;
        const speedTmp = Number(event.target.value);
        videoRef.current.playbackRate = speedTmp;
        setSpeed(speedTmp);
    }

    return (
        <div className={styles.videoWrapper}>

            <video className={styles.video} src={src} ref={videoRef} onTimeUpdate={handleOnTimeUpdate} onClick={handleTogglePlay} />

            <div className={styles.videoControls}>

                <div className={styles.videoActions}>
                    <button className={styles.videoPlay} onClick={handleTogglePlay}>
                        { isPlaying? <PauseIcon /> : <PlayIcon /> }
                    </button>
                </div>

                <input className={styles.videoTimeline} type="range" min={0} max={100} value={progress} onChange={handleVideoProgress} />

                <select className={styles.videoSpeed} value={speed} onChange={handleVideoSpeed}>
                    <option value="0.50">0.50x</option>
                    <option value="1">1x</option>
                    <option value="1.25">1.25x</option>
                    <option value="2">2x</option>
                </select>

                <button className={styles.videoMute} onClick={handleToggleMute}>
                    { isMuted? <VolumeOff /> : <VolumeOn /> }
                </button>

            </div>

        </div>
    );
}

//////////////////////////////////////////////////////////////////

/**
 * This component is an image viewer. It showcases the image with the given
 * source.
 * @param src The image's source
 * @returns This component
 */
export const ImageViewer: React.FC<{ src?: string }> = ({ src }) => {
    return (
        <div className={styles.imageWrapper}>
            <img className={styles.image} src={src} />
        </div>
    );
}

//////////////////////////////////////////////////////////////////

export const Media: React.FC<{ src?: string | MediaResponse }> = ({ src }) => {
    if (!src) return <></>;

    if (typeof src === 'string') {
        const type = src.endsWith('.mp4')? 'VIDEO' : 'IMAGE';
        return (
            <div className={styles.viewer}>
                {
                    (type === 'VIDEO')? <VideoPlayer src={src} /> : <ImageViewer src={src} />
                }
            </div>
        );
    }

    const url = `data:${src.type};base64,${src.data}`;

    if (src.type.startsWith('video'))
        return <VideoPlayer src={url} />
    else if (src.type.startsWith('image')) 
        return <ImageViewer src={url} />
    else
        return <></>;
}

//////////////////////////////////////////////////////////////////

export const MediaChooser: React.FC<{ onChange?: (file: File) => void }> = (props) => {
    type MediaType = 'IMAGE' | 'VIDEO' | undefined;
    const [type, setType] = useState<MediaType>();
    const [src, setSrc] = useState<string>();

    const Preview: React.FC = () => {
        if (!src || !type) {
            return <div className={styles.decoBox} onClick={handleButtonClick} />
        }
        switch (type) {
            case 'IMAGE':
                return <img className={styles.chooserImage} src={src} onClick={handleButtonClick} />;
            case 'VIDEO':
                return <VideoPlayer src={src} />
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files === null) return;
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);

        let mimeType: MediaType = undefined;
        if (file.type.startsWith('image'))
            mimeType = 'IMAGE';
        else if (file.type.startsWith('video'))
            mimeType = 'VIDEO';

        setType(mimeType);
        setSrc(url);

        if(props.onChange) props.onChange(file);
    }

    function handleButtonClick() {
        $(`.${styles.chooserInput}`).trigger('click');
    }

    return (
        <div className={styles.chooser}>
            <Preview />
            <button className={styles.chooserButton} onClick={handleButtonClick}>
                <input className={styles.chooserInput} type="file" role="button" accept="image/*, video/*" onChange={handleChange} />
                Select Media
            </button>
        </div>
    );
}

//////////////////////////////////////////////////////////////////

type UseMediaReturnType = [JSX.Element, File?];

/**
 * 
 * @returns 
 */
export default function useMedia(): UseMediaReturnType {
    const [file, setFile] = useState<File>();
    return [<MediaChooser onChange={setFile} />, file]
}
