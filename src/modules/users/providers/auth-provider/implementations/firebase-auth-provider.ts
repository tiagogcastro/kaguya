import { Either } from '@core/either';
import { Maybe } from '@shared/types/app';
import admin from 'firebase-admin';
import { GetUserResponse, IAuthProvider } from '../models/auth-provider';

class FirebaseAuthProvider implements IAuthProvider {
  static INSTANCE: Maybe<FirebaseAuthProvider> = null;

  private app: admin.app.App;

  constructor() {
    const app = admin.initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
      serviceAccountId: process.env.FIREBASE_SERVICE_ACCOUNT_ID,
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
        clientEmail: process.env.FIREBASE_SERVICE_ACCOUNT_ID,
      }),
    });

    this.app = app;
  }

  async getUser(accessToken: string): GetUserResponse {
    try {
      const decodedIdToken = await this.app.auth().verifyIdToken(accessToken);

      const user = await this.app.auth().getUser(decodedIdToken.uid);

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
