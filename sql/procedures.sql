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
-----------------------------
-- PROCEDURES
-----------------------------
IF OBJECT_ID('test') IS NOT NULL						DROP PROCEDURE test;

IF OBJECT_ID('mergeFaceAPI') IS NOT NULL				DROP PROCEDURE mergeFaceAPI
IF OBJECT_ID('mergePersonGroup') IS NOT NULL			DROP PROCEDURE mergePersonGroup
IF OBJECT_ID('mergePerson') IS NOT NULL					DROP PROCEDURE mergePerson
IF OBJECT_ID('mergePicture') IS NOT NULL				DROP PROCEDURE mergePicture
IF OBJECT_ID('mergeFace') IS NOT NULL					DROP PROCEDURE mergeFace

IF OBJECT_ID('private_merge_person_group') IS NOT NULL	DROP PROCEDURE private_merge_person_group
IF OBJECT_ID('private_merge_person') IS NOT NULL		DROP PROCEDURE private_merge_person
IF OBJECT_ID('private_merge_picture') IS NOT NULL		DROP PROCEDURE private_merge_picture
IF OBJECT_ID('private_merge_face') IS NOT NULL			DROP PROCEDURE private_merge_face

IF OBJECT_ID('getFaceAPI') IS NOT NULL					DROP PROCEDURE getFaceAPI

IF TYPE_ID('ISSUED_UID_TABLE') IS NOT NULL				DROP TYPE ISSUED_UID_TABLE
GO

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
	@xml XML OUTPUT
AS
	DECLARE @uid_table ISSUED_UID_TABLE
	DECLARE @uid BIGINT

	DECLARE @cursor CURSOR
	DECLARE @i INT
	DECLARE @size INT

	-----------------------------------------
	-- DELETE UNLISTED(S)
	-----------------------------------------
	DELETE P FROM Person P
		INNER JOIN
		(
			SELECT uid 
			FROM Person
			WHERE groupUID = @xml.value('(*/@uid)[0]', 'BIGINT')

			EXCEPT

			SELECT X.C.value('@uid', 'BIGINT')
			FROM @xml.nodes('*/person') AS X(C)
		) T
		ON P.uid = T.uid;

	-----------------------------------------
	-- MERGE
	-----------------------------------------
	Merge Person ORG
		USING
		(
			SELECT
				T.C.value('@uid', 'BIGINT') uid,
				T.C.value('parent::*/@uid', 'BIGINT') groupUID,
				T.C.value('@name', 'NVARCHAR(100)') name
			FROM @xml.nodes('*/person') AS T(C)
		) NEW 
		ON ORG.uid = NEW.uid
	WHEN MATCHED THEN 
		UPDATE SET
			groupUID = NEW.groupUID, 
			name = NEW.name
	WHEN NOT MATCHED THEN
		INSERT VALUES (NEW.groupUID, NEW.name)
		OUTPUT INSERTED.uid INTO @uid_table;

	-----------------------------------------
	-- ALLOCATE NEWLY ISSUED UID(S)
	-----------------------------------------
	SET @cursor = CURSOR FOR 
		SELECT uid FROM @uid_table

	SET @i = 1
	SET @size = @xml.value('count(*/person)', 'INT')

	OPEN @cursor

	WHILE (@i <= @size)
	BEGIN
		DECLARE @rowXML XML = @xml.query('*/person[sql:variable("@i")]')
		
		-- GET UID, IF NOT THEN FETCH FROM NEWLY ISSUEDS.
		SET @uid = @rowXML.value('(*/@uid)[1]', 'BIGINT')

		IF (@uid IS NULL)
		BEGIN
			FETCH NEXT FROM @cursor INTO @uid
			SET @rowXML.modify('insert attribute uid {sql:variable("@uid")} into /*[1]')
		END

		-- SWAP
		SET @xml.modify('insert sql:variable("@rowXML") before (*/person[sql:variable("@i")])[1]')
		SET @xml.modify('delete */person[sql:variable("@i") + 1]')

		SET @i = @i + 1
	END
GO

CREATE PROCEDURE private_merge_person_group
	@xml XML OUTPUT
