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
In the **homepage**, visitor can choose to be either tutor or student, then the page turns to be a list of students for tutor visitor, or a list of tutors for student visitor. 
<img src="https://github.com/JWang169/cs546-group1/blob/master/img/homepage.png" width="900" height="150">

### Search Student Page
If user chooses to be a tutor, the browser goes to **search student Page**, where all students will be listed. Tutor can search students by key words in the search bar.<br>
Visitors(without logging in) can only see the student cards with a breif introduction about the students. <br>
Users(logged in) can visit students' personal pages by clicking the "detail" button on student card.
<img src="https://github.com/JWang169/cs546-group1/blob/master/img/searchStudent.png" width="900" height="500">



### Personal page
(registered) Users can edit their info on **Personal page**.
<img src="https://github.com/JWang169/cs546-group1/blob/master/img/personalPage.png" width="900" height="350">
<hr/>
