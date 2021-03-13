import React from 'react';
import { useLocation } from "react-router-dom";

const ContestDetailPage = (props) => {
    let location = useLocation();
    var selectedContestId = props.match.params.id;
    var selectedContest = null;

    selectedContest = location.state.filter(data => {
        return (data.id == selectedContestId)
    });

    return (
        <div className="detailsBox">
            <h1>Details of the contest</h1>
            <hr />
            <p><b>ID</b> - {selectedContest[0].id}</p>
            <p><b>NAME</b>           - {selectedContest[0].name}</p>
            <p><b>TYPE</b>            - {selectedContest[0].type}</p>
            <p><b>PHASE</b>            - {selectedContest[0].phase}</p>
            <p><b>DURATION SECONDS</b> - {selectedContest[0].durationSeconds}</p>
        </div>
    )

}

export default ContestDetailPage