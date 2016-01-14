SET 
  ANSI_NULLS, 
  QUOTED_IDENTIFIER, 
  CONCAT_NULL_YIELDS_NULL, 
  ANSI_WARNINGS, 
  ANSI_PADDING 
ON;

USE FaceAPI

/* ======================================================================
	CLEAR PROCEDURES & TYPES
====================================================================== */
-- VIEW
-----------------------------
---- FACE
--IF(OBJECT_ID('V_EYEBROW_XML') IS NOT NULL)			DROP VIEW V_EYEBROW_XML;
--IF(OBJECT_ID('V_EYE_XML') IS NOT NULL)				DROP VIEW V_EYE_XML;
--IF(OBJECT_ID('V_NOSE_XML') IS NOT NULL)				DROP VIEW V_NOSE_XML;
--IF(OBJECT_ID('V_MOUTH_XML') IS NOT NULL)			DROP VIEW V_MOUTH_XML;

--IF(OBJECT_ID('V_FACE_LANDMARKS_XML') IS NOT NULL)	DROP VIEW V_FACE_LANDMARKS_XML;
--IF(OBJECT_ID('V_FACE_ATTRIBUTES_XML') IS NOT NULL)	DROP VIEW V_FACE_ATTRIBUTES_XML;
--IF(OBJECT_ID('V_FACE_XML') IS NOT NULL)				DROP VIEW V_FACE_XML;

---- BASIC ENTITIES
--IF(OBJECT_ID('V_PERSON_GROUP_XML') IS NOT NULL)		DROP VIEW V_PERSON_GROUP_XML;
--IF(OBJECT_ID('V_PICTURE_XML') IS NOT NULL)			DROP VIEW V_PICTURE_XML;

--IF(OBJECT_ID('V_FACE_API_XML') IS NOT NULL)			DROP VIEW V_FACE_API_XML;

-----------------------------
-- PROCEDURES
-----------------------------
IF OBJECT_ID('test') IS NOT NULL					DROP PROCEDURE test;
IF OBJECT_ID('getFaceAPI') IS NOT NULL				DROP PROCEDURE getFaceAPI;

GO

--/* ======================================================================
--	VIEWS
--====================================================================== */
---- FACES
-------------------------------
--CREATE VIEW V_EYEBROW_XML
--AS
--	SELECT 
--		faceUID, direction,
--		(SELECT innerX x, innerY y FOR XML RAW(N'inner'), type) AS 'inner',
--		(SELECT outerX x, outerY y FOR XML RAW(N'outer'), type) AS 'outer'
--	FROM Eyebrow
--	-- FOR XML RAW(N'something'), type
--GO

--CREATE VIEW V_EYE_XML
--AS
--	SELECT 
--		faceUID, direction,
--		(SELECT topX x, topY y FOR XML RAW(N'top'), type) AS 'top',
--		(SELECT bottomX x, bottomY y FOR XML RAW(N'bottom'), type) AS 'bottom',
--		(SELECT innerX x, innerY y FOR XML RAW(N'inner'), type) AS 'inner',
--		(SELECT outerX x, outerY y FOR XML RAW(N'outer'), type) AS 'outer',
--	(
--		SELECT * FROM Pupil P
--		WHERE P.faceUID = E.faceUID AND P.direction = E.direction
--		FOR XML RAW(N'pupil'), type
--	) AS 'pupil'
--	FROM Eye E
--	-- FOR XML RAW(N'something'), type
--GO

--CREATE VIEW V_NOSE_XML
--AS
--	SELECT 
--		faceUID,
--		(SELECT leftRootX x, leftRootY y FOR XML RAW(N'leftRoot'), type)  AS 'leftRoot',
--		(SELECT leftAlarTopX x, leftAlarTopY y FOR XML RAW(N'leftAlarTop'), type)  AS 'leftAlarTop',
--		(SELECT leftAlarOutTipX x, leftAlarOutTipY y FOR XML RAW(N'leftAlarOutTip'), type)  AS 'leftAlarOutTip',
--		(SELECT rightRootX x, rightRootY y FOR XML RAW(N'rightRoot'), type) AS 'rightRoot',
--		(SELECT rightAlarTopX x, rightAlarTopY y FOR XML RAW(N'rightAlarTop'), type) AS 'rightAlarTop',
--		(SELECT rightAlarOutTipX x, rightAlarOutTipY y FOR XML RAW(N'rightRoot'), type) AS 'rightAlarOutTip'
--	FROM Nose
--	-- FOR XML RAW(N'nose'), type
--GO

