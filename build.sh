#!/bin/bash

# Install dependencies
npm install

# Build the frontend
npm run build

# Move to backend directory and install dependencies
cd backend
npm install 