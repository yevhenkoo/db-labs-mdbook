# Реалізація інформаційного та програмного забезпечення

## SQL-скрипт для створення на початкового наповнення бази даних

```sql

CREATE TABLE "Description" (
    id SERIAL PRIMARY KEY,
    description TEXT,
    datetime TIMESTAMPTZ DEFAULT NOW(),
    task_id INTEGER NOT null,
    artifact_id INTEGER NOT NULL
);

CREATE TABLE "Artifact" (
    id SERIAL PRIMARY KEY,
    status TEXT,
    datetime TIMESTAMPTZ DEFAULT NOW(),
    task_id INTEGER NOT NULL
);

CREATE TABLE "Task" (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    creationDate TIMESTAMPTZ DEFAULT NOW(),
    deadlineDate TIMESTAMPTZ,
    project_id INTEGER NOT NULL   
);

CREATE TABLE "Project" (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL   
);

CREATE TABLE "Event" (
    id SERIAL PRIMARY KEY,
    datetime TIMESTAMPTZ DEFAULT NOW(),
    resultState TEXT,
    task_id INTEGER NOT NULL
    );

CREATE TABLE "Collaborator" (
    id SERIAL PRIMARY key,
    event_id INTEGER NOT null,
    user_id UUID NOT null,
    role_id INTEGER NOT null
);

CREATE TABLE "User" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
    nickname TEXT UNIQUE NOT NULL,  
    email TEXT UNIQUE NOT NULL,   
    password TEXT NOT NULL,   
    photo TEXT,                    
    team_id INTEGER NOT null      
);

CREATE TABLE "Team" (
    id SERIAL PRIMARY KEY,
    name TEXT NOT null,
    project_id INTEGER NOT null
);

CREATE TABLE "Role" (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    project_id INTEGER NOT null
  
);

CREATE TABLE "Permission" (
    id SERIAL PRIMARY KEY,
    action TEXT UNIQUE NOT NULL
);

CREATE TABLE "Grant"(
    id SERIAL PRIMARY KEY,              
    role_id INTEGER NOT NULL,
    permission_id INTEGER NOT NULL
);




ALTER TABLE "Event" ADD
    CONSTRAINT fk_task_event
        FOREIGN KEY(task_id)
        REFERENCES "Task"(id)
        ON DELETE SET NULL
        ON UPDATE cascade;

ALTER TABLE "Description" ADD
    CONSTRAINT fk_task_description
    FOREIGN KEY (task_id)
    REFERENCES "Task"(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE;

ALTER TABLE "Artifact" ADD
    CONSTRAINT fk_task_artifact
    FOREIGN KEY (task_id)
    REFERENCES "Task"(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

ALTER TABLE "Description" ADD
    CONSTRAINT fk_artifact_description
    FOREIGN KEY (artifact_id)
    REFERENCES "Artifact"(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

ALTER TABLE "Task" ADD
    CONSTRAINT fk_project_task
    FOREIGN KEY (project_id)
    REFERENCES "Project"(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE;

ALTER TABLE "Collaborator" ADD
    CONSTRAINT fk_event_collaborator
    FOREIGN KEY (event_id)
    REFERENCES "Event"(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE;

ALTER TABLE "Collaborator" ADD
    CONSTRAINT fk_user_collaborator
    FOREIGN KEY (user_id)
    REFERENCES "User"(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE;

ALTER TABLE "User" ADD
    CONSTRAINT fk_team_user
    FOREIGN KEY (team_id)
    REFERENCES "Team"(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE;

ALTER TABLE "Team" ADD
    CONSTRAINT fk_project_team
    FOREIGN KEY (project_id)
    REFERENCES "Project"(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE;

ALTER TABLE "Role" ADD
    CONSTRAINT fk_project_role
    FOREIGN KEY (project_id)
    REFERENCES "Project"(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE;

ALTER TABLE "Collaborator" ADD
    CONSTRAINT fk_role_collaborator
    FOREIGN KEY (role_id)
    REFERENCES "Role"(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE;

ALTER TABLE "Grant" ADD
    CONSTRAINT fk_grant_role
        FOREIGN KEY(role_id)
        REFERENCES "Role"(id)
        ON DELETE CASCADE  
        ON UPDATE CASCADE

ALTER TABLE "Grant" ADD
    CONSTRAINT fk_grant_permission
        FOREIGN KEY(permission_id)
        REFERENCES "Permission"(id)
        ON DELETE CASCADE  
        ON UPDATE CASCADE

ALTER TABLE "Grant" ADD
    CONSTRAINT uq_role_permission UNIQUE (role_id, permission_id)

```



## RESTfull сервіс для управління даними

