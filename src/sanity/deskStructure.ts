import {StructureBuilder} from 'sanity/desk'

export const myStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Users')
        .child(
          S.documentList()
            .title('Users')
            .filter('_type == "user"')
        ),
      // Add more list items for other document types here
    ])