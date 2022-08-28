export default function useQuest() {
  async function createQuest(data: any) {
    const res = await fetch("/api/create-quest", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res;
  }

  async function logout() {
    await fetch("/api/logout", {
      method: "POST",
    });
  }

  return {
    createQuest,
    logout,
  };
}
