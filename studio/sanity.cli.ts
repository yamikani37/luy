import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: { projectId: 'qo3wi0jo', dataset: 'production' },
  // Hosted at https://luy.sanity.studio after `npm run deploy`.
  studioHost: 'luy',
  deployment: { appId: 'uuphtistgqqiwrmo4hc3zb8r', autoUpdates: true },
});
