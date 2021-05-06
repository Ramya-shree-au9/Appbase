import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

export const App = () => {
  const [data, setData] = useState("");
  const [filterData, setFilterData] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [countBtn, setCountBtn] = useState(false);
  const [multicheck, setMulticheck] = useState(false);

  useEffect(() => {
    async function fetchdata() {
      var promisevalue = await axios.get(
        "https://www.json-generator.com/api/json/get/cqVmFQHuUO"
      );

      const removeRepetation = () => {
        if (promisevalue.data) {
          var res = {};
          promisevalue.data.forEach(function (v) {
            res[v.eyeColor] = (res[v.eyeColor] || 0) + 1;
          });

          setFilterData(res);
          setData(res);
        }
      };
      removeRepetation();
    }
    fetchdata();
  }, []);

  const inputChangeHandler = (e) => {
    var filtered = Object.keys(data).filter((data, key) => {
      return data.toLowerCase().lastIndexOf(e.target.value.toLowerCase()) > -1;
    });
    setSearchFilter(filtered);
  };

  const checkBoxNumber = (e) => {
    var elems = document.getElementsByClassName("checkboxdata");

    var elemsLength = elems.length;

    if (!multicheck) {
      for (var i = 0; i < elemsLength; i++) {
        if (e.target.id === i) {
          elems[e.target.id].checked = true;
        } else {
          elems[i].checked = false;
        }
      }
    }
  };

  const renderdata = (key, index) => {
    return (
      <div key={index} className="colors">
        <input
          type="checkbox"
          className="checkboxdata"
          id={index}
          checked
          onChange={(e, index) => checkBoxNumber(e, index)}
        ></input>
        <span>{key}</span>
        {countBtn && <span className="count">({filterData[key]})</span>}
      </div>
    );
  };

  const iterateColour = () => {
    if (searchFilter) {
      return searchFilter.map((item, idx) => {
        return Object.keys(filterData).map((key, index) => {
          if (key === item) {
            return renderdata(key, index);
          }
        });
      });
    } else {
      return Object.keys(filterData).map((key, index) => {
        return renderdata(key, index);
      });
    }
  };

  const showCount = () => {
    setCountBtn(!countBtn);
  };
  const showMultiCheck = () => {
    setMulticheck(!multicheck);
  };

  return (
    <div className="datasection">
      <input className="inputbox" onChange={inputChangeHandler} />
      <input className="input2" />
      <div className="filterbox">
        <span className='filtersection'>
          <input type="checkbox" onClick={showCount}></input>
          <span>Show Count</span>
        </span>
        <span className='filtersection'>
          <input type="checkbox" onClick={showMultiCheck}></input>
          <span>Multi checkbox</span>
        </span>
      </div>
      {filterData && iterateColour()}
    </div>
  );
};

export default App;
