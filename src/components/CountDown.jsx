import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export function CountDown() {
  const [target, setTarget] = useState("");

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [completed, setCompleted] = useState(true);

  const id = useRef(null);

  function handleSubmit() {
    if (id.current) {
      clearInterval(id.current);
    }

    if (target === "") {
      toast.error("Please select a date-time", {
        position: "bottom-right",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    if (new Date() > new Date(target)) {
      toast.error("Please select a future date-time", {
        position: "bottom-right",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    setCompleted(false);

    id.current = setInterval(() => {
      const diff = new Date(target) - new Date();
      setDays(Math.floor(diff / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      setMinutes(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((diff % (1000 * 60)) / 1000));
    }, 1000);
  }

  useEffect(() => {
    if (seconds <= 0 && minutes <= 0 && hours <= 0 && days <= 0) {
      setCompleted(true);
      setTarget("");
      clearInterval(id.current);
      if (target !== "") {
        toast.success("Countdown completed", {
          position: "bottom-right",
          autoClose: 3000,
          theme: "colored",
        });
      }
    }
  }, [seconds, minutes, hours, days]);

  return (
    <>
      <div className="p-4 bg-yellow-100 w-[100vw] h-[100vh] dark:bg-gray-800 flex justify-center items-center">
        <div className="flex items-center justify-center flex-col">
          <div className="p-4">
            <h1 className="text-3xl font-bold text-black dark:text-white">
              Countdown App
            </h1>
          </div>
          <div className="p-4 flex flex-col gap-4 justify-center items-center">
            <input
              type="datetime-local"
              name=""
              id=""
              className="p-2 border border-gray-300 dark:border-gray-700  outline-none rounded-md"
              value={target}
              onChange={(e) => {
                e.preventDefault();
                setTarget(e.target.value);
              }}
            />
            <button
              className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-md dark:bg-blue-800"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              Start
            </button>
          </div>
          {!completed && (
            <div className="flex items-center justify-center">
              <ul className="flex  justify-center items-center flex-wrap gap-4 dark:text-white">
                <Block time={days} unit={"Days"} />
                <Block time={hours} unit={"Hours"} />
                <Block time={minutes} unit={"Minutes"} />
                <Block time={seconds} unit={"Seconds"} />
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function Block({ time, unit }) {
  return (
    <>
      <li className="flex justify-center items-center text-center flex-col gap-2 text-2xl border-2 p-2 rounded-md shadow-lg min-w-32">
        <span>{time}</span>
        <span>{unit}</span>
      </li>
    </>
  );
}
