import { RemoteShellMessage } from "./remote-shell-message.enum.js";

export interface WebSocketRemoteShellServer {
    onMessage(handleMessage: (messageType: RemoteShellMessage, payload: Record<string, any>)=> void)
    send(messageType: RemoteShellMessage, payload: Record<string, any>);
}