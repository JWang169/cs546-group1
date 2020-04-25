SignUp: 

1. insertOne in mongoCollections.students/tutors
2. insertOne in mongoCollections.users, return the id of the user collection
This has to be sequential, because the student._id / tutor._id is saved in the user collections. 
Every time the user logs in, the studentId / tutorId will be retrieved from the user collection.
