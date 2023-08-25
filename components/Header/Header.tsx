import { PropsWithChildren } from 'react'
import Link, { LinkProps } from 'next/link'
import { NavBar } from '@ui/NavBar'
import { Button } from '@ui/Button'
import TopArea from './TopArea'

import { useTranslation } from 'next-i18next'

import { PreviewModeBanner } from './PreviewModeBanner'

export function Header() {
  const { t } = useTranslation(['header'])
  return (
    <>
      <PreviewModeBanner />
      <div className="px-8 py-3">
        <TopArea />
      </div>
      <div className="mx-auto" style={{ maxWidth: '98%' }}>
        <NavBar title="🌿 Plantpedia">
          <div>
            <NavLink href="/top-stories">{t('text')}</NavLink>
            <NavLink href="/premium">PREMIUM</NavLink>
          </div>
        </NavBar>
      </div>
    </>
  )
}

function NavLink({ children, ...linkProps }: PropsWithChildren<LinkProps>) {
  return (
    <Link {...linkProps} passHref>
      <Button color="inherit" variant="text" component="a">
        {children}
      </Button>
    </Link>
  )
}
