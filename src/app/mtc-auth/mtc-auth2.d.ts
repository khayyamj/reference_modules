declare class MTCAuthService {
    private config;
    private currentlyAuthing;
    private listenerTimeout;
    private windowListeners;
    configure(_config: any): void;
    isAuthenticated(): boolean;
    authenticate(): void;
    private iframeRefresh();
    private buildIframeUrl(config);
    private setEventListeners();
    private refreshToken();
    private removeEventListeners();
    private buildRefreshUrl(config, tokenString);
    private buildUrl(config);
    private reauth();
    private stripToken(path);
    private removeHash();
    private saveToken(token);
    getToken(): any;
    private isValidToken(token);
    isAuthenticating(): boolean;
    logout(): void;
}

declare var MTCAuth: MTCAuthService;
