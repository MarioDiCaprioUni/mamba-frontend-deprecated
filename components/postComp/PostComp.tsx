import React, { useEffect, useState } from "react";
import useClient from "../../hooks/useClient";
import { Media } from "../../hooks/useMedia/useMedia";
import { useUserLikeMutation, useUserQuery } from "../../redux/api/mambaApi";
import { PostResponse } from "../../redux/models/responses";
import convertBinaryProfilePicture from "../../utils/convertBinaryProfilePicture";
import LikeButton from "../buttons/likeButton/LikeButton";
import styles from "./PostComp.module.scss";


function parseDate(date: string): string {
    const tmp = new Date(date);
    const milliseconds = new Date().getTime() - tmp.getTime();
    const elapsed = new Date(milliseconds);
    // if more than a day ago
    if (milliseconds >= 8.64E7) {
        return tmp.toDateString();
    }
    // if less than an hour ago
    if (milliseconds < 3.6E6) {
        return `${elapsed.getMinutes()} minutes ago`;
    }
    // return hours (i.e. between 1 and 23)
    return `${elapsed.getHours()} hours ago`;
}

/////////////////////////////////////////////////////////////////////////////////////

interface PostCompProps {
    post: PostResponse;
}

const PostComp: React.FC<PostCompProps> = ({ post }) => {
    const { data: client } = useClient();
    const { data: user } = useUserQuery(post.owner);
    const [likePost] = useUserLikeMutation();
    const [date, setDate] = useState<string>(parseDate(post.dateCreated));

    useEffect(() => {
        const updateDateFromNow = setInterval(() => {
            setDate(parseDate(post.dateCreated));
        }, 60000);
        return () => clearInterval(updateDateFromNow);
    });

    const profilePicture = convertBinaryProfilePicture(user?.profilePicture, { className: styles.profilePicture });

    function doesUserLikePost() {
        if (!user) {
            return false;
        }
        return user.likes.includes(post.postId);
    }

    function handleLikeButtonClicked(checked: boolean) {
        if (client) {
            likePost({ userId: client.userId, postId: post.postId, like: checked });
        }
    }


    return (
        <div className={styles.main}>

            {/* Header of post */}
            <div className={styles.header}>
                {/* Left side */}
                <div className={styles.topLeft}>
                    {/* Profile picture */}
                    <div className={styles.profilePictureWrapper} data-test="profilePicture">
                        { profilePicture }
                    </div>

                    {/* Username */}
                    <span className={styles.user} data-test="username">
                        { user? `@${user.username}` : '[deleted]' }
                    </span>
                </div>
                
                {/** Date created */}
                <span className={styles.date} data-test="date">
                    { date }
                </span>
            </div>
            
            {/** Actual content */}
            <div className={styles.content}>
                {/** Post title */}
                <h3 className={styles.title} data-test="title">
                    { post.title ?? <></> }
                </h3>
                {/* Media */}
                <Media src={post.media} />
                {/* Post text */}
                <p className={styles.text} data-test="text">
                    { post.text ?? <></> }
                </p>
            </div>

            {/* bottom container */}
            <div className={styles.bottom}>
                <LikeButton
                    id={`like-btn-${post.postId}`}
                    checked={doesUserLikePost()}
                    onChange={handleLikeButtonClicked}
                    data-test="likeButton"
                />
            </div>
        </div>
    );
}

export default PostComp;
