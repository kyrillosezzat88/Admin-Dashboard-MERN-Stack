# Admin Dashbaord MERN Stack 
##### Admin Dashbaord is a App to Manange  E-commerce Website it`s built in React,Typescript and Node (MERN Stack) 


[![React](https://cdn.iconscout.com/icon/free/png-256/react-2752089-2284906.png)](https://ibb.co/3fW2RyQ)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

## Screenshots
![Alt text](https://i.ibb.co/bF5jRhy/dashbaord.png "Dashbaord Page")
![Alt text](https://i.ibb.co/7bYrHgQ/products.png "Products Page")
![Alt text](https://i.ibb.co/42Kkk5X/orders.png "Orders Page")

## Features
- Authantication login
- Calcualate Today orders , Month orders , Total Orders , Pendign-processing-delivered orders and draw charts (Dashboard Page)
- Grap all Products from DB with Pagination , create-edit-delete-view product and Filter products By Name , Category and price (Products Page)
- Grap all Categories from DB with Pagination , create-edit-delete-view Categories and Filter Categories By Name , Category (Categories page)
- Grap all Users from DB with Pagination , create-edit-delete-view user and Filter Users By Email (Users page)
- Grap all Orders from DB  with Pagination , create-edit-delete-view Order and Filter Orders By Order ID and Status and Print and Download Orders  (Orders page)
- and More more .....

## Apis
- Authantication login and sign up
- Total Orders , Month orders , Today orders Api (Dashboard Api)
- Create/Update/Delete/read/Filter By Name ,category and Price (Products Page Apis)
- Create/Update/Delete/read/Filter By Name , Category  (Category Page Apis)
- Create/Update/Delete/read/Filter By Email  (Users Page Apis)
- Create/Update/Delete/read/Filter By Order Id and Status  (Orders Page Apis)

## Middlewares 
- Admin and user Rules
- Pagination
- Upload (for upload images using multer)
- Validations 


## Frontend Tech
- [ReactJS and React Hooks](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Axios](https://axios-http.com/docs/intro)
- [Sass](https://sass-lang.com/)
- [Tailwind](https://tailwindcss.com/)
- [Formik](https://formik.org/)
- [Yup](https://www.npmjs.com/package/yup)
- [react-chart](https://react-chartjs-2.js.org/)
- [React-toastify](https://www.npmjs.com/package/react-toastify)

## Backend Teck
- [Nodejs](https://nodejs.org/en/)
- [Express-js](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken](https://jwt.io/)
- [Cloudinary](https://cloudinary.com/)
- [DotEnv](https://www.npmjs.com/package/dotenv)
- [express-validator](https://express-validator.github.io/docs/)
- [html-pdf]
- [Multer](https://www.npmjs.com/package/multer)
- [Morgan](https://www.npmjs.com/package/morgan)
- [twig](https://www.npmjs.com/package/twig)
- [csv-writer](https://www.npmjs.com/package/csv-writer)

## Folder Structure Frontend
```bash
└── Admin-Dashboard/
    ├── build/
    ├── node_modules/
    ├── public/
    └── src/
        ├── Apis/
        │   └── AuthApi.js
        │   └── CategoryApis.js
        │   └── OrderApis.js
        │   └── ProductApis.js
        │   └── UserApis.js
        ├── Assets/
        │   ├── Fonts/
        │   └── img/
        ├── Components/
        │   ├── AddCategory/
        │   ├── AddProduct/
        │   ├── Cards/
        │   ├── Charts/
        │   ├── Form/
        │   ├── Model/
        │   ├── Navbar/
        │   ├── Notification/
        │   ├── Paginations/
        │   ├── Sidebar/
        │   ├── Spinner/
        │   ├── Tables/
        │   │   ├── Product/
        │   │   ├── Category/
        │   │   ├── Coupons/
        │   │   ├── Invoice/
        │   │   ├── Orders/
        │   │   ├── RecentOrders/
        │   │   ├── Users/
        │   │   └── Table.style.scss
        │   └── ToolTip
        ├── context/
        │   ├── InitialStates/
        │   │   ├── AuthInitialState.tsx
        │   │   ├── CategoryInitialState.tsx
        │   │   ├── OrderInitialState.tsx
        │   │   ├── ProductInitialState.tsx
        │   │   └── UserInitialState.tsx
        │   ├── Actions/
        │   │   ├── AuthActions/
        │   │   ├── CategoryActions/
        │   │   ├── OrderActions/
        │   │   ├── ProductActions/
        │   │   ├── UserActions/
        │   │   └── Actions.types.tsx
        │   ├── Reducers/
        │   │   ├── AuthReducer.tsx
        │   │   ├── CategoryReducer.tsx
        │   │   ├── OrderReducer.tsx
        │   │   ├── ProductReducer.tsx
        │   │   └── UserReducer.tsx
        │   └── AppContext.tsx
        ├── pages/
        │   ├── Login/
        │   ├── Dashbaord/
        │   ├── products/
        │   ├── productDetails/
        │   ├── Categories/
        │   ├── Users/
        │   ├── Orders/
        │   ├── Invoice/
        │   └── 404/
        └── routes/
            ├── PrivateRoute.tsx
            └── PublicRoute.tsx
        └── utils/
            ├── HandleAxiosError.tsx
            └── utils.tsx
```
## Installation

Admin-Dashboard requires [Node.js](https://nodejs.org/) to run.

Install the dependencies and devDependencies and start the server.

```sh
cd app-folder
npm install
npm start
```

For Generate Build folder:

```sh
npm run build 
```

## License

MIT
