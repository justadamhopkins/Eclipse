import {
  type StructureBuilder,
  type StructureResolver,
} from 'sanity/structure';

export const baseStructure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Schemas')
    .items([
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages list')
            .items([
              S.listItem()
                .title('Pages')
                .child(S.documentTypeList('page').title('Page list')),
              S.listItem()
                .title('Templates')
                .child(
                  S.documentTypeList('pageTemplate').title('Template list'),
                ),
            ]),
        ),

      S.listItem()
        .title('Navigation')
        .child(
          S.list()
            .title('Navigation list')
            .items([
              S.listItem()
                .title('Links')
                .child(S.documentTypeList('link').title('Link list')),
            ]),
        ),

      ...S.documentTypeListItems().filter(
        listItem =>
          !['page', 'pageTemplate', 'link'].includes(<string>listItem.getId()),
      ),
    ]);