AS
	DECLARE @uid_table ISSUED_UID_TABLE
	DECLARE @uid BIGINT

	DECLARE @cursor CURSOR
	DECLARE @i INT
	DECLARE @size INT

	-----------------------------------------
	-- MERGE
	-----------------------------------------
	Merge PersonGroup ORG
		USING
		(
			SELECT
				T.C.value('@uid', 'BIGINT') uid,
				T.C.value('@name', 'NVARCHAR(100)') name
			FROM @xml.nodes('*/personGroup') AS T(C)
		) NEW 
		ON ORG.uid = NEW.uid
	WHEN MATCHED THEN 
		UPDATE SET name = NEW.name
	WHEN NOT MATCHED THEN
		INSERT VALUES (NEW.name)
		OUTPUT INSERTED.uid INTO @uid_table;

	-----------------------------------------
	-- ALLOCATE NEWLY ISSUED UID(S)
	-----------------------------------------
	SET @cursor = CURSOR FOR 
		SELECT uid FROM @uid_table

	SET @i = 1
	SET @size = @xml.value('count(*/personGroup)', 'INT')

	OPEN @cursor

	WHILE (@i <= @size)
	BEGIN
		DECLARE @rowXML XML = @xml.query('*/personGroup[sql:variable("@i")]')
		
		-- GET UID, IF NOT THEN FETCH FROM NEWLY ISSUEDS.
		SET @uid = @rowXML.value('(*/@uid)[1]', 'BIGINT')
		
		IF (@uid IS NULL)
		BEGIN
			FETCH NEXT FROM @cursor INTO @uid

			SET @rowXML.modify('insert attribute uid {sql:variable("@uid")} into /*[1]')
		END

		-- MERGE PERSON
		EXEC private_merge_person @rowXML OUT

		-- SWAP
		SET @xml.modify('insert sql:variable("@rowXML") before (*/personGroup[sql:variable("@i")])[1]')
		SET @xml.modify('delete */personGroup[sql:variable("@i") + 1]')

		SET @i = @i + 1
	END
GO

CREATE PROCEDURE private_merge_face
	@xml XML OUTPUT
