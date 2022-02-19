import { RemoteShellMessage } from "./remote-shell-message.enum";

export interface WebSocketRemoteShellServer {
    onMessage(handleMessage: (messageType: RemoteShellMessage, payload: Record<string, any>)=> void)
    send(messageType: RemoteShellMessage, payload: Record<string, any>);
}