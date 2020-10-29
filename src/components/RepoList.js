import React, { useState } from 'react';

import List from './List';
import { LanguageContext } from '@/App';

export default function RepoList() {
    const [data, setData] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);

    const [keys, setKeys] = useState({
        name: 1,
        full_name: 1,
        description: 1,
        stargazers_count: 1,
        id: 1, 
    });

    const { language } = React.useContext(LanguageContext);

    const fetchRepos = async () => {
        let url = 'https://api.github.com/search/repositories';
        const lastMonthRange = new Date();
        lastMonthRange.setUTCMonth(lastMonthRange.getUTCMonth() - 1);
        let query = `
        ?q=created:${lastMonthRange.toISOString().split('T')[0]}
        &sort=followers
        &order=desc
        &per_page=5
        `;

        const finalUrl = url + query.replace(/\s+/g, '').trim();

        const response = await fetch(finalUrl, { 
            method: 'GET', 
            headers: {
                Accept: "application/vnd.github.v3+json",
            },
        });

        const data = await response.json();

        setData(data.items);
    }

    React.useEffect(() => {
        fetchRepos();
    }, []);

    React.useEffect(() => {
        if(isLoading && data != null) {
            setIsLoading(false);
        }
    }, [data])

    const handleRefresh = () => {
        setIsLoading(true);
        setData(null);
        fetchRepos();
    }

    return (
        <section>
            <div style={{display: 'flex'}}>
                <h2 className="h4">
                    {language.Common.repoList}
                </h2>
                <button 
                    onClick={handleRefresh}
                    style={{marginLeft: '15px'}} 
                    type="button" 
                    className="button"
                >
                    {language.Common.refresh}
                </button>
            </div>
        {
            !isLoading
            ? <List
                data={data}
                fieldsToShow={keys}
            />
            : <p>
                {language.Common.loading}
            </p>
        }
        </section>
    )
}