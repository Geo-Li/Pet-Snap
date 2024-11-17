import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onValue, ref } from "firebase/database";
import { MyUser } from "@/types/realtime_db";

export function useUsers() {
  const [users, setUsers] = useState<MyUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    if (!auth.currentUser) {
      setUsers([]);
      setLoading(false);
      return;
    }
    const usersRef = ref(db, "users");
    const usersListener = onValue(
      usersRef,
      (snapshot) => {
        try {
          const usersData: MyUser[] = [];
          snapshot.forEach((childSnapshot) => {
            const userData = childSnapshot.val();
            if (childSnapshot.key !== auth.currentUser?.uid) {
              usersData.push({
                id: childSnapshot.key,
                ...userData,
              });
            }
          });

          usersData.sort((user1, user2) => {
            if (user1.status === "online" && user2.status !== "online")
              return -1;
            if (user1.status !== "online" && user2.status === "online")
              return 1;
            return user1.displayName!.localeCompare(user2.displayName!);
          });

          setUsers(usersData);
          setLoading(false);
        } catch (error) {
          console.error("Error processing users data:", error);
          setUsers([]);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Error fetching users:", error);
        setUsers([]);
        setLoading(false);
      },
    );

    return () => {
      usersListener();
    };
  }, []);

  return { users, loading };
}
