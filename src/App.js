/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import moment from 'moment/min/moment-with-locales';
import './index.css';
// minute hour

function modifiedDate(dateString) {
  moment.locale('ru');
  const lastMoment = moment(dateString);
  const differenceMin = Math.round((moment() - lastMoment) / 1000 / 60); // время в минутах
  if (differenceMin < 60 * 24) {
    return lastMoment.from(moment());
  }
  // return lastMoment.from(moment());
  const amountDays = moment().diff(lastMoment, 'days');
  const lastSimbolAmountDays = String(amountDays).split('').pop();

  return `${amountDays} ${lastSimbolAmountDays === '1' ? 'день' : lastSimbolAmountDays < '5' ? 'дня' : 'дней'} назад`;
}

function modifiedDateComponent(dateTimeComponent, modifiedDateFunction) {
  return function DateTimePretty(date) {
    const pastTime = modifiedDateFunction(date.date);
    const props = { date: pastTime };
    return (
      dateTimeComponent({ date: pastTime })
    );
  };
}

function DateTime(props) {
  return (
    <p className="date">{props.date}</p>
  );
}

const DateTimePretty = modifiedDateComponent(DateTime, modifiedDate);

function Video(props) {
  return (
    <div className="video">
      <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen />
      <DateTimePretty date={props.date} />
    </div>
  );
}

function VideoList(props) {
  return props.list.map((item) => <Video url={item.url} date={item.date} />);
}

export default function App() {
  const [list, setList] = useState([
    {
      url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2022-04-25 15:00:00',
    },
    {
      url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-03-03 12:10:00',
    },
    {
      url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-02-03 23:16:00',
    },
    {
      url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-01-03 12:10:00',
    },
    {
      url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-01-01 16:17:00',
    },
    {
      url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2017-12-02 05:24:00',
    },
  ]);

  return (
    <VideoList list={list} />
  );
}
// '2017-07-31 13:24:00'
