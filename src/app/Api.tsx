import { createContext } from 'react';

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS' | 'CONNECT' | 'TRACE';
export const BASE_API_URL = 'https://api.lambdabot.cf';

export class Api {
    oauthData: {
        access_token: string,
        refresh_token: string,
        expires_in: number,
        token_type: string,
    } | null;

    constructor() {
        this.oauthData = null;
    }

    async exchangeOauth(code: string) {
        this.oauthData = await this.request('POST', '/exchange-oauth', { params: { code } });
    }

    async request(
        method: RequestMethod,
        route: string,
        {
            body,
            headers = {},
            json,
            params,
        }: {
            body?: string,
            json?: any,
            params?: any,
            headers?: any,
        } = {},
    ): Promise<any> {
        if (json && !headers['Content-Type']) {
            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(json)
        }

        route = route.startsWith('/') ? route : '/' + route;
        const response = await fetch(
            BASE_API_URL + route + (params ? '?' + new URLSearchParams(params).toString() : ''), 
            { method, headers, body },
        );

        const text = await response.text();
        const message = `[${route}] Received ${response.status}: ${response.statusText}. Body: ${text}`;

        if (!response.ok) { 
            console.error(message);
            throw new Error(`Failed request to ${route}: ${response.status}: ${response.statusText}`);
        }

        console.debug(message);

        if (response.headers.get('Content-Type') === 'application/json') {
            return JSON.parse(text)
        }

        return text;
    }
}

export const ApiContext = createContext<Api>(new Api());
