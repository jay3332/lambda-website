import Markdown from 'markdown-it';
import React, {useContext, useEffect, useState} from 'react';
import ReactTooltip from "react-tooltip";
import styled from 'styled-components';

import {ApiContext, CommandData} from "../app/Api";
import Title from "../components/Title";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import SearchIcon from '../assets/search.svg';

const AlignedHeader = styled.h1`
  text-align: center;
  padding-top: 16px;
`;

const AlignedDescription = styled.div`
  text-align: center;
  padding-bottom: 8px;
  
  div:nth-child(2) {
    opacity: 0.7;
    padding-top: 6px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 75vw;
  
  @media screen and (max-width: 768px) {
    width: 95vw;
  }
`;

const CategorySelect = styled.div`
  margin-top: 2.5rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 1rem;
`;

const CategoryButton = styled.div<{ selected: boolean }>`
  padding: 0.5em 0.8em;
  margin: 3px;
  font-size: 18px;
  background-color: ${props => !props.selected ? 'transparent' : 'var(--theme-primary-dark)'};
  border-radius: 4px;
  transition: all 0.25s ease;
  border: 3px solid transparent;
  cursor: pointer;
  user-select: none;
  
  &:hover {
    border: 3px solid var(--theme-primary-dark-hover);
  }
`;

const CommandSearchIcon = styled.img`
  filter: invert(1) brightness(1);
  width: 22px;
`;

const CommandSearchGroup = styled.div`
  ${CommandSearchIcon} {
    position: absolute;
    padding-top: 11px;
    padding-left: 12px;
    opacity: 0.6;
    user-select: none;
  }
  
  display: flex;
  flex-grow: 1;
`;

const CommandSearch = styled.input`
  border: none;
  border-radius: 6px;
  font-size: 18px;
  color: var(--theme-text);
  background-color: var(--theme-background-light);
  padding: 12px 0 12px 48px;
  flex-grow: 1;
  margin-bottom: 8px;
`;

const NoCommandsFound = styled.div`
    padding-top: 16px;
`;

const CommandAliases = styled.div`
  font-size: 0.8em;
  opacity: 0.4;
  margin: 6px 0;
`;

const CommandInfoContainer = styled.div<{ selected: boolean }>`
  margin: 6px 0;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  padding: 12px;
  border-radius: 6px;
  background-color: var(--theme-background-lighter);
  border: 4px solid ${props => !props.selected ? 'transparent' : 'var(--theme-primary)'};
  cursor: pointer;
  transition: all 0.25s ease;
  
  &:hover {
    background-color: var(--theme-background-lightest);
  }
  
  ${CommandAliases} + ${CommandAliases} {
    margin-top: 2px;
  }
`;

const CommandPrefix = styled.span`
  font-weight: 700;
  opacity: 0.4;
  white-space: pre;
  user-select: none;
`;

const CommandSignaturePart = styled.div<{ required: boolean, margin?: number }>`
  background-color: var(--theme-signature-${props => props.required ? 'required' : 'optional'});
  padding: 0.35em 0.65em;
  font-size: 0.72em;
  --sig-margin: ${props => props.margin ?? 4}px;
  margin: var(--sig-margin) 0 var(--sig-margin) 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
`;

const CommandSignature = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  font-size: 1.4em;
  font-weight: 500;
`;

const CommandSignatureTooltip = styled(ReactTooltip)`
  background-color: var(--theme-navbar) !important;
  color: var(--theme-text) !important;
`;

const CommandCategory = styled.div`
  font-weight: 700;
  font-size: 0.75em;
  opacity: 0.35;
  margin-bottom: 6px;
  user-select: none;
`;

const CommandDescription = styled.div`
  margin-top: 8px;
  opacity: 0.8;
`;

const CommandHeader = styled.h3`
  margin: 12px 0 6px 0;
  opacity: 0.8;
