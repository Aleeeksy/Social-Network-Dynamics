\connect clerbudg

create table Nodes (
	node_id integer primary key,
	description varchar(1000),
	type char(1),
	parent_node_id integer references Nodes
);

create table Node_details(
	node_id integer primary key references Nodes
);

create table Credits (
	credit_id integer primary key,
	description varchar(1000),
	instalment numeric(100,2),
	node_id integer references Nodes
);

create table Fixed_capitals (
	fixed_capitals_id integer primary key,
	description varchar(1000),
	value numeric(100,2),
	node_id integer references Nodes
);

create table Provided_services (
	service_id integer primary key,
	description varchar(1000),
	value numeric(100,2),
	node_id integer references Nodes
);

create table Credit_payments (
	credit_payment_id integer primary key,
	credit_id integer references Credits,
	date date
);

create table Contractors (
	contractor_id integer primary key,
	name varchar(200)
);

create table Employees (
	employee_id integer primary key,
	first_name varchar(100) not null,
	last_name varchar(100) not null,
	login varchar(100),
	passwd varchar(100)  check(length(passwd) >=8 )
);

create table Used_services (
	service_id integer primary key,
	node_id integer references Nodes,
	description varchar(1000),
	price numeric(100,2) not null
);

create table Expenses (
	transaction_id integer primary key,
	service_id integer references Used_services,
	value numeric(100,2) not null,
	contractor_id integer references Contractors,
	type char(1),
	date date
);

create table Revenues (
	transaction_id integer primary key,
	service_id integer references Provided_services,
	contractor_id integer references Contractors,
	value numeric(100,2),
	type char(1),
	date date
);

create table Employees_Nodes (
	node_id  integer references Nodes,
	employee_id integer references Employees
);