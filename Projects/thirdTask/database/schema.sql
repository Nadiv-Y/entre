create database task3;

use task3;

CREATE TABLE production_team (
	id INT PRIMARY KEY AUTO_INCREMENT not null,
    name TEXT not null
);

CREATE TABLE meetings (
	id INT PRIMARY KEY AUTO_INCREMENT not null,
    production_group INT NOT NULL,
    FOREIGN KEY (production_group) REFERENCES production_team(id),
    starting_time DATETIME NOT NULL,
    ending_time DATETIME NOT NULL,
    description TEXT NOT NULL,
    meeting_room TEXT NOT NULL
);
