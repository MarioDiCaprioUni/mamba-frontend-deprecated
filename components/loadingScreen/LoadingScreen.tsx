import React from "react";
import Popup from "../popup/Popup";
import HelixSpinner from "../spinners/helixSpinner/HelixSpinner";
import styles from "./LoadingScreen.module.scss";


interface LoadingScreenProps {
    open: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ open }) => {
    return (
        <Popup open={open}>
            <div className={styles.content} data-test="loadingScreen">
                <HelixSpinner />
            </div>
        </Popup>
    );
}

export default LoadingScreen;
