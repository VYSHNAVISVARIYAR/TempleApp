export enum UserRole {
  ADMIN = 'ADMIN',
  DEVOTEE = 'DEVOTEE'
}

export interface LoginProps {
  onLogin?: (role: UserRole) => void;
}