`;

function formatDescription(description: string, prefix: string): string {
    return new Markdown().renderInline(description.replace('{PREFIX}', prefix));
}

export default function Commands() {
    let [ commands, setCommands ] = useState<{ [ category: string ]: CommandData[] }>();
    let [ categories, setCategories ] = useState<string[]>([]);
    let [ query, setQuery ] = useState<string>('');
    let [ prefix, setPrefix ] = useState<string>('>');
    let [ selected, setSelected ] = useState<string[]>([]);
    let api = useContext(ApiContext);

    useEffect(() => {
        setSelected([]);
    }, [query, categories])

    useEffect((async () => {
        await api.ensureCommands().then(setCommands);
        const params = new URLSearchParams(window.location.search);

        if (params.has('prefix')) {
            setPrefix(params.get('prefix')!);
        }

        let queryCategories = params.get('categories');
        if (queryCategories) {
            const resolved = queryCategories.split(/ +/);
            if (resolved.every(c => c in api.commands!)) {
                setCategories(resolved);
            }
        }
    }) as unknown as () => void, []);

    let resolvedCommands = commands || api.commands;
    if (!resolvedCommands) {
        return <div>Loading...</div>;
    }

    let filteredCommands: CommandData[] = Object.entries(resolvedCommands).reduce((acc: CommandData[], [category, commands]) => {
        if (categories.length && !categories.includes(category)) {
            return acc;
        }
        if (!query) return [...acc, ...commands];

        const subject = query.toLowerCase();
        return [...acc, ...commands.filter(
            command =>
                command.name.startsWith(subject)
                || subject.includes(command.name.split(' ').at(-1)!)
                || command.aliases.some(alias => alias.startsWith(subject) || subject.includes(alias))
                || command.name.split(' ').some(word => word.startsWith(subject))
        )];
    }, []);

    return (
        <>
            <Title>Lambda: Commands</Title>
            <NavBar />
            <AlignedHeader>Commands</AlignedHeader>
            <AlignedDescription>
                <div>
                    Explore the variety of commands Lambda has to offer.
                </div>
                <div>
                    Listing <b>{
                        Object
                            .values(resolvedCommands)
                            .reduce((a, b) => a + b.length, 0)
                    }</b> commands
                </div>
            </AlignedDescription>
            <Container>
                <CategorySelect>
                    {Object.keys(resolvedCommands).map(category => (
                        <CategoryButton selected={categories.includes(category)} key={category} onClick={() => {
                            if (categories.includes(category)) {
                                setCategories(categories.filter(c => c !== category));
                            } else {
                                setCategories([...categories, category]);
                            }
                        }}>
                            {category}
                        </CategoryButton>
                    ))}
                </CategorySelect>
                <CommandSearchGroup>
                    <CommandSearchIcon src={SearchIcon} />
                    <CommandSearch placeholder="Search commands..." onChange={e => {
                        setQuery(e.target.value);
                    }} />
                </CommandSearchGroup>
                {filteredCommands.length ? filteredCommands.map(command => (
                    <CommandInfoContainer key={command.name} selected={selected.includes(command.name)} onClick={() => {
                        if (selected.includes(command.name)) {
                            setSelected(selected.filter(c => c !== command.name));
                        } else {
                            setSelected([...selected, command.name]);
                        }
                    }}>
                        <CommandCategory>{command.category.toUpperCase()}</CommandCategory>
                        <CommandSignature>
                            <CommandPrefix>{prefix}</CommandPrefix>
                            <span>{command.name}</span>
                            {command.signature.map(arg => (
                                <React.Fragment key={`${command.name}:${arg.name}`}>
                                    <CommandSignaturePart
                                        required={arg.required}
                                        data-tip
                                        data-for={`${command.name}:${arg.name}`}
                                    >
                                        {arg.choices ? arg.choices.join(' | ') : arg.name}
                                        {!arg.store_true && arg.name.startsWith('--') && (
                                            <CommandSignaturePart required margin={-1}>
                                                {arg.name.slice(2)}
                                            </CommandSignaturePart>
                                        )}
                                    </CommandSignaturePart>
                                    <CommandSignatureTooltip
                                        id={`${command.name}:${arg.name}`}
                                        effect={'solid'}
                                    >
                                        {arg.required ? 'Required' : arg.default ? `Default: ${arg.default}` : 'Optional'}
                                        {(() => {
                                            const lookup = arg.name.startsWith('--') ? command.flags : command.arguments;
                                            const subject = arg.name.startsWith('--') ? arg.name.slice(2) : arg.name;

                                            const found = lookup[subject];
                                            if (!found) {
                                                return;
                                            }

                                            return (
                                                <>
                                                    &nbsp;&#8212; <span dangerouslySetInnerHTML={{
                                                        __html: formatDescription(found, prefix)
                                                    }} />
                                                </>
                                            )
                                        })()}
                                    </CommandSignatureTooltip>
                                </React.Fragment>
                            ))}
                        </CommandSignature>
                        {selected.includes(command.name) && command.aliases.length > 0 && (
                            <CommandAliases><b>ALIASES: </b> {command.aliases.join(', ')}</CommandAliases>
                        )}
                        {selected.includes(command.name) && command.cooldown && (
                            <CommandAliases>
                                <b>COOLDOWN: </b> {command.cooldown.rate} time{command.cooldown.rate === 1 ? '' : 's'}
                                &nbsp;per {command.cooldown.per_humanized}, per {command.cooldown.type}
                            </CommandAliases>
                        )}
                        <CommandDescription dangerouslySetInnerHTML={{
                            __html: formatDescription(command.description, prefix)
                        }} />
                        {selected.includes(command.name) && Object.keys(command.arguments).length > 0 && <>
                            <CommandHeader>Arguments</CommandHeader>
                            {Object.entries(command.arguments).map(([name, description]) => (
                                <span key={`${command.name}:${name}:info`}>
                                    <b>{name}: </b>
                                    <span dangerouslySetInnerHTML={{
                                        __html: formatDescription(description, prefix)
                                    }} />
                                </span>
                            ))}
                        </>}
                        {selected.includes(command.name) && Object.keys(command.flags).length > 0 && <>
                            <CommandHeader>Flags</CommandHeader>
                            {Object.entries(command.flags).map(([name, description]) => (
                                <span key={`flag:${command.name}:${name}:info`}>
                                    <b>--{name}: </b>
                                    <span dangerouslySetInnerHTML={{
                                        __html: formatDescription(description, prefix)
                                    }} />
                                </span>
                            ))}
                        </>}
                    </CommandInfoContainer>
                )) : (
                    <NoCommandsFound>No commands found! Try clearing categories or try a different search query.</NoCommandsFound>
                )}
            </Container>
            <Footer />
        </>
    )
}
