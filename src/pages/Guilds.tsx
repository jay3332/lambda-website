import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { ApiContext, GuildData } from '../app/Api';
import NavBar from '../components/NavBar';
import Title from '../components/Title';
import { BOT_INVITE } from './Homepage';
import Footer from "../components/Footer";

const GUILDS_OAUTH_URL: string = "https://discord.com/oauth2/authorize?response_type=code&client_id=734872509912186921&scope=identify%20guilds&redirect_uri=https://lambdabot.cf/guilds";

const LoggedOutText = styled.p`
    font-size: 20px;
    text-align: center;
`;

const GuildArea = styled.div`
    text-align: center;
    padding-top: 16px;
`;

const GuildsView = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
`;

const GuildButton = styled(Link)<{ status: number }>`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: min(20vw, 400px);
    text-decoration: none;
    color: var(--theme-text);
    background-color: var(--theme-primary-dark);
    border-radius: 5px;
    transition: background-color 0.4s ease;
    padding: 8px;
    margin: 12px;
    cursor: pointer;
    opacity: 1;

    &:hover {
        color: var(--theme-text);
        background-color: var(--theme-primary-dark-hover);
    }
`;

const GuildDisabledButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: min(20vw, 400px);
    text-decoration: none;
    color: var(--theme-text);
    background-color: var(--theme-primary-dark);
    border-radius: 5px;
    transition: background-color 0.4s ease;
    padding: 8px;
    margin: 12px;
    cursor: not-allowed;
    opacity: 0.5;

    &:hover {
        color: var(--theme-text);
        background-color: var(--theme-primary-dark-hover);
    }
`;

const GuildIcon = styled.img`
    width: 56px;
    height: 56px;
    padding: 18px 24px;
    border-radius: 50%;
`;

const GuildContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
`;

const GuildName = styled.span`
    font-size: 24px;
    text-align: left;
`;

const GuildReason = styled.span`
    margin-top: 6px;
    font-size: 16px;
    text-align: left;
    font-weight: bold;
    opacity: 0.6;
`;

const GuildSearch = styled.input`
    flex-grow: 1;
    border: none;
    border-radius: 4px;
    background-color: var(--theme-login);
    width: min(80vw, 400px);
    height: 40px;
    font-size: 20px;
    margin: 16px;
    padding: 4px 8px;
`;

export default function Guilds() {
    const api = useContext(ApiContext);
    let [ guilds, setGuilds ] = useState<GuildData[] | null>(null);
    let [ loggedOut, setLoggedOut ] = useState<boolean>(false);
    let [ searchQuery, setSearchQuery ] = useState<string>("");

    useEffect(() => {
        api.ensureGuildData().then(r => {
            if (!r) setLoggedOut(true);
            else setGuilds(r);
        });
    }, []);

    return (
        <>
            <Title>Lambda: Server Selection</Title>
            <NavBar />
            {loggedOut ? (
                <LoggedOutText>
                    You are not logged in. Please <a href={GUILDS_OAUTH_URL}>log in</a> to view your servers.
                </LoggedOutText>
            ) : (
                <GuildArea>
                    <h1>Servers</h1>
                    <p>Please select a server to continue.</p>
                    <GuildSearch onChange={e => setSearchQuery(e.target.value)} placeholder="Search..." />
                    <GuildsView>
                        {guilds ? guilds.filter(
                            g =>
                                searchQuery.length === 0
                                || g.id === searchQuery
                                || g.name.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .sort(g => -g.status + 1)
                        .map(g => {
                            const Component = g.status === 2 ? GuildButton : GuildDisabledButton;
                            return (
                                // @ts-ignore
                                <Component key={g.id} to={`/guild/${g.id}`} status={g.status}>
                                    <GuildIcon src={api.guildIconUrl(g)} />
                                    {g.status === 2 ? (
                                        <GuildName>{g.name}</GuildName>
                                    ) : (
                                        <GuildContent>
                                            <GuildName>{g.name}</GuildName>
                                            <GuildReason>{
                                                g.status === 1
                                                ? 'You lack permissions.'
                                                : (
                                                    <>
                                                        I&apos;m not in this server.&nbsp;
                                                        <a href={`${BOT_INVITE}&guild_id=${g.id}`}>Invite me!</a>
                                                    </>
                                                )    
                                            }</GuildReason>
                                        </GuildContent>
                                    )}
                                </Component>
                            )
                        }) : (
                            <p>Loading...</p>
                        )}
                    </GuildsView>
                </GuildArea>
            )}
            <Footer />
        </>
    );
}