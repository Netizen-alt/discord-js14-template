import { Client, Events, Integration, ChatInputCommandInteraction } from 'discord.js'
import { baseevents } from '../core/baseevents';
import Logger from '../logger/app';
import { botclient } from '../core/botclient';

export class interactionEvent extends baseevents<Events.InteractionCreate> {
    public readonly name = Events.InteractionCreate;
    public readonly once = false;
    private readonly logger: Logger = new Logger('InteractionEvent');

    constructor() {
        super();
    }

    public async execute(client: Client, interaction: ChatInputCommandInteraction): Promise<void> {
        if (!(client instanceof botclient)) {
            this.logger.error('Client is not an instance of botclient.');
            return;
        }
        await this.handleChatInputCommandInteraction(client, interaction);
    }

    private async handleChatInputCommandInteraction(client: botclient, interaction: ChatInputCommandInteraction): Promise<void> {
        if (!interaction.isChatInputCommand()) return;
        const command = client.commands.get(interaction.commandName);
        if (!command) {
            this.logger.warn(`No command matching ${interaction.commandName} was found.`);
            return;
        }
        try {
            this.logger.activity('Command Executed', {
                command: interaction.commandName,
                user: interaction.user.username,
                guild: interaction.guild?.name
            });
            await command.execute(interaction);
        } catch (error) {
            this.logger.error(`Error executing ${interaction.commandName}`);
            this.logger.error(error as string);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    }

}