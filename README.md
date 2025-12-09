# budgetBuddy
A web app for budgeting. 

Budget Buddy is a budgeting web service that allows users to login and create a budget that they wish to follow. 

MVP Demo video: https://uncg-my.sharepoint.com/:v:/g/personal/kzbennett_uncg_edu/IQBkdYZElVjLQJyPliBJt0YgAd8jJ4aLlX-_uU2aFxICvPk?e=t2cIp3&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D

Deployed app URL - https://budgetbuddy-1v6k.onrender.com/

## Setup on Render + Google Auth 2.0 + Neon Postgres SQL
+ Get google OAuth2.0 API
    - Use this link https://console.cloud.google.com/
    - Navigate to the OAuth API
        * You will need to add your site url to the javascript origins and the redirect url should be {your site url}/api/auth/google/callback
    - Get the client_id and client_secret
+ Get your database url from neon.tech
    - Your project should have 2 tables
       * users with serial id, varchar(255) googleid, varchar(255) displayname, varchar(255) firstname, varchar(255) lastname, and timestamp created_at columns.
       * budgetitems with serial id, varchar(255) owner, varchar(20) type, numeric(8, 2) cost, text description columns.
+ Deploy the app into render by connecting it to the git repo.
  - The buld command is
    ```bash
    npm install && npm run build:frontend:force
  - The Start command is
    ``` bash
    node server.js
  - Add environment variables
     * clientID which contains the value of your google OAuth 2.0 client_id
     * clientSecret which contains the value of your google OAuth 2.0 client_secret
     * DATABASE_URL which contains the URL to your database.

## Development Reflection
### React Frontend
  React is the frontend framework used for this service. I choose this because I enjoy the component structure of react and the react_router makes navigation through the site easy to manage. 
### Node+Express backend
  The backend server is node with express. Making use of routes to handle api calls, passport to handle authentication, and using the node package pg to create a pool for database access. It uses models to handle database queries, routes to direct the api calls, and controllers to parse those calls and pass the relevent information on to the model.
### Database 
  The database consist of 2 tables. The users table which contains user information such as name/googleid/email. The budgetitems table which contains information on budget items such as name/type/cost/description/owner. When auth occurs the users googleid is used as the owner value for the budget items this ensures that users only see entries that they own and are considered part of their budget.

### Challenges
  Getting an understanding of the auth process was challenging. It felt like there was a lot to keep track of initially, from ensuring that the api client was setup correctly, to handling the data as it was returned. I was able to use some resources from class and online resources to understand how the passport works. When moving the project to Render it took me quite a while to get auth functioning properly it turned out I had been using another client for most of development so when I added the redirect uri and js origins url it wasn't connected to the client I had added them to. 

### Learning
  I learned a lot doing this project. While we did a little bit of everything throughout class it felt like putting it all together and getting it into a deployed environment was a real opportunity to learn. Creating the backend api felt like where I learned the most, while react did take some learning with States it felt very similar to html/js with some extra functionality that cut back on the amount code needed to be written. The backend was very interesting in the sense that it is putting a lot of moving parts together to make it work as one. Handling errors and dealing with database queries was fun and interesting to learn.

### Future Work 
  I really wanted to add some more visual representations of the budget. I also feel like some more styling could be done to make the pages more presentable and clean. A larger feature that I really wanted to add was more of an ability to create the budget and then monitor how you are keeping to the budget. Something like being able to create/edit the budget itself, and add monthly expenses in on a month to month basis in order to monitor how the user is able to keep to the budget.
