
import { useRouter } from 'next/router'
import Meta from '../../components/layout/Meta'
import NewMeetupForm from '../../components/meetups/NewMeetupForm'

const NewMeetupPage = () => {
  const router = useRouter()

  const addMeetupHandler = async (enteredMeetupData) => {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()
    console.log(data);

    // this will prevent you from going back to the page
    // router.replace()

    router.push('/')
  }

  return (
    <>
      <Meta title="Add New Meetup" />
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  )
}

export default NewMeetupPage
