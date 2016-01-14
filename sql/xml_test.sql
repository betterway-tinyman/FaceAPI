USE FaceAPI

DECLARE @xml XML = 
N'<faceAPI>
  <personGroupArray>
    <personGroup uid="5" name="family">
      <person uid="11" groupUID="5" name="Father" />
      <person uid="12" groupUID="5" name="Mother" />
    </personGroup>
    <personGroup uid="6" name="class">
      <person uid="13" groupUID="6" name="John" />
      <person uid="14" groupUID="6" name="Kevin" />
      <person uid="15" groupUID="6" name="Mary" />
    </personGroup>
  </personGroupArray>
  <pictureArray>
    <picture uid="5" name="나들이" url="river.jpg">
      <face uid="11" pictureUID="5" personUID="11" x="4.0000000e+001" y="4.0000000e+001" width="2.0000000e+001" height="2.0000000e+001">
        <attributes faceUID="11" age="4.0000000e+001" gender="maie" smile="5.0938421e-001">
          <facialHair faceUID="11" mustache="2.3383754e-001" beard="1.0491486e-001" sideburns="7.8429419e-001" />
          <headPose faceUID="11" roll="1.8714091e-001" pitch="7.2188973e-001" yaw="9.5147002e-001" />
        </attributes>
        <landmarks>
          <eyebrows>
            <left>
              <inner x="2.3948540e-001" y="4.0791568e-001" />
              <outer x="7.6403081e-001" y="5.6305051e-001" />
            </left>
            <right>
              <inner x="1.8006134e-001" y="8.3177543e-001" />
              <outer x="2.1208546e-001" y="9.8461453e-003" />
            </right>
          </eyebrows>
          <eyes>
            <left>
              <top x="4.7848787e-002" y="2.5247675e-001" />
              <bottom x="3.6162731e-001" y="6.0946798e-001" />
              <inner x="1.8105972e-001" y="3.9221051e-001" />
              <outer x="7.3068283e-002" y="3.0233430e-002" />
              <pupil x="7.7429301e-001" y="7.2052270e-001" />
            </left>
            <right>
              <top x="4.7848787e-002" y="2.5247675e-001" />
              <bottom x="3.6162731e-001" y="6.0946798e-001" />
              <inner x="1.8105972e-001" y="3.9221051e-001" />
              <outer x="7.3068283e-002" y="3.0233430e-002" />
              <pupil x="7.7429301e-001" y="7.2052270e-001" />
            </right>
          </eyes>
          <nose>
            <leftRoot x="2.1330051e-001" y="3.5821193e-001" />
            <leftAlarTop x="8.9233947e-001" y="6.1727695e-002" />
            <leftAlarOutTip x="2.6958112e-002" y="5.6189650e-001" />
            <rightRoot x="2.4178821e-001" y="3.6297676e-001" />
            <rightAlarTop x="4.9266186e-001" y="2.9628882e-001" />
            <rightRoot x="2.2637373e-001" y="5.7587481e-001" />
          </nose>
          <mouth>
            <left x="3.8429686e-001" y="7.9113817e-001" />
            <right x="4.7643664e-001" y="1.5811028e-001" />
            <lip faceUID="11">
              <upperTop x="9.7781390e-001" y="7.3981589e-001" />
              <upperBottom x="5.1119781e-001" y="9.0548560e-002" />
              <underTop x="9.9496627e-001" y="1.3557176e-001" />
              <underBottom x="4.1160268e-001" y="9.2153603e-001" />
            </lip>
          </mouth>
        </landmarks>
      </face>
      <face uid="12" pictureUID="5" personUID="12" x="6.2000000e+001" y="4.0000000e+001" width="2.5000000e+001" height="2.5000000e+001">
        <attributes faceUID="12" age="4.0000000e+001" gender="female" smile="6.3849235e-001">
          <facialHair faceUID="12" mustache="2.3383754e-001" beard="1.0491486e-001" sideburns="7.8429419e-001" />
          <headPose faceUID="12" roll="1.8714091e-001" pitch="7.2188973e-001" yaw="9.5147002e-001" />
        </attributes>
        <landmarks>
          <eyebrows>
            <left>
              <inner x="2.3948540e-001" y="4.0791568e-001" />
              <outer x="7.6403081e-001" y="5.6305051e-001" />
            </left>
            <right>
              <inner x="1.8006134e-001" y="8.3177543e-001" />
              <outer x="2.1208546e-001" y="9.8461453e-003" />
            </right>
          </eyebrows>
          <eyes>
            <left>
              <top x="4.7848787e-002" y="2.5247675e-001" />
              <bottom x="3.6162731e-001" y="6.0946798e-001" />
              <inner x="1.8105972e-001" y="3.9221051e-001" />
              <outer x="7.3068283e-002" y="3.0233430e-002" />
              <pupil x="7.7429301e-001" y="7.2052270e-001" />
            </left>
            <right>
              <top x="4.7848787e-002" y="2.5247675e-001" />
              <bottom x="3.6162731e-001" y="6.0946798e-001" />
              <inner x="1.8105972e-001" y="3.9221051e-001" />
              <outer x="7.3068283e-002" y="3.0233430e-002" />
              <pupil x="7.7429301e-001" y="7.2052270e-001" />
            </right>
          </eyes>
          <nose>
            <leftRoot x="2.1330051e-001" y="3.5821193e-001" />
            <leftAlarTop x="8.9233947e-001" y="6.1727695e-002" />
            <leftAlarOutTip x="2.6958112e-002" y="5.6189650e-001" />
            <rightRoot x="2.4178821e-001" y="3.6297676e-001" />
            <rightAlarTop x="4.9266186e-001" y="2.9628882e-001" />
            <rightRoot x="2.2637373e-001" y="5.7587481e-001" />
          </nose>
          <mouth>
            <left x="3.8429686e-001" y="7.9113817e-001" />
            <right x="4.7643664e-001" y="1.5811028e-001" />
            <lip faceUID="12">
              <upperTop x="9.7781390e-001" y="7.3981589e-001" />
              <upperBottom x="5.1119781e-001" y="9.0548560e-002" />
              <underTop x="9.9496627e-001" y="1.3557176e-001" />
              <underBottom x="4.1160268e-001" y="9.2153603e-001" />
            </lip>
          </mouth>
        </landmarks>
      </face>
    </picture>
    <picture uid="6" name="단체사진" url="group.jpg">
      <face uid="13" pictureUID="6" personUID="13" x="8.9000000e+001" y="4.0000000e+001" width="2.1000000e+001" height="2.1000000e+001" />
      <face uid="14" pictureUID="6" personUID="14" x="1.1100000e+002" y="4.0000000e+001" width="2.2000000e+001" height="2.2000000e+001">
        <attributes faceUID="14" age="1.7000000e+001" gender="maie" smile="8.6967480e-001">
          <facialHair faceUID="14" mustache="2.3383754e-001" beard="1.0491486e-001" sideburns="7.8429419e-001" />
          <headPose faceUID="14" roll="1.8714091e-001" pitch="7.2188973e-001" yaw="9.5147002e-001" />
        </attributes>
        <landmarks>
          <eyebrows>
            <left>
              <inner x="2.3948540e-001" y="4.0791568e-001" />
              <outer x="7.6403081e-001" y="5.6305051e-001" />
            </left>
            <right>
              <inner x="1.8006134e-001" y="8.3177543e-001" />
              <outer x="2.1208546e-001" y="9.8461453e-003" />
            </right>
          </eyebrows>
          <eyes>
            <left>
              <top x="4.7848787e-002" y="2.5247675e-001" />
              <bottom x="3.6162731e-001" y="6.0946798e-001" />
              <inner x="1.8105972e-001" y="3.9221051e-001" />
              <outer x="7.3068283e-002" y="3.0233430e-002" />
              <pupil x="7.7429301e-001" y="7.2052270e-001" />
            </left>
            <right>
              <top x="4.7848787e-002" y="2.5247675e-001" />
              <bottom x="3.6162731e-001" y="6.0946798e-001" />
              <inner x="1.8105972e-001" y="3.9221051e-001" />
              <outer x="7.3068283e-002" y="3.0233430e-002" />
              <pupil x="7.7429301e-001" y="7.2052270e-001" />
            </right>
          </eyes>
          <nose>
            <leftRoot x="2.1330051e-001" y="3.5821193e-001" />
            <leftAlarTop x="8.9233947e-001" y="6.1727695e-002" />
            <leftAlarOutTip x="2.6958112e-002" y="5.6189650e-001" />
            <rightRoot x="2.4178821e-001" y="3.6297676e-001" />
            <rightAlarTop x="4.9266186e-001" y="2.9628882e-001" />
            <rightRoot x="2.2637373e-001" y="5.7587481e-001" />
          </nose>
          <mouth>
            <left x="3.8429686e-001" y="7.9113817e-001" />
            <right x="4.7643664e-001" y="1.5811028e-001" />
            <lip faceUID="14">
              <upperTop x="9.7781390e-001" y="7.3981589e-001" />
              <upperBottom x="5.1119781e-001" y="9.0548560e-002" />
              <underTop x="9.9496627e-001" y="1.3557176e-001" />
              <underBottom x="4.1160268e-001" y="9.2153603e-001" />
            </lip>
          </mouth>
        </landmarks>
      </face>
      <face uid="15" pictureUID="6" personUID="15" x="1.3400000e+002" y="4.0000000e+001" width="1.9000000e+001" height="1.8000000e+001">
        <attributes faceUID="15" age="1.9000000e+001" gender="female" smile="1.8959200e-001">
          <facialHair faceUID="15" mustache="2.3383754e-001" beard="1.0491486e-001" sideburns="7.8429419e-001" />
          <headPose faceUID="15" roll="1.8714091e-001" pitch="7.2188973e-001" yaw="9.5147002e-001" />
        </attributes>
        <landmarks>
          <eyebrows>
            <left>
              <inner x="2.3948540e-001" y="4.0791568e-001" />
              <outer x="7.6403081e-001" y="5.6305051e-001" />
            </left>
            <right>
              <inner x="1.8006134e-001" y="8.3177543e-001" />
              <outer x="2.1208546e-001" y="9.8461453e-003" />
            </right>
          </eyebrows>
          <eyes>
            <left>
              <top x="4.7848787e-002" y="2.5247675e-001" />
              <bottom x="3.6162731e-001" y="6.0946798e-001" />
              <inner x="1.8105972e-001" y="3.9221051e-001" />
              <outer x="7.3068283e-002" y="3.0233430e-002" />
              <pupil x="7.7429301e-001" y="7.2052270e-001" />
            </left>
            <right>
              <top x="4.7848787e-002" y="2.5247675e-001" />
              <bottom x="3.6162731e-001" y="6.0946798e-001" />
              <inner x="1.8105972e-001" y="3.9221051e-001" />
              <outer x="7.3068283e-002" y="3.0233430e-002" />
              <pupil x="7.7429301e-001" y="7.2052270e-001" />
            </right>
          </eyes>
          <nose>
            <leftRoot x="2.1330051e-001" y="3.5821193e-001" />
            <leftAlarTop x="8.9233947e-001" y="6.1727695e-002" />
            <leftAlarOutTip x="2.6958112e-002" y="5.6189650e-001" />
            <rightRoot x="2.4178821e-001" y="3.6297676e-001" />
            <rightAlarTop x="4.9266186e-001" y="2.9628882e-001" />
            <rightRoot x="2.2637373e-001" y="5.7587481e-001" />
          </nose>
          <mouth>
            <left x="3.8429686e-001" y="7.9113817e-001" />
            <right x="4.7643664e-001" y="1.5811028e-001" />
            <lip faceUID="15">
              <upperTop x="9.7781390e-001" y="7.3981589e-001" />
              <upperBottom x="5.1119781e-001" y="9.0548560e-002" />
              <underTop x="9.9496627e-001" y="1.3557176e-001" />
              <underBottom x="4.1160268e-001" y="9.2153603e-001" />
            </lip>
          </mouth>
        </landmarks>
      </face>
    </picture>
  </pictureArray>
</faceAPI>'

DECLARE @size INT = @xml.value('count(faceAPI/personGroupArray/personGroup)', 'INT')
DECLARE @person XML = @xml.query('faceAPI/personGroupArray/personGroup[2]/person')

SELECT 
	T.C.value('@uid',' BIGINT'),
	T.C.value('@name', 'NVARCHAR(100)'),
	T.C.value('@fake', 'INT'),
	T.C.value('parent::*/@uid', 'BIGINT') groupUID
FROM @xml.nodes('faceAPI/personGroupArray/personGroup/person') AS T(C);

SELECT 
	T.C.value('@uid',' BIGINT')
FROM @xml.nodes('faceAPI/pictureArray/picture/face') AS T(C);