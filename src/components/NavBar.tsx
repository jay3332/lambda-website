import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import { ApiContext } from '../app/Api';
import type { UserData } from '../app/Api';

import LambdaIcon from '../assets/lambda.png';

export const OAUTH_URL: string = "https://discord.com/oauth2/authorize?response_type=code&client_id=734872509912186921&scope=identify%20guilds&redirect_uri=https://lambdabot.cf";

const NavAndLogin = styled.div`
    display: flex;
    font-size: 20px;
`;

const Navigation = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    background-color: var(--theme-navbar);
    
    > div > a,
    > div > div:nth-child(1) > a {
        opacity: 0.6;
        color: var(--theme-text) !important;
        text-decoration: none;
        transition: opacity 0.4s ease;
        position: relative;
        padding: 6px;

        :hover {
            opacity: 0.8;
        }

        :before {
            content: "";
            opacity: inherit;
            position: absolute;
            width: 100%;
            height: 2px;
            bottom: 0;
            left: 0;
            background-color: var(--theme-text);
            visibility: hidden;
            transform: scaleX(0);
            -webkit-transition: all 0.4s ease 0.2s;
            transition: visibility 0.4s, transform 0.4s, -webkit-transform 0.4s ease 0.2s;
        }

        :hover:before {
            visibility: visible;
            transform: scaleX(1);
        }
    }
`;

const NavigationItemStyle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
    padding: 18px;
`;

const Login = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--theme-login);
    width: max(15vw, 300px);
`;

const LoginLink = styled.a`
    font-weight: bold;
`;

const UserAvatar = styled.img`
    padding-right: 0.5em;
    border-radius: 50%;
    width: 40px;
`;

const UserDetails = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
`;

const LoggedInAs = styled.div`
    font-size: 14px;
    font-weight: bold;
    opacity: 0.5;
`;

const UserTag = styled.div`
    font-size: 18px;
    opacity: 0.9;
`;

const IconContainer = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--theme-navbar);
`;

const Icon = styled.img`
    width: 42px;
    border-radius: 50%;
    margin: 16px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

const NavigationDropdownStyle = styled.div`
    position: relative;

    &:hover > div:nth-child(2) {
        display: flex;
        flex-direction: column;
    }
`;

const ArrowEffect = styled.div`
    display: inline-flex;
    opacity: 0.5;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    padding-left: 4px;
    margin-bottom: -9px;
    margin-top: 7px;
`;

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const NavigationDropdownChildren = styled.div`
    width: 200px;
    position: absolute;
    display: none;
    z-index: 1;
    box-shadow: 0 16px 8px black;
    background-color: var(--theme-background-light);
    animation: ${fadeIn} 0.4s ease-in-out;
`;

const NavigationDropdownChild = styled(Link)`
    padding: 10px;
    color: var(--theme-text) !important;
    font-size: 18px;
    transition: background-color 0.4s ease;
    background-color: var(--theme-background-light);

    &:hover {
        background-color: var(--theme-background-lightest);
    }
`;

function NavigationItemComponent({ label, href }: { label: string, href: string }) {
    return (
        <NavigationItemStyle>
            <Link to={href}>{label}</Link>
        </NavigationItemStyle>
    )
}

function NavigationDropdownComponent({ label, children }: RequiresChildren<{ label: string }>) {
    return (
        <NavigationDropdownStyle>
            <NavigationItemStyle>
                <a>{label}</a>
                <ArrowEffect>&#129171;</ArrowEffect>
            </NavigationItemStyle>
            <NavigationDropdownChildren>
                {children}
            </NavigationDropdownChildren>
        </NavigationDropdownStyle>
    );
}

export default function NavBar() {
    const [ user, setUser ] = useState<UserData | null>(null);
    const api = useContext(ApiContext);

    useEffect(() => {
        api.login().then(success => {
            if (success) setUser(api.userData);
        });
    }, []);

    return (
        <NavAndLogin>
            <IconContainer to="/">
                <Icon src={LambdaIcon} />
            </IconContainer>
            <Navigation>
                <NavigationItemComponent label="Home" href="/"/>
                <NavigationItemComponent label="Dashboard" href="/guilds"/>
                <NavigationDropdownComponent label="More">
                    <NavigationDropdownChild to="/rank-card">Rank Card</NavigationDropdownChild>
                    <NavigationDropdownChild to="/terms">Terms of Service</NavigationDropdownChild>
                </NavigationDropdownComponent>
            </Navigation>
            <Login>
                {user ? (
                    <>
                        <UserAvatar src={api.avatarUrl} />
                        <UserDetails>
                            <LoggedInAs>Logged in as</LoggedInAs>
                            <UserTag>{user.username}#{user.discriminator}</UserTag>
                        </UserDetails>
                    </>
                ) : (
                    <LoginLink href={OAUTH_URL}>
                        Log In
                    </LoginLink>
                )}
            </Login>
        </NavAndLogin>
    );
}
