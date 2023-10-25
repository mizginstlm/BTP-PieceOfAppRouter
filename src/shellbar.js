import { useEffect, useMemo, useRef, useState,useContext } from 'react';
import { ShellBar, Avatar, ShellBarItem, Label, StandardListItem, Button } from '@ui5/webcomponents-react';
import { fetchData, postRequest } from './core/helperApi';

import { GlobalContext } from './index';
function shellbar() {


  const { globalLang, setGlobalLang } = useContext(GlobalContext);

  useEffect(() => {
    // Yalnızca bir kez çalışacak olan kodu buraya yerleştirin
    getUserData();

  }, []);

  function getContentByLanguage(key, language) {
    // Return content based on key and language
    // You can use localization libraries or custom logic here
    if (language === 'tr') {
      switch (key) {
        case 'headerHr':
          return 'HR Zone Mutabakat"';
        case 'logOut':
          return 'Çıkış Yap';
        case 'annualBalanceTable':
              return 'Yıllık İzin Bakiyesi Tablo-1';
// Add more translations as needed
        default:
          return '';
      }
    } else if (language === 'en') {
      switch (key) {
        case 'headerHr':
          return 'HR Zone Reconciliation';
        case 'logOut':
          return 'Log Out';
        case 'annualBalanceTable':
              return 'Annual Leave Balance - Table 1';
// Add more translations as needed
        default:
          return '';
      }
      console.log(key, language)
    }
  }
  async function logOut() {
    try {

      fetchData('logout').then(response => {
        window.location.reload();
        setUserData(response.data.d.results[0]);
      })
        .catch(error => {

        });
    } catch (error) {
      console.error(error);
    }

  }
  async function getUserData() {


    try {
      fetchData('getUserNameDisplay').then(response => {
        // JSON verisini sınıfa atama

        setUserData(response.data.d.results[0]);
      })
        .catch(error => {

        });
    } catch (error) {
      console.error(error);
    }

  }

  async function onProfileClick(e) {

    const popoverElement = document.getElementById("popover");
    if (popoverElement) {
      popoverElement.showAt(e.detail.targetRef);
    }

  }

  const [userData, setUserData] = useState(0);
  return (
    <>
      <ui5-popover id="popover" placement-type="Bottom">
        <div class="popover-header">
          <ui5-title style={{ padding: '0.25rem 1rem 0rem 1rem' }}>{userData.defaultFullName}</ui5-title>
        </div>
        <div class="popover-content">
          <ui5-list separators="None" >
            {/* <ui5-li icon="sys-find">{userData.defaultFullName}</ui5-li> */}
            <ui5-li onClick={() => logOut()} icon="log">{getContentByLanguage('logOut', globalLang)}</ui5-li>
          </ui5-list>
        </div>
      </ui5-popover>
      <ShellBar
        logo={<img alt="SAP Logo" width={'100px'} height={'100px'} src={require('./img/yildirimlogo.png')}  />}
        primaryTitle={getContentByLanguage('headerHr', globalLang)}
        onProfileClick={(e) => onProfileClick(e)}

        // profile={<Label style={{ marginRight: '100px', color: 'white' }} color='white'>{userData.defaultFullName}</Label>}
        profile={<Avatar><img src="png" /></Avatar>}
      >

      </ShellBar>
    </>

  );
}

export default shellbar;