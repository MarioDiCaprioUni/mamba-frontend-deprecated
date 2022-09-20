import React, { useState } from "react";
import LoginPanel from "./loginPanel/LoginPanel";
import AccountPanel from "./accountPanel/AccountPanel";
import LinksPanel, { LinksPanelProps } from "./linksPanel/LinksPanel";
import LoadingPanel from "./loadingPanel/LoadingPanel";
import Topbar from "./topbar/Topbar";
import styles from "./Base.module.scss";
import { UserResponse } from "../../redux/models/responses";
import useClient from "../../hooks/useClient";
import { useRouter } from "next/router";
import FriendsPanel from "./friendsPanel/FriendsPanel";
import SearchResults from "./searchResults/SearchResults";


/**
 * This panel returns either a login panel, an account panel
 * or a loading panel based on the user's login status. This
 * panel is only visible on large screens.
 * @returns A corresponding panel
 * @see {@link LoadingPanel}, {@link LoginPanel}, {@link AccountPanel}
 */
const LoginOrAccountPanel: React.FC = () => {
    const { data, isLoading, isError } = useClient();

    if (isLoading) {
        return <LoadingPanel />;
    }
    // if user not logged in: return login panel
    if (isError || !data) {
        return <LoginPanel />;
    }
    // if user is logged in: return account panel
    return <AccountPanel user={data as UserResponse} />;
}


/**
 * This is the sidebar. It contains the title, the login (or account)
 * panel and links to other pages. This component is responsive and is
 * rendered differently on large-, medium- and small-sized screens.
 * @param props The props for the sidebar
 * @returns The sidebar component
 * @see {@link LinksPanel}, {@link LinksPanelProps}, {@link LoginOrAccountPanel}
 */
const Sidebar: React.FC<LinksPanelProps> = (props) => {
    return (
        <div className={styles.sidebar}>
            {/* Box 1 */}
            <div className={styles.sidebarBox1}>
                {/* Logo (large screens only) */}
                <img src="/logo/logo-full.png" className={styles.sidebarLogo} alt="" />
                {/* Logo (medium screens only) */}
                <img src="/logo/logo-icon.png" className={styles.sidebarLogoSmall} alt="" />
                {/* Login- or Account Panel (large screens only) */}
                <div className={styles.loginOrAccountPanel}>
                    <LoginOrAccountPanel />
                </div>
            </div>
            {/* Box 2 */}
            <div className={styles.sidebarBox2}>
                <LinksPanel activeLink={props.activeLink} />
            </div>
        </div>
    );
}


/**
 * The props for the `<Base />` component.
 * @see {@link Base}
 */
interface BaseProps {
    /**
     * The children of this node. These are rendered inside
     * of the main panel in the center.
     * */
    children?: React.ReactNode;
}

/**
 * This is the main component. It renders a sidebar, a topbar, a members-panel and
 * the actual content. This component is also very responsive and renders differently
 * on large-, medium- and small-sized screens. This component is intended to be a
 * template for most other pages.
 * @param props The component's props
 * @returns The base component
 * @see {@link BaseProps}, {@link LinksPanelProps}
 */
const Base: React.FC<BaseProps & LinksPanelProps> = (props) => {
    const router = useRouter();
    const { data: client } = useClient();
    const [searchExpression, setSearchExpression] = useState<string>('');

    function handleMakePostButtonClicked() {
        router.push('/createPost');
    }

    function handleSearch(expression: string) {
        setSearchExpression(expression);
    }

    const context =
        (searchExpression.length > 0)?
            <SearchResults expression={searchExpression} />
            :
            <>
                {/* Button to make a post */}
                <button className={styles.makePostButton} onClick={handleMakePostButtonClicked}>
                    Make A Post
                </button>
                {/* Content */}
                { props.children }
            </>

    return (
        <div className={styles.main}>

            {/* The sidebar */}
            <Sidebar activeLink={props.activeLink} />

            {/* Container for everything else */}
            <div className={styles.container}>

                {/* The topbar */}
                <Topbar user={client} onSearch={handleSearch} />

                {/* A wrapper for the content- and members panel */}
                <div className={styles.contextWrapper}>

                    {/* Wrapper for the actual content */}
                    <div className={styles.context}>
                        { context }
                    </div>
                    
                    {/* The members panel */}
                    <div className={styles.members}>
                        <FriendsPanel />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Base;
