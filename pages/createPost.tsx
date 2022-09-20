import $ from 'jquery';
import React, { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useFormik } from "formik";
import * as yup from 'yup';
import useMedia from "../hooks/useMedia/useMedia";
import styles from "../styles/CreatePost.module.scss";
import { CreatePostRequest } from "../redux/models/requests";
import useClient from "../hooks/useClient";
import { useCreatePostMutation } from "../redux/api/mambaApi";
import { useRouter } from "next/router";
import LoadingScreen from '../components/loadingScreen/LoadingScreen';
import { Navbar } from '.';


const CreatePost: NextPage = () => {
    const { data: client } = useClient();
    const [createPost] = useCreatePostMutation();
    const router = useRouter();
    const [MediaChooser, media] = useMedia();
    const [tab, setTab] = useState<0 | 1>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const formik = useFormik({
        initialValues: {
            title: '',
            text: '',
            media: ''
        },
        validationSchema: yup.object({
            title: yup.string().optional(),
            text: yup.string().optional()
        }),
        onSubmit: ({ title, text }) => {
            if (!media) {
                $('#mediaTabButton').trigger('click');
                formik.setFieldError('media', 'Please select a media to share!');
                return;
            }
            setIsLoading(true);
            getMediaAsByteArray().then(mediaAsByteArray => {
                const request: CreatePostRequest = {
                    title,
                    text,
                    media: {
                        data: mediaAsByteArray,
                        type: media.type
                    },
                    ownerId: client?.userId ?? '',
                    tagNames: []
                };
                createPost(request)
                    .then(() => {
                        setIsLoading(false);
                        router.push('/activity');
                    }).catch(() => {
                        setIsLoading(false);
                        alert('Something went wrong...');
                    });
            });
        }
    });

    const mediaTabClasses = [styles.tab];
    const mediaTabButtonClasses = [styles.tabButton];
    if (tab === 0) {
        mediaTabClasses.push(styles.tabActive);
        mediaTabButtonClasses.push(styles.tabButtonActive);
    }

    const textTabClasses = [styles.tab];
    const textTabButtonClasses = [styles.tabButton];
    if (tab === 1) {
        textTabClasses.push(styles.tabActive);
        textTabButtonClasses.push(styles.tabButtonActive);
    }

    async function getMediaAsByteArray(): Promise<number[]> {
        if (!media) {
            return [];
        }
        const buffer = await media.arrayBuffer();
        const unit8 = new Uint8Array(buffer);
        return Array.from(unit8);
    }

    return (
        <div className={styles.context}>
            <Head>
                <title>Mamba | Create Post</title>
            </Head>

            <LoadingScreen open={isLoading} />

            {/* Container for the actual content */}
            <div className={styles.container}>

                {/* Header */}
                <h2 className={styles.header}>
                    Create A Post
                </h2>

                {/* Tab Buttons */}
                <menu className={styles.tabButtons}>
                    {/* Media Tab Button */}
                    <button id="mediaTabButton" className={mediaTabButtonClasses.join(' ')} onClick={() => setTab(0)}>
                        Media
                    </button>
                    {/* Text Tab Button */}
                    <button id="textTabButton" className={textTabButtonClasses.join(' ')} onClick={() => setTab(1)}>
                        Text
                    </button>
                </menu>

                <form className={styles.form} onSubmit={formik.handleSubmit}>
                    {/* Media Tab */}
                    <div className={mediaTabClasses.join(' ')}>
                        <div className={styles.mediaChooserWrapper}>
                            {MediaChooser}
                            <div className={styles.errorMessage}>
                                {formik.errors.media}
                            </div>
                        </div>
                    </div>

                    {/* Text Tab */}
                    <div className={textTabClasses.join(' ')}>
                        <div className={styles.textTabWrapper}>
                            {/* Title Input */}
                            <input
                                className={styles.titleInput}
                                placeholder="Title..."
                                spellCheck="false"
                                id="title"
                                name="title"
                                onChange={formik.handleChange}
                            />
                            {/* Text Input */}
                            <textarea
                                className={styles.textInput}
                                placeholder="Text..."
                                spellCheck="false"
                                id="text"
                                name="text"
                                onChange={formik.handleChange}
                            />
                            {/* Submit Button */}
                            <button className={styles.submitButton} type="submit">
                                Submit
                            </button>
                        </div>
                        
                    </div>
                </form>

            </div>

        </div>
    );
}

export default CreatePost;
