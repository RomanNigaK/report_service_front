/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import cn from "classnames";
import "./calendar.sass";
import { useEffect, useState } from "react";
import { Day, DetailsReport } from "redux/slices/report/slice";

export const toValidDataTime = (ms: number) => {
  const msLength = ms.toFixed().length;
  if (msLength === 13) {
    return ms;
  }
  let newMs = ms;
  for (let index = msLength; index < 13; index += 1) {
    newMs *= 10;
  }
  return newMs;
};

type Days = Record<number, number>;

const enum Month {
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
}

const mapMonth: (keyof typeof Month)[] = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const enum WeekDay {
  "пн",
  "вт",
  "ср",
  "чт",
  "пт",
  "сб",
  "вс",
}

const mapWeekDay: (keyof typeof WeekDay)[] = [
  "пн",
  "вт",
  "ср",
  "чт",
  "пт",
  "сб",
  "вс",
];

const mapDays: Days = {
  0: 31,
  1: 28,
  2: 31,
  3: 30,
  4: 31,
  5: 30,
  6: 31,
  7: 31,
  8: 30,
  9: 31,
  10: 30,
  11: 31,
};

export const dateToSrt = (ms: number | undefined) => {
  if (typeof ms === "undefined") return undefined;

  const month: Record<number, string> = {
    0: "Январь",
    1: "Февраль",
    2: "Март",
    3: "Апрель",
    4: "Май",
    5: "Июнь",
    6: "Июль",
    7: "Август",
    8: "Сентябрь",
    9: "Октябрь",
    10: "Ноябрь",
    11: "Декабрь",
  };

  const date = new Date(ms);
  const d = date.getMonth();

  return `${date.getDate()} ${month[
    d
  ].toLocaleLowerCase()} ${date.getFullYear()}`;
};

type CalendarProps = {
  date?: number | null;
  setDate?: (ms: number) => void;
  details?: DetailsReport | null;
};

export default function Calendar({ setDate, date, details }: CalendarProps) {
  const currentDate = date ? new Date(toValidDataTime(date)) : new Date();

  const [day, setDay] = useState(currentDate.getDate());
  const [month, setMonth] = useState(currentDate.getMonth());
  const [year, setYear] = useState(currentDate.getFullYear());
  const [dayWeekBeginMonth] = useState(new Date(year, month, 1).getDay());

  const [arrayDays, setArrayDays] = useState(
    [...Array(mapDays[month])].map((i) => i + 1)
  );

  const [arrayNullDayMonth, setArrayNullDayMonth] = useState([
    ...Array(dayWeekBeginMonth - 1),
  ]);

  const [arrayYear] = useState([...Array(5)].map((e, i) => year - 1 + i));

  const handleSelectedMonth = (m: number) => {
    setMonth(m);

    setDate && setDate(new Date(year, m, day).getTime());

    setArrayNullDayMonth([
      ...Array(
        new Date(year, month, 1).getDay()
          ? new Date(year, month, 1).getDay() - 1
          : 6
      ),
    ]);
  };

  const handleSelectedYear = (y: number) => {
    setYear(y);
    setDate && setDate(new Date(y, month, day).getTime());
  };

  useEffect(() => {
    setYear(year);
    setArrayNullDayMonth([
      ...Array(
        new Date(year, month, 1).getDay()
          ? new Date(year, month, 1).getDay() - 1
          : 6
      ),
    ]);
  }, [year,month]);

  useEffect(() => {
    const isLeap = !(year % 4) && month === 1;
    setArrayDays(
      [...Array(isLeap ? mapDays[month] + 1 : mapDays[month]).keys()].map(
        (i) => i + 1
      )
    );
  }, [month, year]);

  useEffect(() => {
    setDate && setDate(new Date(year, month, day).getTime());
  }, []);

  return (
    <div className={cn("calendar")}>
      <div className="calendar__years">
        {arrayYear.map((e) => {
          return (
            <div
              key={e + "year"}
              onClick={() => handleSelectedYear(e)}
              className={cn({ current: year === e })}
            >
              {e}
            </div>
          );
        })}
      </div>
      <div className="calendar__block">
        <div className="calendar__month">
          {mapMonth.map((e, i) => {
            return (
              <div
                key={e + "key"}
                className={cn({ current: month === i })}
                onClick={() => handleSelectedMonth(i)}
              >
                {e}
              </div>
            );
          })}
        </div>
        <div className="calendar__days">
          <div className="calendar__weekDay">
            {mapWeekDay.map((e) => {
              return <div key={e + "week-name"}>{e}</div>;
            })}
          </div>
          <div className="calendar__daynumber">
            {arrayNullDayMonth.map((_, i) => {
              return <div key={"null" + i}></div>;
            })}
            {arrayDays.map((e, i) => {
              const dayString = String(i + 1) as Day;
              return (
                <div
                  key={i + "day"}
                  className={cn("day", { select_day: i + 1 === day })}
                >
                  {i + 1}
                  {details && details[dayString] > 0 && (
                    <div>{details[dayString]} &#8381;</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
