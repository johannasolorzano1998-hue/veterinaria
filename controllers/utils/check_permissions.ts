import { Usuario, UserRole } from "../../models"


const CheckPermissions = (auth: Usuario, permissions: Array<UserRole>): boolean => {
  if(!auth) return false
  if(permissions.includes(auth.rol)) return true
  return false
}

const CheckFinished= (auth: Usuario, permissions: Array<UserRole>, state: string, spected: string) => CheckPermissions(auth, permissions) && state === spected

export { CheckPermissions , CheckFinished }