import {
  DynamoDBClient,
  DeleteItemCommand
} from '@aws-sdk/client-dynamodb'

const client = new DynamoDBClient({})

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    
    if(!id) return Response.json({ message: 'Invalid id' })

    await client.send(
      new DeleteItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: { id: { S: id } }
      })
    );

    return Response.json({ message: 'Data deleted successfully' })
  } catch (error) {
    return Response.json({ message: 'Error occured' })
  }
}

