# Hotel Search

## Coding Challenge

This repo contains 2 directories (client / server) which work independently (it is not setup as a monorepo)

Please read the README file in each directory for more info

## Dependencies

You will need to have the following installed

Node 20+

NPM 8+

Docker Desktop (to start the DB)

## Mock User Support added

There are 2 users now in the system. You will need to login with one or the other

**USER** | **PASS**

- User1 | 12345
- User2 | 12345

These users can be used to test bookings for each user are not visible to any other user

## Under the hood

### The Server

The server is a standard node/express created with nx. So it's pretty bare bones out of the box. However, the structure of the code, albeit bespoke, is quite simple

/src

- /api - The api folder contains a list of folders as they appear as end points. (so, /src/api/auth would translate into https://myserver:8080/auth)
- /api/example/example.controller.ts - contains the logic for the end point.
- /api/example/example.model.ts - this is the Mongoose model (since mongo and mongoose were used in this project)
- /api/example/example.routes.ts - this contains the actual express routes and point to the controller function. (in x.controller.ts)

Also in the /api folder are two reigster files where you would register what routes you want active (using the same naming convention ofc)

- registerRoutes.ts - just add your endpoint name, which should also be the name of the folder and presto! you're live
- registerSockets.ts - and if you want a socket channel for that endpoint's model, just import it here and add it to the array (sockets ready)

#### /src/classes

The server also contains some very important classes to handle db sessions, socket, redis (if you like) and one other little gem (of it's time I mean - its super dated now but...)

- AbstractController.ts - uif you just create a controller and extend this little puppy you get full crud, paged, filtered, fully queryable endpoints ootb. That means any code in the controller is stuff that doesn't fit the standard getAll() getById() create() update() delete() patterns (for total customization) - This massively reduces repeat code.


# The Client

The client is a react/redux/vite creation that uses a MVVM pattern. By that, if you look at the way the api above is structured, your data layer on the front end works pretty much the same way

/src
- /model - In here you will find models for each of the end points. These act as your data fetchers, getters and putters to keep that logic separate
- /redux - this is where you can declare a redux store. It uses the model to fetch data when components require it and also listens to socket requests depending on model config

And of course there is the abstractModel which allows to wire up a data layer with very little code

Redux has the constants in the /redux/constants folder that contain the most standard state props and reducer functions that work hand in hand with the abtractModel 

....

..

This might seem like a lot to take in when reading, but go ahead and take a look at the /api/example in the server and the /models/example and /redux/example for a demonstration on how easy it is to hook up a data exchange between db and client via the API
