import { Client, ClientOptions, Collection, REST, Routes } from "discord.js";
import { basecommands } from "./basecommands";
import { baseevents } from "./baseevents";
import Logger from "../logger/app";
export class botclient extends Client {
    public readonly commands: Collection<string, basecommands>;
    public readonly cooldowns: Collection<string, Collection<string, number>>;
    public readonly rest: REST;
    private readonly logger: Logger

    constructor(options: ClientOptions, token: string) {
        super(options);
        this.commands = new Collection<string, basecommands>();
        this.cooldowns = new Collection<string, Collection<string, number>>();
        this.logger = new Logger("BotClient");
        this.rest = new REST({ version: '10' }).setToken(token);

        this.login(token).catch(error => this.logger.error(error));
    }

    public registerCommand(command: basecommands): void {
        this.commands.set(command.name, command);
        this.logger.info(`Registered command: ${command.name}`);
    }
    public registerCommands(commands: basecommands[]): void {
        commands.forEach(command => this.registerCommand(command))
        this.logger.info(`Total commands registered: ${this.commands.size}`);
    }
    public registerEvent(event: baseevents): void {
        event.register(this);
        this.logger.info(`Registered event: ${event.name}`);
    }
    public registerEvents(events: baseevents[]): void {
        events.forEach(event => this.registerEvent(event))
        this.logger.info(`Total events registered: ${events.length}`);
    }
    public async deployCommands(guildId?: string): Promise<void> {
        const commandsData = this.commands.map(command => command.data.toJSON());
        if (guildId) {
            await this.rest.put(Routes.applicationGuildCommands(this.application!.id, guildId),{ body: commandsData });
            this.logger.info(`Deployed commands to guild ID: ${guildId}`);
        } else {
            await this.rest.put(Routes.applicationCommands(this.application!.id),{ body: commandsData });
            this.logger.info(`Deployed commands globally`);
        }
        this.logger.info(`Total commands deployed: ${commandsData.length}`);
    }
    public async start(): Promise<void> {
        this.once('ready', () => {
            this.logger.info(`Logged in as ${this.user?.tag}`);
        });
    }
    public async shutdown(): Promise<void> {
        await this.destroy();
        // console.log('Bot has been shut down.');
        this.logger.info('Bot has been shut down.');
    }
}