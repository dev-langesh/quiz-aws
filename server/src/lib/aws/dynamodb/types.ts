import { AttributeValue } from "@aws-sdk/client-dynamodb";

export type PutItemT = {
  TableName: string;
  Item: Record<string, AttributeValue>;
};

export type UpdateItemT = {
  TableName: string;
  Key: Record<string, string>;
  UpdateExpression: string;
  ExpressionAttributeValues?: Record<string, string>;
  ExpressionAttributeNames?: Record<string, string>;
};

export type GetItemT = {
  TableName: string;
  FilterExpression: string;
  ExpressionAttributeNames?: Record<string, string>;
  ExpressionAttributeValues?: Record<string, AttributeValue>;
  ProjectionExpression?: string;
};

export type QueryParamsT = {
  TableName: string;
  IndexName?: string;
  ExpressionAttributeNames?: Record<string, string>;
  ExpressionAttributeValues?: Record<string, AttributeValue>;
  KeyConditionExpression: string;
  FilterExpression?: string;
  Limit?: number;
  ScanIndefFroward?: boolean;
  ProjectionExpression?: string;
};
