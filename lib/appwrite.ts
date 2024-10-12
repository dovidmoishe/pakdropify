import { Client, Databases, Account } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66be46c000084543c2c2"); // Replace with your project ID

export const account = new Account(client);
export const databases = new Databases(client);
