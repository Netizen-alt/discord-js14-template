import { StringSelectMenuInteraction } from 'discord.js';
import Logger from '../logger/app';

export class selectController {
    private readonly logger: Logger = new Logger('SelectController');

    constructor() {}

    /**
     * Handle string select menu interactions
     * @param interaction - The select menu interaction from Discord
     */
    public async handleSelect(interaction: StringSelectMenuInteraction): Promise<void> {
        try {
            // Get the custom ID of the select menu
            const customId = interaction.customId;
            
            // Get the selected values (array of strings)
            const selectedValues = interaction.values;

            this.logger.activity('Select Menu Interaction', {
                customId: customId,
                selectedValues: selectedValues,
                user: interaction.user.username,
                guild: interaction.guild?.name
            });

            // Handle different select menus based on customId
            switch (customId) {
                case 'example_select':
                    await this.handleExampleSelect(interaction, selectedValues);
                    break;
                default:
                    this.logger.warn(`No handler found for select menu: ${customId}`);
                    await interaction.reply({ 
                        content: 'This select menu is not configured yet.', 
                        ephemeral: true 
                    });
            }
        } catch (error) {
            this.logger.error('Error handling select menu interaction');
            this.logger.error(error as string);
            
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ 
                    content: 'There was an error processing your selection!', 
                    ephemeral: true 
                });
            } else {
                await interaction.reply({ 
                    content: 'There was an error processing your selection!', 
                    ephemeral: true 
                });
            }
        }
    }

    /**
     * ตัวอย่างการจัดการสำหรับเมนูเลือกเฉพาะ
     * @param interaction - The select menu interaction
     * @param values - The selected values
     */
    private async handleExampleSelect(interaction: StringSelectMenuInteraction, values: string[]): Promise<void> {
        await interaction.reply({
            content: `You selected: ${values.join(', ')}`,
            ephemeral: true
        });
    }
}