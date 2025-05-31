import { OAuthProvider, Query, ID } from "appwrite"
import { account, appwriteConfig, database } from "./client"
import { redirect } from "react-router"

export const getExistingUser = async (id: string) => {
    try {
      const { documents, total } = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userscollectionId,
        [Query.equal("accountId", id)]
      );
      return total > 0 ? documents[0] : null;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };
  
  export const storeUserData = async () => {
    try {
      const user = await account.get();
      if (!user) throw new Error("User not found");
  
      const { providerAccessToken } = (await account.getSession("current")) || {};
      const profilePicture = providerAccessToken
        ? await getGooglePicture(providerAccessToken)
        : null;
  
      const createdUser = await database.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userscollectionId,
        ID.unique(),
        {
          accountId: user.$id,
          email: user.email,
          name: user.name,
          imageUrl: profilePicture,
          joinedAt: new Date().toISOString(),
        }
      );
  
      if (!createdUser.$id) redirect("/sign-in");
    } catch (error) {
      console.error("Error storing user data:", error);
    }
  };
  
  const getGooglePicture = async (accessToken: string) => {
    try {
      const response = await fetch(
        "https://people.googleapis.com/v1/people/me?personFields=photos",
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (!response.ok) throw new Error("Failed to fetch Google profile picture");
  
      const { photos } = await response.json();
      return photos?.[0]?.url || null;
    } catch (error) {
      console.error("Error fetching Google picture:", error);
      return null;
    }
  };
  
  export const loginWithGoogle = async () => {
    try {
      // Use the full URL including protocol and port
      const baseUrl = window.location.origin;
      const successUrl = `${baseUrl}/`;
      const failureUrl = `${baseUrl}/sign-in`;
      
      console.log('Redirect URLs:', { successUrl, failureUrl }); // Debug log
      
      await account.createOAuth2Session(
        OAuthProvider.Google,
        successUrl,
        failureUrl,
        ['profile', 'email']
      );
    } catch (error) {
      console.error("Error during OAuth2 session creation:", error);
      throw error;
    }
  };
  
  export const logoutUser = async () => {
    try {
      await account.deleteSession("current");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  
  export const getUser = async () => {
    try {
      const user = await account.get();
      if (!user) return redirect("/sign-in");
  
      const { documents } = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userscollectionId,
        [
          Query.equal("accountId", user.$id),
          Query.select(["name", "email", "imageUrl", "joinedAt", "accountId"]),
        ]
      );
  
      return documents.length > 0 ? documents[0] : redirect("/sign-in");
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };