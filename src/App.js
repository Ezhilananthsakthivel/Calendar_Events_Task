import { useState } from 'react';
import './App.css';
import jsonData from './sample-data.json'
import Modal from './modal'

function App() {

  const years = [...new Set(jsonData.map((val) => val.startTime.split(" ")[3]))]
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const data = jsonData
    .sort((a, b) => a.startTime.split(" ")[2] - b.startTime.split(" ")[2])
    .sort((a, b) => months.indexOf(a.startTime.split(" ")[1]) - months.indexOf(b.startTime.split(" ")[1]))
    .sort((a, b) => a.startTime.split(" ")[3] - b.startTime.split(" ")[3])

  const [modal, setModal] = useState(false)
  const [month, setMonth] = useState(data[0].startTime.split(" ")[1])
  const [year, setYear] = useState(data[0].startTime.split(" ")[3])
  const [times, setTimes] = useState([])
  const tmonths = months.length
  const tyears = years.length
  let mpos = months.indexOf(month)
  let ypos = years.indexOf(year)


  const list = data.filter((val) => val.startTime.split(" ")[1] == month && val.startTime.split(" ")[3] == year)

  let date = Object.values(list.reduce((acc, curr) => {
    acc[curr.startTime.split(" ")[2]] = curr.startTime
    return acc
  }, {}))
  date = date.sort((a, b) => a.split(" ")[2] - b.split(" ")[2])


  const datebtn = (v) => {
    setTimes(list.filter((val) => val.startTime.split(" ")[2] == v.split(" ")[2]))
    setModal(true)
  }

  const prefun = () => {
    if (mpos == 0 && ypos != 0) {
      setYear(years[--ypos])
      setMonth(months[tmonths - 1])
    }
    else if (mpos == 0)
      setMonth(months[0])
    else
      setMonth(months[--mpos])
  }

  const nextfun = () => {
    if (mpos == tmonths - 1 && ypos != tyears - 1) {
      setMonth(months[0])
      setYear(years[++ypos])
    }
    else if (mpos == tmonths - 1)
      setMonth(months[tmonths - 1])
    else
      setMonth(months[++mpos])
  }


  return (
    <div className='body'>
      <h2 className='apptitle'>H I...</h2>
      <div className="navbar" >
        <span className="nav_logo">WIZZMOD</span>

        <div>
          <ul>
            <li><button className='prebtn' onClick={prefun}>Previous</button></li>
            <li>
              <select value={month} onChange={(e) => setMonth(e.target.value)}>
                {
                  months.map((val) => <option key={val} value={val}>{val}</option>)
                }
              </select>
            </li>
            <li>
              <select value={year} onChange={(e) => setYear(e.target.value)}>
                {
                  years.map((val) => <option key={val} value={val}>{val}</option>)
                }
              </select>
            </li>
            <li><button className='nexbtn' onClick={nextfun}>Next</button></li>
          </ul>
        </div>
      </div>

      <div className='dates'>
        {date.map((val) => {
          return <button className='dbtn' key={val} onClick={() => datebtn(val)}><span className='day_span'>{val.split(" ")[0]}</span>  <span className='date_span'>{val.split(" ")[2]}</span></button>
        })
        }
      </div>

      {
        modal &&
        <Modal setModal={setModal} times={times} />
      }

    </div>
  );
}

export default App;
