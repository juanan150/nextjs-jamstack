import type { NextApiHandler } from 'next'

const credentialsAuth: NextApiHandler<User> = (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).end()
  }
  if (req.body.password === process.env.AUTH_PASS_SECRET) {
    const platziUser: User = {
      email: 'stud@sss',
      name: 'platzi student',
      image: '',
    }
    res.status(200).json(platziUser)
  }

  res.status(401).end()
}

export default credentialsAuth
