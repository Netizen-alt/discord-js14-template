import { Client, Events, ClientEvents } from 'discord.js';

export abstract class baseevents<T extends keyof ClientEvents = keyof ClientEvents> {
    public abstract readonly name: T;
    public abstract readonly once: boolean;

    /**
     * @param client
     * @param ...args
     */
    public abstract execute(client: Client, ...args: any[]): Promise<void>;

    /**
     * @returns {string} event name
     */
    public register(client: Client): void {
        if (this.once) {
            client.once(this.name, (...args: any[]) => this.execute(client, ...args));
        } else {
            client.on(this.name, (...args: any[]) => this.execute(client, ...args));
        }
    }
}