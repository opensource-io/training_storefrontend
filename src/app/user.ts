
export interface User {
    name: string;
    principal: {
        name: string;
        email: string;
        familyName: string;
        givenName: string;
        pictureUrl: string;
    }
    authorities: {authority: string}[];
}
