import { Grid } from '@ui/Grid'
import { Typography } from '@ui/Typography'
import { Button } from '@ui/Button'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { signIn, signOut, useSession } from 'next-auth/client'

const LoginLogout = () => {
  const { t } = useTranslation(['common'])
  const [session, loading] = useSession()

  if (loading){
    return null
  }

  if (!session) {
    return <Button onClick={() => signIn()}>{t('signIn')}</Button>
  }

  return (
    <>
      <span>{session?.user?.name}</span>
      <Button onClick={() => signOut()}>{t('signOut')}</Button>
    </>
  )
}

const TopArea = () => {
  const { locales, locale } = useRouter()

  //locales aren't configured
  if (locales === undefined || locale === undefined) {
    return null
  }

  return (
    <Grid container justify="space-between">
      <Grid item>
        <LoginLogout />
      </Grid>
      <Grid item>
        <Typography variant="body2" component="span" className="pr-3">
          language:
        </Typography>
        {locales.map((l) => (
          <form
            action="/api/language"
            method="POST"
            key={l}
            className="inline-block"
          >
            <input type="hidden" value={l} name="preferredLocale" />
            <Button
              variant={l === locale ? 'outlined' : 'text'}
              className="ml-1"
              type="submit"
            >
              {l}
            </Button>
          </form>
        ))}
      </Grid>
    </Grid>
  )
}

export default TopArea
