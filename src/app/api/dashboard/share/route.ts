import { NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: Request) {
  const { userId } = await req.json()

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
  }

  try {
    const shareableId = uuidv4()
    await sanityClient.create({
      _type: 'sharedDashboard',
      userId: userId,
      shareableId: shareableId,
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({ shareableId })
  } catch (error) {
    console.error('Error creating shared dashboard:', error)
    return NextResponse.json({ error: 'Failed to create shared dashboard' }, { status: 500 })
  }
}