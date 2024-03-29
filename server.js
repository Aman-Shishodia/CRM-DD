import { app } from "./index.js";
import { connectDb } from "./DataBase/DB.js";

const PORT = 6000 || process.env.PORT

connectDb();

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
