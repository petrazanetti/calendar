import moment from "moment";
import styled from "styled-components";
import React, { useState, useEffect } from 'react';
import Axios from "axios";
import * as utils from "./utils";
import LeftIcon from "./icons/LeftIcon";
import RightIcon from "./icons/RightIcon";

const StyledMainContainer = styled.div`
max-width: 1200px;
margin: 0 auto;
`;

const StyledCalendarNavigation = styled.div`
display: flex;
flex-direction: row;
height: 70px;
width: 80%;
margin: 0px 0px 10px 0px;
justify-content: space-between;
align-items: center;
overflow: hidden;
`;

const StyledNavMonthYear = styled.h1`
font-weight: bold;
margin: 0px 0px 0px 10px;
font-size:50px;
`;

const StyledArrowContainer = styled.div`
display: flex;
flex-direction: row;
height: 70px;
align-items: center;
justify-content: flex-end;
margin: 0px 0px 0px 0px;
`;

const StyledButtonBack = styled.button`
  height: 42px;
  width: 42px;
  border: 2px solid #4a4a4a;
  border-radius: 50%;
  &:hover {
    background-color: #c9c9c9;
  }
  &:active {
    background-color: #7f868c;
  }
`;

const StyledButtonFront = styled.button`
height: 42px;
width: 42px;
border: 2px solid #4a4a4a;
border-radius: 50%;
margin: 0px 10px 0px 10px;
&:hover {
  background-color: #c9c9c9;
}
&:active {
  background-color: #aba9a9;
}
`;

const StyledTableContainer = styled.div`
display: flex;
flex-direction: row;
width: 100%;
align-items: flex-start;
`;

const StyledTable = styled.table`
table-layout: fixed;
width: 80%;
border-collapse: collapse;
border-radius: 10px;
border-style: hidden;
box-shadow: 0 0 0 1px #1d3557;
`;

const StyledTableHeader = styled.th`
height: 50px;
text-align: center;
vertical-align: middle;
background-color: #3a6ea5;
color: #ebebeb;
&:nth-child(1) {
    border-top-left-radius: 10px;
}
&:nth-child(7) {
    border-top-right-radius: 10px;
}
font-size: 18px;
overflow: hidden;
`;

const StyledDay = styled.td`
border: 1px solid #cad2c5;
vertical-align: text-top;
text-align: right;
height: 85px;
padding: 7px;
position: relative;
`;

const StyledEvent = styled.button`
background-color: #c0c0c0;
height: 55px;
position: absolute;
bottom: 10px;
left: 10px;
right: 10px;
color: #004e98;
text-align: center;
overflow: hidden;
border: none;
border-radius: 10px;
font-size: 15px;
&:hover {
    background-color: #ababab;
}
&:active {
    background-color: #949494;
}
`;

const StyledInfoContainer = styled.div`
background-color: #c0c0c0;
margin: 50px 0px 0px 10px;
max-width: 19%;
overflow: hidden;
`;

const StyledEventTitle = styled.h2`
text-align: center;
font-size: 20px;
padding-top: 7px;
padding-left: 7px;
padding-right: 7px;
color: #004e98;
`;

const StyledEventInfo = styled.p`
padding-left: 6px;
padding-right: 6px;
color: #004e98;
&:nth-child(4) {
    padding-bottom: 6px;
}
`;

const StyledSpan = styled.span`
fontWeight: 'bold'
`;

