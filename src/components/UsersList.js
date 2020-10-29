import React, { useState } from 'react';

import List from './List';
import { LanguageContext } from '@/App';

export default function UsersList() {
    const [data, setData] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [loadedProfilePages, setLoadedProfilePages] = React.useState(0);
    const [followerInterval, setFollowerInterval] = React.useState(false);

    const [keys, setKeys] = useState({
        avatar_url: 1, 
        login: 1, 
        profile: { 
            name: 1,
            bio: 1, 
            followers: 1, 
            location: 1, 
            company: 1, 
        },
        id: 1, 
    });

    const { language } = React.useContext(LanguageContext);

    const fetchUsers = async () => {
        let url = 'https://api.github.com/search/users';
        const lastYearRange = new Date();
        lastYearRange.setFullYear(lastYearRange.getFullYear() - 1);
        let query = `
        ?q=created:${lastYearRange.toISOString().split('T')[0]}
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

        data.items.forEach( user => fetchUserProfile(user));
    }

    const fetchUserProfile = async (userObj) => {
        const url = `https://api.github.com/users/${userObj.login}`
        const response = await fetch(url);
        const data = await response.json();
        userObj.profile = {...data};
        setLoadedProfilePages(prevState => prevState + 1);
    }

    React.useEffect(() => {
        fetchUsers();
        const ONE_SECOND = 1000;
        const ONE_MINUTE = 60 * ONE_SECOND;

        setFollowerInterval(
            setInterval(() => {
                handleRefresh();
            }, 2 * ONE_MINUTE)
        );

        return () => {
            clearInterval(followerInterval)
        }
    }, []);

    React.useEffect(() => {
        if(isLoading && data != null) {
            setIsLoading(false);
        }
    }, [data])

    const handleRefresh = () => {
        setLoadedProfilePages(0);
        setIsLoading(true)
        setData(null);
        fetchUsers();
    }

    return (
        <section>
            <div style={{display: 'flex'}}>
                <h2 className="h4">
                    {language.Common.usersList}
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
            !isLoading && loadedProfilePages === 5
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