import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

const client = new S3Client({
  region: process.env.S3_REGION || "us-east-1",
  endpoint: process.env.S3_ENDPOINT,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
  },
});

async function test() {
  console.log("Testing S3 connection...");
  console.log("Endpoint:", process.env.S3_ENDPOINT);
  console.log("Bucket:", process.env.S3_BUCKET);
  
  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.S3_BUCKET,
    });
    const response = await client.send(command);
    console.log("Success! Objects in bucket:");
    console.log(response.Contents?.map(obj => obj.Key) || "No objects found");
  } catch (err) {
    console.error("Error testing S3:", err);
  }
}

test();
