import  fs from "fs";

export const saveToDatabase = (DB) => {
  const text = `const DB = ${DB}; export default DB`
  fs.writeFileSync("./src/database/db.js", text, {
    encoding: "utf-8",
  });
};