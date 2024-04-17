import {
  DynamoDBClient,
  PutItemCommand
} from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({});

export async function POST(req: Request) {
  try {
    const { newPlayer } = await req.json()

    const Item = {
      id: { S: newPlayer.id },
      name: { S: newPlayer.name },
      ranking: { N: `${newPlayer.ranking}` },
      school: { S: newPlayer.school }
    }

    await client.send(
      new PutItemCommand({
        TableName: process.env.TABLE_NAME,
        Item,
      })
    )
    return Response.json({ message: 'Data saved successfully' })
  } catch (error) {
    console.log(error)
    return Response.json({ message: 'Error occured' })
  }
}