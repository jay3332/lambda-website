import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import { ApiContext, DefaultApi } from './Api';
import Title from '../components/Title';
import Homepage from '../pages/Homepage';
import Guilds from '../pages/Guilds';
import Dashboard from '../pages/dashboard/Entrypoint';
import RankCardEditor from '../pages/RankCardEditor';
import TermsOfService from "../pages/TermsOfService";
import Footer from "../components/Footer";

const GlobalStyle = createGlobalStyle`
  :root {
    --font-primary: 'Inter', serif;
    --theme-background-lightest: #34353a;
    --theme-background-light: #29292e;
    --theme-background: #1a1d1d;
    --theme-text: #ffffff;
    --theme-text-secondary: #f7c3c3;
    --theme-link: #2fbdff;
    --theme-link-hover: #6deeff;
    --theme-primary-dark: #404249;
    --theme-primary-dark-hover: #5d5d5d;
    --theme-primary: #4273ac;
    --theme-primary-hover: #518dd3;
    --theme-submit: #47b360;
    --theme-submit-hover: #41d374;
    --theme-error: #fc2c44;
    --theme-danger: #cf313d;
    --theme-danger-hover: #dc4350;
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
    /* There is never any horizontal overflow. If there is, I would consider it bad UX and unintentional. */
    overflow-x: hidden;
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
            <ApiContext.Provider value={DefaultApi}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/">
                            <Route path="guilds" element={<Guilds/>} />
                            <Route path="guild/:guildId/*" element={<Dashboard />} />
                            <Route path="rank-card" element={<RankCardEditor />} />
                            <Route path="terms" element={<TermsOfService />} />
                            <Route index element={<Homepage />}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ApiContext.Provider>
        </>
    );
}