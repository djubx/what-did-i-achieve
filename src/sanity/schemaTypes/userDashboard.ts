export default {
  name: 'userDashboard',
  title: 'User Dashboard',
  type: 'document',
  fields: [
    {
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{ type: 'user' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'todayStartTime',
      title: 'Today Start Time',
      type: 'datetime',
    },
    {
      name: 'ambitions',
      title: 'Ambitions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', type: 'string' },
            { name: 'text', type: 'string' },
            { name: 'completed', type: 'boolean' },
            { name: 'color', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'timeTracker',
      title: 'Time Tracker',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'ambition', type: 'string' },
            { name: 'startTime', type: 'datetime' },
            { name: 'endTime', type: 'datetime' },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'user.name',
      subtitle: 'todayStartTime',
    },
    prepare(selection: { title: string; subtitle: string }) {
      const { title, subtitle } = selection
      return {
        title: title || 'Unnamed User',
        subtitle: subtitle ? `Start time: ${new Date(subtitle).toLocaleString()}` : 'No start time set',
      }
    },
  },
}