import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Amplify from 'aws-amplify';

//Amplify.configure(amplify);


Amplify.configure({
  Storage: {
    region: "us-east-1",
    bucket: "notes-app-2-api-prod-attachmentsbucket-1rcqrzorc72be"
  },
  Auth: {
      // REQUIRED - Amazon Cognito Identity Pool ID
      identityPoolId: 'us-east-1:def749da-18b6-44c0-accd-898a71868767',
      // REQUIRED - Amazon Cognito Region
      region: 'us-east-1',
      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: 'us-east-1_gGvh3jepV',
      // OPTIONAL - Amazon Cognito Web Client ID
      userPoolWebClientId: '3o3h5v2dbm40jdf9qvu5rko3mu',
  },
  API: {
    endpoints: [
      {
        name: "notes",
        endpoint: "https://wmrvb5s3hk.execute-api.us-east-1.amazonaws.com/prod",
        region: "us-east-1"
      },
    ]
  }
});

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
