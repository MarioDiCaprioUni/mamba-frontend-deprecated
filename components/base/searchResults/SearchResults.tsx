import React from "react";
import {useSearchUsersQuery} from "../../../redux/api/mambaApi";
import { SearchResultsResponse } from "../../../redux/models/responses";
import HelixSpinner from "../../spinners/helixSpinner/HelixSpinner";
import styles from "./SearchResults.module.scss";


const SearchPreview: React.FC<{ item: SearchResultsResponse[number] }> = ({ item }) => {
    const profilePictureSrc = '/user/user.png'

    return (
        <div className={styles.searchPreviewUser}>
            <img src={profilePictureSrc} alt=''/>
            <span>{`@${item.username}`}</span>
        </div>
    );
}


///////////////////////////////////////////////////////////////////////////////


interface SearchResultsProps {
    expression: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ expression }) => {
    const { data: searchResults, isError, isLoading } = useSearchUsersQuery(expression);

    if (isError) {
        return (
            <div className={styles.error}>
                Error fetching data!
            </div>
        );
    }

    if (isLoading || !searchResults) {
        return (
            <div className={styles.spinnerWrapper}>
                <HelixSpinner />
            </div>
        );
    }

    const theSearchResults = searchResults.map(x => <SearchPreview item={x} />);

    return (
        <div className={styles.context}>
            { theSearchResults }
        </div>
    );
}

export default SearchResults
