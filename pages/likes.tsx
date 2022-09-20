import { NextPage } from "next";
import Head from "next/head";
import Base from "../components/base/Base";
import LikedPostsLoader from "../components/_likes/likedPostsLoader/LikedPostsLoader";


const Likes: NextPage = () => {
    return (
        <Base activeLink="likes">
            <Head>
                <title>Mamba | Likes</title>
            </Head>
            <LikedPostsLoader />
        </Base>
    );
}

export default Likes;
