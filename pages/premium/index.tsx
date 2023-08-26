import { Layout } from '@components/Layout'
import { GetServerSideProps } from 'next'
import { useSession, getSession } from 'next-auth/client'
import React from 'react'

type Data = {
  data: string,
  time: number
}

const PremiumPage = ({ data }: { data: Data }) => {
  const [session, loading] = useSession()

  if (loading) {
    return null
  }

  if (!session) {
    return <Layout>Acceso denegado</Layout>
  }
  return <Layout>
    <img src={data.data} alt={`${data.time}`} />
  </Layout>
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const session = await getSession(context)

  if (!session){
    return {
      redirect: {
        permanent: false,
        destination: '/api/auth/signin'
      }
    }
  }

  let data = await fetch(`${process.env.NEXTAUTH_URL}/api/premium`, {
    headers: {
      session : JSON.stringify(session)
    }
  })
  if (!data.ok){
    return {
      redirect: {
        permanent: false,
        destination: '/api/auth/signin'
      }
    }
  }
  const dataJson = await data.json()

  return {
    props: {
      session,
      data: dataJson,
    }
  }
}

export default PremiumPage
