// src/lib/server/appwrite.js
"use server";
import { Client, Account } from "node-appwrite";
import { cookies } from "next/headers";

const private_key = '026609099a33ac9eea93aeb431fa8703b799791e8dea3df0e948effe1856de7cdf7b6c369c574542e711a2de4f3d5283f319f4a66bd86e1300f2d7c705a0dee1c9af25e399f78032fc81b767c76c000aa82cb91bda7670df0a3c9b7ba7138da2efd18562e2414b14273e55c9304600e5f5d4045f72a7c0db5040d1c10a4bda5b'
const endpoint = 'https://cloud.appwrite.io/v1'
const project_id = "66be46c000084543c2c2"
export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(project_id);

  const session = cookies().get("my-custom-session");
  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(project_id)
    .setKey(private_key);

  return {
    get account() {
      return new Account(client);
    },
  };
}