function Calendar() {
    const [dateObject, setDateObject] = useState(moment());
    const [holidays, setHolidays] = useState([]);
    const [showContainer, setShowContainer] = useState(false);
    const [clickedHoliday, setClickedHoliday] = useState(null);

    moment.updateLocale('hr', {
        week: {
            dow: 1, // Monday is the first day of the week
        }
    });

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const [firstResponse, secondResponse, thirdResponse, fourthResponse] = await Promise.all([
            Axios.get("https://date.nager.at/api/v3/PublicHolidays/2022/HR"),
            Axios.get("https://date.nager.at/api/v3/PublicHolidays/2021/HR"),
            Axios.get("https://date.nager.at/api/v3/PublicHolidays/2022/AT"),
            Axios.get("https://date.nager.at/api/v3/PublicHolidays/2021/AT")
        ]);
        let holidaysHR22 = firstResponse.data
        let holidaysHR21 = secondResponse.data
        let holidaysAT22 = thirdResponse.data
        let holidaysAT21 = fourthResponse.data
        setHolidays(holidaysHR22.concat(holidaysHR21, holidaysAT22, holidaysAT21))
    }

    const onPrev = () => { setDateObject(moment(dateObject).subtract(1, "month")) };

    const onNext = () => { setDateObject(moment(dateObject).add(1, "month")) };

    const daysOfTheWeek = moment.weekdays(true).map((day, i) => {
        return (
            <StyledTableHeader key={i}>
                {day}
            </StyledTableHeader>
        );
    });

    const showInfoContainer = (i) => {
        if (showContainer && clickedHoliday === i) {
            setShowContainer(false)
        }
        else if (showContainer && clickedHoliday !== i) {
            setClickedHoliday(i)
        }
        else {
            setShowContainer(true)
            setClickedHoliday(i)
        }
    }

    const checkForHoliday = (d) => {
        const day = utils.formatDay(d);
        const date = `${utils.getCurrentYear(dateObject)}-${utils.getCurrentMonthNum(dateObject)}-${day}`;
        for (let i = 0; i < holidays.length; i++) {
            if (date === holidays[i].date) {
                return <StyledDay>
                    {d}
                    <StyledEvent onClick={() => showInfoContainer(i)}>{holidays[i].localName}</StyledEvent>
                </StyledDay>
            }
        }
        return <StyledDay>
            {d}
        </StyledDay>
    };

    const blanksFront = [];
    for (let i = 1; i < utils.getFirstDayOfMonth(dateObject); i++) {
        blanksFront.push(
            <StyledDay>
                {""}
            </StyledDay>
        );
    }

    const daysInCurrentMonth = [];
    for (let d = 1; d <= utils.getNumOfDaysInMonth(dateObject); d++) {
        daysInCurrentMonth.push(
            checkForHoliday(d)
        );
    }

    const blanksBack = [];
    for (let i = 7; i > utils.getLastDayOfMonth(dateObject); i--) {
        blanksBack.push(
            <StyledDay>
                {""}
            </StyledDay>
        );
    }

    const totalSlots = [...blanksFront, ...daysInCurrentMonth, ...blanksBack];
    const rows = [];
    let cells = [];
    totalSlots.forEach((row, i) => {
        if (i % 7 !== 0) {
            cells.push(row); // if index not equal 7 that means not go to next week
        } else {
            rows.push(cells); // when reach next week we contain all td in last week to rows 
            cells = []; // empty container 
            cells.push(row); // in current loop we still push current row to new container
        }
        if (i === totalSlots.length - 1) { // when end loop we add remain date
            rows.push(cells);
        }
    });

    const daysInMonth = rows.map((d, i) => {
        return <tr key={i}>{d}</tr>;
    });

    return (
        <StyledMainContainer>

            <StyledCalendarNavigation>
                <StyledNavMonthYear>{utils.getCurrentMonthName(dateObject)} / {utils.getCurrentYear(dateObject)}</StyledNavMonthYear>
                <StyledArrowContainer>
                    <StyledButtonBack onClick={(e) => { onPrev(); }}>
                        <LeftIcon />
                    </StyledButtonBack>
                    <StyledButtonFront onClick={(e) => { onNext(); }}>
                        <RightIcon />
                    </StyledButtonFront>
                </StyledArrowContainer>
            </StyledCalendarNavigation>

            <StyledTableContainer>
                <StyledTable>
                    <thead><tr>{daysOfTheWeek}</tr></thead>
                    <tbody>{daysInMonth}</tbody>
                </StyledTable>
                {showContainer && (
                    <StyledInfoContainer>
                        <StyledEventTitle>{holidays[clickedHoliday].name}</StyledEventTitle>
                        <StyledEventInfo>
                            <StyledSpan>Local name:</StyledSpan>
                            {" "}{holidays[clickedHoliday].localName}
                        </StyledEventInfo>
                        <StyledEventInfo>
                            <StyledSpan>Date:</StyledSpan>
                            {" "}{moment(holidays[clickedHoliday].date, "YYYY-MM-DD").format("DD.MM.YYYY.")}
                        </StyledEventInfo>
                        <StyledEventInfo>
                            <StyledSpan>Country:</StyledSpan>
                            {" "}{holidays[clickedHoliday].countryCode}
                        </StyledEventInfo>
                    </StyledInfoContainer>
                )}
            </StyledTableContainer>

        </StyledMainContainer>


    );
}

export default Calendar;
