## PENDING
1. **We need the rating system for tutors.**

2. Chran should update his availability function to match the changes I made in mine (in the for loop that checks for overlapping times).

3. the Delete availability url is NOT http://localhost:3003/${tokenInfo.status}/${tokenInfo.statusId}/availability/delete, but instead http://localhost:3003/${tokenInfo.status}/${tokenInfo.statusId}/availability also, I do not use a POST method for a delete, I am instead using a DELETE method (haven’t tested frontSide myself, but I doubt it will work with the way it looks when I read it)

> I changed the url to the delete request, but it didn't work. I believe the data is passed to the server correctly. when I printed out the req.body from your server side, it is empty. Pls double check.

4.  deleting student should also log them out somehow (if you haven't already implemented that, I haven't tested it on the frontside)
> Not implemented yet. -Joey

5. for the PUT in the editInfo, it looks like you didn’t pass in the email, or the password, I’m gonna assume you did, and I just looked in the wrong place, if you didn’t, then it should be relatively simple to comment out those specific portions of the student route and data files.
> I assume we wont allow user to change email or password. pls comment out - Joey

POST http://localhost:3003/students/tutorPair/ 503 (Service Unavailable)

### Done: 
1. Student dataset: we need a function which enables students to update their personal info
currently I am expecting a put request, something like: http://localhost:3003/students/75b16bac-1b4c-4fd8-bad7-9eebfb1e596e
 
>DONE. its in the pull request ~Loughlin

2. Tutor dataset is still missing
3. Need functions in routes to login and sign up !!!
> I believe that I have already done these for students as a POST method to students/signup AND students/login ~Loughlin

4. we need an error pop up for when add availability fails (errors are sent through a json, and can be caused by: end coming before start, or on different days, or overlapping with a prexisting availability
> Done by Joey

