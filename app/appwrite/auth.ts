import { OAuthProvider, Query, ID } from "appwrite"
import { account, appwriteConfig, database } from "./client"
import { redirect } from "react-router"

export const loginWithGoogle = async () => {
    try {
        await account.createOAuth2Session(
            OAuthProvider.Google,
            `${window.location.origin}/`,
            `${window.location.origin}/sign-in`,
            ['profile', 'email']
        )
    } catch (e) {
        console.log('Login failed:', e)
        throw e
    }
}

export const getUser = async () => {
    try {
        const user = await account.get()

        if(!user) return redirect('/sign-in');

        const {documents} = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userscollectionId,
            [
                Query.equal('accountId', user.$id),
                Query.select(['name', 'email', 'imageUrl', 'joinedAt', 'accountId'])
            ]
        )

        if (!documents.length) {
            return null
        }

        return documents[0]
    } catch (error) {
        console.log('Error getting user:', error)
        return null
    }
}

export const logoutUser = async () => {
    try {
        await account.deleteSession('current')
        window.location.href = '/sign-in'
    } catch (error) {
        console.log('Error logging out:', error)
        throw error
    }
}

export const getGooglePicture = async () => {
    try {
        const session = await account.getSession('current');
        if (!session) return null;

        const response = await fetch('https://people.googleapis.com/v1/people/me?personFields=photos', {
            headers: {
                'Authorization': `Bearer ${session.providerAccessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch Google profile photo');
        }

        const data = await response.json();
        const photos = data.photos || [];
        
        const profilePhoto = photos.find((photo: any) => photo.metadata?.primary);
        return profilePhoto?.url || null;
    } catch (error) {
        console.log('Error fetching Google profile photo:', error);
        return null;
    }
}

export const storeUserData = async (userData: {
    name: string;
    email: string;
    imageUrl: string;
    accountId: string;
}) => {
    try {
        const existingUser = await getExistingUser(userData.accountId);
        
        if (existingUser) {
            return existingUser;
        }

        const newUser = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userscollectionId,
            ID.unique(),
            {
                ...userData,
                joinedAt: new Date().toISOString()
            }
        );

        return newUser;
    } catch (error) {
        console.log('Error storing user data:', error);
        throw error;
    }
}

export const getExistingUser = async (accountId: string) => {
    try {
        const { documents } = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userscollectionId,
            [
                Query.equal('accountId', accountId),
                Query.select(['name', 'email', 'imageUrl', 'joinedAt', 'accountId'])
            ]
        );

        if (!documents.length) {
            return null;
        }

        return documents[0];
    } catch (error) {
        console.log('Error getting existing user:', error);
        return null;
    }
}