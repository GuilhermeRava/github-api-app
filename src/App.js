import React from 'react';

import UsersList from '@/components/UsersList';
import RepoList from '@/components/RepoList';
import Languages from '@/i18n';

const LanguageContext = React.createContext({
    language: {...Languages},
})
LanguageContext.displayName = 'LanguageContext';

export {
    LanguageContext
};

export default function App(props) {
    const [language, setLanguage] = React.useState('PT');

    return (
        <LanguageContext.Provider value={{
            language: Languages[language],
        }}>
            <React.Fragment>
                <div className="app">
                    <header>
                        <h1 className="text-center">{Languages[language].Common.mainPageHeader}</h1>
                    </header>
                    <main>
                        <UsersList />
                        <RepoList />
                    </main>
                </div>
            </React.Fragment>
        </LanguageContext.Provider>
    )
};