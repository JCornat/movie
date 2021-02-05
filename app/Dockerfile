ARG image

FROM $image

# Refresh list of available packages from the repositories and install global packages
RUN npm install -g typescript

# Server part
WORKDIR /src

# Add dependencies files
ADD app/package.json .
ADD app/package-lock.json .

# Install dependencies
RUN npm install

ADD app/tsconfig.json .

# Compile files and launch server
CMD tsc && \
    node app.js
