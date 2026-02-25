import {
  type StructureBuilder,
  type StructureResolver,
} from 'sanity/structure';

export const baseStructure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Base')
    .items([...S.documentTypeListItems().reverse()]);
