import React from "react";
import "./modal.css"

function modal({ setModal, times }) {
    //const [show, setShow] = useState(false)
    let from, to, sTime = [], eTime = []

    function tConvert(time) {
        if (time[0] > 12) {
            time[0] = time[0] - 12
            time[0] = time[0].toString().length == 1 ? `0${time[0]}` : time[0]
            time[1] += "PM"
        }
        else if (time[0] == "00") {
            time[0] = "12"
            time[1] += "AM"
        }
        else if (time[0] == "12") {
            time[1] += "PM"
        }
        else {
            time[1] += "AM"
        }
        return time.join(":")
    }

    return (
        <div className="modal">
            <div className="modal_container">
                <h2>Events</h2>
                {/* <button className="modal_add" >Add</button> */}
                <div className="modal_pdiv">
                    <table>
                        <tr>
                            <th>Time</th>
                            <th>Event</th>
                        </tr>
                        {times.map((val) => {
                            sTime = val.startTime.split(" ")[4].split(":")
                            eTime = val.endTime.split(" ")[4].split(":")
                            sTime.length = 2
                            eTime.length = 2
                            console.log(sTime)
                            from = tConvert(sTime)
                            to = tConvert(eTime)
                            return <tr key={val.startTime}><td>{from} to {to}</td><td>{val.title}</td></tr>
                        })}
                    </table>
                </div>
                <button className="modal_btn" onClick={() => setModal(false)}>Close</button>
            </div>
        </div>
    );
}

export default modal