let userLogged: any;

export const getUserLogged = (): any => {
    return userLogged;
}

export const clearUserLogged = (): void => {
    userLogged = null;
}

export const setUserLogged = (user): void => {
    userLogged = user;
}