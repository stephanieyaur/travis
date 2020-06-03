import idoc
import json

def lambda_handler(event, context):
    return {
        'statusCode': 200,
        'body': json.dumps(idoc.getIdocProfile(event['queryStringParameters']['idoc']))
    }
