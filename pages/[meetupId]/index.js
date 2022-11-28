import { MongoClient, ObjectId } from 'mongodb'
import Meta from '../../components/layout/Meta'
import MeetupDetail from '../../components/meetups/MeetupDetail'

const MeetupDetails = (props) => {
  return (
    <>
    <Meta title={props.meetupData.title} description={props.meetupData.description}/>
    <MeetupDetail
      key={props.meetupData.id}
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
      />
      </>
  )
}

export const getStaticProps = async (ctx) => {
  const meetupId = ctx.params.meetupId

  const client = await MongoClient.connect(
    'mongodb+srv://adel:adel1234@cluster0.tq2uzzh.mongodb.net/meetups?retryWrites=true&w=majority'
  )
  const db = client.db()
  const meetupsCollection = db.collection('places')
  const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) })

  client.close()

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title:selectedMeetup.title,
        image:selectedMeetup.image,
        address:selectedMeetup.address,
        description:selectedMeetup.title,
      },

    },
  }
}

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://adel:adel1234@cluster0.tq2uzzh.mongodb.net/meetups?retryWrites=true&w=majority'
  )
  const db = client.db()
  const meetupsCollection = db.collection('places')
  const meetupsData = await meetupsCollection.find({}, { _id: 1 }).toArray()

  client.close()

  return {
    fallback: false,
    paths: meetupsData.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  }
}

export default MeetupDetails
