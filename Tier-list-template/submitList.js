// Define the function to update the document
function updateDocument() {
  // Connection URI for the MongoDB database. Placeholder - CHANGE THIS LATER
  const uri = 'mongodb://localhost:27017';

  // Database name. Placeholder - CHANGE THIS LATER
  const dbName = 'Project';

  // Connect to the MongoDB server
  MongoClient.connect(uri, function (err, client) {
    if (err) {
      console.log(err);
      return;
    }

    // Get the database instance.
    const db = client.db(dbName);

    // Get the collection. Placeholder - CHANGE THIS LATER
    const collection = db.collection('Person');

    // Find the document with the id of the user. I just used 1 as a placeholder. CHANGE THIS LATER
    collection.findOne({ id: 1 }, function (err, document) {
      if (err) {
        console.log(err);
        return;
      }

      if (!document) {
        console.log('Document not found');
        client.close();
        return;
      }

      // If the "done this tier list" column is false, update the document and set it to true. id: 1 is a placeholder for the user's id - CHANGE THIS LATER
      if (document['done this tier list'] === false) {
        collection.updateOne({ id: 1 }, { $set: { "done this tier list": true } }, function (err, result) {
          if (err) {
            console.log(err);
            return;
          }

          console.log('Document updated successfully');

          // Call updateFruitScore after the document is updated
          updateFruitScore(collection);
        });
      } else {
        console.log('Person has already done the tier list');
      }

      // Close the connection
      client.close();
    });
  });
}

// This function is supposed to add points to the fruit. It doesn't return anything.
async function updateFruitScore(collection) {
  // Get all the row elements
  const rowElements = document.querySelectorAll('.row');

  // Iterate through each row element. This line turns the string id of the row into and integer variable.
  for (let rowElement of rowElements) {
    const rowIndex = parseInt(rowElement.id);

    // Find the fruit element in the current row. We use the class "card" for fruit
    const fruitElement = rowElement.querySelector('.card');

    // If a fruit element is found in the row, update its score in the MongoDB collection.
    if (fruitElement) {
      // This takes the name of the fruit and saves it as a variable.
      const fruitName = fruitElement.id;

      // Increment the score for the fruit based on the row's number. "fruit name" is the name of the column and it's a placeholder - CHANGE THIS LATER
      await collection.updateOne(
        { "fruit name": fruitName },
        {
          $inc: {
            score: rowIndex,
            pScore: 5
          }
        }
      );
    }
  }
}

// Add event listener to the button
$(document).ready(function () {
  $('#submit-button').on('click', function () {
    updateDocument();
  });
});