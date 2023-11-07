import { app } from "./index.js";
import { connectDb } from "./DataBase/DB.js";

connectDb();

app.listen(8000, () => {
    console.log(`App listening on port 8000`)
  })