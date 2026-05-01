## Model, Entity
- a model is an information that forms the structure of an application.
- it gives context to an application or feature
- the way data is organized 


## business data
- duration to complete task
- time spent on the app

## what your app can do
-  trends

### define our Task model
- Task (Object)
    - id: int
    - title: String
    - status: String| Number (Enum)
    - description: String
    - owner: User
    - startTime: LocalTime | LocalDate
    - endTime: LocalTime | LocalDate
- User (Object)
    - id: int
    - firstName
    - lastName
    - dob
    - role
    - email

- A task has a relationship with owner
    - a task can be owned by 1 or more owners (user)
    - an owner can have one or more tasks

## Class
- It is bascially a blueprint of something

### Object
- An object is an instance of a class
- We shall look at Object Oriented Programming
