import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  padding: 42px;
  opacity: 0.9;
  
  * {
    text-align: center;
  }
`;

export default function Footer() {
    return (
        <Container>
            <span>
                Copyright © 2022-present <b>jay3332</b>. All rights reserved.
                <br />
                <Link to="/privacy">Privacy Policy</Link> &bull; <Link to="/terms">Terms of Service</Link>
            </span>
        </Container>
    )
}