AS
	DECLARE @uid_table ISSUED_UID_TABLE

	DECLARE @pictureUID BIGINT = @xml.value('(*/@uid)[1]', 'BIGINT')

	-- DROP TRUNCATEDS
	DELETE F FROM Face F
	INNER JOIN 
	(
		SELECT uid FROM Face
		WHERE personUID = @pictureUID 
		
		EXCEPT

		SELECT X.C.value('@uid', 'BIGINT')
		FROM @xml.nodes('*/face') AS X(C)
	) T
	ON F.uid = T.uid;

	-----------------------------------------
	-- MERGE FACE
	-----------------------------------------
	Merge Face ORG
		USING
		(
			SELECT
				T.C.value('@uid', 'BIGINT') uid,
				T.C.value('parent::*/@uid', 'BIGINT') pictureUID,
				T.C.value('@personUID', 'BIGINT') personUID,
				T.C.value('@x', 'REAL') x,
				T.C.value('@y', 'REAL') y,
				T.C.value('@width', 'REAL') width,
				T.C.value('@height', 'REAL') height
			FROM @xml.nodes('*/face') T(C)
		) NEW
		ON ORG.uid = NEW.uid
	WHEN MATCHED THEN
		UPDATE SET
			pictureUID = NEW.pictureUID, personUID = NEW.personUID,
			x = NEW.x, y = NEW.y, width = NEW.width, height = NEW.height
	WHEN NOT MATCHED THEN
		INSERT VALUES
		(
			NEW.pictureUID, NEW.personUID,
			NEW.x, NEW.y, NEW.width, NEW.height
		)
		OUTPUT INSERTED.uid INTO @uid_table;

	-----------------------------------------
	-- ALLOCATE NEWLY ISSUED UID
	-----------------------------------------
	DECLARE @cursor CURSOR
	DECLARE @i INT = 1
	DECLARE @size INT = @xml.value('count(*/face)', 'INT')

	DECLARE @uid BIGINT
	DECLARE @rowXML XML

	-- CONSTRUCT CURSOR
	SET @cursor = CURSOR FOR
		SELECT uid FROM @uid_table

	OPEN @cursor

	-- ITERATE
	WHILE (@i <= @size)
	BEGIN
		SET @rowXML = @xml.query('*/face[sql:variable("@i")]')
		
		-- GET UID, IF NOT THEN FETCH FROM NEWLY ISSUEDS.
		SET @uid = @rowXML.value('(*/@uid)[1]', 'BIGINT')
		
		IF (@uid IS NULL)
		BEGIN
			FETCH NEXT FROM @cursor INTO @uid
			SET @rowXML.modify('insert attribute uid {sql:variable("@uid")} into /*[1]')
		END

		-- SWAP
		SET @xml.modify('insert sql:variable("@rowXML") before (*/face[sql:variable("@i")])[1]')
		SET @xml.modify('delete */face[sql:variable("@i") + 1]')

		SET @i = @i + 1
	END

	-----------------------------------------
	-- MERGE ATTRIBUTES
	-----------------------------------------
	-- FACE_ATTRIBUTES
	MERGE FaceAttributes ORG
		USING 
		(
			SELECT 
				T.C.value('parent::*/@uid', 'BIGINT') faceUID,
				T.C.value('@age', 'REAL') age,
				T.C.value('@gender', 'NVARCHAR(10)') gender,
				T.C.value('@smile', 'REAL') smile
			FROM @xml.nodes('picture/face/attributes') AS T(C)
		) NEW
			ON ORG.faceUID = NEW.faceUID
	WHEN NOT MATCHED THEN
		INSERT VALUES 
		(
			NEW.faceUID, 
			NEW.age, NEW.gender, NEW.smile
		)
	WHEN MATCHED THEN
		UPDATE SET 
			age = NEW.age, 
			gender = NEW.gender, 
			smile = NEW.smile;

	-- FACIAL_HAIR
	MERGE FacialHair ORG
		USING
		(
			SELECT
				T.C.value('parent::*/parent::*/@uid', 'BIGINT') faceUID,
				T.C.value('@mustache', 'REAL') mustache,
				T.C.value('@beard', 'REAL') beard,
				T.C.value('@sideburns', 'REAL') sideburns
			FROM @xml.nodes('picture/face/attributes/facialHair') AS T(C)
		) NEW
			ON ORG.faceUID = NEW.faceUID
	WHEN NOT MATCHED THEN 
		INSERT VALUES
		(
			NEW.faceUID,
			NEW.mustache, NEW.beard, NEW.sideburns
		)
	WHEN MATCHED THEN
		UPDATE SET 
			mustache = NEW.mustache, 
			beard = NEW.beard, 
			sideburns = NEW.sideburns;
			
	-- HEAD_POSE
	MERGE HeadPose ORG
		USING
		(
			SELECT
				T.C.value('parent::*/parent::*/@uid', 'BIGINT') faceUID,
				T.C.value('@roll', 'REAL') roll,
				T.C.value('@pitch', 'REAL') pitch,
				T.C.value('@yaw', 'REAL') yaw
			FROM @xml.nodes('picture/face/attributes/facialHair') AS T(C)
		) NEW
			ON ORG.faceUID = NEW.faceUID
	WHEN NOT MATCHED THEN 
		INSERT VALUES
		(
			NEW.faceUID,
			NEW.roll, NEW.pitch, NEW.yaw
		)
	WHEN MATCHED THEN
		UPDATE SET 
			roll = NEW.roll, 
			pitch = NEW.pitch, 
			yaw = NEW.yaw;

	-----------------------------------------
	-- MERGE LANDMARKS
	-----------------------------------------
	-- FACE_LANDMARKS
	MERGE FaceLandmarks ORG
		USING
		(
			SELECT T.C.value('@uid', 'BIGINT') faceUID
			FROM @xml.nodes('picture/face') AS T(C)
		) NEW
			ON ORG.faceUID = NEW.faceUID
	WHEN NOT MATCHED THEN
		INSERT VALUES (NEW.faceUID);

	-- EYEBROW
	MERGE Eyebrow ORG
		USING
		(
			SELECT
				T.C.value('parent::*/parent::*/parent::*/@uid', 'BIGINT') faceUID,
				1 AS direction,
				T.C.value('inner[1]/@x', 'REAL') innerX,
				T.C.value('inner[1]/@y', 'REAL') innerY,
				T.C.value('outer[1]/@x', 'REAL') outerX,
				T.C.value('outer[1]/@y', 'REAL') outerY
			FROM @xml.nodes('picture/face/landmarks/eyebrows/left') AS T(C)

			UNION ALL

			SELECT
				T.C.value('parent::*/parent::*/parent::*/@uid', 'BIGINT') faceUID,
				2 AS direction,
				T.C.value('inner[1]/@x', 'REAL') innerX,
				T.C.value('inner[1]/@y', 'REAL') innerY,
				T.C.value('outer[1]/@x', 'REAL') outerX,
				T.C.value('outer[1]/@y', 'REAL') outerY
			FROM @xml.nodes('picture/face/landmarks/eyebrows/right') AS T(C)

		) NEW
			ON ORG.faceUID = NEW.faceUID
	WHEN NOT MATCHED THEN 
		INSERT VALUES
		(
			NEW.faceUID, NEW.direction, 
			NEW.innerX, NEW.innerY,
			NEW.outerX, NEW.outerY
		)
	WHEN MATCHED THEN
		UPDATE SET
			innerX = NEW.innerX, innerY = NEW.innerY,
			outerX = NEW.outerX, outerY = NEW.outerY;

	-- EYE
	MERGE Eye ORG
		USING
		(
			SELECT
				T.C.value('parent::*/parent::*/parent::*/@uid', 'BIGINT') faceUID,
				1 AS direction,
				T.C.value('top[1]/@x', 'REAL') topX,
				T.C.value('top[1]/@y', 'REAL') topY,
				T.C.value('bottom[1]/@x', 'REAL') bottomX,
				T.C.value('bottom[1]/@y', 'REAL') bottomY,
				T.C.value('inner[1]/@x', 'REAL') innerX,
				T.C.value('inner[1]/@y', 'REAL') innerY,
				T.C.value('outer[1]/@x', 'REAL') outerX,
				T.C.value('outer[1]/@y', 'REAL') outerY
			FROM @xml.nodes('picture/face/landmarks/eye/left') AS T(C)

			UNION ALL

			SELECT
				T.C.value('parent::*/parent::*/parent::*/@uid', 'BIGINT') faceUID,
				2 AS direction,
				T.C.value('top[1]/@x', 'REAL') topX,
				T.C.value('top[1]/@y', 'REAL') topY,
				T.C.value('bottom[1]/@x', 'REAL') bottomX,
				T.C.value('bottom[1]/@y', 'REAL') bottomY,
				T.C.value('inner[1]/@x', 'REAL') innerX,
				T.C.value('inner[1]/@y', 'REAL') innerY,
				T.C.value('outer[1]/@x', 'REAL') outerX,
				T.C.value('outer[1]/@y', 'REAL') outerY
			FROM @xml.nodes('picture/face/landmarks/eye/right') AS T(C)
		) NEW
			ON ORG.faceUID = NEW.faceUID
	WHEN NOT MATCHED THEN 
		INSERT VALUES
		(
			NEW.faceUID, NEW.direction, 
			NEW.topX, NEW.topY,
			NEW.bottomX, NEW.bottomY,
			NEW.innerX, NEW.innerY,
			NEW.outerX, NEW.outerY
		)
	WHEN MATCHED THEN
		UPDATE SET
			topX = NEW.innerX, topY = NEW.topY,
			bottomX = NEW.innerX, bottomY = NEW.bottomY,
			innerX = NEW.innerX, innerY = NEW.innerY,
			outerX = NEW.outerX, outerY = NEW.outerY;

	-- PUPIL
	MERGE Pupil ORG
		USING
		(
			SELECT
				T.C.value('parent::*/parent::*/parent::*/parent::*/@uid', 'BIGINT') faceUID,
				1 AS direction,
				T.C.value('@x', 'REAL') x,
				T.C.value('@y', 'REAL') y
			FROM @xml.nodes('picture/face/landmarks/eye/left/pupil') AS T(C)

			UNION ALL

			SELECT
				T.C.value('parent::*/parent::*/parent::*/parent::*/@uid', 'BIGINT') faceUID,
				1 AS direction,
				T.C.value('@x', 'REAL') x,
				T.C.value('@y', 'REAL') y
			FROM @xml.nodes('picture/face/landmarks/eye/right/pupil') AS T(C)
		) NEW
			ON ORG.faceUID = NEW.faceUID
	WHEN NOT MATCHED THEN 
		INSERT VALUES
		(
			NEW.faceUID, NEW.direction, 
			NEW.x, NEW.y
		)
	WHEN MATCHED THEN
		UPDATE SET
			x = NEW.x, y = NEW.y;

	-- NOSE
	MERGE Nose ORG
		USING
		(
			SELECT
				T.C.value('parent::*/parent::*/@uid', 'BIGINT') faceUID,

				T.C.value('leftRoot[1]/@x', 'REAL') leftRootX,
				T.C.value('leftRoot[1]/@y', 'REAL') leftRootY,
				T.C.value('leftAlarTop[1]/@x', 'REAL') leftAlarTopX,
				T.C.value('leftAlarTop[1]/@y', 'REAL') leftAlarTopY,
				T.C.value('leftAlarOutTip[1]/@x', 'REAL') leftAlarOutTipX,
				T.C.value('leftAlarOutTip[1]/@y', 'REAL') leftAlarOutTipY,

				T.C.value('rightRoot[1]/@x', 'REAL') rightRootX,
				T.C.value('rightRoot[1]/@y', 'REAL') rightRootY,
				T.C.value('rightAlarTop[1]/@x', 'REAL') rightAlarTopX,
				T.C.value('rightAlarTop[1]/@y', 'REAL') rightAlarTopY,
				T.C.value('rightAlarOutTip[1]/@x', 'REAL') rightAlarOutTipX,
				T.C.value('rightAlarOutTip[1]/@y', 'REAL') rightAlarOutTipY
			FROM @xml.nodes('picture/face/landmarks/nose') AS T(C)
		) NEW
			ON ORG.faceUID = NEW.faceUID
	WHEN NOT MATCHED THEN 
		INSERT VALUES
		(
			NEW.faceUID,

			NEW.leftRootX, NEW.leftRootY,
			NEW.leftAlarTopX, NEW.leftAlarTopY,
			NEW.leftAlarOutTipX, NEW.leftAlarOutTipY,

			NEW.rightRootX, NEW.rightRootY,
			NEW.rightAlarTopX, NEW.rightAlarTopY,
			NEW.rightAlarOutTipX, NEW.rightAlarOutTipY
		)
	WHEN MATCHED THEN
		UPDATE SET 
			leftRootX = NEW.leftRootX, leftRootY = NEW.leftRootY,
			leftAlarTopX = NEW.leftAlarTopX, leftAlarTopY = NEW.leftAlarTopY,
			leftAlarOutTipX = NEW.leftAlarOutTipX, leftAlarOutTipY = NEW.leftAlarOutTipY,

			rightRootX = NEW.rightRootX, rightRootY = NEW.rightRootY,
			rightAlarTopX = NEW.rightAlarTopX, rightAlarTopY = NEW.rightAlarTopY,
			rightAlarOutTipX = NEW.rightAlarOutTipX, rightAlarOutTipY = NEW.rightAlarOutTipY;
	
	-- MOUTH
	MERGE Mouth ORG
		USING
		(
			SELECT
				T.C.value('parent::*/parent::*/@uid', 'BIGINT') faceUID,
				T.C.value('left[1]/@x', 'REAL') leftX,
				T.C.value('left[1]/@y', 'REAL') leftY,
				T.C.value('right[1]/@x', 'REAL') rightX,
				T.C.value('right[1]/@y', 'REAL') rightY
			FROM @xml.nodes('picture/face/landmarks/mouth') AS T(C)
		) NEW
			ON ORG.faceUID = NEW.faceUID
	WHEN NOT MATCHED THEN 
		INSERT VALUES
		(
			NEW.faceUID,
			NEW.leftX, NEW.leftY,
			NEW.rightX, NEW.rightY
		)
	WHEN MATCHED THEN
		UPDATE SET 
			leftX = NEW.leftX,
			leftY = NEW.leftY,
			rightX = NEW.rightX,
			rightY = NEW.rightY;
	
	-- LIP
	MERGE Lip ORG
		USING
		(
			SELECT
				T.C.value('parent::*/parent::*/parent::*/@uid', 'BIGINT') faceUID,
				T.C.value('upperTop[1]/@x', 'REAL') upperTopX,
				T.C.value('upperTop[1]/@y', 'REAL') upperTopY,
				T.C.value('upperBottom[1]/@x', 'REAL') upperBottomX,
				T.C.value('upperBottom[1]/@y', 'REAL') upperBottomY,
				T.C.value('underTop[1]/@x', 'REAL') underTopX,
				T.C.value('underTop[1]/@y', 'REAL') underTopY,
				T.C.value('underBottom[1]/@x', 'REAL') underBottomX,
				T.C.value('underBottom[1]/@y', 'REAL') underBottomY
			FROM @xml.nodes('picture/face/landmarks/mouth/lip') AS T(C)
		) NEW
			ON ORG.faceUID = NEW.faceUID
	WHEN NOT MATCHED THEN 
		INSERT VALUES
		(
			NEW.faceUID,
			NEW.upperTopX, NEW.upperTopY,
			NEW.upperBottomX, NEW.upperBottomY,
			NEW.underTopX, NEW.underTopY,
			NEW.underBottomX, NEW.underBottomY
		)
	WHEN MATCHED THEN
		UPDATE SET
			upperTopX = NEW.upperTopX,
			upperTopY = NEW.upperTopY,
			upperBottomX = NEW.upperBottomX,
			upperBottomY = NEW.upperBottomY,
			underTopX = NEW.underTopX,
			underTopY = NEW.underTopY,
			underBottomX = NEW.underBottomX,
			underBottomY = NEW.underBottomY;
