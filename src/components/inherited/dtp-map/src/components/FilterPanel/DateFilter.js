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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const range = parseRange(e.target.value);
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
  const handleChange = (e) => {
    if (error) {
      setError(null);
    }
    setText(e.target.value);
    dirtyRef.current = true;
  };
  const handleBlur = (e) => {
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
          <button className="date-button" onClick={(e) => setShow(true)}>
            <svg className="icon icon-down">
              <use xlinkHref="svg/sprite.svg#arrow-down" />
            </svg>
          </button>
          {show && <DateMenu handleClick={handleClick} setShow={setShow} />}
        </div>
      </div>
      {error && (
        <div className="body3 date-error-wrap">
          {error.split("\n").map((s, i) => (
            <div key={i} className="date-error">
              {s}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const DateMenu = ({ handleClick, setShow }) => {
  const menuRef = React.useRef();
  useOutsideClick(menuRef, () => {
    setShow(false);
  });

  return (
    <div className="date-menu" ref={menuRef}>
      {defaultRanges.map((r) => (
        <div
          key={r.label}
          className="date-value"
          onClick={(e) => handleClick(r)}
        >
          {r.label}
        </div>
      ))}
    </div>
  );
};

const parseRange = (s) => {
  const ps = s.split("-");
  if (ps.length === 2) {
    const start = parseDate(ps[0].trim());
    const end = parseDate(ps[1].trim());
    if (start && end) {
      return { start, end };
    }
  }

  return null;
};

const parseDate = (s) => {
  try {
    const result = parse(s, "d.M.y", new Date());
    if (isNaN(result)) {
      return null;
    }

    return result;
  } catch {
    return null;
  }
};

const formatDate = (date) => format(date, "yyyy-MM-dd");

const formatRange = (range) => {
  const f = "dd.MM.yyyy";

  return `${format(range.start, f)} - ${format(range.end, f)}`;
};

const getPrevMonth = (n) => {
  const p = subMonths(new Date(), n);
  const s = format(p, "LLLL", { locale: ruLocale });

  return {
    label: s[0].toLocaleUpperCase("ru") + s.slice(1),
    start: startOfMonth(p),
    end: lastDayOfMonth(p),
  };
};

const getDefaultRanges = () => {
  const result = [];
  const year = new Date().getFullYear();
  for (let i = 1; i <= 2; i++) {
    result.push(getPrevMonth(i));
  }
  for (let i = year; i > year - 6; i--) {
    result.push({
      label: i.toString(),
      start: new Date(i, 0, 1),
      end: new Date(i, 11, 31),
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
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
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