--CREATE VIEW V_MOUTH_XML
--AS
--	SELECT 
--		faceUID,
--		(SELECT leftX x, leftY y FOR XML RAW(N'left'), type) AS 'left',
--		(SELECT rightX x, rightY y FOR XML RAW(N'right'), type) AS 'right',
--	(
--		SELECT 
--			faceUID,
--			(SELECT upperTopX x, upperTopY y FOR XML RAW(N'upperTop'), type) AS 'upperTop',
--			(SELECT upperBottomX x, upperBottomY y FOR XML RAW(N'upperBottom'), type) AS 'upperBottom',
--			(SELECT underTopX x, underTopY y FOR XML RAW(N'underTop'), type) AS 'underTop',
--			(SELECT underBottomX x, underBottomY y FOR XML RAW(N'underBottom'), type) AS 'underBottom'
--		FROM Lip
--		WHERE faceUID = M.faceUID
--		FOR XML RAW(N'lip'), type
--	) AS 'lip'
--	FROM Mouth M
--	-- FOR XML RAW(N'mouth'), type
--GO

--CREATE VIEW V_FACE_LANDMARKS_XML
--AS
--	SELECT F.faceUID,
--	(
--		-- EYES
--		SELECT
--		(
--			SELECT * FROM V_EYEBROW_XML
--			WHERE faceUID = F.faceUID AND direction = 1
--			FOR XML RAW(N'left'), type
--		) AS 'left',
--		(
--			SELECT * FROM V_EYEBROW_XML
--			WHERE faceUID = F.faceUID AND direction = 2
--			FOR XML RAW(N'right'), type
--		) AS 'right'
--		FOR XML RAW(N'eyebrows'), type
--	) AS 'eyebrows',
--	(
--		-- EYES
--		SELECT
--		(
--			SELECT * FROM V_EYE_XML
--			WHERE faceUID = F.faceUID AND direction = 1
--			FOR XML RAW(N'left'), type
--		) AS 'left',
--		(
--			SELECT * FROM V_EYE_XML
--			WHERE faceUID = F.faceUID AND direction = 2
--			FOR XML RAW(N'right'), type
--		) AS 'right'
--		FOR XML RAW(N'eyes'), type
--	) AS 'eyes',
--	(
--		SELECT * FROM V_NOSE_XML
--		WHERE faceUID = F.faceUID
--		FOR XML RAW(N'nose'), type
--	) AS 'nose',
--	(
--		SELECT * FROM V_MOUTH_XML
--		WHERE faceUID = F.faceUID
--		FOR XML RAW(N'mouth'), type
--	) AS 'mouth'
--	FROM FaceLandmarks F
--	-- FOR XML RAW(N'landmarks'), type
--GO

--CREATE VIEW V_FACE_ATTRIBUTES_XML
--AS
--	SELECT *,
--	(
--		SELECT * FROM FacialHair
--		WHERE faceUID = A.faceUID
--		FOR XML RAW(N'facialHair'), type
--	) AS 'facialHair',
--	(
--		SELECT * FROM HeadPose
--		WHERE faceUID = A.faceUID
--		FOR XML RAW(N'headPose'), type
--	) AS 'headPose'
--	FROM FaceAttributes A
--	-- FOR XML RAW(N'attributes'), type
--GO

--CREATE VIEW V_FACE_XML
--AS
--	SELECT *,
--	(
--		SELECT * FROM V_FACE_ATTRIBUTES_XML
--		WHERE faceUID = F.uid
--		FOR XML RAW(N'attributes'), type
--	) AS 'attributes',
--	(
--		SELECT * FROM V_FACE_LANDMARKS_XML
--		WHERE faceUID = F.uid
--		FOR XML RAW(N'landmarks'), type
--	) AS 'landmarks'
--	FROM Face F
--	-- FOR XML RAW(N'face'), type
--GO

