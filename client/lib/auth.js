export function getLoggedInUserId() {
  if (!localStorage) return false

  const token = localStorage.getItem('token')
  console.log(localStorage)
  console.log(token)

  if (!token) return false
  if (token !== undefined) {

    const payloadAsString = atob(token.split('.')[1])
    console.log('payload' + payloadAsString)
    // console.log(typeof payloadAsString)
    const payloadAsObject = JSON.parse(payloadAsString)
    console.log(payloadAsObject)
    return payloadAsObject.sub

  }

}

export function isCreator(userIdToCompare) {
  if (!userIdToCompare) return false
  return userIdToCompare === getLoggedInUserId()
}
