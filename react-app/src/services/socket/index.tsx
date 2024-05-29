import { Socket, io } from "socket.io-client";

class SocketClass {
  private static socket: Socket | null = null;

  static async connect(): Promise<Socket> {
    if (!this.socket) {
      this.socket = io("ws://localhost:9014");
      await new Promise<void>((resolve, reject) => {
        this.socket!.on("connect", () => {
          console.log("Connected to the server");
          resolve();
        });

        this.socket!.on("connect_error", (err: Error) => {
          console.error("Connection error:", err);
          reject(err);
        });
      });
    }
    return this.socket;
  }

  static getSocket(): Socket | null {
    return this.socket;
  }

  static checkIfConnected(): boolean {
    return this.socket !== null && this.socket.connected;
  }
}

export default SocketClass;
