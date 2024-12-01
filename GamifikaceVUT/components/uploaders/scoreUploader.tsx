import axios from "axios";
import { API_URL } from "../constants";
import { Score_POST } from "../props";
import { useQueryClient } from "@tanstack/react-query";
/**
 * Funkcia ScoreUploader nahráva aktualne získané skóre užívateľa na backend.
 * @param {string} props.courseID - ID kurzu.
 * @param {string} props.points - získané skóre.
 * @param {string} props.user_id - získané skóre.
 */
async function ScoreUploader(
  courseID: String,
  points: number,
  user_id: String
) {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({
    queryKey: ["score", String(courseID)],
  });
  const question: Score_POST = {
    user_id: user_id,
    courseID: courseID,
    point: points,
  }; // Create the POST requuest
  const { data } = await axios.post(API_URL + "/score/entry", question, {
    headers: { "Content-Type": "application/json" },
  });
}

export default ScoreUploader;