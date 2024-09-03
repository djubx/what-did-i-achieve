import {StructureBuilder} from 'sanity/desk'

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Users')
        .child(
          S.documentTypeList('user')
            .title('Users')
        ),
      S.listItem()
        .title('User Dashboards')
        .child(
          S.documentTypeList('userDashboard')
            .title('User Dashboards')
        ),
      // Add other document types here if needed
    ])

export default deskStructure