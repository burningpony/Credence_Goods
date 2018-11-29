FROM ruby:2.5

#yarn
RUN apt-get update -qq && apt-get install apt-transport-https \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && curl -sL https://deb.nodesource.com/setup_10.x | bash - \
    && apt-get install -y build-essential nodejs yarn libpq-dev --no-install-recommends \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*


RUN mkdir /app
WORKDIR /app

# Install ruby gems into the container
COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
RUN bundle install

# Install yarn dependencies into the container
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

RUN yarn install

COPY . /app

CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]