-------------------------------
---- BASIC ENTITIES
-------------------------------
--CREATE VIEW V_PERSON_GROUP_XML
--AS
--	SELECT *,
--	(
--		SELECT * FROM Person
--		WHERE groupUID = G.uid
--		FOR XML RAW(N'person'), type
--	) AS 'person'
--	FROM PersonGroup G;
--	-- FOR XML RAW(N'personGroup'), ROOT(N'personGroupArray'), type
--GO

--CREATE VIEW V_PICTURE_XML
--AS
--	SELECT *,
--	(
--		SELECT * FROM V_FACE_XML
--		WHERE pictureUID = P.uid
--		FOR XML RAW(N'face'), type
--	) AS 'picture'
--	FROM Picture P
--	-- FOR XML RAW(N'picture'), ROOT(N'pictureArray'), type
--GO

--CREATE VIEW V_FACE_API_XML
--AS
--	SELECT
--	(
--		SELECT * FROM V_PERSON_GROUP_XML
--		FOR XML RAW(N'personGroup'), ROOT(N'personGroupArray'), type
--	) AS 'personGroupArray',
--	(
--		SELECT * FROM V_PICTURE_XML
--		FOR XML RAW(N'picture'), ROOT(N'pictureArray'), type
--	) AS 'pictureArray'
--	-- FOR XML RAW(N'faceAPI')
--GO

/* ======================================================================
	GETTERS
====================================================================== */
CREATE PROCEDURE getFaceAPI
AS
	SELECT
	(
		-- PERSON_GROUP
		SELECT *,
		(
			SELECT * FROM Person
			WHERE groupUID = PG.uid
			FOR XML RAW(N'person'), type
		)
		FROM PersonGroup PG
		FOR XML RAW('personGroup'), ROOT(N'personGroupArray'), type
	),
	(
		-- PICTURE_ARRAY
		SELECT *,
		(
			-- FACE
			SELECT *,
			(
				-- ATTRIBUTES
				SELECT *,
				(
					SELECT * FROM FacialHair
					WHERE faceUID = A.faceUID
					FOR XML RAW(N'facialHair'), type
				),
				(
					SELECT * FROM HeadPose
					WHERE faceUID = A.faceUID
					FOR XML RAW(N'headPose'), type
				)
				FROM FaceAttributes A
				WHERE faceUID = F.uid
				FOR XML RAW(N'attributes'), type
			),
			(
				-- LANDMARKS
				SELECT
				(
					-- EYEBROWS
					SELECT 
					(
						SELECT 
							(SELECT innerX x, innerY y FOR XML RAW(N'inner'), type),
							(SELECT outerX x, outerY y FOR XML RAW(N'outer'), type)
						FROM Eyebrow
						WHERE faceUID = L.faceUID AND direction = 1
						FOR XML RAW(N'left'), type
					),
					(
						SELECT 
							(SELECT innerX x, innerY y FOR XML RAW(N'inner'), type),
							(SELECT outerX x, outerY y FOR XML RAW(N'outer'), type)
						FROM Eyebrow
						WHERE faceUID = L.faceUID AND direction = 2
						FOR XML RAW(N'right'), type
					)
					FOR XML RAW(N'eyebrows'), type
				),
				(
					-- EYES
					SELECT 
					(
						SELECT
							(SELECT topX x, topY y FOR XML RAW(N'top'), type),
							(SELECT bottomX x, bottomY y FOR XML RAW(N'bottom'), type),
							(SELECT innerX x, innerY y FOR XML RAW(N'inner'), type),
							(SELECT outerX x, outerY y FOR XML RAW(N'outer'), type),
						(
							-- PUPIL IN AN EYE
							SELECT x, y FROM Pupil
							WHERE faceUID = E.faceUID AND direction = E.direction
							FOR XML RAW(N'pupil'), type
						)
						FROM Eye E
						WHERE faceUID = L.faceUID AND direction = 1
						FOR XML RAW(N'left'), type
					),
					(
						SELECT
							(SELECT topX x, topY y FOR XML RAW(N'top'), type),
							(SELECT bottomX x, bottomY y FOR XML RAW(N'bottom'), type),
							(SELECT innerX x, innerY y FOR XML RAW(N'inner'), type),
							(SELECT outerX x, outerY y FOR XML RAW(N'outer'), type),
						(
							-- PUPIL IN AN EYE
							SELECT x, y FROM Pupil
							WHERE faceUID = E.faceUID AND direction = E.direction
							FOR XML RAW(N'pupil'), type
						) 
						FROM Eye E
						WHERE faceUID = L.faceUID AND direction = 2
						FOR XML RAW(N'right'), type
					)
					FOR XML RAW(N'eyes'), type
				),
				(
					-- NOSE
					SELECT
						(SELECT leftRootX x, leftRootY y FOR XML RAW(N'leftRoot'), type),
						(SELECT leftAlarTopX x, leftAlarTopY y FOR XML RAW(N'leftAlarTop'), type),
						(SELECT leftAlarOutTipX x, leftAlarOutTipY y FOR XML RAW(N'leftAlarOutTip'), type),
						(SELECT rightRootX x, rightRootY y FOR XML RAW(N'rightRoot'), type),
						(SELECT rightAlarTopX x, rightAlarTopY y FOR XML RAW(N'rightAlarTop'), type),
						(SELECT rightAlarOutTipX x, rightAlarOutTipY y FOR XML RAW(N'rightRoot'), type)
					FROM Nose
					WHERE faceUID = L.faceUID
					FOR XML RAW(N'nose'), type
				),
				(
					-- MOUTH
					SELECT
						(SELECT leftX x, leftY y FOR XML RAW(N'left'), type),
						(SELECT rightX x, rightY y FOR XML RAW(N'right'), type),
					(
						-- LIP
						SELECT 
							faceUID,
							(SELECT upperTopX x, upperTopY y FOR XML RAW(N'upperTop'), type),
							(SELECT upperBottomX x, upperBottomY y FOR XML RAW(N'upperBottom'), type),
							(SELECT underTopX x, underTopY y FOR XML RAW(N'underTop'), type),
							(SELECT underBottomX x, underBottomY y FOR XML RAW(N'underBottom'), type)
						FROM Lip
						WHERE faceUID = M.faceUID
						FOR XML RAW(N'lip'), type
					)
					FROM Mouth M
					WHERE faceUID = L.faceUID
					FOR XML RAW(N'mouth'), type
				)
				FROM FaceLandmarks L
				WHERE L.faceUID = F.uid
				FOR XML RAW(N'landmarks'), type
			)
			FROM Face F
			WHERE pictureUID = P.uid
			FOR XML RAW(N'face'), type
		)
		FROM Picture P
		FOR XML RAW(N'picture'), ROOT(N'pictureArray'), type
	)
	FOR XML RAW(N'faceAPI');
