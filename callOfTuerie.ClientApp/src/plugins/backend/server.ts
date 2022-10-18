import Configuration from "@/configuration";

export default class CustomSocket {
  webSocket!: WebSocket;
  configuration!: Configuration;
  constructor() {
    this.configuration = new Configuration();
    // this.websocket = new WebSocket(this.configuration.appUrl);
    // this.webSocket = new WebSocket("wss://echo.websocket.org");
  }

  // public SendEvent(event: { name: string; data: any }) {
  //   this.socket.sendMessage()
  // }
}
