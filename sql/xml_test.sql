USE FaceAPI

IF OBJECT_ID('testXML') IS NOT NULL
	DROP PROCEDURE testXML
GO

DECLARE @xml XML =
N'<faceAPI>
  <personGroupArray>
    <personGroup name="family">
      <person name="Father" />
      <person name="Mother" />
    </personGroup>
    <personGroup name="class">
      <person name="John" />
      <person name="Kevin" />
      <person name="Mary" />
    </personGroup>
  </personGroupArray>
  <pictureArray>
    <picture name="나들이" url="river.jpg">
      <face x="4.0000000e+001" y="4.0000000e+001" width="2.0000000e+001" height="2.0000000e+001">
        <attributes age="4.0000000e+001" gender="maie" smile="5.0938421e-001">
          <facialHair mustache="2.3383754e-001" beard="1.0491486e-001" sideburns="7.8429419e-001" />
          <headPose roll="1.8714091e-001" pitch="7.2188973e-001" yaw="9.5147002e-001" />
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
            <lip>
              <upperTop x="9.7781390e-001" y="7.3981589e-001" />
              <upperBottom x="5.1119781e-001" y="9.0548560e-002" />
              <underTop x="9.9496627e-001" y="1.3557176e-001" />
              <underBottom x="4.1160268e-001" y="9.2153603e-001" />
            </lip>
          </mouth>
        </landmarks>
      </face>
      <face x="6.2000000e+001" y="4.0000000e+001" width="2.5000000e+001" height="2.5000000e+001">
        <attributes age="4.0000000e+001" gender="female" smile="6.3849235e-001">
          <facialHair mustache="2.3383754e-001" beard="1.0491486e-001" sideburns="7.8429419e-001" />
          <headPose roll="1.8714091e-001" pitch="7.2188973e-001" yaw="9.5147002e-001" />
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
            <lip>
              <upperTop x="9.7781390e-001" y="7.3981589e-001" />
              <upperBottom x="5.1119781e-001" y="9.0548560e-002" />
              <underTop x="9.9496627e-001" y="1.3557176e-001" />
              <underBottom x="4.1160268e-001" y="9.2153603e-001" />
            </lip>
          </mouth>
        </landmarks>
      </face>
    </picture>
    <picture name="단체사진" url="group.jpg">
      <face x="8.9000000e+001" y="4.0000000e+001" width="2.1000000e+001" height="2.1000000e+001" />
      <face x="1.1100000e+002" y="4.0000000e+001" width="2.2000000e+001" height="2.2000000e+001">
        <attributes age="1.7000000e+001" gender="maie" smile="8.6967480e-001">
          <facialHair mustache="2.3383754e-001" beard="1.0491486e-001" sideburns="7.8429419e-001" />
          <headPose roll="1.8714091e-001" pitch="7.2188973e-001" yaw="9.5147002e-001" />
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
            <lip>
              <upperTop x="9.7781390e-001" y="7.3981589e-001" />
              <upperBottom x="5.1119781e-001" y="9.0548560e-002" />
              <underTop x="9.9496627e-001" y="1.3557176e-001" />
              <underBottom x="4.1160268e-001" y="9.2153603e-001" />
            </lip>
          </mouth>
        </landmarks>
      </face>
      <face x="1.3400000e+002" y="4.0000000e+001" width="1.9000000e+001" height="1.8000000e+001">
        <attributes age="1.9000000e+001" gender="female" smile="1.8959200e-001">
          <facialHair mustache="2.3383754e-001" beard="1.0491486e-001" sideburns="7.8429419e-001" />
          <headPose roll="1.8714091e-001" pitch="7.2188973e-001" yaw="9.5147002e-001" />
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
            <lip>
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
DECLARE @personGroupArray XML = @xml.query('*/personGroupArray')
DECLARE @pictureArray XML = @xml.query('*/pictureArray')

EXEC mergeFaceAPI @xml