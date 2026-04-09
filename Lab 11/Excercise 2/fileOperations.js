// Import file system module
const fs = require('fs');

// Step 1: Create a new file
fs.writeFile('sample.txt', 'Hello, this is the first line.\n', (err) => {
    if (err) {
        console.log("Error creating file:", err);
        return;
    }
    console.log("File created successfully.");

    // Step 2: Read the file
    fs.readFile('sample.txt', 'utf8', (err, data) => {
        if (err) {
            console.log("Error reading file:", err);
            return;
        }
        console.log("File content:");
        console.log(data);

        // Step 3: Append data
        fs.appendFile('sample.txt', 'This line is appended.\n', (err) => {
            if (err) {
                console.log("Error appending file:", err);
                return;
            }
            console.log("Data appended successfully.");

            // Step 4: Delete the file
            fs.unlink('sample.txt', (err) => {
                if (err) {
                    console.log("Error deleting file:", err);
                    return;
                }
                console.log("File deleted successfully.");
            });

        });

    });

});