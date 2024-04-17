import {
  DynamoDBClient,
  UpdateItemCommand,
  ScanCommandOutput,
  ScanCommand
} from '@aws-sdk/client-dynamodb'

const client = new DynamoDBClient({})

export async function POST(req: Request) {
  try {
    const { newPlayer } = await req.json()

    // Scan the table to get all the items
    const scanResults: ScanCommandOutput = await client.send(new ScanCommand({
      TableName: process.env.TABLE_NAME
    }))

    if (!scanResults.Items || scanResults.Items.length === 0) return Response.json({ message: 'No Data to be updated' })

    const formerRanking = Number(scanResults.Items.filter(item => item.id.S === newPlayer.id)[0].ranking.N)

    if (formerRanking > Number(newPlayer.ranking)) {
      for (let i = 0; i < scanResults.Items.length; i++) {
        if (scanResults.Items[i].id.S === newPlayer.id) {
          const params = {
            TableName: process.env.TABLE_NAME,
            Key: {
              id: { S: newPlayer.id },
            },
            UpdateExpression: 'set #name = :n, #school = :s, #ranking = :r',
            ExpressionAttributeNames: {
              '#name': 'name',
              '#school': 'school',
              '#ranking': 'ranking'
            },
            ExpressionAttributeValues: {
              ':n': { S: newPlayer.name },
              ':s': { S: newPlayer.school },
              ':r': { N: newPlayer.ranking.toString() }
            }
          }

          await client.send(new UpdateItemCommand(params))

        } else if (Number(scanResults.Items[i].ranking.N) < formerRanking && Number(scanResults.Items[i].ranking.N) > Number(newPlayer.ranking) - 1) {

          const params = {
            TableName: process.env.TABLE_NAME,
            Key: {
              id: { S: scanResults.Items[i].id.S || '' },
            },
            UpdateExpression: 'set #ranking = :r',
            ExpressionAttributeNames: {
              '#ranking': 'ranking',
            },
            ExpressionAttributeValues: {
              ':r': { N: `${Number(scanResults.Items[i].ranking.N) + 1}` }
            }
          }

          await client.send(new UpdateItemCommand(params))
        } else {
          const params = {
            TableName: process.env.TABLE_NAME,
            Key: {
              id: { S: scanResults.Items[i].id.S || '' },
            },
            UpdateExpression: 'set #ranking = :r',
            ExpressionAttributeNames: {
              '#ranking': 'ranking',
            },
            ExpressionAttributeValues: {
              ':r': { N: `${Number(scanResults.Items[i].ranking.N) + 1}` }
            }
          }

          await client.send(new UpdateItemCommand(params))
        }
        // return { ...player, ranking: player.ranking - 1 }
      }
      return Response.json({ message: 'Data saved successfully' })
    } else if (formerRanking === Number(newPlayer.ranking)) {
      // return newPlayer
      const params = {
        TableName: process.env.TABLE_NAME,
        Key: {
          id: { S: newPlayer.id },
        },
        UpdateExpression: 'set #name = :n, #school = :s',
        ExpressionAttributeNames: {
          '#name': 'name',
          '#school': 'school'
        },
        ExpressionAttributeValues: {
          ':n': { S: newPlayer.name },
          ':s': { S: newPlayer.school }
        }
      }

      await client.send(new UpdateItemCommand(params))
      return Response.json({ message: 'Data saved successfully' })
    } else {
      for (let i = 0; i < scanResults.Items.length; i++) {
        if (scanResults.Items[i].id.S === newPlayer.id) {
          const params = {
            TableName: process.env.TABLE_NAME,
            Key: {
              id: { S: newPlayer.id },
            },
            UpdateExpression: 'set #name = :n, #school = :s, #ranking = :r',
            ExpressionAttributeNames: {
              '#name': 'name',
              '#school': 'school',
              '#ranking': 'ranking'
            },
            ExpressionAttributeValues: {
              ':n': { S: newPlayer.name },
              ':s': { S: newPlayer.school },
              ':r': { N: newPlayer.ranking.toString() }
            }
          }

          await client.send(new UpdateItemCommand(params))
        } else if (Number(scanResults.Items[i].ranking.N) > formerRanking && Number(scanResults.Items[i].ranking.N) < Number(newPlayer.ranking) + 1) {

          const params = {
            TableName: process.env.TABLE_NAME,
            Key: {
              id: { S: scanResults.Items[i].id.S || '' },
            },
            UpdateExpression: 'set #ranking = :r',
            ExpressionAttributeNames: {
              '#ranking': 'ranking',
            },
            ExpressionAttributeValues: {
              ':r': { N: `${Number(scanResults.Items[i].ranking.N) - 1}` }
            }
          }

          await client.send(new UpdateItemCommand(params))
          // return { ...player, ranking: player.ranking + 1 }
        }
      }
      return Response.json({ message: 'Data saved successfully' })
    }
  } catch (error) {
    console.log(error)
    return Response.json({ message: 'Error occured' })
  }
}