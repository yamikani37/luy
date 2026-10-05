import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { photo } from './schemas/photo';
import { menu, menuCategory, menuItem } from './schemas/menu';
import { sitePhotos } from './schemas/sitePhotos';

// Fixed documents: one per menu, plus the site photos. They can be edited but not created or deleted.
const singletons = [
  { id: 'bakes', type: 'menu', title: 'Bakes menu' },
  { id: 'kitchen', type: 'menu', title: 'Kitchen menu' },
  { id: 'sitePhotos', type: 'sitePhotos', title: 'Site photos' },
];
const singletonTypes = new Set(singletons.map((s) => s.type));

export default defineConfig({
  name: 'luy',
  title: 'Luyando Mooya’s Kitchen',
  projectId: 'qo3wi0jo',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Website')
          .items(singletons.map((s) => S.listItem().title(s.title).id(s.id).child(S.document().schemaType(s.type).documentId(s.id).title(s.title)))),
    }),
    visionTool(),
  ],
  schema: {
    types: [photo, menuItem, menuCategory, menu, sitePhotos],
    templates: (templates) => templates.filter((t) => !singletonTypes.has(t.schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      singletonTypes.has(schemaType) ? actions.filter((a) => a.action && ['publish', 'discardChanges', 'restore'].includes(a.action)) : actions,
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === 'global' ? prev.filter((t) => !singletonTypes.has(t.templateId)) : prev,
  },
});
