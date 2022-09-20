import { mount } from "cypress/react";
import { UserResponse } from "../../../redux/models/responses";
import AccountPanel from "./AccountPanel";

describe('<AccountPanel>', () => {
    const user: Partial<UserResponse> = {
        username: 'Hello',
        profilePicture: null,
        followers: [],
        following: []
    };

    it('should have all displayable elements', () => {
        mount(<AccountPanel user={user as UserResponse} />);
        cy.get(`[data-test="username"]`).contains('Hello');
        cy.get(`[data-test="followers"]`).contains(0);
        cy.get(`[data-test="following"]`).contains(0);
    });

});
