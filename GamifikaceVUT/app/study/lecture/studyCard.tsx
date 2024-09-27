import NavigationPanel from "@/components/navigation/NavigationPanel";
import StudyCardWindow from "@/components/study_card_ui/StudyWindow";
import { useState } from "react";
import { View, Text } from "react-native";

const StudyCard = () => {
  const [answerShown, setAnswerShown] = useState(false);
  return (
    <View>
      <NavigationPanel course_name={"IMA1"}></NavigationPanel>
      <StudyCardWindow
        question="Otázka"
        answer="Odpoveď"
        answer_shown={answerShown}
        setShown={() => setAnswerShown(!answerShown)}
      />
    </View>
  );
};

export default StudyCard;
