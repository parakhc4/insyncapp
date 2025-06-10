import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Note = {
  id: string;
  content: string;
};

export type Activity = {
  id: string;
  title: string;
  approved: boolean;
  notes: Note[];
};

type ActivityContextValue = {
  activities: Activity[];
  addActivity: (title: string) => void;
  toggleApproval: (id: string) => void;
  addNote: (activityId: string, message: string) => void;
  notification: string | null;
  clearNotification: () => void;
};

const ActivityContext = createContext<ActivityContextValue | undefined>(undefined);

export function ActivityProvider({ children }: { children: ReactNode }) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  const addActivity = (title: string) => {
    setActivities((prev) => [
      ...prev,
      { id: Date.now().toString(), title, approved: false, notes: [] },
    ]);
  };

  const toggleApproval = (id: string) => {
    let title = '';
    let newStatus = false;
    setActivities((prev) =>
      prev.map((act) => {
        if (act.id === id) {
          title = act.title;
          newStatus = !act.approved;
          return { ...act, approved: !act.approved };
        }
        return act;
      }),
    );
    if (title) {
      setNotification(`Activity "${title}" ${newStatus ? 'approved' : 'unapproved'}`);
    }
  };

  const addNote = (activityId: string, message: string) => {
    let title = '';
    setActivities((prev) =>
      prev.map((act) => {
        if (act.id === activityId) {
          title = act.title;
          return {
            ...act,
            notes: [...act.notes, { id: Date.now().toString(), content: message }],
          };
        }
        return act;
      }),
    );
    if (title) {
      setNotification(`Note added to "${title}"`);
    }
  };

  const clearNotification = () => setNotification(null);

  const value: ActivityContextValue = {
    activities,
    addActivity,
    toggleApproval,
    addNote,
    notification,
    clearNotification,
  };

  return <ActivityContext.Provider value={value}>{children}</ActivityContext.Provider>;
}

export function useActivities() {
  const ctx = useContext(ActivityContext);
  if (!ctx) throw new Error('useActivities must be used within ActivityProvider');
  return ctx;
}
