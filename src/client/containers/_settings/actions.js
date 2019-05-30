import { CALL_API } from "../../../store/middlewares/api"
import sealMiddleware from "../../helpers/seal"

export const SETTING_PROFILE = "SETTING_PROFILE"

/**
 * function to handle submit setting profile
 * @param {string} params.username (required)
 * @param {string} params.fullname (required)
 * @param {string} params.address (optional)
 * @param {object} params.avatar file object
 */
export function submitSettingProfile(params = {}) {
  return {
    [CALL_API]: {
      type: SETTING_PROFILE,
      url: `/api/settings/profile/${sealMiddleware.generateSeal()}`,
      method: "put",
      filter: "setting_profile",
      params
    }
  }
}

/**
 * function to handle submit setting account
 * @param {string} params.email new / current email (required)
 * @param {string} params.password current password (required)
 * @param {string} params.new_password new password (optional)
 */
export function submitSettingAccount(params = {}) {
  return {
    [CALL_API]: {
      type: SETTING_PROFILE,
      url: `/api/settings/profile/${sealMiddleware.generateSeal()}`,
      method: "put",
      filter: "setting_account",
      params
    }
  }
}
