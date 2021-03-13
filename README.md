# Contests List

This web app gives information about various coding contests. They are fetched from the API [https://codeforces.com/api/contest.list](https://codeforces.com/api/contest.list)

## Features
1. Main screen shows a list of contests. 
2. Users can filter results by a dropdown filter for contest type (ICPC/CF) and search contests by name.
3. As the user start to type in the search area, the table is dynamically filtered (client side filtering) .
4. Pagination (client side) for the results of the search, the user can also select page size .
5. A graph of durationSeconds Vs the contest name. It allows dynamic filtering on the basis of contest Phase and contest Status.
6. Clicking on the contest name would redirect to a contest details page, with a route like contest/{contest_id} that displays the details of the contest.


## Run

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


## Deployment

This app has been deployed here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)
