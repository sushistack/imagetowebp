export default {
  fixToOnlyNumber (value) {
    const regex = /^[0-9]+$/
    if (!regex.test(value)) return value.replace(/\D/g, '');
    return value
  }
}