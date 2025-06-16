# Use an official lightweight Python image as a base
FROM python:3.11-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file first to leverage Docker's layer caching
COPY requirements.txt .

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of our application code into the container
COPY . .

# Tell Docker that the container will listen on port 5000
EXPOSE 5000

# The command to run when the container starts. We use gunicorn for production.
# We need to add gunicorn to our requirements.
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]