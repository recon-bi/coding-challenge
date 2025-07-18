const endpoints = ['auth', 'users', 'bookings', 'hotels', 'example'];

export default async function (app) {
  for (const item of endpoints) {
    console.info(`Starting endpoint: /${item}`);
    try {
      const { default: router } = await import(`./${item}/${item}.routes.js`); // Add file extension
      app.use(`/${item}`, router);
      console.info(`Endpoint started successfully: /${item}`);
    } catch (error) {
      console.error(`Failed to start endpoint: /${item}. Error: ${error}`);
    }
  }
}
