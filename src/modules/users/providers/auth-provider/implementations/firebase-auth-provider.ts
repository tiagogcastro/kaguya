import { Either } from '@core/either';
import { Maybe } from '@shared/types/app';
import admin from 'firebase-admin';
import { GetUserResponse, IAuthProvider } from '../models/auth-provider';

class FirebaseAuthProvider implements IAuthProvider {
  static INSTANCE: Maybe<FirebaseAuthProvider> = null;

  private app: admin.app.App;

  constructor() {
    const app = admin.initializeApp({
      projectId: 'kaguya-d4e5a',
      storageBucket: 'kaguya-d4e5a.appspot.com',
      serviceAccountId:
        'firebase-adminsdk-5losg@kaguya-d4e5a.iam.gserviceaccount.com',
      credential: admin.credential.cert({
        projectId: 'kaguya-d4e5a',
        privateKey:
REDACTED_FIREBASE_SERVICE_ACCOUNT_KEY
        clientEmail:
          'firebase-adminsdk-5losg@kaguya-d4e5a.iam.gserviceaccount.com',
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
