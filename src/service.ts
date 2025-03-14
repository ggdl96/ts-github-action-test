export async function processMessageOutput(message: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`This was the received message: ${message}`)
    }, 100)
  })
}
