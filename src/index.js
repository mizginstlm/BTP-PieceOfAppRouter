import React, { createContext, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@ui5/webcomponents-react';
import Approve from './Approve';
import Mutabakat from './mutabakat';
import Print from './mutabakatscreen/print';
import reportWebVitals from './reportWebVitals';
import { fetchData, postRequest } from './core/helperApi';

export const GlobalContext = createContext();

const App = () => {

  const searchParams = new URLSearchParams(document.location.search)
  var page = searchParams.get('page');
  const initialState = {
    page: searchParams.get('page'),
    user: "Yükleniyor.." // İlk sayfa değerini burada alabilirsiniz
  };

  const [globalState, setGlobalState] = useState(initialState);
  const [globalLang, setGlobalLang] = useState(initialState);
  useEffect(() => {
    // API çağrısı yaparak verileri alın
    try {
      fetchData('getUserNameDisplay').then(response => {
        // JSON verisini sınıfa atama

        setGlobalState(prevState => ({
          ...prevState,
          user: response.data.d.results[0]
        }));
      }).catch(error => {

            });
    } catch (error) {
      console.error(error);
    }
    const languagefromFetch = "en"
    setGlobalLang(languagefromFetch);
  }, []);

  function ReturnApp() {
    if (globalState.page === 'mutabakat') {
      return <Mutabakat />;
    } else if (globalState.page === 'mutabakatApprove') {
      return <Approve />;
    } else if (globalState.page === 'print') {
      return <Print />;
    } else {
      return <Mutabakat />;
    }
  }
  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState ,globalLang,setGlobalLang}}>
      <ThemeProvider>
        <ReturnApp />
        <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', backgroundColor: 'transparent', textAlign: 'center' }}>
          <a href="" style={{ opacity: 0.5, color: 'white' }}>Powered by ...</a>
        </div>
      </ThemeProvider>
    </GlobalContext.Provider>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);

reportWebVitals();
