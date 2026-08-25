const authConfig = {
  secret: process.env.APP_SECRET || '*',
  expiresIn: '1d' as const,
};

export { authConfig };
