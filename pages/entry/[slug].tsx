import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { getCategoryList, getPlant, getPlantList } from '@api/index'
import { Layout } from '@components/Layout'
import { Grid } from '@material-ui/core'
import { Typography } from '@ui/Typography'
import { PlantEntryInline } from '@components/PlantCollection'
import { RichText } from '@components/RichText'

type pageProps = {
  plant: Plant
  otherEntries: Plant[]
  categories: Category[]
}

type PathType = {
  params: {
    slug: string
  }
}

export default function PlantEntryPage({
  plant,
  categories,
  otherEntries,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8} lg={9} component="article">
          <figure>
            <img src={plant.image.url} alt={plant?.image.title} />
          </figure>
          <div className="px-12 pt-8">
            <Typography variant="h2">{plant.plantName}</Typography>
          </div>
          <div className="p-10">
            <RichText richText={plant.description} />
          </div>
        </Grid>
        <Grid item xs={12} md={4} lg={3} component="aside">
          <section>
            <Typography variant="h5" component="h3" className="mb-4">
              Recent Posts
            </Typography>
                {otherEntries?.map((otherEntry) => (
                  <article className="mb-4" key={otherEntry.id}>
                    <PlantEntryInline {...otherEntry} />
                  </article>
                ))}
            )
          </section>
          <section className="mt-10">
            <Typography variant="h5" component="h3" className="mb-4">
              Categories
            </Typography>
              <ul className="list">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link passHref href={`/category/${category.slug}`}>
                      <Typography component="a" variant="h6">
                        {category.title}
                      </Typography>
                    </Link>
                  </li>
                ))}
              </ul>
          </section>
        </Grid>
      </Grid>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const plants = await getPlantList()
  const plantPaths: PathType[] = plants.map((plant) => ({
    params: { slug: plant.slug },
  }))
  return {
    paths: plantPaths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<pageProps> = async (context) => {
  const slug = context.params?.slug
  let plant: Plant | undefined

  if (typeof slug === 'string') {
    try {
      plant = await getPlant(slug)
      const categories = await getCategoryList()
      const otherEntries = await getPlantList({ limit: 4 })
      return {
        props: {
          plant,
          categories,
          otherEntries,
        },
      }
    } catch (e) {
      return {
        notFound: true,
      }
    }
  }

  return {
    notFound: true,
  }
}
