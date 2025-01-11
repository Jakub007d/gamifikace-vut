import { API_URL } from "../constants";
import { Course } from "../props";

//Funkcia pre získanie všetkých kurzov.
async function fetchCourses(): Promise<Course[]> {
  try {
    const response = await fetch(API_URL + "/courses/?format=json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}
export default fetchCourses;
