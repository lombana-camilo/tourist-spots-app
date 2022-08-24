# Fullstack Project - Tourist Spots App

[Website Deploy](http://tourist-spots-app.vercel.app/) , 
[Video Demo](https://www.youtube.com/watch?v=O2hjUh9FRQ0&list=PL4tavnMx4bcumuzK0ToPrLKxWA30wTD86&index=1&ab_channel=CamiloLombana)

## Main Objective
Create a fullstack web application with authentication that enables the users to create, modify and delete their own tourist spots. Besides, all posts are displayed in a map where users can see details and leave reviews

## Development Tools

* Typescript
* React - router, forms
* Material UI
* Redux Store & RTK Query
* Zod Validation
* Node Js & Express
* MongoDb, Mongoose, Typegoose
* JSON Web Tokens, bcrypt
* Cloudynary, Multer
* MapBox

### `API`

The database was previously seeded with location searched data of touristic atractions retrieved from [Rapid API - Bayut](https://rapidapi.com/apidojo/api/travel-advisor)

## Features
* User authentication with JSON Web Tokens 
* Authorization and pop-up notifications
* Form data validation using Zod
* The user can create, modify and delete new posts of spots 
* The user can see all posts in form of a map
* The user can see the details of any spot, see others reviews, leave their own and delete them

## Frontend - Views
### `Landing Page`
- Page presentation

### `Main Page - All Spots`
- Search bar with authentication options
- Cluster map of all spots
- All spots listed

### `Details Page`
- Shows all information about a specific spot
- See, write or delete reviews

### `Signup and Login Pages`
- Dynamic controlled form to create or login a user

### `Create and Update Spot Page`
- Dynamic controlled forms to create or update a spot

## Backend - Routes
- CRUD operations for Users, Sessions, Spots(images,reviews)
- Cloudynary served as an API for uploading users images


## Completed Progress
## `Backend`
### `App Bootstrap`
- [x] Setup Server
- [x] Setup Database connection
- [x] Create routers
### `Registration`
- [x] Create User model, zodSchema
- [x] Set User CRUD endpoints, controller and services
- [x] Create Session model, zodSchema
- [x] Set Session CRUD endpoints, controller and services
- [x] Validate requests middleware
- [x] Deserialize-user Middleware - Tokens and Cookies
### `Spot Model`
- [x] Create Spot model, zodSchema
- [x] Seed model with Api data
- [x] Set Spot CRUD endpoints, controller and services
- [x] Seed database with API data

## `Frontend`
- [x] Structure with Vite
- [x] Setup Redux Store and Query
- [x] Landing Page
- [x] Authentication forms
- [x] Create, update spots forms
- [x] Protected routes
- [x] Responsive website
