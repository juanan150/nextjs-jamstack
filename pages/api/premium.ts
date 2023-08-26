import { random } from 'lodash'
import { NextApiHandler } from 'next'
import { getSession } from 'next-auth/client'

const premium: NextApiHandler = async (req, res) => {
  const session = await getSession({ req })

  if (!session && !req.headers.session){
    return res.status(401).end()
  }

  res.status(200).json({
    data: `https://randomfox.ca/images/${random(1, 122)}.jpg`,
    time: new Date().getTime(),
  })
}

export default premium
