import { Grid } from '@ui/Grid'
import { Typography } from '@ui/Typography'
import { Button } from '@ui/Button'
import { useRouter } from 'next/router'

const TopArea = () => {
  const { locales, locale } = useRouter()

  //locales aren't configured
  if (locales === undefined || locale === undefined) {
    return null
  }

  return (
    <Grid container justify="space-between">
      <Grid item></Grid>
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
