import { Api } from './app/Api';
import React from "react";

declare global {
    type Child = React.ElementType | React.ReactNode;
    type Children = Child | Child[] | Children[];

    type RequiresChildren<P = {}> = { children: Children } & P;
    type SupportsChildren<P = {}> = { children?: Children | [] } & P;

    interface Window {
        api: Api;
        debugRequests: boolean;
    }
}