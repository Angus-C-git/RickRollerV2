import { CookieOptions } from "express";

export const DEFAULT_NAME = 'access_token';
const DEFAULT_MAX_AGE = 1000 * 60 * 60 * 24 * 7; // 7 days
const DOMAIN = 'localhost';

export const getCookie = (
    token: string,
    maxAge: number = DEFAULT_MAX_AGE,
    name: string = DEFAULT_NAME,
    secure: boolean = false,
) => {   
    
    const options: CookieOptions = {
        httpOnly: true,
        sameSite: 'lax',
        secure: secure, 
        maxAge: maxAge,
    };

    return {
        name: 'access_token', 
        token: token, 
        options: options
    }
}