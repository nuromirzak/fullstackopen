import axios from "axios"
import { useEffect, useState } from "react"
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry, Visibility, Weather } from "./types";

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [newDiary, setNewDiary] = useState<NewDiaryEntry>({
    date: "",
    visibility: Visibility.Good,
    weather: Weather.Sunny,
    comment: ""
  } as NewDiaryEntry);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    axios.get<NonSensitiveDiaryEntry[]>("http://localhost:3000/api/diaries").then((response) => {
      setDiaries(response.data);
    })
  }, []);

  const addDiary = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log("Add diary: ", newDiary);
    try {
      // axios.post<DiaryEntry>("http://localhost:3000/api/diaries", newDiary).then((response) => {
      //   setDiaries(diaries.concat(response.data));
      //   setNewDiary({
      //     date: "",
      //     visibility: Visibility.Good,
      //     weather: Weather.Sunny,
      //     comment: ""
      //   } as NewDiaryEntry);
      // })
      const { data: addedDiary } = await axios.post<DiaryEntry>("http://localhost:3000/api/diaries", newDiary);
      setDiaries(diaries.concat(addedDiary));
    } catch (error) {
      let message = undefined;
      if (axios.isAxiosError(error)) {
        message = error.response?.data;
      } else {
        const e = error as Error;
        message = e.message;
      }
      setErrorMessage(message);
    }
  }

  return (
    <>
      <h1>Add Diary</h1>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <form onSubmit={addDiary}>
        <input type="text" placeholder="Date" value={newDiary.date} onChange={(e) => setNewDiary({ ...newDiary, date: e.target.value })} />
        <input type="text" placeholder="Visibility" value={newDiary.visibility} onChange={(e) => setNewDiary({ ...newDiary, visibility: e.target.value as Visibility })} />
        <input type="text" placeholder="Weather" value={newDiary.weather} onChange={(e) => setNewDiary({ ...newDiary, weather: e.target.value as Weather })} />
        <input type="text" placeholder="Comment" value={newDiary.comment} onChange={(e) => setNewDiary({ ...newDiary, comment: e.target.value })} />
        <button type="submit">Add Diary</button>
      </form>
      <h1>Flight Diary</h1>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <b>Date: {diary.date}</b>
          <p>Visibility: {diary.visibility}</p>
          <p>Weather: {diary.weather}</p>
        </div>
      ))}
    </>
  )
}

export default App
