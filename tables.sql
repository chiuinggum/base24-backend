-- Create 'maps' table
CREATE TABLE maps (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    user_id INT NOT NULL
);

-- Create 'markers' table
CREATE TABLE markers (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    place_id TEXT NOT NULL,
    lat DECIMAL(9, 6) NOT NULL,
    lng DECIMAL(9, 6) NOT NULL
);

-- Create 'marker_info' table
create table marker_info (
	id int auto_increment primary key not null,
    map_id int not null,
    marker_id int not null,
    info text,
    foreign key (map_id) references maps(id),
    foreign key (marker_id) references markers(id)
);