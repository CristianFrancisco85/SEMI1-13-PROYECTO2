import { createContext } from "react";
import socketIOClient from "socket.io-client";
import { URL_SERVER } from "../services/utils";

export const socket = socketIOClient(URL_SERVER,{autoConnect:false})
export const SocketContext = createContext()