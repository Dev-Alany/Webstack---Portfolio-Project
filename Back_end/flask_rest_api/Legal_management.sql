show databases;

use beth;

select * from cases;
insert into cases(Name) values('David');

create table Gender(
id int primary key,
gender nvarchar(256) unique);

select * from Gender;

select * from users where User_Id = 12;

select * from users;

update users
set status = 1
where USER_Id = 20;


alter table users
add column created_by timestamp default current_timestamp;

alter table users
add column created_by nvarchar(256);

alter table users
modify column Username nvarchar(256) unique;

desc users;

alter table users
add column updated_by nvarchar(256);

alter table users
add column updated_by timestamp default current_timestamp;

alter table users
rename column created_by To created_at;
alter table users
add column created_by timestamp default current_timestamp;

update users 
set password = 'rajonrondo'
where User_Id = 33;

show tables;
describe gender;

insert into gender (id, gender) values ('1','Female');
insert into gender (id, gender) values (2,'Female');
insert into gender (id, gender) values (3,'Male');
insert into gender (id, gender) values (4,'Non Binary');

select * from gender;

alter table users
add column genderId int,
add constraint fk_gender
foreign key (genderId) references gender(id);

alter table users
add column caseId int,
add constraint fk_case
foreign key (caseId) references cases(Id);


alter table cases
add column created_at timestamp default current_timestamp;

alter table cases
add column updated_at timestamp default current_timestamp;

alter table cases
add column created_by nvarchar(256);

alter table cases
add column updated_by nvarchar(256);

describe cases;
select * from cases;

create table Individualclients(
id int primary key,
Name nvarchar(256),
created_by nvarchar(256),
updated_by nvarchar(256),
created_at timestamp default current_timestamp,
updated_at timestamp default current_timestamp
);

alter table Individualclients
add column User_Email nvarchar(256),
add column status int default 1;

alter table Individualclients
add column phone_number nvarchar(256);

alter table Individualclients
rename column User_email to email;

insert into Individualclients (First_name, Last_name, id) values ('Sabine', 'Wooder', 7);
insert into Individualclients (First_name, Last_name, id) values ('Chance', 'Dougill', 8);
insert into Individualclients (First_name, Last_name, id) values ('Sadella', 'Zute', 9);
insert into Individualclients (First_name, Last_name, id) values ('Collin', 'MacDonough', 10);
insert into Individualclients (First_name, Last_name, id) values ('Arlan', 'Clementel', 11);
insert into Individualclients (First_name, Last_name, id) values ('Constantin', 'Greaser', 12);

select * from Individualclients;
desc Individualclients;

alter table Individualclients
modify column id INT AUTO_INCREMENT;

alter table Individualclients
add column genderId int,
add constraint fk_genderClients
foreign key (genderId) references gender(Id);

insert into Individualclients (id,Name) values (1,'Raquel');
insert into Individualclients (id,Name) values (2,'Elene');
insert into Individualclients (id,Name) values (3,'Chariot');
insert into Individualclients (id,Name) values (4,'Fletch');
insert into Individualclients (id,Name) values (5,'Neysa');
insert into Individualclients (First_name, Last_name) values ('Balem', 'Bazenga');

SHOW CREATE TABLE users;


select * from users;

select * from clients;

alter table clients
add column IndividualClientId int,
add column corporateClientId int,
add constraint fk_IndividualClientId 
foreign key (IndividualClientId) references Individualclients(id),
add constraint fk_corporateClientId
foreign key (IndividualClientId) references Corporateclients(id);


show create table Individualclients;

CREATE TABLE `Corporateclients` (
   `id` int NOT NULL AUTO_INCREMENT,
   `created_by` varchar(256) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
   `updated_by` varchar(256) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
   `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
   `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
   `genderId` int DEFAULT NULL,
   `First_name` varchar(256) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
   `Last_name` varchar(256) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
   `email` varchar(256) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
   `status` int DEFAULT '1',
   `phone_number` varchar(256) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
   PRIMARY KEY (`id`),
   KEY `fk_genderClients` (`genderId`),
   CONSTRAINT `fk_genderCorporateClients` FOREIGN KEY (`genderId`) REFERENCES `gender` (`id`)
 ) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

alter table users
add column clientId int,
add constraint fk_clientId
foreign key (clientId) references clients(id);
