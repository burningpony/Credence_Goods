# Credence Goods

An application to support the collection of data for economics studies.

### Dependencies

- docker
- docker-compose

### Getting it Running

Start a bash console inside of the dev environment.

1. `$ docker-compose run --rm web bash`

**If this readme says "in the container" it is assumed the following command is
run within the above command.**

Setup DB. (only once)

2. `$ bin/setup`

In another tab. To start the application and it's Dependencies

3. `$ docker-compose up -d db redis`

4. `$ rails s`

### Working within the project

#### Pulling down others work

    $ git pull

#### Running Tests

In the container

    $ bin/rake

## Application description

Project Updates Credence Goods. Initial documentation..

Current Flow Experiment:

(Configurations / set up in admin)
Navigate to root and type in group name associated with experiment.
Instructions
Test Functions
Part 1
Quiz 2
Matching Partners Screen (wait until match)->
Part 2
(Repeat until out of rounds in group)
Expert 
- Makes predictions on groups function sets
Customer
- Watches matched Expert make estimations
Payment Screen

Payment Calculations
Cost of Coordinate = 0.30
Cost of Point = 0.25

Part 1:
Starting Cash (hard coded to 30) - the accuracy of point predictions (diff max value and prediction) - price of requested sample points - price of requested basis lines.
Should we be enforcing that all functions are answered in part 1?
Part 2:
Expert:
FFS:
-The groups configured ffs payment _ (number of bought payment requests + number of bought sample points) + number of function predictions _ group ffs payment _ 3
-Prediction payment for ffs is currently estimated as group ffs payment _ 3 is that okay?
Salary:
-The groups configured Salary amount
Capitation:
-The groups configured capitation payment \* number of unique function_sets the expert made predictions on
Customer:
Starting Cash (hard coded to 30) - the accuracy of point predictions by each expert by round (diff max value and prediction) - price of requested sample points - price of requested basis lines

Total Payment: Part 1 payment + Part 2 payment

Notes:
-Points no longer collide, if a requested point lands within 1/50th of the ranges of the function a new point will be requested in the next range.
-We do have an automated test that ensures that two users can pair and move through the entire experiment.
-We do not plan on generating the functions programmatically, we do plan on providing a function playground view to help construct functions, let us know if this will be enough for you guys.
-Notes on accuracy mechanism below.

Known remaining TODO:

-Emmanuel and I will be running through the experiment, to ensure it is behaving as we expect, giving it more of a stress test to ensure that the experiment will run in larger groups as best as we can. Ensuring indexes and querying can handle larger groups as well.

-Images for quizzes, we will be generating images for the quizzes and setting the correct answers as best as we can.

-Function playground: This is to help us with image generating, but our expectation is that this playground may help with the construction of functions to be used in the experiment as well.

-Re enable Heroku hosting to credence goods app. Will forward www route along once determined.

-Some payment tweaks (subtract expenses for part 1)

Schema

I am attaching the database to schema outline what can be configured on the group as well as what data is currently getting captured. I believe all extraneous fields have been removed, will be verifying this statement.

Routes

All routes are protected by basic http auth. User: user Password: 123456789.

/
Route to experiment interface, Presents input to select which group the participant will be a member of (uses named group from admin interface

/admin*
Experimenter dashboard for viewing recently finished users. Shows payment with by recently finished users.
/admin/comments
Placeholder (not really used)
/admin/function_responses
Table containing all function responses. A function response is how we store a user’s answer to a graph, for both parts 1 and 2. CSV export
/admin/function_set*
This is referred to as a group inside of the experiment documentation. Function set attaches a set of functions to a group. This is where function sets for groups are managed.
/admin/functions*
Functions that will be graphed. Must be attached to a function set. Has a String representation of the function, then function bounds. Bounds specify where the GSS function will find value, also bounds of graph.
/admin/groups*
Admin view for creating groups default payment of the group specifies how experts will be paid in part 2. Can specify payment details, as well as number of rounds.
/admin/quiz_responses
Stores user responses to the quizzes
/admin/user_pairs
User pairs for part 2. (How experimenter is matched with a customer)
/users
User view

Users should really be thought of as participants.. poorly named
\*Starred routes are used by experiment runners. Admin routes contain xml and csv exports.

Action Items
-Let us know if there is anything out of the ordinary in these descriptions.
-Let us know if you have any questions.
-Let us know if there is additional information that needs to be captured. (Do we need to try to capture time that a user browses.)
-Let us know if the payment calculations look correct.
-Should we be enforcing that all functions are answered in part 1?
-We will be looking to finish up our TODOs and cleaning up anything that comes up in item 1 of TODO.
-Prediction payment for ffs is currently estimated as group ffs payment \* 3 is that okay?
-Will the function playground work for function generation for you guys?
-What do we think about changing the point prediction accuracy mechanism to make max loss 1 dollar? Example: Line Max = 300, minY = 100, maxY = 400.

abs(Actual Max - Prediction) / (maxY - minY)

When Prediction = 1000 loss = 1
When Prediction = 300 loss = 0
When Prediction = 400 loss = abs(300 - 400) / (400 - 100) = .333
When Prediction = 355 loss = abs(300 - 355) / (400 - 100) = .1833
When Prediction = 455 loss = abs(300 - 355) / (400 - 100) = .5166
