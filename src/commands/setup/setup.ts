import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { basecommands } from "../../utils/core/basecommands";

export class setupcommand extends basecommands {
    public readonly data: SlashCommandBuilder;
    constructor() {
        super()
        this.data = new SlashCommandBuilder()
            .setName('setup')
            .setDescription('Setup the bot for the server (Admin only)');
    }
    public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        if (!interaction.guild) {
            await interaction.reply({ content: 'This command can only be used in a server.', ephemeral: true });
            return;
        }
        await interaction.reply({ content: 'Setup command is under development.', ephemeral: true });
    }
}