const authConfig = {
  get secret(): string {
    const secret = process.env.APP_SECRET;

    if (!secret) {
      throw new Error(
        'Environment variable not defined: APP_SECRET. Tokens cannot be signed without it.',
      );
    }

    return secret;
  },
  expiresIn: '1d' as const,
};

export { authConfig };
