# Exercise Tracker

This is a Exercise Tracker project in which you can create a user and add exercises that will be saved in a database 

```
https://exercisetracker-camilo.herokuapp.com/
```

## Screenshots

![Captura de pantalla 2022-09-01 173539](https://user-images.githubusercontent.com/102927455/188024291-21280923-4eaa-4abb-8c24-5689eecd6323.jpg)

## Technologies used

1. Node
2. Express
3. MongoDB
4. Bulma UI

## Customize configuration

## Project Setup

```sh
npm install
```

### Hot-Reload for Development

```sh
npm run dev
```

### Start project 

```sh
npm run start
```

## Usage

* You can POST to /api/users with form data username to create a new user.
* You can make a GET request to /api/users to get a list of all users.
* You can POST to /api/users/:_id/exercises with form data description, duration, and optionally date. If no date is supplied, the current date will be used.
* You can make a GET request to /api/users/:_id/logs to retrieve a full exercise log of any user.
* You can add from, to and limit parameters to a GET /api/users/:_id/logs request to retrieve part of the log of any user. from and to are dates in yyyy-mm-dd format. limit is an integer of how many logs to send back.
