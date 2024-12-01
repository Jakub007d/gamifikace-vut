import { API_URL } from "../constants";
import { Score } from "../props";

//Funkcia pre získanie skóre.
async function fetchScore(courseID: string): Promise<Score[]> {
  try {
    const response = await fetch(
      API_URL + "/score/?format=json&courseID=" + courseID
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching score:", error);
    return [];
  }
}
export default fetchScore;
