
const generateUrl = async () => {
    const {randomBytes} = await import('node:crypto') // should be at the top
    return randomBytes(8).toString('hex')
}

module.exports = {generateUrl: generateUrl}