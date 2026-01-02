import { ModalSubmitInteraction } from "discord.js";
import Logger from "../logger/app";

export class modalController {
    private readonly logger: Logger = new Logger('ModalController');
    constructor() {}

    /**
     * Handle modal interactions
     * @param interaction - The modal interaction from Discord
     */
    public async handleModal(interaction: ModalSubmitInteraction): Promise<void> {
        try {
            // Get the custom ID of the modal
            const customId = interaction.customId;
            this.logger.activity('Modal Interaction', {
                customId: customId,
                user: interaction.user.username,
                guild: interaction.guild?.name
            });
            // Handle different modals based on customId
            switch (customId) {
                case 'example_modal':
                    await this.handleExampleModal(interaction);
                    break;
                default:
                    this.logger.warn(`No handler found for modal: ${customId}`);
                    await interaction.reply({
                        content: 'This modal is not configured yet.',
                        ephemeral: true
                    });
            }
        } catch (error) {
            this.logger.error('Error handling modal interaction');
            this.logger.error(error as string);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: 'There was an error processing your submission!',
                    ephemeral: true
                });
            }
            else {
                await interaction.reply({
                    content: 'There was an error processing your submission!',
                    ephemeral: true
                });
            }
        }
    }   
    /**
     * ตัวอย่างการจัดการสำหรับโมดัลเฉพาะ
     * @param interaction - The modal interaction
     */
    private async handleExampleModal(interaction: ModalSubmitInteraction): Promise<void> {
        const inputValue = interaction.fields.getTextInputValue('example_input');
        await interaction.reply({
            content: `You submitted: ${inputValue}`,
            ephemeral: true
        });
    }
}