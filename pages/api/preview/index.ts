import { NextApiHandler } from 'next'
import { getPlant } from '@api'

const enablePreview: NextApiHandler = async (req, res) => {
  const slug = req.query.slug

  if (
    req.query.secret !== process.env.PREVIEW_SECRET ||
    typeof slug !== 'string' ||
    slug === ''
  ) {
    return res.status(400).json({ message: 'invalid token' })
  }

  try {
    const plant = await getPlant(slug, true)

    res.setPreviewData({})

    res.redirect(`/entry/${plant.slug}`)
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(e)
    }

    return res.status(401).json({ message: 'invalid slug' })
  }
}

export default enablePreview