GO

/* ======================================================================
	ARCHIVERS
====================================================================== */
-- PARAMETERIC TABLES
CREATE TYPE ISSUED_UID_TABLE AS TABLE
(
	uid BIGINT
);
GO

CREATE PROCEDURE private_merge_person
	@xml
AS
	
GO

CREATE PROCEDURE private_merge_face
	@xml XML
AS
	DECLARE @uid_table ISSUED_UID_TABLE

	DECLARE @uid = @xml.value('@uid', 'BIGINT')

	-----------------------------------------
	-- MERGE FACE
	-----------------------------------------
	Merge Face ORG`
		USING
		(
			SELECT 
				T.C.value('uid', 'BIGINT') uid,
				@pictureUID pictureUID,
				T.C.value('personUID', 'BIGINT') personUID,
				T.C.value('x', 'REAL') x,
				T.C.value('y', 'REAL') y,
				T.C.value('width', 'REAL') width,
				T.C.value('height', 'REAL') height
			FROM @xml.nodes('picture/face') AS T(C)
		) NEW
		ON ORG.uid = NEW.uid
	WHEN MATCHED THEN
		UPDATE SET 
			uid = NEW.uid,
			pictureUID = NEW.pictureUID,
			personUID = NEW.personUID,
			x = NEW.x,
			y = NEW.y,
			width = NEW.width,
			height = NEW.height
	WHEN NOT MATCHED THEN
		INSERT VALUES 
		(
			NEW.uid,
			NEW.pictureUID,
			NEW.personUID,
			NEW.x,
			NEW.y,
			NEW.width,
			NEW.height
		)
		OUTPUT INSERTED.uid INTO @uid_table;

	-----------------------------------------
	-- ALLOCATE NEWLY ISSUED UID
	-----------------------------------------
	DECLARE @i INT = 1
	DECLARE @size INT = @xml.value('count(pictureArray/picture)', 'INT')

	DECLARE @faceXML XML
	DECLARE @uid BIGINT

	-- CONSTRUCT CURSOR
	DECLARE @cursor CURSOR
	SET @cursor = CURSOR FOR
		SELECT uid FROM @uid_table

	OPEN @cursor

	-- ITERATE
	WHILE (@i <= @size)
	BEGIN
		SET @faceXML = @xml.query('picture/face[sql:variable("@i")]')
		
		-- GET UID, IF NOT THEN FETCH FROM NEWLY ISSUEDS.
		SET @uid = @faceXML.value('@uid', 'BIGINT')
		IF (@uid IS NULL)
		BEGIN
			FETCH NEXT FROM @cursor INTO @uid
			SET @pictureXML.modify('insert sql:variable("@uid") into (/Picture)[1]')
		END
	END

	-----------------------------------------
	-- MERGE ATTRIBUTES
	-----------------------------------------
	-- FACE_ATTRIBUTES
	MERGE FaceAttributes
		USING 
		(
			SELECT 
				T.C.value('orderUID', 'BIGINT') orderUID,
				T.C.value('age', 'REAL') age,
				T.C.value('gender', 'NVARCHAR(10)') gender,
				T.C.value('smile', 'REAL') smile,
			FROM @xml.nodes('picture/face/face/attributes') AS T(C)
		)
	WHEN NOT MATCHED THEN
		INSERT VALUES (NEW.orderUID, NEW.age, NEW.gender, NEW.smile)
	WHEN MATCHED THEN
		UPDATE SET age = NEW.age, gender = NEW.gender, smile = NEW.smile;

	-- FACIAL_HAIR
	MERGE FacialHair
		USING
		(
			SELECT
				T.C.value(
		)

	-- HEAD_POSE


	-----------------------------------------
	-- MERGE LANDMARKS
	-----------------------------------------
	

GO

CREATE PROCEDURE private_merge_picture
	@xml XML
AS
	DECLARE @uid_table ISSUED_UID_TABLE

	-----------------------------------------
	-- MERGE PICTURE
	-----------------------------------------
	Merge Picture ORG
		USING
		(
			SELECT 
				T.C.value('uid', 'BIGINT') uid,
				T.C.value('name', 'NVARCHAR(100)') name,
				T.C.value('url', 'NVARCHAR(1000)') url
			FROM @xml.nodes('pictureArray/picture') AS T(C)
		) NEW
		ON ORG.uid = NEW.uid
	WHEN MATCHED THEN
		UPDATE SET name = NEW.name, url = NEW.url
	WHEN NOT MATCHED THEN
		INSERT VALUES (NEW.name, NEW.url)
		OUTPUT INSERTED.uid INTO @uid_table;

	-----------------------------------------
	-- ALLOCATE NEWLY ISSUED UID
	-----------------------------------------
	DECLARE @i INT = 1
	DECLARE @size INT = @xml.value('count(pictureArray/picture)', 'INT')

	DECLARE @pictureXML XML
	DECLARE @uid BIGINT

	-- CONSTRUCT CURSOR
	DECLARE @cursor CURSOR
	SET @cursor = CURSOR FOR
		SELECT uid FROM @uid_table

	OPEN @cursor

	-- ITERATE
	WHILE (@i <= @size)
	BEGIN
		SET @pictureXML = @xml.query('pictureArray/picture[sql:variable("@i")]')
		
		-- GET UID, IF NOT THEN FETCH FROM NEWLY ISSUEDS.
		SET @uid = @pictureXML.value('@uid', 'BIGINT')
		
		IF (@uid IS NULL)
		BEGIN
			FETCH NEXT FROM @cursor INTO @uid
			SET @pictureXML.modify('insert sql:variable("@uid") into (/Picture)[1]')
		END

		-- MERGE FACES
		EXEC private_merge_face pictureXML
	END
GO

CREATE PROCEDURE mergePersonGroup
	@xml XML
AS
	
GO
CREATE PROCEDURE mergePerson
	@xml XML
AS
GO

CREATE PROCEDURE mergeFaceAPI
	@xml XML
AS

GO

/* ======================================================================
	TESTERS
====================================================================== */
CREATE PROCEDURE test
AS
	-------------------------------
	-- CLEAR ALL
	-------------------------------
	DELETE FROM PersonGroup;
	DELETE FROM Picture;

	-------------------------------
	-- CONSTRUCT PERSON AND PICTURE
	-------------------------------
	-- PERSON_GROUP
	INSERT INTO PersonGroup VALUES 
		(N'family'), 
		(N'class');

	DECLARE @personGroupMinUID BIGINT
	SELECT @personGroupMinUID = min(uid) FROM PersonGroup

	-- PERSON
	INSERT INTO Person VALUES 
		(@personGroupMinUID + 0, N'Father'),
		(@personGroupMinUID + 0, N'Mother'),
		(@personGroupMinUID + 1, N'John'),
		(@personGroupMinUID + 1, N'Kevin'),
		(@personGroupMinUID + 1, N'Mary');

	DECLARE @personMinUID BIGINT
	SELECT @personMinUID = min(uid) FROM Person

	-- PICTURE
	INSERT INTO Picture VALUES
		(N'나들이', N'river.jpg'),
		(N'단체사진', N'group.jpg');

	DECLARE @pictureMinUID BIGINT
	SELECT @pictureMinUID = min(uid) FROM Picture

	-------------------------------
	-- CONSTRUCT FACE
	-------------------------------
	INSERT INTO Face VALUES
		(@pictureMinUID + 0, @personMinUID + 0, 40, 40, 20, 20), -- Father
		(@pictureMinUID + 0, @personMinUID + 1, 62, 40, 25, 25), -- Mother
		(@pictureMinUID + 1, @personMinUID + 2, 89, 40, 21, 21), -- John
		(@pictureMinUID + 1, @personMinUID + 3, 111, 40, 22, 22), -- Kevin
		(@pictureMinUID + 1, @personMinUID + 4, 134, 40, 19, 18); -- Mary

	DECLARE @faceMinUID BIGINT
	SELECT @faceMinUID = min(uid) FROM Face

	-------------------------------
	-- CONSTRUCT ATTRIBUTES
	-------------------------------
	INSERT INTO FaceAttributes VALUES
		(@faceMinUID + 0, 40, N'maie', RAND()),
		(@faceMinUID + 1, 40, N'female', RAND()),
		--(@faceMinUID + 2, 18, N'maie', RAND()),
		(@faceMinUID + 3, 17, N'maie', RAND()),
		(@faceMinUID + 4, 19, N'female', RAND());

	INSERT INTO FacialHair
	SELECT faceUID, RAND(), RAND(), RAND()
	FROM FaceAttributes;

	INSERT INTO HeadPose
	SELECT faceUID, RAND(), RAND(), RAND()
	FROM FaceAttributes;

	-------------------------------
	-- CONSTRUCT LANDMARKS
	-------------------------------
	INSERT INTO FaceLandmarks
	SELECT faceUID
	FROM FaceAttributes;

	-- EYEBROWS
	INSERT INTO Eyebrow
		SELECT faceUID, 1, RAND(), RAND(), RAND(), RAND()
		FROM FaceLandmarks

		UNION ALL
		
		SELECT faceUID, 2, RAND(), RAND(), RAND(), RAND()
		FROM FaceLandmarks;

	--EYES
	INSERT INTO Eye
	SELECT 
		faceUID, direction, 
		RAND(), RAND(), RAND(), RAND(), RAND(), RAND(), RAND(), RAND()
	FROM Eyebrow;

	-- PUPIL IN AN EYE
	INSERT INTO Pupil
	SELECT faceUID, direction, RAND(), RAND()
	FROM Eye;

	-- NOSE
	INSERT INTO Nose
	SELECT 
		faceUID,
		RAND(), RAND(), RAND(), RAND(), RAND(), RAND(), -- LEFT SIDE
		RAND(), RAND(), RAND(), RAND(), RAND(), RAND() -- RIGHT SIDE
	FROM FaceLandmarks;

	-- MOUTH
	INSERT INTO Mouth
	SELECT faceUID, RAND(), RAND(), RAND(), RAND()
	FROM FaceLandmarks;

	-- LIP IN A MOUTH
	INSERT INTO Lip
	SELECT 
		faceUID,
		RAND(), RAND(), RAND(), RAND(),
		RAND(), RAND(), RAND(), RAND()
	FROM FaceLandmarks;

	EXEC getFaceAPI
GO

EXEC test