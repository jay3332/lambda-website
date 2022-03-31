import React from 'react';
import styled from 'styled-components';

const RankCardSvg = styled.svg<{ config: RankCardConfig }>`
    font-family: var(--font-primary);
    letter-spacing: 0em;

    #background-image {
        opacity: ${props => props.config.backgroundImageAlpha};
        filter: ${props => `blur(${props.config.backgroundBlur}px)`};
        background-size: fill;
    }

    #overlay {
        opacity: ${props => props.config.overlayAlpha};
    }

    #avatar-border {
        opacity: ${props => props.config.avatarBorderAlpha};
    }

    #progress-bar {
        opacity: ${props => props.config.progressBarAlpha};
    }
`;

export type RankCardProps = {
    level: number;
    xp: number;
    maxXp: number;
    rank: number;
    username: string;
    discriminator: string;
    avatarUrl: string;
    config: RankCardConfig;
}

export interface RankCardConfig {
    font: string;
    primaryColor: number;
    secondaryColor: number;
    tertiaryColor: number;
    backgroundUrl?: string;
    backgroundColor: number;
    backgroundImageAlpha: number;
    backgroundBlur: number;
    overlayColor: number;
    overlayAlpha: number;
    overlayBorderRadius: number;
    avatarBorderColor: number;
    avatarBorderAlpha: number;
    avatarBorderRadius: number;
    progressBarColor: number;
    progressBarAlpha: number;
}

const cssColor = (value: number): string => '#' + value.toString(16);

export default function RankCard({
    level,
    xp,
    maxXp,
    rank,
    username,
    discriminator,
    avatarUrl,
    config,
}: RankCardProps) {
    return (
        <RankCardSvg xmlns="http://www.w3.org/2000/svg" width="1390" height="600" viewBox="0 0 1390 600" fill="none" config={config}>
            <rect id="background" width="1390" height="600" fill={cssColor(config.backgroundColor)} />
            {config.backgroundUrl && <rect id="background-image" x="-15" y="-15" width="1420" height="640" fill="url(#patbackground)" />}
            <g id="content">
                <rect id="overlay" x="70" y="70" width="1250" height="460" rx={config.overlayBorderRadius} fill={cssColor(config.overlayColor)}/>
                <rect id="avatar-border" x="104" y="95" width="316" height="316" rx={config.avatarBorderRadius + 14} fill={cssColor(config.avatarBorderColor)}/>
                <rect id="avatar" x="123" y="114" width="278" height="278" rx={config.avatarBorderRadius} fill="url(#patavatar)"/>
                <rect id="progress-bar" x="463" y="342" width="718" height="74" rx="37" fill={cssColor(config.progressBarColor)} />
                <rect id="progress-bar-fill-rounder" x="475" y="354" width="50" height="50" rx="25" fill={cssColor(config.tertiaryColor)} />
                <rect id="progress-bar-fill" x="498" y="354" width="406" height="50" fill={cssColor(config.tertiaryColor)}/>
                <g id="username">
                    <text fill={cssColor(config.primaryColor)} xmlSpace="preserve" font-size="55">
                        <tspan x="476" y="312.5">{username}</tspan>
                        <tspan fill={cssColor(config.secondaryColor)} xmlSpace="preserve" font-size="50">#{discriminator}</tspan>
                    </text>
                </g>
                <g id="level">
                    <text fill={cssColor(config.secondaryColor)} xmlSpace="preserve" font-size="53" text-anchor="middle">
                        <tspan x="262" y="480.273">Level&nbsp;</tspan>
                        <tspan fill={cssColor(config.primaryColor)} xmlSpace="preserve" font-size="53">{level}</tspan>
                    </text>
                </g>
                <g id="rank">
                    <text fill={cssColor(config.primaryColor)} xmlSpace="preserve" font-size="60" text-anchor="end" x="1236" y="173.318">    
                        <tspan fill={cssColor(config.secondaryColor)} xmlSpace="preserve" font-size="45">RANK&nbsp;</tspan>
                        <tspan>#{rank}</tspan>
                    </text>
                </g>
                <g id="xp">
                    <text fill={cssColor(config.primaryColor)} xmlSpace="preserve" font-size="36">
                        <tspan x="476" y="466.091">{xp.toLocaleString()} XP</tspan>
                        <tspan fill={cssColor(config.secondaryColor)} xmlSpace="preserve" font-size="33">&nbsp;/ {maxXp.toLocaleString()}</tspan>
                    </text>
                </g>
            </g>
            <defs>
                <pattern id="patbackground" patternContentUnits="objectBoundingBox" width="100%" height="100%" viewBox="0 0 1 1" preserveAspectRatio="xMidYMid slice">
                    <image href={config.backgroundUrl} width="1" height="1" preserveAspectRatio="xMidYMid slice" />
                </pattern>
                <pattern id="patavatar" width="100%" height="100%">
                    <image href={avatarUrl} width="278" height="278" />
                </pattern>
            </defs>
        </RankCardSvg>
    )
}
