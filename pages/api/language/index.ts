import { serialize, CookieSerializeOptions } from 'cookie'
import { NextApiHandler, NextApiResponse } from 'next'

const DEFAULT_LOCALE = 'es'

const PREFERRED_LOCALE_COOKIE = 'NEXT_LOCALE'

const language: NextApiHandler = (req, res) => {
  console.log(req.method)
  if (req.method === 'GET') {
    const preferredLocale =
      req?.cookies[PREFERRED_LOCALE_COOKIE] || DEFAULT_LOCALE

    return res.status(200).json({
      preferredLocale,
      defaultLocale: DEFAULT_LOCALE,
    })
  }

  if (req.method === 'POST') {
    const newPrefferredLocale = req.body.preferredLocale as string | undefined

    setCookie(res, PREFERRED_LOCALE_COOKIE, newPrefferredLocale, {
      path: '/',
    })

    res.redirect('/')
    return res.end()
  }

  return res.status(405).end()
}

function setCookie(
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions
) {
  const stringValue =
    typeof value === 'object' ? `j:${JSON.stringify(value)}` : String(value)

  if ('maxAge' in options) {
    options.expires = new Date(Date.now() + options.maxAge!)
    options.maxAge! /= 1000
  }

  res.setHeader('Set-Cookie', serialize(name, String(stringValue), options))
}

export default language
