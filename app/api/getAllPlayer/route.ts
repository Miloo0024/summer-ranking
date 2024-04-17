import {
    DynamoDBClient,
    ScanCommand
} from '@aws-sdk/client-dynamodb'
export const dynamic = 'force-dynamic'

const client = new DynamoDBClient({})

export async function GET() {
    try {
        const data = await client.send(new ScanCommand({
            TableName: process.env.TABLE_NAME
        }))

        const finalResult = data.Items?.map(item => { return { id: item.id.S, school: item.school.S, name: item.name.S, ranking: Number(item.ranking.N) } })
        // console.log(first)
        return Response.json({ data: finalResult })
    } catch (error) {
        return Response.json({ message: 'Error occured' })
    }
}