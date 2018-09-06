// import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber'

// const phoneUtil = PhoneNumberUtil.getInstance()

function internationalFormat (phoneNumber, countryCode) {
  try {
    // const parsedPhoneNumber = phoneUtil.parse(phoneNumber, countryCode)
    // return phoneUtil.format(parsedPhoneNumber, PhoneNumberFormat.INTERNATIONAL)
  } catch (e) {
    return phoneNumber
  }
}

export {
  internationalFormat
}
