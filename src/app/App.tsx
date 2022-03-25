import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import Title from '../components/Title';
import Homepage from '../pages/Homepage';

const GlobalStyle = createGlobalStyle`
    :root {
        --font-primary: 'Inter', serif;
        --theme-background: #1a1d1d;
        --theme-text: #ffffff;
        --theme-text-secondary: #797979;
        --theme-link: #2fbdff;
        --theme-link-hover: #6deeff;
        --theme-primary-dark: #404249;
        --theme-primary-dark-hover: #5d5d5d;
        --theme-primary: #4273ac;
        --theme-primary-hover: #518dd3;
        --theme-navbar: #222325;
        --theme-login: #121213;
    }
    
    * {
        font-family: var(--font-primary);
        color: var(--theme-text);
    }
    
    body {
        background: black;
        width: 100vw;
        margin: 0;
    }
    
    a {
        color: var(--theme-link);
        transition: color 0.3s ease;
        cursor: pointer;
        text-decoration: none;
    }
    
    a:hover {
        color: var(--theme-link-hover);
    }
    
    button {
        cursor: pointer;
        border: none;
        background-color: var(--theme-primary);
        color: var(--theme-text);
        padding: 0.2em 0.5em;
        border-radius: 0.2em;
        transition: background-color 0.3s ease;
    }

    button:hover {
        background-color: var(--theme-primary-hover);
    }
`;

export default function App() {
    return (
        <>
            <GlobalStyle />
            <Title>Lambda</Title>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage />}>
                        <Route index element={<Homepage />}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}