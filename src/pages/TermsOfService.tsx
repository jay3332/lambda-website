import React from 'react';
import styled from 'styled-components';

import Title from '../components/Title';
import NavBar from "../components/NavBar";

const Container = styled.div`
    padding: 12px;
    display: table;
    margin: 0 auto;
    width: min(90vw, 700px);
    overflow-x: hidden;
`;

export default function TermsOfService() {
    return (
        <>
            <Title>Lambda: Terms of Service</Title>
            <NavBar />
            <Container>
                <h1>Terms of Service</h1>
                <p>Last updated: April 22, 2022</p>
                <h2>Prelude</h2>
                <p>
                    The terms written here tend to be very vague. Do not attempt to work around these terms.
                    Any consequence decided by those who operate this service is final.

                    <h3>Please note:</h3>
                    <ul>
                        <li>"The bot" or "This bot" refers to the Discord Bot running instance of Lambda.</li>
                        <li>"The [bot] owner" or "Those who operate this service" is self-explanitory.</li>
                        <li>"The service" or "This service" refers to the bot, this website, and/or anything of relevance.</li>
                    </ul>
                </p>
                <h2>Section 1: Bot</h2>
                <p>Terms stated in this section are enforced over the VoIP chat service, <b>Discord</b>.</p>
                <h3>1a: Denial of Service</h3>
                <p>
                    This refers to anything intentially done to deny service of the bot, that is, actions done to slow down or
                    prevent the bot from functioning properly.
                </p>
                <p>
                    This includes, but is not limited to, the following:
                    <ul>
                        <li>Spamming: requesting services from Lambda unnecessarily fast</li>
                        <li>Large payloads: continuously requesting Lambda to use its service to process such of a large payload, e.g. a large image.</li>
                    </ul>
                </p>
                <h3>1b: Discord Terms of Service and Community Guidelines</h3>
                <p>
                    You are required to follow <a href='https://discord.com/terms'>Discord's Terms of Service</a>
                    &nbsp;and <a href="https://discord.com/guidelines">Community Guidelines</a>
                    &nbsp;as long as you are using this service.
                </p>
                <h3>1c: Exploits</h3>
                <p>
                    This refers to anything that is intentionally done to cause the bot to malfunction, that is, actions done to
                    cause the bot to crash or to cause it to behave in a way that is not intended. These are usually fed
                    off of an already existing bug or vulnerability.
                    <h4>What to do if find a bug?</h4>
                    <p>
                        You may inform those who operate this service of said vulnerability in our&nbsp;
                        <a href='https://discord.gg/vuAPY6MQF5'>Support Server</a>.
                    </p>
                </p>
                <h2>Section 2: Service</h2>
                <p>Terms stated in this section are enforce throughout the entire service.</p>
                <h3>2a: Exploits</h3>
                <p>
                    See Term 1c for reference. Any exploits found throughout this service can be reported&nbsp;
                    <a href='https://discord.gg/vuAPY6MQF5'>here</a>.
                </p>
                <h3>2b: Common Knowledge</h3>
                <p>
                    Although these terms will be strictly enforced, these do not cover everything.
                    Please make use of your common sense, and do not do anything that you think will cause
                    harm to the service or to others who use the service or not.
                </p>
                <h3>2c: Evasion</h3>
                <p>
                    Any attempt to evade these terms or punishments from failure to abide by these terms is prohibited.
                </p>
            </Container>
        </>
    )
}
