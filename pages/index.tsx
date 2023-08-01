import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { Layout } from '@components/Layout'
import { PlantCollection } from '@components/PlantCollection'
import { getPlantList } from '@api/index'
import { Hero } from '@components/Hero'
import { Authors } from '@components/Authors'

type HomeProps = {
  plants: Plant[]
}

export const getStaticProps: GetStaticProps<HomeProps> = async ({ locale }) => {
  const plants = await getPlantList({ limit: 10, locale })

  return {
    props: { plants },
    revalidate: 5 * 60, // once every five minutes
  }
}

export default function Home({
  plants,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Hero {...plants[0]} className="mb-20" />
      <Authors className="mb-10" />
      <PlantCollection
        plants={plants.slice(1, 3)}
        variant="vertical"
        className="mb-24"
      />
      <PlantCollection plants={plants} variant="square" />
    </Layout>
  )
}

