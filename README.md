## Study Geeks
### Final Project for CS 546 Web Programming I Section A.
#### Group1

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

### Homepage
In the **homepage**, visitor can choose to be either tutor or student, then the page turns to be a list of students for tutor visitor, or a list of tutors for student visitor. <br>
<img src="https://github.com/JWang169/cs546-group1/blob/master/img/homepage.png">


### Search Tutor Page
If user chooses to be a student, the browser goes to **search tutor Page**, where all tutors will be listed. Students can search tutors by key words in the search bar.<br>
Visitors(without logging in) can only see the tutor cards with a brief introduction about the tutors. <br>
Users(logged in) can visit tutors' personal pages by clicking the "detail" button on tutor card.
<img src="https://github.com/JWang169/cs546-group1/blob/master/img/tutorList.png" >

### Search Student Page
If user chooses to be a tutor, the browser goes to **search student Page**, where all students will be listed. Tutors can search students by key words in the search bar.<br>
Visitors(without logging in) can only see the student cards with a brief introduction about the students. <br>
Users(logged in) can visit students' personal pages by clicking the "detail" button on student card.
<img src="https://github.com/JWang169/cs546-group1/blob/master/img/studentList.png" >

### Sign Up Page
Users can only sign up by a valid email. They must provide a password, and the **password** must match the **"confirm password"** <br>
If the email has already been registered, they will be asked to log in with that email.
<img src="https://github.com/JWang169/cs546-group1/blob/master/img/signup.png" >

### Log In Page
Users must provide the **email** and **password** to log in.
<img src="https://github.com/JWang169/cs546-group1/blob/master/img/login.png" >

### Personal page
(registered) Users can edit their info on **Personal page**.
<img src="https://github.com/JWang169/cs546-group1/blob/master/img/personalPage.png">
<hr/>
