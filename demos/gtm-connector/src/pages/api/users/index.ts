import { NextApiRequest, NextApiResponse } from 'next'

type User = {
  id: number
  name: string
}

/** Dummy user data. */
const sampleUserData: User[] = [
  { id: 101, name: 'Alice' },
  { id: 102, name: 'Bob' },
  { id: 103, name: 'Caroline' },
  { id: 104, name: 'Dave' },
]

const handler = (_req: NextApiRequest, res: NextApiResponse): void => {
  try {
    if (!Array.isArray(sampleUserData)) {
      throw new Error('Cannot find user data')
    }
    res.status(200).json(sampleUserData)
  } catch (e) {
    res.status(500).json({ statusCode: 500, ...e })
  }
}

export default handler
