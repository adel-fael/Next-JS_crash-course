import { MongoClient } from 'mongodb'
import Meta from '../components/layout/Meta'
import MeetupList from '../components/meetups/MeetupList'


export default function Home(props) {
  return (
    <>
      <Meta title="All Meetups" />
      <MeetupList meetups={props.meetups} />
    </>
  )
}

// this is better for websites that change constantly
// this function will not run on the build process but will always be running on the server
/*
export const getServerSideProps = async (ctx) => {
  const req = ctx.req
  const res = ctx.res
  // fetch data from API

  return {
    props:{
      meetups: DUMMY_MEETUPS,
    }
  }
}
*/

// this is better for static websites
// this function executed on the build process not on client or server side
export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    'mongodb+srv://adel:adel1234@cluster0.tq2uzzh.mongodb.net/meetups?retryWrites=true&w=majority'
  )
  const db = client.db()

  const meetupsCollection = db.collection('places')

  const meetupsData = await meetupsCollection.find().toArray()

  client.close()


  return {
    props: {
      meetups: meetupsData.map(meetup=>({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 30  // in sec 
  }
}
