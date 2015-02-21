declare class UserMeta {
  share: boolean;
  active: boolean;
  displayName: string;
}

declare class User {
  dataUrl: string;
  userId: string;
  meta: ?UserMeta;
}

declare class Auth {
  uid: string;
  provider: string;

  [key:string]: any
}

