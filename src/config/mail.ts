interface IMailConfig {
    driver: 'ethereal' | 'ses';
    defaults: {
        from: {
            email: string;
            name: string;
        };
    };
}

export default {
    driver: process.env.MAIL_DRIVER,
    defaults: {
        from: {
            email: 'diego@rocketseat.com.br',
            name: 'Diego da RocketSeat',
        },
    },
} as IMailConfig;
