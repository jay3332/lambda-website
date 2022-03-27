import React, { useContext, useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { ApiContext, GuildData } from '../../app/Api';
import NavBar from '../../components/NavBar';
import Title from '../../components/Title';
import DashboardHome from './Home';

const GuildBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--theme-background);
    padding: 6px 12px;
`;

const GuildIcon = styled.img`
    width: 32px;
    height: 32px;
    margin: 0 4px;
    border-radius: 50%;
`;

const SwitchGuild = styled(Link)`
    opacity: 0.6;
    transition: all 0.4s ease;

    &:hover {
        opacity: 1;
    }
`;

const GuildBarDetails = styled.div`
    display: flex;
    align-items: center;
`;

export default function DashboardEntrypoint() {
    const { guildId } = useParams();
    if (!guildId) {
        useNavigate()('/guilds');
    }
    
    const [guild, setGuild] = useState<GuildData>();
    const api = useContext(ApiContext);

    useEffect(() => {
        api.ensureGuildData().then(guilds => {
            if (!guilds) useNavigate()('/guilds')
            else setGuild(guilds.find(g => g.id === guildId))
        });
    }, []);

    if (!guild) {
        return <div>Loading...</div>
    }

    return (
        <>
            <NavBar />
            <Title>Lambda: Dashboard ({guild.name})</Title>
            <GuildBar>
                <GuildBarDetails>
                    <GuildIcon src={api.guildIconUrl(guild)} />
                    Viewing dashboard for&nbsp;<b>{guild.name}</b>
                </GuildBarDetails>
                <SwitchGuild to='/guilds'>Switch</SwitchGuild>
            </GuildBar>
            <Routes>
                <Route path='*' element={<DashboardHome />} />
            </Routes>
        </>
    );
}