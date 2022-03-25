import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import NavBar from '../components/NavBar';
import Title from '../components/Title';

import LambdaIconSource from '../assets/lambda.png';

const Banner = styled.div`
    display: flex;
    width: 100vw;
    height: 20vmax;
    align-items: center;
    justify-content: center;
`;

const LambdaIcon = styled.img`
    border-radius: 50%;
    width: min(12.5vmax, 240px);
`;

const BannerContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin: 2vmax;
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
        transition: background-color 0.3s ease;
        text-decoration: none;
        cursor: pointer;
    }

    a:hover {
        background-color: var(--theme-primary-hover);
        color: var(--theme-text);
    }
`;

const BannerDashboardButton = styled(Link)`
    background-color: var(--theme-primary-dark) !important;

    &:hover {
        background-color: var(--theme-primary-dark-hover) !important;
    }
`;

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
                        <a href="https://discord.com/oauth2/authorize?client_id=734872509912186921&scope=bot+applications.commands&permissions=8">
                            Add Lambda
                        </a>
                        <BannerDashboardButton to="/dashboard">Dashboard</BannerDashboardButton>
                    </BannerButtons>
                </BannerContent>
            </Banner>
        </>
    );
}
