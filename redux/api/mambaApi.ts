import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { REHYDRATE } from 'redux-persist';
import { SERVER_URL } from '../../variables';
import {
    CreateCommentRequest,
    CreatePostRequest,
    CreateRepostRequest,
    FriendRequest,
    LikePostRequest,
    LoginRequest,
    RegisterRequest
} from '../models/requests';
import { LoginResponse, PageResponse, PostResponse, RegisterResponse, UserResponse, UserBasicDataResponse } from '../models/responses';
import { setLoginCredentials } from '../slices/loginCredentialsSlice';


export const mambaApi = createApi({
    reducerPath: 'mambaApi',
    baseQuery: fetchBaseQuery({
        baseUrl: SERVER_URL
    }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === REHYDRATE) {
            return action.payload[reducerPath]
        }
    },
    tagTypes: ['User', 'Post', 'Tag'],
    endpoints: (build) => ({

        /* (POST: /user/like) */
        userLike: build.mutation<void, LikePostRequest>({
            query: (args) => ({
                url: '/user/like',
                body: args,
                method: 'POST',
            }),
            invalidatesTags: ['User', 'Post']
        }),

        /////////////////////////////////////////////////////////////////////////////////

        /* (GET: /user) */
        user: build.query<UserResponse, string | null>({
            query: (userId) => ({
                url: '/user',
                params: { userId },
                method: 'GET'
            }),
            providesTags: ['User']
        }),

        /////////////////////////////////////////////////////////////////////////////////

        /* (GET: /user/byUsername) */
        userByUsername: build.query<UserResponse, string | null>({
            query: (username) => ({
                url: '/user/byUsername',
                params: { username },
                method: 'GET'
            }),
            providesTags: ['User']
        }),

        /////////////////////////////////////////////////////////////////////////////////

        /* (GET: /user/all) */
        userAll: build.query<PageResponse<UserResponse>, number>({
            query: (page) => ({
                url: '/user/all',
                params: { page },
                method: 'GET'
            }),
            providesTags: ['User']
        }),

        /////////////////////////////////////////////////////////////////////////////////

        /* (POST: /register) */
        register: build.mutation<RegisterResponse, RegisterRequest>({
            query: (args) => ({
                url: '/register',
                body: args,
                method: 'POST'
            }),
            invalidatesTags: ['User'],
            async onQueryStarted(request, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data.valid)
                        dispatch(setLoginCredentials({ username: request.username, password: request.password }));
                    else
                        dispatch(setLoginCredentials({ username: null, password: null }));
                } catch (error) {
                    dispatch(setLoginCredentials({ username: null, password: null }));
                    throw error;
                }
            }
        }),

        /////////////////////////////////////////////////////////////////////////////////

        /* (GET: /post) */
        post: build.query<PostResponse, string | null>({
            query: (postId) => ({
                url: '/post',
                params: { postId },
                method: 'GET'
            }),
            providesTags: ['Post']
        }),

        /////////////////////////////////////////////////////////////////////////////////

        /* (POST: /post/createPost) */
        createPost: build.mutation<void, CreatePostRequest>({
            query: (args) => ({
                url: '/post/createPost',
                body: args,
                method: 'POST'
            }),
            invalidatesTags: ['User', 'Post', 'Tag']
        }),

        /////////////////////////////////////////////////////////////////////////////////

        /* (POST: /post/createComment) */
        createComment: build.mutation<void, CreateCommentRequest>({
            query: (args) => ({
                url: '/post/createComment',
                body: args,
                method: 'POST'
            }),
            invalidatesTags: ['User', 'Post']
        }),

        /////////////////////////////////////////////////////////////////////////////////

        /* (POST: /post/createRepost) */
        createRepost: build.mutation<void, CreateRepostRequest>({
            query: (args) => ({
                url: '/post/createRepost',
                body: args,
                method: 'POST'
            }),
            invalidatesTags: ['User', 'Post', 'Tag']
        }),

        /////////////////////////////////////////////////////////////////////////////////

        /* (GET: /post/all) */
        postAll: build.query<PageResponse<PostResponse>, number>({
            query: (page) => ({
                url: '/post/all',
                params: { page },
                method: 'GET'
            }),
            providesTags: ['Post']
        }),

        /////////////////////////////////////////////////////////////////////////////////

        /* (POST: /login) */
        login: build.mutation<LoginResponse, LoginRequest>({
            query: (args) => ({
                url: '/login',
                body: args,
                method: 'POST'
            }),
            invalidatesTags: ['User'],
            async onQueryStarted(request, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data.valid)
                        dispatch(setLoginCredentials(request));
                    else
                        dispatch(setLoginCredentials({ username: null, password: null }));
                } catch (error) {
                    dispatch(setLoginCredentials({ username: null, password: null }));
                    throw error;
                }
            }
        }),

        /////////////////////////////////////////////////////////////////////////////////

        /* (GET: /user/basicData) */
        userBasicData: build.query<UserBasicDataResponse, string | null>({
            query: (userId) => ({
                url: '/user/basicData',
                params: { userId },
                method: 'GET'
            }),
            providesTags: ['User']
        }),

        /////////////////////////////////////////////////////////////////////////////////

        /* (POST: /user/sendFriendRequest) */
        userSendFriendRequest: build.mutation<void, FriendRequest>({
            query: (args) => ({
                url: '/user/sendFriendRequest',
                body: args,
                method: 'POST'
            }),
            invalidatesTags: ['User']
        }),

        /////////////////////////////////////////////////////////////////////////////////

        /* (POST: /user/acceptFriendRequest) */
        userAcceptFriendRequest: build.mutation<void, FriendRequest>({
            query: (args) => ({
                url: '/user/acceptFriendRequest',
                body: args,
                method: 'POST'
            }),
            invalidatesTags: ['User']
        })

    })
});


export const {
    // user
    useUserLikeMutation,
    useUserQuery,
    useUserByUsernameQuery,
    useUserAllQuery,
    // register
    useRegisterMutation,
    // post
    usePostQuery,
    useCreatePostMutation,
    useCreateCommentMutation,
    useCreateRepostMutation,
    usePostAllQuery,
    // login
    useLoginMutation,
    useUserBasicDataQuery
} = mambaApi;
