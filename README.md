# Files Service

This is a simple REST API, just see the `example` folder! Use the [Docker image](https://hub.docker.com/repository/docker/aleygues/files-service) to launch the service, expose the `8080` port.

## Create a file

Send a request to `POST /api/files` with a Form data body containing a `file` key, being the file to upload.

It'll answer you with:

```
{
    "filename": "1647983077983-7762.json",
    "uri": "/api/files/1647983077983-7762.json"
}
```

## Read a file (as binary)

Ask for `GET /api/files/1647983077983-7762.json`!

## Delete a file

Just send an HTTP request `DELETE /api/files/1647983077983-7762.json`