# react-express-fullstack-travel-appication

<h2 style="color:red">
Installation & Note:
</h2>

- Use node version(LTS) should be `v16.16.0`
- Don't change/override package.json
- Please make sure you do not push package-lock.json
- Make sure that the server is up and running at port `8080`
- Use `http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}` as the json-server URL where ever you use `http://localhost:8080`

```
// install node_modules
npm install --engine-strict
// run locally
npm run start

// run server locally
npm run server (only do after making the backend)

```

<h1 style="color:#215dc8">
1. Backend Instructions 
</h1>

<h2 style="color:#215dc8">
Maximum Marks: 10
</h2>

```
✅ Able to make submission: - 1 Mark
✅ Should able to set up the server: - 1 Mark
✅ Should able to get all data from server- `/tours` endpoint: - 2 Marks
✅ Should able to make post request and add new tour: - 2 Marks
✅ Should be able to prevent duplicate email users from making a post request and add new tour": - 2 Marks
✅ Should be able to prevent duplicate email users from making a post request and add new tour (lowercase and uppercase letter treat as same): - 2 Marks
```

<h3 style="color:#215dc8">
I. Backend Folder Structure (Important Files)
</h3>

```
├── controllers
|  └── travel.controllers.js //(route controller for express)
├── db.json                //(use as database)
├── server.js              //(express server setup)
├── src                    //(frontend file)
└── __tests__
   └── app.test.js        //(test file for backend)
```

### Network request data format

#### GET

- request url `/`-(default route);
- get this as a response `<h2 style="color:green;font-size:26px;margin:20px auto;">Welcome to travel backend API</h2>`;

- request url `/tours`;
- get an array of all tours;

#### POST

- request url `/tours`;

- get the newly created tour as a response.
- post data format should be a JSON object(without "id").

  ```
      {
        "id": Number,
        "name": String,
        "email": String,
        "tourLocation": String,
        "noOfTraveller": Number,
        "budgetPerHead": Number
      }
  ```

  - `id` should be created automatically by the backend and it should be a unique number among all the data;
    - hint:- can use current data length+1.

- response data format should be same as mentioned .(with "id")
- user cannot use the same email twice (eg:- no duplicate email). if the user tries to do so should get an error `{message: "Email Already exist."}` with status code `403  (Forbidden response)`.
- email lowercase and uppercase letter treat as same. (eg: pablopandit@gmail.com and Pablopandit@gmail.com should consider same.)

<h1 style="color:#215dc8">
2. Frontend Instructions 
</h1>

<h2 style="color:#215dc8">
Maximum Marks: 15
</h2>

```
✅ Able to submit: - 1 Mark
✅ Shows the correct initial structure: - 1 Mark
✅ Toggle should work as expected: - 2 Marks
✅ Form should have title in h1 tag: - 1 Mark
✅ Form should work as expected: - 3 Marks
✅ Same email id user should throw the error message: - 1 Mark
✅ Should display a successful message after submitting the form correctly: - 1 Mark
✅ Dashboard must fetch correct data: - 3 Marks
✅ Form data must update the DOM: - 2 Marks
```

<h3 style="color:#215dc8">
I. Frontend Folder Structure (Important Files)
</h3>

```
src
├── App.css
├── App.js
├── components
|       └── Row. jsx
├── index.css
├── index.js
└── pages
        ├── Dashboard. jsx
        └── Form. jsx
```
### Component Structure

```
App.js
├── Form.jsx
└── Dashboard.jsx
      └── Row.jsx 

```

### Pages

<h4 style="color:#215dc8">
1. App.js
</h4>

- Form. jsx and Dashboard. jsx components should render in this component.

<h5 style="color:#215dc8">
  Toggle button
</h5>

   - There is a button with `id=toggle` which toggles between the `Form. jsx` and `Dashboard. jsx` component.

   - on load Form. jsx component should render and the toggle button has text as `To Dashboard`.

   - on Clicking the toggle button Dashboard. jsx component should render and the toggle button text changed to `To Book Travel`.

<h4 style="color:#215dc8">
2. Form. jsx
</h4>

- **Title** : there must a title at top in `h1` tag with text as `Travel Booking Form`

- Form has `five input` fields as 

    | input for        | id            | type   |
    | ---------------- | ------------- | ------ |
    | Name             | name          | text   |
    | Email            | email         | email  |
    | Tour Location    | tourLocation  | string |
    | No of reavellers | noOfTraveller | number |
    | budget per head  | budgetPerHead | number |
    | to submit  | submit | submit |

- For submitting a form use `onSubmit` only.
- after submitting a form make `POST` to `/tours` and refer to an object 

   ```
      {
         "name": "",
         "email": "",
         "tourLocation": "",
         "noOfTraveller": ,
         "budgetPerHead": 
      }
   ```

<figure>
<img src="https://i.imgur.com/r6Xb1X6.png"  style="border: 1px solid gray; border-radius: 5px;" width="100%"/>
<figcaption align = "center"><b>Form</b></figcaption>
</figure>

<h5 style="color:#215dc8">
 Successfully submitted 
</h5>

- after making a `POST` request if the email id of the user didn't exist in the backend data.
- Then show a message as `Successfully Submitted !!!` in a div with `id=success` Refer to below image for more understanding 

<figure>
<img src="https://i.imgur.com/iaxn8p4.png"  style="border: 1px solid gray; border-radius: 5px;" width="100%"/>
<figcaption align = "center"><b>Successfully Submitted</b></figcaption>
</figure>

<h5 style="color:#215dc8" >
Error in submission
</h5>

- After making a `POST` request If the email id of the user already exists in backend data then we get a response message as `Email Already exists.`
- show this message in a div with `id=error` at the Top refer below image for more understanding
<figure>
<img src="https://i.imgur.com/bUDtjvO.png"  style="border: 1px solid gray; border-radius: 5px;" width="100%"/>
<figcaption align = "center"><b>Error Message</b></figcaption>
</figure>

<h4 style="color:#215dc8">
3. Dashboard. jsx
</h4>

- on load make a `GET` request to `/tours`.
- show the fetched data in a table where thead is already created map the data in tbody using `Row. jsx` component.

- pass the following props in Row. jsx component
 1. id
 2. name
 3. email
 4. tour Location
 5. no of Traveller
 6. budget per head 

<figure>
<img src="https://i.imgur.com/CcjEBi9.png"  style="border: 1px solid gray; border-radius: 5px;" width="100%"/>
<figcaption align = "center"><b>Dashboord</b></figcaption>
</figure>

### Components

<h4 style="color:#215dc8">
1. Row. jsx
</h4>

- catch all the props 
- create `tr` and `td` to show the data

<h2 style="color:#215dc8">
General Instructions:
</h2>

- Do not remove `data-cy=’xxx` or `data-testid=xxx` from anywhere inside the code. They are the test inputs, removing them, may lead to low scores.
- Do not change the current folder structure, and names of components provided.
- Only use the data present in the db.json file, and do not modify the data in the json file.
- You need to submit Github Link as well as Netlify/Vercel Link on the Course Platform
- Ensure that the GitHub link is correct. Share the link from where the package.json exists

<h2 style="color:#215dc8">
General guidelines:
</h2>

- The system on cp.masaischool.com may take between 1-20 minutes for responding
- So we request you to read the problem carefully and debug it before itself.
