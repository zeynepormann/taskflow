export type UserProfile = {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
};

export type AuthSession = {
    user: UserProfile;
    accessToken: string;
    refreshToken: string;
};

export type LoginResponse = UserProfile & {
    accessToken: string;
    refreshToken: string;
};

export type LoginErrorResponse = {
    message: string;
}