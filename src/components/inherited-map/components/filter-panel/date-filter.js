import {
  format,
  lastDayOfMonth,
  parse,
  parseISO,
  startOfMonth,
  subMonths,
} from "date-fns";
import ruLocale from "date-fns/locale/ru";
import { observer } from "mobx-react";
import * as React from "react";

const DateFilterSection = ({ filter }) => {
  const defaultRange = {
    start: parseISO(filter.value.start_date),
    end: parseISO(filter.value.end_date),
  };
  const [text, setText] = React.useState(null);
  const [show, setShow] = React.useState(false);
  const [error, setError] = React.useState(null);
  const dirtyRef = React.useRef(false);
  const inputRef = React.useRef();

  const apply = (range) => {
    setText(null);
    setError(null);
    filter.setValue({
      start_date: formatDate(range.start),
      end_date: formatDate(range.end),
    });
    dirtyRef.current = false;
    inputRef.current.blur();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const range = parseRange(event.target.value);
      if (range) {
        const curYear = new Date().getFullYear();
        const endOfYear = new Date(curYear, 11, 31);
        if (
          range.end >= range.start &&
          range.start >= new Date(2015, 0, 1) &&
          range.end <= endOfYear
        ) {
          apply(range);
        } else {
          setError(`Неправильный период.\nДоступные данные: 2015-${curYear}`);
        }
      } else {
        setError("Неправильный формат.\nПример: 1.1.2020 - 31.12.2020");
      }
    }
  };
  const handleClick = (range) => {
    apply(range);
    setShow(false);
  };
  const handleChange = (event) => {
    if (error) {
      setError(null);
    }
    setText(event.target.value);
    dirtyRef.current = true;
  };
  const handleBlur = () => {
    if (dirtyRef.current) {
      setText(null);
      setError(null);
      dirtyRef.current = false;
    }
  };

  return (
    <div>
      <div className="date-main">
        <div className="inputWrap">
          <input
            ref={inputRef}
            type="text"
            className="input date-input"
            value={text || formatRange(defaultRange)}
            spellCheck="false"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
          />
        </div>
        <div className="date-dropdown">
          <button
            className="date-button"
            onClick={() => {
              setShow(true);
            }}
          >
            <svg className="icon icon-down">
              <use xlinkHref="/static/media/svg/sprite.svg#arrow-down" />
            </svg>
          </button>
          {show && <DateMenu handleClick={handleClick} setShow={setShow} />}
        </div>
      </div>
      {error && (
        <div className="body3 date-error-wrap">
          {error.split("\n").map((line, lineIndex) => (
            <div key={lineIndex} className="date-error">
              {line}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

const DateMenu = ({ handleClick, setShow }) => {
  const menuRef = React.useRef();
  useOutsideClick(menuRef, () => {
    setShow(false);
  });

  return (
    <div className="date-menu" ref={menuRef}>
      {defaultRanges.map((range) => (
        <div
          key={range.label}
          className="date-value"
          onClick={() => {
            handleClick(range);
          }}
        >
          {range.label}
        </div>
      ))}
    </div>
  );
};

const parseRange = (input) => {
  const ps = input.split("-");
  if (ps.length === 2) {
    const start = parseDate(ps[0].trim());
    const end = parseDate(ps[1].trim());
    if (start && end) {
      return { start, end };
    }
  }

  return null;
};

const parseDate = (input) => {
  try {
    const result = parse(input, "d.M.y", new Date());
    if (Number.isNaN(result)) {
      return null;
    }

    return result;
  } catch {
    return null;
  }
};

const formatDate = (date) => format(date, "yyyy-MM-dd");

const dateFormat = "dd.MM.yyyy";
const formatRange = (range) => {
  return `${format(range.start, dateFormat)} - ${format(
    range.end,
    dateFormat,
  )}`;
};

const derivePrevMonth = (monthDelta) => {
  const derivedDate = subMonths(new Date(), monthDelta);
  const stringifiedDerivedDate = format(derivedDate, "LLLL", {
    locale: ruLocale,
  });

  return {
    label:
      stringifiedDerivedDate[0].toLocaleUpperCase("ru") +
      stringifiedDerivedDate.slice(1),
    start: startOfMonth(derivedDate),
    end: lastDayOfMonth(derivedDate),
  };
};

const getDefaultRanges = () => {
  const result = [];
  const year = new Date().getFullYear();
  for (let monthDelta = 1; monthDelta <= 2; monthDelta += 1) {
    result.push(derivePrevMonth(monthDelta));
  }
  for (let currentYear = year; currentYear > year - 6; currentYear -= 1) {
    result.push({
      label: currentYear.toString(),
      start: new Date(currentYear, 0, 1),
      end: new Date(currentYear, 11, 31),
    });
  }
  result.push({
    label: "За всё время",
    start: new Date(2015, 0, 1),
    end: new Date(),
  });

  return result;
};

const defaultRanges = getDefaultRanges();

const useOutsideClick = (ref, callback) => {
  const handleClick = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

export default observer(DateFilterSection);
