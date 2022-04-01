import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
    
    a {
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
            -webkit-transform: scaleX(0);
            transform: scaleX(0);
            -webkit-transition: all 0.4s ease 0.2s;
            transition: visibility 0.4s, transform 0.4s, -webkit-transform 0.4s ease 0.2s;
        }

        :hover:before {
            visibility: visible;
            -webkit-transform: scaleX(1);
            transform: scaleX(1);
        }
    }
`;

const NavigationItemStyle = styled.div`
    display: flex;
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
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
`;

function NavigationItemComponent({ label, href }: { label: string, href: string }) {
    return (
        <NavigationItemStyle>
            <Link to={href}>{label}</Link>
        </NavigationItemStyle>
    )
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
                <NavigationItemComponent label="Rank Card" href="/rank-card" />
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
