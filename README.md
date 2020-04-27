# Study Geeks
#### Final Project for CS 546 Web Programming I Section A - Group1

![](https://github.com/JWang169/LintCodeJava/blob/master/static/Gifs/Snape.gif)

<br>
<br>

| __Group Members__ | Junzhe Wang, Loughlin Claus, Chran Suresh, David Ovsiew | Created |
|:-----------------:|:----------------------------------|:------------:|
| Project Proposal | [proposal](./files/Proposal.pdf)  | 02-28-2020 |
| Database Proposal| [database](./files/databaseProposal.pdf)| 03-13-2020 |
| Front End React  | Implemented in [studygeekreact](./studygeekreact) | 04-16-2020 |
| Server           | Implemented in [studygeekserver](./studygeekserver) | 04-16-2020 |


Pull [studygeekreact](./studygeekreact) to run Study Geek as React app <br>
Pull [studygeekserver](./studygeekserver) to run server
## Install
```shell
npm install 
```
## Run App

```shell
npm start
```
## Generate test dataset 
To generate 'hogwarts' database in mongodb, run:
```shell
cd studygeekserver
npm run seed
```

## Homepage
In the **homepage**, visitor can choose to be either tutor or student, then the page turns to be a list of students for tutor visitor, or a list of tutors for student visitor. <br>
<img src="https://github.com/JWang169/cs546-group1/blob/master/img/homepage.png">
<br/>

## Search Tutor Page
If user chooses to be a student, the browser goes to **search tutor Page**, where all tutors will be listed. Students can search tutors by key words in the search bar.<br>
Visitors(without logging in) can only see the tutor cards with a brief introduction about the tutors. <br>
Users(logged in) can visit tutors' personal pages by clicking the "detail" button on tutor card.
<img src="https://github.com/JWang169/cs546-group1/blob/master/img/tutorList.png" >
<br/>

## Search Student Page
If user chooses to be a tutor, the browser goes to **search student Page**, where all students will be listed. Tutors can search students by key words in the search bar.<br>
Visitors(without logging in) can only see the student cards with a brief introduction about the students. <br>
Users(logged in) can visit students' personal pages by clicking the "detail" button on student card.
<img src="https://github.com/JWang169/cs546-group1/blob/master/img/studentList.png" >
<br/>

## Sign Up Page
Users can only sign up by a valid email. <br>
If any of the fields is empty, there will be an error prompt.<br/>
<img src="https://github.com/JWang169/cs546-group1/blob/master/img/emptyInput.png" >
<br/>

The **password** must match the **"confirm password"**.<br/>
<img src="https://github.com/JWang169/cs546-group1/blob/master/img/passwordNoMatch.png" >
If the user signed up successfully, it will redirect to the log in page.<br/>
<br/>

## Log In Page
Users must provide the **email** and **password** to log in.<br/>
<img src="https://github.com/JWang169/cs546-group1/blob/master/img/login.png" >
<br/>

## Log Out Page
After the user logs out, the token will be removed from the localStorage.<br/>
<img src="https://github.com/JWang169/cs546-group1/blob/master/img/logout.png" >
<br/>

## My Account
Users' information will be posted on their **account page**. The **information** will be retrieved from the **students collection** or the **tutor collection** by their **statusId** which is saved in the token in localStorage.<br/>
<img src="https://github.com/JWang169/cs546-group1/blob/master/img/myAccount.png">
<br/>

Users can also edit their info on **account page**.<br/>
<img src="https://github.com/JWang169/cs546-group1/blob/master/img/editAccount.png">
<br/>

## Database
## User Collections samples
<img src="https://github.com/JWang169/cs546-group1/blob/master/img/userDB.png">






