const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://mernapp:o9SJJnLmWNd8wW5l@cluster0.wbwliye.mongodb.net/gofoodmern?retryWrites=true&w=majority";
// "mongodb://mernapp:o9SJJnLmWNd8wW5l@ac-tzrwtlk-shard-00-00.wbwliye.mongodb.net:27017,ac-tzrwtlk-shard-00-01.wbwliye.mongodb.net:27017,ac-tzrwtlk-shard-00-02.wbwliye.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-tcolt0-shard-0&authSource=admin&retryWrites=true&w=majority";

const mongoDB = async () => {
  await mongoose.connect(mongoURI, async (err, res) => {
    if (err) console.log("...", err);
    else {
      console.log("connnnect");
      const fetch_data = await mongoose.connection.db.collection("food_items");
      fetch_data.find({}).toArray(async function (err, data) {
        const foodCategory = await mongoose.connection.db.collection(
          "food_category"
        );
        foodCategory.find({}).toArray(function (err, catData) {
          if (err) console.log(err);
          else {
            global.food_items = data;

            global.foodCategory = catData;
          }
        });
      });
    }
  });
};

module.exports = mongoDB;
