import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

export abstract class basecommands {
    public abstract readonly data: SlashCommandBuilder

    /**
     * @param interaction
     */
    public abstract execute(interaction: ChatInputCommandInteraction): Promise<void>

    /**
     * @returns {string} command name
     */
    public get name(): string {
        return this.data.name
    }

    /**
     * @returns {string} command description
     */
    public get description(): string {
        return this.data.description
    }
}