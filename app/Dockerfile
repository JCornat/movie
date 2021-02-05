ARG image

FROM $image

# Refresh list of available packages from the repositories and install global packages
RUN npm install -g typescript

# Server part
WORKDIR /src

# Add dependencies files
ADD package.json .
ADD package-lock.json .

# Install dependencies
RUN npm install

ADD tsconfig.json .

# Compile files and launch server
CMD tsc && \
    node app.js
