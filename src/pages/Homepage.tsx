import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import NavBar from '../components/NavBar';
import Title from '../components/Title';

import LambdaIconSource from '../assets/lambda.png';
import ConfigurableIcon from '../assets/icons/configurable.svg';
import DashboardIcon from '../assets/icons/dashboard.svg';
import MultipurposeIcon from '../assets/icons/multipurpose.svg';
import ReliableIcon from '../assets/icons/reliable.svg';
import Footer from "../components/Footer";

export const BOT_INVITE: string = "https://discord.com/oauth2/authorize?client_id=734872509912186921&scope=bot+applications.commands&permissions=8";

const Banner = styled.div`
    display: flex;
    width: 100vw;
    height: max(18vw, 25vh);
    align-items: center;
    justify-content: center;
  
    @media only screen and (max-width: 580px) {
        flex-direction: column;
        height: 36vh;
    }
`;

const Jump = keyframes`
    from { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    to { transform: translateY(0px); }
`;

const LambdaIcon = styled.img`
    border-radius: 50%;
    width: min(12.5vmax, 240px);
    animation: ${Jump} 0.5s ease-in-out;
    transform: none;
`;

const BannerContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin: 2.4vmax;
`;

const LambdaHeader = styled.div`
    font-size: min(3.5vmax, 64px);
    font-weight: bold;
    margin-bottom: min(0.75vmax, 12px);
`;

const LambdaDescription = styled.div`
    font-size: min(1.75vmax, 36px);
`;

const BannerButtons = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 1.5vmax;

    a {
        margin-right: 1vmax;
        font-size: 1.2em;
        padding: 0.7em 1.1em;
        background-color: var(--theme-primary);
        color: var(--theme-text);
        border-radius: 0.2em;
        transition: background-color 0.3s, transform 0.3s ease;
        text-decoration: none;
        cursor: pointer;
        transform: translateY(0px);
    }

    a:hover {
        background-color: var(--theme-primary-hover);
        color: var(--theme-text);
        transform: translateY(-4px);
    }
`;

const BannerDashboardButton = styled(Link)`
    background-color: var(--theme-primary-dark) !important;

    &:hover {
        background-color: var(--theme-primary-dark-hover) !important;
    }
`;

const WhyLambda = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const WhyLambdaBoxes = styled.div`
    margin: auto;
    display: inline-grid;
    grid-template-columns: 1fr 1fr;
    width: min(1000px, 60vw);
    flex-grow: 1;
    place-items: center;
  
    @media only screen and (max-width: 1000px) {
        grid-template-columns: 1fr;
    }
`;

const WhyLambdaBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    padding: 24px;
  
    h2 {
        margin-bottom: 8px;
    }
`;

const WhyLambdaIcon = styled.img`
    width: min(10vmax, 64px);
    color: white;
    filter: invert(1) brightness(1);
`;

const WhyLambdaContent = styled.div`
    margin-left: 24px;
`;

function WhyLambdaSection({ title, iconUrl, children }: RequiresChildren<{ title: string, iconUrl: string }>) {
    return (
        <WhyLambdaBox>
            <WhyLambdaIcon src={iconUrl} alt={title} />
            <WhyLambdaContent>
                <h2>{title}</h2>
                <span>{children}</span>
            </WhyLambdaContent>
        </WhyLambdaBox>
    )
}

export default function Homepage() {
    return (
        <>
            <Title>Lambda: Homepage</Title>
            <NavBar />
            <Banner>
                <LambdaIcon src={LambdaIconSource} />
                <BannerContent>
                    <LambdaHeader>Lambda</LambdaHeader>
                    <LambdaDescription>A multipurpose bot for Discord.</LambdaDescription>
                    <BannerButtons>
                        <a href={BOT_INVITE}>
                            Add Lambda
                        </a>
                        <BannerDashboardButton to="/guilds">Dashboard</BannerDashboardButton>
                    </BannerButtons>
                </BannerContent>
            </Banner>
            <WhyLambda>
                <h1>Why Lambda?</h1>
                <WhyLambdaBoxes>
                    <WhyLambdaSection title="Multipurpose" iconUrl={MultipurposeIcon}>
                        Lambda packs many advanced features into one, easy-to-access bot.
                        Stop worrying about the bot clutter in your server and switch to Lambda.
                        It suports high-level features like music, moderation, leveling, custom-commands,
                        and so much more.
                    </WhyLambdaSection>
                    <WhyLambdaSection title="Configurable" iconUrl={ConfigurableIcon}>
                        Lambda is highly configurable. If you don&apos;t like a feature the way it is by
                        default, you can easily change it to fit you needs. Lambda provides features such as
                        highly-customizable rank-cards, precise auto-moderation settings, and much more.
                    </WhyLambdaSection>
                    <WhyLambdaSection title="Dashboard" iconUrl={DashboardIcon}>
                        Lambda features a highly comprehensive dashboard for those who hate having
                        to memorize text (or slash) commands. An easy-to-use user interface allows
                        you to make use of specific confugration settings without having to touch your
                        keyboard. <Link to="/guilds">Go to Dashboard</Link>
                    </WhyLambdaSection>
                    <WhyLambdaSection title="Reliable" iconUrl={ReliableIcon}>
                        Lambda is hosted on reliable servers, so it won&apos;t go offline when you
                        least expect it. When downtime is expected (i.e. maintainence), you will
                        be notified beforehand in the Support Server.
                    </WhyLambdaSection>
                </WhyLambdaBoxes>
            </WhyLambda>
            <Footer />
        </>
    );
}
