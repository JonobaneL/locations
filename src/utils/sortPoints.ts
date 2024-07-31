import { PointParams } from "../models/paramTypes";

export const sortPointsByNext = (quests: PointParams[]) => {
  const questMap = new Map();
  const result = [];
  quests.forEach((quest) => questMap.set(quest.id, quest));
  const startQuest = quests.find(
    (quest) => !quests.some((q) => q.next === quest.id)
  );
  let currentQuest = startQuest;
  while (currentQuest) {
    result.push(currentQuest);
    currentQuest = questMap.get(currentQuest.next);
  }
  return result;
};
