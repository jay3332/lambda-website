import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const OAUTH_URL: string = "https://discord.com/oauth2/authorize?response_type=code&client_id=734872509912186921&scope=identify%20guilds&redirect_uri=https://lambdabot.cf";

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
    width: 15vw;
`;

const LoginLink = styled.a`
    font-weight: bold;
`;

function NavigationItemComponent({ label, href }: { label: string, href: string }) {
    return (
        <NavigationItemStyle>
            <Link to={href}>{label}</Link>
        </NavigationItemStyle>
    )
}

export default function NavBar() {
    return (
        <NavAndLogin>
            <Navigation>
                <NavigationItemComponent label="Home" href="/"/>
            </Navigation>
            <Login>
                <LoginLink href={OAUTH_URL}>
                    Log In
                </LoginLink>
            </Login>
        </NavAndLogin>
    );
}
