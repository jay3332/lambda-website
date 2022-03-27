import Cookies from 'js-cookie';
import { createContext } from 'react';

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS' | 'CONNECT' | 'TRACE';
export const BASE_API_URL = 'https://api.lambdabot.cf';

export type OAuthData = {
    access_token: string,
    refresh_token: string,
    expires_in: number,
    token_type: string,
};

export type UserData = {
    id: string,
    username: string,
    discriminator: string,
    avatar?: string,
    bot: boolean,
    mfa_enabled?: boolean,
    locale?: string,
    verified?: boolean,
    email?: string,
    flags?: number,
    premium_type?: number,
    public_flags: number,
};

export type GuildData = {
    id: string,
    name: string,
    icon?: string,
    owner: boolean,
    permissions: string,  // stringified number
    features: string[],
    status: 0 | 1 | 2,
};

export type GuildStoredData = {
    prefixes: string[],
};

export type PrefixRouteSuccessData = {
    prefixes: string[],
    success: true,
};

export class ApiError extends Error {
    route: string;
    response: Response;
    text: string;
    json?: any;

    constructor(route: string, response: Response, text: string) {
        super(`Failed request to ${route}: ${response.status} ${response.statusText}. Body: ${text}`);

        this.route = route;
        this.response = response;
        this.text = text;

        try {
            this.json = JSON.parse(text);
        } catch (e) {
            this.json = null;
        }
    }
}

export class Api {
    oauthData: OAuthData | null;
    userData: UserData | null;
    accessToken: string | null;
    accessTokenType: string | null;
    guilds: GuildData[] | null;
    guildStores: { [ guildId: string ]: GuildStoredData };

    constructor() {
        this.oauthData = null;
        this.accessTokenType = null;
        this.accessToken = null;
        this.userData = null;
        this.guilds = null;
        this.guildStores = {};
    }

    async ensureUserData() {
        let data = Cookies.get('user_data');
        if (data) {
            this.userData = JSON.parse(data);
            return;
        }

        if (!this.userData) {
            let data = await this.fetchUserData();
            Cookies.set('user_data', JSON.stringify(data), { expires: 1 });
        }
    }

    async ensureGuildStore(guildId: string): Promise<GuildStoredData> {
        if (this.guildStores[guildId])
            return this.guildStores[guildId];
        
        let data = await this.request('GET', `/data/${guildId}`, {
            params: {
                token: this.accessToken,
                tt: this.accessTokenType,
                user_id: this.userData!.id,
            },
        });
        this.guildStores[guildId] = data;
        return data;
    }

    async ensureGuildData(): Promise<GuildData[] | undefined> {
        if (!await this.login()) return;
        if (this.guilds) return this.guilds;

        let data = await this.request('GET', '/discord/guilds', {
            params: { token: this.accessToken, tt: this.accessTokenType, user_id: this.userData!.id },
        });
        this.guilds = data;
        return data;
    }

    async ensureAccessToken(): Promise<string | undefined> {
        let token = Cookies.get('access_token');
        let tt = Cookies.get('token_type');
        if (token && tt) {
            this.accessToken = token;
            this.accessTokenType = tt;

            await this.ensureUserData();
            return token;
        }

        let params = new URLSearchParams(window.location.search);
        if (params.has('code')) {
            const code = params.get('code')!;
            const oauthData = await this.exchangeOauth(code);
            token = oauthData.access_token;
            tt = oauthData.token_type;

            Cookies.set('access_token', token, { expires: oauthData.expires_in / 86_400 });
            Cookies.set('token_type', tt, { expires: oauthData.expires_in / 86_400 });
            Cookies.set('refresh_token', oauthData.refresh_token); // TODO: implement refresh tokens on backend
            this.accessToken = token;
            this.accessTokenType = tt;
            
            await this.ensureUserData();
            return token;
        }
    }

    async login(): Promise<boolean> {
        return !!await this.ensureAccessToken();
    }

    async fetchUserData(): Promise<UserData> {
        const data = await this.request('GET', '/discord/user', {
            params: { token: this.accessToken, tt: this.accessTokenType },
        });
        this.userData = data;
        return data;
    }

    async exchangeOauth(code: string): Promise<OAuthData> {
        let oauthData;
        
        let location = window.location.hostname === 'localhost'
            ? window.location.origin + window.location.pathname
            : undefined;
        this.oauthData = oauthData = await this.request('POST', '/exchange-oauth', { params: { code, redirect_uri: location } });
        this.accessToken = oauthData.access_token;

        return this.oauthData!;
    }

    addPrefix(guildId: string, prefix: string): Promise<PrefixRouteSuccessData> {
        return this.request('PUT', `/prefixes/${guildId}`, {
            params: {
                token: this.accessToken,
                tt: this.accessTokenType,
                user_id: this.userData!.id,
            },
            json: { prefix },
        });
    }

    removePrefix(guildId: string, prefix: string): Promise<PrefixRouteSuccessData> {
        return this.request('DELETE', `/prefixes/${guildId}`, {
            params: {
                token: this.accessToken,
                tt: this.accessTokenType,
                user_id: this.userData!.id,
            },
            json: { prefix },
        });
    }

    async request(
        method: RequestMethod,
        route: string,
        {
            body,
            headers = {},
            json,
            params,
            base,
        }: {
            body?: string,
            json?: any,
            params?: any,
            headers?: any,
            base?: string,
        } = {},
    ): Promise<any> {
        if (json) {
            headers['Content-Type'] ||= 'application/json';
            body = JSON.stringify(json)
        }

        route = route.startsWith('/') ? route : '/' + route;
        const response = await fetch(
            (base || BASE_API_URL) + route + (params ? '?' + new URLSearchParams(params).toString() : ''), 
            { method, headers, body },
        );

        const text = await response.text();
        const message = `[${route}] Received ${response.status}: ${response.statusText}. Body: ${text}`;

        if (!response.ok) { 
            console.error(message);
            throw new ApiError(route, response, text);
        }

        if (window.debugRequests)
            console.debug(message);

        if (response.headers.get('Content-Type') === 'application/json') {
            return JSON.parse(text)
        }

        return text;
    }

    get avatarUrl(): string | undefined {
        if (!this.userData) return;

        const avatar = this.userData.avatar;
        if (!avatar)
            return `https://cdn.discordapp.com/embed/avatars/${this.userData.discriminator as unknown as number % 5}.png`;

        return `https://cdn.discordapp.com/avatars/${this.userData.id}/${avatar}.${avatar.startsWith('a_') ? 'gif' : 'png'}`;
    }

    guildIconUrl(guild: GuildData): string {
        return guild.icon
            ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.${guild.icon.startsWith("a_") ? "gif" : "png"}`
            : 'https://cdn.discordapp.com/embed/avatars/0.png'
    }
}

export const DefaultApi = new Api();
export const ApiContext = createContext<Api>(DefaultApi);

window.api = DefaultApi;
