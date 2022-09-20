export interface LoginResponse {
    username: string | null;
    password: string | null;
    valid: boolean;
}

////////////////////////////////////////////////////////////

export interface MediaResponse {
    mediaId: string;
    data: string;
    type: string;
}

////////////////////////////////////////////////////////////

export interface PageResponse<T> {
    totalPages: number;
    index: number;
    size: number;
    content: T[];
}

////////////////////////////////////////////////////////////

export interface PostResponse {
    postId: string;
    title: string | null;
    text: string | null;
    media: MediaResponse;
    type: PostType;
    dateCreated: string;
    dateUpdated: string;
    reference: string | null;
    referencedBy: string[];
    likes: string[];
    owner: string;
}

export type PostType = ('POST' | 'COMMENT' | 'REPOST');

////////////////////////////////////////////////////////////

export interface RegisterResponse {
    username: string | null;
    email: string | null;
    password: string | null;
    valid: boolean;
}

////////////////////////////////////////////////////////////

export interface UserResponse {
    userId: string;
    username: string;
    firstName: string | null;
    lastName: string | null;
    profilePicture: number[] | null;
    posts: string[];
    likes: string[];
    followers: string[];
    following: string[];
    friends: string[];
}

////////////////////////////////////////////////////////////

export interface UserBasicDataResponse {
    userId: string;
    username: string;
    firstName: string | null;
    lastName: string | null;
    profilePicture: number[] | null;
}

////////////////////////////////////////////////////////////

export type SearchResultsResponse = Array<UserBasicDataResponse>;
