import React from "react";
import useClient from "../../../hooks/useClient";
import { usePostQuery } from "../../../redux/api/mambaApi";
import PostComp from "../../postComp/PostComp";
import styles from "./LikedPostsLoader.module.scss";


const PostCompFromId: React.FC<{ postId: string | null }> = ({ postId }) => {
    const { data: post } = usePostQuery(postId);
    if (!post) return <></>;
    return <PostComp post={post} />
}


/**
 * This component displays all posts that are liked by the logged-in user.
 * @returns The component.
 */
const LikedPostsLoader: React.FC = () => {
    const { data: client, isLoading, isError } = useClient();

    if (isLoading || client === undefined) {
        return (
            <div className={styles.main}>
                <div className={styles.skeleton} />
                <div className={styles.skeleton} />
                <div className={styles.skeleton} />
            </div>
        );
    }

    if (isError) {
        return (
            <div className={styles.main}>
                <h1 className={styles.errorMessage}>
                    Error fetching data!
                </h1>
            </div>
        );
    }

    const posts = client.likes.map(postId => <PostCompFromId postId={postId} key={postId} />);

    return (
        <div className={styles.main}>
            { posts }
        </div>
    );
};

export default LikedPostsLoader;