GO

CREATE PROCEDURE private_merge_picture
	@xml XML OUTPUT
AS
	DECLARE @uid_table ISSUED_UID_TABLE

	-----------------------------------------
	-- MERGE PICTURE
	-----------------------------------------
	Merge Picture ORG
		USING
		(
			SELECT 
				T.C.value('@uid', 'BIGINT') uid,
				T.C.value('@name', 'NVARCHAR(100)') name,
				T.C.value('@url', 'NVARCHAR(1000)') url
			FROM @xml.nodes('*/picture') AS T(C)
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
	DECLARE @size INT = @xml.value('count(*/picture)', 'INT')

	DECLARE @rowXML XML
	DECLARE @uid BIGINT

	-- CONSTRUCT CURSOR
	DECLARE @cursor CURSOR
	SET @cursor = CURSOR FOR
		SELECT uid FROM @uid_table

	OPEN @cursor

	-- ITERATE
	WHILE (@i <= @size)
	BEGIN
		SET @rowXML = @xml.query('*/picture[sql:variable("@i")]')
		
		-- GET UID, IF NOT THEN FETCH FROM NEWLY ISSUEDS.
		SET @uid = @rowXML.value('(*/@uid)[1]', 'BIGINT')
		
		IF (@uid IS NULL)
		BEGIN
			FETCH NEXT FROM @cursor INTO @uid
			SET @rowXML.modify('insert attribute uid {sql:variable("@uid")} into /*[1]')
		END

		-- MERGE FACES
		EXEC private_merge_face @rowXML OUT

		-- SWAP
		SET @xml.modify('insert sql:variable("@rowXML") before (*/picture[sql:variable("@i")])[1]')
		SET @xml.modify('delete */picture[sql:variable("@i") + 1]')

		SET @i = @i + 1
	END
GO

CREATE PROCEDURE mergePersonGroup
	@xml XML
AS
	EXEC private_merge_person_group @xml OUT

	SELECT @xml;
GO
CREATE PROCEDURE mergePerson
	@xml XML
AS
	EXEC private_merge_person @xml OUT

	SELECT @xml;
GO

CREATE PROCEDURE mergePicture
	@xml XML
AS
	EXEC private_merge_picture @xml OUT

	SELECT @xml;
GO
CREATE PROCEDURE mergeFace
	@xml XML
AS
	EXEC private_merge_face @xml OUT

	SELECT @xml;
GO

CREATE PROCEDURE mergeFaceAPI
	@xml XML
AS
	DECLARE @personGroupArray XML = @xml.query('faceAPI/personGroupArray')
	DECLARE @pictureArray XML = @xml.query('faceAPI/pictureArray')

	EXEC private_merge_person_group @personGroupArray OUT
	EXEC private_merge_picture @pictureArray OUT

	-- SWAP
	SET @xml.modify('delete */personGroupArray[1]')
	SET @xml.modify('delete */pictureArray[1]')

	SET @xml.modify('insert sql:variable("@personGroupArray") into *[1]')
	SET @xml.modify('insert sql:variable("@pictureArray") into *[1]')

	SELECT @xml;
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