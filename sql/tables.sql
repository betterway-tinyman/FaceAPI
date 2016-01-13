SET 
  ANSI_NULLS, 
  QUOTED_IDENTIFIER, 
  CONCAT_NULL_YIELDS_NULL, 
  ANSI_WARNINGS, 
  ANSI_PADDING 
ON;

USE FaceAPI

/* ======================================================================
	CLEAR TABLES
====================================================================== */
-- LANDMARKS
-----------------------------
IF(OBJECT_ID('Lip') IS NOT NULL)			DROP TABLE Lip;
IF(OBJECT_ID('Mouth') IS NOT NULL)			DROP TABLE Mouth;
IF(OBJECT_ID('Nose') IS NOT NULL)			DROP TABLE Nose;
IF(OBJECT_ID('Pupil') IS NOT NULL)			DROP TABLE Pupil;
IF(OBJECT_ID('Eye') IS NOT NULL)			DROP TABLE Eye;
IF(OBJECT_ID('Eyebrow') IS NOT NULL)		DROP TABLE Eyebrow;

IF(OBJECT_ID('FaceLandmarks') IS NOT NULL)	DROP TABLE FaceLandmarks;

-----------------------------
-- ATTRIBUTES
-----------------------------
IF(OBJECT_ID('FacialHair') IS NOT NULL)		DROP TABLE FacialHair;
IF(OBJECT_ID('HeadPose') IS NOT NULL)		DROP TABLE HeadPose;

IF(OBJECT_ID('FaceAttributes') IS NOT NULL)	DROP TABLE FaceAttributes;

-----------------------------
-- BASIC ENTITIES
-----------------------------
IF(OBJECT_ID('Face') IS NOT NULL)			DROP TABLE Face;
IF(OBJECT_ID('Picture') IS NOT NULL)		DROP TABLE Picture;
IF(OBJECT_ID('Person') IS NOT NULL)			DROP TABLE Person;
IF(OBJECT_ID('PersonGroup') IS NOT NULL)	DROP TABLE PersonGroup;

/* ===========================================================
	BASIC ENTITIES
=========================================================== */
CREATE TABLE PersonGroup
(
	uid BIGINT PRIMARY KEY IDENTITY(1, 1),
	name NVARCHAR(100)
);

CREATE TABLE Person
(
	uid BIGINT PRIMARY KEY IDENTITY(1, 1),

	groupUID BIGINT
		FOREIGN KEY REFERENCES PersonGroup(uid)
			ON DELETE CASCADE,	
	name NVARCHAR(100),

	UNIQUE (groupUID, name)
);

CREATE TABLE Picture
(
	uid BIGINT PRIMARY KEY IDENTITY(1, 1),
	name NVARCHAR(100),
	url NVARCHAR(1000)
);

CREATE TABLE Face
(
	uid BIGINT PRIMARY KEY IDENTITY(1, 1),
	
	pictureUID BIGINT
		FOREIGN KEY REFERENCES Picture(uid)
			ON DELETE CASCADE,
	personUID BIGINT
		FOREIGN KEY REFERENCES Person(uid)
			ON DELETE CASCADE,
	
	x REAL,
	y REAL,
	width REAL,
	height REAL
);

/* ===========================================================
	FACE_ATTRIBUTES
=========================================================== */
CREATE TABLE FaceAttributes
(
	faceUID BIGINT PRIMARY KEY
		FOREIGN KEY REFERENCES Face(uid)
			ON DELETE CASCADE,

	age REAL,
	gender NVARCHAR(10),
	smile REAL
);

CREATE TABLE FacialHair
(
	faceUID BIGINT PRIMARY KEY
		FOREIGN KEY REFERENCES FaceAttributes(faceUID)
			ON DELETE CASCADE,

	mustache REAL,
	beard REAL,
	sideburns REAL
);

CREATE TABLE HeadPose
(
	faceUID BIGINT PRIMARY KEY
		FOREIGN KEY REFERENCES FaceAttributes(faceUID)
			ON DELETE CASCADE,

	roll REAL,
	pitch REAL,
	yaw REAL
);

/* ===========================================================
	FACE_LANDMARKS
=========================================================== */
CREATE TABLE FaceLandmarks
(
	faceUID BIGINT PRIMARY KEY
		FOREIGN KEY REFERENCES Face(uid)
			ON DELETE CASCADE
);

CREATE TABLE Eyebrow
(
	faceUID BIGINT
		FOREIGN KEY REFERENCES FaceLandmarks(faceUID)
			ON DELETE CASCADE,
	direction INT,

	innerX REAL,
	innerY REAL,
	outerX REAL,
	outerY REAL,

	PRIMARY KEY (faceUID, direction)
);

CREATE TABLE Eye
(
	faceUID BIGINT
		FOREIGN KEY REFERENCES FaceLandmarks(faceUID)
			ON DELETE CASCADE,
	direction INT,

	topX REAL,
	topY REAL,
	bottomX REAL,
	bottomY REAL,
	innerX REAL,
	innerY REAL,
	outerX REAL,
	outerY REAL,

	PRIMARY KEY (faceUID, direction)
);

CREATE TABLE Pupil
(
	faceUID BIGINT,
	direction INT,

	x REAL,
	y REAL,

	PRIMARY KEY (faceUID, direction),
	FOREIGN KEY (faceUID, direction)
		REFERENCES Eye(faceUID, direction)
		ON DELETE CASCADE
);

CREATE TABLE Nose
(
	faceUID BIGINT PRIMARY KEY
		FOREIGN KEY REFERENCES FaceLandmarks(faceUID)
			ON DELETE CASCADE,
	
	-- LEFT SIDE
	leftRootX REAL,
	leftRootY REAL,
	leftAlarTopX REAL,
	leftAlarTopY REAL,
	leftAlarOutTipX REAL,
	leftAlarOutTipY REAL,

	-- RIGHT SIDE
	rightRootX REAL,
	rightRootY REAL,
	rightAlarTopX REAL,
	rightAlarTopY REAL,
	rightAlarOutTipX REAL,
	rightAlarOutTipY REAL
);

CREATE TABLE Mouth
(
	faceUID BIGINT PRIMARY KEY
		FOREIGN KEY REFERENCES FaceLandmarks(faceUID)
			ON DELETE CASCADE,

	-- LEFT POINT
	leftX REAL,
	leftY REAL,

	-- RIGHT POINT
	rightX REAL,
	rightY REAL
);

CREATE TABLE Lip
(
	faceUID BIGINT PRIMARY KEY
		FOREIGN KEY REFERENCES FaceLandmarks(faceUID)
			ON DELETE CASCADE,

	-- UPPER SIDE
	upperTopX REAL,
	upperTopY REAL,
	upperBottomX REAL,
	upperBottomY REAL,

	-- UNDER SIDE
	underTopX REAL,
	underTopY REAL,
	underBottomX REAL,
	underBottomY REAL
);
