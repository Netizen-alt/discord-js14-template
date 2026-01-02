import { Client, Events } from "discord.js";
import { baseevents } from "../core/baseevents";
import Logger from "../logger/app";

export class readyevent extends baseevents<Events.ClientReady> {

    public readonly name = Events.ClientReady;
    public readonly once = true;
    private readonly logger: Logger = new Logger("ReadyEvent");

    public async execute(client: Client): Promise<void> {
        if (!client.user) {
            this.logger.error("Client user is not defined.");
            return;
        }
        this.logger.info(`Bot is ready! Logged in as ${client.user.tag}`);
        client.user.setPresence({
            activities: [{ name: 'Managing Payments', type: 3 }],
            status: 'online'
        });
        this.logger.activity('Bot Statistics', {
            'Username':     client.user.tag,
            'Guilds':       client.guilds.cache.size,
            'Users':        client.users.cache.size,
            'Channels':     client.channels.cache.size
        })
        this.logger.info('Ready event execution completed.');
    }

}