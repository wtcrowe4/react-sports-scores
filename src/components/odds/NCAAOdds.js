import { useState, useEffect } from 'react';

const NCAAOdds = () => {
    const [oddsArray, setOddsArray] = useState([]);

    useEffect(() => {
        const RapidAPIKey = process.env.REACT_APP_RAPIDAPIKEY
        const options = {
            method: 'GET',
            headers: {
            'X-RapidAPI-Key': RapidAPIKey,
              'X-RapidAPI-Host': 'odds.p.rapidapi.com'
            }
        };
        fetch('https://odds.p.rapidapi.com/v4/sports/americanfootball_ncaaf/odds?regions=us&oddsFormat=decimal&markets=h2h%2Cspreads&dateFormat=iso', options)
        .then(response => response.json())
        .then(response => setOddsArray(response))
        .catch(err => console.error(err))
    }, []);

    if(oddsArray.length > 0 ) {
        console.log(oddsArray)
        const displayOdds = oddsArray.map(oddsArray => {
            //Format the time
            const startTime = new Date(oddsArray.commence_time);
            const hour = startTime.getHours();
            const minute = startTime.getMinutes();
            const formattedMinute = minute < 10 ? `0${minute}` : minute;
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const formattedHour = hour % 12 || 12;
            const formattedTime = `${formattedHour}:${formattedMinute} ${ampm}`;
            //Getting the date
            const date = new Date(oddsArray.commence_time);
            const day = date.getDate();
            const month = date.getMonth();
            
            if (oddsArray.bookmakers[0] === undefined) {
                return (
                    <div className='singleGameDiv' key={oddsArray.id}>
                        <div className='dateDiv'>
                            <h4>{formattedTime}</h4>
                            <h4>{month}/{day}</h4>
                        </div>
                        <div className='teamDiv'>
                            <h4>{oddsArray.away_team}</h4>
                            <br></br>
                            <h4>{oddsArray.home_team}</h4>
                        </div>
                        <div className='scoreDiv'>
                            <h4>NO ODDS</h4>
                            <br></br>
                            <h4>NO ODDS</h4>
                        </div>
                    </div>
                )
            } else {
            if (oddsArray.bookmakers[0].markets[1] === undefined) {
                const homeOdds = oddsArray.bookmakers[0].markets[0].outcomes[0].point
                const awayOdds = oddsArray.bookmakers[0].markets[0].outcomes[1].point
                console.log(homeOdds)
                console.log(awayOdds)
                if (homeOdds === undefined || awayOdds === undefined) {
                    return (
                        <div className='singleGameDiv' key={oddsArray.id}>
                            <div className='dateDiv'>
                                <h4>{formattedTime}</h4>
                                <h4>{month}/{day}</h4>
                            </div>
                            <div className='teamDiv'>
                                <h4>{oddsArray.away_team}</h4>
                                <br></br>
                                <h4>{oddsArray.home_team}</h4>
                            </div>
                            <div className='scoreDiv'>
                                <h4>Not Available</h4>
                                <br></br>
                                <h4>Not Available</h4>
                            </div>
                        </div>
                    )
                } else {

                    return (
                        <div className='singleGameDiv' key={oddsArray.id}>
                            <div className='dateDiv'>
                                <h4>{formattedTime}</h4>
                                <h4>{month}/{day}</h4>
                            </div>
                            <div className='teamDiv'>
                                <h4>{oddsArray.away_team}</h4>
                                <br></br>
                                <h4>{oddsArray.home_team}</h4>
                            </div>
                            <div className='scoreDiv'>
                                <h4>{awayOdds}</h4>
                                <br></br>
                                <h4>{homeOdds}</h4>
                            </div>
                        </div>
                    )
                }
            } else{
            const homeOdds = oddsArray.bookmakers[0].markets[1].outcomes[0].point
            const awayOdds = oddsArray.bookmakers[0].markets[1].outcomes[1].point
            
            return (
             
                    <div className='singleGameDiv' key={oddsArray.id}>
                        <div className='dateDiv'>
                            <h4>{formattedTime}</h4>
                            <h4>{month}/{day}</h4>
                        </div>
                        {/* <h4>{bookmaker}</h4> */}
                        <div className='teamDiv'>
                            <h4>{oddsArray.away_team}</h4> 
                            <br></br>
                            <h4>{oddsArray.home_team}</h4>
                        </div>
                        <div className='scoreDiv'>
                            
                            <h4>{awayOdds}</h4>
                            <br></br>
                            <h4>{homeOdds}</h4>
                        </div>
                        
                    </div>
                    
                )
            }
        }
        })
    return (
        <div className='displayDiv'>
            <title>NCAA Odds</title>
            <h2>NCAA Odds</h2>
            {displayOdds}
            <img src="https://clemsontigers.com/wp-content/uploads/2018/07/08.31.13.death_.valley.stadium.clemson.1-e1469397100117.jpg" alt="baseball stadium" style={{width: '100vw', position: 'absolute', zIndex: '-1'}} />
        </div>
    )
} else {
    return (
        <div className='displayDiv'>
            <title>NCAA Odds</title>
            <h2>NCAA Odds</h2>
            <p>Loading...</p>
        </div>
    )
}
}

export default NCAAOdds;