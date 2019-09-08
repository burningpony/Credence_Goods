# Credence Goods

An application to support the collection of data for economics studies.

### Dependencies

* docker
* docker-compose

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
    $ docker-compose build web


#### Running Tests

In the container

    $ bin/rake
