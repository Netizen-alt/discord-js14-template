# Discord.js v14 Payment Bot Template 🤖💳

A powerful and scalable Discord bot template built with TypeScript and Discord.js v14, featuring integrated payment system with PromptPay QR code generation, ticket management, and cloud storage support.

## ✨ Features

- 🎯 **Discord.js v14** - Latest Discord API features
- 📘 **TypeScript** - Type-safe development
- 🏗️ **Modular Architecture** - Clean MVC-inspired structure
- 💰 **Payment System** - PromptPay QR code generation & slip verification
- 🎫 **Ticket System** - Channel-based support tickets
- 📊 **Database Support** - MongoDB integration
- ☁️ **Cloud Storage** - AWS S3/R2 support for file uploads
- 🎨 **Image Processing** - Canvas & Jimp for QR generation
- 📝 **Custom Logger** - Color-coded console logging
- 🔄 **Interaction Handlers** - Buttons, modals, and select menus
- 🚀 **Hot Reload** - Development with tsx watch mode

## 📁 Project Structure

```
src/
├── app.ts                          # Application entry point
├── commands/                       # Slash commands
│   └── setup/
│       └── setup.ts
├── config/
│   ├── config.example.ts          # Configuration template
│   └── config.ts                  # Your config (gitignored)
└── utils/
    ├── controllers/               # UI interaction handlers
    │   ├── button.ts             # Button interactions
    │   ├── modal.ts              # Modal submissions
    │   └── select.ts             # Select menu interactions
    ├── core/                      # Core bot components
    │   ├── app.ts                # Core application logic
    │   ├── basecommands.ts       # Command base class
    │   ├── baseevents.ts         # Event base class
    │   └── botclient.ts          # Extended Discord client
    ├── events/                    # Event listeners
    │   ├── interaction.commands.ts
    │   └── interaction.events.ts
    └── logger/                    # Logging system
        ├── app.ts                # Logger implementation
        └── color.ts              # Color utilities
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Discord Bot Token ([Discord Developer Portal](https://discord.com/developers/applications))

### Installation

1. **Use this template**
   ```bash
   # Click "Use this template" button on GitHub
   # Or clone directly:
   git clone https://github.com/Netizen-alt/discord-js14-template.git my-bot
   cd my-bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure your bot**
   ```bash
   # Copy example config
   cp src/config/config.example.ts src/config/config.ts
   ```

4. **Edit `src/config/config.ts`** with your credentials:
   ```typescript
   const config: Config = {
       token: 'YOUR_BOT_TOKEN',
       clientId: 'YOUR_CLIENT_ID',
       channelLogId: 'CHANNEL_ID_FOR_LOGS',
       ticketCategoryId: 'CATEGORY_ID_FOR_TICKETS',
       // ... other configurations
   }
   ```

5. **Build and run**
   ```bash
   # Development mode (hot reload)
   npm run dev

   # Production build
   npm run build
   npm start
   ```

## ⚙️ Configuration

The bot supports multiple integrations. Configure only what you need:

### Required Settings
- `token` - Discord bot token
- `clientId` - Discord application ID
- `channelLogId` - Channel for bot logs
- `ticketCategoryId` - Category for ticket channels

### Optional Integrations

#### Payment System (PromptPay)
```typescript
payment: {
    promptpay: {
        id: '0123456789' // Phone or ID number
    }
}
```

#### Database (MongoDB)
```typescript
database: {
    mongoDB: 'your-database-name',
    url: 'mongodb://...',
    key: 'connection-string'
}
```

#### Supabase
```typescript
supabase: {
    url: 'https://xxx.supabase.co',
    key: 'your-anon-key'
}
```

#### Cloud Storage (AWS S3/Cloudflare R2)
```typescript
r2: {
    accountId: 'account-id',
    s3Key: 'access-key',
    secretKey: 'secret-key'
}
```

#### Slip Verification
```typescript
slip: {
    Client_ID: 'your-client-id',
    Client_Secret: 'your-client-secret',
    Redirect_URI: 'your-redirect-uri'
}
```

## 🛠️ Development

### Adding Commands

Create a new command in `src/commands/`:

```typescript
import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { basecommands } from '../../utils/core/basecommands';

export class MyCommand extends basecommands {
    public readonly data = new SlashCommandBuilder()
        .setName('mycommand')
        .setDescription('My awesome command');

    public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        await interaction.reply('Hello!');
    }
}
```

### Adding Event Handlers

Create events in `src/utils/events/`:

```typescript
import { Events } from 'discord.js';
import { baseevents } from '../core/baseevents';

export class MyEvent extends baseevents<Events.MessageCreate> {
    public readonly name = Events.MessageCreate;
    public readonly once = false;

    public async execute(client: Client, message: Message): Promise<void> {
        // Handle event
    }
}
```

### Handling Interactions

Use the controller pattern for UI interactions:

- **Buttons**: Extend `src/utils/controllers/button.ts`
- **Modals**: Extend `src/utils/controllers/modal.ts`
- **Select Menus**: Extend `src/utils/controllers/select.ts`

## 📦 Dependencies

### Core
- `discord.js` - Discord API wrapper
- `typescript` - Type safety

### Payment & QR
- `promptpay-qr` - Generate PromptPay QR codes
- `qrcode` - QR code generation
- `jsqr` - QR code reading
- `canvas` - Image manipulation
- `jimp` - Image processing

### Database & Storage
- `mongodb` - MongoDB driver
- `@supabase/supabase-js` - Supabase client
- `@aws-sdk/client-s3` - S3-compatible storage

### Utilities
- `axios` - HTTP requests
- `luxon` - Date/time handling
- `tsx` - TypeScript execution & hot reload

## 📝 Scripts

```bash
npm run dev      # Start development server with hot reload
npm run build    # Compile TypeScript to JavaScript
npm start        # Run compiled production build
```

## 🔒 Security

- ⚠️ **Never commit `config.ts`** - It contains sensitive credentials
- ✅ `config.ts` is already in `.gitignore`
- ✅ Use `config.example.ts` as a template
- 🔐 Use environment variables for production deployments

## 📄 License

MIT License - feel free to use this template for your projects!

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📮 Support

- [Discord.js Guide](https://discordjs.guide/)
- [Discord.js Documentation](https://discord.js.org/)
- [Discord Developer Portal](https://discord.com/developers/docs)

---

**Built with ❤️ for the Discord bot community**

Star ⭐ this repo if you find it helpful!
