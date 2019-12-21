#Simple translation service

## Setup
For project root directory run docker command:
``` 
docker-compose up -d
```

## Health check

Make sure you can access to this URL :
``` 
http://localhost:3000/health
```
then got response like

```json
{
    "health": "OK"
}
```

## Usage

### Config translator:

### Get all config:

GET `http://localhost:3000/setup/translators`

HEADER: `token:747123be-1102-4fd8-8aac-cae6404c48a3`
```json
[
    {
        "id": "5dfe602bd4d0e05215faa00b",
        "name": "google",
        "app_id": "Google Trans",
        "app_secret": "Google translate API key",
        "default": true
    }
]
```

### Create new config

POST `http://localhost:3000/setup/translators`  

HEADER: `token:747123be-1102-4fd8-8aac-cae6404c48a3`

Payload
```json
{
	"name" : "google",
	"app_id" : "abc",
	"app_secret": "Google translate API key",
	"default": true
}
```

Also you can use `PUT` for update and `DELETE` for removing config

### Translate
POST `http://localhost:3000/translate`

HEADER: `token:747123be-1102-4fd8-8aac-cae6404c48a3`

Payload:
```json
{
	"text": "I love you",
	"translator": "google",
	"options" : {
		"source" : "en",
		"target": "vi"
	}
}
```

Response: 
```json
{
    "text": "Tôi mến bạn"
}
```

Note: translated texts will be store in DB and used next time for same translation text
Note2: It only works for Google translate API atm.
