// Function to create user profil
const createProfile = async (user: any, userId: any) => {
  try {
    const data = await fetch(`api/${userId}`, {
      method: "POST",
      body: JSON.stringify({
        username: user?.username,
        email: user?.emailAddresses[0].emailAddress,
        avatar: user?.imageUrl,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await data.json();
  } catch (error: any) {
    console.log(error.message);
  }
};
