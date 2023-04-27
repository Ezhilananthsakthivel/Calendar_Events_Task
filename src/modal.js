import React from "react";
import "./modal.css"

function modal({ setModal, times }) {
    let from, to, sTime = [], eTime = []
    return (
        <div className="modal">
            <div className="modal_container">
                <h2>Events</h2>
                <div className="modal_pdiv">
                    {times.map((val) => {
                        sTime = val.startTime.split(" ")[4].split(":")
                        eTime = val.endTime.split(" ")[4].split(":")

                        if (sTime[0] > 12) {
                            from = sTime[0] - 12
                            to = eTime[0] - 12
                            from = from.toString().length == 1 ? `0${from}:${sTime[1]}PM` : `${from}:${sTime[1]}PM`
                            to = to.toString().length == 1 ? `0${to}:${eTime[1]}PM` : `${to}:${eTime[1]}PM`
                        }
                        else if (sTime[0] == "00") {
                            from = `12:${sTime[1]}AM`
                            to = `12:${eTime[1]}AM`
                        }
                        else {
                            from = `${sTime[0]}:${sTime[1]}AM`
                            to = `${eTime[0]}:${eTime[1]}AM`
                        }
                        return <p className="modalp" key={val.startTime}>{val.title} - <span>{from}</span> to <span>{to}</span></p>
                    })}
                </div>
                <button className="modal_btn" onClick={() => setModal(false)}>Close</button>
            </div>
        </div>
    );
}

export default modal