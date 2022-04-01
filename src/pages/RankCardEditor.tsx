import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { ApiContext } from '../app/Api';
import NavBar, { OAUTH_URL } from '../components/NavBar';
import RankCard, { RankCardConfig } from '../components/RankCard';
import Title from '../components/Title';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        padding: 12px;
        text-align: center;
    }
`;

const TranslucentHeader = styled.h3`
    opacity: 0.5;
    padding-top: 16px;
`;

const Boxes = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 8px;
`;

const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px;
    background-color: var(--theme-background);
    border-radius: 6px;
    width: min(300px, 30vw);
    margin: 8px;

    h3 {
        margin: 0;
        padding: 12px;
    }
`;

const Input = styled.input`
    flex-grow: 1;
    border: none;
    background-color: var(--theme-background-light);
    border-radius: 6px;
    font-size: 16px;
    padding: 9px;
    width: 80%;
`;

function NumberInput({ title, placeholder, min = 0, max, type = "number", setter }: {
    title: string,
    min: number,
    max: number,
    placeholder?: string,
    type?: string,
    setter(value: number): void,
}) {
    return (
        <Box>
            <h3>{title}</h3>
            <Input placeholder={placeholder} type={type} min={min} max={max} onInput={e => {
                // @ts-ignore
                setter(parseInt(e.target.value));
            }} />
        </Box>
    );
}

export default function RankCardEditor() {
    const [rankCard, setRankCard] = useState<RankCardConfig>();
    const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
    const api = useContext(ApiContext);

    const [rank, setRank] = useState<number>(3);
    const [level, setLevel] = useState<number>(6);
    const [xp, setXp] = useState<number>(120);
    const [maxXp, setMaxXp] = useState<number>(250);

    useEffect(() => {
        api.fetchRankCard().then(r => {
            if (!r)
                return setLoggedIn(false);
            setRankCard(r);
            setLoggedIn(true);
        });
    }, []);

    return (
        <>
            <Title>Lambda: Rank Card Editor</Title>
            <NavBar />
            {loggedIn ? (
                <Container>
                    <h1>Rank Card Editor</h1>
                    {rankCard
                        ? <RankCard
                            username={api.userData!.username}
                            discriminator={api.userData!.discriminator}
                            avatarUrl={api.avatarUrl!}
                            rank={rank}
                            level={level}
                            xp={xp}
                            maxXp={maxXp}
                            config={rankCard}
                        />
                        : <div>Loading...</div>
                    }
                    <TranslucentHeader>Preview Card Variables</TranslucentHeader>
                    <Boxes>
                        <NumberInput title="Rank" placeholder="Change rank..." min={1} max={100000} setter={setRank} />
                        <NumberInput title="Level" placeholder="Change level..." min={1} max={1000} setter={setLevel} />
                        <NumberInput title="XP" type="range" min={0} max={maxXp} setter={setXp} />
                        <NumberInput title="Max XP" placeholder="Change Max XP..." min={1} max={10000000} setter={setMaxXp} />
                    </Boxes>
                </Container>
            ) : loggedIn === false ? (
                <>
                    You are not logged in. Please <a href={OAUTH_URL}>log in</a> to view your rank card.
                </>
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
}