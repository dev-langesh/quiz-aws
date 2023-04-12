import { Request, Response } from "express";
import { PutItemT, GetItemT, UpdateItemT } from "../../lib/aws/dynamodb/types";
import {
  putItemInDynamoDB,
  updateItemInDynamoDB,
} from "../../lib/aws/dynamodb";
import { PutItemOutput, Update } from "@aws-sdk/client-dynamodb";
import { getItemFromDynamoDB } from "../../lib/aws/dynamodb";

// PORT /user/register
export async function registerUser(req: Request, res: Response) {
  try {
    const TableName: string = process.env.DYNAMO_DB_TABLE_NAME || "";

    const { username, roll_no } = req.body;

    if (!username || !roll_no) {
      throw new Error("Fill all the details");
    }

    const params: PutItemT = {
      TableName,
      Item: {
        username: {
          S: username,
        },
        roll_no: {
          S: roll_no,
        },
        started: {
          BOOL: false,
        },
        score: {
          N: "0",
        },
        correct_answers: {
          N: "0",
        },
      },
    };

    const db: any = await putItemInDynamoDB(params);

    if (db.error) {
      throw new Error(db.error);
    }

    return res.json({ message: "success" });
  } catch (err: any) {
    if (err) res.json({ error: err.message });
  }
}

// POST /user/is-started-quiz
export async function isUserStartedQuiz(req: Request, res: Response) {
  try {
    const TableName: string = process.env.DYNAMO_DB_TABLE_NAME || "";

    const { roll_no } = req.body;

    console.log(req.body);

    const params: GetItemT = {
      TableName,
      FilterExpression: "roll_no = :rno_value",

      ExpressionAttributeValues: {
        ":rno_value": {
          S: roll_no,
        },
      },
    };

    const db: any = await getItemFromDynamoDB(params);

    if (db.error) {
      throw new Error(db.error);
    }

    console.log(db.Items[0]);
    if (db.Items[0].started.S) {
      throw new Error("Already started");
    } else {
      const updateParams: UpdateItemT = {
        TableName,
        Key: {
          roll_no,
        },
        UpdateExpression: "set started = :val",
        ExpressionAttributeValues: {
          ":val": "true",
        },
      };

      const up = await updateItemInDynamoDB(updateParams);

      console.log(up);
    }

    return res.json({ message: "success" });
  } catch (err: any) {
    console.log(err);
    if (err) res.json({ error: err.message });
  }
}
