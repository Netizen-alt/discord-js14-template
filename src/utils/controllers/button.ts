import { ButtonInteraction } from "discord.js";
import Logger from "../logger/app";

export class buttonController {
    private readonly logger: Logger = new Logger('ButtonController');   
    constructor() {}
    /**
     * Handle button interactions
     * @param interaction - The button interaction from Discor
     */

    public async handleButton(interaction: ButtonInteraction): Promise<void> {
        try {
            // Get the custom ID of the button
            const customId = interaction.customId;
            this.logger.activity('Button Interaction', {
                customId: customId,
                user: interaction.user.username,
                guild: interaction.guild?.name
            });
            // Handle different buttons based on customId
            switch (customId) {
                case 'example_button':
                    await this.handleExampleButton(interaction);
                    break;
                default:
                    this.logger.warn(`No handler found for button: ${customId}`);
                    await interaction.reply({
                        content: 'This button is not configured yet.',
                        ephemeral: true
                    });
            }
        } catch (error) {
            this.logger.error('Error handling button interaction');
            this.logger.error(error as string);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: 'There was an error processing your button click!',
                    ephemeral: true
                });
            } else {
                await interaction.reply({
                    content: 'There was an error processing your button click!',
                    ephemeral: true
                });
            }
        }
    }
    /**
     * ตัวอย่างการจัดการสำหรับปุ่มเฉพาะ
     * @param interaction - The button interaction
     */ 

    private async handleExampleButton(interaction: ButtonInteraction): Promise<void> {
        await interaction.reply({
            content: 'You clicked the example button!',
            ephemeral: true
        });
    }
}