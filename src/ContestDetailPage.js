import React from 'react';
import { useLocation } from "react-router-dom";

const ContestDetailPage = (props) => {
    let location = useLocation();
    var selectedContestId = props.match.params.id;
    var selectedContest = null;

    selectedContest = location.state.contests.filter(data => {
        return (data.id == selectedContestId)
    });

   //console.log(selectedContest)
    return (
        <div>
            <h1>Details of the contest</h1>
            <p>ID               - {selectedContest[0].id}</p>
            <p>NAME             - {selectedContest[0].name}</p>
            <p>TYPE             - {selectedContest[0].type}</p>
            <p>PHASE            - {selectedContest[0].phase}</p>
            <p>DURATION SECONDS - {selectedContest[0].durationSeconds}</p>
        </div>
    )

}

export default ContestDetailPage