# Exec

Change pass in dockerfile, b.sh before use 
One Time Build Instruction :
```bash
cd backend
sudo docker build -t exec2:latest .
 ```

To Run Backend after build has completed

```bash
cd backend
sudo docker container run -u -0 -it -p 8080:8080 exec2:latest  /bin/sh  /Exec/b.sh
 ```


To Run Frontend

```bash
cd frontend/client
npm install
npm start
 ```

