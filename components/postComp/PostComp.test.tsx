import { mount } from "cypress/react";
import { SERVER_URL } from "../../variables";
import { Providers } from "../../pages/_app";
import PostComp from "./PostComp";
import { PostResponse, UserResponse } from "../../redux/models/responses";


const user: UserResponse = {
    userId: 'UserId',
    username: 'User',
    firstName: 'Hello',
    lastName: 'World',
    posts: ['PostId'],
    followers: [],
    following: [],
    likes: [],
    profilePicture: null
};

const textPost: PostResponse = {
    postId: 'PostId',
    title: 'Hello, World!',
    text: 'This is a textual post.',
    dateCreated: '1000',
    dateUpdated: '1000',
    media: null,
    owner: user.userId,
    reposts: null,
    repostedBy: [],
    likes: [],
    type: 'TEXT'
};

describe('<PostComp>', () => {

    beforeEach(() => {

        cy.intercept('POST', `${SERVER_URL}/user/like`, {
            statusCode: 200,
        });

        cy.intercept('GET', `${SERVER_URL}/user?userId=${user.userId}`, {
            statusCode: 200,
            body: user,
        });

    });

    it('should render text post', () => {
        mount(
            <Providers>
                <PostComp post={textPost} />
            </Providers>
        );
        cy.get(`[data-test="title"]`).contains('Hello, World!');
        cy.get(`[data-test="text"]`).contains('This is a textual post.');
        cy.get(`[data-test="username"]`).contains('@User');
        cy.get(`[data-test="date"]`).contains('Wed Jan 01 1000');
    });

});
