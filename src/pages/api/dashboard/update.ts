import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import { sanityClient } from '@/lib/sanity'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session || !session.user) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { todayStartTime, ambitions, timeTracker } = req.body

  try {
    const result = await sanityClient.createOrReplace({
      _type: 'userDashboard',
      _id: `userDashboard_${session.user.id}`, // Add this line
      user: {
        _type: 'reference',
        _ref: session.user.id,
      },
      todayStartTime,
      ambitions,
      timeTracker,
    })

    res.status(200).json({ message: 'Dashboard updated successfully', result })
  } catch (error) {
    console.error('Error updating dashboard:', error)
    res.status(500).json({ message: 'Error updating dashboard' })
  }
}