import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { CaretDown, CaretUp } from "phosphor-react";

const DropDrown = ({ name, options }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [optionn, setOptionn] = useState("");
//   const requestOptions = {
//     method: 'GET',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ genre: optionn.option })
// };
 const genre = optionn.option
//  console.log(genre);
  async function sortSeries() {
    const endpoint = `http://localhost:5000/sortedSeries?genre=${genre}`
    let res = await fetch(endpoint);
    const data = res.json();
    console.log(data);
    return data;
  }
 
  return (
    <div className={styles.dropdown}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={styles.DropdownButton}
      >
        {name}:{isExpanded && <CaretDown size={16} />}
        {!isExpanded && <CaretUp size={16} />}
      </button>
      {isExpanded && (
        <div className={styles.Panel}>
          <div className={styles.arrowUp}></div>

          {options.map((option) => (
            <div
              onClick={() => {
                setOptionn({ option })
                sortSeries()
              }}
              className={styles.List}
              key={option}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDrown;
