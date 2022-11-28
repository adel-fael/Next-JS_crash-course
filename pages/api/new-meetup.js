// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { MongoClient } from 'mongodb'

async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const data = req.body
  
      const client = await MongoClient.connect(
        'mongodb+srv://adel:adel1234@cluster0.tq2uzzh.mongodb.net/meetups?retryWrites=true&w=majority'
      )
      const db = client.db()
  
      const meetupsCollection = db.collection('places')
  
      const result = await meetupsCollection.insertOne(data)
  
      console.log(result)

      client.close()

      res.status(201).json({message: "Meetup Inserted!"})
    }
  } catch (err) {
    console.log(err);
  }

}

export default handler
