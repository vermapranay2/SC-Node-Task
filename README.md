# SC-Node-Task


## Running via Docker image

```console
docker build -t sc-node-task .
sudo docker run -p 3000:5000 sc-node-task
```
Node server started at port 3000

## API endpoints
### Public Endpoints
#### Login
```
localhost:3000/task/login
```
Body 
```javascript
{
"id": 1,
"username" : "Pranay",
"password" : "pranay@1234"
}
```
### Protected Endpoints
#### Apply Json Patch
```
localhost:3000/task/patch
```
Header 
```javascript
Content-Type:application/json
authorization:bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6IlByYW5heSIsInBhc3N3b3JkIjoicHJhbmF5QDEyMzQifSwiaWF0IjoxNTQ5NDMxODAyfQ.jR_avtIN9Rbxv8yoYA_nyNgzD8HrZGqqtqyH-hFCk4w
```
Body 
```javascript
{
"json" : {
  "baz": "qux",
  "foo": "bar"
},
"patch" : [
  { "op": "replace", "path": "/baz", "value": "boo" },
  { "op": "add", "path": "/hello", "value": ["world"] },
  { "op": "remove", "path": "/foo" }
]


}

```
#### Create Thumbnail
```
localhost:3000/task/thumbnail
```
Header 
```javascript
Content-Type:application/json
authorization:bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6IlByYW5heSIsInBhc3N3b3JkIjoicHJhbmF5QDEyMzQifSwiaWF0IjoxNTQ5NDMxODAyfQ.jR_avtIN9Rbxv8yoYA_nyNgzD8HrZGqqtqyH-hFCk4w
```
Body 
```javascript
{
"URL": "https://www.google.com/images/srpr/logo3w.png"
	
}

```
## To run testcases
```console
npm test
```



