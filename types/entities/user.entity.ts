export interface UserEntity {
  id: string;
  email: string;
  encryptedPassword: string;
  nickname: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}
