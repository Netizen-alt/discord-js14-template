import { ActivityType } from 'discord.js';
interface Config {
    activity: any;
    token: string;
    clientId: string;
    status: {
        text: string;
        type: ActivityType;
    };
    supabase?: {
        url: string;
        key: string;
    };
    channelLogId: string;
    ticketCategoryId: string;
    payment?: {
        promptpay: {
            id: string;
        };
    };
    slip: {
        Client_ID: string;
        Client_Secret: string;
        Redirect_URI: string;
    },
    database?: {
        mongoDB: string;
        url: string;
        key: string;
    },
    r2?: {
        accountId: string;
        s3Key: string;
        secretKey: string;
    };
}

const config: Config = {
    activity: null,
    token: '',
    clientId: '',
    status: {
        text: 'Hup Service Bot | /help',
        type:  ActivityType.Playing,
    },
    channelLogId: '',
    ticketCategoryId: '',
    payment: {
        promptpay: {
            id: '',
        },
    },
    slip: {
        Client_ID: '',
        Client_Secret: '',
        Redirect_URI: 'https://',
    },
    database: {
        mongoDB: '',
        url: '',
        key: '',
    },
    r2: {
        accountId: '',
        s3Key: '',
        secretKey: '',
    },
}

export default config;