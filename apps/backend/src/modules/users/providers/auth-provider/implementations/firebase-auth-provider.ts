import { Either } from '@/core/either';
import { Maybe } from '@/shared/types/app';
import { App, cert, initializeApp } from 'firebase-admin';
import { GetUserResponse, IAuthProvider } from '../models/auth-provider';

class FirebaseAuthProvider implements IAuthProvider {
  static INSTANCE: Maybe<FirebaseAuthProvider> = null;

  private app: Maybe<App> = null;

  private isFirebaseConfigured(): boolean {
    return Boolean(
      process.env.FIREBASE_PROJECT_ID &&
        process.env.FIREBASE_PRIVATE_KEY &&
        process.env.FIREBASE_SERVICE_ACCOUNT_ID,
    );
  }

  private ensureApp(): App {
    if (!this.isFirebaseConfigured()) {
      throw new Error('Firebase credentials are not configured');
    }

    if (!this.app) {
      this.app = initializeApp({
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
        serviceAccountId: process.env.FIREBASE_SERVICE_ACCOUNT_ID,
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
          clientEmail: process.env.FIREBASE_SERVICE_ACCOUNT_ID,
        }),
      });
    }

    return this.app;
  }

  async getUser(accessToken: string): GetUserResponse {
    try {
      const { getAuth } = await import('firebase-admin/auth');

      const firebaseAuth = getAuth(this.ensureApp());
      const decodedIdToken = await firebaseAuth.verifyIdToken(accessToken);

      const user = await firebaseAuth.getUser(decodedIdToken.uid);

      if (user.disabled) {
        return Either.left(new Error('Disabled user'));
      }

      return Either.right({
        uid: user.uid,
        email_verified: user.emailVerified,
        avatar_url: user.photoURL,
        email: user.email,
        name: user.displayName,
        phone_number: user.phoneNumber,
      });
    } catch {
      return Either.left(new Error('Unauthorized'));
    }
  }

  static create() {
    if (!this.INSTANCE) {
      this.INSTANCE = new FirebaseAuthProvider();
    }

    return this.INSTANCE;
  }
}
export { FirebaseAuthProvider };
