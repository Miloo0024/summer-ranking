import { 
  DynamoDBClient, 
  ScanCommand, 
  BatchWriteItemCommand, 
  ScanCommandOutput 
} from '@aws-sdk/client-dynamodb'

const client = new DynamoDBClient({})

export async function DELETE() {
  try {
    // Scan the table to get all the items
    const scanResults: ScanCommandOutput = await client.send(new ScanCommand({
      TableName: process.env.TABLE_NAME
    }));

    if (!scanResults.Items) return Response.json({ message: 'No Data to be deleted' })
    // Prepare the request items for batch write
    const itemsToDelete = scanResults.Items.map(item => ({
      DeleteRequest: {
        Key: {
          id: item.id
        }
      }
    }));

    // Delete items in batches of 25
    while (itemsToDelete.length > 0) {
      const batch = itemsToDelete.splice(0, 25);
      await client.send(new BatchWriteItemCommand({
        RequestItems: {
          [`${process.env.TABLE_NAME}`]: batch
        }
      }));
    }
    return Response.json({ message: 'Data cleared successfully' })
  } catch (error) {
    console.error(error);
    return Response.json({ message: 'Error occured' })
  }
}