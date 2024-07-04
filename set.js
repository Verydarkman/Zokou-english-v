const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0d3THNNT2RNcjBlcnZUeHVYMnRuZVFRUytqNVh2THlmdzJVMnR6WVprdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYjdTMVU2c2IrTUlJdUoxYXRiZVUvZmpnNko2UHVia0cxcy9RMkRhcHhSaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLTlIzS1VSOStVc1hJeXJpU0t1bXdsbStpWUw3UXUvYjlXZjJzcE83a0ZNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLZDRWbU9PMS95akNScmRYajROcnhqaUlmOHovNFFJQ0FPL1BDR0szSGlRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllIQlo4UEdxMS9ISzhsMVVuTWNVc0ZYM1F4YVhxODJjeC9IdG1EWiswWDA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkZrSi96Y3AyRjYxVXhXYThMUUw0VmoyV2YreDFVcWc2eXIyWXZMZjJ3M0E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUdSWjcvMEV4dXhJdTJ2TThUQ2trdXhJbXFnR0IyRm9YNGJwdmg5bXVXUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQjJkZ1p0aHA4bGtldDhINWE4Z1k4NWxlK0FjT0JKVzBrKy9RcXYrcE13dz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktnNXlFVzZreVVldGlaNHZycVlrK1NEdG9wK2QvSHpyL2owZE9FeFlnZmNhRmFiREVvbk14NWJwbGR0Tm9mRWRiQlpwM3ZHcFBjcXZzSWRXdTdGRkRRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjMsImFkdlNlY3JldEtleSI6ImNzaUk1Q2RUdlBTUjhxbE0wR3ZkSVlxTG56UXN0SncwaGVvc2ltN1NPTms9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjoxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJBMUhsTnRnSlN0U2JDSERoMFM5U2NBIiwicGhvbmVJZCI6IjFiY2EwZGRmLTM3OTktNGZhNy05NzdiLTk5OTk2Y2M3OTlkMSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJwRjJ2UnFGbWlxbDlwWmd0VXFpQThTNXhGYjA9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZEVKaWV2TlNJYVhINTVvK1VFME1xLzY4cVdjPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlpLQlpXTUQ2IiwibWUiOnsiaWQiOiIyMzQ4MTIwNTQ5Njk3OjgzQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKRy9oZDRCRUxLL25MUUdHQXdnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJzYXNsaEpDM1FlSlV0cTFadGJhVFZvZW1LTmdBTmQ1QWE4VlVrSER2ZDFnPSIsImFjY291bnRTaWduYXR1cmUiOiJ2TnFnbERJRFlJT1JWZlUrajZLelpINHRwRkVZTW9aS0FyRWNCRFlzNVQ3aHFPdWwxYm8wNk00blUxZlhibzJtWmx6Tlc1S3QwZXU5RWIxUXNQQWhDUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiUkxmRnVBSGhNdFAxcmxIN0RwWUsrMm1FWGtNOVVvNksrTVJRZnI4L2VpNDFQRXlLREkxTTFvVEtuU2VQVVdmcjUyUWYwekJraXFiUUtKWEI1S2k0QUE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MTIwNTQ5Njk3OjgzQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmJHckpZU1F0MEhpVkxhdFdiVzJrMWFIcGlqWUFEWGVRR3ZGVkpCdzczZFkifX1dLCJwbGF0Zm9ybSI6ImlwaG9uZSJ9',
    PREFIXE: process.env.PREFIX || "!",
    OWNER_NAME: process.env.OWNER_NAME || "Believe",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "Believe",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'Believe',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '1',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    HEROKU : process.env.HEROKU || 'yes',  
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
