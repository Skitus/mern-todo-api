# mern-todo-api

- Api created by simple CRUD operation.
- Each PUT POST operation has a validation.
- Separeted logic from routes. I perform all interactions with DB inside my services/<filename>.service.ts file and import it to controllers/<filename>.controller.ts. After that I can call my controllers in routes
- Also I use middlewares to check and validate data from client.
- Using JWT for authentication.
- All pagination should be handled by backend.

# project structure

- servet.ts (main file)
- models: 
  - here placed Schema for mongoDB.
- controllers: 
  - here placed logic for routes.
- services: 
  - here placed logic for controll MongoDB Schema.
- routes: 
  - here placed path to endpoints.
- middlewares:
  - here placed logic for check and validate data from client.
- types: 
  - here placed interfaces to Schema and respone from client.
- validation:
  - here placed validation schema using Joi library.
