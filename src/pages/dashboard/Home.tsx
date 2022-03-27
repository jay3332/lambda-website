import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { ApiContext, GuildStoredData } from '../../app/Api';

const Box = styled.div`
    background-color: var(--theme-background-lightest);
    border-radius: 8px;
    display: inline-flex;
    flex-direction: column;
    padding: 12px;
    margin: 24px;
    width: min(50vw, 600px);

    h1 {
        margin-bottom: 0;
    }

    h1,
    p {
        padding-left: 12px;
    }
`;

const PrefixEntry = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--theme-background);
    border-radius: 6px;
    font-size: 18px;
    padding: 8px;
    margin: 6px;
`;

const PrefixText = styled.span<{ prefix: string }>`
    opacity: ${props => props.prefix ? 1 : 0.3};
    font-weight: ${props => props.prefix ? 'inherit' : 'bold'};
`;

const PrefixDelete = styled.span`
    cursor: pointer;
    opacity: 0.4;
    color: var(--theme-error);
    transition: opacity 0.4s ease;
    font-size: 0.9em;

    &:hover {
        opacity: 1;
    }
`;

const PrefixInputContainer = styled.form`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 6px;
`;

const PrefixInput = styled.input`
    flex-grow: 1;
    border: none;
    background-color: var(--theme-background-light);
    border-radius: 6px;
    font-size: 16px;
    padding: 9px;
    margin-right: 6px;
`;

const PrefixSubmit = styled.input`
    border: none;
    background-color: var(--theme-submit);
    border-radius: 6px;
    font-size: 16px;
    padding: 9px 12px;
    transition: background-color 0.4s ease;
    cursor: pointer;

    &:hover {
        background-color: var(--theme-submit-hover);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

export default function DashboardHomepage() {
    const { guildId } = useParams();

    const [ data, setData ] = useState<GuildStoredData>();
    const api = useContext(ApiContext);

    useEffect(() => {
        api.ensureGuildStore(guildId!).then(r => {
            if (!r) return;
            setData(r);
        });
    }, [ guildId ]);

    return (
        <Box>
            <h1>Prefixes</h1>
            <p>I will respond to messages that start with any of the following&#58;</p>
            {data
                ? data.prefixes.map(p => (
                    <PrefixEntry key={p}>
                        <PrefixText prefix={p}>{p || '[blank prefix]'}</PrefixText>
                        <PrefixDelete onClick={() => {
                            api.removePrefix(guildId!, p!).then(({ prefixes }) => {
                                setData({ ...data, prefixes });
                            })
                        }}>Delete</PrefixDelete>
                    </PrefixEntry>
                ))
                : 'No prefixes.'
            }
            <PrefixInputContainer onSubmit={async e => {
                e.preventDefault();

                console.log(e.target)
                // @ts-ignore
                const [input, submit] = e.target;
                submit.disabled = true;

                const { prefixes } = await api.addPrefix(guildId!, input.value);
                setData({ ...data, prefixes });
                
                input.value = '';
                submit.disabled = false;
            }}>
                <PrefixInput
                    name='prefix'
                    placeholder='Add a prefix...'
                    minLength={1}
                    maxLength={100}
                />
                <PrefixSubmit type='submit' value='Add' />
            </PrefixInputContainer>
        </Box>
    )
}