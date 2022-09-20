import React, { useState } from "react";
import { usePostAllQuery } from "../../../redux/api/mambaApi";
import PostList from "../../postList/PostList";


/**
 * This component loads the public feed. The queried posts are displayed with the {@link PostList} component.
 * @returns The component
 */
const FeedLoader: React.FC = () => {
    // TODO add pagination
    const [page, setPage] = useState<number>(1);
    const { data, isError, isLoading } = usePostAllQuery(1);
    console.log(data)

    return (
        <PostList
            posts={data?.content}
            isLoading={isLoading}
            isError={isError}
        />
    );
}

export default FeedLoader;
