import {
  DynamoDBClient,
  PutItemCommand,
  QueryCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { GetItemT, PutItemT, QueryParamsT, UpdateItemT } from "./types";
import { UpdateCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: "ap-south-1",
  apiVersion: "latest",
});

const dynamodb = DynamoDBDocumentClient.from(client);

export async function putItemInDynamoDB(params: PutItemT) {
  try {
    const command = new PutItemCommand(params);

    const res = await dynamodb.send(command);

    return res;
  } catch (err: any) {
    console.log(err);
    return { error: "Can't put an item" };
  }
}

export async function updateItemInDynamoDB(params: UpdateItemT) {
  const command = new UpdateCommand(params);

  const res = await dynamodb.send(command);

  console.log(res);
}

export async function getItemFromDynamoDB(params: GetItemT) {
  try {
    const command = new ScanCommand(params);

    const res = await dynamodb.send(command);

    // res.Items?.forEach((item) => {
    //   console.log(item);
    // });

    return res;
  } catch (err: any) {
    console.log(err);
    return { error: "Can't get an item" };
  }
}

export async function query(params: QueryParamsT) {
  const command = new QueryCommand(params);

  const res = await dynamodb.send(command);

  console.log(res.Items);
}
