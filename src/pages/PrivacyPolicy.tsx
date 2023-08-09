import React from 'react';
import styled from 'styled-components';

import Title from '../components/Title';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Container = styled.div`
    padding: 12px;
    display: table;
    margin: 0 auto;
    width: min(90vw, 700px);
    overflow-x: hidden;
`;

export default function PrivacyPolicy() {
  return (
    <>
      <Title>Lambda: Privacy Policy</Title>
      <NavBar />
      <Container>
        <h1>Privacy Policy</h1>
        <p>Last updated: August 2, 2023</p>
        <p>
          We take your privacy very seriously. This policy outlines what information we collect, how we use it,
          and how you can control what information we collect.
        </p>
        <h2>Information we collect</h2>
        <p>
          We collect and store information that you explicitly provide to us when you use our services, such as
          configuration details (e.g. prefixes).
          <br />
          We also collect and store server IDs, user IDs, and channel IDs to map these configuration details to.
        </p>
        <h3>Message Jump URLs</h3>
        <p>
          All "timer-based" commands will store the message jump URL of the message that invoked the command.
          This is to provide a link to the message and surrounding context when the timer expires.
          This message jump URL is automatically deleted when the timer expires, or when the command is cancelled.
          These commands are:
          <ul>
            <li>reminder commands</li>
            <li>giveaway commands</li>
          </ul>
        </p>
        <h2>Controlling what we collect about you</h2>
        <h3>Getting rid of server data</h3>
        <p>
          By removing Lambda from your server, all data associated with your server will be deleted.
          This includes configuration details, server IDs, channel IDs, and configurations mapped to members in your server.
        </p>
        <h3>Getting rid of member data</h3>
        <p>
          By leaving a server, all data associated with you in that server will be deleted.
        </p>
        <h3>Opting out of further data collection</h3>
        <p>
          Upon joining the <a href='https://discord.gg/vuAPY6MQF5'>Support Server</a> and asking for your data to be deleted,
          you will also be opted out of further data collection unless you specifically ask for continued data collection.
          You will also be informed that some of Lambda's services may not work as intended for you when opting out of data collection.
          You may opt back in at any time.
        </p>
      </Container>
      <Footer />
    </>
  )
}
