// Define the function to update the document
function updateDocument() {

    // A function that gets the parent of the element with this id
    function getParentElementById(id) {
        const element = document.getElementById(id);
        if (element) {
          return element.parentNode;
        } else {
          return null;
        }
      }

    // Connection URI for the MongoDB database. Placeholder - CHANGE THIS LATER
    const uri = 'mongodb://localhost:27017';
  
    // Database name. Placeholder - CHANGE THIS LATER
    const dbName = 'Project';
  
    // Connect to the MongoDB server
    MongoClient.connect(uri, function(err, client) {
      if (err) {
        console.log(err);
        return;
      }
  
      // Get the database instance. 
      const db = client.db(dbName);
  
      // Get the collection. Placeholder - CHANGE THIS LATER
      const collection = db.collection('Person');
  
      // Find the document with the id of the user. I just used 1 as a placeholder. CHANGE THIS LATER
      collection.findOne({ id: 1 }, function(err, document) {
        if (err) {
          console.log(err);
          return;
        }
  
        if (!document) {
          console.log('Document not found');
          client.close();
          return;
        }
  
        // If the "done this tier list" column is false, update the document and set it to true. Placeholder - CHANGE THIS LATER
        if (document['done this tier list'] === false) {
          collection.updateOne({ id: 1 }, { $set: { "done this tier list": true } }, function(err, result) {
            if (err) {
              console.log(err);
              return;
            }
  
            console.log('Document updated successfully');
          });
        } else {
          console.log('Person has already done the tier list');
        }
  
        // Close the connection
        client.close();
      });
    });
  }
  
  // Add event listener to the button
  $(document).ready(function() {
    $('#submit-button').on('click', function() {
      updateDocument();
    });
  });