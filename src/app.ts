import { botclient } from "./utils/core/botclient";
import config from './config/config';
import { IntentsBitField, Events } from "discord.js";
import Logger from "./utils/logger/app";
import commands from "./commands/app";
import { interactionEvent } from "./utils/events/interaction.events";

class App {
    private readonly client: botclient;
    private readonly token: string;
    private readonly logger: Logger = new Logger("App");

    constructor() {
        this.token = config.token;
        this.client = new botclient({
            intents: [
                IntentsBitField.Flags.Guilds,
                IntentsBitField.Flags.GuildMessages,
                IntentsBitField.Flags.GuildMembers,
                IntentsBitField.Flags.GuildVoiceStates,
                IntentsBitField.Flags.GuildMessageReactions,
                IntentsBitField.Flags.GuildPresences,
                IntentsBitField.Flags.GuildWebhooks,
                IntentsBitField.Flags.GuildInvites,
                IntentsBitField.Flags.MessageContent,
            ],
            allowedMentions: {
                parse: ['users', 'roles'],
                repliedUser: true
            }
        }, this.token);
    }

    public async initialize(): Promise<void> {
        try {
            this.logger.info('Initializing bot...');

            this.logger.info('Registering commands and events...');
            this.registerCommands();
            this.logger.info('Commands and events registered.');
            this.registerEvents();
            this.logger.info('Starting bot...');
            await this.client.start();
            this.client.on(Events.ClientReady, async () => {
                this.logger.info('Deploying commands...');
                await this.client.deployCommands();
                this.logger.info('Commands deployed.');
            });
        } catch (error) {
            
        }
    }

    private registerCommands(): void {
        const commandArray = Object.values(commands);
        this.client.registerCommands(commandArray);
    }

    private registerEvents(): void {
        const events = [
            new interactionEvent(), 
        ];
        this.client.registerEvents(events);
    }

    public async shutdown(): Promise<void> {
        await this.client.shutdown();
    }

}

const app = new App();
app.initialize();
export default app;