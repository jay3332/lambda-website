import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { ApiContext } from '../app/Api';
import NavBar from '../components/NavBar';
import RankCard, { RankCardConfig } from '../components/RankCard';
import Title from '../components/Title';

export default function RankCardEditor() {
    const [rankCard, setRankCard] = useState<RankCardConfig>();
    const api = useContext(ApiContext);

    useEffect(() => {
        api.fetchRankCard().then(setRankCard);
    }, []);

    return (
        <>
            <Title>Lambda: Rank Card Editor</Title>
            <NavBar />
            {rankCard
                ? <RankCard
                    username={api.userData!.username}
                    discriminator={api.userData!.discriminator}
                    avatarUrl={api.avatarUrl!}
                    rank={3}
                    level={6}
                    xp={120}
                    maxXp={250}
                    config={rankCard}
                />
                : <div>Loading...</div>
            }
        </>
    );
}