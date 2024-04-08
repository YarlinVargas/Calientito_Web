export interface PasswordModel {
  entityType: number,
  firsTime: boolean,
  change: boolean,
  idEntity: number | null,
  encryptedEntity: string | null,
  oldPassword: string,
  newPassword: string,
  confirmPassword: string
}
