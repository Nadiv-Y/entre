create database if not exists sql_meetings;

use sql_meetings;

drop table if exists development_teams;

create table development_teams (
    group_id int primary key auto_increment,
    group_name varchar(50) not null
);

drop table if exists meetings;

create table meetings (
	meeting_id int primary key auto_increment,
	group_id int not null,
	start_datetime datetime not null,
	end_datetime datetime not null,
	meeting_description text,
	meeting_room varchar(50) not null,
	
	foreign key (group_id)
		references development_teams (group_id)
		on update cascade
		on delete no action
);


insert into development_teams (group_name)
values ('Backend Team'), ('Frontend Team'), ('Mobile Team'), ("QA Team"), ("DevOps Team");

insert into meetings (group_id, start_datetime, end_datetime, meeting_description, meeting_room)
VALUES 
(1, '2026-02-12 09:00:00', '2026-02-12 10:30:00', 'Weekly Sync', 'Blue Room'),
(1, '2026-02-15 14:00:00', '2026-02-15 15:00:00', 'Code Review', 'Green Room'),
(2, '2026-02-12 11:00:00', '2026-02-12 12:00:00', 'Project Kickoff', 'Purple Room'),
(3, '2026-02-13 10:00:00', '2026-02-13 11:30:00', 'Brainstorming', 'Yellow Room'),
(4, '2026-02-14 09:30:00', '2026-02-14 10:30:00', 'Status Update', 'Blue Room'),
(5, '2026-02-16 16:00:00', '2026-02-16 17:00:00', 'Project Planning', 'Brown Room');
