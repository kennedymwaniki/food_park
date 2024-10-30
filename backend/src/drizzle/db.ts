// import { drizzle } from "drizzle-orm/neon-http";
// import { neon } from "@neondatabase/serverless";
// import * as schema from "./schema"

// import {config} from "dotenv"

// config({path: ".env"})

// const client = neon(process.env.DATABASE_URL!)
// export const db = drizzle(client, {schema, logger: true})

//working with local postgres
//! when using a local db
import { config } from "dotenv";
config({ path: ".env" });

import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./schema";

console.log("DATABASE_URL IN DRIZZLE DB.TS:", process.env.DATABASE_URL!);

export const client = new Client({
  connectionString: process.env.DATABASE_URL!,
});

const main = async () => {
  await client.connect();
};
main();

const db = drizzle(client, { schema, logger: true });

/*
!package json migrate for neon.
 //! "migrate": "tsx src/drizzle/migrate.ts", migrartion script for when working with a local postgress db,
*/
