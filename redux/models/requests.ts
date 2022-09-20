export interface RegisterRequest {
    username: string | null;
    email: string | null;
    password: string | null;
}

export interface LoginRequest {
    username: string | null;
    password: string | null;
}

export interface LikePostRequest {
    userId: string;
    postId: string;
    like: boolean;
}

export interface CreatePostRequest {
    title?: string;
    text?: string;
    media: {
        data: number[];
        type: string;
    };
    ownerId: string;
    tagNames: string[];
}

export interface CreateCommentRequest {
    text: string;
    ownerId: string;
    referenceId: string;
}

export interface CreateRepostRequest {
    title?: string;
    text?: string;
    ownerId: string;
    referenceId: string;
    tagNames: string[]
}

export interface FriendRequest {
    from: string;
    to: string;
}
