# Reader

Reader is a web app designed for uploading, managing and reading comics. App is currently running [here](http://95.217.156.219:3535 "Reader").

## Frontend

The frontend is built with React using JavaScript. It uses Redux for state management.

## Backend

The backend is built using NodeJS. The series, chapters and users are stored with MongoDB. Images are stored in a MinIO container.

## Instructions

- To read comic series, open one from the main page and click on a chapter
- Search by clicking on tags or using the search bar
- Create an account to upload your own series by clicking on Create Series
- Delete your series by hovering over it and pressing on the X icon
- Manage series metadata by opening your series and clicking on pen icon
- Create a chapter by pressing on Add Chapter and uploading the pages as multiple files, delete by hovering and clicking X

## Deployment with Docker

```
docker-compose --env-file=<env-file> up
```

## Working hours

| day | time | what was done  |
| :----:|:-----| :-----|
| 5.3.  | 5    | Initial frontend |
| 6.3.  | 6    | Studying MinIO, first backend, backend file management |
| 7.3.  | 5    | Implement first chapter uploader |
| 8.3.  | 2    | Testing |
| 16.3. | 5    | Create error handler middleware and getting images from server, file validation |
| 17.3. | 7    | Get page from server using URL, navigating in chapter, testing |
| 18.3. | 2    | Multiple uploads on frontend side |
| 19.3. | 1    | Multiple uploads on backend side |
| 25.5. | 1    | Refactor frontend |
| 26.5. | 5    | Mongoose schemas, implement Mongo for storing series and chapters, controller changes |
| 27.5. | 2    | Testing |
| 28.5. | 7    | Create mainview for displaying all series, navigate using URL, popup form for series creation and make forms reusable |
| 31.5. | 2    | Implement series creation without chapters |
| 1.6.  | 5    | Reusable header, getting individual series from backend, chapter creation and listing in seriesview |
| 2.6.  | 6    | Styling and refactoring, improve mainview seriesbubbles design, getting all series in mainview and loading animation, search bar |
| 3.6.  | 7    | Viewing latest updates functionality, form styling and changes, chapter uploading improvements, readview navigation between chapters, refactoring |
| 4.6.  | 7    | Adding tags from seriesview functionality, series updating backend, refactoring, testing |
| 5.6.  | 6    | Refactoring, styling, adding description, functional and behavioural changes |
| 6.6.  | 4    | Removing series in frontend, styling, edit controller implementations |
| 7.6.  | 6    | Using frontend proxy to get images, sending image urls instead of base64 images, refactoring, styling |
| 8.6.  | 1    | Small improvements/fixes |
| 9.6.  | 6    | Tried implementing transactions and tests |
| 11.6. | 5    | Got backend tests working |
| 14.6. | 3    | More tests |
| 18.6. | 6    | Fixed continuous loading animation when no series exist, more fluid searching while creating series |
| 19.6. | 2    | Testing |
| 22.6. | 6    | No series notification changes, other changes to frontend, pagination, change readview page navigation implementation |
| 24.6. | 5    | Use query string with search paging and tags |
| 25.6. | 6    | Refactor backend, user router and schemas |
| 26.6. | 3    | Login router, unit tests |
| 27.6. | 6    | Frontend side of user management |
| 28.6. | 4    | Testing and rewriting deleted code |
| 29.6. | 5    | Implement more authorization, frontend changes, separate header from views. hide header |
| 30.6. | 6    | Auth middleware, user logout on expire, error handling, use redux |
| 1.7.  | 5    | Refactoring, more redux |
| 2.7.  | 5    | Search fixes and adjustments, refactoring |
| 3.7.  | 3    | Styling and editing series function |
| 4.7.  | 4    | Changes to use for deployment, deploy app, fix navigation bug |
| 5.7.  | 7    | Make frontend more mobile friendly, admins, refactoring, debugging, testing |
| 6.7.  | 2    | Styling, qol changes, validation change |
| 7.7.  | 5    | Back button in readview, styling, page loading indicator |
| 8.7.  | 7    | Remove chapter number restrictions, hide header from navigation bar, prefetch images, styling, use helmet |
| 9.7.  | 3    | Utilize docker for deployment |
| 10.7. | 3    | Use docker-compose |
| 11.7. | 2    | Clean up |
| total | 201  |  | 